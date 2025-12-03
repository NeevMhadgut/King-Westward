import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { gameManager } from "./gameManager";
import { nanoid } from "nanoid";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  const wss = new WebSocketServer({ 
    noServer: true,
  });

  httpServer.on('upgrade', (request, socket, head) => {
    if (request.url === '/game') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New game WebSocket connection');
    
    let playerId: string | null = null;

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        handleMessage(ws, data);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    ws.on('close', () => {
      if (playerId) {
        console.log(`Player ${playerId} disconnected`);
        gameManager.removePlayer(playerId);
        gameManager.broadcast('playerLeft', { playerId });
      }
    });

    function handleMessage(socket: WebSocket, data: any) {
      const { event, payload } = data;

      switch (event) {
        case 'join':
          playerId = nanoid();
          const username = payload.username || `Player_${playerId.slice(0, 6)}`;
          const player = gameManager.addPlayer(playerId, username, socket);
          
          socket.send(JSON.stringify({
            event: 'joined',
            data: {
              playerId,
              player,
              gameState: {
                players: Array.from(gameManager.getAllPlayers()),
                monsters: gameManager.getMonsters(),
                resourcePlots: gameManager.getResourcePlots(),
                alliances: gameManager.getAlliances(),
              },
            },
          }));

          gameManager.broadcast('playerJoined', player, playerId);
          break;

        case 'updateResources':
          if (playerId) {
            gameManager.updateResources(playerId, payload.resources);
          }
          break;

        case 'upgradeBuilding':
          if (playerId) {
            gameManager.upgradeBuilding(
              playerId,
              payload.buildingId,
              payload.targetLevel,
              payload.duration
            );
          }
          break;

        case 'completeBuildingUpgrade':
          if (playerId) {
            gameManager.completeUpgrade(playerId, payload.buildingId);
          }
          break;

        case 'addTrainingQueue':
          if (playerId) {
            gameManager.addTrainingQueue(playerId, payload.queue);
          }
          break;

        case 'completeTroopTraining':
          if (playerId) {
            gameManager.completeTroopTraining(playerId, payload.queueId);
          }
          break;

        case 'createAlliance':
          if (playerId) {
            const alliance = gameManager.createAlliance(
              nanoid(),
              payload.name,
              payload.tag,
              playerId
            );
            socket.send(JSON.stringify({
              event: 'allianceCreated',
              data: alliance,
            }));
            gameManager.broadcast('allianceCreated', alliance);
          }
          break;

        case 'joinAlliance':
          if (playerId) {
            const success = gameManager.joinAlliance(playerId, payload.allianceId);
            socket.send(JSON.stringify({
              event: 'allianceJoinResult',
              data: { success },
            }));
            if (success) {
              gameManager.broadcast('playerJoinedAlliance', { playerId, allianceId: payload.allianceId });
            }
          }
          break;

        case 'requestGameState':
          socket.send(JSON.stringify({
            event: 'gameState',
            data: {
              players: gameManager.getAllPlayers(),
              monsters: gameManager.getMonsters(),
              resourcePlots: gameManager.getResourcePlots(),
              alliances: gameManager.getAlliances(),
            },
          }));
          break;

        default:
          console.log('Unknown event:', event);
      }
    }
  });

  return httpServer;
}

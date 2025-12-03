import { useEffect, useRef } from 'react';
import { usePlayerStore } from './stores/usePlayerStore';
import { useGameStore } from './stores/useGameStore';
import type { Player, Alliance, Monster, ResourcePlot } from '@shared/gameTypes';

export function useWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  
  const {
    setPlayerId,
    setResources,
    setBuildings,
    setCastleLevel,
    setTroops,
    setTrainingQueues,
    setAllianceId,
    updateBuilding,
    addTroops,
    removeTrainingQueue,
  } = usePlayerStore();

  const {
    setIsConnected,
    setPlayers,
    setMonsters,
    setResourcePlots,
    setAlliances,
    updatePlayer,
    removePlayer,
  } = useGameStore();

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  function connectWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/game`);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      
      ws.send(JSON.stringify({
        event: 'join',
        payload: {
          username: `Player_${Math.random().toString(36).substring(7)}`,
        },
      }));
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        handleMessage(message);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      
      reconnectTimeoutRef.current = setTimeout(() => {
        console.log('Reconnecting...');
        connectWebSocket();
      }, 3000);
    };

    wsRef.current = ws;
  }

  function handleMessage(message: { event: string; data: any }) {
    const { event, data } = message;

    switch (event) {
      case 'joined':
        console.log('Joined game as player:', data.playerId);
        setPlayerId(data.playerId);
        setResources(data.player.resources);
        setBuildings(data.player.buildings);
        setCastleLevel(data.player.castleLevel);
        setTroops(data.player.troops);
        setTrainingQueues(data.player.trainingQueues);
        
        const playersMap = new Map<string, Player>();
        data.gameState.players.forEach((p: Player) => {
          playersMap.set(p.id, p);
        });
        setPlayers(playersMap);
        
        setMonsters(data.gameState.monsters);
        setResourcePlots(data.gameState.resourcePlots);
        
        const alliancesMap = new Map<string, Alliance>();
        data.gameState.alliances.forEach((a: Alliance) => {
          alliancesMap.set(a.id, a);
        });
        setAlliances(alliancesMap);
        break;

      case 'playerJoined':
        console.log('Player joined:', data);
        updatePlayer(data.id, data);
        break;

      case 'playerLeft':
        console.log('Player left:', data.playerId);
        removePlayer(data.playerId);
        break;

      case 'resourcesUpdated':
        setResources(data);
        break;

      case 'buildingUpgradeStarted':
        console.log('Building upgrade started:', data);
        updateBuilding(data.buildingId, {
          upgrading: {
            targetLevel: data.targetLevel,
            startTime: Date.now(),
            duration: data.duration * 1000,
          },
        });
        break;

      case 'buildingUpgradeCompleted':
        console.log('Building upgrade completed:', data);
        updateBuilding(data.buildingId, {
          level: data.level,
          upgrading: undefined,
        });
        if (data.buildingType === 'castle') {
          setCastleLevel(data.level);
        }
        break;

      case 'trainingQueueAdded':
        console.log('Training queue added:', data);
        break;

      case 'troopTrainingCompleted':
        console.log('Troop training completed:', data);
        const { troop } = data;
        addTroops({
          type: troop.troopType,
          tier: troop.tier,
          category: troop.category,
          count: troop.count,
        });
        removeTrainingQueue(data.queueId);
        break;

      case 'allianceCreated':
        console.log('Alliance created:', data);
        break;

      case 'gameState':
        console.log('Received game state update');
        break;

      default:
        console.log('Unknown event:', event, data);
    }
  }

  function sendMessage(event: string, payload: any) {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ event, payload }));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  return { sendMessage, isConnected: wsRef.current?.readyState === WebSocket.OPEN };
}

export function useWebSocketSend() {
  const wsRef = useRef<WebSocket | null>(null);

  return (event: string, payload: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ event, payload }));
    }
  };
}

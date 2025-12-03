import type { Player, Alliance, Monster, ResourcePlot, GameState, Resources, Building, TroopUnit, TrainingQueue } from '../shared/gameTypes';
import { WORLD_MAP_SIZE, INITIAL_RESOURCES, MONSTER_INFO } from '../shared/gameConstants';

export class GameManager {
  private players: Map<string, Player> = new Map();
  private alliances: Map<string, Alliance> = new Map();
  private monsters: Monster[] = [];
  private resourcePlots: ResourcePlot[] = [];
  private playerSockets: Map<string, any> = new Map();

  constructor() {
    this.initializeWorld();
  }

  private initializeWorld() {
    this.generateMonsters();
    this.generateResourcePlots();
  }

  private generateMonsters() {
    const monsterTypes: Array<keyof typeof MONSTER_INFO> = ['centaur', 'griffin', 'yeti'];
    
    for (let i = 0; i < 30; i++) {
      const type = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
      const level = Math.floor(Math.random() * 10) + 1;
      const info = MONSTER_INFO[type];
      
      this.monsters.push({
        id: `monster_${i}`,
        type,
        level,
        position: {
          x: Math.random() * WORLD_MAP_SIZE.width,
          y: Math.random() * WORLD_MAP_SIZE.height,
        },
        health: info.baseHealth * level,
        maxHealth: info.baseHealth * level,
        rewards: {
          food: info.baseRewards.food * level,
          wood: info.baseRewards.wood * level,
          stone: info.baseRewards.stone * level,
          iron: info.baseRewards.iron * level,
          gold: info.baseRewards.gold * level,
        },
      });
    }
  }

  private generateResourcePlots() {
    const resourceTypes: Array<'food' | 'wood' | 'stone' | 'iron'> = ['food', 'wood', 'stone', 'iron'];
    
    for (let i = 0; i < 50; i++) {
      const type = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
      const level = Math.floor(Math.random() * 5) + 1;
      const capacity = 10000 * level;
      
      this.resourcePlots.push({
        id: `plot_${i}`,
        type,
        level,
        position: {
          x: Math.random() * WORLD_MAP_SIZE.width,
          y: Math.random() * WORLD_MAP_SIZE.height,
        },
        capacity,
        remaining: capacity,
      });
    }
  }

  addPlayer(playerId: string, username: string, socket: any): Player {
    const player: Player = {
      id: playerId,
      username,
      castleLevel: 1,
      position: {
        x: Math.random() * WORLD_MAP_SIZE.width,
        y: Math.random() * WORLD_MAP_SIZE.height,
      },
      resources: { ...INITIAL_RESOURCES },
      buildings: this.createInitialBuildings(),
      troops: [],
      trainingQueues: [],
      marches: [],
      power: 100,
    };

    this.players.set(playerId, player);
    this.playerSockets.set(playerId, socket);
    return player;
  }

  private createInitialBuildings(): Building[] {
    return [
      {
        id: 'castle_main',
        type: 'castle',
        level: 1,
        position: { x: 0, y: 0, z: 0 },
      },
      {
        id: 'farm_1',
        type: 'farm',
        level: 1,
        position: { x: -10, y: 0, z: 5 },
      },
      {
        id: 'lumberMill_1',
        type: 'lumberMill',
        level: 1,
        position: { x: 10, y: 0, z: 5 },
      },
      {
        id: 'barracks_1',
        type: 'barracks',
        level: 1,
        position: { x: -5, y: 0, z: -8 },
      },
    ];
  }

  removePlayer(playerId: string) {
    this.players.delete(playerId);
    this.playerSockets.delete(playerId);
  }

  getPlayer(playerId: string): Player | undefined {
    return this.players.get(playerId);
  }

  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  updatePlayer(playerId: string, updates: Partial<Player>) {
    const player = this.players.get(playerId);
    if (player) {
      this.players.set(playerId, { ...player, ...updates });
    }
  }

  getMonsters(): Monster[] {
    return this.monsters;
  }

  getResourcePlots(): ResourcePlot[] {
    return this.resourcePlots;
  }

  getAlliances(): Alliance[] {
    return Array.from(this.alliances.values());
  }

  createAlliance(allianceId: string, name: string, tag: string, leaderId: string): Alliance {
    const alliance: Alliance = {
      id: allianceId,
      name,
      tag,
      leaderId,
      members: [leaderId],
      turrets: [],
    };

    this.alliances.set(allianceId, alliance);
    return alliance;
  }

  joinAlliance(playerId: string, allianceId: string): boolean {
    const alliance = this.alliances.get(allianceId);
    const player = this.players.get(playerId);
    
    if (alliance && player && !alliance.members.includes(playerId)) {
      alliance.members.push(playerId);
      player.allianceId = allianceId;
      return true;
    }
    return false;
  }

  broadcast(event: string, data: any, excludePlayerId?: string) {
    this.playerSockets.forEach((socket, playerId) => {
      if (playerId !== excludePlayerId) {
        socket.send(JSON.stringify({ event, data }));
      }
    });
  }

  sendToPlayer(playerId: string, event: string, data: any) {
    const socket = this.playerSockets.get(playerId);
    if (socket) {
      socket.send(JSON.stringify({ event, data }));
    }
  }

  updateResources(playerId: string, resources: Resources) {
    const player = this.players.get(playerId);
    if (player) {
      player.resources = resources;
      this.sendToPlayer(playerId, 'resourcesUpdated', resources);
    }
  }

  upgradeBuilding(playerId: string, buildingId: string, targetLevel: number, duration: number) {
    const player = this.players.get(playerId);
    if (!player) return;

    const building = player.buildings.find((b) => b.id === buildingId);
    if (!building) return;

    building.upgrading = {
      targetLevel,
      startTime: Date.now(),
      duration: duration * 1000,
    };

    this.broadcast('buildingUpgradeStarted', { playerId, buildingId, targetLevel });
  }

  completeUpgrade(playerId: string, buildingId: string) {
    const player = this.players.get(playerId);
    if (!player) return;

    const building = player.buildings.find((b) => b.id === buildingId);
    if (!building || !building.upgrading) return;

    building.level = building.upgrading.targetLevel;
    building.upgrading = undefined;

    if (building.type === 'castle') {
      player.castleLevel = building.level;
    }

    this.broadcast('buildingUpgradeCompleted', { playerId, buildingId, level: building.level });
  }

  addTrainingQueue(playerId: string, queue: TrainingQueue) {
    const player = this.players.get(playerId);
    if (!player) return;

    player.trainingQueues.push(queue);
    this.broadcast('trainingQueueAdded', { playerId, queue });
  }

  completeTroopTraining(playerId: string, queueId: string) {
    const player = this.players.get(playerId);
    if (!player) return;

    const queueIndex = player.trainingQueues.findIndex((q) => q.id === queueId);
    if (queueIndex === -1) return;

    const queue = player.trainingQueues[queueIndex];
    const existingTroop = player.troops.find(
      (t) => t.type === queue.troopType && t.tier === queue.tier
    );

    if (existingTroop) {
      existingTroop.count += queue.count;
    } else {
      player.troops.push({
        type: queue.troopType,
        tier: queue.tier,
        category: queue.troopType.includes('cavalry') ? 'cavalry' :
                  queue.troopType.includes('archer') || queue.troopType.includes('crossbowman') ? 'archer' :
                  queue.troopType.includes('assault') || queue.troopType.includes('trebuchet') ? 'siege' :
                  'infantry',
        count: queue.count,
      });
    }

    player.trainingQueues.splice(queueIndex, 1);
    this.broadcast('troopTrainingCompleted', { playerId, queueId, troop: queue });
  }

  getGameState(): GameState {
    return {
      players: this.players,
      alliances: this.alliances,
      monsters: this.monsters,
      resourcePlots: this.resourcePlots,
      worldSize: WORLD_MAP_SIZE,
    };
  }
}

export const gameManager = new GameManager();

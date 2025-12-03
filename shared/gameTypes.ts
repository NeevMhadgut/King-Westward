export type ResourceType = 'food' | 'wood' | 'stone' | 'iron' | 'gold';

export interface Resources {
  food: number;
  wood: number;
  stone: number;
  iron: number;
  gold: number;
}

export type BuildingType = 
  | 'castle'
  | 'barracks'
  | 'stables'
  | 'range'
  | 'siegeWorkshop'
  | 'drillGrounds'
  | 'watchtower'
  | 'blacksmith'
  | 'college'
  | 'fortress'
  | 'market'
  | 'embassy'
  | 'depot'
  | 'farm'
  | 'lumberMill'
  | 'quarry'
  | 'ironMine'
  | 'militaryTent'
  | 'hospital'
  | 'hallOfWar';

export type TroopType = 
  | 'shieldSoldier'
  | 'pikeman'
  | 'meleeCavalry'
  | 'cavalryShooter'
  | 'archer'
  | 'crossbowman'
  | 'assaultCart'
  | 'trebuchet';

export type TroopCategory = 'infantry' | 'cavalry' | 'archer' | 'siege';

export type MonsterType = 'centaur' | 'griffin' | 'yeti';

export type AllianceBuildingType = 'allianceFort' | 'allianceTurret' | 'allianceSuperMine';

export interface Building {
  id: string;
  type: BuildingType;
  level: number;
  position: { x: number; y: number; z: number };
  upgrading?: {
    targetLevel: number;
    startTime: number;
    duration: number;
  };
}

export interface TroopUnit {
  type: TroopType;
  tier: number;
  category: TroopCategory;
  count: number;
}

export interface TrainingQueue {
  id: string;
  troopType: TroopType;
  tier: number;
  count: number;
  startTime: number;
  duration: number;
  buildingId: string;
}

export interface March {
  id: string;
  playerId: string;
  troops: TroopUnit[];
  origin: { x: number; y: number };
  destination: { x: number; y: number };
  startTime: number;
  arrivalTime: number;
  missionType: 'attack' | 'gather' | 'scout' | 'reinforce' | 'rally';
  targetId?: string;
}

export interface Monster {
  id: string;
  type: MonsterType;
  level: number;
  position: { x: number; y: number };
  health: number;
  maxHealth: number;
  rewards: Resources;
}

export interface ResourcePlot {
  id: string;
  type: Exclude<ResourceType, 'gold'>;
  level: number;
  position: { x: number; y: number };
  capacity: number;
  remaining: number;
  occupiedBy?: string;
}

export interface Player {
  id: string;
  username: string;
  castleLevel: number;
  position: { x: number; y: number };
  resources: Resources;
  buildings: Building[];
  troops: TroopUnit[];
  trainingQueues: TrainingQueue[];
  marches: March[];
  allianceId?: string;
  power: number;
}

export interface Alliance {
  id: string;
  name: string;
  tag: string;
  leaderId: string;
  members: string[];
  fort?: {
    position: { x: number; y: number };
    level: number;
  };
  turrets: Array<{
    id: string;
    position: { x: number; y: number };
    level: number;
  }>;
  superMine?: {
    id: string;
    position: { x: number; y: number };
    capacity: number;
    remaining: number;
  };
}

export interface GameState {
  players: Map<string, Player>;
  alliances: Map<string, Alliance>;
  monsters: Monster[];
  resourcePlots: ResourcePlot[];
  worldSize: { width: number; height: number };
}

export interface BattleReport {
  id: string;
  attackerId: string;
  defenderId: string;
  attackerTroops: TroopUnit[];
  defenderTroops: TroopUnit[];
  attackerLosses: TroopUnit[];
  defenderLosses: TroopUnit[];
  winner: 'attacker' | 'defender';
  resourcesStolen?: Resources;
  timestamp: number;
}

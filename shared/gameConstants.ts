import { BuildingType, ResourceType, TroopType, TroopCategory, MonsterType } from './gameTypes';

export const CASTLE_TIER_REQUIREMENTS: Record<number, number> = {
  1: 1,
  2: 4,
  3: 7,
  4: 10,
  5: 13,
  6: 16,
  7: 19,
  8: 22,
  9: 26,
  10: 30,
};

export const MAX_CASTLE_LEVEL = 30;

export interface BuildingInfo {
  name: string;
  description: string;
  maxLevel: number;
  baseUpgradeCost: Record<ResourceType, number>;
  baseUpgradeTime: number;
  produces?: ResourceType;
  productionRate?: number;
}

export const BUILDING_INFO: Record<BuildingType, BuildingInfo> = {
  castle: {
    name: 'Castle',
    description: 'The heart of your kingdom. Upgrading unlocks new troops and buildings.',
    maxLevel: 30,
    baseUpgradeCost: { food: 200, wood: 200, stone: 100, iron: 50, gold: 0 },
    baseUpgradeTime: 60,
  },
  barracks: {
    name: 'Barracks',
    description: 'Train infantry units.',
    maxLevel: 30,
    baseUpgradeCost: { food: 100, wood: 150, stone: 50, iron: 30, gold: 0 },
    baseUpgradeTime: 30,
  },
  stables: {
    name: 'Stables',
    description: 'Train cavalry units.',
    maxLevel: 30,
    baseUpgradeCost: { food: 120, wood: 100, stone: 60, iron: 40, gold: 0 },
    baseUpgradeTime: 30,
  },
  range: {
    name: 'Range',
    description: 'Train archer units.',
    maxLevel: 30,
    baseUpgradeCost: { food: 80, wood: 180, stone: 40, iron: 30, gold: 0 },
    baseUpgradeTime: 30,
  },
  siegeWorkshop: {
    name: 'Siege Workshop',
    description: 'Build siege engines.',
    maxLevel: 30,
    baseUpgradeCost: { food: 100, wood: 200, stone: 100, iron: 80, gold: 0 },
    baseUpgradeTime: 35,
  },
  drillGrounds: {
    name: 'Drill Grounds',
    description: 'Increase marching capacity.',
    maxLevel: 20,
    baseUpgradeCost: { food: 150, wood: 150, stone: 80, iron: 50, gold: 0 },
    baseUpgradeTime: 25,
  },
  watchtower: {
    name: 'Watchtower',
    description: 'Scout enemy troops and defend against attacks.',
    maxLevel: 20,
    baseUpgradeCost: { food: 100, wood: 120, stone: 100, iron: 40, gold: 0 },
    baseUpgradeTime: 20,
  },
  blacksmith: {
    name: 'Blacksmith',
    description: 'Forge weapons and equipment for stat bonuses.',
    maxLevel: 25,
    baseUpgradeCost: { food: 80, wood: 100, stone: 80, iron: 100, gold: 0 },
    baseUpgradeTime: 30,
  },
  college: {
    name: 'College',
    description: 'Research technologies to enhance your kingdom.',
    maxLevel: 25,
    baseUpgradeCost: { food: 150, wood: 150, stone: 100, iron: 80, gold: 0 },
    baseUpgradeTime: 35,
  },
  fortress: {
    name: 'Fortress',
    description: 'Build traps to defend your castle.',
    maxLevel: 25,
    baseUpgradeCost: { food: 120, wood: 150, stone: 120, iron: 60, gold: 0 },
    baseUpgradeTime: 25,
  },
  market: {
    name: 'Market',
    description: 'Trade resources with other players.',
    maxLevel: 20,
    baseUpgradeCost: { food: 100, wood: 100, stone: 60, iron: 40, gold: 0 },
    baseUpgradeTime: 20,
  },
  embassy: {
    name: 'Embassy',
    description: 'Receive reinforcements and form alliances.',
    maxLevel: 20,
    baseUpgradeCost: { food: 120, wood: 120, stone: 80, iron: 50, gold: 0 },
    baseUpgradeTime: 20,
  },
  depot: {
    name: 'Depot',
    description: 'Protect resources from being stolen.',
    maxLevel: 25,
    baseUpgradeCost: { food: 100, wood: 100, stone: 100, iron: 60, gold: 0 },
    baseUpgradeTime: 15,
  },
  farm: {
    name: 'Farm',
    description: 'Produces food over time.',
    maxLevel: 25,
    baseUpgradeCost: { food: 50, wood: 80, stone: 30, iron: 20, gold: 0 },
    baseUpgradeTime: 15,
    produces: 'food',
    productionRate: 100,
  },
  lumberMill: {
    name: 'Lumber Mill',
    description: 'Produces wood over time.',
    maxLevel: 25,
    baseUpgradeCost: { food: 50, wood: 80, stone: 30, iron: 20, gold: 0 },
    baseUpgradeTime: 15,
    produces: 'wood',
    productionRate: 100,
  },
  quarry: {
    name: 'Quarry',
    description: 'Produces stone over time.',
    maxLevel: 25,
    baseUpgradeCost: { food: 50, wood: 80, stone: 30, iron: 20, gold: 0 },
    baseUpgradeTime: 15,
    produces: 'stone',
    productionRate: 80,
  },
  ironMine: {
    name: 'Iron Mine',
    description: 'Produces iron over time.',
    maxLevel: 25,
    baseUpgradeCost: { food: 50, wood: 80, stone: 30, iron: 20, gold: 0 },
    baseUpgradeTime: 15,
    produces: 'iron',
    productionRate: 60,
  },
  militaryTent: {
    name: 'Military Tent',
    description: 'Increase training capacity.',
    maxLevel: 20,
    baseUpgradeCost: { food: 100, wood: 120, stone: 60, iron: 40, gold: 0 },
    baseUpgradeTime: 20,
  },
  hospital: {
    name: 'Hospital',
    description: 'Heal wounded troops after battle.',
    maxLevel: 25,
    baseUpgradeCost: { food: 120, wood: 100, stone: 80, iron: 60, gold: 0 },
    baseUpgradeTime: 25,
  },
  hallOfWar: {
    name: 'Hall of War',
    description: 'Rally troops to attack other castles.',
    maxLevel: 20,
    baseUpgradeCost: { food: 150, wood: 150, stone: 100, iron: 80, gold: 0 },
    baseUpgradeTime: 30,
  },
};

export interface TroopInfo {
  name: string;
  category: TroopCategory;
  tier: number;
  trainingCost: Record<ResourceType, number>;
  trainingTime: number;
  attack: number;
  defense: number;
  health: number;
  speed: number;
  load: number;
  strongAgainst?: TroopCategory;
  weakAgainst?: TroopCategory;
}

export const TROOP_INFO: Record<string, TroopInfo> = {
  'shieldSoldier_1': { name: 'Shield Soldier T1', category: 'infantry', tier: 1, trainingCost: { food: 50, wood: 20, stone: 10, iron: 5, gold: 0 }, trainingTime: 30, attack: 8, defense: 15, health: 100, speed: 5, load: 20, strongAgainst: 'cavalry' },
  'shieldSoldier_2': { name: 'Shield Soldier T2', category: 'infantry', tier: 2, trainingCost: { food: 80, wood: 30, stone: 15, iron: 8, gold: 0 }, trainingTime: 45, attack: 12, defense: 22, health: 150, speed: 5, load: 25, strongAgainst: 'cavalry' },
  'shieldSoldier_3': { name: 'Shield Soldier T3', category: 'infantry', tier: 3, trainingCost: { food: 120, wood: 45, stone: 22, iron: 12, gold: 0 }, trainingTime: 60, attack: 18, defense: 32, health: 220, speed: 5, load: 30, strongAgainst: 'cavalry' },
  'shieldSoldier_4': { name: 'Shield Soldier T4', category: 'infantry', tier: 4, trainingCost: { food: 180, wood: 65, stone: 35, iron: 18, gold: 0 }, trainingTime: 90, attack: 26, defense: 45, health: 310, speed: 5, load: 35, strongAgainst: 'cavalry' },
  'shieldSoldier_5': { name: 'Shield Soldier T5', category: 'infantry', tier: 5, trainingCost: { food: 260, wood: 95, stone: 50, iron: 28, gold: 0 }, trainingTime: 120, attack: 38, defense: 62, health: 450, speed: 5, load: 40, strongAgainst: 'cavalry' },
  'shieldSoldier_6': { name: 'Shield Soldier T6', category: 'infantry', tier: 6, trainingCost: { food: 370, wood: 135, stone: 72, iron: 40, gold: 0 }, trainingTime: 150, attack: 54, defense: 85, health: 620, speed: 5, load: 45, strongAgainst: 'cavalry' },
  'shieldSoldier_7': { name: 'Shield Soldier T7', category: 'infantry', tier: 7, trainingCost: { food: 520, wood: 190, stone: 100, iron: 58, gold: 0 }, trainingTime: 180, attack: 75, defense: 115, health: 850, speed: 5, load: 50, strongAgainst: 'cavalry' },
  'shieldSoldier_8': { name: 'Shield Soldier T8', category: 'infantry', tier: 8, trainingCost: { food: 720, wood: 265, stone: 140, iron: 82, gold: 0 }, trainingTime: 210, attack: 102, defense: 155, health: 1150, speed: 5, load: 55, strongAgainst: 'cavalry' },
  'shieldSoldier_9': { name: 'Shield Soldier T9', category: 'infantry', tier: 9, trainingCost: { food: 980, wood: 365, stone: 195, iron: 115, gold: 0 }, trainingTime: 240, attack: 138, defense: 208, health: 1550, speed: 5, load: 60, strongAgainst: 'cavalry' },
  'shieldSoldier_10': { name: 'Shield Soldier T10', category: 'infantry', tier: 10, trainingCost: { food: 1320, wood: 500, stone: 270, iron: 160, gold: 0 }, trainingTime: 300, attack: 185, defense: 280, health: 2080, speed: 5, load: 70, strongAgainst: 'cavalry' },

  'pikeman_1': { name: 'Pikeman T1', category: 'infantry', tier: 1, trainingCost: { food: 60, wood: 15, stone: 12, iron: 8, gold: 0 }, trainingTime: 30, attack: 15, defense: 8, health: 90, speed: 6, load: 18, strongAgainst: 'cavalry', weakAgainst: 'siege' },
  'pikeman_2': { name: 'Pikeman T2', category: 'infantry', tier: 2, trainingCost: { food: 95, wood: 25, stone: 18, iron: 12, gold: 0 }, trainingTime: 45, attack: 22, defense: 12, health: 135, speed: 6, load: 22, strongAgainst: 'cavalry', weakAgainst: 'siege' },
  'pikeman_3': { name: 'Pikeman T3', category: 'infantry', tier: 3, trainingCost: { food: 140, wood: 38, stone: 28, iron: 18, gold: 0 }, trainingTime: 60, attack: 32, defense: 18, health: 200, speed: 6, load: 28, strongAgainst: 'cavalry', weakAgainst: 'siege' },
  'pikeman_4': { name: 'Pikeman T4', category: 'infantry', tier: 4, trainingCost: { food: 210, wood: 55, stone: 42, iron: 28, gold: 0 }, trainingTime: 90, attack: 45, defense: 26, health: 285, speed: 6, load: 32, strongAgainst: 'cavalry', weakAgainst: 'siege' },
  'pikeman_5': { name: 'Pikeman T5', category: 'infantry', tier: 5, trainingCost: { food: 300, wood: 80, stone: 60, iron: 40, gold: 0 }, trainingTime: 120, attack: 62, defense: 38, health: 410, speed: 6, load: 38, strongAgainst: 'cavalry', weakAgainst: 'siege' },
  'pikeman_6': { name: 'Pikeman T6', category: 'infantry', tier: 6, trainingCost: { food: 425, wood: 115, stone: 85, iron: 58, gold: 0 }, trainingTime: 150, attack: 85, defense: 54, health: 570, speed: 6, load: 42, strongAgainst: 'cavalry', weakAgainst: 'siege' },
  'pikeman_7': { name: 'Pikeman T7', category: 'infantry', tier: 7, trainingCost: { food: 595, wood: 160, stone: 120, iron: 80, gold: 0 }, trainingTime: 180, attack: 115, defense: 75, health: 780, speed: 6, load: 48, strongAgainst: 'cavalry', weakAgainst: 'siege' },
  'pikeman_8': { name: 'Pikeman T8', category: 'infantry', tier: 8, trainingCost: { food: 820, wood: 225, stone: 165, iron: 115, gold: 0 }, trainingTime: 210, attack: 155, defense: 102, health: 1060, speed: 6, load: 52, strongAgainst: 'cavalry', weakAgainst: 'siege' },
  'pikeman_9': { name: 'Pikeman T9', category: 'infantry', tier: 9, trainingCost: { food: 1115, wood: 310, stone: 230, iron: 160, gold: 0 }, trainingTime: 240, attack: 208, defense: 138, health: 1430, speed: 6, load: 58, strongAgainst: 'cavalry', weakAgainst: 'siege' },
  'pikeman_10': { name: 'Pikeman T10', category: 'infantry', tier: 10, trainingCost: { food: 1500, wood: 425, stone: 315, iron: 220, gold: 0 }, trainingTime: 300, attack: 280, defense: 185, health: 1920, speed: 6, load: 65, strongAgainst: 'cavalry', weakAgainst: 'siege' },

  'meleeCavalry_1': { name: 'Melee Cavalry T1', category: 'cavalry', tier: 1, trainingCost: { food: 70, wood: 25, stone: 8, iron: 12, gold: 0 }, trainingTime: 35, attack: 12, defense: 7, health: 85, speed: 10, load: 25, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'meleeCavalry_2': { name: 'Melee Cavalry T2', category: 'cavalry', tier: 2, trainingCost: { food: 110, wood: 38, stone: 12, iron: 18, gold: 0 }, trainingTime: 50, attack: 18, defense: 10, health: 128, speed: 10, load: 30, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'meleeCavalry_3': { name: 'Melee Cavalry T3', category: 'cavalry', tier: 3, trainingCost: { food: 165, wood: 55, stone: 18, iron: 28, gold: 0 }, trainingTime: 70, attack: 26, defense: 15, health: 190, speed: 11, load: 35, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'meleeCavalry_4': { name: 'Melee Cavalry T4', category: 'cavalry', tier: 4, trainingCost: { food: 245, wood: 82, stone: 28, iron: 42, gold: 0 }, trainingTime: 100, attack: 38, defense: 22, health: 270, speed: 11, load: 42, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'meleeCavalry_5': { name: 'Melee Cavalry T5', category: 'cavalry', tier: 5, trainingCost: { food: 350, wood: 120, stone: 40, iron: 60, gold: 0 }, trainingTime: 135, attack: 54, defense: 32, health: 390, speed: 12, load: 48, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'meleeCavalry_6': { name: 'Melee Cavalry T6', category: 'cavalry', tier: 6, trainingCost: { food: 495, wood: 170, stone: 58, iron: 85, gold: 0 }, trainingTime: 165, attack: 75, defense: 45, health: 540, speed: 12, load: 55, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'meleeCavalry_7': { name: 'Melee Cavalry T7', category: 'cavalry', tier: 7, trainingCost: { food: 690, wood: 235, stone: 80, iron: 120, gold: 0 }, trainingTime: 200, attack: 102, defense: 62, health: 740, speed: 13, load: 62, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'meleeCavalry_8': { name: 'Melee Cavalry T8', category: 'cavalry', tier: 8, trainingCost: { food: 950, wood: 330, stone: 115, iron: 170, gold: 0 }, trainingTime: 230, attack: 138, defense: 85, health: 1010, speed: 13, load: 68, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'meleeCavalry_9': { name: 'Melee Cavalry T9', category: 'cavalry', tier: 9, trainingCost: { food: 1290, wood: 450, stone: 160, iron: 235, gold: 0 }, trainingTime: 270, attack: 185, defense: 115, health: 1360, speed: 14, load: 75, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'meleeCavalry_10': { name: 'Melee Cavalry T10', category: 'cavalry', tier: 10, trainingCost: { food: 1740, wood: 615, stone: 220, iron: 320, gold: 0 }, trainingTime: 330, attack: 250, defense: 155, health: 1830, speed: 14, load: 85, strongAgainst: 'archer', weakAgainst: 'infantry' },

  'cavalryShooter_1': { name: 'Cavalry Shooter T1', category: 'cavalry', tier: 1, trainingCost: { food: 65, wood: 30, stone: 10, iron: 10, gold: 0 }, trainingTime: 35, attack: 14, defense: 6, health: 80, speed: 9, load: 22, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'cavalryShooter_2': { name: 'Cavalry Shooter T2', category: 'cavalry', tier: 2, trainingCost: { food: 100, wood: 45, stone: 15, iron: 15, gold: 0 }, trainingTime: 50, attack: 20, defense: 9, health: 120, speed: 9, load: 28, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'cavalryShooter_3': { name: 'Cavalry Shooter T3', category: 'cavalry', tier: 3, trainingCost: { food: 150, wood: 68, stone: 22, iron: 22, gold: 0 }, trainingTime: 70, attack: 29, defense: 13, health: 178, speed: 10, load: 32, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'cavalryShooter_4': { name: 'Cavalry Shooter T4', category: 'cavalry', tier: 4, trainingCost: { food: 225, wood: 100, stone: 32, iron: 32, gold: 0 }, trainingTime: 100, attack: 42, defense: 19, health: 255, speed: 10, load: 38, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'cavalryShooter_5': { name: 'Cavalry Shooter T5', category: 'cavalry', tier: 5, trainingCost: { food: 320, wood: 145, stone: 48, iron: 48, gold: 0 }, trainingTime: 135, attack: 59, defense: 28, health: 368, speed: 11, load: 45, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'cavalryShooter_6': { name: 'Cavalry Shooter T6', category: 'cavalry', tier: 6, trainingCost: { food: 455, wood: 205, stone: 68, iron: 68, gold: 0 }, trainingTime: 165, attack: 82, defense: 38, health: 510, speed: 11, load: 52, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'cavalryShooter_7': { name: 'Cavalry Shooter T7', category: 'cavalry', tier: 7, trainingCost: { food: 635, wood: 285, stone: 95, iron: 95, gold: 0 }, trainingTime: 200, attack: 112, defense: 52, health: 700, speed: 12, load: 58, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'cavalryShooter_8': { name: 'Cavalry Shooter T8', category: 'cavalry', tier: 8, trainingCost: { food: 870, wood: 395, stone: 132, iron: 132, gold: 0 }, trainingTime: 230, attack: 151, defense: 72, health: 955, speed: 12, load: 65, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'cavalryShooter_9': { name: 'Cavalry Shooter T9', category: 'cavalry', tier: 9, trainingCost: { food: 1185, wood: 540, stone: 180, iron: 180, gold: 0 }, trainingTime: 270, attack: 203, defense: 98, health: 1285, speed: 13, load: 72, strongAgainst: 'archer', weakAgainst: 'infantry' },
  'cavalryShooter_10': { name: 'Cavalry Shooter T10', category: 'cavalry', tier: 10, trainingCost: { food: 1600, wood: 730, stone: 245, iron: 245, gold: 0 }, trainingTime: 330, attack: 273, defense: 132, health: 1730, speed: 13, load: 80, strongAgainst: 'archer', weakAgainst: 'infantry' },

  'archer_1': { name: 'Archer T1', category: 'archer', tier: 1, trainingCost: { food: 55, wood: 35, stone: 5, iron: 8, gold: 0 }, trainingTime: 28, attack: 16, defense: 5, health: 70, speed: 7, load: 15, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'archer_2': { name: 'Archer T2', category: 'archer', tier: 2, trainingCost: { food: 85, wood: 52, stone: 8, iron: 12, gold: 0 }, trainingTime: 42, attack: 23, defense: 7, health: 105, speed: 7, load: 18, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'archer_3': { name: 'Archer T3', category: 'archer', tier: 3, trainingCost: { food: 125, wood: 78, stone: 12, iron: 18, gold: 0 }, trainingTime: 58, attack: 34, defense: 10, health: 155, speed: 7, load: 22, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'archer_4': { name: 'Archer T4', category: 'archer', tier: 4, trainingCost: { food: 190, wood: 115, stone: 18, iron: 28, gold: 0 }, trainingTime: 85, attack: 48, defense: 15, health: 222, speed: 8, load: 26, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'archer_5': { name: 'Archer T5', category: 'archer', tier: 5, trainingCost: { food: 270, wood: 165, stone: 28, iron: 40, gold: 0 }, trainingTime: 115, attack: 67, defense: 22, health: 320, speed: 8, load: 30, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'archer_6': { name: 'Archer T6', category: 'archer', tier: 6, trainingCost: { food: 385, wood: 235, stone: 40, iron: 58, gold: 0 }, trainingTime: 145, attack: 92, defense: 30, health: 445, speed: 8, load: 35, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'archer_7': { name: 'Archer T7', category: 'archer', tier: 7, trainingCost: { food: 540, wood: 330, stone: 55, iron: 80, gold: 0 }, trainingTime: 175, attack: 125, defense: 42, health: 610, speed: 9, load: 40, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'archer_8': { name: 'Archer T8', category: 'archer', tier: 8, trainingCost: { food: 745, wood: 455, stone: 78, iron: 115, gold: 0 }, trainingTime: 205, attack: 169, defense: 58, health: 830, speed: 9, load: 45, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'archer_9': { name: 'Archer T9', category: 'archer', tier: 9, trainingCost: { food: 1015, wood: 620, stone: 105, iron: 160, gold: 0 }, trainingTime: 240, attack: 228, defense: 78, health: 1120, speed: 9, load: 50, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'archer_10': { name: 'Archer T10', category: 'archer', tier: 10, trainingCost: { food: 1370, wood: 840, stone: 142, iron: 220, gold: 0 }, trainingTime: 290, attack: 307, defense: 105, health: 1510, speed: 10, load: 55, strongAgainst: 'siege', weakAgainst: 'cavalry' },

  'crossbowman_1': { name: 'Crossbowman T1', category: 'archer', tier: 1, trainingCost: { food: 60, wood: 38, stone: 8, iron: 10, gold: 0 }, trainingTime: 30, attack: 18, defense: 6, health: 75, speed: 6, load: 16, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'crossbowman_2': { name: 'Crossbowman T2', category: 'archer', tier: 2, trainingCost: { food: 92, wood: 58, stone: 12, iron: 15, gold: 0 }, trainingTime: 45, attack: 26, defense: 9, health: 112, speed: 6, load: 20, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'crossbowman_3': { name: 'Crossbowman T3', category: 'archer', tier: 3, trainingCost: { food: 138, wood: 85, stone: 18, iron: 22, gold: 0 }, trainingTime: 62, attack: 38, defense: 13, health: 165, speed: 6, load: 24, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'crossbowman_4': { name: 'Crossbowman T4', category: 'archer', tier: 4, trainingCost: { food: 205, wood: 128, stone: 28, iron: 32, gold: 0 }, trainingTime: 90, attack: 54, defense: 18, health: 238, speed: 7, load: 28, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'crossbowman_5': { name: 'Crossbowman T5', category: 'archer', tier: 5, trainingCost: { food: 295, wood: 185, stone: 40, iron: 48, gold: 0 }, trainingTime: 120, attack: 75, defense: 26, health: 342, speed: 7, load: 32, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'crossbowman_6': { name: 'Crossbowman T6', category: 'archer', tier: 6, trainingCost: { food: 420, wood: 265, stone: 58, iron: 68, gold: 0 }, trainingTime: 150, attack: 102, defense: 36, health: 476, speed: 7, load: 38, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'crossbowman_7': { name: 'Crossbowman T7', category: 'archer', tier: 7, trainingCost: { food: 585, wood: 370, stone: 80, iron: 95, gold: 0 }, trainingTime: 185, attack: 138, defense: 50, health: 652, speed: 8, load: 42, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'crossbowman_8': { name: 'Crossbowman T8', category: 'archer', tier: 8, trainingCost: { food: 810, wood: 510, stone: 115, iron: 132, gold: 0 }, trainingTime: 215, attack: 187, defense: 68, health: 888, speed: 8, load: 48, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'crossbowman_9': { name: 'Crossbowman T9', category: 'archer', tier: 9, trainingCost: { food: 1100, wood: 695, stone: 160, iron: 180, gold: 0 }, trainingTime: 250, attack: 252, defense: 92, health: 1198, speed: 8, load: 52, strongAgainst: 'siege', weakAgainst: 'cavalry' },
  'crossbowman_10': { name: 'Crossbowman T10', category: 'archer', tier: 10, trainingCost: { food: 1485, wood: 940, stone: 220, iron: 245, gold: 0 }, trainingTime: 300, attack: 339, defense: 124, health: 1615, speed: 9, load: 58, strongAgainst: 'siege', weakAgainst: 'cavalry' },

  'assaultCart_1': { name: 'Assault Cart T1', category: 'siege', tier: 1, trainingCost: { food: 80, wood: 50, stone: 20, iron: 15, gold: 0 }, trainingTime: 45, attack: 10, defense: 20, health: 150, speed: 3, load: 10, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'assaultCart_2': { name: 'Assault Cart T2', category: 'siege', tier: 2, trainingCost: { food: 125, wood: 75, stone: 30, iron: 22, gold: 0 }, trainingTime: 65, attack: 15, defense: 28, health: 225, speed: 3, load: 12, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'assaultCart_3': { name: 'Assault Cart T3', category: 'siege', tier: 3, trainingCost: { food: 185, wood: 115, stone: 45, iron: 32, gold: 0 }, trainingTime: 90, attack: 22, defense: 40, health: 335, speed: 3, load: 15, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'assaultCart_4': { name: 'Assault Cart T4', category: 'siege', tier: 4, trainingCost: { food: 280, wood: 170, stone: 68, iron: 48, gold: 0 }, trainingTime: 125, attack: 32, defense: 56, health: 485, speed: 3, load: 18, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'assaultCart_5': { name: 'Assault Cart T5', category: 'siege', tier: 5, trainingCost: { food: 400, wood: 245, stone: 98, iron: 70, gold: 0 }, trainingTime: 165, attack: 45, defense: 78, health: 700, speed: 4, load: 22, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'assaultCart_6': { name: 'Assault Cart T6', category: 'siege', tier: 6, trainingCost: { food: 570, wood: 350, stone: 140, iron: 100, gold: 0 }, trainingTime: 205, attack: 62, defense: 108, health: 970, speed: 4, load: 26, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'assaultCart_7': { name: 'Assault Cart T7', category: 'siege', tier: 7, trainingCost: { food: 795, wood: 490, stone: 195, iron: 140, gold: 0 }, trainingTime: 245, attack: 85, defense: 148, health: 1330, speed: 4, load: 30, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'assaultCart_8': { name: 'Assault Cart T8', category: 'siege', tier: 8, trainingCost: { food: 1095, wood: 675, stone: 270, iron: 195, gold: 0 }, trainingTime: 285, attack: 115, defense: 202, health: 1810, speed: 4, load: 35, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'assaultCart_9': { name: 'Assault Cart T9', category: 'siege', tier: 9, trainingCost: { food: 1490, wood: 920, stone: 365, iron: 265, gold: 0 }, trainingTime: 330, attack: 155, defense: 275, health: 2450, speed: 5, load: 40, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'assaultCart_10': { name: 'Assault Cart T10', category: 'siege', tier: 10, trainingCost: { food: 2010, wood: 1240, stone: 495, iron: 360, gold: 0 }, trainingTime: 400, attack: 208, defense: 370, health: 3300, speed: 5, load: 48, strongAgainst: 'infantry', weakAgainst: 'archer' },

  'trebuchet_1': { name: 'Trebuchet T1', category: 'siege', tier: 1, trainingCost: { food: 75, wood: 55, stone: 18, iron: 12, gold: 0 }, trainingTime: 40, attack: 25, defense: 8, health: 120, speed: 2, load: 8, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'trebuchet_2': { name: 'Trebuchet T2', category: 'siege', tier: 2, trainingCost: { food: 115, wood: 82, stone: 28, iron: 18, gold: 0 }, trainingTime: 60, attack: 36, defense: 12, health: 180, speed: 2, load: 10, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'trebuchet_3': { name: 'Trebuchet T3', category: 'siege', tier: 3, trainingCost: { food: 172, wood: 125, stone: 42, iron: 28, gold: 0 }, trainingTime: 85, attack: 52, defense: 18, health: 268, speed: 2, load: 12, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'trebuchet_4': { name: 'Trebuchet T4', category: 'siege', tier: 4, trainingCost: { food: 260, wood: 185, stone: 62, iron: 42, gold: 0 }, trainingTime: 120, attack: 75, defense: 26, health: 390, speed: 2, load: 15, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'trebuchet_5': { name: 'Trebuchet T5', category: 'siege', tier: 5, trainingCost: { food: 370, wood: 265, stone: 90, iron: 60, gold: 0 }, trainingTime: 160, attack: 105, defense: 38, health: 560, speed: 3, load: 18, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'trebuchet_6': { name: 'Trebuchet T6', category: 'siege', tier: 6, trainingCost: { food: 530, wood: 380, stone: 128, iron: 85, gold: 0 }, trainingTime: 200, attack: 145, defense: 52, health: 780, speed: 3, load: 22, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'trebuchet_7': { name: 'Trebuchet T7', category: 'siege', tier: 7, trainingCost: { food: 740, wood: 530, stone: 180, iron: 120, gold: 0 }, trainingTime: 240, attack: 198, defense: 72, health: 1070, speed: 3, load: 26, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'trebuchet_8': { name: 'Trebuchet T8', category: 'siege', tier: 8, trainingCost: { food: 1020, wood: 730, stone: 248, iron: 165, gold: 0 }, trainingTime: 280, attack: 269, defense: 98, health: 1455, speed: 3, load: 30, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'trebuchet_9': { name: 'Trebuchet T9', category: 'siege', tier: 9, trainingCost: { food: 1385, wood: 995, stone: 335, iron: 225, gold: 0 }, trainingTime: 325, attack: 364, defense: 135, health: 1970, speed: 4, load: 35, strongAgainst: 'infantry', weakAgainst: 'archer' },
  'trebuchet_10': { name: 'Trebuchet T10', category: 'siege', tier: 10, trainingCost: { food: 1870, wood: 1340, stone: 452, iron: 305, gold: 0 }, trainingTime: 390, attack: 492, defense: 182, health: 2660, speed: 4, load: 42, strongAgainst: 'infantry', weakAgainst: 'archer' },
};

export interface MonsterInfo {
  name: string;
  baseHealth: number;
  baseDamage: number;
  baseRewards: Resources;
}

export const MONSTER_INFO: Record<MonsterType, MonsterInfo> = {
  centaur: {
    name: 'Centaur',
    baseHealth: 5000,
    baseDamage: 150,
    baseRewards: { food: 500, wood: 500, stone: 300, iron: 200, gold: 5 },
  },
  griffin: {
    name: 'Griffin',
    baseHealth: 8000,
    baseDamage: 250,
    baseRewards: { food: 800, wood: 800, stone: 500, iron: 350, gold: 10 },
  },
  yeti: {
    name: 'Yeti',
    baseHealth: 12000,
    baseDamage: 400,
    baseRewards: { food: 1200, wood: 1200, stone: 800, iron: 600, gold: 15 },
  },
};

export const WORLD_MAP_SIZE = { width: 500, height: 500 };

export const INITIAL_RESOURCES: Resources = {
  food: 2000,
  wood: 2000,
  stone: 1000,
  iron: 500,
  gold: 100,
};

export const COMBAT_BONUS_MODIFIER = 1.5;
export const COMBAT_PENALTY_MODIFIER = 0.7;

export function getTroopKey(type: TroopType, tier: number): string {
  return `${type}_${tier}`;
}

export function canAfford(cost: Resources, available: Resources): boolean {
  return (
    available.food >= cost.food &&
    available.wood >= cost.wood &&
    available.stone >= cost.stone &&
    available.iron >= cost.iron &&
    available.gold >= cost.gold
  );
}

export function subtractResources(from: Resources, cost: Resources): Resources {
  return {
    food: from.food - cost.food,
    wood: from.wood - cost.wood,
    stone: from.stone - cost.stone,
    iron: from.iron - cost.iron,
    gold: from.gold - cost.gold,
  };
}

export function addResources(to: Resources, add: Resources): Resources {
  return {
    food: to.food + add.food,
    wood: to.wood + add.wood,
    stone: to.stone + add.stone,
    iron: to.iron + add.iron,
    gold: to.gold + add.gold,
  };
}

export function multiplyResources(resources: Resources, multiplier: number): Resources {
  return {
    food: Math.floor(resources.food * multiplier),
    wood: Math.floor(resources.wood * multiplier),
    stone: Math.floor(resources.stone * multiplier),
    iron: Math.floor(resources.iron * multiplier),
    gold: Math.floor(resources.gold * multiplier),
  };
}

export function getUpgradeCost(buildingType: BuildingType, currentLevel: number): Resources {
  const baseInfo = BUILDING_INFO[buildingType];
  const multiplier = Math.pow(1.5, currentLevel);
  return multiplyResources(baseInfo.baseUpgradeCost, multiplier);
}

export function getUpgradeTime(buildingType: BuildingType, currentLevel: number): number {
  const baseInfo = BUILDING_INFO[buildingType];
  return Math.floor(baseInfo.baseUpgradeTime * Math.pow(1.3, currentLevel));
}

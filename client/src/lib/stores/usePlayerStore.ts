import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Resources, Building, TroopUnit, TrainingQueue, March } from '@shared/gameTypes';
import { INITIAL_RESOURCES } from '@shared/gameConstants';

export interface PlayerState {
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
  
  setPlayerId: (id: string) => void;
  setUsername: (username: string) => void;
  setResources: (resources: Resources) => void;
  addResources: (resources: Partial<Resources>) => void;
  subtractResources: (resources: Partial<Resources>) => void;
  setCastleLevel: (level: number) => void;
  setBuildings: (buildings: Building[]) => void;
  addBuilding: (building: Building) => void;
  updateBuilding: (buildingId: string, updates: Partial<Building>) => void;
  setTroops: (troops: TroopUnit[]) => void;
  addTroops: (troops: TroopUnit) => void;
  removeTroops: (troopType: string, tier: number, count: number) => void;
  setTrainingQueues: (queues: TrainingQueue[]) => void;
  addTrainingQueue: (queue: TrainingQueue) => void;
  removeTrainingQueue: (queueId: string) => void;
  setMarches: (marches: March[]) => void;
  addMarch: (march: March) => void;
  removeMarch: (marchId: string) => void;
  setAllianceId: (allianceId: string | undefined) => void;
  setPower: (power: number) => void;
  reset: () => void;
}

const initialState = {
  id: '',
  username: 'Player',
  castleLevel: 1,
  position: { x: 250, y: 250 },
  resources: { ...INITIAL_RESOURCES },
  buildings: [],
  troops: [],
  trainingQueues: [],
  marches: [],
  allianceId: undefined,
  power: 0,
};

export const usePlayerStore = create<PlayerState>()(
  subscribeWithSelector((set) => ({
    ...initialState,

    setPlayerId: (id) => set({ id }),
    
    setUsername: (username) => set({ username }),
    
    setResources: (resources) => set({ resources }),
    
    addResources: (resources) => set((state) => ({
      resources: {
        food: state.resources.food + (resources.food || 0),
        wood: state.resources.wood + (resources.wood || 0),
        stone: state.resources.stone + (resources.stone || 0),
        iron: state.resources.iron + (resources.iron || 0),
        gold: state.resources.gold + (resources.gold || 0),
      },
    })),
    
    subtractResources: (resources) => set((state) => ({
      resources: {
        food: Math.max(0, state.resources.food - (resources.food || 0)),
        wood: Math.max(0, state.resources.wood - (resources.wood || 0)),
        stone: Math.max(0, state.resources.stone - (resources.stone || 0)),
        iron: Math.max(0, state.resources.iron - (resources.iron || 0)),
        gold: Math.max(0, state.resources.gold - (resources.gold || 0)),
      },
    })),
    
    setCastleLevel: (level) => set({ castleLevel: level }),
    
    setBuildings: (buildings) => set({ buildings }),
    
    addBuilding: (building) => set((state) => ({
      buildings: [...state.buildings, building],
    })),
    
    updateBuilding: (buildingId, updates) => set((state) => ({
      buildings: state.buildings.map((b) =>
        b.id === buildingId ? { ...b, ...updates } : b
      ),
    })),
    
    setTroops: (troops) => set({ troops }),
    
    addTroops: (newTroop) => set((state) => {
      const existingIndex = state.troops.findIndex(
        (t) => t.type === newTroop.type && t.tier === newTroop.tier
      );
      
      if (existingIndex >= 0) {
        const updated = [...state.troops];
        updated[existingIndex] = {
          ...updated[existingIndex],
          count: updated[existingIndex].count + newTroop.count,
        };
        return { troops: updated };
      } else {
        return { troops: [...state.troops, newTroop] };
      }
    }),
    
    removeTroops: (troopType, tier, count) => set((state) => ({
      troops: state.troops
        .map((t) =>
          t.type === troopType && t.tier === tier
            ? { ...t, count: t.count - count }
            : t
        )
        .filter((t) => t.count > 0),
    })),
    
    setTrainingQueues: (queues) => set({ trainingQueues: queues }),
    
    addTrainingQueue: (queue) => set((state) => ({
      trainingQueues: [...state.trainingQueues, queue],
    })),
    
    removeTrainingQueue: (queueId) => set((state) => ({
      trainingQueues: state.trainingQueues.filter((q) => q.id !== queueId),
    })),
    
    setMarches: (marches) => set({ marches }),
    
    addMarch: (march) => set((state) => ({
      marches: [...state.marches, march],
    })),
    
    removeMarch: (marchId) => set((state) => ({
      marches: state.marches.filter((m) => m.id !== marchId),
    })),
    
    setAllianceId: (allianceId) => set({ allianceId }),
    
    setPower: (power) => set({ power }),
    
    reset: () => set(initialState),
  }))
);

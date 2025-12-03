import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Player, Alliance, Monster, ResourcePlot } from '@shared/gameTypes';

export type ViewMode = 'city' | 'worldMap';

export interface GameStore {
  viewMode: ViewMode;
  players: Map<string, Player>;
  alliances: Map<string, Alliance>;
  monsters: Monster[];
  resourcePlots: ResourcePlot[];
  selectedBuildingId: string | null;
  selectedMonsterId: string | null;
  selectedResourcePlotId: string | null;
  selectedPlayerId: string | null;
  isConnected: boolean;
  
  setViewMode: (mode: ViewMode) => void;
  setPlayers: (players: Map<string, Player>) => void;
  updatePlayer: (playerId: string, player: Player) => void;
  removePlayer: (playerId: string) => void;
  setAlliances: (alliances: Map<string, Alliance>) => void;
  updateAlliance: (allianceId: string, alliance: Alliance) => void;
  setMonsters: (monsters: Monster[]) => void;
  updateMonster: (monsterId: string, updates: Partial<Monster>) => void;
  removeMonster: (monsterId: string) => void;
  setResourcePlots: (plots: ResourcePlot[]) => void;
  updateResourcePlot: (plotId: string, updates: Partial<ResourcePlot>) => void;
  setSelectedBuildingId: (id: string | null) => void;
  setSelectedMonsterId: (id: string | null) => void;
  setSelectedResourcePlotId: (id: string | null) => void;
  setSelectedPlayerId: (id: string | null) => void;
  setIsConnected: (connected: boolean) => void;
  reset: () => void;
}

const initialState = {
  viewMode: 'city' as ViewMode,
  players: new Map<string, Player>(),
  alliances: new Map<string, Alliance>(),
  monsters: [],
  resourcePlots: [],
  selectedBuildingId: null,
  selectedMonsterId: null,
  selectedResourcePlotId: null,
  selectedPlayerId: null,
  isConnected: false,
};

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set) => ({
    ...initialState,

    setViewMode: (mode) => set({ viewMode: mode }),

    setPlayers: (players) => set({ players }),

    updatePlayer: (playerId, player) => set((state) => {
      const newPlayers = new Map(state.players);
      newPlayers.set(playerId, player);
      return { players: newPlayers };
    }),

    removePlayer: (playerId) => set((state) => {
      const newPlayers = new Map(state.players);
      newPlayers.delete(playerId);
      return { players: newPlayers };
    }),

    setAlliances: (alliances) => set({ alliances }),

    updateAlliance: (allianceId, alliance) => set((state) => {
      const newAlliances = new Map(state.alliances);
      newAlliances.set(allianceId, alliance);
      return { alliances: newAlliances };
    }),

    setMonsters: (monsters) => set({ monsters }),

    updateMonster: (monsterId, updates) => set((state) => ({
      monsters: state.monsters.map((m) =>
        m.id === monsterId ? { ...m, ...updates } : m
      ),
    })),

    removeMonster: (monsterId) => set((state) => ({
      monsters: state.monsters.filter((m) => m.id !== monsterId),
    })),

    setResourcePlots: (plots) => set({ resourcePlots: plots }),

    updateResourcePlot: (plotId, updates) => set((state) => ({
      resourcePlots: state.resourcePlots.map((p) =>
        p.id === plotId ? { ...p, ...updates } : p
      ),
    })),

    setSelectedBuildingId: (id) => set({ selectedBuildingId: id }),

    setSelectedMonsterId: (id) => set({ selectedMonsterId: id }),

    setSelectedResourcePlotId: (id) => set({ selectedResourcePlotId: id }),

    setSelectedPlayerId: (id) => set({ selectedPlayerId: id }),

    setIsConnected: (connected) => set({ isConnected: connected }),

    reset: () => set(initialState),
  }))
);

import { useGameStore } from '../lib/stores/useGameStore';
import { usePlayerStore } from '../lib/stores/usePlayerStore';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MONSTER_INFO } from '@shared/gameConstants';

export function WorldMapInteractions() {
  const selectedMonsterId = useGameStore((state) => state.selectedMonsterId);
  const selectedResourcePlotId = useGameStore((state) => state.selectedResourcePlotId);
  const setSelectedMonsterId = useGameStore((state) => state.setSelectedMonsterId);
  const setSelectedResourcePlotId = useGameStore((state) => state.setSelectedResourcePlotId);
  const monsters = useGameStore((state) => state.monsters);
  const resourcePlots = useGameStore((state) => state.resourcePlots);
  const troops = usePlayerStore((state) => state.troops);

  const selectedMonster = monsters.find((m) => m.id === selectedMonsterId);
  const selectedPlot = resourcePlots.find((p) => p.id === selectedResourcePlotId);

  if (selectedMonster) {
    const info = MONSTER_INFO[selectedMonster.type];
    const healthPercent = (selectedMonster.health / selectedMonster.maxHealth) * 100;

    return (
      <Card className="absolute bottom-4 right-4 w-80 p-4 bg-stone-900/95 border-stone-700 text-white">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-red-400 capitalize">{selectedMonster.type}</h3>
            <p className="text-sm text-gray-400">Level {selectedMonster.level}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedMonsterId(null)}
          >
            ✕
          </Button>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Health</span>
            <span>{Math.floor(healthPercent)}%</span>
          </div>
          <div className="w-full bg-stone-700 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{ width: `${healthPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-green-900/30 rounded p-2 mb-3">
          <p className="text-sm font-semibold text-green-400 mb-1">Rewards:</p>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <span>🌾 {selectedMonster.rewards.food.toLocaleString()}</span>
            <span>🪵 {selectedMonster.rewards.wood.toLocaleString()}</span>
            <span>🪨 {selectedMonster.rewards.stone.toLocaleString()}</span>
            <span>⚙️ {selectedMonster.rewards.iron.toLocaleString()}</span>
            <span>💰 {selectedMonster.rewards.gold.toLocaleString()}</span>
          </div>
        </div>

        {troops.length > 0 ? (
          <Button className="w-full bg-red-600 hover:bg-red-700">
            ⚔️ Attack Monster
          </Button>
        ) : (
          <p className="text-sm text-gray-500 text-center">You need troops to attack</p>
        )}
      </Card>
    );
  }

  if (selectedPlot) {
    const percentage = (selectedPlot.remaining / selectedPlot.capacity) * 100;

    return (
      <Card className="absolute bottom-4 right-4 w-80 p-4 bg-stone-900/95 border-stone-700 text-white">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-green-400 capitalize">{selectedPlot.type} Plot</h3>
            <p className="text-sm text-gray-400">Level {selectedPlot.level}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedResourcePlotId(null)}
          >
            ✕
          </Button>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Remaining</span>
            <span>{Math.floor(percentage)}%</span>
          </div>
          <div className="w-full bg-stone-700 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {selectedPlot.remaining.toLocaleString()} / {selectedPlot.capacity.toLocaleString()}
          </p>
        </div>

        {percentage > 0 ? (
          <div>
            {troops.length > 0 ? (
              <Button className="w-full bg-green-600 hover:bg-green-700">
                🚜 Gather Resources
              </Button>
            ) : (
              <p className="text-sm text-gray-500 text-center">You need troops to gather</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-red-400 text-center">Plot is depleted</p>
        )}
      </Card>
    );
  }

  return null;
}

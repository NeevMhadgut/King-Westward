import { usePlayerStore } from '../lib/stores/usePlayerStore';
import { useGameStore } from '../lib/stores/useGameStore';
import { BUILDING_INFO, getUpgradeCost, getUpgradeTime, canAfford } from '@shared/gameConstants';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { useState, useEffect, useContext, createContext } from 'react';

const WebSocketContext = createContext<any>(null);

export function GameHUD() {
  const viewMode = useGameStore((state) => state.viewMode);
  const setViewMode = useGameStore((state) => state.setViewMode);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="pointer-events-auto">
        <ResourceBar />
      </div>

      <div className="absolute top-4 right-4 flex gap-2 pointer-events-auto">
        <Button
          onClick={() => setViewMode(viewMode === 'city' ? 'worldMap' : 'city')}
          variant={viewMode === 'city' ? 'default' : 'secondary'}
        >
          {viewMode === 'city' ? 'World Map' : 'City'}
        </Button>
      </div>

      <BuildingPanel />
      <TrainingPanel />
    </div>
  );
}

function ResourceBar() {
  const resources = usePlayerStore((state) => state.resources);
  const castleLevel = usePlayerStore((state) => state.castleLevel);
  const username = usePlayerStore((state) => state.username);

  return (
    <Card className="m-4 p-3 bg-gradient-to-r from-amber-900 to-amber-800 border-amber-600">
      <div className="flex items-center justify-between gap-4">
        <div className="text-yellow-200 font-bold text-lg">
          {username} - Castle Lv.{castleLevel}
        </div>
        
        <div className="flex gap-6">
          <ResourceIcon icon="🌾" label="Food" value={resources.food} />
          <ResourceIcon icon="🪵" label="Wood" value={resources.wood} />
          <ResourceIcon icon="🪨" label="Stone" value={resources.stone} />
          <ResourceIcon icon="⚙️" label="Iron" value={resources.iron} />
          <ResourceIcon icon="💰" label="Gold" value={resources.gold} color="text-yellow-300" />
        </div>
      </div>
    </Card>
  );
}

function ResourceIcon({ icon, label, value, color = "text-white" }: { icon: string; label: string; value: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xl">{icon}</span>
      <div className="flex flex-col">
        <span className="text-xs text-gray-300">{label}</span>
        <span className={`font-bold ${color}`}>{Math.floor(value).toLocaleString()}</span>
      </div>
    </div>
  );
}

function BuildingPanel() {
  const selectedBuildingId = useGameStore((state) => state.selectedBuildingId);
  const setSelectedBuildingId = useGameStore((state) => state.setSelectedBuildingId);
  const buildings = usePlayerStore((state) => state.buildings);
  const resources = usePlayerStore((state) => state.resources);
  const subtractResources = usePlayerStore((state) => state.subtractResources);
  const updateBuilding = usePlayerStore((state) => state.updateBuilding);
  const setCastleLevel = usePlayerStore((state) => state.setCastleLevel);

  const building = buildings.find((b) => b.id === selectedBuildingId);

  if (!building) return null;

  const info = BUILDING_INFO[building.type];
  const upgradeCost = getUpgradeCost(building.type, building.level);
  const upgradeTime = getUpgradeTime(building.type, building.level);
  const canUpgrade = canAfford(upgradeCost, resources) && !building.upgrading && building.level < info.maxLevel;

  const handleUpgrade = () => {
    if (canUpgrade) {
      subtractResources(upgradeCost);
      const targetLevel = building.level + 1;
      updateBuilding(building.id, {
        upgrading: {
          targetLevel,
          startTime: Date.now(),
          duration: upgradeTime * 1000,
        },
      });

      setTimeout(() => {
        updateBuilding(building.id, {
          level: targetLevel,
          upgrading: undefined,
        });
        
        if (building.type === 'castle') {
          setCastleLevel(targetLevel);
        }
      }, upgradeTime * 1000);
    }
  };

  return (
    <Card className="absolute bottom-4 left-4 w-80 p-4 bg-stone-900/95 border-stone-700 text-white">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-amber-400">{info.name}</h3>
          <p className="text-sm text-gray-400">Level {building.level}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedBuildingId(null)}
        >
          ✕
        </Button>
      </div>

      <p className="text-sm text-gray-300 mb-4">{info.description}</p>

      {building.upgrading ? (
        <div className="space-y-2">
          <p className="text-sm text-yellow-400">Upgrading to Level {building.upgrading.targetLevel}...</p>
          <UpgradeProgress
            startTime={building.upgrading.startTime}
            duration={building.upgrading.duration}
          />
        </div>
      ) : building.level < info.maxLevel ? (
        <div className="space-y-3">
          <div className="text-sm">
            <p className="font-semibold mb-1">Upgrade Cost:</p>
            <div className="grid grid-cols-2 gap-1">
              {upgradeCost.food > 0 && <span>🌾 {upgradeCost.food.toLocaleString()}</span>}
              {upgradeCost.wood > 0 && <span>🪵 {upgradeCost.wood.toLocaleString()}</span>}
              {upgradeCost.stone > 0 && <span>🪨 {upgradeCost.stone.toLocaleString()}</span>}
              {upgradeCost.iron > 0 && <span>⚙️ {upgradeCost.iron.toLocaleString()}</span>}
            </div>
            <p className="mt-2">⏱️ Time: {Math.floor(upgradeTime / 60)}m {upgradeTime % 60}s</p>
          </div>

          <Button
            onClick={handleUpgrade}
            disabled={!canUpgrade}
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            {canUpgrade ? 'Upgrade' : 'Insufficient Resources'}
          </Button>
        </div>
      ) : (
        <p className="text-yellow-400">Max Level Reached</p>
      )}
    </Card>
  );
}

function UpgradeProgress({ startTime, duration }: { startTime: number; duration: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  const remaining = Math.max(0, duration - (Date.now() - startTime));
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return (
    <div>
      <Progress value={progress} className="h-2" />
      <p className="text-xs text-gray-400 mt-1">
        {minutes}:{seconds.toString().padStart(2, '0')} remaining
      </p>
    </div>
  );
}

function TrainingPanel() {
  const viewMode = useGameStore((state) => state.viewMode);
  const trainingQueues = usePlayerStore((state) => state.trainingQueues);

  if (viewMode !== 'city' || trainingQueues.length === 0) return null;

  return (
    <Card className="absolute bottom-4 right-4 w-64 p-3 bg-stone-900/95 border-stone-700 text-white">
      <h3 className="text-lg font-bold text-amber-400 mb-2">Training</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {trainingQueues.map((queue) => (
          <div key={queue.id} className="text-sm">
            <p className="font-semibold">{queue.troopType} T{queue.tier} x{queue.count}</p>
            <UpgradeProgress
              startTime={queue.startTime}
              duration={queue.duration}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

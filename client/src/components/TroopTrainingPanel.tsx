import { useState } from 'react';
import { usePlayerStore } from '../lib/stores/usePlayerStore';
import { useGameStore } from '../lib/stores/useGameStore';
import { TROOP_INFO, CASTLE_TIER_REQUIREMENTS, getTroopKey, canAfford } from '@shared/gameConstants';
import type { TroopType } from '@shared/gameTypes';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { nanoid } from 'nanoid';

export function TroopTrainingPanel() {
  const selectedBuildingId = useGameStore((state) => state.selectedBuildingId);
  const setSelectedBuildingId = useGameStore((state) => state.setSelectedBuildingId);
  const buildings = usePlayerStore((state) => state.buildings);
  const castleLevel = usePlayerStore((state) => state.castleLevel);
  const resources = usePlayerStore((state) => state.resources);
  const subtractResources = usePlayerStore((state) => state.subtractResources);
  const addTrainingQueue = usePlayerStore((state) => state.addTrainingQueue);

  const building = buildings.find((b) => b.id === selectedBuildingId);
  
  if (!building) return null;

  const troopTypes: { type: TroopType; category: string; building: string }[] = [
    { type: 'shieldSoldier', category: 'Infantry', building: 'barracks' },
    { type: 'pikeman', category: 'Infantry', building: 'barracks' },
    { type: 'meleeCavalry', category: 'Cavalry', building: 'stables' },
    { type: 'cavalryShooter', category: 'Cavalry', building: 'stables' },
    { type: 'archer', category: 'Archer', building: 'range' },
    { type: 'crossbowman', category: 'Archer', building: 'range' },
    { type: 'assaultCart', category: 'Siege', building: 'siegeWorkshop' },
    { type: 'trebuchet', category: 'Siege', building: 'siegeWorkshop' },
  ];

  const availableTroops = troopTypes.filter((t) => t.building === building.type);

  if (availableTroops.length === 0) return null;

  return (
    <Card className="absolute top-20 right-4 w-96 max-h-[70vh] overflow-y-auto p-4 bg-stone-900/95 border-stone-700 text-white">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-amber-400">Train Troops</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedBuildingId(null)}
        >
          ✕
        </Button>
      </div>

      <Tabs defaultValue={availableTroops[0].type}>
        <TabsList className="grid w-full grid-cols-2">
          {availableTroops.map((troop) => (
            <TabsTrigger key={troop.type} value={troop.type}>
              {troop.type}
            </TabsTrigger>
          ))}
        </TabsList>

        {availableTroops.map((troop) => (
          <TabsContent key={troop.type} value={troop.type}>
            <TroopTierList
              troopType={troop.type}
              buildingId={building.id}
              castleLevel={castleLevel}
              resources={resources}
              subtractResources={subtractResources}
              addTrainingQueue={addTrainingQueue}
            />
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
}

function TroopTierList({
  troopType,
  buildingId,
  castleLevel,
  resources,
  subtractResources,
  addTrainingQueue,
}: {
  troopType: TroopType;
  buildingId: string;
  castleLevel: number;
  resources: any;
  subtractResources: any;
  addTrainingQueue: any;
}) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const maxTier = Math.max(
    ...Object.entries(CASTLE_TIER_REQUIREMENTS)
      .filter(([tier, level]) => castleLevel >= level)
      .map(([tier]) => parseInt(tier))
  );

  const handleTrain = (tier: number) => {
    const quantity = quantities[tier] || 1;
    const key = getTroopKey(troopType, tier);
    const info = TROOP_INFO[key];

    if (!info) return;

    const totalCost = {
      food: info.trainingCost.food * quantity,
      wood: info.trainingCost.wood * quantity,
      stone: info.trainingCost.stone * quantity,
      iron: info.trainingCost.iron * quantity,
      gold: info.trainingCost.gold * quantity,
    };

    if (canAfford(totalCost, resources)) {
      subtractResources(totalCost);
      addTrainingQueue({
        id: nanoid(),
        troopType,
        tier,
        count: quantity,
        startTime: Date.now(),
        duration: info.trainingTime * quantity * 1000,
        buildingId,
      });
      setQuantities({ ...quantities, [tier]: 1 });
    }
  };

  return (
    <div className="space-y-3 mt-3">
      {Array.from({ length: maxTier }, (_, i) => i + 1).map((tier) => {
        const key = getTroopKey(troopType, tier);
        const info = TROOP_INFO[key];
        if (!info) return null;

        const quantity = quantities[tier] || 1;
        const totalCost = {
          food: info.trainingCost.food * quantity,
          wood: info.trainingCost.wood * quantity,
          stone: info.trainingCost.stone * quantity,
          iron: info.trainingCost.iron * quantity,
          gold: info.trainingCost.gold * quantity,
        };

        return (
          <div key={tier} className="border border-stone-700 rounded p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-amber-300">{info.name}</h4>
                <p className="text-xs text-gray-400">
                  ⚔️ {info.attack} | 🛡️ {info.defense} | ❤️ {info.health}
                </p>
              </div>
              <div className="text-right text-xs text-gray-400">
                <p>⏱️ {info.trainingTime}s</p>
              </div>
            </div>

            <div className="text-xs mb-2">
              <p className="font-semibold mb-1">Cost per unit:</p>
              <div className="grid grid-cols-2 gap-1">
                {info.trainingCost.food > 0 && <span>🌾 {info.trainingCost.food}</span>}
                {info.trainingCost.wood > 0 && <span>🪵 {info.trainingCost.wood}</span>}
                {info.trainingCost.stone > 0 && <span>🪨 {info.trainingCost.stone}</span>}
                {info.trainingCost.iron > 0 && <span>⚙️ {info.trainingCost.iron}</span>}
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantities({ ...quantities, [tier]: parseInt(e.target.value) || 1 })}
                className="w-20 h-8 text-sm"
              />
              <Button
                onClick={() => handleTrain(tier)}
                disabled={!canAfford(totalCost, resources)}
                size="sm"
                className="flex-1 bg-amber-600 hover:bg-amber-700"
              >
                Train {quantity}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { useEffect } from 'react';
import { usePlayerStore } from '../lib/stores/usePlayerStore';
import { BUILDING_INFO } from '@shared/gameConstants';

export function ResourceProduction() {
  const buildings = usePlayerStore((state) => state.buildings);
  const addResources = usePlayerStore((state) => state.addResources);

  useEffect(() => {
    const interval = setInterval(() => {
      const production = {
        food: 0,
        wood: 0,
        stone: 0,
        iron: 0,
        gold: 0,
      };

      buildings.forEach((building) => {
        const info = BUILDING_INFO[building.type];
        if (info.produces && info.productionRate) {
          const rate = info.productionRate * building.level;
          production[info.produces] += rate / 60;
        }
      });

      if (production.food > 0 || production.wood > 0 || production.stone > 0 || production.iron > 0) {
        addResources(production);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [buildings, addResources]);

  return null;
}

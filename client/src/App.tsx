import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useGameStore } from "./lib/stores/useGameStore";
import { usePlayerStore } from "./lib/stores/usePlayerStore";
import { useWebSocket } from "./lib/useWebSocket";
import { CityView } from "./components/CityView";
import { WorldMapView } from "./components/WorldMapView";
import { GameHUD } from "./components/GameHUD";
import { ResourceProduction } from "./components/ResourceProduction";
import { TroopTrainingPanel } from "./components/TroopTrainingPanel";
import { AlliancePanel } from "./components/AlliancePanel";
import { WorldMapInteractions } from "./components/WorldMapInteractions";
import "@fontsource/inter";

function App() {
  useWebSocket();
  
  const viewMode = useGameStore((state) => state.viewMode);
  const isConnected = useGameStore((state) => state.isConnected);
  const selectedBuildingId = useGameStore((state) => state.selectedBuildingId);
  const buildings = usePlayerStore((state) => state.buildings);

  const selectedBuilding = buildings.find((b) => b.id === selectedBuildingId);
  const showTroopTraining = selectedBuilding && 
    viewMode === 'city' && 
    ['barracks', 'stables', 'range', 'siegeWorkshop'].includes(selectedBuilding.type);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#0a0a0a' }}>
      <ResourceProduction />
      
      {!isConnected && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-xl z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 mx-auto mb-4"></div>
            <p>Connecting to Kingdom...</p>
          </div>
        </div>
      )}

      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#87ceeb']} />
        <fog attach="fog" args={['#87ceeb', 50, 200]} />

        <Suspense fallback={null}>
          {viewMode === 'city' ? <CityView /> : <WorldMapView />}
        </Suspense>
      </Canvas>

      <GameHUD />
      <AlliancePanel />
      
      {showTroopTraining && <TroopTrainingPanel />}
      {viewMode === 'worldMap' && <WorldMapInteractions />}
    </div>
  );
}

export default App;

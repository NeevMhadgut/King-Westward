import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import { useGameStore } from '../lib/stores/useGameStore';
import { usePlayerStore } from '../lib/stores/usePlayerStore';
import { WORLD_MAP_SIZE } from '@shared/gameConstants';
import * as THREE from 'three';

export function WorldMapView() {
  const players = useGameStore((state) => Array.from(state.players.values()));
  const monsters = useGameStore((state) => state.monsters);
  const resourcePlots = useGameStore((state) => state.resourcePlots);
  const myId = usePlayerStore((state) => state.id);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[WORLD_MAP_SIZE.width / 2, 150, WORLD_MAP_SIZE.height / 2 + 100]}
        fov={60}
      />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={50}
        maxDistance={300}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        target={[WORLD_MAP_SIZE.width / 2, 0, WORLD_MAP_SIZE.height / 2]}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[100, 100, 50]} intensity={1} />

      <WorldTerrain />

      {players.map((player) => (
        <PlayerCastle
          key={player.id}
          player={player}
          isMe={player.id === myId}
        />
      ))}

      {monsters.map((monster) => (
        <MonsterMarker key={monster.id} monster={monster} />
      ))}

      {resourcePlots.map((plot) => (
        <ResourcePlotMarker key={plot.id} plot={plot} />
      ))}
    </>
  );
}

function WorldTerrain() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[WORLD_MAP_SIZE.width / 2, -0.5, WORLD_MAP_SIZE.height / 2]}>
      <planeGeometry args={[WORLD_MAP_SIZE.width, WORLD_MAP_SIZE.height, 50, 50]} />
      <meshStandardMaterial color="#3a5a2a" wireframe={false} />
    </mesh>
  );
}

function PlayerCastle({ player, isMe }: { player: any; isMe: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && isMe) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={[player.position.x, 0, player.position.y]}>
      <mesh ref={meshRef} castShadow position={[0, 2, 0]}>
        <boxGeometry args={[3, 4, 3]} />
        <meshStandardMaterial color={isMe ? '#ffd700' : '#8b4513'} />
      </mesh>
      <Text
        position={[0, 7, 0]}
        fontSize={1.5}
        color={isMe ? '#ffd700' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
      >
        {player.username}
      </Text>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color={isMe ? '#ffd700' : '#ffffff'} opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

function MonsterMarker({ monster }: { monster: any }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const setSelectedMonsterId = useGameStore((state) => state.setSelectedMonsterId);

  const color = useMemo(() => {
    switch (monster.type) {
      case 'centaur': return '#cd853f';
      case 'griffin': return '#daa520';
      case 'yeti': return '#87ceeb';
      default: return '#ff6347';
    }
  }, [monster.type]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group position={[monster.position.x, 0, monster.position.y]}>
      <mesh
        ref={meshRef}
        castShadow
        onClick={() => setSelectedMonsterId(monster.id)}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <Text
        position={[0, 4, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {`${monster.type.charAt(0).toUpperCase() + monster.type.slice(1)} Lv${monster.level}`}
      </Text>
    </group>
  );
}

function ResourcePlotMarker({ plot }: { plot: any }) {
  const setSelectedResourcePlotId = useGameStore((state) => state.setSelectedResourcePlotId);

  const color = useMemo(() => {
    switch (plot.type) {
      case 'food': return '#90ee90';
      case 'wood': return '#8b4513';
      case 'stone': return '#808080';
      case 'iron': return '#4a5568';
      default: return '#666666';
    }
  }, [plot.type]);

  const percentage = (plot.remaining / plot.capacity) * 100;

  return (
    <group position={[plot.position.x, 0, plot.position.y]}>
      <mesh
        castShadow
        position={[0, 0.5, 0]}
        onClick={() => setSelectedResourcePlotId(plot.id)}
      >
        <cylinderGeometry args={[0.8, 0.8, 1, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {percentage > 0 && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.6}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {`${plot.type.charAt(0).toUpperCase()}${plot.level} (${Math.floor(percentage)}%)`}
        </Text>
      )}
    </group>
  );
}

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Building } from '@shared/gameTypes';
import { BUILDING_INFO } from '@shared/gameConstants';
import { useGameStore } from '../lib/stores/useGameStore';
import * as THREE from 'three';

interface Building3DProps {
  building: Building;
}

export function Building3D({ building }: Building3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const setSelectedBuildingId = useGameStore((state) => state.setSelectedBuildingId);

  const info = BUILDING_INFO[building.type];
  const scale = 0.3 + (building.level * 0.15);

  const color = getBuildingColor(building.type);
  const size = getBuildingSize(building.type);

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1 + size.height / 2;
    } else if (meshRef.current) {
      meshRef.current.position.y = size.height / 2;
    }
  });

  return (
    <group position={[building.position.x, 0, building.position.z]}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={() => setSelectedBuildingId(building.id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale}
      >
        <boxGeometry args={[size.width, size.height, size.depth]} />
        <meshStandardMaterial
          color={hovered ? new THREE.Color(color).offsetHSL(0, 0, 0.2) : color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {building.upgrading && (
        <mesh position={[0, size.height * scale + 1, 0]}>
          <boxGeometry args={[1, 0.2, 1]} />
          <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={0.5} />
        </mesh>
      )}

      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[size.width * scale * 0.7, 32]} />
        <meshBasicMaterial color="#1a1a1a" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

function getBuildingColor(type: string): string {
  const colorMap: Record<string, string> = {
    castle: '#8b4513',
    barracks: '#d2691e',
    stables: '#cd853f',
    range: '#8fbc8f',
    siegeWorkshop: '#696969',
    drillGrounds: '#daa520',
    watchtower: '#708090',
    blacksmith: '#2f4f4f',
    college: '#4682b4',
    fortress: '#556b2f',
    market: '#bc8f8f',
    embassy: '#9370db',
    depot: '#8b7355',
    farm: '#90ee90',
    lumberMill: '#8b4513',
    quarry: '#808080',
    ironMine: '#4a5568',
    militaryTent: '#f4a460',
    hospital: '#ff6347',
    hallOfWar: '#8b0000',
  };
  return colorMap[type] || '#666666';
}

function getBuildingSize(type: string): { width: number; height: number; depth: number } {
  const sizeMap: Record<string, { width: number; height: number; depth: number }> = {
    castle: { width: 8, height: 12, depth: 8 },
    barracks: { width: 5, height: 6, depth: 5 },
    stables: { width: 6, height: 5, depth: 5 },
    range: { width: 5, height: 7, depth: 4 },
    siegeWorkshop: { width: 6, height: 5, depth: 6 },
    drillGrounds: { width: 7, height: 2, depth: 7 },
    watchtower: { width: 3, height: 10, depth: 3 },
    blacksmith: { width: 4, height: 5, depth: 4 },
    college: { width: 5, height: 8, depth: 5 },
    fortress: { width: 6, height: 7, depth: 6 },
    market: { width: 5, height: 5, depth: 5 },
    embassy: { width: 5, height: 6, depth: 5 },
    depot: { width: 6, height: 4, depth: 6 },
    farm: { width: 5, height: 3, depth: 5 },
    lumberMill: { width: 4, height: 5, depth: 4 },
    quarry: { width: 5, height: 4, depth: 5 },
    ironMine: { width: 4, height: 5, depth: 4 },
    militaryTent: { width: 4, height: 4, depth: 4 },
    hospital: { width: 5, height: 5, depth: 5 },
    hallOfWar: { width: 6, height: 7, depth: 6 },
  };
  return sizeMap[type] || { width: 4, height: 4, depth: 4 };
}

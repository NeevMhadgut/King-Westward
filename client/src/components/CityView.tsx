import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Building3D } from './Building3D';
import { usePlayerStore } from '../lib/stores/usePlayerStore';
import * as THREE from 'three';

export function CityView() {
  const buildings = usePlayerStore((state) => state.buildings);
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[30, 25, 30]} fov={60} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={15}
        maxDistance={80}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        target={[0, 0, 0]}
      />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[50, 50, 25]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      <Ground />

      {buildings.map((building) => (
        <Building3D key={building.id} building={building} />
      ))}
    </>
  );
}

function Ground() {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#2d5016" />
    </mesh>
  );
}

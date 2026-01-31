'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function DatabaseModel({ mode }: { mode: 'breach' | 'shield' }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    if (wireRef.current) wireRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  const geom = new THREE.CylinderGeometry(0.5, 0.6, 1, 8);
  const edges = new THREE.EdgesGeometry(geom);
  const color = mode === 'shield' ? 0x00cc44 : 0xff3333;

  return (
    <group>
      <mesh ref={meshRef} geometry={geom}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
      </mesh>
      <lineSegments ref={wireRef} geometry={edges}>
        <lineBasicMaterial color={mode === 'shield' ? 0x00ff41 : 0xff6644} />
      </lineSegments>
    </group>
  );
}

function Particles({ mode }: { mode: 'breach' | 'shield' }) {
  const ref = useRef<THREE.Points>(null);
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  const color = mode === 'shield' ? 0x00ff41 : 0xff3333;
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Scene3D({ mode }: { mode: 'breach' | 'shield' }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 200 }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.6} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#00ff41" />
        <DatabaseModel mode={mode} />
        <Particles mode={mode} />
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

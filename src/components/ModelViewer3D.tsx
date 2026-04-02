import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  color: string;
  wireframe: boolean;
}

const TorusKnotModel = ({ color, wireframe }: ModelProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.2, 0]} scale={1.2}>
      <torusKnotGeometry args={[1, 0.35, 200, 32]} />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        roughness={wireframe ? 1 : 0.3}
        metalness={wireframe ? 0 : 0.6}
        emissive={color}
        emissiveIntensity={wireframe ? 0.4 : 0.1}
      />
    </mesh>
  );
};

const PrinterFrame = () => {
  const frameMaterial = (
    <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.8} />
  );
  const edgeMaterial = (
    <meshStandardMaterial color="#606C38" roughness={0.3} metalness={0.9} emissive="#606C38" emissiveIntensity={0.3} />
  );

  const pillarPositions: [number, number, number][] = [
    [-1.8, 0, -1.8],
    [1.8, 0, -1.8],
    [-1.8, 0, 1.8],
    [1.8, 0, 1.8],
  ];

  return (
    <group>
      {/* Base plate */}
      <mesh position={[0, -1.8, 0]}>
        <boxGeometry args={[4.2, 0.15, 4.2]} />
        {frameMaterial}
      </mesh>
      {/* Base edge glow */}
      <mesh position={[0, -1.72, 0]}>
        <boxGeometry args={[4.3, 0.02, 4.3]} />
        {edgeMaterial}
      </mesh>

      {/* Pillars */}
      {pillarPositions.map((pos, i) => (
        <mesh key={i} position={[pos[0], 0.1, pos[2]]}>
          <boxGeometry args={[0.12, 3.8, 0.12]} />
          {frameMaterial}
        </mesh>
      ))}

      {/* Top frame */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4.2, 0.12, 4.2]} />
        {frameMaterial}
      </mesh>
      <mesh position={[0, 2.06, 0]}>
        <boxGeometry args={[4.3, 0.02, 4.3]} />
        {edgeMaterial}
      </mesh>

      {/* Print head rail */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.08, 0.08, 2.5]} />
        {frameMaterial}
      </mesh>
      {/* Print head nozzle */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.2]} />
        {frameMaterial}
      </mesh>
      <mesh position={[0, 0.94, 0]}>
        <boxGeometry args={[0.08, 0.05, 0.08]} />
        {edgeMaterial}
      </mesh>
    </group>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#606C38" size={0.06} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

interface ModelViewer3DProps {
  color: string;
  wireframe: boolean;
}

const ModelViewer3D = ({ color, wireframe }: ModelViewer3DProps) => {
  return (
    <Canvas
      camera={{ position: [4, 3, 4], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#FEFAE0" />
      <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#606C38" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#DDA15E" />

      <PrinterFrame />
      <TorusKnotModel color={color} wireframe={wireframe} />
      <FloatingParticles />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={4}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default ModelViewer3D;

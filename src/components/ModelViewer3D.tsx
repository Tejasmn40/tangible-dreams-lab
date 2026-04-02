import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  color: string;
  wireframe: boolean;
}

const TorusKnotModel = ({ color, wireframe }: ModelProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={1.1}>
      <torusKnotGeometry args={[1, 0.38, 256, 48]} />
      <meshPhysicalMaterial
        color={color}
        wireframe={wireframe}
        roughness={wireframe ? 0.8 : 0.15}
        metalness={wireframe ? 0.2 : 0.7}
        emissive={color}
        emissiveIntensity={wireframe ? 0.5 : 0.08}
        clearcoat={wireframe ? 0 : 0.8}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
};

const PrinterFrame = () => {
  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#111111",
    roughness: 0.3,
    metalness: 0.9,
  }), []);

  const glowMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#606C38",
    roughness: 0.2,
    metalness: 0.9,
    emissive: "#606C38",
    emissiveIntensity: 0.6,
  }), []);

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#606C38",
    transparent: true,
    opacity: 0.06,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.9,
    thickness: 0.1,
  }), []);

  const pillarPositions: [number, number, number][] = [
    [-2, 0, -2],
    [2, 0, -2],
    [-2, 0, 2],
    [2, 0, 2],
  ];

  return (
    <group>
      {/* Base plate */}
      <mesh position={[0, -2.1, 0]} material={darkMat}>
        <boxGeometry args={[4.6, 0.25, 4.6]} />
      </mesh>
      {/* Base edge glow lines */}
      <mesh position={[0, -1.97, 0]} material={glowMat}>
        <boxGeometry args={[4.7, 0.015, 4.7]} />
      </mesh>

      {/* Pillars */}
      {pillarPositions.map((pos, i) => (
        <mesh key={i} position={[pos[0], 0, pos[2]]} material={darkMat}>
          <boxGeometry args={[0.1, 4.2, 0.1]} />
        </mesh>
      ))}

      {/* Top plate */}
      <mesh position={[0, 2.1, 0]} material={darkMat}>
        <boxGeometry args={[4.6, 0.2, 4.6]} />
      </mesh>
      {/* Top glow edge */}
      <mesh position={[0, 2.21, 0]} material={glowMat}>
        <boxGeometry args={[4.7, 0.015, 4.7]} />
      </mesh>

      {/* Glass panels - 4 sides */}
      {/* Front */}
      <mesh position={[0, 0, 2.05]} material={glassMat}>
        <planeGeometry args={[4.0, 4.0]} />
      </mesh>
      {/* Back */}
      <mesh position={[0, 0, -2.05]} rotation={[0, Math.PI, 0]} material={glassMat}>
        <planeGeometry args={[4.0, 4.0]} />
      </mesh>
      {/* Left */}
      <mesh position={[-2.05, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={glassMat}>
        <planeGeometry args={[4.0, 4.0]} />
      </mesh>
      {/* Right */}
      <mesh position={[2.05, 0, 0]} rotation={[0, -Math.PI / 2, 0]} material={glassMat}>
        <planeGeometry args={[4.0, 4.0]} />
      </mesh>

      {/* Print head rail (horizontal bar) */}
      <mesh position={[0, 1.5, 0]} material={darkMat}>
        <boxGeometry args={[3.2, 0.06, 0.06]} />
      </mesh>
      {/* Rail vertical supports */}
      <mesh position={[-1.5, 1.5, 0]} material={darkMat}>
        <boxGeometry args={[0.06, 0.06, 3.2]} />
      </mesh>

      {/* Print head nozzle block */}
      <mesh position={[0, 1.3, 0]} material={darkMat}>
        <boxGeometry args={[0.25, 0.4, 0.25]} />
      </mesh>
      {/* Nozzle tip glow */}
      <mesh position={[0, 1.09, 0]} material={glowMat}>
        <boxGeometry args={[0.1, 0.06, 0.1]} />
      </mesh>
    </group>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
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
      <pointsMaterial color="#606C38" size={0.08} transparent opacity={0.5} sizeAttenuation />
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
      camera={{ position: [5, 3.5, 5], fov: 40 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[6, 8, 6]} intensity={1.2} color="#FEFAE0" castShadow />
      <directionalLight position={[-4, 3, -4]} intensity={0.3} color="#606C38" />
      <pointLight position={[0, 4, 0]} intensity={0.6} color="#DDA15E" />
      <pointLight position={[0, -2, 3]} intensity={0.2} color="#606C38" />

      <PrinterFrame />
      <TorusKnotModel color={color} wireframe={wireframe} />
      <FloatingParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
};

export default ModelViewer3D;

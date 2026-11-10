import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import SilentErrorBoundary from "./SilentErrorBoundary";
import type { Mesh, Group } from "three";

/* ---------- Floating Camera 3D Model ---------- */
function CameraModel() {
  const groupRef = useRef<Group>(null);

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (pointer.x * 0.5 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-pointer.y * 0.3 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1}>
        {/* Camera Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.2, 1.5, 1.4]} />
          <meshStandardMaterial color="#1b1611" metalness={0.82} roughness={0.22} />
        </mesh>

        {/* Lens Barrel */}
        <mesh position={[0, 0, 1.0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.65, 0.8, 32]} />
          <meshStandardMaterial color="#0d0a08" metalness={0.92} roughness={0.12} />
        </mesh>

        {/* Lens Glass */}
        <mesh position={[0, 0, 1.45]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.1, 32]} />
          <meshStandardMaterial color="#f6e7b0" metalness={1} roughness={0} emissive="#f6e7b0" emissiveIntensity={0.45} />
        </mesh>

        {/* Viewfinder */}
        <mesh position={[0, 1.0, -0.2]}>
          <boxGeometry args={[0.6, 0.5, 0.5]} />
          <meshStandardMaterial color="#1b1611" metalness={0.82} roughness={0.2} />
        </mesh>

        {/* Flash Mount */}
        <mesh position={[0, 1.05, 0.2]}>
          <boxGeometry args={[0.35, 0.12, 0.35]} />
          <meshStandardMaterial color="#5b4520" metalness={0.72} roughness={0.28} />
        </mesh>

        {/* Neon Ring around lens */}
        <mesh position={[0, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.04, 16, 64]} />
          <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={1.6} />
        </mesh>

        {/* Accent Stripe */}
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[2.25, 0.06, 1.42]} />
          <meshStandardMaterial color="#b8892d" emissive="#b8892d" emissiveIntensity={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

/* ---------- Floating Orbs Background ---------- */
function GlowOrb({ position, color, size = 0.5 }: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8) * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.4} distort={0.3} speed={2} transparent opacity={0.6} />
    </mesh>
  );
}

/* ---------- Scene ---------- */
export default function HeroScene() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.85} color="#d4af37" />
        <directionalLight position={[-5, 3, 3]} intensity={0.45} color="#f6e7b0" />
        <pointLight position={[0, 0, 4]} intensity={1} color="#b8892d" />
        {/* The preset is fetched from a CDN; the scene still looks fine without it. */}
        <SilentErrorBoundary>
          <Suspense fallback={null}>
            <Environment preset="night" />
          </Suspense>
        </SilentErrorBoundary>

        <CameraModel />

        <GlowOrb position={[-3, 2, -2]} color="#d4af37" size={0.4} />
        <GlowOrb position={[3.5, -1.5, -3]} color="#f6e7b0" size={0.35} />
        <GlowOrb position={[-2.5, -2, -1]} color="#b8892d" size={0.3} />
        <GlowOrb position={[2, 2.5, -2.5]} color="#fff4d6" size={0.25} />
      </Canvas>
    </div>
  );
}

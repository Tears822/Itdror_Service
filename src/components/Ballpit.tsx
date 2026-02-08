"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, BallCollider, CuboidCollider } from "@react-three/rapier";
import type { Mesh } from "three";

interface BallsProps {
  count?: number;
  colors?: string[];
}

function Balls({ count = 50, colors = ["#2da0ff", "#00d4ff", "#ff6b9d", "#c084fc", "#22d3ee", "#4ade80", "#fbbf24", "#f472b6"] }: BallsProps) {
  const { viewport } = useThree();

  const ballsData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * viewport.width,
        viewport.height / 2 + Math.random() * 5,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [count, viewport, colors]);

  return (
    <>
      {ballsData.map((ball, i) => (
        <RigidBody
          key={i}
          colliders={false}
          position={ball.position}
          restitution={0.8}
          friction={0.2}
          linearDamping={0.5}
          angularDamping={0.5}
        >
          <BallCollider args={[ball.scale]} />
          <mesh castShadow receiveShadow scale={ball.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color={ball.color}
              roughness={0.15}
              metalness={0.7}
              envMapIntensity={1.2}
            />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}

function Pointer() {
  const { viewport, pointer } = useThree();
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      );
    }
  });

  return (
    <RigidBody type="kinematicPosition" colliders={false}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.5]} />
        <meshBasicMaterial transparent opacity={0} />
        <BallCollider args={[0.5]} />
      </mesh>
    </RigidBody>
  );
}

function Walls() {
  const { viewport } = useThree();
  const wallThickness = 1;

  return (
    <>
      {/* Floor */}
      <RigidBody type="fixed" position={[0, -viewport.height / 2 - wallThickness / 2, 0]}>
        <CuboidCollider args={[viewport.width, wallThickness / 2, 5]} />
      </RigidBody>
      {/* Left wall */}
      <RigidBody type="fixed" position={[-viewport.width / 2 - wallThickness / 2, 0, 0]}>
        <CuboidCollider args={[wallThickness / 2, viewport.height * 2, 5]} />
      </RigidBody>
      {/* Right wall */}
      <RigidBody type="fixed" position={[viewport.width / 2 + wallThickness / 2, 0, 0]}>
        <CuboidCollider args={[wallThickness / 2, viewport.height * 2, 5]} />
      </RigidBody>
      {/* Back wall */}
      <RigidBody type="fixed" position={[0, 0, -3]}>
        <CuboidCollider args={[viewport.width, viewport.height * 2, wallThickness / 2]} />
      </RigidBody>
      {/* Front wall */}
      <RigidBody type="fixed" position={[0, 0, 3]}>
        <CuboidCollider args={[viewport.width, viewport.height * 2, wallThickness / 2]} />
      </RigidBody>
    </>
  );
}

interface BallpitProps {
  count?: number;
  colors?: string[];
  gravity?: number;
  className?: string;
}

function Scene({ count, colors, gravity }: Omit<BallpitProps, "className">) {
  return (
    <Physics gravity={[0, gravity || -9.81, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2da0ff" />
      <Balls count={count} colors={colors} />
      <Pointer />
      <Walls />
    </Physics>
  );
}

export function Ballpit({
  count = 50,
  colors = ["#2da0ff", "#00d4ff", "#ff6b9d", "#c084fc", "#22d3ee", "#4ade80", "#fbbf24", "#f472b6"],
  gravity = -9.81,
  className = "",
}: BallpitProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 ${className}`} style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene count={count} colors={colors} gravity={gravity} />
      </Canvas>
    </div>
  );
}

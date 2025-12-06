"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

interface RingProps {
  radius: number;
  z: number;
  index: number;
  totalRings: number;
}

function Ring({ radius, z, index, totalRings }: RingProps) {
  const ref = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  const progress = index / totalRings;

  // Color gradient from cream to orange
  const color = useMemo(() => {
    const startColor = new THREE.Color("#e8e2db");
    const endColor = new THREE.Color("#ff5a36");
    return startColor.lerp(endColor, progress * 0.7);
  }, [progress]);

  useFrame((state) => {
    if (!ref.current) return;

    const scrollProgress = scroll.offset;
    const time = state.clock.elapsedTime;

    // Rotate each ring slightly based on its position and scroll
    ref.current.rotation.z = time * 0.1 + index * 0.05 + scrollProgress * Math.PI * 2;

    // Pulse effect
    const pulse = 1 + Math.sin(time * 2 + index * 0.3) * 0.02;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={[0, 0, z]} rotation={[0, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 8, 64]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6 + progress * 0.4}
        metalness={0.1}
        roughness={0.6}
      />
    </mesh>
  );
}

export function SpiralVortex() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Create ring configuration
  const rings = useMemo(() => {
    const ringCount = 40;
    const spiralTurns = 3;
    const startRadius = 4;
    const endRadius = 1;
    const depth = 12;

    return Array.from({ length: ringCount }, (_, i) => {
      const progress = i / (ringCount - 1);
      const z = -progress * depth + depth / 2;
      const radius = startRadius - (startRadius - endRadius) * progress;

      return {
        id: i,
        radius,
        z,
        rotation: progress * Math.PI * 2 * spiralTurns,
      };
    });
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    const scrollProgress = scroll.offset;

    // Move through the tunnel as we scroll
    groupRef.current.position.z = scrollProgress * 8 - 2;

    // Subtle rotation
    groupRef.current.rotation.z = scrollProgress * Math.PI * 0.5;
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring) => (
        <Ring
          key={ring.id}
          radius={ring.radius}
          z={ring.z}
          index={ring.id}
          totalRings={rings.length}
        />
      ))}
    </group>
  );
}

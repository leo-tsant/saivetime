"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 40;

interface OrbitParticle {
  radiusX: number; // Ellipse width
  radiusY: number; // Ellipse height
  speed: number; // Orbital speed
  phase: number; // Starting angle
  size: number;
  opacity: number;
  tilt: number; // Rotation of the orbit plane
  direction: number; // 1 or -1 for clockwise/counter-clockwise
}

export function AnimatedLinesBackground() {
  const pointsRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  // Initialize orbital particles
  const particles = useMemo<OrbitParticle[]>(() => {
    const arr: OrbitParticle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const orbitLayer = Math.floor(i / 8); // Create orbital layers
      const baseRadius = 3 + orbitLayer * 2.5;

      arr.push({
        radiusX: baseRadius + Math.random() * 1.5,
        radiusY: baseRadius * (0.4 + Math.random() * 0.3), // Elliptical
        speed: 0.15 + Math.random() * 0.25 - orbitLayer * 0.03, // Outer orbits slower
        phase: Math.random() * Math.PI * 2,
        size: 0.06 + Math.random() * 0.08,
        opacity: 0.15 + Math.random() * 0.35,
        tilt: (Math.random() - 0.5) * 0.5, // Slight tilt variation
        direction: Math.random() > 0.3 ? 1 : -1,
      });
    }
    return arr;
  }, []);

  // Create geometry buffers
  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const sz = new Float32Array(PARTICLE_COUNT);

    particles.forEach((p, i) => {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = -5;
      sz[i] = p.size;
    });

    return { positions: pos, sizes: sz };
  }, [particles]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position;

    // Calculate opacity based on scroll - visible at top and bottom only
    const scrollOffset = scroll.offset;

    // Visible at hero (0-0.1) and CTA section (0.85-1.0)
    // Fade out in middle sections
    let globalOpacity = 0;

    if (scrollOffset < 0.15) {
      // Hero section - fade out as we leave
      globalOpacity = 1 - (scrollOffset / 0.15);
    } else if (scrollOffset > 0.8) {
      // CTA section - fade in as we approach
      globalOpacity = (scrollOffset - 0.8) / 0.2;
    }

    // Update material opacity
    (pointsRef.current.material as THREE.PointsMaterial).opacity = 0.6 * globalOpacity;

    // Update particle positions along elliptical orbits
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      const angle = p.phase + time * p.speed * p.direction;

      // Elliptical orbit calculation
      const x = Math.cos(angle) * p.radiusX;
      const y = Math.sin(angle) * p.radiusY + Math.sin(angle * 2) * p.tilt;
      const z = Math.sin(angle) * 2 - 5; // Slight z movement for depth

      // Center the orbits on the right side of the screen (where torus is)
      posAttr.setXYZ(i, x + 4, y, z);
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#9a8a7a"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

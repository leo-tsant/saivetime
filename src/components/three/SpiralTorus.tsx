"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

interface SpiralTorusProps {
  slices?: number;
  radius?: number;
  tubeRadius?: number;
  twists?: number;
}

export function SpiralTorus({
  slices = 200,
  radius = 3,
  tubeRadius = 1.5,
  twists = 3,
}: SpiralTorusProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Create individual slice geometries
  const sliceGeometries = useMemo(() => {
    const geometries: THREE.PlaneGeometry[] = [];

    for (let i = 0; i < slices; i++) {
      const geo = new THREE.PlaneGeometry(0.1, tubeRadius * 2);
      geometries.push(geo);
    }

    return geometries;
  }, [slices, tubeRadius]);

  // Calculate positions for each slice along the torus path
  const sliceTransforms = useMemo(() => {
    const transforms: { position: THREE.Vector3; rotation: THREE.Euler }[] = [];

    for (let i = 0; i < slices; i++) {
      const t = (i / slices) * Math.PI * 2;

      // Torus parametric equation
      const x = (radius + tubeRadius * Math.cos(t * twists)) * Math.cos(t);
      const y = (radius + tubeRadius * Math.cos(t * twists)) * Math.sin(t);
      const z = tubeRadius * Math.sin(t * twists);

      // Rotation to face along the path
      const rotationZ = t + Math.PI / 2;
      const rotationX = Math.atan2(z, tubeRadius);

      transforms.push({
        position: new THREE.Vector3(x, y, z),
        rotation: new THREE.Euler(rotationX, 0, rotationZ),
      });
    }

    return transforms;
  }, [slices, radius, tubeRadius, twists]);

  useFrame(() => {
    if (!groupRef.current) return;

    const scrollProgress = scroll.offset; // 0 to 1

    // Rotate the entire spiral based on scroll
    groupRef.current.rotation.x = scrollProgress * Math.PI * 2;
    groupRef.current.rotation.y = scrollProgress * Math.PI;

    // Scale effect - spiral "opens up" as you scroll
    const scale = 1 + scrollProgress * 0.5;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      {sliceTransforms.map((transform, i) => {
        // Color gradient based on position
        const hue = (i / slices) * 0.1; // Subtle hue shift
        const saturation = 0.1 + (i / slices) * 0.3;
        const lightness = 0.7 + (i / slices) * 0.1;

        return (
          <mesh
            key={i}
            position={transform.position}
            rotation={transform.rotation}
            geometry={sliceGeometries[i]}
          >
            <meshStandardMaterial
              color={`hsl(${hue * 360}, ${saturation * 100}%, ${lightness * 100}%)`}
              side={THREE.DoubleSide}
              metalness={0.1}
              roughness={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

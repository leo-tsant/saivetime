"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

export function SpiralTorusOptimized() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const sliceCount = isMobile ? 150 : 300;

  const geometry = useMemo(() => {
    const slices = sliceCount;
    const radius = 3;
    const tubeRadius = 1.5;
    const twists = 4;
    const sliceWidth = 0.02;

    const positions: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < slices; i++) {
      const t = (i / slices) * Math.PI * 2;

      // Current slice center using torus parametric equation
      const cx = (radius + tubeRadius * Math.cos(t * twists)) * Math.cos(t);
      const cy = (radius + tubeRadius * Math.cos(t * twists)) * Math.sin(t);
      const cz = tubeRadius * Math.sin(t * twists);

      // Create quad for each slice
      const baseIndex = i * 4;

      // Calculate tangent and normal for proper slice orientation
      const nextT = ((i + 1) / slices) * Math.PI * 2;
      const nx = (radius + tubeRadius * Math.cos(nextT * twists)) * Math.cos(nextT);
      const ny = (radius + tubeRadius * Math.cos(nextT * twists)) * Math.sin(nextT);
      const nz = tubeRadius * Math.sin(nextT * twists);

      // Tangent direction
      const tx = nx - cx;
      const ty = ny - cy;
      const tz = nz - cz;
      const tLen = Math.sqrt(tx * tx + ty * ty + tz * tz);

      // Normalized tangent
      const tanX = tx / tLen;
      const tanY = ty / tLen;
      const tanZ = tz / tLen;

      // Up vector (for creating the slice plane)
      const upX = 0;
      const upY = 0;
      const upZ = 1;

      // Perpendicular vector (cross product of tangent and up)
      const perpX = tanY * upZ - tanZ * upY;
      const perpY = tanZ * upX - tanX * upZ;
      const perpZ = tanX * upY - tanY * upX;
      const perpLen = Math.sqrt(perpX * perpX + perpY * perpY + perpZ * perpZ);

      // Normalized perpendicular
      const pX = perpLen > 0.001 ? perpX / perpLen : 1;
      const pY = perpLen > 0.001 ? perpY / perpLen : 0;
      const pZ = perpLen > 0.001 ? perpZ / perpLen : 0;

      // Second perpendicular (cross product of tangent and first perpendicular)
      const p2X = tanY * pZ - tanZ * pY;
      const p2Y = tanZ * pX - tanX * pZ;
      const p2Z = tanX * pY - tanY * pX;

      const halfWidth = sliceWidth / 2;
      const halfHeight = tubeRadius * 0.8;

      // Four corners of the slice
      positions.push(
        cx - pX * halfWidth - p2X * halfHeight,
        cy - pY * halfWidth - p2Y * halfHeight,
        cz - pZ * halfWidth - p2Z * halfHeight,

        cx + pX * halfWidth - p2X * halfHeight,
        cy + pY * halfWidth - p2Y * halfHeight,
        cz + pZ * halfWidth - p2Z * halfHeight,

        cx + pX * halfWidth + p2X * halfHeight,
        cy + pY * halfWidth + p2Y * halfHeight,
        cz + pZ * halfWidth + p2Z * halfHeight,

        cx - pX * halfWidth + p2X * halfHeight,
        cy - pY * halfWidth + p2Y * halfHeight,
        cz - pZ * halfWidth + p2Z * halfHeight
      );

      // Normals pointing along tangent
      for (let j = 0; j < 4; j++) {
        normals.push(tanX, tanY, tanZ);
      }

      // UVs
      const uProgress = i / slices;
      uvs.push(
        uProgress, 0,
        uProgress, 0,
        uProgress, 1,
        uProgress, 1
      );

      // Indices for two triangles
      indices.push(
        baseIndex, baseIndex + 1, baseIndex + 2,
        baseIndex, baseIndex + 2, baseIndex + 3
      );

      // Color gradient (neutral cream to warm orange)
      const progress = i / slices;
      const r = 0.96 - progress * 0.1;
      const g = 0.94 - progress * 0.35;
      const b = 0.92 - progress * 0.55;
      for (let j = 0; j < 4; j++) {
        colors.push(r, g, b);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);

    return geo;
  }, [sliceCount]);

  // Custom shader for scroll-based color transition
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uScrollProgress: { value: 0 },
        uTime: { value: 0 },
        uAccentColor: { value: new THREE.Color("#ff5a36") },
      },
      vertexShader: `
        varying vec3 vColor;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        attribute vec3 color;

        uniform float uScrollProgress;
        uniform float uTime;

        void main() {
          vColor = color;
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;

          // Add wave effect based on scroll
          vec3 pos = position;
          float wave = sin(pos.x * 3.0 + pos.y * 2.0 + uScrollProgress * 6.28) * 0.15;
          pos.z += wave * uScrollProgress;

          // Slight expansion effect
          float expansion = 1.0 + uScrollProgress * 0.1;
          pos *= expansion;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        uniform float uScrollProgress;
        uniform float uTime;
        uniform vec3 uAccentColor;

        void main() {
          // Lighting
          vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
          vec3 lightDir2 = normalize(vec3(-1.0, -0.5, 0.5));

          float diff = max(dot(vNormal, lightDir), 0.0);
          float diff2 = max(dot(vNormal, lightDir2), 0.0) * 0.3;
          float totalLight = 0.4 + diff * 0.5 + diff2;

          // Mix from neutral to accent color based on scroll and position
          vec3 neutralColor = vColor;
          float colorMix = uScrollProgress * 0.6 * (0.5 + vUv.x * 0.5);
          vec3 finalColor = mix(neutralColor, uAccentColor, colorMix);

          // Apply lighting
          finalColor *= totalLight;

          // Add subtle glow at edges
          float edge = 1.0 - abs(vUv.y - 0.5) * 2.0;
          finalColor += uAccentColor * edge * uScrollProgress * 0.1;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const scrollProgress = scroll.offset;

    // Update uniforms
    materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Rotate based on scroll - creates the vortex effect
    meshRef.current.rotation.x = scrollProgress * Math.PI * 3;
    meshRef.current.rotation.z = scrollProgress * Math.PI * 1.5;
    meshRef.current.rotation.y = Math.sin(scrollProgress * Math.PI) * 0.5;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}

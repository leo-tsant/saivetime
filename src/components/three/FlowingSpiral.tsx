"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

export function FlowingSpiral() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScroll();

  // Create a smooth spiral tube geometry
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 200;
    const turns = 4;
    const startRadius = 4;
    const endRadius = 0.5;
    const height = 15;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * turns;

      // Smooth radius transition (ease in-out)
      const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const radius = startRadius - (startRadius - endRadius) * easedT;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = t * height - height / 2;

      points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const tubeGeo = new THREE.TubeGeometry(curve, 300, 0.08, 16, false);

    return tubeGeo;
  }, []);

  // Create shader material for smooth gradient
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
        uColorStart: { value: new THREE.Color("#f5f0eb") },
        uColorMid: { value: new THREE.Color("#e8d5c4") },
        uColorEnd: { value: new THREE.Color("#ff5a36") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;

        uniform float uTime;
        uniform float uScrollProgress;

        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);

          vec3 pos = position;

          // Subtle breathing effect
          float breath = sin(uTime * 0.5 + uv.x * 6.28) * 0.02;
          pos += normal * breath;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;

        uniform float uTime;
        uniform float uScrollProgress;
        uniform vec3 uColorStart;
        uniform vec3 uColorMid;
        uniform vec3 uColorEnd;

        void main() {
          // Progress along the spiral (0 to 1)
          float progress = vUv.x;

          // Three-color gradient
          vec3 color;
          if (progress < 0.5) {
            color = mix(uColorStart, uColorMid, progress * 2.0);
          } else {
            color = mix(uColorMid, uColorEnd, (progress - 0.5) * 2.0);
          }

          // Add scroll-based color shift
          float scrollInfluence = uScrollProgress * 0.4;
          color = mix(color, uColorEnd, scrollInfluence * progress);

          // Lighting
          vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
          float diff = max(dot(vNormal, lightDir), 0.0);
          float ambient = 0.5;
          float lighting = ambient + diff * 0.5;

          // Fresnel effect for edge glow
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.0);

          color *= lighting;
          color += uColorEnd * fresnel * 0.15 * uScrollProgress;

          // Subtle shimmer
          float shimmer = sin(vUv.x * 100.0 + uTime * 2.0) * 0.02 + 1.0;
          color *= shimmer;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const scrollProgress = scroll.offset;
    const time = state.clock.elapsedTime;

    // Update shader uniforms
    materialRef.current.uniforms.uTime.value = time;
    materialRef.current.uniforms.uScrollProgress.value = scrollProgress;

    // Rotate the spiral as user scrolls - creates the "drilling" effect
    meshRef.current.rotation.z = scrollProgress * Math.PI * 4;

    // Move camera through the spiral
    meshRef.current.position.z = -scrollProgress * 6;

    // Subtle tilt based on scroll
    meshRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <primitive object={material} ref={materialRef} attach="material" />
    </mesh>
  );
}

"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

// Sand particles falling through the hourglass
function SandParticles({ count = 300 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  const scroll = useScroll();

  const { positions, velocities, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.6;
      const height = 1.5 + Math.random() * 1.2;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      vel[i] = 0.015 + Math.random() * 0.02;
      siz[i] = 0.03 + Math.random() * 0.02;
    }

    return { positions: pos, velocities: vel, sizes: siz };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  useFrame(() => {
    if (!particlesRef.current) return;

    // Clamp to valid range [0, 1] to prevent errors during Safari bounce-back
    const scrollProgress = Math.max(0, Math.min(1, scroll.offset || 0));
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      let x = posArray[idx];
      let y = posArray[idx + 1];
      let z = posArray[idx + 2];

      const speed = velocities[i] * (1 + scrollProgress * 1.5);
      y -= speed;

      const currentRadius = Math.sqrt(x * x + z * z);
      const angle = Math.atan2(z, x);

      let maxRadius: number;
      if (y > 0) {
        maxRadius = Math.max(0.08, y * 0.5);
      } else if (y > -0.3 && y <= 0) {
        maxRadius = 0.08;
      } else {
        maxRadius = Math.max(0.08, Math.abs(y) * 0.5);
      }

      if (currentRadius > maxRadius * 0.9) {
        const newRadius = maxRadius * 0.85;
        x = Math.cos(angle) * newRadius;
        z = Math.sin(angle) * newRadius;
      }

      if (y < -2.8) {
        const newAngle = Math.random() * Math.PI * 2;
        const newRadius = Math.random() * 0.5;
        x = Math.cos(newAngle) * newRadius;
        y = 1.5 + Math.random() * 1.2;
        z = Math.sin(newAngle) * newRadius;
      }

      posArray[idx] = x;
      posArray[idx + 1] = y;
      posArray[idx + 2] = z;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#e07850"
        transparent
        opacity={0.95}
        sizeAttenuation
      />
    </points>
  );
}

// Futuristic glass hourglass container
function HourglassGlass() {
  const glassRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  const glassGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const segments = 80;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = (t - 0.5) * 6;

      let radius: number;
      const normalizedY = Math.abs(y) / 3;

      if (normalizedY < 0.12) {
        // Narrow neck
        radius = 0.1 + normalizedY * 0.2;
      } else {
        // Curved bulbs
        const bulbT = (normalizedY - 0.12) / 0.88;
        radius = 0.1 + 0.2 * 0.12 + Math.pow(Math.sin(bulbT * Math.PI * 0.5), 0.8) * 1.15;
      }

      points.push(new THREE.Vector2(radius, y));
    }

    return new THREE.LatheGeometry(points, 64);
  }, []);

  // Futuristic glass material with better reflections
  const glassMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec2 vUv;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;
        varying vec2 vUv;

        uniform float uTime;
        uniform float uScrollProgress;

        void main() {
          vec3 viewDir = normalize(-vPosition);

          // Enhanced fresnel for glass
          float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);

          // Base glass - very clean and clear
          vec3 glassColor = vec3(0.98, 0.97, 0.95);

          // Subtle blue tint for futuristic feel
          vec3 tintColor = vec3(0.9, 0.95, 1.0);
          glassColor = mix(glassColor, tintColor, 0.1);

          // Edge color - darker for definition
          vec3 edgeColor = vec3(0.7, 0.72, 0.75);

          vec3 finalColor = mix(glassColor, edgeColor, fresnel * 0.6);

          // Multiple light sources for realism
          vec3 lightDir1 = normalize(vec3(1.0, 1.0, 0.5));
          vec3 lightDir2 = normalize(vec3(-0.5, 0.5, 1.0));

          // Specular highlights
          vec3 reflectDir1 = reflect(-lightDir1, vNormal);
          vec3 reflectDir2 = reflect(-lightDir2, vNormal);
          float spec1 = pow(max(dot(viewDir, reflectDir1), 0.0), 128.0);
          float spec2 = pow(max(dot(viewDir, reflectDir2), 0.0), 64.0);

          finalColor += vec3(1.0) * spec1 * 0.6;
          finalColor += vec3(0.9, 0.95, 1.0) * spec2 * 0.3;

          // Subtle rainbow iridescence
          float iridescence = sin(vWorldPosition.y * 3.0 + uTime * 0.5) * 0.02;
          finalColor.r += iridescence;
          finalColor.b -= iridescence;

          // Transparency
          float alpha = 0.15 + fresnel * 0.5;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (glassMaterial.uniforms) {
      glassMaterial.uniforms.uTime.value = state.clock.elapsedTime;
      // Clamp to valid range [0, 1] to prevent errors during Safari bounce-back
      glassMaterial.uniforms.uScrollProgress.value = Math.max(0, Math.min(1, scroll.offset || 0));
    }
  });

  // Metallic rim material - darker, more premium
  const rimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#2a2520",
      metalness: 0.8,
      roughness: 0.2,
    });
  }, []);

  const rimGeometry = useMemo(() => {
    return new THREE.TorusGeometry(1.25, 0.06, 16, 64);
  }, []);

  return (
    <group>
      {/* Glass body */}
      <mesh ref={glassRef} geometry={glassGeometry} material={glassMaterial} />

      {/* Top rim */}
      <mesh
        geometry={rimGeometry}
        material={rimMaterial}
        position={[0, 3, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Bottom rim */}
      <mesh
        geometry={rimGeometry}
        material={rimMaterial}
        position={[0, -3, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Sleek vertical supports - thinner, more elegant */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * 1.2, 0, Math.sin(angle) * 1.2]}
        >
          <cylinderGeometry args={[0.025, 0.025, 6, 12]} />
          <meshStandardMaterial color="#2a2520" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// Sand piles
function SandPiles({ scrollProgress }: { scrollProgress: number }) {
  const topPileGeometry = useMemo(() => new THREE.ConeGeometry(0.55, 0.35, 32), []);
  const bottomPileGeometry = useMemo(() => new THREE.ConeGeometry(0.7, 0.5, 32), []);

  const sandMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#d4956a",
      roughness: 0.95,
      metalness: 0,
    });
  }, []);

  const topScale = Math.max(0.1, 1 - scrollProgress * 0.8);
  const bottomScale = 0.2 + scrollProgress * 0.8;

  return (
    <>
      <mesh
        geometry={topPileGeometry}
        material={sandMaterial}
        position={[0, 1.4, 0]}
        rotation={[Math.PI, 0, 0]}
        scale={[topScale, topScale, topScale]}
      />
      <mesh
        geometry={bottomPileGeometry}
        material={sandMaterial}
        position={[0, -2.75 + bottomScale * 0.25, 0]}
        scale={[bottomScale, bottomScale, bottomScale]}
      />
    </>
  );
}

// Main hourglass component with zoom and sticky behavior
export function ElegantTorus() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    // Clamp to valid range [0, 1] to prevent errors during Safari bounce-back
    const progress = Math.max(0, Math.min(1, scroll.offset || 0));
    setScrollProgress(progress);

    // Simple animation:
    // - Start small on right (hero)
    // - Smoothly scale up to large (stays on right, fills ~80% of viewport height)
    // - At the end, scale back down to small

    const smallScale = 0.5;
    const largeScale = 0.7;
    const xPos = isMobile ? 0 : 3;

    // Simple scale curve: small -> large -> small
    // Use a smooth curve that peaks in the middle of the scroll
    let scale: number;

    if (progress < 0.1) {
      // Start small
      scale = smallScale;
    } else if (progress < 0.3) {
      // Zoom in
      const t = (progress - 0.1) / 0.2;
      scale = smallScale + (largeScale - smallScale) * t;
    } else if (progress < 0.8) {
      // Stay large
      scale = largeScale;
    } else {
      // Zoom out
      const t = (progress - 0.8) / 0.2;
      scale = largeScale - (largeScale - smallScale) * t;
    }

    // Apply scale directly (no lerp to avoid lag/twitching)
    groupRef.current.scale.setScalar(scale);

    // Fixed X position (no side switching)
    groupRef.current.position.x = xPos;

    // Gentle continuous rotation
    groupRef.current.rotation.y = time * 0.1;

    // Very subtle tilt
    groupRef.current.rotation.x = 0.05;
    groupRef.current.rotation.z = Math.sin(time * 0.3) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <HourglassGlass />
      <SandPiles scrollProgress={scrollProgress} />
      <SandParticles count={isMobile ? 150 : 300} />
    </group>
  );
}

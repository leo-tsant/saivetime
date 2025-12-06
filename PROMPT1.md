# System Prompt: Build SaiveTime Website - Concept 1 (Time Spiral / Vortex)

You are an expert frontend developer specializing in Next.js, React Three Fiber, and scroll-driven 3D animations. Your task is to build the complete SaiveTime agency website using the Time Spiral / Vortex concept.

---

## Project Overview

**SaiveTime** is an AI automation agency that helps businesses save time through intelligent automation solutions. The website should convey the message of "saving time through AI automation" with a stunning 3D scroll-driven experience.

**Brand Message**: "AI automation that gives you back your most valuable asset"

**Founders**:
- Leo Tsantarliotis (Co-Founder)
- Spilios Spiliopoulos (Co-Founder)

---

## Concept: Time Spiral / Vortex

**Inspired by**: OPTIKKA website

A scroll-driven 3D animation featuring a twisted torus/spiral shape that morphs and rotates as the user scrolls. The user experiences "flying through time" as they navigate through the spiral, with the camera moving through the center of the vortex.

### Brand Connection
- **Visual Metaphor**: Time compressed into a spiral - scroll through hours of saved time
- **Experience**: The journey through automation - entering the vortex of efficiency
- **Colors**: Neutral tones transitioning to vibrant accent colors (representing transformation)

### Key Features
- Sliced torus geometry (like OPTIKKA)
- Camera fly-through on scroll
- Color transition from neutral to accent
- "Journey through time" narrative

---

## Technical Stack

```json
{
  "framework": "Next.js 14 (App Router)",
  "3d": [
    "three.js",
    "react-three-fiber (@react-three/fiber)",
    "@react-three/drei"
  ],
  "animation": [
    "gsap",
    "gsap/ScrollTrigger",
    "@gsap/react"
  ],
  "styling": "Tailwind CSS",
  "language": "TypeScript",
  "utilities": [
    "leva (for debugging 3D controls)"
  ]
}
```

---

## Project Setup

### 1. Initialize Next.js Project

```bash
npx create-next-app@latest saivetime --typescript --tailwind --eslint --app --src-dir
cd saivetime
```

### 2. Install Dependencies

```bash
# Core 3D libraries
npm install three @react-three/fiber @react-three/drei

# Animation
npm install gsap @gsap/react

# Utilities
npm install leva

# Type definitions
npm install -D @types/three
```

### 3. GSAP Plugin Registration

Create `src/lib/gsap.ts`:

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
```

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── three/
│   │   ├── Scene.tsx           # Main R3F Canvas wrapper
│   │   ├── SpiralTorus.tsx     # The spiral geometry
│   │   ├── ScrollCamera.tsx    # Scroll-driven camera
│   │   └── Lighting.tsx        # Scene lighting
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   └── CTA.tsx
│   └── ui/
│       ├── Navigation.tsx
│       └── Button.tsx
├── hooks/
│   └── useScrollProgress.ts
└── lib/
    ├── gsap.ts
    └── utils.ts
```

---

## Content Sections (Required)

### Section 1: Hero
- Logo: "saivetime" (text, clean typography)
- Tagline: "AI automation that gives you back your most valuable asset"
- Scroll indicator (animated down arrow or text)

### Section 2: Journey/Services
- Brief description of AI automation services
- Focus on saving time and increasing efficiency

### Section 3: About Us
```
Leo Tsantarliotis          Spilios Spiliopoulos
Co-Founder                 Co-Founder
[Headshot placeholder]     [Headshot placeholder]
```

### Section 4: CTA
- Heading: "Ready to save time?"
- Button: "Let's Talk" (link to calendar - placeholder href for now)

---

## Animation Timeline (Scroll Sections)

| Scroll % | 3D Animation | Camera Position | Content |
|----------|--------------|-----------------|---------|
| 0-20% | Spiral visible, slight rotation | Front view, far | Hero: "saivetime" title |
| 20-40% | Spiral rotates, starts opening | Moving to side | Tagline appears |
| 40-60% | Camera enters spiral vortex | Inside spiral | "Enter the future" |
| 60-80% | Flying through center | Through tunnel | Services reveal |
| 80-100% | Exit spiral, colors intensify | Pull back view | About Us + CTA |

---

## Color Palette

```css
/* Inspired by OPTIKKA - warm neutrals with orange accent */
:root {
  --bg-primary: #f5f0eb;      /* Warm off-white */
  --bg-secondary: #e8e2db;    /* Slightly darker neutral */
  --text-primary: #2d2a26;    /* Dark warm gray */
  --text-secondary: #6b6560;  /* Medium warm gray */
  --accent: #ff5a36;          /* Vibrant orange-red */
  --accent-light: #ff8a6c;    /* Lighter accent */
}
```

---

## Core Components Implementation

### 1. The Spiral Torus Geometry

The key to this effect is creating a twisted torus made of stacked planes/slices. This creates a "sliced" appearance that catches light beautifully.

```typescript
// src/components/three/SpiralTorus.tsx
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
```

### 2. Optimized Version with BufferGeometry

For better performance with many slices, use a single BufferGeometry:

```typescript
// src/components/three/SpiralTorusOptimized.tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

export function SpiralTorusOptimized() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const scroll = useScroll();

  const geometry = useMemo(() => {
    const slices = 300;
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

      // Current slice center
      const cx = (radius + tubeRadius * Math.cos(t * twists)) * Math.cos(t);
      const cy = (radius + tubeRadius * Math.cos(t * twists)) * Math.sin(t);
      const cz = tubeRadius * Math.sin(t * twists);

      // Create quad for each slice
      const baseIndex = i * 4;

      // Four corners of the slice
      const halfWidth = sliceWidth / 2;
      const halfHeight = tubeRadius;

      positions.push(
        cx - halfWidth, cy - halfHeight, cz,
        cx + halfWidth, cy - halfHeight, cz,
        cx + halfWidth, cy + halfHeight, cz,
        cx - halfWidth, cy + halfHeight, cz
      );

      // Normals pointing outward
      const normal = new THREE.Vector3(cx, cy, cz).normalize();
      for (let j = 0; j < 4; j++) {
        normals.push(normal.x, normal.y, normal.z);
      }

      // UVs
      uvs.push(0, 0, 1, 0, 1, 1, 0, 1);

      // Indices for two triangles
      indices.push(
        baseIndex, baseIndex + 1, baseIndex + 2,
        baseIndex, baseIndex + 2, baseIndex + 3
      );

      // Color gradient (neutral to orange)
      const progress = i / slices;
      const r = 0.9 + progress * 0.1;
      const g = 0.85 - progress * 0.3;
      const b = 0.8 - progress * 0.5;
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
  }, []);

  // Custom shader for scroll-based color transition
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uScrollProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec3 vColor;
        varying vec2 vUv;
        varying vec3 vNormal;

        attribute vec3 color;

        uniform float uScrollProgress;

        void main() {
          vColor = color;
          vUv = uv;
          vNormal = normal;

          // Add wave effect based on scroll
          vec3 pos = position;
          float wave = sin(pos.x * 2.0 + uScrollProgress * 6.28) * 0.1;
          pos.z += wave * uScrollProgress;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying vec2 vUv;
        varying vec3 vNormal;

        uniform float uScrollProgress;

        void main() {
          // Lighting
          vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
          float diff = max(dot(vNormal, lightDir), 0.0);

          // Mix from neutral to accent color based on scroll
          vec3 neutralColor = vColor;
          vec3 accentColor = vec3(1.0, 0.4, 0.2); // Orange
          vec3 finalColor = mix(neutralColor, accentColor, uScrollProgress * 0.5);

          finalColor *= (0.5 + diff * 0.5);

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

    // Rotate based on scroll
    meshRef.current.rotation.x = scrollProgress * Math.PI * 4;
    meshRef.current.rotation.z = scrollProgress * Math.PI * 2;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </mesh>
  );
}
```

### 3. Scroll-Driven Camera (Fly-Through Effect)

```typescript
// src/components/three/ScrollCamera.tsx
"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

export function ScrollCamera() {
  const { camera } = useThree();
  const scroll = useScroll();

  // Define camera path through the spiral
  const cameraPath = useRef(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 15),    // Start: Looking at spiral from front
      new THREE.Vector3(5, 2, 10),    // Move to side
      new THREE.Vector3(0, 0, 5),     // Approach
      new THREE.Vector3(0, 0, 0),     // Enter the spiral
      new THREE.Vector3(0, 0, -5),    // Through the center
      new THREE.Vector3(-3, 2, -8),   // Exit side
      new THREE.Vector3(0, 5, -12),   // Pull back and up
    ])
  );

  useFrame(() => {
    const scrollProgress = scroll.offset;

    // Get position along the path
    const point = cameraPath.current.getPoint(scrollProgress);
    camera.position.copy(point);

    // Look at center or slightly ahead on the path
    const lookAtProgress = Math.min(scrollProgress + 0.1, 1);
    const lookAtPoint = cameraPath.current.getPoint(lookAtProgress);

    // Smooth look-at with some offset
    camera.lookAt(
      lookAtPoint.x * 0.5,
      lookAtPoint.y * 0.5,
      lookAtPoint.z * 0.5
    );
  });

  return null;
}
```

### 4. Main Scene Component

```typescript
// src/components/three/Scene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { SpiralTorusOptimized } from "./SpiralTorusOptimized";
import { ScrollCamera } from "./ScrollCamera";

export function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#f5f0eb"]} />

        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.25}>
            {/* 3D Content */}
            <SpiralTorusOptimized />
            <ScrollCamera />

            {/* HTML Content overlay */}
            <Scroll html>
              <div className="w-screen">
                {/* Content sections go here */}
              </div>
            </Scroll>
          </ScrollControls>

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />

          {/* Optional: Environment for reflections */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

### 5. Hero Section Component

```typescript
// src/components/sections/Hero.tsx
"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: 1,
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -100 }
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -50 },
      "<0.1"
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <h1
        ref={titleRef}
        className="text-6xl md:text-8xl font-light tracking-tight text-neutral-800"
      >
        saivetime
      </h1>
      <p
        ref={subtitleRef}
        className="mt-6 text-xl md:text-2xl text-neutral-600 max-w-2xl"
      >
        AI-powered automation that gives you back your most valuable asset
      </p>
      <div className="mt-8 text-sm text-neutral-400 animate-bounce">
        SCROLL DOWN
      </div>
    </section>
  );
}
```

---

## Shared UI Components

### Navigation

```typescript
// src/components/ui/Navigation.tsx
"use client";

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
      <a href="/" className="text-xl font-light text-neutral-800">
        saivetime
      </a>
      <a
        href="#contact"
        className="px-6 py-2 bg-[#ff5a36] text-white rounded-full hover:bg-[#ff8a6c] transition-colors"
      >
        Let's Talk
      </a>
    </nav>
  );
}
```

### Button

```typescript
// src/components/ui/Button.tsx
"use client";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ children, href, onClick, variant = "primary" }: ButtonProps) {
  const baseStyles = "px-8 py-4 rounded-full font-medium transition-colors";
  const variants = {
    primary: "bg-[#ff5a36] text-white hover:bg-[#ff8a6c]",
    secondary: "bg-transparent border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white",
  };

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}
```

---

## Performance Optimizations

1. **Use `useMemo`** for geometry calculations
2. **Limit draw calls** by combining geometries when possible
3. **Use `<Suspense>`** with loading fallback
4. **Enable `frameloop="demand"`** on Canvas when not animating
5. **Use `<Bvh>`** from drei for complex geometries
6. **Implement LOD (Level of Detail)** for the spiral - fewer slices on mobile

```typescript
// Mobile detection for LOD
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const sliceCount = isMobile ? 100 : 300;
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| FPS | 60fps on desktop, 30fps on mobile |
| LCP | < 2.5s |
| Bundle size | < 500KB (JS) |

---

## Implementation Checklist

- [ ] Initialize Next.js project with TypeScript and Tailwind
- [ ] Install all dependencies (Three.js, R3F, GSAP)
- [ ] Set up GSAP plugin registration
- [ ] Create SpiralTorus component with sliced geometry
- [ ] Implement scroll-driven camera fly-through
- [ ] Build main Scene component with ScrollControls
- [ ] Create Hero section with scroll animations
- [ ] Create About section with founder info
- [ ] Create CTA section with contact button
- [ ] Add Navigation component
- [ ] Implement color transitions based on scroll
- [ ] Optimize for mobile (reduce slices, check performance)
- [ ] Test scroll animations across all sections
- [ ] Ensure smooth 60fps performance

---

## References

- [OPTIKKA Website](https://optikka.com) - Original inspiration
- [Codrops Camera Fly-through Tutorial](https://tympanus.net/codrops/2023/02/14/animate-a-camera-fly-through-on-scroll-using-theatre-js-and-react-three-fiber/)
- [Wawa Sensei R3F + GSAP](https://wawasensei.dev/tuto/react-three-fiber-tutorial-scroll-animations)
- [Three.js Torus Geometry Docs](https://threejs.org/docs/#api/en/geometries/TorusGeometry)
- [React Three Fiber Scroll Controls](https://github.com/pmndrs/drei#scrollcontrols)

---

## Final Notes

Build this website with attention to:
1. **Smooth scroll performance** - The 3D animation must feel buttery smooth
2. **Brand consistency** - Warm neutrals with orange accent
3. **Mobile responsiveness** - Reduce complexity on mobile but keep the experience
4. **Loading experience** - Show something meaningful while 3D loads
5. **Accessibility** - Ensure text is readable, provide reduced-motion alternatives

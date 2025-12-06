"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Preload } from "@react-three/drei";
import { Suspense } from "react";
import { ElegantTorus } from "./ElegantTorus";
import { ScrollCamera } from "./ScrollCamera";
import { Lighting } from "./Lighting";

interface SceneContentProps {
  children?: React.ReactNode;
}

function SceneContent({ children }: SceneContentProps) {
  return (
    <ScrollControls pages={5} damping={0.25}>
      {/* 3D Content */}
      <ElegantTorus />
      <ScrollCamera />

      {/* HTML Content overlay */}
      <Scroll html style={{ width: "100%" }}>
        {children}
      </Scroll>
    </ScrollControls>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#ff5a36" wireframe />
    </mesh>
  );
}

interface SceneProps {
  children?: React.ReactNode;
}

export function Scene({ children }: SceneProps) {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#f5f0eb"]} />

        <Suspense fallback={<LoadingFallback />}>
          <SceneContent>{children}</SceneContent>
          <Lighting />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

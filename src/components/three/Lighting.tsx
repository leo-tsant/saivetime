"use client";

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
      />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={0.3}
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={0.5}
        color="#ff5a36"
      />
    </>
  );
}

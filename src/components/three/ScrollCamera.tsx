"use client";

import { useThree, useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export function ScrollCamera() {
  const { camera } = useThree();
  const scroll = useScroll();

  // Hourglass is at x=3
  // To make hourglass appear on RIGHT side of screen, camera looks LEFT of hourglass
  const hourglassX = 3;
  const lookAtOffset = -3.5; // Look further left so hourglass appears more to the right

  const cameraPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 8), // Start: closer for bigger hourglass
      new THREE.Vector3(0, 0.2, 7), // Moving in slightly
      new THREE.Vector3(0, 0.3, 6), // Close - but not too close
      new THREE.Vector3(0, 0.2, 6), // Stay at this distance through content sections
      new THREE.Vector3(0, 0.1, 7), // Start pulling back
      new THREE.Vector3(0, 0, 8), // End: back to starting position
    ]);
  }, []);

  useFrame(() => {
    const progress = scroll.offset;

    // Get position along the path
    const point = cameraPath.getPoint(progress);

    // Smoothly interpolate camera position
    camera.position.lerp(point, 0.05);

    // Look LEFT of the hourglass so it appears on the RIGHT side of the screen
    camera.lookAt(hourglassX + lookAtOffset, 0, 0);
  });

  return null;
}

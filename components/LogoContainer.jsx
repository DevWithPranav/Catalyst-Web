import React, { useRef, useState, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LogoContainer = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("./model/logo.glb");

  // State to track current and target rotations
  const [targetRotation] = useState(() => new THREE.Vector3(0, 0, 0));
  const [currentRotation] = useState(() => new THREE.Vector3(0, 0, 0));

  // Apply chrome-like materials recursively
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const chromeMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0.6, 0.6, 0.6), // Silver-chrome color
          metalness: 1, // Full metalness for chrome effect
          roughness: 0.1, // Very low roughness for mirror-like reflection
          envMapIntensity: 1.5, // High intensity for pronounced reflections
          opacity: child.material.opacity,
          transparent: child.material.transparent,
        });

        // Copy over any existing map textures if needed
        if (child.material.map) {
          chromeMaterial.map = child.material.map;
        }

        child.material = chromeMaterial;
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!modelRef.current) return;

    // Create a plane at the model's position to project mouse coordinates
    const modelPosition = new THREE.Vector3(0, -10, 20);
    const mousePlane = new THREE.Plane(
      new THREE.Vector3(0, 0, 1),
      -modelPosition.z
    );

    // Project mouse onto the plane
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(state.mouse, state.camera);
    const intersectionPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(mousePlane, intersectionPoint);

    // Calculate direction vector
    const direction = intersectionPoint.sub(modelPosition).normalize();

    // Convert to euler angles with rotation limits
    const targetAngleX = Math.atan2(direction.y, direction.z);
    const targetAngleY = Math.atan2(direction.x, direction.z);

    // Limit rotation
    const maxRotationX = THREE.MathUtils.degToRad(15); // 15 degrees limit
    const maxRotationY = THREE.MathUtils.degToRad(20); // 20 degrees limit

    const clampedAngleX = THREE.MathUtils.clamp(
      targetAngleX,
      -maxRotationX,
      maxRotationX
    );
    const clampedAngleY = THREE.MathUtils.clamp(
      targetAngleY,
      -maxRotationY,
      maxRotationY
    );

    // Smooth easing
    const smoothingFactor = 0.05; // Adjust for more or less smoothness

    // Exponential smoothing for X and Y rotations
    currentRotation.x += (clampedAngleX - currentRotation.x) * smoothingFactor;
    currentRotation.y += (clampedAngleY - currentRotation.y) * smoothingFactor;

    // Apply smooth rotation
    modelRef.current.rotation.x = currentRotation.x;
    modelRef.current.rotation.y = currentRotation.y;

    // Small idle animation
    const time = state.clock.getElapsedTime();
    modelRef.current.position.y = -10 + Math.sin(time * 0.5) * 0.5;
  });

  return (
    <group ref={modelRef} position={[0, -10, 20]} scale={1.2}>
      <primitive object={scene} />
    </group>
  );
};

export default LogoContainer;

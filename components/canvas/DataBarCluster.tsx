"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function DataBarCluster() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const barsRef = useRef<(THREE.Mesh | null)[]>([]);

  // 5x5 sleek holographic data bars
  const barsData = useMemo(() => {
    const bars: { x: number; z: number; baseHeight: number; speed: number; phase: number; color: string }[] = [];
    const gridSize = 5;
    const spacing = 0.28;
    const offset = ((gridSize - 1) * spacing) / 2;

    const colors = ["#38bdf8", "#0284c7", "#818cf8", "#2dd4bf", "#6366f1"];

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const distFromCenter = Math.hypot(i - (gridSize - 1) / 2, j - (gridSize - 1) / 2);
        // Tallest in center, fading gracefully outward
        const heightMultiplier = Math.max(0.3, 1.2 - distFromCenter * 0.3);

        bars.push({
          x: i * spacing - offset,
          z: j * spacing - offset,
          baseHeight: (0.35 + Math.random() * 0.45) * heightMultiplier,
          speed: 1.0 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
          color: colors[(i + j) % colors.length],
        });
      }
    }
    return bars;
  }, []);

  useFrame(() => {
    const t = performance.now() * 0.001;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
    }

    // Counter-rotating holographic rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = -t * 0.25;
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = t * 0.18;
      ring2Ref.current.rotation.y = Math.cos(t * 0.4) * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = -t * 0.1;
    }

    barsData.forEach((bar, idx) => {
      const mesh = barsRef.current[idx];
      if (mesh) {
        // Procedural rhythmic wave pulse
        const wave = Math.sin(t * bar.speed + bar.phase) * 0.25;
        const currentScale = Math.max(0.12, bar.baseHeight + wave);
        mesh.scale.y = currentScale;
        mesh.position.y = currentScale / 2; // Anchored to base
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -2.3, -2.0]} scale={[1.5, 1.5, 1.5]}>
      {/* Outer Holographic Radar Ring */}
      <mesh ref={ring1Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[1.6, 1.66, 48]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Middle Segmented Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
        <ringGeometry args={[1.2, 1.28, 32]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner Platform Base */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <circleGeometry args={[1.1, 32]} />
        <meshStandardMaterial
          color="#061219"
          roughness={0.4}
          metalness={0.8}
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3D Cyber Data Bars */}
      {barsData.map((bar, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            barsRef.current[idx] = el;
          }}
          position={[bar.x, bar.baseHeight / 2, bar.z]}
        >
          <boxGeometry args={[0.13, 0.9, 0.13]} />
          <meshStandardMaterial
            color={bar.color}
            emissive={bar.color}
            emissiveIntensity={0.6}
            roughness={0.25}
            metalness={0.75}
            transparent={true}
            opacity={0.75}
          />
        </mesh>
      ))}

      {/* Futuristic Center Glow Lights */}
      <pointLight position={[0, 1.5, 0]} intensity={2.0} color="#38bdf8" distance={6} />
      <pointLight position={[0, 0.4, 0]} intensity={1.2} color="#a855f7" distance={5} />
    </group>
  );
}


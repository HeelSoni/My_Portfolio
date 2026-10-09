"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 140;
const CONNECTION_DISTANCE = 1.6;

export function DataConstellation() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Generate node positions in an expansive toroidal / spherical cloud with a clean center
  const nodes = useMemo(() => {
    const data: {
      pos: THREE.Vector3;
      origin: THREE.Vector3;
      color: THREE.Color;
      phase: number;
      speed: number;
      baseScale: number;
    }[] = [];

    const cyan = new THREE.Color("#38bdf8");
    const violet = new THREE.Color("#a78bfa");
    const emerald = new THREE.Color("#34d399");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < NODE_COUNT; i++) {
      // Create a toroidal / outer shell distribution so center text has space
      const angle = Math.random() * Math.PI * 2;
      const ringRadius = 2.2 + Math.random() * 3.4; // Pushed outward from center
      const height = (Math.random() - 0.5) * 3.8;
      const depth = (Math.random() - 0.5) * 2.8;

      const x = Math.cos(angle) * ringRadius;
      const y = height;
      const z = Math.sin(angle) * ringRadius * 0.45 + depth;

      const colorSeed = Math.random();
      const nodeColor =
        colorSeed > 0.65
          ? cyan
          : colorSeed > 0.35
          ? violet
          : colorSeed > 0.15
          ? emerald
          : white;

      data.push({
        pos: new THREE.Vector3(x, y, z),
        origin: new THREE.Vector3(x, y, z),
        color: nodeColor,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.6,
        baseScale: 0.022 + Math.random() * 0.02, // Small, crisp, sleek points
      });
    }
    return data;
  }, []);

  // Pre-allocate line segments geometry
  const maxLineSegments = 300;
  const linePositions = useMemo(() => new Float32Array(maxLineSegments * 6), [maxLineSegments]);
  const lineColors = useMemo(() => new Float32Array(maxLineSegments * 6), [maxLineSegments]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Set initial colors for instanced mesh
  useEffect(() => {
    if (!meshRef.current) return;
    nodes.forEach((node, i) => {
      meshRef.current?.setColorAt(i, node.color);
    });
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [nodes]);

  useFrame(() => {
    const time = performance.now() * 0.0008;
    if (!meshRef.current || !linesRef.current || !groupRef.current) return;

    // Smooth subtle parallax rotation
    const targetRotX = mouse.y * 0.15;
    const targetRotY = mouse.x * 0.25 + time * 0.04;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.03);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.03);

    const pointerWorld = new THREE.Vector3(mouse.x * 4, mouse.y * 3, 0);
    let lineIndex = 0;

    for (let i = 0; i < NODE_COUNT; i++) {
      const node = nodes[i];

      // Organic gentle floating
      const offsetX = Math.sin(time * node.speed + node.phase) * 0.12;
      const offsetY = Math.cos(time * node.speed * 0.8 + node.phase * 1.2) * 0.12;
      const offsetZ = Math.sin(time * node.speed * 0.5 + node.phase) * 0.08;

      let targetPos = new THREE.Vector3(
        node.origin.x + offsetX,
        node.origin.y + offsetY,
        node.origin.z + offsetZ
      );

      // Subtle mouse repulsion or attraction
      const distToPointer = targetPos.distanceTo(pointerWorld);
      if (distToPointer < 1.8) {
        const pullFactor = (1 - distToPointer / 1.8) * 0.18;
        targetPos.lerp(pointerWorld, pullFactor);
      }

      node.pos.lerp(targetPos, 0.06);

      // Scale pulse
      const pulse = 1 + Math.sin(time * 2.5 + node.phase) * 0.25;
      const currentScale = node.baseScale * pulse;

      dummy.position.copy(node.pos);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Calculate connections only up to limit
      for (let j = i + 1; j < NODE_COUNT && lineIndex < maxLineSegments; j++) {
        const otherNode = nodes[j];
        const dist = node.pos.distanceTo(otherNode.pos);

        if (dist < CONNECTION_DISTANCE) {
          const pIndex = lineIndex * 6;
          linePositions[pIndex] = node.pos.x;
          linePositions[pIndex + 1] = node.pos.y;
          linePositions[pIndex + 2] = node.pos.z;
          linePositions[pIndex + 3] = otherNode.pos.x;
          linePositions[pIndex + 4] = otherNode.pos.y;
          linePositions[pIndex + 5] = otherNode.pos.z;

          // Luminous soft cyan/violet glow fading with distance
          const alpha = Math.max(0, 1 - dist / CONNECTION_DISTANCE) * 0.35;
          lineColors[pIndex] = 0.22 * alpha;
          lineColors[pIndex + 1] = 0.74 * alpha;
          lineColors[pIndex + 2] = 0.97 * alpha;
          lineColors[pIndex + 3] = 0.65 * alpha;
          lineColors[pIndex + 4] = 0.45 * alpha;
          lineColors[pIndex + 5] = 0.98 * alpha;

          lineIndex++;
        }
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Update lines
    const geom = linesRef.current.geometry;
    geom.setAttribute("position", new THREE.BufferAttribute(linePositions.subarray(0, lineIndex * 6), 3));
    geom.setAttribute("color", new THREE.BufferAttribute(lineColors.subarray(0, lineIndex * 6), 3));
    geom.computeBoundingSphere();
  });

  return (
    <group ref={groupRef}>
      {/* Sleek Glowing Nodes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      {/* Cyber Filaments */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}


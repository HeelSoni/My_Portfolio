"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { DataConstellation } from "./DataConstellation";

import { HeroFallbackCanvas } from "./HeroFallbackCanvas";

// Silence benign internal Three.js Clock deprecation notice from R3F
if (typeof window !== "undefined") {
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    origWarn(...args);
  };
}

export function HeroScene() {
  const [isMounted, setIsMounted] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    const checkCapabilities = () => {
      const isMobile = window.innerWidth < 768;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Test WebGL support
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setIsFallback(isMobile || prefersReducedMotion || !gl);
    };

    checkCapabilities();
    window.addEventListener("resize", checkCapabilities);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / (windowHeight * 0.85)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkCapabilities);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isMounted) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-radial from-cyan-950/20 via-transparent to-transparent opacity-60" />
      </div>
    );
  }

  // Fallback for mobile / reduced-motion
  if (isFallback) {
    return (
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
        style={{ opacity: 1 - scrollProgress }}
      >
        <HeroFallbackCanvas />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 ease-out z-0"
      style={{
        opacity: Math.max(0, 1 - scrollProgress * 1.8),
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        fallback={<HeroFallbackCanvas />}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#e0f2fe" />
        <directionalLight position={[-5, -4, -2]} intensity={0.6} color="#8b5cf6" />
        <pointLight position={[0, 3, 2]} intensity={0.8} color="#38bdf8" distance={8} />
        <Suspense fallback={null}>
          <DataConstellation />
        </Suspense>
      </Canvas>
    </div>
  );
}

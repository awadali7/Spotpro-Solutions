"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const BRAND = {
  primary: "#2f39a9",
  secondary: "#2e6fa0",
  accent: "#49a4bb",
  highlight: "#15d8b3",
};

/** Soft radial sprite so points render as glowing dots rather than squares. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.25, "rgba(255,255,255,0.85)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    // jitter the shell slightly so it reads as a cloud, not a shell
    const r = radius * (0.82 + ((i * 37) % 19) / 100);
    positions[i * 3] = Math.cos(theta) * ring * r;
    positions[i * 3 + 1] = y * r;
    positions[i * 3 + 2] = Math.sin(theta) * ring * r;
  }
  return positions;
}

function Core({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const glow = useGlowTexture();

  const { wireframe, vertices } = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.75, 1);
    return {
      wireframe: geometry,
      vertices: geometry.getAttribute("position").array as Float32Array,
    };
  }, []);

  const dust = useMemo(() => fibonacciSphere(420, 3.4), []);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x += delta * 0.04;

    // gentle parallax toward the pointer, damped independently of frame rate
    const { x, y } = state.pointer;
    const ease = 1 - Math.pow(0.1, delta);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, x * 0.25, ease);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, y * 0.2, ease);
  });

  return (
    <group ref={group}>
      <mesh geometry={wireframe}>
        <meshBasicMaterial
          color={BRAND.accent}
          wireframe
          transparent
          opacity={0.38}
        />
      </mesh>

      <mesh scale={0.995} geometry={wireframe}>
        <meshStandardMaterial
          color={BRAND.primary}
          transparent
          opacity={0.5}
          roughness={0.35}
          metalness={0.65}
          flatShading
        />
      </mesh>

      {/* glowing nodes on the hull vertices */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[vertices, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={BRAND.highlight}
          size={0.17}
          map={glow}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* ambient data dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={BRAND.accent}
          size={0.055}
          map={glow}
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function Rings({ reduced }: { reduced: boolean }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reduced) return;
    if (a.current) a.current.rotation.z += delta * 0.12;
    if (b.current) b.current.rotation.z -= delta * 0.09;
  });

  return (
    <>
      {/* radii stay inside the camera frustum (~2.76 half-width at z=0) so the
          rings read as orbits rather than arcs clipped by the canvas edge */}
      <mesh ref={a} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[2.15, 0.006, 8, 140]} />
        <meshBasicMaterial color={BRAND.highlight} transparent opacity={0.55} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.8, Math.PI / 6, 0]}>
        <torusGeometry args={[2.45, 0.005, 8, 140]} />
        <meshBasicMaterial color={BRAND.accent} transparent opacity={0.4} />
      </mesh>
    </>
  );
}

/**
 * The canvas runs in "demand" mode, so it only renders when this ticks.
 * That caps an ambient background animation at 30fps instead of the display
 * refresh rate, and stops it entirely when scrolled away or the tab is hidden.
 */
function FrameDriver({ active, fps = 30 }: { active: boolean; fps?: number }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(invalidate, 1000 / fps);
    return () => clearInterval(id);
  }, [active, fps, invalidate]);

  return null;
}

export default function Scene({ active = true }: { active?: boolean }) {
  const reduced = useReducedMotion();

  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 3, 5]} intensity={55} color={BRAND.highlight} />
      <pointLight position={[-5, -2, 3]} intensity={45} color={BRAND.primary} />
      <Core reduced={reduced} />
      <Rings reduced={reduced} />
      <FrameDriver active={active && !reduced} />
    </Canvas>
  );
}

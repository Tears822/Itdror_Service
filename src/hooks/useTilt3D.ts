"use client";

import { useRef, useState, useCallback, useEffect } from "react";

type Options = {
  /** Max tilt in degrees (default 12) */
  maxTilt?: number;
  /** Perspective in px (default 1000) */
  perspective?: number;
  /** Smoothing 0–1 (default 0.15) */
  easing?: number;
  /** Enable glare overlay (default true) */
  glare?: boolean;
};

export function useTilt3D(options: Options = {}) {
  const {
    maxTilt = 12,
    perspective = 1000,
    easing = 0.15,
    glare = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: "50%", y: "50%" });
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  const update = useCallback(() => {
    const dx = target.current.x - current.current.x;
    const dy = target.current.y - current.current.y;
    current.current.x += dx * easing;
    current.current.y += dy * easing;
    setTransform({
      rotateX: current.current.y * maxTilt,
      rotateY: current.current.x * maxTilt,
    });
    if (glare) {
      setGlareStyle({
        opacity: Math.min(1, (Math.abs(target.current.x) + Math.abs(target.current.y)) * 0.8),
        x: `${50 + target.current.x * 50}%`,
        y: `${50 + target.current.y * 50}%`,
      });
    }
    const stillMoving = Math.abs(dx) >= 0.002 || Math.abs(dy) >= 0.002;
    if (stillMoving) raf.current = requestAnimationFrame(update);
  }, [maxTilt, easing, glare]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      target.current = { x, y };
      if (raf.current === 0) raf.current = requestAnimationFrame(update);
    };

    const handleLeave = () => {
      target.current = { x: 0, y: 0 };
      raf.current = requestAnimationFrame(update);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    raf.current = requestAnimationFrame(update);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [update]);

  const style: React.CSSProperties = {
    transformStyle: "preserve-3d",
    perspective,
    transform: `perspective(${perspective}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
  };

  return { ref, style, glareStyle, glare };
}

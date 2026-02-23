"use client";

import { useEffect, useRef, useState } from "react";

const BACKGROUND = "#001322";
const ACCENT = "#2DA0FF";
const ACCENT_BRIGHT = "#5eb8ff";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phase: number;
}

function getConfig() {
  return {
    countMax: 120,
    countMin: 50,
    areaDiv: 22000,
    radiusMin: 1.2,
    radiusRange: 1,
    opacityMin: 0.2,
    opacityRange: 0.2,
    maxDist: 160,
    lineWidth: 0.5,
    lineAlpha: 0.14,
    dotGlowAlpha: 0.1,
  };
}

export function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);
  const configRef = useRef(getConfig());
  configRef.current = getConfig();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const cfg = configRef.current;
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
      canvas.style.minHeight = "100vh";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const count = Math.min(cfg.countMax, Math.max(cfg.countMin, Math.floor((w * h) / cfg.areaDiv)));
      dotsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: cfg.radiusMin + Math.random() * cfg.radiusRange,
        opacity: cfg.opacityMin + Math.random() * cfg.opacityRange,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const loop = () => {
      const cfg = configRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, w, h);

      time += 0.008;

      const dots = dotsRef.current;

      ctx.strokeStyle = ACCENT_BRIGHT;
      ctx.lineWidth = cfg.lineWidth;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < cfg.maxDist) {
            const t = 1 - dist / cfg.maxDist;
            ctx.globalAlpha = t * t * cfg.lineAlpha;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -20) d.x = w + 20;
        if (d.x > w + 20) d.x = -20;
        if (d.y < -20) d.y = h + 20;
        if (d.y > h + 20) d.y = -20;
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const pulse = 0.9 + 0.1 * Math.sin(time + d.phase);
        const r = d.radius * pulse;
        const o = d.opacity * pulse;

        ctx.beginPath();
        ctx.arc(d.x, d.y, r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT;
        ctx.globalAlpha = o * cfg.dotGlowAlpha;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT_BRIGHT;
        ctx.globalAlpha = o;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden -z-10"
        style={{ background: "var(--background, #001322)" }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{
        zIndex: -10,
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "block",
      }}
      aria-hidden
    />
  );
}

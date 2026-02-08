"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    VANTA: any;
  }
}

interface VantaRingsProps {
  color?: number;
  backgroundColor?: number;
  backgroundAlpha?: number;
  className?: string;
}

export function VantaRings({
  color = 0x2da0ff, // Accent color #2DA0FF
  backgroundColor = 0x001322, // Background color #001322
  backgroundAlpha = 1,
  className = "",
}: VantaRingsProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !vantaRef.current) return;

    // Load Vanta.js dynamically
    const loadVanta = async () => {
      if (typeof window !== "undefined" && !window.VANTA) {
        // Load Three.js first
        await new Promise((resolve) => {
          const script1 = document.createElement("script");
          script1.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
          script1.onload = resolve;
          document.head.appendChild(script1);
        });

        // Load Vanta Rings
        await new Promise((resolve) => {
          const script2 = document.createElement("script");
          script2.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.rings.min.js";
          script2.onload = resolve;
          document.head.appendChild(script2);
        });
      }

      if (window.VANTA && vantaRef.current) {
        // Clean up previous effect if it exists
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
        }

        // Initialize Vanta Rings
        vantaEffect.current = window.VANTA.RINGS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: color,
          backgroundColor: backgroundColor,
          backgroundAlpha: backgroundAlpha,
        });
      }
    };

    loadVanta();

    // Cleanup function
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [mounted, color, backgroundColor, backgroundAlpha]);

  return (
    <div
      ref={vantaRef}
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}

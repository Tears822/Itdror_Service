"use client";

import { useEffect, useRef, useState } from "react";

export function OrbBackground() {
  const [isClient, setIsClient] = useState(false);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.003;

      if (orb1Ref.current) {
        const x = Math.sin(time * 0.7) * 20;
        const y = Math.cos(time * 0.5) * 15;
        orb1Ref.current.style.transform = `translate(${x}%, ${y}%) scale(${1 + Math.sin(time * 0.3) * 0.15})`;
      }

      if (orb2Ref.current) {
        const x = Math.cos(time * 0.6) * 25;
        const y = Math.sin(time * 0.4) * 20;
        orb2Ref.current.style.transform = `translate(${x}%, ${y}%) scale(${1 + Math.cos(time * 0.4) * 0.12})`;
      }

      if (orb3Ref.current) {
        const x = Math.sin(time * 0.8) * 18;
        const y = Math.cos(time * 0.6) * 22;
        orb3Ref.current.style.transform = `translate(${x}%, ${y}%) scale(${1 + Math.sin(time * 0.5) * 0.1})`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -10 }}>
      {/* Deep space background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, #0a1628 0%, #040d19 50%, #000810 100%)",
        }}
      />

      {/* Stars layer */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, #fff, transparent),
            radial-gradient(1px 1px at 40% 70%, #fff, transparent),
            radial-gradient(1px 1px at 50% 40%, #fff, transparent),
            radial-gradient(1px 1px at 60% 20%, #fff, transparent),
            radial-gradient(1px 1px at 80% 60%, #fff, transparent),
            radial-gradient(1.5px 1.5px at 25% 50%, #fff, transparent),
            radial-gradient(1.5px 1.5px at 75% 35%, #fff, transparent),
            radial-gradient(2px 2px at 10% 80%, rgba(45, 160, 255, 0.8), transparent),
            radial-gradient(2px 2px at 90% 10%, rgba(45, 160, 255, 0.8), transparent),
            radial-gradient(1px 1px at 15% 15%, #fff, transparent),
            radial-gradient(1px 1px at 85% 85%, #fff, transparent),
            radial-gradient(1px 1px at 35% 90%, #fff, transparent),
            radial-gradient(1px 1px at 65% 5%, #fff, transparent)
          `,
          backgroundSize: "250px 250px",
          animation: "twinkle 8s ease-in-out infinite alternate",
        }}
      />

      {/* Primary orb - Large blue glow */}
      <div
        ref={orb1Ref}
        className="absolute rounded-full"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: "900px",
          maxHeight: "900px",
          top: "5%",
          left: "-15%",
          background: "radial-gradient(circle at 30% 30%, rgba(45, 160, 255, 0.5) 0%, rgba(0, 102, 204, 0.3) 30%, rgba(0, 50, 100, 0.1) 60%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Secondary orb - Teal accent */}
      <div
        ref={orb2Ref}
        className="absolute rounded-full"
        style={{
          width: "55vw",
          height: "55vw",
          maxWidth: "700px",
          maxHeight: "700px",
          top: "45%",
          right: "-20%",
          background: "radial-gradient(circle at 70% 50%, rgba(0, 212, 255, 0.4) 0%, rgba(0, 128, 208, 0.25) 40%, rgba(0, 60, 120, 0.1) 60%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Tertiary orb - Deep blue */}
      <div
        ref={orb3Ref}
        className="absolute rounded-full"
        style={{
          width: "45vw",
          height: "45vw",
          maxWidth: "550px",
          maxHeight: "550px",
          bottom: "0%",
          left: "15%",
          background: "radial-gradient(circle at 50% 70%, rgba(0, 68, 170, 0.4) 0%, rgba(0, 24, 85, 0.3) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Earth-like globe effect at bottom */}
      <div
        className="absolute rounded-full"
        style={{
          width: "150vw",
          height: "150vw",
          maxWidth: "2000px",
          maxHeight: "2000px",
          bottom: "-130vw",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle at 50% 10%, rgba(0, 128, 208, 0.15) 0%, rgba(0, 60, 120, 0.1) 20%, rgba(0, 30, 60, 0.08) 40%, transparent 60%)",
          boxShadow: "0 0 200px 100px rgba(45, 160, 255, 0.1), inset 0 0 150px 50px rgba(0, 100, 180, 0.15)",
          filter: "blur(2px)",
        }}
      />

      {/* Atmospheric glow ring around globe */}
      <div
        className="absolute rounded-full"
        style={{
          width: "140vw",
          height: "20vh",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(to top, rgba(45, 160, 255, 0.15) 0%, rgba(45, 160, 255, 0.05) 50%, transparent 100%)",
          filter: "blur(30px)",
        }}
      />

      {/* Small accent orbs */}
      <div
        className="absolute rounded-full animate-pulse"
        style={{
          width: "20vw",
          height: "20vw",
          maxWidth: "250px",
          maxHeight: "250px",
          top: "55%",
          left: "55%",
          background: "radial-gradient(circle, rgba(77, 201, 255, 0.3) 0%, rgba(0, 102, 204, 0.15) 40%, transparent 60%)",
          filter: "blur(30px)",
          animationDuration: "6s",
        }}
      />

      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

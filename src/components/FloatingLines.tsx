"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface Line {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  thickness: number;
  color: string;
  opacity: number;
  curve: number;
}

interface FloatingLinesProps {
  lineCount?: number;
  colors?: string[];
  speed?: number;
  className?: string;
  opacity?: number;
}

export function FloatingLines({
  lineCount = 50,
  colors = ["#2da0ff", "#00d4ff", "#0066cc", "#4dc9ff", "#0080d0", "#1a8fff", "#66ccff", "#99ddff"],
  speed = 1,
  className = "",
  opacity = 0.6,
}: FloatingLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const linesRef = useRef<Line[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const createLine = useCallback(
    (width: number, height: number, fromEdge = false): Line => {
      const angle = Math.random() * Math.PI * 2;
      return {
        x: fromEdge ? (Math.random() < 0.5 ? -100 : width + 100) : Math.random() * width,
        y: fromEdge ? Math.random() * height : Math.random() * height,
        length: 100 + Math.random() * 300,
        angle: angle,
        speed: (0.3 + Math.random() * 0.8) * speed,
        thickness: 1.5 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: (0.3 + Math.random() * 0.5) * opacity,
        curve: (Math.random() - 0.5) * 0.015,
      };
    },
    [colors, speed, opacity]
  );

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    linesRef.current = Array.from({ length: lineCount }, () =>
      createLine(dimensions.width, dimensions.height)
    );
  }, [dimensions, lineCount, createLine]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      linesRef.current.forEach((line, index) => {
        // Update position
        line.x += Math.cos(line.angle) * line.speed;
        line.y += Math.sin(line.angle) * line.speed;
        line.angle += line.curve;

        // Reset if out of bounds
        if (
          line.x < -line.length - 50 ||
          line.x > dimensions.width + line.length + 50 ||
          line.y < -line.length - 50 ||
          line.y > dimensions.height + line.length + 50
        ) {
          linesRef.current[index] = createLine(dimensions.width, dimensions.height, true);
        }

        // Draw line with gradient
        const endX = line.x + Math.cos(line.angle) * line.length;
        const endY = line.y + Math.sin(line.angle) * line.length;

        const gradient = ctx.createLinearGradient(line.x, line.y, endX, endY);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.3, line.color);
        gradient.addColorStop(0.7, line.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);

        // Draw curved line using quadratic bezier
        const midX = (line.x + endX) / 2 + Math.sin(line.angle) * 30;
        const midY = (line.y + endY) / 2 + Math.cos(line.angle) * 30;
        ctx.quadraticCurveTo(midX, midY, endX, endY);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.thickness;
        ctx.lineCap = "round";
        ctx.globalAlpha = line.opacity;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, createLine]);

  if (dimensions.width === 0 || dimensions.height === 0) return null;

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  );
}

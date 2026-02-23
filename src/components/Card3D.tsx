"use client";

import { useTilt3D } from "@/hooks/useTilt3D";
import { motion, type HTMLMotionProps } from "framer-motion";

type Card3DProps = HTMLMotionProps<"div"> & {
  /** Max tilt in degrees */
  maxTilt?: number;
  /** Show glare overlay */
  glare?: boolean;
  /** Perspective in px */
  perspective?: number;
  children: React.ReactNode;
};

export function Card3D({
  maxTilt = 12,
  glare = true,
  perspective = 1000,
  children,
  className = "",
  ...rest
}: Card3DProps) {
  const { ref, style, glareStyle, glare: showGlare } = useTilt3D({
    maxTilt,
    perspective,
    glare: glare,
  });

  return (
    <motion.div
      ref={ref}
      className={`card-3d ${className}`}
      style={{
        ...style,
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
      {...rest}
    >
      <div className="card-3d-inner" style={{ transform: "translateZ(0)" }}>
        {children}
      </div>
      {showGlare && glare && (
        <div
          className="card-3d-glare"
          style={{
            opacity: glareStyle.opacity * 0.4,
            background: `radial-gradient(circle at ${glareStyle.x} ${glareStyle.y}, rgba(255,255,255,0.25), transparent 50%)`,
          }}
          aria-hidden
        />
      )}
    </motion.div>
  );
}

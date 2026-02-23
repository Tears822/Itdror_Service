"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code2, HeadphonesIcon, Zap, Shield } from "lucide-react";

const stats = [
  {
    icon: Code2,
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    delay: 0,
  },
  {
    icon: HeadphonesIcon,
    value: 1,
    suffix: " mo",
    label: "Free Support After Launch",
    delay: 0.1,
  },
  {
    icon: Zap,
    value: 24,
    suffix: "hr",
    label: "Same-Day Response",
    delay: 0.2,
  },
  {
    icon: Shield,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    delay: 0.3,
  },
];

function AnimatedNumber({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const step = value / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden bg-section-alt">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(45,160,255,0.08),transparent)]" />
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map(({ icon: Icon, value, suffix, label, delay }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay }}
              className="stat-card-outer h-full min-h-[240px] lg:min-h-[260px]"
            >
              <div className="stat-card-dot" aria-hidden />
              <div className="stat-card-inner relative">
                <div className="stat-card-ray" aria-hidden />
                <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/20">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="stat-card-value mt-2">
                  <AnimatedNumber value={value} suffix={suffix} inView={inView} />
                </div>
                <p className="text-sm text-muted font-medium mt-1 px-4 text-center">
                  {label}
                </p>
                <div className="stat-card-line stat-card-line--top" aria-hidden />
                <div className="stat-card-line stat-card-line--bottom" aria-hidden />
                <div className="stat-card-line stat-card-line--left" aria-hidden />
                <div className="stat-card-line stat-card-line--right" aria-hidden />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

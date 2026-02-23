"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, PenTool, Code2, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Consult",
    description: "We discuss your goals, timeline, and how development and support can work together.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    icon: PenTool,
    title: "Plan & Build",
    description: "We design and develop your application with modern stacks and keep you updated at every stage.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    icon: Code2,
    title: "Launch",
    description: "We deploy your solution and include 1 month of free application support to ensure a smooth start.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
  },
  {
    icon: HeadphonesIcon,
    title: "Support",
    description: "Our Application Support Specialist is your single point of contact for training, bugs, and updates.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
  },
];

export function HowWeWorkSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(45,160,255,0.04),transparent_50%)]" />
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 lg:mb-28"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-4 block">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            From Idea to{" "}
            <span className="gradient-text">Ongoing Support</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted">
            One team, one process: we build your applications and stay with you after launch.
          </p>
        </motion.div>

        {/* Journey timeline */}
        <div className="relative">
          {/* Central gradient line (visible on desktop) */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block -translate-x-px"
            aria-hidden
          >
            <div
              className="w-full h-full opacity-40"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--accent) 15%, var(--accent) 85%, transparent)",
              }}
            />
          </div>

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                } ${index < steps.length - 1 ? "lg:mb-24" : ""}`}
              >
                {/* Step node on the line */}
                <div className="absolute left-1/2 top-8 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 z-10 hidden lg:flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
                    className="w-14 h-14 rounded-full bg-background border-2 border-accent/60 flex items-center justify-center shadow-[0_0_24px_rgba(45,160,255,0.3)]"
                  >
                    <span className="text-accent font-bold text-lg">{index + 1}</span>
                  </motion.div>
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mt-3 border border-accent/30">
                    <step.icon className="w-6 h-6 text-accent" />
                  </div>
                </div>

                {/* Card – image side (DOM first; with flex-row-reverse it goes right) */}
                <div className="relative w-full lg:w-[calc(50%-3rem)]">
                  {/* Mobile: step badge above card */}
                  <div className="flex items-center gap-3 mb-4 lg:hidden">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 text-accent font-bold text-sm border border-accent/30">
                      {index + 1}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                      <step.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                      Step {index + 1}
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-xl"
                  >
                    <div className="aspect-[16/10] relative bg-white/5">
                      <Image
                        src={step.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                        <span className="text-2xl font-bold text-white drop-shadow-lg">
                          {step.title}
                        </span>
                        <span className="text-xs font-semibold text-accent/90 uppercase tracking-widest">
                          Step {index + 1}
                        </span>
                      </div>
                    </div>
                    {/* Accent corner glow */}
                    <div
                      className="absolute top-0 right-0 w-32 h-32 opacity-30 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 100% 0%, var(--accent), transparent 70%)",
                      }}
                    />
                  </motion.div>
                </div>

                {/* Card – content side (DOM second; with flex-row-reverse it goes left) */}
                <div className="w-full lg:w-[calc(50%-3rem)] flex flex-col justify-center">
                  <div
                    className={`rounded-2xl p-6 lg:p-8 border border-white/10 bg-white/[0.03] backdrop-blur-sm ${
                      index % 2 === 0 ? "lg:pr-12" : "lg:pl-12"
                    }`}
                  >
                    <p className="text-muted text-lg leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

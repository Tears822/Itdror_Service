"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SpaceButton } from "./SpaceButton";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack online store with real-time inventory, payments, and admin dashboard.",
    image: "/assets/services/Web_Development.webp",
    tags: ["Next.js", "React", "Stripe", "PostgreSQL"],
    href: "/services#software-development",
  },
  {
    title: "SaaS Dashboard",
    description: "Analytics and subscription management with role-based access and reporting.",
    image: "/assets/services/Cloud_service.webp",
    tags: ["React", "Node.js", "AWS", "MongoDB"],
    href: "/services#software-development",
  },
  {
    title: "Mobile Fitness App",
    description: "Cross-platform app for workouts, progress tracking, and social features.",
    image: "/assets/services/Mobile_Development.webp",
    tags: ["React Native", "Firebase", "iOS", "Android"],
    href: "/services#software-development",
  },
  {
    title: "AI Customer Assistant",
    description: "Chatbot with NLP and multi-language support for support and sales.",
    image: "/assets/services/AI_Solution.webp",
    tags: ["Python", "OpenAI", "FastAPI", "Docker"],
    href: "/services#software-development",
  },
];

function FeaturedWorkCard({
  project,
  delay,
}: {
  project: (typeof projects)[0];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="cursor-pointer group overflow-hidden p-4 sm:p-5 relative w-full min-h-[280px] sm:w-72 sm:min-h-[320px] bg-[#0a1628] rounded-xl transition-all duration-1000"
    >
      {/* Floating orbs – move on hover (project accent variants) */}
      <div
        className="absolute -top-12 -left-12 w-24 h-24 rounded-xl bg-transparent transition-all duration-1000 ease-in-out group-hover:-top-3"
        style={{ boxShadow: "inset 0 0 60px rgba(45, 160, 255, 0.4)" }}
        aria-hidden
      />
      <div
        className="absolute top-44 left-14 w-24 h-24 rounded-xl bg-transparent transition-all duration-1000 ease-in-out group-hover:top-60"
        style={{ boxShadow: "inset 0 0 60px rgba(0, 128, 208, 0.35)" }}
        aria-hidden
      />
      <div
        className="absolute top-24 left-56 w-24 h-24 rounded-xl bg-transparent transition-all duration-1000 ease-in-out group-hover:-left-12 max-sm:left-48"
        style={{ boxShadow: "inset 0 0 60px rgba(45, 160, 255, 0.3)" }}
        aria-hidden
      />
      <div
        className="absolute top-12 left-12 w-12 h-12 rounded-xl bg-transparent transition-all duration-1000 ease-in-out group-hover:-top-44"
        style={{ boxShadow: "inset 0 0 40px rgba(0, 128, 208, 0.4)" }}
        aria-hidden
      />
      <div
        className="absolute top-12 left-12 w-44 h-44 rounded-xl bg-transparent transition-all duration-1000 ease-in-out group-hover:left-44"
        style={{ boxShadow: "inset 0 0 80px rgba(45, 160, 255, 0.2)" }}
        aria-hidden
      />
      <div
        className="absolute -top-24 -left-12 w-64 h-64 rounded-xl bg-transparent transition-all duration-1000 ease-in-out group-hover:-left-2"
        style={{ boxShadow: "inset 0 0 90px rgba(45, 160, 255, 0.25)" }}
        aria-hidden
      />
      <div
        className="absolute top-24 left-12 w-4 h-4 rounded-xl bg-transparent transition-all duration-1000 ease-in-out group-hover:top-44"
        style={{ boxShadow: "inset 0 0 20px rgba(45, 160, 255, 0.6)" }}
        aria-hidden
      />

      <Link
        href={project.href}
        className="relative block w-full h-full min-h-[260px] sm:min-h-[300px] rounded-xl overflow-hidden shadow-xl flex flex-col"
        style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)" }}
      >
        <div className="relative flex-1 flex flex-col gap-3 p-4 sm:p-5 bg-white/5 rounded-xl border border-white/10 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 288px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-transparent" />
            <span className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-accent/90 flex items-center justify-center text-[#001322] opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <span className="text-foreground font-bold text-lg italic">
            {project.title}
          </span>
          <p className="text-muted text-sm leading-relaxed flex-1 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/10 text-muted border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedWorkSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(45,160,255,0.06),transparent)]" />
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-4 block">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Builds We&apos;re <span className="gradient-text">Proud Of</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted">
            A sample of the kinds of applications we build and support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 justify-items-center">
          {projects.map((project, i) => (
            <FeaturedWorkCard key={project.title} project={project} delay={i * 0.08} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <SpaceButton href="/services">View All Services</SpaceButton>
        </motion.div>
      </div>
    </section>
  );
}

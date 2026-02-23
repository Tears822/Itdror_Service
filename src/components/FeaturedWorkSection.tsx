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
    image: "/assets/featured/eCommerce.avif",
    tags: ["Next.js", "React", "Stripe"],
    href: "/services#software-development",
  },
  {
    title: "SaaS Dashboard",
    description: "Analytics and subscription management with role-based access and reporting.",
    image: "/assets/featured/sass_dashboard.png",
    tags: ["React", "Node.js", "AWS"],
    href: "/services#software-development",
  },
  {
    title: "Mobile Fitness App",
    description: "Cross-platform app for workouts, progress tracking, and social features.",
    image: "/assets/featured/fitness.png",
    tags: ["React Native", "Firebase", "iOS"],
    href: "/services#software-development",
  },
  {
    title: "AI Customer Assistant",
    description: "Chatbot with NLP and multi-language support for support and sales.",
    image: "/assets/featured/ai_customer_assistant.png",
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="w-full sm:w-72"
    >
      <Link
        href={project.href}
        className="group flex h-full flex-col min-h-[300px] rounded-2xl overflow-hidden bg-white border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_0_0_1px_rgba(20,184,166,0.12)] hover:border-teal-200/80 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative aspect-video overflow-hidden bg-section-alt">
          <Image
            src={project.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 288px"
          />
          <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <span className="text-foreground font-bold text-lg">
            {project.title}
          </span>
          <p className="text-muted text-sm leading-relaxed flex-1 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-800 border border-teal-100"
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
      {/* Smooth gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-section-alt to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(20,184,166,0.06),transparent_60%)]" aria-hidden />
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
}

// Portfolio items by service category
const portfolioItems: Record<string, PortfolioItem[]> = {
  "Web Development": [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution built with Next.js, featuring real-time inventory management, payment integration, and admin dashboard.",
      image: "/assets/services/Web_Development.webp",
      technologies: ["Next.js", "React", "TypeScript", "Stripe", "PostgreSQL"],
      category: "Web Development",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "2",
      title: "SaaS Dashboard",
      description: "Modern SaaS application with user authentication, subscription management, and analytics dashboard.",
      image: "/assets/services/Web_Development.webp",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      category: "Web Development",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "3",
      title: "Corporate Website",
      description: "High-performance corporate website with CMS integration, SEO optimization, and multilingual support.",
      image: "/assets/services/Web_Development.webp",
      technologies: ["Next.js", "Contentful", "Tailwind CSS", "Vercel"],
      category: "Web Development",
      liveUrl: "#",
    },
  ],
  "Mobile Development": [
    {
      id: "4",
      title: "Fitness Tracking App",
      description: "Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.",
      image: "/assets/services/Mobile_Development.webp",
      technologies: ["React Native", "Firebase", "Redux", "iOS", "Android"],
      category: "Mobile Development",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "5",
      title: "Food Delivery App",
      description: "Native mobile application for food ordering with real-time tracking, payment processing, and push notifications.",
      image: "/assets/services/Mobile_Development.webp",
      technologies: ["Flutter", "Dart", "Firebase", "Stripe", "Google Maps"],
      category: "Mobile Development",
      liveUrl: "#",
    },
  ],
  "UI/UX Design": [
    {
      id: "6",
      title: "Banking App Redesign",
      description: "Complete UI/UX redesign for a mobile banking application, improving user experience and conversion rates by 40%.",
      image: "/assets/services/Design.webp",
      technologies: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      category: "UI/UX Design",
    },
    {
      id: "7",
      title: "Healthcare Portal Design",
      description: "User-centered design for a patient portal with focus on accessibility and ease of use.",
      image: "/assets/services/Design.webp",
      technologies: ["Figma", "Design Systems", "Accessibility", "WCAG"],
      category: "UI/UX Design",
    },
  ],
  "AI Solutions": [
    {
      id: "8",
      title: "Chatbot Platform",
      description: "AI-powered customer service chatbot with natural language processing and multi-language support.",
      image: "/assets/services/AI_Solution.webp",
      technologies: ["Python", "OpenAI", "NLP", "FastAPI", "Docker"],
      category: "AI Solutions",
      liveUrl: "#",
    },
    {
      id: "9",
      title: "Predictive Analytics Dashboard",
      description: "Machine learning platform for business intelligence with predictive analytics and data visualization.",
      image: "/assets/services/AI_Solution.webp",
      technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "AWS"],
      category: "AI Solutions",
    },
  ],
  "Cloud Services": [
    {
      id: "10",
      title: "Microservices Architecture",
      description: "Scalable cloud infrastructure with microservices architecture, containerization, and CI/CD pipelines.",
      image: "/assets/services/Cloud_service.webp",
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "GitLab CI"],
      category: "Cloud Services",
    },
  ],
  "DevOps & CI/CD": [
    {
      id: "11",
      title: "CI/CD Pipeline Setup",
      description: "Automated deployment pipeline with testing, building, and deployment to multiple environments.",
      image: "/assets/services/Devops.webp",
      technologies: ["Jenkins", "Docker", "Kubernetes", "GitHub Actions", "AWS"],
      category: "DevOps & CI/CD",
    },
  ],
  "Digital Transformation": [
    {
      id: "12",
      title: "Legacy System Modernization",
      description: "Complete digital transformation of legacy systems to modern cloud-based architecture.",
      image: "/assets/services/Digital_Transfromation.jpg",
      technologies: ["Cloud Migration", "API Integration", "Microservices", "AWS"],
      category: "Digital Transformation",
    },
  ],
  "Support & Maintenance": [
    {
      id: "13",
      title: "24/7 Monitoring System",
      description: "Comprehensive monitoring and maintenance solution with automated alerts and performance optimization.",
      image: "/assets/services/Support_Maintanance.avif",
      technologies: ["Monitoring", "Automation", "Performance Tuning", "AWS"],
      category: "Support & Maintenance",
    },
  ],
};

export function PortfolioModal({ isOpen, onClose, service }: PortfolioModalProps) {
  const items = portfolioItems[service] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-6xl md:w-full md:max-h-[90vh] bg-background border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold">
                {service} Portfolio
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted mb-4 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs bg-primary/20 text-accent rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex items-center gap-3">
                          {item.liveUrl && (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </a>
                          )}
                          {item.githubUrl && (
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              Code
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted">Portfolio items coming soon for {service}</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

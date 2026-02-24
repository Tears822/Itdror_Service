"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeadphonesIcon, Code2, Palette, Cloud } from "lucide-react";
import { SpaceButton } from "./SpaceButton";
import { ServiceBookCard } from "./ServiceBookCard";
import { ServiceDetailModal } from "./ServiceDetailModal";
import type { ServiceDetail } from "./ServiceDetailModal";

const offeringDetails: ServiceDetail[] = [
  {
    icon: HeadphonesIcon,
    title: "Application Support",
    description:
      "Dedicated support for your applications: troubleshooting, user training, and clear communication between you and the dev team. We assign you an Application Support Specialist so you always have a single point of contact for bugs, questions, and updates.",
    features: [
      "Troubleshooting and resolving issues so your team and users aren't blocked.",
      "User training so your staff and customers get the most out of the software.",
      "Documentation and runbooks kept up to date so knowledge isn't lost.",
      "Bridge to development: clear communication so fixes and improvements are prioritized.",
    ],
    image: "/assets/service2/application_support.avif",
    category: "support",
    serviceId: "application-support",
    price: "From $2,500/month",
  },
  {
    icon: Code2,
    title: "Software Development",
    description:
      "Custom web, mobile, AI, and cloud solutions with modern stacks. We deliver scalable applications tailored to your product, with clear architecture and 1 month free application support after launch.",
    features: [
      "Web & mobile apps: React, Next.js, React Native, Flutter, and proven frameworks.",
      "Backend & APIs: Node.js, Python, and cloud-native services.",
      "AI & data: LLM integration, predictive analytics, and data pipelines when needed.",
      "SaaS, FinTech, HealthTech, eCommerce, and more by domain.",
    ],
    image: "/assets/service2/software_development.avif",
    category: "dev",
    serviceId: "software-development",
    price: "From $25,000 per project",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design, prototypes, and design systems for web and mobile. We help you validate flows, align with your brand, and hand off specs that developers can build from.",
    features: [
      "Discovery and user research to align design with real needs.",
      "Wireframes, prototypes, and high-fidelity UI for web and mobile.",
      "Design systems and component libraries for consistency and speed.",
      "Handoff and collaboration with development so nothing gets lost in translation.",
    ],
    image: "/assets/service2/ui_ux_design.avif",
    category: "dev",
    serviceId: "ui-ux-design",
    price: "From $12,000 per project",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Infrastructure, CI/CD, cloud-native solutions, and automation. We keep your applications deployable, observable, and maintainable so your team can ship with confidence.",
    features: [
      "AWS, Azure, GCP: provisioning, scaling, and cost-aware architecture.",
      "CI/CD pipelines, containers, and Kubernetes when the fit is right.",
      "Monitoring, alerting, and runbooks so issues are caught and resolved fast.",
      "IaC (e.g. Terraform) and documented environments for repeatability.",
    ],
    image: "/assets/service2/cloud_devops.avif",
    category: "dev",
    serviceId: "cloud-devops",
    price: "From $18,000 per project or $3,000/month",
  },
];

export function ServicesTeaser() {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<ServiceDetail | null>(null);

  const handleCardClick = (detail: ServiceDetail) => {
    setSelectedDetail(detail);
    setDetailModalOpen(true);
  };

  const handleContactClick = () => {
    setDetailModalOpen(false);
    requestAnimationFrame(() => {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <section id="services-teaser" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Smooth gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-section-alt via-background to-section-alt" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(20,184,166,0.06),transparent_60%)]" aria-hidden />
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-4 block">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Software Development &{" "}
            <span className="gradient-text">Application Support</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted">
            One team: we build your applications and support them after launch.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-6 lg:gap-8 items-center justify-items-center md:justify-items-stretch section-3d">
          {offeringDetails.map((detail, i) => (
            <React.Fragment key={detail.title}>
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: -12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                style={{ perspective: 1000 }}
              >
                <ServiceBookCard
                  title={detail.title}
                  description={detail.description}
                  icon={detail.icon}
                  coverImage={detail.image}
                  onClick={() => handleCardClick(detail)}
                />
              </motion.div>
              {i < offeringDetails.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="flex items-center justify-center py-4 md:py-0"
                  aria-hidden
                >
                  <span className="services-teaser-plus">+</span>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-center text-muted text-sm sm:text-base max-w-2xl mx-auto mt-10">
          We can handle other development needs custom projects, integrations, or domains beyond what’s listed. Get in touch to discuss your project.
        </p>
        <div className="text-center mt-14">
          <SpaceButton href="/services">View All Services</SpaceButton>
        </div>
      </div>

      <ServiceDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        service={selectedDetail}
        onContactClick={handleContactClick}
      />
    </section>
  );
}

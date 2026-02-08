"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Network,
  Shield,
  Cloud,
  Wrench,
  Server,
  HeadphonesIcon,
  Trash2,
  Users,
  ArrowRight,
  Globe,
  Smartphone,
  Palette,
  Bot,
  GitBranch,
  Zap,
  Settings,
  LucideIcon,
} from "lucide-react";
import { PortfolioModal } from "./PortfolioModal";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image: string;
  category?: "it" | "dev";
}

// IT Consulting Services
const itServices: Service[] = [
  {
    icon: Network,
    title: "Network Setup",
    description: "Reliable network infrastructure setup and maintenance that keeps your team connected and productive.",
    features: ["WiFi Optimization", "Router Config", "VPN Solutions"],
    image: "/assets/services/Network_Setup.webp",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Protect your business from cyber threats with enterprise-grade security solutions.",
    features: ["Firewall Setup", "Malware Protection", "Security Audits"],
    image: "/assets/services/Cybersecurity.webp",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Seamless cloud migration to Microsoft 365, Google Workspace, or AWS.",
    features: ["Microsoft 365", "Google Workspace", "AWS Migration"],
    image: "/assets/services/Cloud_Solution.jpg",
  },
  {
    icon: Wrench,
    title: "Device Repair",
    description: "Professional repair services for computers, laptops, and mobile devices.",
    features: ["Computer Repair", "Laptop Service", "Mobile Fix"],
    image: "/assets/services/Device_Repair.jpg",
  },
  {
    icon: Server,
    title: "Server Management",
    description: "Keep your servers running smoothly with proactive monitoring and maintenance.",
    features: ["Monitoring", "Backup Solutions", "Disaster Recovery"],
    image: "/assets/services/Service_Management.jpg",
  },
  {
    icon: HeadphonesIcon,
    title: "IT Help Desk",
    description: "Responsive technical support when you need it most. Remote and on-site services.",
    features: ["Remote Support", "On-site Service", "24/7 Available"],
    image: "/assets/services/IT_Help_Desk.jpg",
  },
  {
    icon: Trash2,
    title: "Data Destruction",
    description: "Certified data destruction and secure technology recycling through our partner.",
    features: ["Certified Destruction", "Secure Recycling", "Compliance"],
    image: "/assets/services/Data_Destruction.webp",
  },
  {
    icon: Users,
    title: "Technology Consulting",
    description: "Expert guidance on technology trends, stack recommendations, and vendor negotiations.",
    features: ["Vendor Negotiation", "Tech Advice", "Market Analysis"],
    image: "/assets/services/Technology_Consulting.avif",
  },
];

// Development Services
const devServices: Service[] = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks like React and Next.js.",
    features: ["React & Next.js", "Full-Stack Apps", "E-Commerce"],
    image: "/assets/services/Web_Development.webp",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: ["iOS & Android", "React Native", "Flutter"],
    image: "/assets/services/Mobile_Development.webp",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design services that enhance satisfaction and drive engagement.",
    features: ["User Research", "Prototyping", "Design Systems"],
    image: "/assets/services/Design.webp",
  },
  {
    icon: Bot,
    title: "AI Solutions",
    description: "AI and machine learning solutions that automate processes and provide insights.",
    features: ["Machine Learning", "NLP & Chatbots", "Data Analytics"],
    image: "/assets/services/AI_Solution.webp",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Scalable cloud infrastructure and architecture design for your business.",
    features: ["AWS & Azure", "Serverless", "Microservices"],
    image: "/assets/services/Cloud_service.webp",
  },
  {
    icon: GitBranch,
    title: "DevOps & CI/CD",
    description: "Streamlined development workflows with automated testing and deployment.",
    features: ["Docker & K8s", "CI/CD Pipelines", "Monitoring"],
    image: "/assets/services/Devops.webp",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "Comprehensive digital transformation services that modernize your business.",
    features: ["Process Automation", "Legacy Modernization", "Integration"],
    image: "/assets/services/Digital_Transfromation.jpg",
  },
  {
    icon: Settings,
    title: "Support & Maintenance",
    description: "Ongoing support and maintenance to ensure your systems run smoothly.",
    features: ["24/7 Monitoring", "Bug Fixes", "Performance Tuning"],
    image: "/assets/services/Support_Maintanance.avif",
  },
];

function ServiceCard({ service, onLearnMore }: { service: Service; onLearnMore?: (service: string) => void }) {
  const IconComponent = service.icon;
  
  const handleLearnMore = () => {
    if (onLearnMore && service.category === "dev") {
      onLearnMore(service.title);
    }
  };
  
  return (
    <div className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/30 transition-all duration-300 overflow-hidden hover:-translate-y-2">
      {/* Service Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        {/* Icon overlay */}
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-primary/30 backdrop-blur-sm flex items-center justify-center border border-accent/20">
          <IconComponent className="w-6 h-6 text-accent" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
          {service.title}
        </h3>
        <p className="text-sm text-muted mb-4 leading-relaxed line-clamp-2">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-1.5 mb-4">
          {service.features.map((feature) => (
            <li key={feature} className="text-xs text-muted flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Arrow */}
        <button
          onClick={handleLearnMore}
          className="flex items-center gap-2 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity w-full"
        >
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function Services() {
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleLearnMore = (service: string) => {
    setSelectedService(service);
    setPortfolioModalOpen(true);
  };

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* IT Consulting Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
            IT Consulting
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            IT Solutions for{" "}
            <span className="gradient-text">Business Success</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted">
            Professional IT support, network setup, cybersecurity, and cloud solutions
            serving Boston, MA, New Hampshire & Rhode Island.
          </p>
        </div>

        {/* IT Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {itServices.map((service) => (
            <ServiceCard key={service.title} service={{ ...service, category: "it" }} />
          ))}
        </div>

        {/* Development Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
            Development Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Custom Software{" "}
            <span className="gradient-text">Development</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted">
            From web and mobile applications to AI solutions and cloud infrastructure,
            we build technology that drives your business forward.
          </p>
        </div>

        {/* Development Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {devServices.map((service) => (
            <ServiceCard key={service.title} service={{ ...service, category: "dev" }} onLearnMore={handleLearnMore} />
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            { title: "Fast Response Time", desc: "Same-day response for urgent issues" },
            { title: "Affordable Rates", desc: "Competitive pricing for quality service" },
            { title: "No Long-Term Contracts", desc: "Flexible engagement on your terms" },
          ].map((benefit) => (
            <div
              key={benefit.title}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-white/5"
            >
              <h4 className="text-lg font-semibold mb-2 text-accent">{benefit.title}</h4>
              <p className="text-sm text-muted">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all btn-glow"
          >
            Get Your Free IT Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Portfolio Modal */}
      <PortfolioModal
        isOpen={portfolioModalOpen}
        onClose={() => setPortfolioModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
}

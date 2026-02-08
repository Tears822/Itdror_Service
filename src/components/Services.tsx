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
import { ServiceDetailModal } from "./ServiceDetailModal";

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
    features: [
      "WiFi site surveys and optimization",
      "Router and switch configuration",
      "VPN setup and remote access",
      "Network cabling and structured wiring",
      "VLAN and subnet design",
      "Wireless access point deployment",
      "Network performance monitoring",
      "Bandwidth management",
      "Guest network isolation",
      "Mesh and extender solutions",
    ],
    image: "/assets/services/Network_Setup.webp",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Protect your business from cyber threats with enterprise-grade security solutions.",
    features: [
      "Firewall installation and configuration",
      "Malware and antivirus protection",
      "Security audits and vulnerability scans",
      "Endpoint detection and response (EDR)",
      "Email security and phishing prevention",
      "Multi-factor authentication (MFA)",
      "Security policy and compliance review",
      "Incident response planning",
      "Patch management",
      "Encryption and data protection",
    ],
    image: "/assets/services/Cybersecurity.webp",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Seamless cloud migration to Microsoft 365, Google Workspace, or AWS.",
    features: [
      "Microsoft 365 setup and migration",
      "Google Workspace deployment",
      "AWS and Azure migration",
      "OneDrive and SharePoint configuration",
      "Teams and collaboration setup",
      "Cloud backup and sync",
      "Identity and access management",
      "Cost optimization and governance",
      "Hybrid cloud architecture",
      "Cloud security best practices",
    ],
    image: "/assets/services/Cloud_Solution.jpg",
  },
  {
    icon: Wrench,
    title: "Device Repair",
    description: "Professional repair services for computers, laptops, and mobile devices.",
    features: [
      "Desktop and laptop repair",
      "Screen replacement",
      "Battery and power issues",
      "Hard drive and SSD upgrade",
      "Virus and malware removal",
      "Mobile device repair",
      "Data recovery",
      "Operating system reinstall",
      "Hardware diagnostics",
      "Preventive cleaning and maintenance",
    ],
    image: "/assets/services/Device_Repair.jpg",
  },
  {
    icon: Server,
    title: "Server Management",
    description: "Keep your servers running smoothly with proactive monitoring and maintenance.",
    features: [
      "Server monitoring and alerting",
      "Backup and disaster recovery",
      "Windows and Linux server admin",
      "Virtualization (Hyper-V, VMware)",
      "Storage and RAID management",
      "Patch and update management",
      "Performance tuning",
      "Log management",
      "High availability and clustering",
      "Capacity planning",
    ],
    image: "/assets/services/Service_Management.jpg",
  },
  {
    icon: HeadphonesIcon,
    title: "IT Help Desk",
    description: "Responsive technical support when you need it most. Remote and on-site services.",
    features: [
      "Remote support and screen sharing",
      "On-site technician dispatch",
      "24/7 availability options",
      "User account and password reset",
      "Printer and peripheral setup",
      "Software installation and updates",
      "Troubleshooting and ticket tracking",
      "Knowledge base and documentation",
      "Training and onboarding support",
      "SLA-based response times",
    ],
    image: "/assets/services/IT_Help_Desk.jpg",
  },
  {
    icon: Trash2,
    title: "Data Destruction",
    description: "Certified data destruction and secure technology recycling through our partner.",
    features: [
      "Certified hard drive destruction",
      "Secure e-waste recycling",
      "Compliance documentation (e.g. NAID)",
      "On-site and off-site options",
      "Degaussing and physical destruction",
      "Certificate of destruction",
      "SSD and mobile device wiping",
      "Asset tracking and chain of custody",
      "Environmentally responsible disposal",
      "Audit-ready reporting",
    ],
    image: "/assets/services/Data_Destruction.webp",
  },
  {
    icon: Users,
    title: "Technology Consulting",
    description: "Expert guidance on technology trends, stack recommendations, and vendor negotiations.",
    features: [
      "Vendor evaluation and negotiation",
      "Technology roadmap planning",
      "IT budget and TCO analysis",
      "Software and hardware selection",
      "Digital strategy advisory",
      "RFP and procurement support",
      "Market and trend analysis",
      "Integration and architecture advice",
      "Staff training recommendations",
      "Compliance and risk assessment",
    ],
    image: "/assets/services/Technology_Consulting.avif",
  },
];

// Development Services
const devServices: Service[] = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks like React and Next.js.",
    features: [
      "React and Next.js applications",
      "Full-stack web apps (Node, Python, .NET)",
      "E-commerce and payment integration",
      "Progressive Web Apps (PWA)",
      "REST and GraphQL APIs",
      "Headless CMS integration",
      "SEO and performance optimization",
      "Responsive and accessible design",
      "Admin dashboards and portals",
      "Third-party API integration",
    ],
    image: "/assets/services/Web_Development.webp",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: [
      "iOS (Swift) and Android (Kotlin) native apps",
      "React Native cross-platform apps",
      "Flutter development",
      "Push notifications and in-app messaging",
      "Offline and sync capabilities",
      "App store submission support",
      "Backend and API integration",
      "Biometrics and security",
      "Analytics and crash reporting",
      "UI/UX for mobile",
    ],
    image: "/assets/services/Mobile_Development.webp",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design services that enhance satisfaction and drive engagement.",
    features: [
      "User research and interviews",
      "Wireframing and prototyping",
      "Design systems and component libraries",
      "Figma and Adobe XD deliverables",
      "Usability testing",
      "Accessibility (WCAG) compliance",
      "Information architecture",
      "Visual design and branding",
      "Interaction design",
      "Design handoff to development",
    ],
    image: "/assets/services/Design.webp",
  },
  {
    icon: Bot,
    title: "AI Solutions",
    description: "AI and machine learning solutions that automate processes and provide insights.",
    features: [
      "Machine learning model development",
      "NLP and chatbot development",
      "Computer vision and image recognition",
      "Predictive analytics",
      "OpenAI and LLM integration",
      "Custom AI pipelines",
      "Data preprocessing and feature engineering",
      "Model deployment and APIs",
      "Recommendation systems",
      "Process automation with AI",
    ],
    image: "/assets/services/AI_Solution.webp",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Scalable cloud infrastructure and architecture design for your business.",
    features: [
      "AWS and Azure architecture",
      "Serverless (Lambda, Functions)",
      "Microservices design",
      "Container orchestration (ECS, AKS)",
      "Database and storage setup",
      "CDN and edge delivery",
      "Cost and resource optimization",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Disaster recovery and backup",
      "Security and compliance in cloud",
    ],
    image: "/assets/services/Cloud_service.webp",
  },
  {
    icon: GitBranch,
    title: "DevOps & CI/CD",
    description: "Streamlined development workflows with automated testing and deployment.",
    features: [
      "Docker and Kubernetes setup",
      "CI/CD pipelines (GitHub Actions, GitLab, Jenkins)",
      "Monitoring and alerting (Prometheus, Grafana)",
      "Log aggregation and analysis",
      "Infrastructure automation",
      "Blue-green and canary deployments",
      "Secrets and config management",
      "Test automation in pipeline",
      "Environment management (dev/staging/prod)",
      "Performance and reliability tuning",
    ],
    image: "/assets/services/Devops.webp",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "Comprehensive digital transformation services that modernize your business.",
    features: [
      "Process automation (RPA, workflows)",
      "Legacy system modernization",
      "API and system integration",
      "Data migration and consolidation",
      "Workflow and BPM design",
      "Change management support",
      "Digital strategy and roadmap",
      "Platform and ecosystem integration",
      "Agile and DevOps adoption",
      "Training and documentation",
    ],
    image: "/assets/services/Digital_Transfromation.jpg",
  },
  {
    icon: Settings,
    title: "Support & Maintenance",
    description: "Ongoing support and maintenance to ensure your systems run smoothly.",
    features: [
      "24/7 monitoring and alerting",
      "Bug fixes and hotfixes",
      "Performance tuning",
      "Security updates and patching",
      "Database maintenance",
      "Backup verification",
      "SLA-based support tiers",
      "Incident and change management",
      "Documentation updates",
      "Version upgrades and migration support",
    ],
    image: "/assets/services/Support_Maintanance.avif",
  },
];

function ServiceCard({ service, onLearnMore }: { service: Service; onLearnMore?: (service: Service) => void }) {
  const IconComponent = service.icon;

  const handleLearnMore = () => {
    onLearnMore?.(service);
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

        {/* Features (show first 4 on card; full list in detail modal) */}
        <ul className="space-y-1.5 mb-4">
          {service.features.slice(0, 4).map((feature) => (
            <li key={feature} className="text-xs text-muted flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Learn more */}
        <button
          onClick={handleLearnMore}
          className="flex items-center gap-2 text-sm text-accent hover:text-accent/90 opacity-80 group-hover:opacity-100 transition-opacity w-full"
        >
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function Services() {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setDetailModalOpen(true);
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
            delivered remotely to clients worldwide.
          </p>
        </div>

        {/* IT Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {itServices.map((service) => (
            <ServiceCard key={service.title} service={{ ...service, category: "it" }} onLearnMore={handleLearnMore} />
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
            From web and mobile applications to AI solutions and cloud infrastructure—
            delivered remotely to clients worldwide. We build technology that drives your business forward.
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
            { title: "Long-Term Contracts Preferred", desc: "Partnership-focused engagement for lasting value" },
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

      {/* Service detail modal */}
      <ServiceDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        service={selectedService}
      />
    </section>
  );
}

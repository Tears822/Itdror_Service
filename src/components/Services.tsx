"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  HeadphonesIcon,
  ArrowRight,
  Globe,
  Smartphone,
  Palette,
  Bot,
  Code2,
  Zap,
  Settings,
  CreditCard,
  ShoppingCart,
  UtensilsCrossed,
  Store,
  MessageCircle,
  Tv,
  Heart,
  Stethoscope,
  GraduationCap,
  Home,
  Scale,
  Plane,
  Building,
  Shield,
  Cloud,
  Sparkles,
  Link2,
  Wifi,
  Building2,
  Car,
  Barcode,
  Users,
  Leaf,
  Filter,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ServiceDetailModal } from "./ServiceDetailModal";
import type { ServiceDetail } from "./ServiceDetailModal";
import { CosmicSearchInput } from "./CosmicSearchInput";
import { ServiceBookCard } from "./ServiceBookCard";
import { CyberBenefitCard } from "./CyberBenefitCard";
import {
  serviceCategories,
  serviceList,
  type ServiceCategoryId,
  type ServiceItem,
} from "@/data/services";

const iconMap: Record<ServiceItem["iconKey"], LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  palette: Palette,
  bot: Bot,
  code2: Code2,
  zap: Zap,
  settings: Settings,
  headphones: HeadphonesIcon,
  "credit-card": CreditCard,
  "shopping-cart": ShoppingCart,
  utensils: UtensilsCrossed,
  store: Store,
  "message-circle": MessageCircle,
  tv: Tv,
  heart: Heart,
  stethoscope: Stethoscope,
  "graduation-cap": GraduationCap,
  home: Home,
  scale: Scale,
  plane: Plane,
  building: Building,
  shield: Shield,
  cloud: Cloud,
  sparkles: Sparkles,
  link: Link2,
  wifi: Wifi,
  "building-2": Building2,
  car: Car,
  barcode: Barcode,
  users: Users,
  leaf: Leaf,
};

function toDetail(item: ServiceItem): ServiceDetail {
  return {
    icon: iconMap[item.iconKey],
    title: item.title,
    description: item.description,
    features: item.features,
    image: item.image,
    category: "dev",
    serviceId: item.id,
  };
}

const applicationSupportService: ServiceDetail = {
  icon: HeadphonesIcon,
  title: "Application Support Specialist",
  description:
    "An IT professional who manages, maintains, and troubleshoots your business software and applications to ensure optimal performance. We bridge the gap between technical teams and end-users—so when you have issues after launch, you get clear communication and fast resolution.",
  features: [
    "Troubleshooting: Diagnosing and resolving software, application, and system issues as your technical subject matter expert.",
    "Maintenance & Upgrades: Installing, configuring, and updating applications; managing enhancements and database integrity.",
    "User Support & Training: Assisting end-users with application usage, troubleshooting, and training to improve efficiency.",
    "Documentation: Recording issues, documenting resolutions, and updating technical documentation for troubleshooting.",
    "Collaboration: Working with developers and vendors to resolve bugs and implement fixes—so you get one team, not silos.",
  ],
  image: "/assets/service2/application_support.avif",
  category: "support",
  serviceId: "application-support",
};

const softwareDevelopmentService: ServiceDetail = {
  icon: Code2,
  title: "Software Development",
  description:
    "Custom web, mobile, AI, and cloud solutions built with modern stacks. We deliver scalable applications tailored to your product, with clear architecture and 1 month free application support after launch.",
  serviceId: "software-development",
  features: [
    "Web & mobile apps: React, Next.js, React Native, Flutter, and proven frameworks.",
    "Backend & APIs: Node.js, Python, and cloud-native services (AWS, Vercel, etc.).",
    "AI & data: LLM integration, predictive analytics, and data pipelines when needed.",
    "Filter by domain below for SaaS, FinTech, HealthTech, eCommerce, and more.",
  ],
  image: "/assets/service2/software_development.avif",
  category: "dev",
};

const CheckIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path clipRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" fillRule="evenodd" />
  </svg>
);

function ServiceCard({
  service,
  onLearnMore,
}: {
  service: ServiceItem;
  onLearnMore: (item: ServiceItem) => void;
}) {
  return (
    <div
      className="detail-service-card"
      role="button"
      tabIndex={0}
      onClick={() => onLearnMore(service)}
      onKeyDown={(e) => e.key === "Enter" && onLearnMore(service)}
    >
      <div className="detail-service-card__border" aria-hidden />
      <div className="detail-service-card__inner">
        <div className="detail-service-card__image">
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="detail-service-card__img"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <span className="detail-service-card__image-overlay" aria-hidden />
        </div>
        <div className="detail-service-card__title-container">
          <span className="detail-service-card__title">{service.title}</span>
          <p className="detail-service-card__paragraph">{service.description}</p>
        </div>
        <hr className="detail-service-card__line" />
        <ul className="detail-service-card__list">
          {service.features.slice(0, 5).map((feature) => (
            <li key={feature} className="detail-service-card__list-item">
              <span className="detail-service-card__check">
                <CheckIcon />
              </span>
              <span className="detail-service-card__list-text">{feature}</span>
            </li>
          ))}
        </ul>
        <button type="button" className="detail-service-card__button">
          Learn more
        </button>
      </div>
    </div>
  );
}

export function Services() {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<ServiceDetail | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ServiceCategoryId | "">("");

  const handleLearnMore = (item: ServiceItem) => {
    setSelectedDetail(toDetail(item));
    setDetailModalOpen(true);
  };

  const handleLearnMoreSupport = () => {
    setSelectedDetail(applicationSupportService);
    setDetailModalOpen(true);
  };

  const handleLearnMoreSoftwareDev = () => {
    setSelectedDetail(softwareDevelopmentService);
    setDetailModalOpen(true);
  };

  const filteredServices = useMemo(() => {
    const q = search.trim().toLowerCase();
    const byCategory =
      categoryFilter === ""
        ? serviceList.filter((s) => s.categoryId !== "support")
        : serviceList.filter((s) => s.categoryId === categoryFilter);
    if (!q) return byCategory;
    return byCategory.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.features.some((f) => f.toLowerCase().includes(q))
    );
  }, [search, categoryFilter]);

  const activeCategoryLabel =
    categoryFilter === ""
      ? "All services"
      : serviceCategories.find((c) => c.id === categoryFilter)?.label ?? "All services";

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" aria-hidden />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Software Development &{" "}
            <span className="gradient-text">Application Support</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted">
            We build your applications and support them after launch. One team:
            development expertise plus dedicated application support so you get
            clear communication and fast resolution when issues arise.
          </p>
        </div>

        {/* Application Support + Software Development — book-style cards with "+" */}
        <div id="application-support" className="mb-20 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-10 items-center justify-items-center md:justify-items-stretch max-w-5xl mx-auto">
            <ServiceBookCard
              title="Application Support Specialist"
              description="We manage, maintain, and troubleshoot your business software—clear communication and fast resolution when issues arise."
              icon={HeadphonesIcon}
              coverImage="/assets/service2/application_support.avif"
              onClick={handleLearnMoreSupport}
            />
            <div className="flex items-center justify-center py-4 md:py-0" aria-hidden>
              <span className="services-teaser-plus">+</span>
            </div>
            <ServiceBookCard
              title="Software Development"
              description="Custom web, mobile, AI, and cloud solutions with modern stacks. Filter by domain below."
              icon={Code2}
              coverImage="/assets/service2/software_development.avif"
              onClick={handleLearnMoreSoftwareDev}
            />
          </div>
        </div>

        {/* Software Development — filter + grid */}
        <div id="software-development" className="scroll-mt-24">
          <h3 className="text-xl font-semibold text-accent mb-4">
            Software Development by Domain
          </h3>
          <p className="max-w-2xl text-muted text-sm mb-2">
            Custom web, mobile, AI, and cloud solutions—with modern stacks and
            proven delivery. Filter by category or search below.
          </p>
          <p className="max-w-2xl text-foreground/90 font-medium text-sm mb-8">
            Software development projects start from $3K. Every project is case by case—get in touch for a detailed quote.
          </p>

          {/* Search + Category filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 min-w-0">
              <CosmicSearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search services..."
                aria-label="Search services"
              />
            </div>
            <div className="cosmic-select-wrapper sm:w-64 sm:min-w-[200px]">
              <Filter className="cosmic-select__icon" aria-hidden />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as ServiceCategoryId | "")}
                className="cosmic-select__input"
                aria-label="Filter by category"
              >
                <option value="">All categories</option>
                {serviceCategories
                  .filter((c) => c.id !== "support")
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
              </select>
              <span className="cosmic-select__chevron" aria-hidden>▼</span>
            </div>
          </div>

          {filteredServices.length === 0 ? (
            <p className="text-muted text-center py-12">
              No services match your search. Try a different term or category.
            </p>
          ) : (
            <>
              <p className="text-sm text-muted mb-4">
                {activeCategoryLabel}
                {search && ` · “${search}”`} — {filteredServices.length} service
                {filteredServices.length !== 1 ? "s" : ""}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onLearnMore={handleLearnMore}
                  />
                ))}
              </div>
              <p className="text-center text-muted text-sm sm:text-base max-w-2xl mx-auto mb-16">
                We can handle other development needs custom projects, integrations, or domains not listed above. Get in touch to discuss your project.
              </p>
            </>
          )}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Integrated team",
              desc: "Development and application support in one place—no silos.",
            },
            {
              title: "Support after launch",
              desc: "1 month free support after launch; ongoing support available.",
            },
            {
              title: "Fast response",
              desc: "Same-day response for urgent issues and clear client–dev communication.",
            },
          ].map((benefit) => (
            <CyberBenefitCard
              key={benefit.title}
              title={benefit.title}
              desc={benefit.desc}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all btn-glow"
          >
            Get Your Free Consultation
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      <ServiceDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        service={selectedDetail}
      />
    </section>
  );
}

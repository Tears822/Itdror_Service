export type ServiceCategoryId =
  | "core-business"
  | "consumer-social"
  | "industry"
  | "enterprise"
  | "emerging"
  | "smart-connected"
  | "mobility"
  | "retail"
  | "hrtech"
  | "climate"
  | "support";

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
  description?: string;
}

export interface ServiceItem {
  id: string;
  categoryId: ServiceCategoryId;
  title: string;
  description: string;
  features: string[];
  image: string;
  iconKey: "globe" | "smartphone" | "palette" | "bot" | "code2" | "zap" | "settings" | "headphones" | "credit-card" | "shopping-cart" | "utensils" | "store" | "message-circle" | "tv" | "heart" | "stethoscope" | "graduation-cap" | "home" | "scale" | "plane" | "building" | "shield" | "cloud" | "sparkles" | "link" | "wifi" | "building-2" | "car" | "barcode" | "users" | "leaf";
}

export const serviceCategories: ServiceCategory[] = [
  { id: "core-business", label: "Core Business & Consumer Platforms" },
  { id: "consumer-social", label: "Consumer & Social Platforms" },
  { id: "industry", label: "Industry-Specific Solutions" },
  { id: "enterprise", label: "Enterprise & Infrastructure" },
  { id: "emerging", label: "Emerging & High-Growth" },
  { id: "smart-connected", label: "Smart & Connected Systems" },
  { id: "mobility", label: "Mobility & Transportation" },
  { id: "retail", label: "Retail & POS" },
  { id: "hrtech", label: "HR & Workforce" },
  { id: "climate", label: "Climate & Sustainability" },
  { id: "support", label: "Application Support" },
];

const IMG = {
  web: "/assets/services/Web_Development.webp",
  mobile: "/assets/services/Mobile_Development.webp",
  design: "/assets/services/Design.webp",
  ai: "/assets/services/AI_Solution.webp",
  cloud: "/assets/services/Cloud_service.webp",
  digital: "/assets/services/Digital_Transfromation.jpg",
  support: "/assets/services/Support_Maintanance.avif",
};

/** Service images from /assets/service2/ – used for service cards when available */
const SERVICE2 = "/assets/service2";
const service2Images: Partial<Record<string, string>> = {
  saas: `${SERVICE2}/sass.avif`,
  fintech: `${SERVICE2}/fintech.avif`,
  ecommerce: `${SERVICE2}/eCommerce.jpg`,
  "food-delivery": `${SERVICE2}/food_delivery.jpg`,
  marketplace: `${SERVICE2}/marketplace.jpg`,
  social: `${SERVICE2}/social_network.jpg`,
  streaming: `${SERVICE2}/streaming_media.jpg`,
  dating: `${SERVICE2}/dating_community.jpg`,
  healthtech: `${SERVICE2}/healthtech.avif`,
  edtech: `${SERVICE2}/software_development.avif`,
  proptech: `${SERVICE2}/proptteh_realestate.jpg`,
  legaltech: `${SERVICE2}/legal_tech.jpg`,
  travel: `${SERVICE2}/travel_hospitality.avif`,
  erp: `${SERVICE2}/erp_enterprise Systems.jpg`,
  "cloud-devops": `${SERVICE2}/cloud_devops.avif`,
  "ai-ml": `${SERVICE2}/ai_machine_learning.jpg`,
  blockchain: `${SERVICE2}/blockchain.jpg`,
  "pwa-api": `${SERVICE2}/pwa_api.jpg`,
  iot: `${SERVICE2}/smart_city.jpg`,
  "smart-city": `${SERVICE2}/smart_city.jpg`,
  mobility: `${SERVICE2}/mobile_ride.jpg`,
  retailtech: `${SERVICE2}/retailtech_pos.jpg`,
  hrtech: `${SERVICE2}/hr_tech.jpg`,
  climatetech: `${SERVICE2}/climate_sustainability.jpg`,
};

function serviceImage(id: string, fallback: string): string {
  return service2Images[id] ?? fallback;
}

export const serviceList: ServiceItem[] = [
  // Core Business & Consumer
  { id: "saas", categoryId: "core-business", title: "SaaS (Software as a Service)", description: "Subscription-based web apps: CRM, project management, and business tools.", features: ["Multi-tenant architecture", "Subscription & billing (Stripe, etc.)", "Role-based access", "Analytics dashboards", "API-first design"], image: serviceImage("saas", IMG.web), iconKey: "globe" },
  { id: "fintech", categoryId: "core-business", title: "Finance", description: "Payments, digital banking, crypto, lending, and trading platforms.", features: ["Payment gateways & PSP integration", "KYC/AML flows", "Real-time transactions", "Compliance & reporting", "Secure data handling"], image: serviceImage("fintech", IMG.web), iconKey: "credit-card" },
  { id: "ecommerce", categoryId: "core-business", title: "eCommerce", description: "Online stores, marketplaces, checkout, and logistics systems.", features: ["Storefronts & marketplaces", "Checkout & payments", "Inventory & orders", "Shipping & logistics", "Admin & reporting"], image: serviceImage("ecommerce", IMG.web), iconKey: "shopping-cart" },
  { id: "food-delivery", categoryId: "core-business", title: "Food Delivery & Logistics", description: "Ordering, routing, driver management, and real-time tracking.", features: ["Order & menu management", "Driver app & dispatch", "Real-time tracking", "Payments & payouts", "Restaurant dashboards"], image: serviceImage("food-delivery", IMG.mobile), iconKey: "utensils" },
  { id: "marketplace", categoryId: "core-business", title: "Marketplace Platforms", description: "Multi-vendor ecosystems (e.g. Airbnb, Fiverr-style).", features: ["Vendor onboarding & profiles", "Search & discovery", "Bookings & payments", "Reviews & trust", "Commission & payouts"], image: serviceImage("marketplace", IMG.web), iconKey: "store" },
  // Consumer & Social
  { id: "social", categoryId: "consumer-social", title: "Social Networking", description: "Messaging, feeds, and real-time interactions.", features: ["Feeds & timelines", "Real-time chat", "Notifications", "Moderation tools", "Content discovery"], image: serviceImage("social", IMG.mobile), iconKey: "message-circle" },
  { id: "streaming", categoryId: "consumer-social", title: "Streaming & Media", description: "Video/audio delivery and live streaming.", features: ["Live & VOD streaming", "CDN & transcoding", "Player & DRM", "Analytics", "Monetization"], image: serviceImage("streaming", IMG.web), iconKey: "tv" },
  { id: "dating", categoryId: "consumer-social", title: "Dating & Community Apps", description: "Matching algorithms, chat, and moderation.", features: ["Matching algorithms", "Chat & video", "Safety & moderation", "Discovery & filters", "Subscriptions"], image: serviceImage("dating", IMG.mobile), iconKey: "heart" },
  // Industry-Specific
  { id: "healthtech", categoryId: "industry", title: "Health", description: "Telemedicine, patient portals, and medical data systems.", features: ["Telemedicine & video visits", "Patient portals", "HIPAA-compliant data", "EHR integration", "Scheduling & reminders"], image: serviceImage("healthtech", IMG.web), iconKey: "stethoscope" },
  { id: "edtech", categoryId: "industry", title: "Education", description: "Learning platforms, course systems, and AI tutors.", features: ["LMS & course delivery", "Assessments & progress", "AI tutors & personalization", "Certifications", "Collaboration tools"], image: serviceImage("edtech", IMG.web), iconKey: "graduation-cap" },
  { id: "proptech", categoryId: "industry", title: "Real Estate", description: "Property listings, smart home, and transaction flows.", features: ["Listings & search", "Virtual tours", "Document & e-sign", "Smart home integration", "Agent tools"], image: serviceImage("proptech", IMG.web), iconKey: "home" },
  { id: "legaltech", categoryId: "industry", title: "Legal", description: "Contract automation, compliance, and document analysis.", features: ["Contract drafting & templates", "E-sign & workflow", "Compliance tracking", "Document analysis", "Case management"], image: serviceImage("legaltech", IMG.web), iconKey: "scale" },
  { id: "travel", categoryId: "industry", title: "Travel & Hospitality", description: "Booking systems and itinerary management.", features: ["Booking engines", "Inventory & rates", "Itineraries", "Loyalty programs", "Channel managers"], image: serviceImage("travel", IMG.web), iconKey: "plane" },
  // Enterprise & Infrastructure
  { id: "erp", categoryId: "enterprise", title: "ERP & Enterprise Systems", description: "Business operations, HR, inventory, accounting.", features: ["HR & payroll", "Inventory & supply chain", "Accounting & finance", "Reporting & BI", "Integrations"], image: serviceImage("erp", IMG.web), iconKey: "building" },
  { id: "cloud-devops", categoryId: "enterprise", title: "Cloud & DevOps", description: "Infrastructure automation and monitoring.", features: ["AWS/Azure/GCP", "CI/CD pipelines", "Containers & Kubernetes", "Monitoring & alerting", "IaC (Terraform)"], image: serviceImage("cloud-devops", IMG.cloud), iconKey: "cloud" },
  // Emerging
  { id: "ai-ml", categoryId: "emerging", title: "AI & Machine Learning", description: "AI assistants, predictive analytics, automation.", features: ["LLM & chatbot integration", "Predictive models", "Computer vision", "NLP", "ML pipelines"], image: serviceImage("ai-ml", IMG.ai), iconKey: "bot" },
  { id: "blockchain", categoryId: "emerging", title: "Blockchain & Web3", description: "Smart contracts, DeFi, decentralized identity.", features: ["Smart contracts", "DeFi protocols", "Wallets & dApps", "Decentralized identity", "Tokenization"], image: serviceImage("blockchain", IMG.web), iconKey: "link" },
  { id: "pwa-api", categoryId: "emerging", title: "Progressive Web Apps & API Development", description: "PWAs, REST/GraphQL APIs, and integration backends for web and mobile.", features: ["Progressive Web Apps (PWA)", "REST & GraphQL APIs", "Third-party integrations", "Webhooks & real-time", "Documentation & SDKs"], image: serviceImage("pwa-api", IMG.web), iconKey: "code2" },
  // Smart & Connected
  { id: "smart-city", categoryId: "smart-connected", title: "Smart City Solutions", description: "Traffic, parking, surveillance, environmental monitoring.", features: ["Traffic management", "Smart parking", "Surveillance & safety", "Environmental monitoring", "Data analytics"], image: serviceImage("smart-city", IMG.cloud), iconKey: "building-2" },
  { id: "mobility", categoryId: "mobility", title: "Mobility & Ride-Sharing", description: "Ride-hailing, fleet management, EV charging.", features: ["Ride-hailing apps", "Fleet management", "Route optimization", "EV charging networks", "Autonomous support"], image: serviceImage("mobility", IMG.mobile), iconKey: "car" },
  { id: "retailtech", categoryId: "retail", title: "Retail & POS", description: "POS, inventory, self-checkout, omnichannel.", features: ["Point-of-sale systems", "Inventory automation", "Self-checkout kiosks", "Customer analytics", "Omnichannel"], image: serviceImage("retailtech", IMG.web), iconKey: "barcode" },
  { id: "hrtech", categoryId: "hrtech", title: "HR & Workforce", description: "Recruitment, payroll, performance, remote tools.", features: ["Recruitment & ATS", "Payroll & benefits", "Performance analytics", "Remote workforce tools", "Employee portals"], image: serviceImage("hrtech", IMG.web), iconKey: "users" },
  { id: "climatetech", categoryId: "climate", title: "Climate & Sustainability", description: "Carbon tracking, energy, ESG reporting.", features: ["Carbon tracking", "Energy optimization", "Renewable monitoring", "ESG reporting", "Sustainable supply chain"], image: serviceImage("climatetech", IMG.web), iconKey: "leaf" },
];

export function getServicesByCategory(categoryId: ServiceCategoryId): ServiceItem[] {
  return serviceList.filter((s) => s.categoryId === categoryId);
}

export function getAllCategoryIds(): ServiceCategoryId[] {
  return serviceCategories.map((c) => c.id);
}

export function getCategoryById(id: ServiceCategoryId): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.id === id);
}

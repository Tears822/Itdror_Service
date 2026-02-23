/**
 * Portfolio items by category (screenshots / case studies).
 * Used by ServiceDetailModal carousel and PortfolioModal.
 *
 * Service detail modal carousel uses images from public/assets/services/{folder}/
 * when available (see serviceIdToPortfolioFolder and portfolioImagesByFolder).
 */

const SERVICES_BASE = "/assets/services";

/** Map service id to folder name under public/assets/services/ */
export const serviceIdToPortfolioFolder: Record<string, string> = {
  saas: "sass",
  fintech: "fintech",
  ecommerce: "ecommerce",
  "food-delivery": "food_logistic",
  marketplace: "marketplace",
  social: "social",
  streaming: "streaming_media",
  dating: "dating_community",
  healthtech: "healthtech",
  edtech: "edtech",
  proptech: "proptech",
  legaltech: "legaltech",
  travel: "travel_hospitality",
  "ai-ml": "ai_machine_learning",
  blockchain: "blockchain",
  mobility: "riding_sharing",
  retailtech: "retail_poc",
};

/** Image filenames per folder (under public/assets/services/{folder}/) */
const portfolioImagesByFolder: Record<string, string[]> = {
  ai_machine_learning: ["bottr-1.jpg", "bottr-2.jpg", "wyvern-1.jpg", "wyvern-2.jpg"],
  blockchain: ["mrmint-1.jpg", "mrmint-2.jpg", "pankito-1.jpg", "pankito-2.jpg", "pooltogether-2.jpg", "pooltogether.jpg"],
  dating_community: ["jdate-1.jpg", "jjdate-2.jpg", "loop.jpg"],
  ecommerce: ["reverb-1.jpg", "reverb-2.jpg", "sendowl-1.jpg", "sendowl-2.jpg", "whatnot-1.jpg", "whatnot-2.jpg"],
  edtech: ["apprenticareers-1.jpg", "apprenticareers-2.jpg", "attendance-1.jpg", "attendance-2.jpg"],
  fintech: ["eisen-1.jpg", "eisen-2.jpg", "igloo-1jpg.jpg", "igloo-2.jpg", "oportun-1.jpg", "oportun-2.jpg"],
  food_logistic: ["homechef-1.jpg", "honmechef-2.jpg", "insomniacookie-1.jpg", "insomniacookie-2.jpg", "littlespoon-1.jpg", "littlespoon-2.jpg"],
  healthtech: ["counselhealth-1.jpg", "counselhealth-2.jpg", "hellium-1.jpg", "hellium-2.jpg", "stellarhealth-1.jpg", "stellarhealth-2.jpg"],
  legaltech: ["filevine-1.jpg", "filevine-2.jpg", "lawgeex-1.jpg", "lawgeex-2.jpg"],
  marketplace: ["bonanza-1.jpg", "bonanza-2.jpg", "poshmark-1.jpg", "poshmark-2.jpg", "storenvy-1.jpg", "storenvy-2.jpg"],
  proptech: ["alliedoms-1.jpg", "alliedoms-2.jpg", "azure_printed_home-1.jpg", "azure_printed_home-2.jpg", "closinglock-1.jpg", "closinglock-2.jpg"],
  retail_poc: ["jovvie-1.jpg", "jovvie-2.jpg"],
  riding_sharing: ["driveempower-1.jpg", "driveempower-2.jpg", "neghbrsbook-1.jpg", "neghbrsbook-2.jpg"],
  sass: ["everhour-1.jpg", "everhour-2.jpg", "sheety-1.jpg", "sheety-2.jpg", "storemapper-1.jpg", "storemapper-2.jpg"],
  social: ["diaspora-1.jpg", "diaspora-2.jpg", "tagged-1.jpg", "tagged-2.jpg", "thenoplace-1.jpg", "thenoplace-2.jpg"],
  streaming_media: ["arrowplayer-1.jpg", "arrowplayer-2.jpg", "curiositystream-1.jpg", "curiositystream-2.jpg", "retrocrush-1.jpg", "retrocrush-2.jpg"],
  travel_hospitality: ["blacktomato-1.jpg", "blacktomato-2.jpg", "globalshop_solution-1.jpg", "globalshop_solution-2.jpg", "homestay-1.jpg", "homestay-2.jpg", "plum_guide-1.jpg", "plum_guide-2.jpg"],
};

function filenameToTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
  return base.charAt(0).toUpperCase() + base.slice(1);
}

/** Portfolio slide for carousel: image path + optional title (from filename). */
export interface PortfolioSlide {
  image: string;
  title: string;
  description?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const portfolioItems: Record<string, PortfolioItem[]> = {
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

/** Map service id (from ServiceItem.id) to portfolio category key for carousel */
export const serviceIdToPortfolioKey: Record<string, string> = {
  saas: "Web Development",
  fintech: "Web Development",
  ecommerce: "Web Development",
  "food-delivery": "Mobile Development",
  marketplace: "Web Development",
  social: "Mobile Development",
  streaming: "Web Development",
  dating: "Mobile Development",
  healthtech: "Web Development",
  edtech: "Web Development",
  proptech: "Web Development",
  legaltech: "Web Development",
  travel: "Web Development",
  erp: "Web Development",
  cybersecurity: "Cloud Services",
  "cloud-devops": "DevOps & CI/CD",
  "ai-ml": "AI Solutions",
  blockchain: "Web Development",
  "pwa-api": "Web Development",
  "smart-city": "Cloud Services",
  mobility: "Mobile Development",
  retailtech: "Web Development",
  hrtech: "Web Development",
  climatetech: "Web Development",
  "application-support": "Support & Maintenance",
  "software-development": "Web Development",
  "ui-ux-design": "UI/UX Design",
};

/** Book-style services (no portfolio section in detail modal). */
const NO_PORTFOLIO_SERVICE_IDS = ["application-support", "software-development"];

/** Get portfolio slides for the service detail modal carousel. Only returns slides when the service has a folder with images under /assets/services/ — no fallback to avoid showing non-existent or placeholder images. */
export function getPortfolioSlidesForService(serviceId: string | undefined): PortfolioSlide[] {
  if (!serviceId) return [];
  if (NO_PORTFOLIO_SERVICE_IDS.includes(serviceId)) return [];
  const folder = serviceIdToPortfolioFolder[serviceId];
  if (!folder) return [];
  const files = portfolioImagesByFolder[folder];
  if (!files?.length) return [];
  return files.map((file) => ({
    image: `${SERVICES_BASE}/${folder}/${file}`,
    title: filenameToTitle(file),
  }));
}

export function getPortfolioItemsForService(serviceId: string | undefined): PortfolioItem[] {
  if (!serviceId) return [];
  const key = serviceIdToPortfolioKey[serviceId];
  if (!key) return [];
  return portfolioItems[key] ?? [];
}

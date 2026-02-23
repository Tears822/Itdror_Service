"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAws } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const ICON_BASE = "https://cdn.simpleicons.org";
const ICON_COLOR = "2DA0FF"; // project accent

type StackItem = { name: string; slug: string; faIcon?: IconDefinition };

const STACK_BY_CATEGORY: { label: string; items: StackItem[] }[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
      { name: "Vue.js", slug: "vuedotjs" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "HTML5", slug: "html5" },
      { name: "CSS3", slug: "css" },
      { name: "Sass", slug: "sass" },
      { name: "Redux", slug: "redux" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Python", slug: "python" },
      { name: ".NET", slug: "dotnet" },
      { name: "Go", slug: "go" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "Express", slug: "express" },
      { name: "GraphQL", slug: "graphql" },
      { name: "Prisma", slug: "prisma" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Redis", slug: "redis" },
      { name: "MySQL", slug: "mysql" },
      { name: "Supabase", slug: "supabase" },
    ],
  },
  {
    label: "DevOps & Cloud",
    items: [
      { name: "AWS", slug: "amazonwebservices", faIcon: faAws },
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Terraform", slug: "terraform" },
      { name: "GitHub Actions", slug: "githubactions" },
      { name: "Vercel", slug: "vercel" },
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Linux", slug: "linux" },
    ],
  },
  {
    label: "Mobile & Tools",
    items: [
      { name: "React Native", slug: "react" },
      { name: "Flutter", slug: "flutter" },
      { name: "Firebase", slug: "firebase" },
      { name: "Stripe", slug: "stripe" },
      { name: "Figma", slug: "figma" },
      { name: "npm", slug: "npm" },
      { name: "pnpm", slug: "pnpm" },
      { name: "Yarn", slug: "yarn" },
    ],
  },
];

function StackPill({ name, slug, faIcon }: StackItem) {
  const iconUrl = `${ICON_BASE}/${slug}/${ICON_COLOR}`;
  const useFontAwesome = Boolean(faIcon);
  return (
    <span className="inline-flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-muted text-sm font-medium hover:border-accent/30 hover:text-accent hover:bg-white/10 transition-all duration-300">
      {useFontAwesome && faIcon ? (
        <FontAwesomeIcon icon={faIcon} className="w-5 h-5 shrink-0" style={{ color: `#${ICON_COLOR}` }} />
      ) : (
        <>
          <img
            src={iconUrl}
            alt=""
            className="w-5 h-5 object-contain"
            width={20}
            height={20}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (fallback) {
                fallback.style.display = "flex";
                fallback.style.alignItems = "center";
                fallback.style.justifyContent = "center";
              }
            }}
          />
          <span
            className="w-5 h-5 rounded bg-accent/20 text-accent text-[10px] font-bold hidden"
            aria-hidden
          >
            {name.charAt(0)}
          </span>
        </>
      )}
      {name}
    </span>
  );
}

/* Number of copies so the strip is long and the loop has no visible end (circle logic) */
const COPIES = 4;

function CarouselRow({
  label,
  items,
  reverse,
  speed,
}: {
  label: string;
  items: StackItem[];
  reverse?: boolean;
  speed?: "slow" | "fast";
}) {
  const repeated = Array.from({ length: COPIES }, () => items).flat();
  const trackClass = [
    "tech-carousel-track",
    reverse ? "tech-carousel-track--reverse" : "",
    speed === "slow" ? "tech-carousel-track--slow" : speed === "fast" ? "tech-carousel-track--fast" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className="mb-8 last:mb-0">
      <p className="text-xs font-semibold text-accent/90 uppercase tracking-wider mb-3 pl-1">
        {label}
      </p>
      <div className="overflow-hidden">
        <div className={trackClass}>
          {repeated.map((item, i) => (
            <StackPill key={`${item.slug}-${i}`} name={item.name} slug={item.slug} faIcon={item.faIcon} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TechStackSection() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 bg-background/30" />
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold text-accent uppercase tracking-widest mb-10"
        >
          Technologies We Use
        </motion.p>
        <div className="space-y-0">
          {STACK_BY_CATEGORY.map((category, i) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <CarouselRow
                label={category.label}
                items={category.items}
                reverse={i % 2 === 1}
                speed={i % 3 === 0 ? "slow" : i % 3 === 1 ? "fast" : undefined}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

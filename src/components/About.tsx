"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Clock, DollarSign, FileCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "Application Support",
    description:
      "Dedicated support for your applications: troubleshooting, user training, and clear communication between you and the dev team. We assign you an Application Support Specialist so you always have a single point of contact for bugs, questions, and updates—no runaround.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    description:
      "Same-day response for urgent issues. Your business can't wait, and neither do we. We prioritize critical tickets and keep you informed at every step so downtime stays minimal and you can plan with confidence.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description:
      "Competitive pricing without compromising quality. 1 month free support after launch so you can validate the product in production. No hidden fees—we agree on scope and rates upfront and stick to them.",
  },
  {
    icon: FileCheck,
    title: "One Integrated Team",
    description:
      "Development and application support in one place. No silos—one point of contact for build and support. The same team that builds your app maintains it, so context is never lost and handoffs are seamless.",
  },
];

const values = [
  "Free initial consultation",
  "1 month free support after launch",
  "Integrated dev + support team",
  "Remote delivery worldwide",
  "Same-day response",
  "Transparent pricing",
];

const leadershipTeam = [
  { name: "Kerry Dor", role: "CEO", image: "/assets/team/kerry-dor.jpeg" },
  { name: "Jason Liu", role: "CTO", image: "/assets/team/jason-liu.webp" },
];

const teamMembers = [
  { name: "James Wilson", role: "Lead Developer", image: "/assets/team/james-wilson.webp" },
  { name: "Robert Mitchell", role: "Product Manager", image: "/assets/team/robert-mitchell.webp" },
  { name: "David Chen", role: "DevOps Engineer", image: "/assets/team/david-chen.webp" },
  { name: "Daniel Davis", role: "UX Designer", image: "/assets/team/daniel-davis.jpg" },
  { name: "Michael Brown", role: "Application Support Lead", image: "/assets/team/michael-brown.webp" },
  { name: "Jason Taylor", role: "Project Manager", image: "/assets/team/jason-taylor.jpg" },
  { name: "Andrew Foster", role: "Backend Engineer", image: "/assets/team/andrew-foster.jpg" },
  { name: "Ryan Anderson", role: "Full Stack Developer", image: "/assets/team/ryan-anderson.jpg" },
  { name: "Matthew Clark", role: "QA Engineer", image: "/assets/team/matthew-clark.jpg" },
  { name: "Brian Cooper", role: "Technical Consultant", image: "/assets/team/brian-cooper.jpg" },
];

function TeamCard({
  member,
  index,
  delay = 0,
}: {
  member: (typeof teamMembers)[0] | (typeof leadershipTeam)[0];
  index: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: delay + index * 0.08 }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative w-full aspect-square max-w-[180px] mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-4 ring-2 ring-transparent hover:ring-accent/40 hover:border-accent/30 transition-all duration-300">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 180px"
          className="object-cover"
        />
      </div>
      <h3 className="font-semibold text-foreground">{member.name}</h3>
      <p className="text-sm text-muted">{member.role}</p>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background: subtle overlay so layout gradient shows through */}
      <div className="absolute inset-0 bg-background/10" aria-hidden />
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0, 128, 208, 0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 30% 80%, rgba(45, 160, 255, 0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Development & Support{" "}
              <span className="gradient-text">in One Team</span>
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              IT Dor Services combines custom software development with dedicated
              application support. We build your applications and stay with you
              after launch—troubleshooting, training users, and working with
              developers to fix issues so you get one point of contact, not silos.
            </p>
            <p className="text-muted mb-8 leading-relaxed">
              Software has bugs. We give you an Application Support Specialist
              who bridges technical teams and end-users, so your business keeps
              running smoothly and your users get the help they need.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Features & Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Feature Image */}
            <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
              <Image
                src="/assets/about/company_building.jpg"
                alt="IT Dor Services - Professional IT Consulting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-semibold mb-1">IT Dor Services</h3>
                <p className="text-sm text-muted">Software Development & Application Support</p>
              </div>
            </div>

            {/* Features – Button-style asymmetric corners + hover */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const corner = ["tl", "tr", "bl", "br"][index] as "tl" | "tr" | "bl" | "br";
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex"
                  >
                    <div
                      className={`about-feature-card about-feature-card--${corner}`}
                      role="article"
                      aria-label={feature.title}
                    >
                      <div className="about-feature-card__icon">
                        <Icon aria-hidden />
                      </div>
                      <h4 className="about-feature-card__title">{feature.title}</h4>
                      <p className="about-feature-card__desc">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-24 lg:mt-32"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-widest mb-4 block text-center">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Meet the <span className="gradient-text">People Behind IT Dor</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted text-center mb-12">
            Experienced developers, designers, and support specialists working together to build and maintain your applications.
          </p>
          {/* Row 1: CEO & CTO centered, same card size as others */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10 mb-10 lg:mb-12 [&>div]:min-w-[180px] [&>div]:w-[180px]">
            {leadershipTeam.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
          {/* Rows 2 & 3: rest of team */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} delay={0.15} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

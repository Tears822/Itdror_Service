"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Clock, DollarSign, FileCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Fast Response Time",
    description:
      "Same-day response for urgent issues. Your business can't wait, and neither do we.",
  },
  {
    icon: DollarSign,
    title: "Affordable Rates",
    description:
      "Competitive pricing without compromising quality. Get enterprise-level service at small business prices.",
  },
  {
    icon: FileCheck,
    title: "Long-Term Contracts Preferred",
    description:
      "We prefer long-term partnerships for consistent support and better outcomes. Committed engagement helps us deliver lasting value.",
  },
  {
    icon: Headphones,
    title: "Personalized Support",
    description:
      "Direct access to your IT consultant. No call centers, no ticket queues—just real help when you need it.",
  },
];

const values = [
  "Free initial consultation",
  "Same-day response",
  "100% satisfaction guaranteed",
  "Remote delivery worldwide",
  "Transparent pricing",
  "No hidden fees",
];

export function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
              Why Choose IT Dor Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Your Trusted Partner for{" "}
              <span className="gradient-text">IT Success</span>
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              IT Dor Services provides professional IT consulting and development
              to clients worldwide via remote delivery. We bring the expertise of
              large IT firms with the personalized attention of a dedicated consultant.
            </p>
            <p className="text-muted mb-8 leading-relaxed">
              Whether you need network setup, cybersecurity protection, cloud
              migration, or day-to-day IT support, I work directly with you
              to understand your unique challenges and deliver solutions that
              keep your business running smoothly.
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
                <p className="text-sm text-muted">Professional IT Consulting</p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-5 rounded-xl glass group hover:bg-white/5 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-semibold mb-2 group-hover:text-accent transition-colors text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

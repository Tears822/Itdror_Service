"use client";

import { Shield, FileCheck, Building2, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const insuranceFeatures = [
  {
    icon: Shield,
    title: "General Liability Insurance",
    description:
      "Protection against claims of bodily injury or property damage that may occur during service delivery. Covers third-party incidents so your business and clients are protected when we work on site or with your systems.",
  },
  {
    icon: FileCheck,
    title: "Professional Liability Insurance",
    description:
      "Errors and Omissions (E&O) coverage for professional services, protecting against claims of negligence or mistakes. Essential for software and consulting work where advice or deliverables could be disputed.",
  },
  {
    icon: Building2,
    title: "Business Property Insurance",
    description:
      "Coverage for business equipment, tools, and property used in IT consulting and development work. Ensures our gear and your assets are covered so projects can continue even if hardware is lost or damaged.",
  },
  {
    icon: Users,
    title: "Workers' Compensation",
    description:
      "Required coverage for employees, providing benefits for work related injuries or illnesses. Keeps our team protected and meets legal and client requirements when we work with you.",
  },
];

const benefits = [
  "Comprehensive coverage for IT consulting services",
  "Protection against cyber liability claims",
  "Equipment and property coverage",
  "Professional liability protection",
  "Compliance with client requirements",
  "Peace of mind for your business",
];

export function Insurance() {
  return (
    <section id="insurance" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" aria-hidden />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
            Insurance Coverage
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Fully Insured{" "}
            <span className="gradient-text">IT Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted">
            ITDor Services is fully insured to protect your business and ours. We maintain comprehensive
            insurance coverage to ensure peace of mind for all our clients.
          </p>
        </div>

        {/* Insurance Features Grid – hover border reveal + scale (Card pattern) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {insuranceFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex justify-center"
              >
                <div className="insurance-card">
                  <div className="insurance-card__border" aria-hidden />
                  <div className="insurance-card__content">
                    <div className="insurance-card__icon">
                      <IconComponent aria-hidden />
                    </div>
                    <h3 className="insurance-card__title">{feature.title}</h3>
                    <p className="insurance-card__desc">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-white/10 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Insurance Matters</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-muted">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted mb-4">
            Need proof of insurance for your vendor requirements?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all btn-glow"
          >
            Request Certificate of Insurance
          </a>
        </div>
      </div>
    </section>
  );
}

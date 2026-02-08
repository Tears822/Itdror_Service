"use client";

import { Shield, FileCheck, Building2, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const insuranceFeatures = [
  {
    icon: Shield,
    title: "General Liability Insurance",
    description: "Protection against claims of bodily injury or property damage that may occur during service delivery.",
  },
  {
    icon: FileCheck,
    title: "Professional Liability Insurance",
    description: "Errors and Omissions (E&O) coverage for professional services, protecting against claims of negligence or mistakes.",
  },
  {
    icon: Building2,
    title: "Business Property Insurance",
    description: "Coverage for business equipment, tools, and property used in IT consulting and development work.",
  },
  {
    icon: Users,
    title: "Workers' Compensation",
    description: "Required coverage for employees, providing benefits for work-related injuries or illnesses.",
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
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
            Insurance Coverage
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Fully Insured{" "}
            <span className="gradient-text">IT Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted">
            ITDor Services is fully insured to protect your business and ours. We maintain comprehensive
            insurance coverage to ensure peace of mind for all our clients.
          </p>
        </div>

        {/* Insurance Features Grid */}
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
                className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/30 transition-all duration-300 p-6 hover:-translate-y-2"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/30 backdrop-blur-sm flex items-center justify-center border border-accent/20 mb-4 group-hover:bg-accent/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
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

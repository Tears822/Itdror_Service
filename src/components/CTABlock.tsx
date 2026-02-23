"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function CTABlock() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-section-alt">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Build &{" "}
            <span className="gradient-text">Support Your Applications?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted mb-10">
            Get a free consultation. Same-day response—we&apos;ll discuss your
            project and how our team can help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="cta-btn-primary"
            >
              <MessageCircle className="w-5 h-5" />
              Get Your Free Consultation
            </Link>
            <Link
              href="/services"
              className="cta-btn-secondary"
            >
              View Our Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

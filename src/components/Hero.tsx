"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";

const benefits = [
  "Integrated dev + support",
  "1 month free support after launch",
  "Clear client–dev communication",
];

export function Hero() {

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background/50 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-12 text-center pt-28 sm:pt-24 lg:pt-32 pb-12" style={{ zIndex: 10 }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass mb-6 sm:mb-8"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs sm:text-sm text-muted text-center">
            Serving Clients Worldwide • Remote-First
          </span>
        </motion.div>

        {/* Main Heading - single clear line for better readability */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-5 sm:mb-6 leading-tight"
        >
          <span className="block">Software Development &</span>
          <span className="block mt-1 sm:mt-2 gradient-text">
            Application Support
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted mb-8 sm:mb-10 px-1 leading-relaxed"
        >
          We build your applications and support them after launch. One integrated team:
          custom software development plus dedicated application support when you need it.
        </motion.p>

        {/* Benefits - aligned so text starts at same position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 mx-auto w-fit"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-2 min-w-0"
            >
              <span className="w-6 h-6 flex shrink-0 items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </span>
              <span className="text-sm sm:text-base text-left">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
        >
          <Link
            href="/contact"
            className="cta-btn-primary w-full sm:w-auto text-center"
          >
            <MessageCircle className="w-5 h-5" />
            Get Your Free Consultation
          </Link>
          <Link
            href="/services"
            className="cta-btn-secondary w-full sm:w-auto text-center"
          >
            View Our Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-6 text-xs sm:text-sm text-muted px-2"
        >
          ✓ Free initial consultation • ✓ Same-day response • ✓ 100% satisfaction guaranteed
        </motion.p>
      </div>
    </section>
  );
}

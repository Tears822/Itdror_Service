"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Having one team for both development and support made all the difference. No more back-and-forth between vendors we get clear answers and fast fixes.",
    name: "Sarah Chen",
    role: "Operations Director, TechFlow",
  },
  {
    quote:
      "The 1 month free support after launch gave us confidence. When we hit a few bumps, the Application Support specialist had our back and communicated directly with the dev.",
    name: "Marcus Webb",
    role: "Founder, ScaleUp SaaS",
  },
  {
    quote:
      "Professional, responsive, and they actually understand our stack. We renewed support for another year without hesitation.",
    name: "Elena Rodriguez",
    role: "CTO, DataBridge",
  },
  {
    quote:
      "From initial build to ongoing support, the team has been transparent and reliable. They respond quickly and our users notice the difference.",
    name: "James Park",
    role: "Product Manager, Nextera",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-muted">
            Real feedback from teams who use our development and application support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="testimonial-card"
            >
              <p className="testimonial-card__exit" aria-hidden>
                ※
              </p>
              <div className="testimonial-card__icon flex items-center justify-between w-full">
                <Quote className="w-8 h-8" />
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>
              <div className="testimonial-card__content">
                <p className="testimonial-card__text">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm text-white/60 mt-3">
                  — {t.name}, {t.role}
                </p>
              </div>
              <p className="testimonial-card__apply">
                <a href="#" className="testimonial-card__link">
                  Read more
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

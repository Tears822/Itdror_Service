"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";

export function LiveChatCard() {
  const { openChat } = useChat();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.3 }}
      onClick={openChat}
      className="testimonial-card cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openChat();
        }
      }}
    >
      <p className="testimonial-card__exit" aria-hidden>
        ※
      </p>
      <div className="testimonial-card__icon flex items-center justify-center w-full">
        <MessageCircle className="w-10 h-10 text-accent" />
      </div>
      <div className="testimonial-card__content">
        <p className="testimonial-card__text font-semibold">
          Live Chat
        </p>
        <p className="text-sm text-white/60 mt-3">
          Get in touch now. Enter your email and we’ll reply in real time.
        </p>
      </div>
      <p className="testimonial-card__apply">
        <span className="testimonial-card__link inline-flex items-center gap-2 group-hover:gap-3 transition-all">
          Open chat
          <ArrowRight className="w-4 h-4 shrink-0" />
        </span>
      </p>
    </motion.article>
  );
}

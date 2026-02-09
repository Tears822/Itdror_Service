"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export interface ServiceDetail {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image: string;
  category?: "it" | "dev";
}

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
  onContactClick?: () => void;
}

export function ServiceDetailModal({ isOpen, onClose, service, onContactClick }: ServiceDetailModalProps) {
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Hide navbar when modal is open
      document.body.classList.add('modal-open');
      // Scroll to top when modal opens to ensure banner is visible
      requestAnimationFrame(() => {
        if (modalWrapperRef.current) {
          modalWrapperRef.current.scrollTop = 0;
        }
      });
    } else {
      // Show navbar when modal is closed
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!service) return null;

  const IconComponent = service.icon;

  const scrollToContact = () => {
    onClose();
    onContactClick?.();
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />
          {/* Centering wrapper: flexbox centers the modal so Framer Motion transform doesn't break position */}
          <div ref={modalWrapperRef} className="fixed inset-0 z-[100] flex items-start justify-center p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-background border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
              style={{ maxHeight: 'calc(100vh - 2rem)', marginTop: '1rem', marginBottom: '1rem' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-detail-title"
            >
            {/* Header with image */}
            <div className="relative h-44 sm:h-52 shrink-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover rounded-t-2xl"
                sizes="(max-width: 768px) 100vw, 672px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent rounded-t-2xl" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-primary/30 backdrop-blur-sm flex items-center justify-center border border-accent/20">
                    <IconComponent className="w-7 h-7 text-accent" />
                  </div>
                  <h2 id="service-detail-title" className="text-2xl font-bold text-white drop-shadow-lg">
                    {service.title}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-black/40 hover:bg-black/60 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-accent uppercase tracking-widest mb-2">About this service</h3>
                <p className="text-muted leading-relaxed">{service.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-accent uppercase tracking-widest mb-3">What we offer</h3>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground">
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={scrollToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all btn-glow"
                >
                  Get a Quote for {service.title}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

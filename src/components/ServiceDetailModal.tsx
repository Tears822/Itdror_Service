"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getPortfolioSlidesForService } from "@/data/portfolio";
import { useQuoteIntent } from "@/contexts/QuoteIntentContext";

export interface ServiceDetail {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image: string;
  category?: "it" | "dev" | "support";
  serviceId?: string;
}

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
  onContactClick?: () => void;
}

const CAROUSEL_INTERVAL_MS = 5000;
const CAROUSEL_TRANSITION_MS = 600;

export function ServiceDetailModal({ isOpen, onClose, service, onContactClick }: ServiceDetailModalProps) {
  const modalWrapperRef = useRef<HTMLDivElement>(null);
  const { setQuoteForService } = useQuoteIntent();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselDirection, setCarouselDirection] = useState<"next" | "prev">("next");

  const portfolioSlides = service ? getPortfolioSlidesForService(service.serviceId) : [];
  const slideCount = portfolioSlides.length;
  const safeCarouselIndex = slideCount > 0 ? ((carouselIndex % slideCount) + slideCount) % slideCount : 0;
  const currentSlide = portfolioSlides[safeCarouselIndex];

  useEffect(() => {
    if (isOpen) setCarouselIndex(0);
  }, [isOpen, service?.serviceId]);

  useEffect(() => {
    if (!isOpen || slideCount <= 1) return;
    const interval = setInterval(() => {
      setCarouselDirection("next");
      setCarouselIndex((i) => i + 1);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isOpen, slideCount]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
      requestAnimationFrame(() => {
        modalWrapperRef.current?.scrollTo(0, 0);
      });
    } else {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!service) return null;

  const IconComponent = service.icon;

  const goPrev = () => {
    setCarouselDirection("prev");
    setCarouselIndex((i) => i - 1);
  };
  const goNext = () => {
    setCarouselDirection("next");
    setCarouselIndex((i) => i + 1);
  };

  const scrollToContact = () => {
    if (service) setQuoteForService(service.title);
    onClose();
    onContactClick?.();
    requestAnimationFrame(() => {
      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/25 backdrop-blur-sm"
            aria-hidden
            data-lenis-prevent
            onWheel={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onTouchMove={(e) => { e.preventDefault(); e.stopPropagation(); }}
          />
          <div
            ref={modalWrapperRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none overflow-y-auto"
            data-lenis-prevent
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl pointer-events-auto my-auto rounded-3xl overflow-hidden flex flex-col bg-white border border-black/8 shadow-xl shadow-black/10"
              style={{
                maxHeight: "calc(100vh - 2rem)",
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-detail-title"
            >
              {/* Header */}
              <div className="relative h-48 sm:h-56 shrink-0 overflow-hidden">
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" aria-hidden />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden />
                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/20 bg-white/95 backdrop-blur-md shadow-lg text-primary">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h2 id="service-detail-title" className="text-2xl sm:text-3xl font-bold text-white truncate drop-shadow-md">
                      {service.title}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2.5 rounded-xl bg-white/95 hover:bg-white border border-black/10 text-foreground transition-all shrink-0 shadow-sm"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content - min-h-0 so flex child can shrink and scroll */}
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6 sm:p-8 space-y-8 bg-[#f8fafc]/50">
                <section>
                  <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">About this service</p>
                  <p className="text-muted leading-relaxed text-[15px]">{service.description}</p>
                </section>

                <section>
                  <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Included features</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={feature} className="flex items-start gap-3 group">
                        <span
                          className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0 ring-4 ring-primary/20 group-hover:ring-primary/30 transition-all"
                          aria-hidden
                        />
                        <span className="text-foreground text-[15px] leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {portfolioSlides.length > 0 && currentSlide && (
                  <section>
                    <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Portfolio</p>
                    <div className="rounded-2xl overflow-hidden border border-black/8 bg-white shadow-md">
                      <div className="relative aspect-video bg-slate-100">
                        <AnimatePresence initial={false} mode="wait" custom={carouselDirection}>
                          <motion.div
                            key={safeCarouselIndex}
                            custom={carouselDirection}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                              hidden: (dir: "next" | "prev") => ({ x: dir === "next" ? "100%" : "-100%", opacity: 0.7 }),
                              visible: { x: 0, opacity: 1 },
                              exit: (dir: "next" | "prev") => ({ x: dir === "next" ? "-100%" : "100%", opacity: 0.7 }),
                            }}
                            transition={{ duration: CAROUSEL_TRANSITION_MS / 1000, ease: [0.32, 0.72, 0, 1] }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={currentSlide.image}
                              alt={currentSlide.title}
                              fill
                              className="object-contain"
                              sizes="(max-width: 672px) 100vw, 672px"
                            />
                          </motion.div>
                        </AnimatePresence>

                        {portfolioSlides.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={goPrev}
                              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/95 hover:bg-white border border-black/10 text-foreground transition-all shadow-sm z-10"
                              aria-label="Previous"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                              type="button"
                              onClick={goNext}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/95 hover:bg-white border border-black/10 text-foreground transition-all shadow-sm z-10"
                              aria-label="Next"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Progress bar (resets each slide) */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
                              <motion.div
                                key={safeCarouselIndex}
                                className="h-full bg-primary rounded-r-full origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{
                                  duration: CAROUSEL_INTERVAL_MS / 1000,
                                  ease: "linear",
                                }}
                                style={{ transformOrigin: "left" }}
                              />
                            </div>

                            {/* Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                              {portfolioSlides.map((_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    setCarouselDirection(i > safeCarouselIndex ? "next" : "prev");
                                    setCarouselIndex(i);
                                  }}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    i === safeCarouselIndex
                                      ? "w-6 bg-primary"
                                      : "w-1.5 bg-black/30 hover:bg-black/50"
                                  }`}
                                  aria-label={`Slide ${i + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="px-4 py-3 border-t border-black/8 bg-slate-50/80">
                        <p className="text-sm font-medium text-foreground truncate">{currentSlide.title}</p>
                        {currentSlide.description != null && currentSlide.description !== "" && (
                          <p className="text-xs text-muted truncate mt-0.5">{currentSlide.description}</p>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                <p className="text-sm text-muted">
                  Software development projects start from $3K. Every project is case by case get in touch for a detailed quote.
                </p>

                <div className="pt-2">
                  <button
                    onClick={scrollToContact}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-primary hover:bg-primary-hover transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25"
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

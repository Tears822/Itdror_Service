"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuoteIntent } from "@/contexts/QuoteIntentContext";
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader2, Star } from "lucide-react";
import { BloomButton } from "./BloomButton";

const QUOTE_PREFIX = "I'm interested in getting a quote for ";

export function Contact() {
  const { serviceName: quoteIntentService, clearQuoteIntent } = useQuoteIntent();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [quoteForService, setQuoteForService] = useState<string | null>(null);

  useEffect(() => {
    if (quoteIntentService) {
      setQuoteForService(quoteIntentService);
      setFormData((prev) => ({
        ...prev,
        message: prev.message.trim() ? prev.message : `${QUOTE_PREFIX}${quoteIntentService}.\n\n`,
      }));
      clearQuoteIntent();
    }
  }, [quoteIntentService, clearQuoteIntent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Subtle overlay so layout gradient shows through */}
      <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" aria-hidden />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-widest mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to Build &{" "}
            <span className="gradient-text">Support Your Applications?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted">
            Get a free consultation: we&apos;ll discuss your project and how our
            development and application support team can help. Same-day response.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form - left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <form onSubmit={handleSubmit} className="contact-form">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted">
                    I&apos;ll respond within 24 hours with your free consultation.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <p className="text-sm text-red-400">{error}</p>
                    </motion.div>
                  )}
                  <div>
                    <label
                      htmlFor="name"
                      className="contact-form__label"
                    >
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact-form__input"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="contact-form__label"
                      >
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="contact-form__input"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="contact-form__label"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="contact-form__input"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {quoteForService && (
                    <div className="flex items-center gap-2 text-sm text-accent">
                      <span>Quote request for:</span>
                      <span className="font-semibold text-foreground">{quoteForService}</span>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="message"
                      className="contact-form__label"
                    >
                      How can I help you? <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="contact-form__input contact-form__textarea"
                      placeholder="Tell me about your IT challenges..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    className="contact-form__submit"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Get Our Free Consultation
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-sm text-muted">
                    100% free. No obligation. I&apos;ll respond within 24 hours.
                  </p>
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Info - right on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8 order-1 lg:order-2"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <p className="text-muted mb-8">
                Software development and application support in one team.
                We deliver remotely so you get build and support wherever you are.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              <BloomButton
                href="mailto:sales@itdorservices.com"
                icon={Mail}
                label="Email"
                value="sales@itdorservices.com"
              />
              <BloomButton
                href="tel:+16177129076"
                icon={Phone}
                label="Phone"
                value="+1 (617) 712-9076"
              />
              <BloomButton
                icon={MapPin}
                label="Service Area"
                value="Worldwide (Remote)"
              />
              <BloomButton
                href="https://g.page/r/CY_Ou-dFLdhWEAI/review"
                icon={Star}
                label="Leave a review"
                value="Share your experience on Google"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

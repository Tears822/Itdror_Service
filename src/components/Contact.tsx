"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle, Linkedin, Youtube, Instagram, Twitter, Star, AlertCircle, Loader2 } from "lucide-react";

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
      {/* Semi-transparent background */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Solve Your{" "}
            <span className="gradient-text">IT Headaches?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted">
            Fill out the form and I&apos;ll get back to you within 24 hours with a
            free consultation to discuss your IT needs.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <p className="text-muted mb-8">
                Professional IT consulting and development for clients worldwide.
                We deliver remotely so your business gets reliable technology services wherever you are.
              </p>
            </div>

            <div className="space-y-6">
              <motion.a
                href="mailto:sales@itdorservices.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted">Email</div>
                  <div className="font-medium group-hover:text-accent transition-colors">
                    sales@itdorservices.com
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="tel:+16177129076"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted">Phone</div>
                  <div className="font-medium group-hover:text-accent transition-colors">
                    +1 (617) 712-9076
                  </div>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted">Service Area</div>
                  <div className="font-medium">Worldwide (Remote)</div>
                </div>
              </motion.div>

              <motion.a
                href="https://g.page/r/CY_Ou-dFLdhWEAI/review"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Star className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted">Leave a review</div>
                  <div className="font-medium group-hover:text-accent transition-colors">
                    Share your experience on Google
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10">
              <div className="text-sm text-muted mb-4">Connect with us</div>
              <div className="flex flex-nowrap gap-4">
                <motion.a
                  href="https://www.linkedin.com/company/itdorservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors shrink-0"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </motion.a>
                <motion.a
                  href="https://www.youtube.com/channel/UCxs816FBY3ma1bjTFqz2QXg"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors shrink-0"
                >
                  <Youtube className="w-4 h-4" />
                  YouTube
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/itdorservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors shrink-0"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </motion.a>
                <motion.a
                  href="https://x.com/itdorservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors shrink-0"
                >
                  <Twitter className="w-4 h-4" />
                  X
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl glass">
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
                      className="block text-sm font-medium mb-2"
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
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-muted/50 focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
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
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-muted/50 focus:border-accent transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-muted/50 focus:border-accent transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
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
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-muted/50 focus:border-accent transition-colors resize-none"
                      placeholder="Tell me about your IT challenges..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    className="w-full px-8 py-4 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all btn-glow flex items-center justify-center gap-2"
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
        </div>
      </div>
    </section>
  );
}

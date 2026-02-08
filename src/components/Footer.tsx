"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail, Phone, Linkedin } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  itServices: [
    { label: "Network Setup", href: "#services" },
    { label: "Cybersecurity", href: "#services" },
    { label: "Cloud Solutions", href: "#services" },
    { label: "Device Repair", href: "#services" },
    { label: "Server Management", href: "#services" },
    { label: "IT Help Desk", href: "#services" },
    { label: "Data Destruction", href: "#services" },
    { label: "Technology Consulting", href: "#services" },
  ],
  devServices: [
    { label: "Web Development", href: "#services" },
    { label: "Mobile Development", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "AI Solutions", href: "#services" },
    { label: "Cloud Services", href: "#services" },
    { label: "DevOps & CI/CD", href: "#services" },
    { label: "Digital Transformation", href: "#services" },
    { label: "Support & Maintenance", href: "#services" },
  ],
  company: [
    { label: "Why Me", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background/95" />
      
      {/* Glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-3 mb-6 group"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/assets/logo.png"
                alt="ITDor Services Logo"
                width={1200}
                height={400}
                className="h-[320px] w-auto object-contain max-h-24"
              />
            </motion.a>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Professional IT consulting and support for businesses in Boston, MA,
              NH & RI. Get reliable technology services that keep your business running.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:contact@itdorservices.com"
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@itdorservices.com
              </a>
              <a
                href="tel:+16177129076"
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (617) 712-9076
              </a>
              <a
                href="https://www.linkedin.com/company/it-dor-services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                Follow on LinkedIn
              </a>
            </div>
          </div>

          {/* IT Services Links */}
          <div>
            <h4 className="font-semibold mb-4">IT Services</h4>
            <ul className="space-y-3">
              {footerLinks.itServices.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-muted hover:text-foreground transition-colors line-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Development Services Links */}
          <div>
            <h4 className="font-semibold mb-4">Development</h4>
            <ul className="space-y-3">
              {footerLinks.devServices.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-muted hover:text-foreground transition-colors line-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-muted hover:text-foreground transition-colors line-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors line-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} IT Dor Services. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:bg-white/5 text-sm text-muted hover:text-foreground transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

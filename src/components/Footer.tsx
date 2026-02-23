"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { SocialLinksCard } from "./SocialLinksCard";

const footerLinks = {
  applicationSupport: [{ label: "Application Support Specialist", href: "/services#application-support" }],
  devServices: [
    { label: "Web Development", href: "/services#software-development" },
    { label: "Mobile Development", href: "/services#software-development" },
    { label: "UI/UX Design", href: "/services#software-development" },
    { label: "AI Solutions", href: "/services#software-development" },
    { label: "Cloud & DevOps", href: "/services#software-development" },
    { label: "Digital Transformation", href: "/services#software-development" },
    { label: "Support & Maintenance", href: "/services#software-development" },
  ],
  company: [
    { label: "Why Choose Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
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
      <div className="absolute inset-0 bg-background/70" />
      
      {/* Glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <Image
                src="/assets/logo.png"
                alt="ITDor Services Logo"
                width={1200}
                height={400}
                className="h-auto w-auto max-h-10 object-contain"
              />
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Software development and application support in one team.
              Delivered remotely—build and support wherever you are.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:sales@itdorservices.com"
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <Mail className="w-4 h-4" />
                sales@itdorservices.com
              </a>
              <a
                href="tel:+16177129076"
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (617) 712-9076
              </a>
              <SocialLinksCard layout="row" />
            </div>
          </div>

          {/* Application Support */}
          <div>
            <h4 className="font-semibold mb-4">Application Support</h4>
            <ul className="space-y-3">
              {footerLinks.applicationSupport.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors line-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Software Development */}
          <div>
            <h4 className="font-semibold mb-4">Software Development</h4>
            <ul className="space-y-3">
              {footerLinks.devServices.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors line-hover"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors line-hover"
                  >
                    {link.label}
                  </Link>
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
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-foreground transition-colors line-hover"
                  >
                    {link.label}
                  </Link>
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

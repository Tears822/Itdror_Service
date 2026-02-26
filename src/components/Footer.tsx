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
    <footer className="relative pt-8 pb-8 overflow-x-hidden bg-gradient-to-b from-teal-950 to-teal-950/95 text-white border-t border-teal-800/50">
      <div className="relative z-10 max-w-content mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Content – Consultport-style columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12 mb-14 items-start">
          {/* Brand + Get in touch */}
          <div className="lg:col-span-2 min-w-0 overflow-visible -mt-1">
            <Link
              href="/"
              className="inline-block mb-1 -mt-2 focus:outline-none focus:ring-1 focus:ring-teal-400/40 focus:ring-inset rounded"
            >
              <Image
                src="/assets/logo.png"
                alt="ITDor Services Logo"
                width={800}
                height={200}
                className="h-32 w-auto max-w-[280px] object-contain opacity-95 hover:opacity-100 transition-opacity outline-none border-0"
              />
            </Link>
            <p className="text-teal-200/80 text-sm leading-relaxed mb-6 max-w-xs">
              Software development and application support in one team.
              Delivered remotely build and support wherever you are.
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-300/70 mb-3">Get in touch</p>
            <div className="space-y-3 mb-5">
              <a
                href="mailto:sales@itdorservices.com"
                className="flex items-center gap-2 text-sm text-teal-200/80 hover:text-teal-200 transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                sales@itdorservices.com
              </a>
              <a
                href="tel:+16177129076"
                className="flex items-center gap-2 text-sm text-teal-200/80 hover:text-teal-200 transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                +1 (617) 712-9076
              </a>
            </div>
            <SocialLinksCard layout="row" />
          </div>

          {/* Application Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Application Support</h4>
            <ul className="space-y-3">
              {footerLinks.applicationSupport.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-200/80 hover:text-teal-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Software Development */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Software Development</h4>
            <ul className="space-y-3">
              {footerLinks.devServices.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-200/80 hover:text-teal-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-200/80 hover:text-teal-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-200/80 hover:text-teal-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-teal-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-teal-200/70">
            © {new Date().getFullYear()} IT Dor Services. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-900/80 hover:bg-teal-800 text-sm font-medium text-teal-100 hover:text-white transition-colors border border-teal-700/50"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

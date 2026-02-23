"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RidgeButton } from "./RidgeButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-4 md:top-6 z-50 flex justify-center px-3 md:px-6"
      >
        <div
          className={clsx(
            "w-full max-w-4xl rounded-xl md:rounded-2xl px-4 md:px-8 transition-all duration-300",
            "border border-white/10 backdrop-blur-xl shadow-lg shadow-black/20",
            isScrolled ? "bg-background/80" : "bg-background/40"
          )}
        >
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3 shrink-0 min-w-0"
            >
              <Image
                src="/assets/logo.png"
                alt="ITDor Services Logo"
                width={200}
                height={56}
                className="object-contain h-12 w-auto max-h-full"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={clsx(
                    "px-5 py-3 text-base font-semibold rounded-xl transition-all duration-200",
                    (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
                      ? "text-accent underline underline-offset-4 decoration-2 decoration-accent"
                      : "text-muted hover:text-foreground hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-accent"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <RidgeButton href="/contact">Get Started</RidgeButton>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24"
          >
            <nav className="flex flex-col items-center gap-6 p-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "text-2xl font-semibold block py-2",
                      (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
                        ? "text-accent underline underline-offset-4 decoration-2 decoration-accent"
                        : "text-foreground hover:text-primary hover:underline hover:underline-offset-4 hover:decoration-2 hover:decoration-accent"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8" onClick={() => setIsMobileMenuOpen(false)}>
                <RidgeButton href="/contact">Get Started</RidgeButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

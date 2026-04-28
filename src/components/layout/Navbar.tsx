'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Photo', href: '#photo' },
  { name: 'Workflow', href: '#workflow' },
  { name: 'Team', href: '#team' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'News', href: '#news' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const checkScroll = useCallback(() => {
    // Check scroll > 50px
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Auto-detect dark sections
    const darkSections = document.querySelectorAll('#hero, #reviews, #footer, .dark-section');
    let isOverDark = false;

    // Get navbar element bounds
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
      const navRect = navbar.getBoundingClientRect();
      const navCenterY = navRect.top + navRect.height / 2;

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (navCenterY >= rect.top && navCenterY <= rect.bottom) {
          isOverDark = true;
        }
      });
    }

    setIsDarkSection(isOverDark);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', checkScroll, { passive: true });
    // Initial check
    checkScroll();

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [checkScroll]);

  // Handle body overflow when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);
    // Smooth scroll to section if it's a hash link
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-xl border-b
          ${isDarkSection
            ? 'bg-[rgba(10,10,10,0.96)] border-transparent'
            : 'bg-[rgba(255,255,255,0.96)] border-[rgba(0,0,0,0.08)]'}
          ${isScrolled ? 'py-2 shadow-sm' : 'py-4 shadow-none'}
        `}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {!logoError ? (
              <img
                src="/logo.svg"
                alt="Yearbook Logo"
                className={`h-[32px] w-auto transition-all duration-300 ${isDarkSection ? 'brightness-0 invert' : ''}`}
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className={`font-bold text-xl transition-colors duration-300 ${isDarkSection ? 'text-white' : 'text-dark'}`}>
                YEARBOOK
              </span>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`relative group text-[13px] font-medium transition-colors duration-300
                  ${isDarkSection ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-dark'}
                `}
              >
                {link.name}
                {/* Underline Animation */}
                <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className={`
              px-6 py-2.5 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300
              ${isDarkSection
                ? 'bg-white text-dark hover:bg-primary hover:text-white'
                : 'bg-dark text-white hover:bg-primary'}
              hover:-translate-y-[2px] hover:shadow-[0_4px_14px_0_rgba(230,0,92,0.39)]
            `}>
              START PROJECT
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`flex flex-col justify-center items-center w-[42px] h-[42px] rounded-lg border transition-colors duration-300
                ${isDarkSection ? 'border-white/20' : 'border-gray-200'}
              `}
              aria-label="Open menu"
            >
              <span className={`block w-[18px] h-[2px] mb-[4px] rounded-full transition-colors ${isDarkSection ? 'bg-white' : 'bg-dark'}`} />
              <span className={`block w-[18px] h-[2px] mb-[4px] rounded-full transition-colors ${isDarkSection ? 'bg-white' : 'bg-dark'}`} />
              <span className={`block w-[18px] h-[2px] rounded-full transition-colors ${isDarkSection ? 'bg-white' : 'bg-dark'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-[rgba(10,10,10,0.98)] flex flex-col"
          >
            {/* Header / Close */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-[28px] font-bold text-white hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Bottom Button */}
            <div className="p-8 flex justify-center pb-12">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold tracking-wide hover:-translate-y-1 hover:shadow-[0_4px_14px_0_rgba(230,0,92,0.39)] transition-all duration-300"
              >
                Start Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

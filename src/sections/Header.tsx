"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Logo from "@/assets/Logo.png";
import MenuIcon from "@/assets/HugeiconsMenuSquare.png";
import deleteIcon from "@/assets/delete.png";
import help from "@/assets/Help.png";
import blog from "@/assets/Blog.png";
import about from "@/assets/About.png";
import features from "@/assets/Features.png";
import customers from "@/assets/Customers.png";
import { ArrowRightCircleIcon } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { src: about, alt: "About", label: "About", href: "/about" },
    { src: features, alt: "Features", label: "Features", href: "/features" },
    { src: customers, alt: "Customers", label: "Customers", href: "/customers" },
    { src: blog, alt: "Blog", label: "Blog", href: "/blog" },
    { src: help, alt: "Help", label: "Help", href: "/help" },
  ];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    restDelta: 0.5,
  });

  // Scroll detection to hide/show the header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Hide header on scroll down
      } else {
        setIsVisible(true); // Show header on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 w-full z-20 backdrop-blur-sm transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Section */}
      <div className="flex justify-center items-center py-3 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white text-sm font-medium gap-3 opacity-90 hover:opacity-100">
        <p className="hidden md:block opacity-70">
          Share your thoughts freely, without revealing your identity.
        </p>
        <div className="flex gap-1 items-center">
          <p>Start a conversation</p>
          <ArrowRightCircleIcon className="h-4 w-4" />
        </div>
      </div>

      {/* Main Section */}
      <div className="py-5 bg-transparent backdrop:blur-3xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="Emarah" height={56} width={56} className="rounded" />
            <div className="md:hidden">
              <Image
                src={isMenuOpen ? deleteIcon : MenuIcon}
                alt={isMenuOpen ? "Close Menu" : "Menu Icon"}
                height={24}
                width={24}
                className="h-6 w-6 cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
            <nav className="hidden md:flex gap-6 text-black/80 items-center">
              {menuItems.map((item, index) => (
                <a key={index} href={item.href} className="hover:text-black">
                  {item.label}
                </a>
              ))}
              <button className="btn btn-primary text-white">Get for free</button>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-[52px] right-0 h-auto w-full max-w-sm bg-white p-5 z-30 shadow-lg border-none rounded-lg backdrop-blur-md"
          >
            <div className="flex justify-end">
              <Image
                src={deleteIcon}
                alt="Close Menu"
                height={24}
                width={24}
                className="cursor-pointer"
                onClick={toggleMenu}
              />
            </div>
            {menuItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="flex items-center gap-3 text-gray-700 hover:text-gray-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Image src={item.src} alt={item.alt} height={24} width={24} />
                <span>{item.label}</span>
              </motion.a>
            ))}
            <button className="btn btn-primary mt-4 text-white bg-gradient-to-r from-blue-500 to-indigo-600">
              Get for free
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

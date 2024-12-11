"use client";

import React from "react";
import Image from "next/image";
import socialX from "@/assets/social-x.png";
import socialPin from "@/assets/social-pin.png";
import socialInsta from "@/assets/social-insta.png";
import socialYoutube from "@/assets/social-youtube.png";
import socialDiscord from "@/assets/social-discord.png";
import logo from "@/assets/Logo.png";

const Footer = () => {
  const menuItems = [
    { alt: "About", label: "About", href: "/about" },
    { alt: "Features", label: "Features", href: "/features" },
    { alt: "Customers", label: "Customers", href: "/customers" },
    { alt: "Blog", label: "Blog", href: "/blog" },
    { alt: "Help", label: "Help", href: "/help" },
  ];

  const imageItems = [
    { src: socialX, alt: "Social X", href: "" },
    { src: socialYoutube, alt: "Social YouTube", href: "" },
    { src: socialInsta, alt: "Social Instagram", href: "" },
    { src: socialDiscord, alt: "Social Discord", href: "" },
    { src: socialPin, alt: "Social Pinterest", href: "" },
  ];

  return (
    <footer className="bg-gradient-to-t from-black via-gray-900 to-gray-800 text-gray-400 text-sm py-10">
      <div className="container mx-auto px-4 text-center">
        {/* Logo Section */}
        <div className="flex justify-center items-center mb-6">
          <Image src={logo} alt="Logo" width={40} height={40} className="rounded-full" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row justify-center gap-6 mt-6">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="hover:text-white transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Social Media Links */}
        <div className="flex justify-center gap-4 mt-6">
          {imageItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="hover:scale-110 transition-transform duration-300"
            >
              <Image src={item.src} alt={item.alt} width={24} height={24} />
            </a>
          ))}
        </div>

        {/* Footer Text */}
        <p className="mt-6 text-gray-500 hover:text-gray-300 transition-colors duration-300">
          &copy; 2024 Emarah Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

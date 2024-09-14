"use client";

import React from "react";
import Image from "next/image";
import socialX from "@/assets/social-x.png";
import socialPin from "@/assets/social-pin.png";
import socialInsta from "@/assets/social-insta.png";
import socialYoutube from "@/assets/social-youtube.png";
import socialDiscord from "@/assets/social-discord.png";
import { CircuitBoardIcon } from "lucide-react";

const Footer = () => {
  const menuItems = [
    { alt: "About", label: "About", href: "/about" },
    { alt: "Features", label: "Features", href: "/features" },
    { alt: "Customers", label: "Customers", href: "/customers" },
    { alt: "Blog", label: "Blog", href: "/blog" },
    { alt: "Help", label: "Help", href: "/help" },
  ];

  const imageItems = [
    { src: socialX, alt: "Social X", label: "Social X", href: "" },
    {
      src: socialYoutube,
      alt: "Social Youtube",
      label: "Social Youtube",
      href: "",
    },
    {
      src: socialInsta,
      alt: "Social Instagram",
      label: "Social Instragram",
      href: "",
    },
    {
      src: socialDiscord,
      alt: "Social Discord",
      label: "Social Discord",
      href: "",
    },
    {
      src: socialPin,
      alt: "Social Pinterest",
      label: "Social Pinterest",
      href: "",
    },
  ];

  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className='inline-flex relative before:content-[""] before:top-0 before:bottom-0 before:h-full before:blur before:w-full before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE,#FB92CF)] before:absolute'>
          <CircuitBoardIcon className="h-10 w-10 relative text-black" />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          {menuItems.map((item, index) => (
            <a key={index} href={item.href} className="hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          {imageItems.map((item, index) => (
            <a key={index} href={item.href}>
              <Image src={item.src} alt={item.alt} width={24} height={24} />
            </a>
          ))}
        </div>
        <p className="mt-6">&copy; 2024 Emarah.Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

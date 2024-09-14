"use client";

import React from "react";
import Header from "@/sections/Header";
import Hero from "@/sections/Hero-Section";
import LogoTicker from "@/sections/LogoTicker";
import ProductShowcase from "@/sections/ProductShowcase";
import Pricing from "@/sections/Pricing";
import Testimonials from "@/sections/Testimonials";
import CallToAction from "@/sections/CallToAction";
import Footer from "@/sections/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="progress-bar z-[999]"
      ></motion.div>
      <Header />
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}

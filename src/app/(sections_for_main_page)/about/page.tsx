"use client";

import React from "react";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

const About = () => {
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
      <section className="bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip py-24">
        <div className="container mx-auto px-6 sm:px-12 lg:px-24">
          {/* Section 1 */}
          <div className="section-heading text-center">
            <div className="flex justify-center">
              <div className="tag text-sm font-medium ">
                Your Safe Space for Anonymous Expression
              </div>
            </div>
            <h2 className="section-title mt-5 text-3xl sm:text-4xl font-extrabold">
              Welcome to Emarah: Anonymity, Security, and Innovation
            </h2>
            <p className="section-description mt-5 text-lg sm:text-xl leading-relaxed">
              Emarah, a platform designed to empower you with the freedom of
              expression in a secure and anonymous environment. Whether you're
              sharing thoughts, seeking advice, or just exploring new ideas,
              Emarah provides a space where you can communicate without the
              fear of being judged or identified.
            </p>
          </div>

          {/* Section 2 */}
          <div className="section-heading mt-16 text-center">
            <h2 className="section-title text-3xl sm:text-4xl font-extrabold">
              Secure and Anonymous Connections
            </h2>
            <p className="section-description mt-5 text-lg sm:text-xl leading-relaxed">
              At Emarah, we understand the importance of privacy. That&rsquo;s
              why we&rsquo;ve built our platform with top-notch security
              measures to ensure your anonymity is always protected. Your
              messages are encrypted and safely stored, giving you peace of
              mind as you connect with others.
            </p>
          </div>

          {/* Section 3 */}
          <div className="section-heading mt-16 text-center">
            <h2 className="section-title text-3xl sm:text-4xl font-extrabold ">
              Join Emarah today, and experience a new way to connect, share, and
              explore.
            </h2>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
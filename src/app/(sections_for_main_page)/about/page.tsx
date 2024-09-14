"use client";

import React, { useRef } from "react";
import Header from "@/sections/Header";
import Footer from "@/sections/Footer";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import aboutPageImage from "@/assets/AboutPage.png";
import securityImage from "@/assets/security.png";

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
        <div className="container">
          <div className="section-heading">
            <div className="flex justify-center">
              <div className="tag">
                Your Safe Space for Anonymous Expression
              </div>
            </div>
            <h2 className="section-title mt-5">
              Welcome to Emarah: Anonymity, Security, and Innovation
            </h2>
            <p className="section-description mt-5">
              Emarah, a platform designed to empower you with the freedom of
              expression in a secure and anonymous environment. Whether you're
              sharing thoughts, seeking advice, or just exploring new ideas,
              Emarah provides a space where you can communicate without the fear
              of being judged or identified.
            </p>
          </div>
          <motion.div className="relative">
            <Image
              src={aboutPageImage}
              alt="About Page Image"
              className="mt-10 rounded-3xl"
              priority
            />
          </motion.div>
          <div className="section-heading">
            <h2 className="section-title mt-5">
              Secure and Anonymous Connections
            </h2>
            <p className="section-description mt-5">
              At Emarah, we understand the importance of privacy. That's why
              we've built our platform with top-notch security measures to
              ensure your anonymity is always protected. Your messages are
              encrypted and safely stored, giving you peace of mind as you
              connect with others.
            </p>
            <motion.div className="relative">
              <Image
                src={securityImage}
                height={500}
                width={500}
                alt="Security Image"
                className="mt-10 rounded-3xl"
              />
            </motion.div>
          </div>
          <div className="section-heading">
            <h2 className="section-title mt-5">
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

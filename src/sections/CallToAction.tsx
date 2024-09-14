"use client";

import React, { useRef } from "react";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import { ArrowRightCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Sign up for free today</h2>
          <p className="section-description mt-5">
            Experience the satisfaction of anonymous expression with a platform
            designed to capture your thoughts and inspire your voice.
          </p>
          <motion.img
            src={starImage.src}
            alt="star"
            width={360}
            height={360}
            className="absolute -left-[350px] -top-[137px]"
            style={{
              translateY,
            }}
          />
          <motion.img
            src={springImage.src}
            alt="spring"
            width={360}
            height={360}
            className="absolute -right-[331px] -top-[19px]"
            style={{
              translateY,
            }}
          />
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary">Get for free</button>
          <button className="btn btn-text gap-1">
            <span>Learn more</span>
            <ArrowRightCircle size={18} className="mt-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

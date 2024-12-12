"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import cogImage from "@/assets/cog.png";
import noddleImage from "@/assets/noodle.png";
import cylinderImage from "@/assets/cylinder.png";
import { ArrowRightCircleIcon } from "lucide-react";

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={heroRef}
      className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="tag">Empowering Your Voice, Anonymously</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Experience new era of meaningful connections
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Experience a platform that values your voice and privacy. Emarah
              lets you send anonymous messages with ease, while AI suggestions
              enhance your communication, all in a secure and private
              environment.
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <button className="btn btn-primary">Get for free</button>
              <button className="btn btn-text gap-1">
                <span>Learn more</span>
                <ArrowRightCircleIcon size={18} className="mt-1 text-black" />
              </button>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.div
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-[50%]"
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                times: [0, 1],
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Image src={cogImage} alt="Cog Image" width={500} height={500} />
            </motion.div>
            <motion.div
              className="hidden md:block md:absolute -top-8 left-[25%]"
              style={{
                translateY: translateY,
              }}
            >
              <Image
                src={cylinderImage}
                alt="Cylinder Image"
                width={220}
                height={220}
              />
            </motion.div>
            <motion.div
              className="hidden lg:block absolute top-[524px] left-[70%]"
              style={{
                rotate: "30deg",
                translateY: translateY,
              }}
            >
              <Image
                src={noddleImage}
                alt="Noddle Image"
                width={220}
                height={220}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

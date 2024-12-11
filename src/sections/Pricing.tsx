"use client";

import React from "react";
import { CheckIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const pricingTiers = [
  {
    title: "Community",
    monthlyPrice: 0,
    buttonText: "Join for free",
    popular: false,
    inverse: false,
    features: [
      "Completely free access",
      "Unlimited anonymous messaging",
      "Basic AI-powered suggestions",
    ],
  },
  {
    title: "Supporter",
    monthlyPrice: 5,
    buttonText: "Contribute now",
    popular: true,
    inverse: true,
    features: [
      "All Community features",
      "Enhanced AI suggestions",
      "Priority bug fixes",
      "Early access to new tools",
      "Support the platform's growth",
    ],
  },
  {
    title: "Sponsor",
    monthlyPrice: 15,
    buttonText: "Become a sponsor",
    popular: false,
    inverse: false,
    features: [
      "All Supporter features",
      "Custom branding options",
      "API access for automation",
      "Feature prioritization",
      "Direct collaboration opportunities",
      "Help sustain free access for all users",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Plans & Support</h2>
          <p className="section-description mt-5">
            Empowering everyone with free and accessible tools. Support us to help the platform grow and thrive.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(
            ({
              title,
              monthlyPrice,
              buttonText,
              popular,
              inverse,
              features,
            }) => (
              <div
                className={twMerge(
                  "card",
                  inverse === true && "border-black bg-black text-white"
                )}
                key={title}
              >
                <div className="flex justify-between">
                  <h3
                    className={twMerge(
                      "text-lg font-bold text-black/50",
                      inverse === true && "text-white/60"
                    )}
                  >
                    {title}
                  </h3>
                  {popular === true && (
                    <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                      <motion.span
                        className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                        animate={{
                          backgroundPositionX: "-100%",
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "linear",
                          repeatType: "loop",
                        }}
                      >
                        Popular
                      </motion.span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt-[30px]">
                  <span className="text-4xl font-bold tracking-tighter leading-none">
                    ${monthlyPrice}
                  </span>
                  <span
                    className={twMerge(
                      "tracking-tight font-bold text-black/50",
                      inverse === true && "text-white/60"
                    )}
                  >
                    /month
                  </span>
                </div>
                <button
                  className={twMerge(
                    "btn btn-primary w-full mt-[30px]",
                    inverse === true && "bg-white text-black"
                  )}
                >
                  {buttonText}
                </button>
                <ul className="flex flex-col gap-5 mt-8">
                  {features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center gap-4">
                      <CheckIcon className="h-6 w-6" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

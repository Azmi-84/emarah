'use client'

import React from 'react'
import Image from 'next/image'
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";
import avatar7 from "@/assets/avatar-7.png";
import avatar8 from "@/assets/avatar-8.png";
import avatar9 from "@/assets/avatar-9.png";
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const testimonials = [
  {
    text: "Emarah allows me to share my thoughts freely, without any worries about privacy.",
    imageSrc: avatar1.src,
    name: "Alex Parker",
    username: "@alexparkeranon",
  },
  {
    text: "The anonymous messaging feature has made open communication easier for our team.",
    imageSrc: avatar2.src,
    name: "Jordan Taylor",
    username: "@jtaylor",
  },
  {
    text: "Emarah's AI suggestions have made it simpler to convey exactly what I want to say.",
    imageSrc: avatar3.src,
    name: "Morgan Reed",
    username: "@mreedinsights",
  },
  {
    text: "The anonymity and privacy features are exactly what I've been looking for.",
    imageSrc: avatar4.src,
    name: "Jamie Carter",
    username: "@jcartersec",
  },
  {
    text: "Sharing feedback anonymously has helped us improve team dynamics significantly.",
    imageSrc: avatar5.src,
    name: "Taylor Brooks",
    username: "@tbrooksfeedback",
  },
  {
    text: "Emarah is the perfect platform for open and honest communication.",
    imageSrc: avatar6.src,
    name: "Riley Quinn",
    username: "@rquinnopen",
  },
  {
    text: "Our team's collaboration has improved thanks to Emarah's anonymous messaging.",
    imageSrc: avatar7.src,
    name: "Jordan Wells",
    username: "@jwellsanon",
  },
  {
    text: "The platform's ease of use and security features are outstanding.",
    imageSrc: avatar8.src,
    name: "Sam Lee",
    username: "@samleeprivacy",
  },
  {
    text: "Emarah's intuitive design and AI suggestions have streamlined my communication.",
    imageSrc: avatar9.src,
    name: "Casey Miller",
    username: "@cmillerthoughts",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {className?: string; testimonials: typeof testimonials; duration?: number;}) => (
  <div className={ props.className }>
    <motion.div
    animate={{
      translateY: "-50%",
    }}
    transition={{
      duration: props.duration || 10,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
    }}
     className='flex flex-col gap-6 pb-6'>
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, imageSrc, name, username }) => (
          <div className='card'>
            <div>{text}</div>
              <div className='flex items-center gap-2 mt-5'>
                <Image src={imageSrc} alt={name} width={40} height={40} className='h-10 w-10 rounded-s-full'/>
                  <div className='flex flex-col'>
                    <div className='leading-5 tracking-tight font-medium'>{name}</div>
                    <div className='leading-5 tracking-tight'>{username}</div>
                </div>
              </div>
            </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
)

const Testimonials = () => {
  return (
    <section className='bg-white'>
      <div className='container'>
        <div className='section-heading'>
          <div className='flex justify-center'>
            <div className='tag'>Testimonials</div>
          </div>
          <h2 className='section-title mt-5'>What our users say</h2>
          <p className='section-description mt-5'>
            From intuitive design to powerful features, our app has become an essential tool for users around the world.
          </p>
        </div>
        <div className='flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden'>
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className='hidden md:block' duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className='hidden lg:block' duration={17} />
        </div>
      </div>
    </section>
  )
}

export default Testimonials
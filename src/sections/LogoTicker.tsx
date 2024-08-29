'use client'

import React from 'react'
import Image from 'next/image'
import acmeLogo from '@/assets/logo-acme.png'
import echoLogo from '@/assets/logo-echo.png'
import appexLogo from '@/assets/logo-apex.png'
import pulseLogo from '@/assets/logo-pulse.png'
import quantumLogo from '@/assets/logo-quantum.png'
import celestialLogo from '@/assets/logo-celestial.png'
import { motion } from 'framer-motion'

const LogoTicker = () => {
  return (
    <div className='py-8 md:py-12 bg-white'>
      <div className='container'>
        <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]'>
          <motion.div
            className='flex flex-none gap-14 pr-14'
            animate={{
              translateX: "-50%"
            }}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'loop'
            }}
          >
            {[acmeLogo, echoLogo, appexLogo, pulseLogo, quantumLogo, celestialLogo].map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt={`${logo} Logo`}
                width={150} // Adjust the width to your desired size
                height={75} // Adjust the height to your desired size
                className='logo-ticker-image'
              />
            ))}
            {[acmeLogo, echoLogo, appexLogo, pulseLogo, quantumLogo, celestialLogo].map((logo, index) => (
              <Image
                key={index + 6} // Adding 6 to ensure unique keys for the second set of images
                src={logo}
                alt={`${logo} Logo`}
                width={150} // Adjust the width to your desired size
                height={75} // Adjust the height to your desired size
                className='logo-ticker-image'
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LogoTicker

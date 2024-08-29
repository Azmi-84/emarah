'use client'

import React from 'react'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import { motion, useScroll, useSpring } from 'framer-motion'

const blog = () => {

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
    <motion.div style={{scaleX}} className='progress-bar z-[999]'></motion.div>
    <Header />
    <section className='bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip'>
      <div className='container'>
        <div className='section-heading'>
          <div className='flex justify-center'>
            <div className='tag'>Shaping the Future of Communication</div>
          </div>
          <h2 className='section-title mt-5'>Emarah’s Role in Evolving Communication</h2>
          <p className='section-description mt-5'>As technology advances, so does the way we communicate. In this post, we explore Emarah’s vision for the future of communication, discussing how platforms like ours are redefining the way people connect, share, and express themselves anonymously in the digital age.
        </p>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}

export default blog
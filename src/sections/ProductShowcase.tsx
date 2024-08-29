'use client'

import React from 'react'
import Image from 'next/image'
import { useRef } from 'react'
import tubeImage from '@/assets/tube.png'
import pyramidImage from '@/assets/pyramid.png'
import { motion, useScroll, useTransform } from 'framer-motion'
import productImage from '@/assets/product-image.png'

const ProductShowcase = () => {

    const sectionRef = useRef(null)
    const {scrollYProgress} = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    })
    const translate = useTransform(scrollYProgress, [0, 1], [150, -150])

  return (
    <section ref={sectionRef} className='bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip'>
        <div className='container'>
            <div className='section-heading'>
                <div className='flex justify-center'>
                    <div className='tag'>Enhance Your Anonymous Experience</div>
                </div>
                <h2 className='section-title mt-5'>A Smarter Way to Share Your Thoughts</h2>
                <p className='section-description mt-5'>Effortlessly share your ideas, concerns, and insights anonymously with Emarah's sleek, responsive platform.</p>
            </div>
            <div className='relative'>
                <Image src={productImage} alt='Product Image' className='mt-10' />
                {/* TODO: hove to fix the product Image according to my dashboard */}
                <motion.img src={pyramidImage.src} height={262} width={262} alt='Pyramid Image' className='hidden md:block absolute -right-36 -top-32'
                style={{
                    translateY: translate
                }}
                />
                <motion.img src={tubeImage.src} height={248} width={248} alt='Tube Image' className='hidden md:block absolute bottom-24 -left-36' 
                style={{
                    translateY: translate
                }}
                />
            </div>
        </div>
    </section>
  )
}

export default ProductShowcase
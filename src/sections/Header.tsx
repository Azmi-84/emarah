'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import Logo from '@/assets/Logo.png'
import MenuIcon from '@/assets/HugeiconsMenuSquare.png'
import deleteIcon from '@/assets/delete.png'
import help from '@/assets/Help.png'
import blog from '@/assets/Blog.png'
import about from '@/assets/About.png'
import features from '@/assets/Features.png'
import customers from '@/assets/Customers.png'
import { ArrowRightCircleIcon } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { src: about, alt: 'About', label: 'About', href: '/about' },
    { src: features, alt: 'Features', label: 'Features', href: '/features' },
    { src: customers, alt: 'Customers', label: 'Customers', href: '/customers' },
    { src: blog, alt: 'Blog', label: 'Blog', href: '/blog' },
    { src: help, alt: 'Help', label: 'Help', href: '/help' },
  ]

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    restDelta: 0.5,
  })

  return (
    <header className='sticky top-0 backdrop-blur-sm z-20'>
      <div className='flex justify-center items-center py-3 bg-black text-white text-sm font-medium gap-3'>
        <p className='hidden md:block text-white/60'>Share your thoughts freely, without revealing your identity.</p>
        <div className='inline-flex gap-1 items-center'>
          <p>Start a conversation</p>
          <ArrowRightCircleIcon className='h-4 w-4 inline-flex justify-center items-center' />
        </div>
      </div>
      <div className='py-5'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center justify-between'>
            <Image src={Logo} alt='Emarah' height={40} width={40} />
            <div className='md:hidden'>
              {isMenuOpen ? (
                <Image
                  src={deleteIcon}
                  alt='Close Menu'
                  height={24}
                  width={24}
                  className='h-6 w-6 cursor-pointer'
                  onClick={toggleMenu}
                />
              ) : (
                <Image
                  src={MenuIcon}
                  alt='Menu Icon'
                  height={24}
                  width={24}
                  className='h-6 w-6 cursor-pointer'
                  onClick={toggleMenu}
                />
              )}
            </div>
            <nav className='hidden md:flex gap-6 text-black/60 items-center'>
              {menuItems.map((item, index) => (
                <a key={index} href={item.href} className='hover:text-black'>
                  {item.label}
                </a>
              ))}
              <button className='btn btn-primary'>Get for free</button>
            </nav>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='fixed top-[52px] -right-1 h-auto w-3/4 max-w-40 bg-transparent p-5 -z-30 flex flex-col gap-4 md:hidden shadow-lg border-none rounded-lg backdrop-blur-3xl'
          >
            <div className='flex justify-end'>
              <Image src={deleteIcon} alt='Close Menu' height={24} width={24} className='cursor-pointer' onClick={toggleMenu} />
            </div>
            {menuItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className='flex items-center gap-2 text-black/80'
                initial={{ opacity: 0.7 }}
              >
                <Image src={item.src} alt={item.alt} height={24} width={24} />
                <span className='hover:text-black'>{item.label}</span>
              </motion.a>
            ))}
            <button className='btn btn-primary mt-auto'>Get for free</button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

"use client";
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';


// Animation variants for the menu
export const menuSlide = {
  initial: { x: "100%" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: { x: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
};

// Link Component
const Link = ({ data, isActive, setSelectedIndicator, children }) => {
  const { href, index } = data;
  
  return (
    <motion.a
      href={href}
      className="relative flex items-center py-4 text-5xl md:text-6xl font-bold tracking-tight transition-colors duration-500"
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      whileHover={{ 
        x: 10,
        transition: { duration: 0.3 }
      }}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: 1.0 + (index * 0.15),
        ease: [0.215, 0.61, 0.355, 1]
      }}
    >
      {children}
    </motion.a>
  );
};

// Curve Component (simplified)
const Curve = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[#0d0d0d]">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path 
          className="fill-gray-900" 
          d="M0,0 C50,0 50,100 100,100 L100,0 Z" 
        />
      </svg>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <div className="mt-12 pt-6 border-t border-white/10">
      <div className="flex flex-wrap gap-6 justify-between">
        {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map((item, index) => (
          <motion.a
            key={index}
            href="#"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.0 + (index * 0.1) }}
            whileHover={{ y: -3, color: "#4ade80" }}
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
          >
            {item}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// DynamicText Component for letter-by-letter animation
const DynamicText = ({ text, delay = 0, className = "", onHover }) => {
  const letters = text.split("");
  
  return (
    <span className={`inline-block ${className}`} onMouseEnter={onHover}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            transition: {
              delay: delay + (index * 0.03),
              duration: 0.5,
              ease: [0.215, 0.61, 0.355, 1]
            }
          }}
          exit={{ 
            opacity: 0, 
            y: -20,
            transition: { duration: 0.2 } 
          }}
          whileHover={{
            y: -5,
            color: "#4ade80",
            transition: { duration: 0.2 }
          }}
          className="inline-block origin-center"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

// Main Navigation Component
export default function Index({ isActive, onNavClick }) {
  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Close menu when clicking on a link
  useEffect(() => {
    const handleClick = () => {
      if (isActive) {
        onNavClick(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isActive, onNavClick]);

  const navItems = [
    {
      title: "Work",
      href: "#work",
    },
    {
      title: "About",
      href: "#about",
    },
    {
      title: "Contact",
      href: "#contact-me",
    },
  ]

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div 
          variants={menuSlide} 
          initial="initial" 
          animate="enter" 
          exit="exit" 
          className="fixed right-0 top-0 h-screen w-full sm:w-[480px] z-50"
        >
          {/* Gradient Glassmorphism Background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/90 to-black/95 backdrop-blur-2xl border-l border-white/10"
          />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute -left-20 top-1/4 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="absolute -left-10 bottom-1/3 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"
            />
          </div>

          <div className="relative h-full flex flex-col justify-between py-12 px-8 z-10">
            {/* Header */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="border-b border-white/10 pb-6 mb-8"
            >
              <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-2">
                <DynamicText text="Navigation" delay={0.5} />
              </p>
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400"
              >
                <DynamicText text="Explore My Portfolio" delay={0.9} />
              </motion.h2>
            </motion.div>

            {/* Navigation Items */}
            <motion.div 
              onMouseLeave={() => { 
                setSelectedIndicator(pathname); 
                setHoveredItem(null);
              }} 
              className="flex-1 flex flex-col justify-center space-y-8"
            >
              {navItems.map((data, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.0 + (index * 0.15),
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  whileHover={{ 
                    x: 10,
                    transition: { duration: 0.3 }
                  }}
                  onMouseEnter={() => {
                    setHoveredItem(index);
                    setSelectedIndicator(data.href);
                  }}
                  className="relative group"
                >
                  {/* Animated underline */}
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ 
                      width: selectedIndicator === data.href ? "100%" : "0%",
                      transition: { duration: 0.4 }
                    }}
                    className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  />
                  
                  {/* Navigation link */}
                  <Link 
                    data={{...data, index}} 
                    isActive={selectedIndicator === data.href} 
                    setSelectedIndicator={setSelectedIndicator}
                  >
                    <div className="overflow-hidden">
                      <motion.span 
                        className="text-5xl md:text-6xl font-bold tracking-tight"
                      >
                        <DynamicText 
                          text={data.title} 
                          delay={1.2 + (index * 0.2)}
                          className={`transition-all duration-500 ${
                            selectedIndicator === data.href 
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400" 
                              : "text-white/80 group-hover:text-white"
                          }`}
                          onHover={() => {
                            setHoveredItem(index);
                            setSelectedIndicator(data.href);
                          }}
                        />
                      </motion.span>
                    </div>
                  </Link>
                  
                  {/* Hover indicator */}
                  <AnimatePresence>
                    {hoveredItem === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -left-6 top-1/2 transform -translate-y-1/2"
                      >
                        <div className="w-3 h-3 bg-cyan-400 rounded-full glow" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.8 }}
            >
              <Footer />
            </motion.div>
          </div>

          {/* Curve animation */}
          <Curve />

          <style jsx global>{`
            .glow {
              box-shadow: 0 0 15px rgba(34, 211, 238, 0.5), 
                          0 0 30px rgba(34, 211, 238, 0.3);
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
"use client";
import me from "../Header/reall.jpeg"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Timelocal from "@/utils/Timelocal";
import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

const FuturisticIntroCard = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  
  // Element refs for position tracking
  const profileRef = useRef(null);
  const nameRef = useRef(null);
  const badgeRef = useRef(null);
  const emailRef = useRef(null);
  const githubRef = useRef(null);
  const twitterRef = useRef(null);
  const aboutRef = useRef(null);

  const sections = [
    { ref: profileRef, name: 'profile', duration: 2.5 },
    { ref: nameRef, name: 'name', duration: 2.0 },
    { ref: badgeRef, name: 'badge', duration: 1.8 },
    { ref: emailRef, name: 'email', duration: 2.2 },
    { ref: githubRef, name: 'github', duration: 1.6 },
    { ref: twitterRef, name: 'twitter', duration: 1.6 },
    { ref: aboutRef, name: 'about', duration: 2.8 }
  ];

  // Check for mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation loop
  useEffect(() => {
  const nextSection = () => {
    setActiveSection(prev => (prev + 1) % sections.length);
  };

  const timer = setTimeout(nextSection, sections[activeSection].duration * 1000);

  return () => clearTimeout(timer);
}, [activeSection]);


  // Get element position relative to card
const getElementPosition = (elementRef) => {
  if (!elementRef.current || !cardRef.current) return { x: 0, y: 0, width: 0, height: 0 };
  
  const cardRect = cardRef.current.getBoundingClientRect();
  const elementRect = elementRef.current.getBoundingClientRect();
  
  return {
    x: elementRect.left - cardRect.left,
    y: elementRect.top - cardRect.top,
    width: elementRect.width || 100,   // fallback width
    height: elementRect.height || 50,  // fallback height
  };
};

  const currentSection = sections[activeSection];
  const spotlightPosition = getElementPosition(currentSection.ref);

  return (
    <div className="flex bg-black items-center justify-center min-h-screen p-4 ">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-4xl mx-auto bg-black backdrop-blur-xl border border-white-500/20 rounded-3xl p-8  overflow-hidden shadow-2xl"
      >
        <div className="fixed top-8 right-10 text-white"> <Timelocal></Timelocal></div>
        {/* Animated Spotlight/Scanner */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: spotlightPosition.x - 40 ,
            y: spotlightPosition.y - 40 ,
            width: spotlightPosition.width + 16,
            height: spotlightPosition.height + 16
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeInOut",
            scale: { duration: 0.6 },
            opacity: { duration: 0.4 }
          }}
          className="absolute pointer-events-none z-10 rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-r from-cyan-400/5 via-blue-400/10 to-purple-400/5 shadow-lg"
          style={{
            boxShadow: `
              0 0 30px rgba(34, 211, 238, 0.4),
              inset 0 0 30px rgba(34, 211, 238, 0.1),
              0 0 60px rgba(139, 92, 246, 0.2)
            `
          }}
        >
          {/* Scanning line effect */}
          <motion.div
            animate={{ 
              x: [-20, spotlightPosition.width + 20, -20] ,
              
            }}
            transition={{ 
              duration: 2, 
              ease: "linear", 
              repeat: Infinity 
            }}
            className="absolute top-0 w-0.5 h-full bg-white to-transparent"
          />
          
        </motion.div>
         

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-400/60 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-400/60 rounded-br-lg" />

        {/* Main Content */}
        <div className="  flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          
          {/* Profile Image */}
          <motion.div
            
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <div  className="relative w-32 h-32 rounded-2xl overflow-hidden ring-2 ring-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
              <Image ref={profileRef}
                src={me}
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left space-y-4">
            
            {/* Name & Badge */}
            <div className="space-y-3">
              <motion.h1
                ref={nameRef}
                whileHover={{ scale: 1.02 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight"
              >
                Shiva
              </motion.h1>
              
              <motion.div
                ref={badgeRef}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                />
                <span className="text-green-300 font-medium text-sm md:text-base">Available</span>
              </motion.div>
            </div>

            {/* Role */}
            <p className="text-xl md:text-2xl text-white font-light">
              Software Engineer
            </p>

            {/* Email */}
            <motion.div
              ref={emailRef}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center md:justify-start gap-3 text-slate-300 group cursor-pointer"
            >
              <FaEnvelope className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors" />
              <span className="text-base md:text-lg group-hover:text-white transition-colors">
                Shivapanday9616527173@gmail.com
              </span>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <motion.a
                ref={githubRef}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/SHIWA6"
                className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <FaGithub className="w-6 h-6 text-slate-300 group-hover:text-cyan-400 transition-colors" />
              </motion.a>
              
              <motion.a
                ref={twitterRef}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://x.com/testcricforlife"
                
                className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <FaTwitter className="w-6 h-6 text-slate-300 group-hover:text-cyan-400 transition-colors" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* About Section */}
        <motion.div
          ref={aboutRef}
          whileHover={{ scale: 1.01 }}
          className="mt-8 md:mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-800/30 to-slate-700/30 border border-slate-600/30 backdrop-blur-sm"
        >
          <p className="text-white text-base md:text-lg leading-relaxed text-center md:text-left">
            I build full-stack apps that matter — currently exploring AI/ML and pushing boundaries 
            with design-first, production-ready projects. Passionate about creating seamless user 
            experiences and innovative solutions.
          </p>
        </motion.div>
       

        {/* Progress Indicator */}
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
          {sections.map((_, index) => (
            <motion.div
              key={index}
              animate={{
                scale: index === activeSection ? 1.5 : 1,
                opacity: index === activeSection ? 1 : 0.4,
              }}
              transition={{ duration: 0.3 }}
              className={`w-2 h-2 rounded-full ${
                index === activeSection ? 'bg-[#45f045]' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FuturisticIntroCard;
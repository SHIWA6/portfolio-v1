"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Timelocal from "@/utils/Timelocal";
import { SiLeetcode } from "react-icons/si";
import { GlowingEffect } from '../ui/glowing-effect';
import {FaLinkedin} from "react-icons/fa6";
import{FaGithub} from "react-icons/fa6";
import {FaTwitter} from "react-icons/fa6";
import {FaEnvelope} from "react-icons/fa6";




// 1. Extract the Spotlight to a standalone component to keep the main tree clean
// Using layoutId lets Framer handle the position interpolation automatically
const Spotlight = () => {
  return (
    <motion.div
      layoutId="active-spotlight"
      className="absolute inset-0 -m-3 pointer-events-none z-0 rounded-2xl border-2 bg-black border-red-500"
     
      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
    >
        {/* Scanning line effect - Optimized to use transforms */}
        
    </motion.div>
  );
};

const FuturisticIntroCard = () => {
  const [activeKey, setActiveKey] = useState('profile');
  const [isMobile, setIsMobile] = useState(false);

  // 2. Define data structure to map keys to durations
  // Logic remains: auto-rotate based on duration
  const sections = useMemo(() => [
    { id: 'profile', duration: 2.5 },
    { id: 'name', duration: 2.0 },
    { id: 'badge', duration: 1.8 },
    { id: 'email', duration: 2.2 },
    { id: 'github', duration: 1.6 },
    { id: 'twitter', duration: 1.6 },
    { id: 'leetcode', duration: 1.6 },
    { id: 'linkedin', duration: 1.6 },
    { id: 'about', duration: 2.8 }
  ], []);

  useEffect(() => {
    // Lightweight media query listener
    const mql = window.matchMedia('(max-width: 767px)');
    setIsMobile(mql.matches);
    const handle = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handle);
    return () => mql.removeEventListener('change', handle);
  }, []);

  useEffect(() => {
    const currentIndex = sections.findIndex(s => s.id === activeKey);
    const currentDuration = sections[currentIndex]?.duration || 2;
    
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % sections.length;
      setActiveKey(sections[nextIndex].id);
    }, currentDuration * 1000);

    return () => clearTimeout(timer);
  }, [activeKey, sections]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 1, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        // 3. Use easeOut and shorter duration for quicker LCP perception
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-4xl mx-auto bg-[#181818] backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-8 right-10 text-white z-20">
             <Timelocal />
        </div>

        {/* Decorative Corners - Static CSS is cheaper than JS logic */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/50 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/50 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/50 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/50 rounded-br-lg" />

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative z-10">
          
          {/* --- Profile Image --- */}
          <div className="relative group">
            {activeKey === 'profile' && <Spotlight />}
            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative w-32 h-32 rounded-2xl overflow-hidden ring-2 ring-white bg-black z-10"
            >
              {/* 4. PRIORITY ADDED for LCP Optimization */}
              <Image 
                src="/images/reall.webp" 
                alt="Profile" 
                width={160} 
                height={160} 
                priority={true}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </motion.div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            {/* --- Name & Badge --- */}
            <div className="space-y-3">
              <div className="relative inline-block">
                 {activeKey === 'name' && <Spotlight />}
                 <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight relative z-10">
                    Shiva
                 </h1>
              </div>
              
              <div className="block"></div>

              <div className="relative inline-flex">
                {activeKey === 'badge' && <Spotlight />}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-white backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                  />
                  <span className="text-white font-bold text-sm md:text-base">Active</span>
                </motion.div>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-white font-light">
              Software Engineer
            </p>

            {/* --- Email --- */}
            <div className="relative inline-block">
                {activeKey === 'email' && <Spotlight />}
                <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative z-10 flex items-center justify-center md:justify-start gap-3 text-slate-300 group cursor-pointer py-1 px-2 rounded-lg"
                >
                <FaEnvelope className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors" />
                <span className="text-base md:text-lg group-hover:text-white transition-colors">
                    Shivapanday9616527173@gmail.com
                </span>
                </motion.div>
            </div>

            {/* --- Social Links --- */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <SocialIcon 
                id="github" 
                activeKey={activeKey} 
                href="https://github.com/SHIWA6" 
                icon={<FaGithub className="w-6 h-6" />} 
              />
              <SocialIcon 
                id="twitter" 
                activeKey={activeKey} 
                href="https://x.com/testcricforlife" 
                icon={<FaTwitter className="w-6 h-6" />} 
              />
              <SocialIcon 
                id="leetcode" 
                activeKey={activeKey} 
                href="https://leetcode.com/SHIWA6" 
                icon={<SiLeetcode className="w-6 h-6" />} 
              />
              <SocialIcon 
                id="linkedin" 
                activeKey={activeKey} 
                href="https://www.linkedin.com/in/shiva-pandey-41978a308" 
                icon={<FaLinkedin className="w-6 h-6" />} 
              />
            </div>
          </div>
        </div>

        {/* --- About Section --- */}
        <div className="relative mt-8 md:mt-12">
            {activeKey === 'about' && <Spotlight />}
            <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative z-10 p-6 rounded-[1.25rem] bg-slate-800/30 border-2 border-black/50 backdrop-blur-sm"
            >
            {/* Note: Ensure GlowingEffect is optimized internally, or perform conditionally */}
            <div className="absolute inset-0 overflow-hidden rounded-[1.25rem]">
                 <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={4}
                />
            </div>
            <p className="relative z-20 text-white text-base md:text-lg leading-relaxed text-center md:text-left">
                I build full-stack apps -- that matter with design-first, production-ready projects. 
                Passionate about creating seamless user experiences and innovative solutions. 
                A problem solver, Critical thinker and I'm also preparing for GATE2027, Let's connect.
            </p>
            </motion.div>
        </div>

        {/* --- Progress Indicators --- */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              animate={{
                scale: activeKey === section.id ? 1.5 : 1,
                opacity: activeKey === section.id ? 1 : 0.4,
                backgroundColor: activeKey === section.id ? '#45f045' : '#475569'
              }}
              className="w-2 h-2 rounded-full cursor-pointer"
              onClick={() => setActiveKey(section.id)} // Added interactivity
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Sub-component to reduce repetition
const SocialIcon = ({ id, activeKey, href, icon }) => (
  <div className="relative">
      {activeKey === id && <Spotlight />}
      <motion.a
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        href={href}
        className="relative z-10 block p-3 rounded-xl bg-black border border-white hover:border-cyan-500/50 transition-colors group"
      >
        <div className="text-slate-300 group-hover:text-cyan-400 transition-colors">
            {icon}
        </div>
      </motion.a>
  </div>
);

export default FuturisticIntroCard;
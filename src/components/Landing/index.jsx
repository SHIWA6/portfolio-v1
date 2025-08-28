"use client";
import Image from "next/image";
import { useRef, useLayoutEffect, useState } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import ProfileCard from './ProfileCard'
  
export default function Index() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* 🔵 background div */}
      <div className="absolute inset-0">
        {/* यहाँ वही gradient/blur background code डालो जो पहले use किया था */}
        <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-3xl opacity-70" />
      </div>

      {/* 🟢 Profile card */}
      <div className="relative z-10">
        <ProfileCard
          name="Shiva Pandey"
          title="Full-Stack Devloper"
          handle="TestCricforLife"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/images/generated-image-portrait.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log('Contact clicked')}
        />
      </div>
    </div>
  );
}


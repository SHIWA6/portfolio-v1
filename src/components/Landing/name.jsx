"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const Name = () => {
  const nameRef = useRef(null);
  
  useEffect(() => {
    if (nameRef.current) {
      const myText = new SplitType(nameRef.current, { types: 'chars' });
      
      gsap.set(".char", {
        y: 100,
        opacity: 0,
        rotateX: -90,
        transformStyle: "preserve-3d"
      });
      
      gsap.to(".char", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        delay: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    }
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center mt-8 mb-12 px-4">
      {/* Decorative elements */}
      <div className="absolute -inset-x-10 -inset-y-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl opacity-70 z-0"></div>
      <div className="absolute w-40 h-40 bg-cyan-500/5 rounded-full -left-20 top-1/2 blur-2xl"></div>
      <div className="absolute w-40 h-40 bg-purple-500/5 rounded-full -right-20 top-1/2 blur-2xl"></div>
      
      <h1 
        ref={nameRef}
        className="mytext text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-300 text-center tracking-tight z-10"
      >
        SHIVA..
      </h1>
    </div>
  );
};

export default Name;
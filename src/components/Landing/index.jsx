"use client";
import Image from "next/image";
import { useRef, useLayoutEffect, useState } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

// DynamicText Component for animated text effects
const DynamicText = ({ text, delay = 0, className = "" }) => {
  const textRef = useRef(null);
  
  useLayoutEffect(() => {
    if (textRef.current) {
      const myText = new SplitType(textRef.current, { types: 'chars,words' });
      
      gsap.set(".char", {
        y: 50,
        opacity: 0,
        rotateX: -90,
        transformStyle: "preserve-3d"
      });
      
      gsap.to(".char", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.03,
        delay: delay,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }
  }, [text, delay]);

  return (
    <div ref={textRef} className={className}>
      {text}
    </div>
  );
};

// Name Component
const Name = () => {
  return (
    <div className="relative w-full flex justify-center items-center mt-2 mb-6 px-4">
      <div className="absolute -inset-x-10 -inset-y-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl opacity-70 z-0"></div>
      <div className="absolute w-40 h-40 bg-cyan-500/5 rounded-full -left-20 top-1/2 blur-2xl"></div>
      <div className="absolute w-40 h-40 bg-purple-500/5 rounded-full -right-20 top-1/2 blur-2xl"></div>
      
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-300 text-center tracking-tight z-10">
        <DynamicText text="SHIVA.." delay={0.4} />
      </h1>
    </div>
  );
};

// Main Landing Component
export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  let xPercent = 0;
  let direction = -1;

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  
  useLayoutEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
    
    return () => clearTimeout(timer);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  // Loading animation
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-2 border-white/20 rounded-full animate-ping"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() * 20 + 5 + 'px',
              height: Math.random() * 20 + 5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 205}, ${Math.random() * 0.3})`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-8 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Image section - Left side */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
            className="flex-1 relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Glassmorphism frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-3xl blur-xl opacity-70 z-0"></div>
              <div className="relative bg-gray-800/20 backdrop-blur-xl rounded-2xl p-3 border border-white/10 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10"></div>
                {isMobile ? (
                  <Image
                    src="/images/generated-image-portrait.png"
                    width={500}
                    height={500}
                    priority
                    alt="Developer portrait"
                    className="rounded-xl w-full h-auto relative z-0"
                  />
                ) : (
                  <Image
                    src="/images/generated-image-portrait.png"
                    width={900}
                    height={900}
                    priority
                    alt="Developer portrait"
                    className="rounded-xl w-full h-auto relative z-0"
                  />
                )}
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-blue-600/20 rounded-full blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-600/20 rounded-full blur-xl"></div>
          </motion.div>

          {/* Text content - Right side */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
              className="w-full"
            >
              {/* Welcome text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="mb-6"
              >
                <h2 className="text-2xl md:text-3xl font-light text-cyan-300/90 mb-3">
                  <DynamicText 
                    text="Hi👋 , I'm SHIVA PANDEY" 
                    delay={0.9}
                    className="text-white py-7"
                  />
                </h2>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "80px" }}
                  transition={{ duration: 1.2, delay: 1.4 }}
                  className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-4 mx-auto lg:mx-0"
                ></motion.div>
              </motion.div>
              
              {/* Name Component */}
              <Name />
              
              {/* Title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="mb-6"
              >
                <h2 className="text-xl md:text-2xl font-medium">
                  <DynamicText 
                    text="Full Stack Developer" 
                    delay={1.3}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
                  />
                </h2>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "64px" }}
                  transition={{ duration: 1.2, delay: 1.8 }}
                  className="h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mt-3 mx-auto lg:mx-0"
                ></motion.div>
              </motion.div>
              
              {/* Description */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="mb-8"
              >
                <p className="text-lg text-gray-300/90 max-w-md leading-relaxed">
                  <DynamicText 
                    text="I craft digital experiences that blend innovative technology with stunning design." 
                    delay={1.6}
                    className="items-center"
                  />
                </p>
                <p className="text-lg text-gray-300/90 max-w-md leading-relaxed mt-4">
                  <DynamicText 
                    text="With expertise in modern web development and a passion for creating seamless, performant applications." 
                    delay={1.9}
                    className=""
                  />
                </p>
              </motion.div>
              
              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 2.1 }}
                className="mb-8"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  <DynamicText 
                    text="Tech Stack" 
                    delay={2.2}
                    className=""
                  />
                </h3>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {['React', 'NextJS', 'Node', 'TypeScript', 'Tailwind', 'MongoDB', 'GraphQL', 'AWS'].map((tech, index) => (
                    <motion.span 
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 2.4 + (index * 0.1) }}
                      className="px-4 py-2 bg-gray-800/40 backdrop-blur-md text-cyan-200/90 rounded-full text-sm border border-cyan-500/30 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 2.8 }}
                className="flex flex-wrap gap-5 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 30px -5px rgba(59, 130, 246, 0.5)",
                    background: "linear-gradient(to right, #2563eb, #7c3aed)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-300 backdrop-blur-sm border border-blue-400/30"
                > <a href="https://github.com/SHIWA6?tab=repositories" target="_blank">
                  <span>View Projects</span> </a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 30px -5px rgba(156, 163, 175, 0.4)",
                    background: "rgba(31, 41, 55, 0.7)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 bg-gray-800/50 text-white rounded-xl font-medium border border-gray-600/40 hover:border-cyan-400/30 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                ><a href="https://mail.google.com/mail/?view=cm&fs=1&to=shivapanday9616527173@gmail.com" target="_blank">
                  <span>Contact Me</span> </a>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-25px) rotate(5deg);
            opacity: 1;
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        
        /* Glassmorphism effect */
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Subtle glow effect */
        .glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
        }
      `}</style>
    </motion.main>
  );
}
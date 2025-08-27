"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

export default function SkillsSection() {
  const container = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Skills" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Tools" },
  ];

  // Categorized skills
  const skills = {
    frontend: [
      { name: "HTML5", id: "html5", level: "Advanced" },
      { name: "CSS3", id: "css3", level: "Advanced" },
      { name: "JavaScript", id: "javascript", level: "Expert" },
      { name: "React", id: "react", level: "Expert" },
      { name: "Next.js", id: "next.js", level: "Advanced" },
      { name: "TailwindCSS", id: "tailwindcss", level: "Expert" },
    ],
    backend: [
      { name: "Node.js", id: "node.js", level: "Advanced" },
      { name: "Python", id: "python", level: "Intermediate" },
      { name: "MongoDB", id: "mongodb", level: "Intermediate" },
      { name: "PostgreSQL", id: "postgresql", level: "Intermediate" },
    ],
    tools: [
      { name: "Git", id: "git", level: "Advanced" },
      { name: "Docker", id: "docker", level: "Intermediate" },
      { name: "GitHub", id: "github", level: "Expert" },
      { name: "TypeScript", id: "typescript", level: "Advanced" },
    ]
  };

  // Get all skills
  const allSkills = [...skills.frontend, ...skills.backend, ...skills.tools];

  // Filter skills based on active category
  const filteredSkills = activeCategory === "all" ? allSkills : skills[activeCategory];

  // Slider functionality
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredSkills.length / 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredSkills.length / 4)) % Math.ceil(filteredSkills.length / 4));
  };

  // Group skills into slides for the slider
  const groupedSkills = [];
  for (let i = 0; i < filteredSkills.length; i += 4) {
    groupedSkills.push(filteredSkills.slice(i, i + 4));
  }

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-violet-600 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-medium"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-fast"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 5 + 2 + 'px',
              height: Math.random() * 5 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float${Math.floor(Math.random() * 3) + 1} ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: Math.random() * 5 + 's'
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
        >
          My <span className="text-white">Skills</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center text-purple-200 text-xl mb-12 max-w-2xl mx-auto"
        >
          Technologies I use to create amazing digital experiences
        </motion.p>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center mb-12 flex-wrap gap-4"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setCurrentSlide(0);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/10 text-purple-200 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Parallax Scrolling Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/20 via-violet-900/20 to-pink-900/20 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl shadow-purple-500/10 mb-16"
          ref={container}
        >
          <Slide direction="left" left="-120%" progress={scrollYProgress} skills={allSkills} />
          <Slide direction="right" left="-25%" progress={scrollYProgress} skills={allSkills} />
          <Slide direction="left" left="-75%" progress={scrollYProgress} skills={allSkills} />
        </motion.div>

        {/* Slider Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-r from-purple-900/20 via-violet-900/20 to-pink-900/20 backdrop-blur-2xl border border-white/10 p-8 shadow-2xl shadow-purple-500/10"
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">Browse Skills</h3>
          
          {/* Slider Navigation */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 text-white"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {groupedSkills.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "w-8 bg-purple-500" : "w-2 bg-white/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 text-white"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Slider Content */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ x: -currentSlide * 100 + '%' }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
            >
              {groupedSkills.map((slideSkills, index) => (
                <div key={index} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                  {slideSkills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: skillIndex * 0.1 }}
                      className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
                    >
                      <div className="rounded-3xl bg-gradient-to-br from-purple-900/40 via-violet-900/40 to-pink-900/40 p-5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/20 hover:shadow-purple-400/30 transition-all duration-500 h-full flex flex-col items-center">
                        <img
                          src={`https://readme-components.vercel.app/api?component=logo&logo=${skill.id}&fill=linear-gradient(to%20right,%23a78bfa,%22ec4899%22)&animation=spin`}
                          alt={skill.name}
                          height="80"
                          className="h-[80px] transform transition-transform duration-700 group-hover:rotate-12"
                        />
                        <h4 className="text-white font-bold mt-4 text-center">{skill.name}</h4>
                        <div className="text-xs text-purple-200 mt-2 text-center">{skill.level}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(15px) translateX(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        @keyframes pulse-medium {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        @keyframes pulse-fast {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.25; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        .animate-pulse-medium {
          animation: pulse-medium 6s infinite ease-in-out;
        }
        .animate-pulse-fast {
          animation: pulse-fast 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}

const Slide = ({ direction, left, progress, skills }) => {
  const dirMultiplier = direction === "left" ? -1 : 1;
  const translateX = useTransform(progress, [0, 1], [300 * dirMultiplier, -300 * dirMultiplier]);

  return (
    <motion.div
      style={{ x: translateX, left }}
      className="relative flex whitespace-nowrap w-max overflow-visible py-10"
    >
      <div className="flex flex-row gap-16 items-center px-5 min-w-max">
        {skills.map((skill, index) => (
          <div key={index} className="relative group cursor-pointer transform transition-all duration-500 hover:scale-110">
            <div className="rounded-3xl bg-gradient-to-br from-purple-900/40 via-violet-900/40 to-pink-900/40 p-5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-500/20 hover:shadow-purple-400/30 transition-all duration-500">
              <img
                src={`https://readme-components.vercel.app/api?component=logo&logo=${skill.id}&fill=linear-gradient(to%20right,%23a78bfa,%22ec4899%22)&animation=spin`}
                alt={skill.name}
                height="90"
                className="h-[90px] transform transition-transform duration-700 group-hover:rotate-12"
              />
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-purple-900/90 to-pink-900/90 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap shadow-2xl border border-white/10 backdrop-blur-sm">
              <div className="font-bold">{skill.name}</div>
              <div className="text-xs text-purple-200 mt-1">{skill.level}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
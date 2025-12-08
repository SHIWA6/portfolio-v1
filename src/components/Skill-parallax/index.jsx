"use client";
import React from "react";


import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import styles from "./style.module.scss";

export default function SkillsSection() {
  const container = useRef(null);

  // Sync scroll with framer
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);

    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return (
    <section className={`${styles.skills} py-16`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="overflow-hidden" ref={container}>
          <Slide direction="left" left="-33%" progress={scrollYProgress} isMobile={isMobile} />
          <Slide direction="right" left="-6%" progress={scrollYProgress} isMobile={isMobile} />
          <Slide direction="left" left="-5%" progress={scrollYProgress} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}

const Slide = ({ direction, left, progress, isMobile }) => {
  const shouldReduce = useReducedMotion();
  const dir = direction === "left" ? -1 : 1;

  // Disable parallax fully on mobile → MAJOR FPS BOOST
  if (isMobile) {
    return (
      <div className="flex gap-8 overflow-x-auto no-scrollbar py-6 pl-4">
        <PhraseMemo />
      </div>
    );
  }

  // Desktop parallax
  const translateX = useTransform(progress, [0, 1], [200 * dir, -200 * dir]);

  return (
    <motion.div
      style={{ x: shouldReduce ? 0 : translateX, left }}
      className="relative flex whitespace-nowrap w-max overflow-visible py-6"
    >
      <PhraseMemo />
    </motion.div>
  );
};

// ---------------- LOGOS SET ----------------
const logos = [
  { name: "HTML5", id: "html5" },
  { name: "CSS3", id: "css" },
  { name: "JavaScript", id: "javascript" },
  { name: "React", id: "react" },
  { name: "Next.js", id: "next" },
  { name: "MongoDB", id: "mongodb" },
  { name: "TailwindCSS", id: "tailwindcss" },
  { name: "Git", id: "git" },
  { name: "Docker", id: "docker" },
  { name: "PostgreSQL", id: "postgresql" },
  { name: "GitHub", id: "github" },
  { name: "TypeScript", id: "typescript" },
  { name: "Python", id: "python" },

  // EXTRA tech you added
  { name: "Node.js", id: "node" },
  { name: "Socket.io", id: "socket" },
  { name: "Prisma", id: "prisma" },
  { name: "Express.js", id: "express" },
  
  { name: "Cloudflare", id: "cloudflare" }
];

// ---------------- Phrase (memoized) ----------------

const Phrase = () => {
  return (
    <div className="flex flex-row gap-8 items-center px-5 min-w-max select-none">
      {logos.map((logo, index) => (
        <div key={index} className="relative group cursor-pointer">
          
          {/* LOCAL SVG */}
          <img
            src={`/images/${logo.id}.svg`}
            alt={logo.name}
            width="70"
            height="70"
            loading="lazy"
            decoding="async"
            className="h-[70px] w-auto opacity-80 group-hover:opacity-100 transition"
          />

          {/* Tooltip smooth, no CLS */}
          <span
  className="
    absolute bottom-[-2rem] left-1/2 -translate-x-1/2
    px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap
    opacity-0 group-hover:opacity-100 
    translate-y-1 group-hover:translate-y-0
    transition-all duration-300
  "
>
  {logo.name}
</span>

        </div>
      ))}
    </div>
  );
};

const PhraseMemo = React.memo(Phrase);

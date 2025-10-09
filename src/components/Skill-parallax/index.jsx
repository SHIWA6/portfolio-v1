"use client";

import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState, useMemo } from "react";
import styles from "./style.module.scss";

export default function SkillsSection() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    // Init Lenis and start a single RAF loop. Clean up on unmount to avoid
    // runaway RAFs which cause CPU spikes on mobile.
    if (typeof window === "undefined") return;
    const lenis = new Lenis();
    let rafId = null;
    const loop = (time) => {
      try {
        lenis.raf(time);
      } catch (e) {
        // Defensive: Lenis may throw if destroyed; ignore and stop loop
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      // Try to gracefully destroy Lenis instance if API available
      try {
        if (typeof lenis.destroy === "function") lenis.destroy();
      } catch (e) {}
    };
  }, []);

  // Detect mobile screens efficiently
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  return (
    <section className={`${styles.skills} py-16`}>
      <div className="max-w-7xl mx-auto px-4">
       

        <div className="overflow-hidden" ref={container}>
          <Slide direction="left" left="-120%" progress={scrollYProgress} isMobile={isMobile} />
          <Slide direction="right" left="-25%" progress={scrollYProgress} isMobile={isMobile} />
          <Slide direction="left" left="-75%" progress={scrollYProgress} isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}

const Slide = ({ direction, left, progress, isMobile }) => {
  const shouldReduce = useReducedMotion();
  const dirMultiplier = direction === "left" ? -1 : 1;
  // Reduce the translation intensity on mobile for better performance
  const intensity = isMobile ? 80 : 200;
  const translateX = useTransform(progress, [0, 1], [intensity * dirMultiplier, -intensity * dirMultiplier]);

  return (
    <motion.div
      style={{ x: shouldReduce ? 0 : translateX, left }}
      className="relative flex whitespace-nowrap w-max overflow-visible py-6"
    >
      <Phrase />
    </motion.div>
  );
};

const logos = [
  { name: "HTML5", id: "html5" },
  { name: "CSS3", id: "css3" },
  { name: "JavaScript", id: "javascript" },
  { name: "React", id: "react" },
  { name: "Node.js", id: "node.js" },
  { name: "Next.js", id: "next.js" },
  { name: "MongoDB", id: "mongodb" },
  { name: "TailwindCSS", id: "tailwindcss" },
  { name: "Git", id: "git" },
  { name: "Docker", id: "docker" },
  { name: "PostgreSQL", id: "postgresql" },
  { name: "github", id: "github"},
  { name: "TypeScript", id: "typescript"},
  {name: "Python", id: "python"}
];


// Memoize Phrase so it doesn't re-render unnecessarily
const Phrase = () => {
  const items = useMemo(() => logos, []);
  return (
    <div className="flex flex-row gap-8 items-center px-5 min-w-max">
      {items.map((logo, index) => (
        <div key={index} className="relative group cursor-pointer">
          <img
            src={`https://readme-components.vercel.app/api?component=logo&logo=${logo.id}&fill=linear-gradient(to%20right,%23ff512f,%23dd2476)&animation=spin`}
            alt={logo.name}
            height="70"
            loading="lazy"
            decoding="async"
            className="h-[70px] w-auto"
          />
          <span className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
            {logo.name}
          </span>
        </div>
      ))}
    </div>
  );
};
"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import styles from "./style.module.scss";

export default function SkillsSection() {
  const container = useRef(null);

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

  return (
    <section className={`${styles.skills} py-16`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          My Skills
        </h2>

        <div className="overflow-hidden" ref={container}>
          <Slide direction="left" left="-120%" progress={scrollYProgress} />
          <Slide direction="right" left="-25%" progress={scrollYProgress} />
          <Slide direction="left" left="-75%" progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

const Slide = ({ direction, left, progress }) => {
  const dirMultiplier = direction === "left" ? -1 : 1;
  const translateX = useTransform(progress, [0, 1], [200 * dirMultiplier, -200 * dirMultiplier]);

  return (
    <motion.div
      style={{ x: translateX, left }}
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

const Phrase = () => {
  return (
    <div className="flex flex-row gap-8 items-center px-5 min-w-max">
      {logos.map((logo, index) => (
        <div key={index} className="relative group cursor-pointer">
          <img
            src={`https://readme-components.vercel.app/api?component=logo&logo=${logo.id}&fill=linear-gradient(to%20right,%23ff512f,%23dd2476)&animation=spin`}
            alt={logo.name}
            height="70"
            className="h-[70px]"
          />
          <span className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
            {logo.name}
          </span>
        </div>
      ))}
    </div>
  );
};

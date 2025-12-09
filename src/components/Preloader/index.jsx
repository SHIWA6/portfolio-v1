"use client";

import styles from "./style.module.scss";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { opacity, slideUp } from "./anim";

const words = ["Hello", "Bonjour", "नमस्ते", "Ciao", "Olà", "やあ", "Hallå", "Guten Tag", "Hallo"];

export default function Preloader({ onFinish }) {
  // ✅ ALWAYS call all hooks in same order every render
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  // ✅ Safe dimension measurement with SSR protection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateSize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Rotate words
  useEffect(() => {
    if (index === words.length - 1) return;

    const duration = index === 0 ? 900 : 150;

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [index]);

  // Exit callback (tell parent preloader is done)
  useEffect(() => {
    if (index === words.length - 1) {
      // Finish after SVG exit animation completes
      const timer = setTimeout(() => {
        onFinish?.(); 
      }, 700); // match exit animation duration

      return () => clearTimeout(timer);
    }
  }, [index, onFinish]);

  // Curved SVG path
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
    dimension.width / 2
  } ${dimension.height + 300} 0 ${dimension.height} L0 0`;

  const exitPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${
    dimension.width / 2
  } ${dimension.height} 0 ${dimension.height} L0 0`;

  const curveAnim = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: exitPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.25 },
    },
  };

  return (
    <motion.div
      className={styles.introduction}
      variants={slideUp}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {dimension.width > 0 && (
        <>
          <motion.p variants={opacity} className={styles.word}>
            <span></span>
            {words[index]}
          </motion.p>

          <svg className={styles.svg}>
            <motion.path variants={curveAnim} />
          </svg>
        </>
      )}
    </motion.div>
  );
}

"use client";
import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { slideUp, opacity } from "./animation";
import Script from "next/script";

export default function Index() {
  const phrase =
    "I'm Shiva Pandey, a Btech undergraduate from Munshiganj Institute of Technology, major in Computer Science & Engineering, with a passion for web development and scalable technologies. Proficient in C++, JavaScript, TypeScript, Python, React.js, Next.js, Node.js, and cloud services like AWS and Docker. Always eager to expand my skills and tackle new challenges, I'm actively seeking lucrative opportunities to leverage my tech expertise and drive impactful projects. Whether it's through creating seamless web experiences or exploring the future of decentralized applications "
     + "Im excited to contribute to the tech landscape and grow alongside it.";

  // ✅ ALWAYS call hooks in same order - no conditional hooks
  const description = useRef(null);
  const isInView = useInView(description);
  
  // ✅ Safe mobile detection without conditional hook
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return ( <> 
    <div ref={description} className={styles.description} id="about">
      <Script
        async
        src="//embed.typeform.com/next/embed.js"
        strategy="afterInteractive"
      ></Script>

      <div className={styles.body}>
        <p>
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <div data-scroll data-scroll-speed={0.1}></div>
      </div>
    </div> </>
  );
}
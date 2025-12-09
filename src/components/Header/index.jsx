"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "../../common/Magnetic";


export default function Index() {
  // ✅ ALWAYS declare all hooks at top level in same order
  const header = useRef(null);
  const button = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useLayoutEffect(() => {
    // ✅ Safe DOM access - check if we're in browser
    if (typeof window === 'undefined' || !button.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const scrollTriggerConfig = {
      trigger: document.documentElement,
      start: 0,
      end: window.innerHeight,
      onLeave: () => {
        if (button.current) {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        }
      },
      onEnterBack: () => {
        if (button.current) {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
            ease: "power1.out",
          });
          // ✅ Fixed: setIsActive should be called separately, not inside gsap.to
          setIsActive(false);
        }
      },
    };
    
    gsap.to(button.current, { scrollTrigger: scrollTriggerConfig });
    
    // ✅ Cleanup ScrollTrigger on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleNavClick = (value) => {
    setIsActive(value); // This will log 'false' when the nav element in ChildComponent is clicked
  };

  return (
    <div className={styles.main}>
      

      <div ref={header} className={styles.header}>
        <div className={styles.logo}></div>
        <div className={styles.nav}>
          <Magnetic>
            <div className={styles.el}>
              <a href="#work">Work</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a href="#about">About</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a href="#contact-me">Contact</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
        </div>
        <div className={styles.marq}></div>
      </div>
      <div ref={button} className={styles.headerButtonContainer}>
      {/*  <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </Rounded> */}
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav onNavClick={handleNavClick} />}
      </AnimatePresence>
    </div>
  );
}

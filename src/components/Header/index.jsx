"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnetic from "../../common/Magnetic";


export default function Index() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const button = useRef(null);


  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(
            button.current,
            { scale: 0, duration: 0.25, ease: "power1.out" },
            setIsActive(false)
          );
        },
      },
    });
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

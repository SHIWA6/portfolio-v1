"use client";
import Script from "next/script";

import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import Description from "../components/Description";
import Skillparallax from "../components/Skill-parallax";
import SlidingImages from "../components/SlidingImages";
import Contact from "../components/Contact";
import Header from "../components/Header"

export default function Home() {
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      const scroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
      });

      setTimeout(() => {
        setIsloading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
        // ✅ Removed scroll.update();
      }, 2000);
    })();
  }, []);


  return (<main className={styles.main}>


    <Header></Header>

      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Projects />
      <Skillparallax />
      <SlidingImages />
      <Contact />
    </main>

   
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Script from "next/script";

import styles from "./page.module.scss";

import Preloader from "../components/Preloader";
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import Description from "../components/Description";
import Skillparallax from "../components/Skill-parallax";
import SlidingImages from "../components/SlidingImages";
import Contact from "../components/Contact";
import Header from "../components/Header";
import LocalTime from "@/utils/Localtimes";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let scroll = null;

    (async () => {
      try {
        const LocomotiveModule = await import("locomotive-scroll");
        const LocomotiveScroll = LocomotiveModule.default || LocomotiveModule;

        const el = document.querySelector("[data-scroll-container]");

        if (el) {
          scroll = new LocomotiveScroll({
            el,
            smooth: true,
            lerp: 0.08,
          });
        }
      } catch (err) {
        console.warn("Locomotive failed:", err);
      }

      // PRELOADER ALWAYS REMOVED (no dependency on locomotive)
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 600);
    })();

    return () => {
      if (scroll && typeof scroll.destroy === "function") {
        scroll.destroy();
      }
    };
  }, []);

  return (
    <>
      {/* LOCO CSS (important) */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css"
      />

      {/* PAGE WRAPPER FOR SMOOTH SCROLL */}
      <div data-scroll-container>

        {/* PRELOADER */}
        <AnimatePresence>
          {isLoading && <Preloader />}
        </AnimatePresence>

        {/* MAIN PAGE CONTENT */}
        <div className={styles.main}>

          <section className="mt-0 bg-[#181818] text-white">
            <LocalTime />
            <div className="mb-10 sm:mb-10">
              <Header />
            </div>

            <Landing />
          </section>

          <Description />
          <Projects />
          <Skillparallax />
          <SlidingImages />
          <Contact />
          
        </div>
      </div>
    </>
  );
}

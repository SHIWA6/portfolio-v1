"use-client";
import styles from "./style.module.scss";
import Image from "next/image";
import RoundedButton from "./Roundedbutton";
import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Magnetic from "./Magnetic";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import Script from "next/script";


export default function Index() {
  const container = useRef(null);
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: {
          branding: { brandColor: "#000000" },
        },
      });
    })();
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-499, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <Script
        async
        src="//embed.typeform.com/next/embed.js"
        strategy="afterInteractive"
      ></Script>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image fill={true}
               alt={"image"}
               src="/images/reall.webp" />
            </div>
            <div>
              <h2>Let&apos;s work</h2>
              <h2>together</h2>
            </div>
          </span>
          <motion.div
            style={{ x }}
            className={styles.buttonContainer}
          ></motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <RoundedButton>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=shivapanday9616527173@gmail.com"
              target="_blank"
            >
              shivapanday7172@gmail.com
            </a>
          </RoundedButton>

          <RoundedButton>
            <p>+919214639099</p>
          </RoundedButton>
          <RoundedButton>
            <a
              
            >
              <p>Resume</p>
            </a>
          </RoundedButton>
        </div>
      </div>
      <div className={styles.body} id="contact-me">
        <div className={styles.info}>
          <div>
            <span>
              <h3>Version</h3>
              <p>2025 © SHIWA</p>
            </span>
          </div>
          <div>
            <span>
              <h3>socials</h3>
              <Magnetic>
                <a href="https://github.com/SHIWA6" target="_blank">
                  <p>GitHub</p>
                </a>
              </Magnetic>
            </span>
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/shiva-pandey-41978a308"
                target="_blank"
              >
                <p>LinkedIn</p>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://x.com/TestCricforlife" target="_blank">
                <p>Twitter</p>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
      <RoundedButton onClick={scrollToTop}>
        <p>Back to Top</p>
      </RoundedButton>
    </motion.div>
  );
}
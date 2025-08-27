import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";

const slider1 = [
  {
    color: "#e3e5e7",
    src: "/images/1.jpg",
  },
  {
    color: "#d6d7dc",
    src: "/images/PORTFOLIO_WEB.png",
  },
  {
    color: "#e3e3e3",
    src: "/images/Screenshot 2025-08-28 012809.png",
  },
  {
    color: "#21242b",
    src: "/images/Screenshot 2025-08-28 012715.png",
  },
];

const slider2 = [
  {
    color: "#d7d4cf",
    src: "/images/CHEF.png",
  },
  {
    color: "#e5e0e1",
    src: "/images/image.png",
  },
  {
    color: "#d4e3ec",
    src: "/images/Screenshot 2025-08-28 012742.png",
  },
  {
    color: "#e1dad6",
    src: "/images/2.jpg",
  },
];

export default function Index() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <>
      {/* Desktop version */}
      <div ref={container} className={`${styles.slidingImages} ${styles.desktopOnly}`}>
        <motion.div style={{ x: x1 }} className={styles.slider}>
          {slider1.map((project, index) => {
            return (
              <div
                key={index}
                className={styles.project}
                style={{ backgroundColor: project.color }}
              >
                <div className={styles.imageContainer}>
                  <Image fill={true} alt={"image"} src={`${project.src}`} />
                </div>
              </div>
            );
          })}
        </motion.div>
        <motion.div style={{ x: x2 }} className={styles.slider}>
          {slider2.map((project, index) => {
            return (
              <div
                key={index}
                className={styles.project}
                style={{ backgroundColor: project.color }}
              >
                <div key={index} className={styles.imageContainer}>
                  <Image fill={true} alt={"image"} src={`${project.src}`} />
                </div>
              </div>
            );
          })}
        </motion.div>
        <motion.div style={{ height }} className={styles.circleContainer}>
          <div className={styles.circle}></div>
        </motion.div>
      </div>
    </>
  );
}
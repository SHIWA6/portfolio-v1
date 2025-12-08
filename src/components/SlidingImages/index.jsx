import { useRef } from "react";
import { useScroll, useTransform, motion, color } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";

const slider1 = [
  {
    color: "#e3e5e7",
    src: '/images/1.webp',
  },
  
  {
    color: "#e3e3e3",
    src: "/images/Screenshot 2025-08-28 012809.webp",
  },
  {
    color: "#21242b",
    src: "/images/Screenshot 2025-08-28 012715.webp",
  },
];

const slider2 = [
  {
    color: "#d7d4cf",
    src: "/images/CHEF.webp",
  },
  {
    color: "#e5e0e1",
    src: "/images/image.webp",
  },
  {
    color: "#d4e3ec",
    src: "/images/Screenshot 2025-08-28 012742.webp",
  },
  {
    color: "#e1dad6",
    src: "/images/2.webp",
  },
  {
    color: "#e1dad6",
    src: "/images/Screenshot 2025-09-28 150550.webp"
  }
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
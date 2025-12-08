"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import Project from "./components/project";
import { color, motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import Script from "next/script";

const projects = [
 { title: "AIVORA-DESK",
  description: "A hybrid automation platform leveraging Next.js, Node.js, Python, Selenium, REST APIs, and ChromeDriver to deliver scalable, secure, anti-detection X automation with real-time monitoring, job scheduling, and distributed execution."
  , src: "/images/aivora-desk-img.png",
  color: "#f5f5f5",
  link: "https://github.com/SHIWA6/Aivora-Desk",
  techStack: [
  "Next.js",
  "Node.js",
  "TypeScript",
  "TailwindCSS",
  "Python",
  "Selenium",
  "ChromeDriver",
  "REST API",
  "WebSockets",
  "Pandas",
  "OpenPyXL",
  
]

 },{ title: "PULSETALK",
  description: "A full-stack blazing-fast real-time chat app powered by Next.js, Node.js, Prisma, Redis, and Socket.io, featuring analytics, auth, and sleek UI magic."
  , src: "/images/pulsetalk.webp",
  color: "#f6f6f6",
  link: "https://pulse-talk-l9dd.vercel.app/",
  techStack: ["NextJs, TailwindCss, TypeScript, ExpressJS, Socket.io, Redis, PostrgreSQL, PostHog"]

 }, { title: "EDGE-AI",
  description: "A voice assistant powered by AI, created with NEXT.js and the Gemini API, offering 98% precision in speech recognition and a response time of only 1.5 seconds."
  , src: "/images/Screenshot 2025-09-28 150550.webp",
  color: "#000000",
  link: "https://edge-ai-rho.vercel.app/",
  techStack: ["NextJs, TailwindCss, NodeJS, ExpressJS, GeminiAPI"]

 }, {
    title: "Stakelytics",
    description:
      "A feature-rich React.js and Tailwind CSS application focused on delivering interactive game mechanics like Mines etc,"
   , src: "/images/image.webp",
    color: "#000000",
    link: "https://gamble-gains-nine.vercel.app/",
    techStack: ["React.js", "Tailwind css"],
  },
    {
     title: "Portfolio",
     description:
       "A modern, interactive portfolio website showcasing projects with dynamic animations and responsive design.",
     src: "/images/PORTFOLIO_WEB.webp",
     color: "#000000",
     link: "https://portfolio-v1-dusky-beta.vercel.app/",
    techStack: [ "NextJS, TailwindCss"],
   },


  {
    title: "CHEF-CLAUDE",
    description: "A sleek, interactive AI-based cooking assistant built with React and Vite. Chef Claude lets users input ingredients and generates customized recipe suggestions using LLMs like ClaudeAPI or Hugging Face models.",
    src:"/images/CHEF.webp",
    color:"#000000",
    link: "https://github.com/SHIWA6/CHEF_CLAUDE_10-06-2025"
    , techStack: ["React.js", "Claude AI"]
  }
  
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function Home() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };
  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      className={styles.projects}
      id="work"
    >
      <Script
        async
        src="//embed.typeform.com/next/embed.js"
        strategy="afterInteractive"
      ></Script>
      <h1 className={styles.h1}>Projects</h1>
      <div className={styles.body}>
        {projects.map((project, index) => {
          return (
            <Project
              index={index}
              title={project.title}
              description={project.description}
              link={project.link}
              techStack={project.techStack}
              manageModal={manageModal}
              key={index}
            />
          );
        })}
      </div>
      <button
        id="feedback-button"
        data-tf-popup="IIAAy5c2"
        data-tf-opacity="100"
        data-tf-iframe-props="title=Client Details and Project Requirements Form"
        data-tf-transitive-search-params
        data-tf-medium="snippet"
      ></button>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.modalContainer}
        >
          <div
            style={{ top: index * -100 + "%" }}
            className={styles.modalSlider}
          >
            {projects.map((project, index) => {
              const { src, color } = project;
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  <Image src={`${src}`} width={380} height={0} alt="image" />
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        >
          View
        </motion.div>
      </>
    </main>
  );
}

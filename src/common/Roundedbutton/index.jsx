"use client";
import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";

export default function RoundedButton({
  children,
  backgroundColor = "#455CE9",
  ...attributes
}) {
  const circle = useRef(null);
  const timeline = useRef(null);
  const timeoutId = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.to(
      circle.current,
      { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
      "enter"
    ).to(
      circle.current,
      { top: "-150%", width: "125%", duration: 0.25 },
      "exit"
    );

    timeline.current = tl;
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  return (
    <div
      className={styles.roundedButton}
      style={{ overflow: "hidden" }}
      onMouseEnter={manageMouseEnter}
      onMouseLeave={manageMouseLeave}
      {...attributes}
    >
      {children}
      <div
        ref={circle}
        style={{ backgroundColor }}
        className={styles.circle}
      ></div>
    </div>
  );
}

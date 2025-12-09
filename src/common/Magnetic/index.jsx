"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }) {
  const magnetic = useRef(null);

  useEffect(() => {
    const el = magnetic.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const yTo = gsap.quickTo(el, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []); // ✅ NO CHILDREN HERE

  return React.cloneElement(children, { ref: magnetic });
}

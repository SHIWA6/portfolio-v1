"use client";
import Timelocal from "@/utils/Timelocal";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import reall from "../Header/reall.jpeg";
import { FaGithub, FaTwitter } from "react-icons/fa";

const Intro = () => {
  return (
    <div className="p-4 flex flex-col items-center  mb-[100px]">
      <Card className="relative lg:w-[1000px] lg:h-[300px] lg:mt-[220px] mt-[150px] sm:w-[600px] sm:h-[500px] lg:mb-[100px] overflow-hidden rounded-2xl border border-zinc-700/40 bg-gradient-to-br from-[#0b0b0b]/60 to-[#0f1720]/60 text-white shadow-2xl transition-transform duration-300 hover:-translate-y-1 backdrop-blur-md">
        {/* glowing corner accents */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-[#64FFDA] rounded-tl-md opacity-90" />
        <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-[#64FFDA] rounded-tr-md opacity-90" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-[#64FFDA] rounded-bl-md opacity-90" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-[#64FFDA] rounded-br-md opacity-90" />

        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
             <div className=" fixed top-3 right-5"><Timelocal></Timelocal></div>
            {/* Profile + Info */}
            <div className="flex items-center gap-6 flex-col sm:flex-row text-center sm:text-left">
              <div className="flex-shrink-0 rounded-xl ring-1 ring-zinc-700/60 overflow-hidden bg-zinc-900/60 sm:mt-8 lg:mt-0">
                <Image
                  src={reall}
                  width={110}
                  height={170}
                  alt="Shiva profile"
                  className="object-cover w-[110px] h-[150px]  rounded-xl"
                />
              </div>
             

              <div className="flex flex-col items-center sm:items-start">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                    SHIVA
                  </h1>

                  <span className="select-none inline-flex items-center gap-2 text-sm md:text-lg font-medium px-2 py-0.5 rounded-md border border-white/60 bg-[#64FFDA]/5 text-white">
                    <svg
                      className="w-3 h-3 animate-pulse"
                      stroke="white"
                      fill="white"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                    </svg>
                    Available
                  </span>
                </div>

                <p className="mt-1 text-sm md:text-base text-zinc-300">
                  Software Engineer
                </p>

                <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm text-zinc-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    aria-hidden
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                    <path d="m22 8-10 6-10-6"></path>
                  </svg>

                  <a
                    href="mailto:Shivapanday9616527173@gmail.com"
                    className="truncate text-base hover:text-white transition-colors"
                  >
                    Shivapanday9616527173@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-4 md:mt-5 self-center md:self-start">
              <a
                href="https://github.com/SHIWA6"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 ring-1 ring-zinc-700/40 hover:text-[#0f1720] hover:bg-[#64FFDA]/20 transition"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://x.com/Abhinavstwt"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 ring-1 ring-zinc-700/40 hover:text-[#0f1720] hover:bg-[#64FFDA]/20 transition"
              >
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* About */}
          <div className="mt-6 md:mt-8 text-center md:text-left">
            <p className="mx-2 md:mx-0 text-sm md:text-lg leading-relaxed text-zinc-300 max-w-2xl">
              I build full-stack apps that matter —  currently exploring AI/ML and
              pushing boundaries with design-first, production-ready projects.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Intro;

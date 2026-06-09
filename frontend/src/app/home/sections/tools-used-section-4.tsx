"use client";

import React from "react";
// Adjust this path based on where you placed 'logo-loop.tsx'
import LogoLoop, { LogoItem } from "../../components/logo-loop";

const skillCards = [
  {
    title: ["PROTO", "TYPING"],
    subtitle: "Wireframing, etc.",
    progress: 90,
    progressDesc: "Advanced",
    accent: false,
    arrowRotate: -15,
  },
  {
    title: ["FRONT", "END"],
    subtitle: "Development",
    progress: 85,
    progressDesc: "Advanced",
    accent: true,
    arrowRotate: 30,
  },
  {
    title: ["QA"],
    subtitle: "Quality Assurance",
    progress: 65,
    progressDesc: "Intermediate",
    accent: true,
    arrowRotate: -40,
  },
  {
    title: ["UI/UX"],
    subtitle: "User Interface and User Experience",
    progress: 85,
    progressDesc: "Intermediate",
    accent: false,
    arrowRotate: 20,
  },
];

const otherSkills = [
  "Willing to learn",
  "Adaptable",
  "Communication",
  "Attention to detail",
  "Collaborative",
  "Time management",
];

// 1. Define your tool logos array
const TOOL_LOGOS: LogoItem[] = [
  { src: "/icon/logo-androidstudio.svg", alt: "Android Studio" },
  { src: "/icon/logo-canva.svg", alt: "Canva" },
  { src: "/icon/logo-css.svg", alt: "CSS" },
  { src: "/icon/logo-expogo.svg", alt: "Expo Go" },
  { src: "/icon/logo-figma.svg", alt: "Figma" },
  { src: "/icon/logo-html.svg", alt: "HTML" },
  { src: "/icon/logo-java.svg", alt: "Java" },
  { src: "/icon/logo-js.svg", alt: "JavaScript" },
  { src: "/icon/logo-mysql.svg", alt: "MySQL" },
  { src: "/icon/logo-tailwindcss.svg", alt: "Tailwind CSS" },
  { src: "/icon/logo-unity.svg", alt: "Unity" },
  { src: "/icon/logo-vscode.svg", alt: "VS Code" },
];

export default function ToolsUsedSection4() {
  return (
    /* Changed py-16 lg:py-24 to distinct pt/pb values to expand the upper padding boundary gap */
    <section className="relative text-white bg-[#000027] overflow-hidden min-h-screen flex flex-col justify-between pt-32 pb-16 lg:pt-40 lg:pb-24">
      
      {/* ── Main Content Grid ── */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,560px)_auto] gap-12 lg:gap-24 items-center px-4 lg:px-12 my-auto">

        {/* ── Left Content Column ── */}
        <div className="flex flex-col gap-5 items-center text-center">

          {/* Headline */}
          <div
            className="select-none font-black uppercase leading-[0.9] tracking-[-0.04em] text-center w-full flex flex-col items-center gap-2"
            style={{ fontSize: "clamp(2.2rem, 8vw, 4.5rem)" }}
          >
            {/* Row 1: BRINGING */}
            <div className="text-[#3b5bff]">Bringing</div>

            {/* Row 2: ideas t[mascot]life */}
            <div
              className="flex items-center justify-center flex-wrap lg:flex-nowrap"
              style={{ gap: "0.1em" }}
            >
              <span
                className="font-dreams text-[#f0b429] normal-case font-normal"
                style={{
                  letterSpacing: "0.01em",
                  lineHeight: 1,
                  fontSize: "inherit",
                }}
              >
                ideas
              </span>
              <span
                className="text-[#3b5bff] flex items-center"
                style={{ whiteSpace: "nowrap" }}
              >
                t
                <img
                  src="/svg/illus-mascot-smile.svg"
                  alt="mascot"
                  style={{
                    width: "clamp(50px, 10vw, 130px)",
                    height: "clamp(50px, 11vw, 130px)",
                    objectFit: "contain",
                    marginLeft: "-27px",
                    marginRight: "-4px",
                    flexShrink: 0,
                  }}
                />
                life
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="font-sans text-sm text-white/70 leading-relaxed max-w-md text-center lg:text-justify">
            These are the tools I use — from{" "}
            <strong className="text-[#3b5bff] font-semibold">
              prototyping
            </strong>{" "}
            to writing clean code and managing infrastructure to debugging,
            automation, and deployment.
          </p>

          {/* Other Skills */}
          <div className="flex flex-col gap-4 w-full items-center lg:items-start max-w-md">
            <span className="font-sans w-full text-center lg:text-left text-xs font-semibold tracking-widest uppercase text-[#3b5bff]">
              Other Skills
            </span>
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {otherSkills.map((skill) => (
                <span
                  key={skill}
                  className="font-sans text-xs text-white/80 px-4 py-1 rounded-full border border-[#3b5bff]/40 hover:bg-[#3b5bff] hover:text-white hover:border-[#3b5bff] transition-colors duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Content Column: 2×2 skill cards ── */}
        <div className="grid grid-cols-2 gap-3 lg:pl-20">
          {skillCards.map((card, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-4 flex flex-col gap-3 transition-transform duration-200 hover:-translate-y-1 cursor-default"
              style={{
                background: card.accent ? "#f0b429" : "#0b1230",
                border: card.accent
                  ? "1px solid #f0b429"
                  : "1px solid rgba(59,91,255,0.18)",
              }}
            >
              {/* Arrow deco */}
              <div className="absolute top-3 right-3">
                <img
                  src="/svg/illus-arrow-blue.svg"
                  alt=""
                  aria-hidden="true"
                  style={{
                    width: "16px",
                    height: "16px",
                    objectFit: "contain",
                    transform: `rotate(${card.arrowRotate}deg)`,
                    filter: card.accent ? "brightness(0)" : "none",
                  }}
                />
              </div>

              {/* Title */}
              <div
                className="font-sans uppercase leading-none tracking-[-0.03em] font-extrabold"
                style={{
                  fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                  color: card.accent ? "#000820" : "#ffffff",
                }}
              >
                {card.title.map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </div>

              {/* Subtitle */}
              <p
                className="font-sans text-xs font-medium leading-snug"
                style={{
                  color: card.accent
                    ? "rgba(0,0,0,0.55)"
                    : "rgba(255,255,255,0.55)",
                }}
              >
                {card.subtitle}
              </p>

              {/* Progress bar + label */}
              <div className="mt-auto flex flex-col gap-1">
                <div
                  className="h-[3px] rounded-full overflow-hidden"
                  style={{
                    background: card.accent
                      ? "rgba(0,0,0,0.15)"
                      : "rgba(255,255,255,0.12)",
                  }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${card.progress}%`,
                      background: card.accent ? "#000820" : "#3b5bff",
                    }}
                  />
                </div>
                <p
                  className="font-sans text-xs font-medium"
                  style={{
                    color: card.accent
                      ? "rgba(0,0,0,0.55)"
                      : "rgba(255,255,255,0.55)",
                  }}
                >
                  {card.progressDesc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Bottom Logo Loop Component ── */}
      <div className="w-full mt-12 lg:mt-16 border-t border-white/5 pt-8">
                  <LogoLoop
                  logos={TOOL_LOGOS}
                  speed={60}
                  gap={56}
                  logoHeight={32}
                  fadeOut={true}
                  fadeOutColor="#000027"
                  pauseOnHover={true}
                  scaleOnHover={true}
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                  />
              </div>

    </section>
  );
}
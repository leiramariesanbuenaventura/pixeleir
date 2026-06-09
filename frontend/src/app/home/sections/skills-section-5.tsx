"use client";

import React, { Fragment } from "react";
// Adjust this path based on where you placed 'logo-loop.tsx' and other imported components
import LogoLoop, { LogoItem } from "../../components/logo-loop";
import MagicBento from "../../components/magic-bento";

// Define text part structure
export interface TextPart {
  text: string;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  muted?: boolean;
}

// Define column structure
export interface Column {
  heading: string;
  headingColor: string;
  accentColor: string;
  actionIconColor: string;
  description: string;
  items?: { parts: TextPart[] }[];
  twoCol?: string[][];
  tools?: string[];
}

// Revised column data to preserve text and add new structural elements
const columns: Column[] = [
  {
    heading: "Designing",
    headingColor: "#3b5bff", // User's Blue
    accentColor: "#3b5bff",
    actionIconColor: "#ffffff", // Complementary White for action icon text
    description: "Layout Design, Logo Making, UI/UX, Website and Mobile Design.",
    items: [
      { parts: [{ text: "Layout ", bold: true }, { text: "Design" }] },
      { parts: [{ text: "Logo ", bold: true }, { text: "Making" }] },
      { parts: [{ text: "UI/UX" }] },
      { parts: [{ text: "Website and Mobile ", bold: true }, { text: "Design" }] },
    ],
  },
  {
    heading: "Development",
    headingColor: "#f0b429", // User's Yellow
    accentColor: "#f0b429",
    actionIconColor: "#f0b429", // Complementary Yellow for action icon text
    description: "Code and frameworks for web and mobile. Toolsets and logic.",
    twoCol: [
      ["HTML", "MySQL"],
      ["CSS", "PHP"],
      ["Java", "C#"],
    ],
    tools: ["Visual Studio Code", "Android Studio", "Unity", "Microsoft Visual Studio 2022"],
  },
  {
    heading: "Languages",
    headingColor: "#3b5bff", // User's Blue
    accentColor: "#3b5bff",
    actionIconColor: "#ffffff", // Complementary White for action icon text
    description: "Advanced proficiency in English and native Filipino communication.",
    items: [
      {
        parts: [
          { text: "English ", bold: true, color: "#3b5bff" },
          { text: "(Advanced Proficiency)", italic: true, muted: true },
        ],
      },
      {
        parts: [
          { text: "Filipino ", bold: true, color: "#3b5bff" },
          { text: "(Native)", italic: true, muted: true },
        ],
      },
    ],
  },
];

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

export default function RevisedSkillsSection() {
  // Shared structural base for our glassmorphism layout classes
  const cardBaseClasses = 
    "relative rounded-2xl p-6 border transition-all duration-300 ease-out " +
    "hover:scale-[1.01] shadow-[0_0_0_0_rgba(59,91,255,0)] flex flex-col gap-6 group cursor-default font-sans overflow-hidden";

  return (
    <section className="relative text-white bg-[#000027] overflow-hidden min-h-screen flex flex-col justify-center py-3">
      
      {/* Ambient Deep Glow in Background */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] height-[500px] bg-[#3b5bff]/10 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* ── Top Grid: Revised Skill Cards ── */}
      <div className="w-full max-w-6xl mx-auto px-8 mb-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1: Designing */}
          <div 
            className={`${cardBaseClasses} border-white/10 bg-[radial-gradient(100%_100%_at_0%_0%,rgba(59,91,255,0.06)_0%,#000027_100%)] hover:border-[#3b5bff]/40 hover:shadow-[0_0_25px_-5px_rgba(59,91,255,0.25)]`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="uppercase tracking-wide font-extrabold text-xl lg:text-2xl text-[#3b5bff]">
                  {columns[0].heading}
                </h2>
                {/* Colored Action Icon */}
                <div 
                  className="flex items-center justify-center rounded-full w-8 h-8 shrink-0"
                  style={{ backgroundColor: columns[0].accentColor, color: columns[0].actionIconColor }}
                >
                  <span className="text-xl">▼</span>
                </div>
              </div>
              <div className="h-[2px] w-12 rounded-full bg-[#3b5bff]" />
            </div>

            <p className="text-sm font-sans leading-snug tracking-wide text-white/70">
              {columns[0].description}
            </p>
            
            {/* Inner Content Area */}
            <div className="bg-white/5 rounded-xl p-6 relative flex flex-col gap-6 overflow-hidden">
                <ul className="flex flex-col gap-3 z-10">
                {columns[0].items?.map((item, i) => (
                    <li key={i} className="text-sm leading-snug tracking-wide flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b5bff]/40 shrink-0" />
                    <div className="text-white/70 font-sans">
                        {item.parts.map((part, j) =>
                        part.bold ? (
                            <strong key={j} className="font-semibold text-white">{part.text}</strong>
                        ) : (
                            <span key={j}>{part.text}</span>
                        )
                        )}
                    </div>
                    </li>
                ))}
                </ul>

                {/* Rich illustration content integrated */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                  <img src="/svg/illus-design-integrated.svg" alt="" className="absolute -bottom-10 -right-10 w-40" />
                </div>
            </div>
          </div>

          {/* Card 2: Development */}
          <div 
            className={`${cardBaseClasses} border-white/10 bg-[radial-gradient(100%_100%_at_0%_0%,rgba(240,180,41,0.05)_0%,#000027_100%)] hover:border-[#f0b429]/40 hover:shadow-[0_0_25px_-5px_rgba(240,180,41,0.2)]`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="uppercase tracking-wide font-extrabold text-xl lg:text-2xl text-[#f0b429]">
                  {columns[1].heading}
                </h2>
                {/* Colored Action Icon */}
                <div 
                  className="flex items-center justify-center rounded-full w-8 h-8 shrink-0"
                  style={{ backgroundColor: columns[1].accentColor, color: columns[1].actionIconColor }}
                >
                  <span className="text-xl">▼</span>
                </div>
              </div>
              <div className="h-[2px] w-12 rounded-full bg-[#f0b429]" />
            </div>

            <p className="text-sm font-sans leading-snug tracking-wide text-white/70">
              {columns[1].description}
            </p>

            {/* Inner Content Area with Accent Background Band */}
            <div className="bg-[#f0b429]/5 rounded-xl p-6 relative flex flex-col gap-6 overflow-hidden">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 border-b border-white/10 pb-4 z-10">
                {columns[1].twoCol?.map((row, i) => (
                    <Fragment key={i}>
                    <span className="text-sm font-sans font-semibold tracking-wide text-white/90">{row[0]}</span>
                    <span className="text-sm font-sans font-semibold tracking-wide text-white/90">{row[1]}</span>
                    </Fragment>
                ))}
                </div>

                <ul className="flex flex-col gap-2 z-10">
                {columns[1].tools?.map((tool, i) => (
                    <li key={i} className="text-xs text-white/50 tracking-wide font-sans flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#f0b429]/40 shrink-0" />
                    <span>{tool}</span>
                    </li>
                ))}
                </ul>

                {/* Rich illustration content integrated */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                  <img src="/svg/illus-dev-integrated.svg" alt="" className="absolute -bottom-10 -right-10 w-40" />
                </div>
            </div>
          </div>

          {/* Card 3: Languages */}
          <div 
            className={`${cardBaseClasses} border-white/10 bg-[radial-gradient(100%_100%_at_0%_0%,rgba(59,91,255,0.06)_0%,#000027_100%)] hover:border-[#3b5bff]/40 hover:shadow-[0_0_25px_-5px_rgba(59,91,255,0.25)]`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="uppercase tracking-wide font-extrabold text-xl lg:text-2xl text-[#3b5bff]">
                  {columns[2].heading}
                </h2>
                {/* Colored Action Icon */}
                <div 
                  className="flex items-center justify-center rounded-full w-8 h-8 shrink-0"
                  style={{ backgroundColor: columns[2].accentColor, color: columns[2].actionIconColor }}
                >
                  <span className="text-xl">▼</span>
                </div>
              </div>
              <div className="h-[2px] w-12 rounded-full bg-[#3b5bff]" />
            </div>

            <p className="text-sm font-sans leading-snug tracking-wide text-white/70">
              {columns[2].description}
            </p>

            {/* Inner Content Area */}
            <div className="bg-white/5 rounded-xl p-6 relative flex flex-col gap-6 overflow-hidden">
                <ul className="flex flex-col gap-5 z-10">
                {columns[2].items?.map((item, i) => (
                    <li key={i} className="font-sans text-sm flex flex-col gap-1 tracking-wide">
                    {item.parts.map((part, j) => {
                        if (part.bold) return <strong key={j} className="font-extrabold uppercase text-xs tracking-wider text-[#3b5bff]">{part.text}</strong>;
                        if (part.italic) return <span key={j} className="text-white/60 text-xs leading-relaxed">{part.text}</span>;
                        return <span key={j} className="text-white/70">{part.text}</span>;
                    })}
                    </li>
                ))}
                </ul>

                {/* Rich illustration content integrated */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                  <img src="/svg/illus-langs-integrated.svg" alt="" className="absolute -bottom-10 -right-10 w-40" />
                </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-full max-w-6xl mx-auto px-8 z-10">
        <div className="h-[1px] w-full bg-white/5 rounded-full" />
      </div>

      {/* ── Bottom: MagicBento & LogoLoop ── */}
      <div className="w-full max-w-6xl mx-auto px-8 pt-12 pb-4 z-10 flex flex-col gap-12">
        <MagicBento glowColor="59, 91, 255" />
        
      </div>

    </section>
  );
}
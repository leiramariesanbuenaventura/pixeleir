"use client";

import { useState } from "react";

interface WorkItem {
  id: number;
  title: string;
  category: string;
  tags: string[];
  year: string;
  description: string;
  gradient: string;
  accent: string;
  icon: string;
}

const works: WorkItem[] = [
  {
    id: 1,
    title: "Pixeleir Portfolio",
    category: "Web Development",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    year: "2024",
    description:
      "Personal portfolio website featuring smooth scroll animations, interactive physics-based text, and a fully custom design system.",
    gradient: "linear-gradient(135deg, #3533cd 0%, #1a1870 60%, #000027 100%)",
    accent: "#3533cd",
    icon: "✦",
  },
  {
    id: 2,
    title: "Mobile UI Design System",
    category: "UI/UX Design",
    tags: ["Figma", "Prototyping", "Mobile"],
    year: "2024",
    description:
      "Comprehensive design system for a mobile application, including component library, color tokens, and interactive prototypes.",
    gradient: "linear-gradient(135deg, #f0b429 0%, #c47f17 60%, #000027 100%)",
    accent: "#f0b429",
    icon: "◈",
  },
  {
    id: 3,
    title: "Inventory Management System",
    category: "Application Development",
    tags: ["Java", "MySQL", "Android Studio"],
    year: "2023",
    description:
      "Full-stack Android application for real-time inventory tracking with role-based access control and analytics dashboard.",
    gradient: "linear-gradient(135deg, #004fff 0%, #002cbb 60%, #000027 100%)",
    accent: "#004fff",
    icon: "⬡",
  },
  {
    id: 4,
    title: "Campus Event Portal",
    category: "Web Development",
    tags: ["PHP", "HTML/CSS", "MySQL"],
    year: "2023",
    description:
      "Web platform for university event management allowing students to register, track, and receive updates on campus activities.",
    gradient: "linear-gradient(135deg, #3533cd 0%, #6b21a8 60%, #000027 100%)",
    accent: "#8b5cf6",
    icon: "⬟",
  },
  {
    id: 5,
    title: "Brand Identity — TechClub",
    category: "Graphic Design",
    tags: ["Canva", "Figma", "Logo Design"],
    year: "2022",
    description:
      "Full brand identity design for a university technology club, including logo, color palette, typography, and social media templates.",
    gradient: "linear-gradient(135deg, #f0b429 0%, #3533cd 100%)",
    accent: "#f0b429",
    icon: "◉",
  },
  {
    id: 6,
    title: "Unity 2D Puzzle Game",
    category: "Game Development",
    tags: ["Unity", "C#", "Game Design"],
    year: "2022",
    description:
      "2D puzzle platformer built in Unity featuring custom physics, level progression system, and hand-drawn art assets.",
    gradient: "linear-gradient(135deg, #16a34a 0%, #052e16 60%, #000027 100%)",
    accent: "#22c55e",
    icon: "▲",
  },
];

const categories = [
  "All",
  "Web Development",
  "UI/UX Design",
  "Application Development",
  "Graphic Design",
  "Game Development",
];

export default function WorksSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? works
      : works.filter((w) => w.category === activeCategory);

  return (
    <section className="relative text-white bg-[#000027] overflow-hidden min-h-screen flex flex-col justify-center py-20 px-4">
      {/* Ambient glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#3533cd]/8 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#f0b429]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-6xl mx-auto z-10">
        {/* Section header */}
        <div className="flex flex-col gap-2 mb-10">
          <span className="font-sans text-sm lg:text-sm md:text-xs font-bold text-[#3533cd] my-3">
            Selected Works
          </span>
          <h2 className="font-gordon font-black text-7xl leading-none tracking-[-0.08em] text-white">
            Projects <span className="font-dreams text-[#3533cd]">coded</span>
          </h2>
          <p className="font-sans text-sm text-white/50 w-full my-3">
            A collection of work across design, development, and everything in
            between.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-sans text-xs font-semibold tracking-wide px-4 py-2 rounded-full border transition-all duration-200"
              style={{
                backgroundColor:
                  activeCategory === cat ? "#3533cd" : "transparent",
                borderColor:
                  activeCategory === cat ? "#3533cd" : "rgba(255,255,255,0.12)",
                color:
                  activeCategory === cat ? "#ffffff" : "rgba(255,255,255,0.5)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards grid — inspired by the tilted card collage in the reference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((work, i) => (
            <div
              key={work.id}
              className="relative rounded-2xl overflow-hidden cursor-default transition-all duration-500 group"
              style={{
                transform:
                  hovered === work.id
                    ? "translateY(-6px) scale(1.01)"
                    : "translateY(0) scale(1)",
                // boxShadow: hovered === work.id
                //   ? `0 20px 60px -12px ${work.accent}55`
                //   : "0 4px 24px -4px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={() => setHovered(work.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Card top — gradient visual area like the screenshot cards */}
              <div
                className="relative h-36 sm:h-40 flex items-center justify-center overflow-hidden"
                style={{ background: work.gradient }}
              >
                {/* Large decorative icon */}
                <span
                  className="text-white/10 font-black select-none transition-transform duration-500 group-hover:scale-110"
                  style={{ fontSize: "clamp(5rem, 10vw, 8rem)", lineHeight: 1 }}
                >
                  {work.icon}
                </span>

                {/* Year badge */}
                <div className="absolute top-3 right-3 font-sans text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/30 text-white/70 backdrop-blur-sm">
                  {work.year}
                </div>

                {/* Category pill */}
                <div
                  className="absolute bottom-3 left-3 font-sans text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: `${work.accent}33`,
                    color: work.accent === "#f0b429" ? "#f0b429" : "#fff",
                    border: `1px solid ${work.accent}44`,
                  }}
                >
                  {work.category}
                </div>
              </div>

              {/* Card body */}
              <div
                className="p-5 flex flex-col gap-3 border border-t-0"
                style={{
                  backgroundColor: "#03051a",
                  borderColor:
                    hovered === work.id
                      ? `${work.accent}30`
                      : "rgba(255,255,255,0.06)",
                  borderTop: "none",
                  borderRadius: "0 0 1rem 1rem",
                }}
              >
                <h3
                  className="font-gordon font-bold uppercase tracking-[-0.04em] text-white leading-tight"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
                >
                  {work.title}
                </h3>

                <p className="font-sans text-xs text-white/55 leading-relaxed line-clamp-3">
                  {work.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-[10px] text-white/40 px-2 py-0.5 rounded-md border border-white/8"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View arrow */}
                <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                  <span className="font-sans text-xs text-white/30">
                    View Project
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${work.accent}22`,
                      border: `1px solid ${work.accent}44`,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ color: work.accent }}
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

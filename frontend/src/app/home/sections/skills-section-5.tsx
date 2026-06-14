"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Database,
  Layout,
  Terminal,
  Cpu,
  Smartphone,
  Globe,
  PenTool,
  GitBranch,
  Braces,
  Server,
  Layers,
  FileCode,
  Feather,
} from "lucide-react";

type Category = {
  label: string;
  icon: React.ReactNode;
  description: string;
  color: { bg: string; bar: string; accent: string; glow: string };
  skills: string[];
};

const categories: Category[] = [
  {
    label: "Frontend",
    icon: <Layout className="w-6 h-6" />,
    description: "Building fast, responsive, and accessible user interfaces with modern frameworks and tools.",
    color: {
      bg: "rgba(53,2,228,0.12)",
      bar: "from-[#3502e4] to-[#8b7aff]",
      accent: "#8b7aff",
      glow: "rgba(53,2,228,0.28)",
    },
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML & CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    icon: <Server className="w-6 h-6" />,
    description: "Designing reliable server-side systems, REST APIs, and scalable database architectures.",
    color: {
      bg: "rgba(6,182,212,0.12)",
      bar: "from-[#0891b2] to-[#67e8f9]",
      accent: "#67e8f9",
      glow: "rgba(6,182,212,0.25)",
    },
    skills: ["Node.js", "Express.js", "NestJS", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    label: "Languages",
    icon: <Braces className="w-6 h-6" />,
    description: "Fluent in the core languages that power modern web development, front to back.",
    color: {
      bg: "rgba(168,85,247,0.12)",
      bar: "from-[#9333ea] to-[#e879f9]",
      accent: "#e879f9",
      glow: "rgba(168,85,247,0.25)",
    },
    skills: ["JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
  },
  {
    label: "Tools",
    icon: <GitBranch className="w-6 h-6" />,
    description: "Proficient with the tools and workflows that keep projects organized, designed, and shipped.",
    color: {
      bg: "rgba(20,184,166,0.12)",
      bar: "from-[#0d9488] to-[#5eead4]",
      accent: "#5eead4",
      glow: "rgba(20,184,166,0.25)",
    },
    skills: ["Git & GitHub", "Figma", "VS Code", "UI/UX Design", "Prototyping"],
  },
];

function CategoryColumn({ cat, index }: { cat: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-5"
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
        style={{
          background: cat.color.bg,
          boxShadow: `0 0 0 1px ${cat.color.glow}`,
        }}
      >
        <span className={`bg-gradient-to-br ${cat.color.bar} bg-clip-text text-transparent`}>
          {cat.icon}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-2 mb-3">
        <h3 className="text-white/90 font-bold text-lg leading-snug">{cat.label}</h3>
        <p className="text-white/40 text-[13px] leading-relaxed font-sans">{cat.description}</p>
      </div>

      {/* Skills pills */}
      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + i * 0.055 + 0.2 }}
            className="px-3 py-1 rounded-full text-xs font-medium font-sans border transition-colors duration-200"
            style={{
              background: cat.color.bg,
              borderColor: cat.color.glow,
              color: cat.color.accent,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 bg-[#000027]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs text-[#8b7aff]/60 uppercase tracking-widest mb-3"
          >
            02 — Skills
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
          >
            Technical{" "}
            <span className="bg-gradient-to-r from-[#3502e4] to-[#000027] bg-clip-text text-transparent">
              Arsenal
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-white/45 font-sans text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          >
            Tools and technologies I use to build comprehensive,
            high-performance digital experiences.
          </motion.p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {categories.map((cat, i) => (
            <CategoryColumn key={cat.label} cat={cat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
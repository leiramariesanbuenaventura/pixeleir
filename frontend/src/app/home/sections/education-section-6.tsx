"use client";

interface TimelineEntry {
  year: string;
  degree: string;
  school: string;
  location: string;
  description: string;
  accent: boolean;
}

const timeline: TimelineEntry[] = [
  {
    year: "2022 – Present",
    degree: "Bachelor of Science in Computer Science",
    school: "Polytechnic University of the Philippines",
    location: "Manila, Philippines",
    description:
      "Specializing in Application Development. Actively involved in software engineering projects, UI/UX design, and cross-functional team collaboration.",
    accent: true,
  },
  {
    year: "2018 – 2022",
    degree: "Senior High School — ICT Strand",
    school: "Marikina High School",
    location: "Marikina City, Philippines",
    description:
      "Focused on Information and Communications Technology. Developed foundational skills in programming, web design, and technical documentation.",
    accent: false,
  },
  {
    year: "2014 – 2018",
    degree: "Junior High School",
    school: "Marikina High School",
    location: "Marikina City, Philippines",
    description:
      "Active participant in science and technology clubs. Developed early interest in digital design and computer science.",
    accent: false,
  },
];

export default function EducationSection() {
  return (
    <section className="relative text-white bg-[#000027] overflow-hidden min-h-screen flex flex-col justify-center py-20 px-4">
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#3533cd]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-5xl mx-auto z-10">
        {/* Section header */}
        <div className="flex flex-col gap-2 mb-16">
          <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#3533cd]">
            Background
          </span>
          <h2
            className="font-gordon font-black uppercase leading-none tracking-[-0.08em] text-white"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            Education
          </h2>
          <p className="font-sans text-sm text-white/50 max-w-sm mt-1">
            Where the curiosity started and the learning never stopped.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-[7px] md:left-[11px] top-3 bottom-3 w-[2px] bg-white/8 rounded-full" />

          {timeline.map((entry, i) => (
            <div key={i} className="relative flex gap-6 md:gap-10 pb-12 last:pb-0 group">
              {/* Dot */}
              <div className="relative z-10 flex-shrink-0 mt-1">
                <div
                  className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 transition-all duration-300"
                  style={{
                    backgroundColor: entry.accent ? "#3533cd" : "#000027",
                    borderColor: entry.accent ? "#3533cd" : "rgba(255,255,255,0.2)",
                    boxShadow: entry.accent ? "0 0 16px rgba(53,51,205,0.5)" : "none",
                  }}
                />
              </div>

              {/* Content card */}
              <div
                className="flex-1 rounded-2xl p-5 md:p-7 border transition-all duration-300 group-hover:border-[#3533cd]/30 group-hover:shadow-[0_0_24px_-6px_rgba(53,51,205,0.2)]"
                style={{
                  background: entry.accent
                    ? "radial-gradient(100% 100% at 0% 0%, rgba(53,51,205,0.1) 0%, #000027 100%)"
                    : "rgba(255,255,255,0.02)",
                  borderColor: entry.accent ? "rgba(53,51,205,0.3)" : "rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div className="flex flex-col gap-1">
                    <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#3533cd]">
                      {entry.year}
                    </span>
                    <h3 className="font-gordon font-bold uppercase tracking-[-0.04em] text-white leading-tight"
                      style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
                    >
                      {entry.degree}
                    </h3>
                  </div>

                  {entry.accent && (
                    <span className="font-sans text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-[#3533cd]/50 text-[#3533cd] bg-[#3533cd]/10 self-start shrink-0">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40 shrink-0">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  <span className="font-sans text-xs text-white/40">
                    {entry.school} · {entry.location}
                  </span>
                </div>

                <p className="font-sans text-sm text-white/60 leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
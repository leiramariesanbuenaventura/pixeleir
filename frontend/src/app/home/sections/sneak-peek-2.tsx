"use client";

export default function SneakPeekSection2() {
  return (
    <section className="relative text-white w-full h-full flex flex-col bg-[#000027] justify-center items-center pt-32">
      {/* overflow-hidden removed — it was clipping bg-clip-text gradient */}
      <div className="w-full container mx-auto px-4 text-center flex flex-col items-center justify-center h-full gap-4 sm:gap-6 lg:gap-8">
        {/* "Hi" heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[-0.12em]">
          Hi
        </h2>

        {/* Image collage row */}
        <span className="relative flex flex-row w-full items-center justify-center gap-[6vw] sm:gap-[8vw] lg:gap-35">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter">
            I'm
          </h2>

          {/* illus-logo */}
          <img
            src="/svg/illus-logo.svg"
            alt="logo"
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "13vw",
              maxWidth: "400px",
              left: "43%",
              top: "-25%",
              transform: "translateY(-10%)",
            }}
          />

          {/* illus-im */}
          <img
            src="/svg/illus-im.svg"
            alt="logo"
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "16vw",
              maxWidth: "450px",
              left: "23%",
              top: "-33%",
              transform: "translateY(-10%)",
            }}
          />

          {/* illus-leira */}
          <img
            src="/svg/illus-leira.svg"
            alt="logo"
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "16vw",
              maxWidth: "450px",
              left: "62%",
              top: "-18%",
              transform: "translateY(-10%)",
            }}
          />

          {/* illus-sticker-hiright */}
          <img
            src="/svg/illus-sticker-hiright.svg"
            alt="logo"
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "17vw",
              maxWidth: "450px",
              left: "53%",
              bottom: "50%",
              transform: "translateY(-10%)",
            }}
          />

          {/* illus-sticker-hileft */}
          <img
            src="/svg/illus-sticker-hileft.svg"
            alt="logo"
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "16vw",
              maxWidth: "450px",
              left: "29%",
              bottom: "90%",
              transform: "translateY(-10%)",
            }}
          />

          {/* star 1 */}
          <img
            src="/svg/illus-star.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "8vw",
              maxWidth: "40px",
              left: "43%",
              bottom: "98%",
              transform: "translateY(-10%)",
            }}
          />

          {/* star 2 */}
          <img
            src="/svg/illus-star.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "8vw",
              maxWidth: "40px",
              left: "54%",
              top: "115%",
              transform: "translateY(-10%)",
            }}
          />

          {/*
            gradient text fix:
            - inline-block so bg sizes to the text, not the full row
            - pb-2 px-1 so descenders and side strokes aren't clipped
            - use bright visible colors so gradient shows on dark bg
          */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[-0.12em] inline-block pb-2 px-1"
            style={{
              background: "linear-gradient(to right, #00071b, #3533cd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            ira
          </h2>
        </span>

        {/* Description */}
        <p className="text-xs mt-14 sm:text-sm font-sans text-center max-w-xs sm:max-w-sm md:max-w-sm text-white/80 leading-relaxed">
          I may not be the first person to speak, but my ideas usually arrive{" "}
          <span className="font-bold text-[#004fff]">before my words do</span>.
        </p>

        {/* GitHub & Email links */}
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 mt-1">
          {/* GitHub */}
          <a
            href="https://github.com/leiramariesanbuenaventura"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs sm:text-sm font-sans text-white/70 hover:text-white transition-colors duration-200 group"
            aria-label="GitHub profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0 group-hover:scale-110 transition-transform duration-200"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">leiramariesanbuenaventura</span>
          </a>

          <span className="text-white/30 text-xs">·</span>

          <a
            href="https://www.linkedin.com/in/leiramarie-sanbuenaventura-9777b4398"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs sm:text-sm font-sans text-white/70 hover:text-white transition-colors duration-200 group"
            aria-label="LinkedIn profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0 group-hover:scale-110 transition-transform duration-200"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 19h-2.5v-8.75h2.5v8.75zm-1.25-9.99c-.8 0-1.45-.65-1.45-1.45s.65-1.45 1.45-1.45 1.45.65 1.45 1.45-.65 1.45-1.45 1.45zm12 9.99h-2.5v-4.5c0-1.07-.02-2.45-1.5-2.45-1.5 0-1.73 1.17-1.73 2.38v4.57h-2.5v-8.75h2.4v1.2h.03c.33-.63 1.13-1.3 2.33-1.3 2.5 0 2.97 1.65 2.97 3.8v5.05z" />
            </svg>
            <span className="hidden sm:inline">Connect on LinkedIn</span>
          </a>

          {/* Divider dot */}
          <span className="text-white/30 text-xs">·</span>

          {/* Email */}
          <a
            href="mailto:leiramariesanbuenaventura@gmail.com"
            className="flex items-center gap-2 text-xs sm:text-sm font-sans text-white/70 hover:text-white transition-colors duration-200 group"
            aria-label="Send an email"
          >
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
              className="shrink-0 group-hover:scale-110 transition-transform duration-200"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="hidden sm:inline">leiramariesanbuenaventura@gmail.com</span>
          </a>
          
        </div>
      </div>
    </section>
  );
}
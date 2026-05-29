"use client";

import { DynamicNavigation } from "./dynamic-navigation";

const navLinks = [
  { id: "home",     label: "Home",     href: "/" },
  { id: "about",    label: "About",    href: "/about" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "contact",  label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-6 pointer-events-none">
      <div className="pointer-events-auto flex items-center w-full">

        {/* ── Left: logo icon ── */}
        <a
          href="/"
          aria-label="Home"
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-150 hover:scale-105 mx-4"
        >
          <img src="svg/icon-logo-white.svg" alt="Logo" className="w-9 h-9 object-contain" />
        </a>

        {/* ── Center: frosted pill with nav links ── */}
        <div className="flex-1 flex justify-center">
          <div
            className="rounded-full py-1.5"
            style={{
              background: "rgba(15, 20, 60, 0.55)",
              backdropFilter: "blur(18px) saturate(1.6)",
              WebkitBackdropFilter: "blur(18px) saturate(1.6)",
              border: "1px solid rgba(100, 130, 255, 0.22)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,30,0.45), 0 0 18px rgba(40,80,255,0.12)",
            }}
          >
            <DynamicNavigation
              links={navLinks}
              activeLink="home"
              glowIntensity={0}
              showLabelsOnMobile={true}
              backgroundColor="transparent"
              className="border-0 shadow-none bg-transparent text-xs backdrop-blur-none font-sans"
              textColor="rgba(180,195,255,0.75)"
              highlightColor="rgba(255,255,255,0.10)"
            />
          </div>
        </div>

        {/* ── Right: face icon ── */}
        <a
          href="/contact"
          aria-label="Contact"
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-150 hover:scale-105 mx-4"
          
        >
          <img src="svg/icon-face-white.svg" alt="Contact" className="w-7 h-7 object-contain" />
        </a>

      </div>
    </div>
  );
}
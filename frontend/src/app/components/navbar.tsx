"use client";

import { useState } from "react";
import { DynamicNavigation } from "./dynamic-navigation";

const navLinks = [
  { id: "home",     label: "Home",     href: "/" },
  { id: "about",    label: "About",    href: "/about" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "contact",  label: "Contact",  href: "/contact" },
];

const pillStyle = {
  background: "rgba(15, 20, 60, 0.55)",
  backdropFilter: "blur(18px) saturate(1.6)",
  WebkitBackdropFilter: "blur(18px) saturate(1.6)",
  border: "1px solid rgba(100, 130, 255, 0.22)",
  boxShadow:
    "0 0 0 1px rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,30,0.45), 0 0 18px rgba(40,80,255,0.12)",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

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

        {/* ── Center: frosted pill — desktop (md+) ── */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="rounded-full py-1.5" style={pillStyle}>
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

        {/* ── Right: hamburger (mobile) / contact icon (desktop) ── */}
        <div className="flex-shrink-0 flex items-center justify-end ml-auto mx-4">

          {/* Hamburger — mobile only, no bg or border */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden flex items-center justify-center w-9 h-9 text-white/80 hover:text-white transition-colors duration-150"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
              </svg>
            )}
          </button>

          {/* Right contact icon — desktop only */}
          <a
            href="/contact"
            aria-label="Contact"
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-150 hover:scale-105"
          />
        </div>

      </div>

      {/* ── Mobile dropdown menu ── */}
      <div
        className="md:hidden pointer-events-auto mt-3 mx-4 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          ...pillStyle,
          maxHeight: open ? "300px" : "0px",
          opacity: open ? 1 : 0,
          padding: open ? "0.75rem 0" : "0",
          border: open ? "1px solid rgba(100, 130, 255, 0.22)" : "1px solid transparent",
        }}
      >
        <nav className="flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-sans text-sm px-6 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-150 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
"use client";

import CircularText from "../../components/circular-text";
import TextScrollMarquee from "../../components/marquee-text";
import { useEffect, useState } from "react";

function useCircularSize(mdSize: number, smSize: number, xsSize: number) {
  const [size, setSize] = useState(mdSize);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setSize(w >= 768 ? mdSize : w >= 640 ? smSize : xsSize);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [mdSize, smSize, xsSize]);
  return size;
}

export default function HeroSection1() {
  // md+ = 100px (original), sm = 70px, xs/425px = 40px
  const circularSize = useCircularSize(100, 70, 40);

  return (
    <section className="relative text-white bg-[#000027] overflow-hidden min-h-screen flex flex-col">
      {/* ── Main text block — centered in the full viewport ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 gap-0 w-full">

        {/* ROW 1 — SERVING */}
        <div className="relative w-fit flex items-center justify-center">
          <h1 className="font-gordon text-white uppercase leading-none select-none font-black text-4xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[-0.12em]">
            Serving
          </h1>
          <img
            src="/svg/illus-mascot-wink.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-20 w-12 sm:w-16 md:w-24 lg:w-32 -left-8 sm:-left-10 md:-left-16 top-1/2 lg:-left-23 -translate-y-1/2"
          />
        </div>

        {/* ROW 2 — tomorrow's */}
        <div className="relative w-full flex items-center justify-center">

          {/* md+ layout */}
          <div className="hidden md:flex items-center justify-center">
            <span className="font-dreams text-white lowercase leading-none font-black text-4xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight">
              tomorr
            </span>
            {/* No isolation on this div — lets the mascot's z-index compete at the row level */}
            <div
              className="relative flex-shrink-0 flex items-center justify-center"
              style={{ width: circularSize, height: circularSize }}
            >
              <CircularText
                text="For your reference*"
                onHover="speedUp"
                spinDuration={20}
                size={circularSize}
                className="absolute inset-0"
              />
              <img
                src="/svg/illus-mascot.svg"
                alt=""
                aria-hidden="true"
                className="absolute w-[12vw] max-w-[130px] lg:-bottom-[22%] md:-bottom-[12%] sm:-bottom-[5%] lg:-right-[30%] md:-right-[55%] sm:-right-[50%] translate-x-[30%]"
                style={{ zIndex: 30 }}
              />
            </div>
            <span className="font-dreams text-white lowercase leading-none font-black text-4xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight ml-11">
              w's
            </span>
          </div>

          {/* <md inline row */}
          <div className="flex md:hidden items-center justify-center">
            <span className="font-dreams text-white lowercase leading-none font-black text-4xl sm:text-4xl tracking-tight">
              tomorr
            </span>
            <div
              className="relative flex-shrink-0"
              style={{ width: circularSize, height: circularSize }}
            >
              <CircularText
                text="For your reference*"
                onHover="speedUp"
                spinDuration={20}
                size={circularSize}
                className="absolute inset-0"
              />
            </div>
            <img
              src="/svg/illus-mascot.svg"
              alt=""
              aria-hidden="true"
              style={{ width: "2.7em", height: "2.7em", flexShrink: 0 }}
            />
            <span
              className="font-dreams text-white lowercase leading-none font-black text-4xl sm:text-5xl tracking-tight z-20"
            
            >
              w's
            </span>
          </div>
        </div>

        {/* ROW 3 — TECH TODAY */}
        <div className="relative w-full flex items-center justify-center">

          {/* md+ layout */}
          <div className="hidden md:flex flex-row items-center justify-center">
            <span
              className="font-gordon text-white uppercase font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.12em] leading-none select-none"
              style={{ fontWeight: 900, marginRight: "-0.70em" }}
            >
              Tech
            </span>
            <img
              src="/svg/illus-mascot-squint.svg"
              alt=""
              aria-hidden="true"
              className="relative z-20 self-end"
              style={{
                width: "12vw",
                maxWidth: "130px",
                bottom: "-6%",
                right: "-0.5%",
                transform: "translateX(30%)",
              }}
            />
            <span
              className="font-gordon text-white uppercase leading-none select-none font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.12em]"
              style={{ fontWeight: 900 }}
            >
              Today
            </span>
          </div>

          {/* <md inline */}
          <div className="flex md:hidden items-center justify-center">
            <span className="font-gordon text-white uppercase font-black text-4xl sm:text-5xl tracking-[-0.12em] leading-none select-none">
              Tech
            </span>
            <img
              src="/svg/illus-mascot-squint.svg"
              alt=""
              aria-hidden="true"
              className="self-end"
              style={{ width: "2.7em", height: "2.7em", flexShrink: 0 }}
            />
            <span className="font-gordon text-white uppercase leading-none select-none font-black text-4xl sm:text-5xl tracking-[-0.12em]">
              Today
            </span>
          </div>
        </div>

      </div>

      {/* ── Footer byline + marquee — pinned to bottom ── */}
      <div className="relative z-10 mt-auto flex flex-col gap-3">
        <div className="w-full flex flex-row items-center justify-center gap-3 pb-6 px-6">
          <span className="text-white/55 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm tracking-wide font-sans">
            Software{" "}
            <strong className="text-white font-semibold">Developer ✳</strong>
          </span>
          <div className="text-left font-sans text-xs sm:text-xs md:text-xs lg:text-sm">
            <p className="text-white font-semibold  leading-tight">Leiramarie</p>
            <p className="text-white/55">San Buenaventura</p>
          </div>
        </div>
        <TextScrollMarquee baseVelocity={2}>
          Java ✳ User Interface (UI) Designer ✳ Frontend Programmer ✳ PHP ✳
          Software Developer ✳ Tailwind CSS ✳ UI/UX Enthusiast ✳ Web Developer ✳
          Tech Innovator ✳
        </TextScrollMarquee>
      </div>
    </section>
  );
}
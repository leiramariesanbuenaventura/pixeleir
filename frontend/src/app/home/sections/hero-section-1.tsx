"use client";

import CircularText from "../../components/circular-text";
import TextScrollMarquee from "../../components/marquee-text";

export default function HeroSection1() {
  return (
    <section className="relative text-white overflow-hidden min-h-screen flex flex-col">
      {/* ── Main text block — truly centered in the full viewport ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
        {/* ROW 1 — SERVING */}
        <div className="relative w-full flex items-center justify-center">
          <img
            src="/svg/illus-star.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "10vw",
              maxWidth: "60px",
              left: "25%",
              top: "2%",
              transform: "translateY(-10%)",
            }}
          />
          <img
            src="/svg/illus-star.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "10vw",
              maxWidth: "60px",
              left: "29%",
              bottom: "85%",
              transform: "translateY(-10%)",
            }}
          />
          <img
            src="/svg/illus-serving.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "12vw",
              maxWidth: "130px",
              left: "32%",
              bottom: "-10%",
              transform: "translateY(20%)",
            }}
          />
          <img
            src="/svg/illus-star.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "10vw",
              maxWidth: "60px",
              right: "25%",
              top: "2%",
              transform: "translateY(-10%)",
            }}
          />
          <img
            src="/svg/illus-star.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "10vw",
              maxWidth: "60px",
              right: "28%",
              top: "28%",
              transform: "translateY(-10%)",
            }}
          />
          <img
            src="/svg/illus-star.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "10vw",
              maxWidth: "60px",
              right: "23%",
              top: "55%",
              transform: "translateY(-10%)",
            }}
          />
          <h1 className="font-gordon text-white uppercase leading-none select-none text-7xl font-black tracking-[-0.12em]">
            Serving
          </h1>
        </div>

        {/* ROW 2 — tomorrow's */}
        <div className="relative w-full flex items-center justify-center">
          <div className="flex items-center justify-center">
            <span className="font-dreams text-white lowercase leading-none text-7xl font-black tracking-tight">
              tomorr
            </span>

            <div
              className="relative flex-shrink-0 flex items-center justify-center"
              style={{ width: "100px", height: "105px" }}
            >
              <CircularText
                text="For your reference*"
                onHover="speedUp"
                spinDuration={20}
                className="absolute inset-0"
              />
              <img
                src="/svg/illus-tomorrow.svg"
                alt=""
                aria-hidden="true"
                className="absolute z-1"
                style={{
                  width: "12vw",
                  maxWidth: "130px",
                  bottom: "-18%",
                  right: "-38%",
                  transform: "translateX(30%)",
                }}
              />
            </div>

            <span className="font-dreams text-white lowercase leading-none text-7xl font-black tracking-tight ml-11 z-20">
              w's
            </span>
          </div>
        </div>

        {/* ROW 3 — TECH TODAY */}
        <div className="relative w-full flex flex-row items-center justify-center">
          <span
            className="font-gordon text-white uppercase text-7xl font-black tracking-[-0.12em] leading-none select-none"
            style={{ fontWeight: 900, marginRight: "-0.70em" }}
          >
            Tech
          </span>
          <img
            src="/svg/illus-star.svg"
            alt=""
            aria-hidden="true"
            className="absolute z-20"
            style={{
              width: "10vw",
              maxWidth: "60px",
              left: "38%",
              top: "90%",
              transform: "translateY(-10%)",
            }}
          />
          <img
            src="/svg/illus-techtoday.svg"
            alt=""
            aria-hidden="true"
            className="relative z-20 self-end"
            style={{
              width: "10vw",
              maxWidth: "113px",
              bottom: "-6%",
              right: "-0.5%",
              transform: "translateX(30%)",
            }}
          />
          <span
            className="font-gordon text-white uppercase leading-none select-none text-7xl font-black tracking-[-0.12em]"
            style={{ fontWeight: 900 }}
          >
            Today
          </span>
        </div>
      </div>

      {/* ── Footer byline + marquee — pinned to bottom ── */}
      <div className="relative z-10 mt-auto flex flex-col gap-3">
        <div className="w-full flex flex-row items-center justify-center gap-3 pb-6 px-6">
          <span className="text-white/55 text-sm tracking-wide font-sans">
            Software{" "}
            <strong className="text-white font-semibold">Developer  ✳</strong>
          </span>
          <div className="text-left font-sans">
            <p className="text-white font-semibold text-sm leading-tight">
              Leiramarie
            </p>
            <p className="text-white/55 text-sm">San Buenaventura</p>
          </div>
        </div>
        <TextScrollMarquee baseVelocity={2}>
          Java ✳ User Interface (UI) Designer ✳ Frontend Programmer ✳ PHP ✳ Software Developer ✳ Tailwind CSS ✳ UI/UX Enthusiast ✳ Web Developer ✳ Tech Innovator ✳
        </TextScrollMarquee>
      </div>
    </section>
  );
}
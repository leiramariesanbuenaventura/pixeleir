"use client";

import { useLayoutEffect } from "react";
import { SmoothScrollProvider } from "@/app/components/smooth-scroll-provider";
import HeroSection1 from "./sections/hero-section-1";
import SneakPeekSection2 from "./sections/sneak-peek-2";
import IntroSection3 from "./sections/introduction-section-3";
import ToolsUsedSection4 from "./sections/tools-used-section-4";
import SkillsSection5 from "./sections/skills-section-5";
import EducationSection from "./sections/education-section-6";
import WorksSection from "./sections/works-section-7";
import HorizontalScrollSection from "@/app/components/animations/horizontal-scroll";
import Grainient from "../components/granient-background";

export default function HomePage() {
  useLayoutEffect(() => {
    const prevRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      window.history.scrollRestoration = prevRestoration;
    };
  }, []);

  return (
    <SmoothScrollProvider duration={1.2}>
      <main className="relative min-h-screen bg-[#fffdf4]">
        <div className="absolute inset-0 z-0">
          <Grainient
            color1="#001287"
            color2="#000c47"
            color3="#05093a"
            colorBalance={0.1}
            warpStrength={1.2}
            warpFrequency={4.0}
            warpSpeed={1.0}
            warpAmplitude={60}
            blendAngle={-30}
            blendSoftness={0.12}
            rotationAmount={300}
            noiseScale={1.8}
            grainAmount={0.06}
            grainScale={1.5}
            grainAnimated={false}
            contrast={1.6}
            gamma={1.1}
            saturation={1.3}
            zoom={0.85}
            timeSpeed={0.18}
            className="w-full h-full"
          />
        </div>

        {/* Hero */}
        <section className="home-snap-section relative z-10">
          <HeroSection1 />
        </section>

        {/* Horizontal scroll: Sneak Peek + Intro */}
        <section
          className="home-snap-section relative z-10"
          style={{ display: "block", backgroundColor: "#000027" }}
        >
          <HorizontalScrollSection
            entryDwell={1.2}
            transition={1.0}
            exitDwell={1.2}
          >
            <SneakPeekSection2 />
            <IntroSection3 />
          </HorizontalScrollSection>
        </section>

        {/* Tools */}
        <section className="home-snap-section relative z-10">
          <ToolsUsedSection4 />
        </section>

        {/* Skills */}
        <section className="home-snap-section relative z-10">
          <SkillsSection5/>
        </section>

        {/* Education — new */}
        <section className="home-snap-section relative z-10">
          <EducationSection />
        </section>

        {/* Works / Portfolio — new */}
        <section className="home-snap-section relative z-10">
          <WorksSection />
        </section>
      </main>
    </SmoothScrollProvider>
  );
}
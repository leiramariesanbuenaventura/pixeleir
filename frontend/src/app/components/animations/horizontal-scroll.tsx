"use client";

import { useLayoutEffect, useRef, Children } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  entryDwell?: number;
  transition?: number;
  exitDwell?: number;
  bgParallax?: number;
}

export default function HorizontalScrollSection({
  children,
  entryDwell = 1.2,
  transition = 1.0,
  exitDwell  = 1.2,
  bgParallax = 0.35,
}: HorizontalScrollSectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const cloudRef   = useRef<HTMLDivElement>(null);
  const cloudStripRef = useRef<HTMLDivElement>(null);
  const panelRefs  = useRef<Array<HTMLDivElement | null>>([]);

  const panels      = Children.toArray(children);
  const totalPanels = panels.length;

  useLayoutEffect(() => {
    let rafId: number;
    let ctx: gsap.Context | undefined;

    rafId = requestAnimationFrame(() => {
      const wrapper = wrapperRef.current;
      const track   = trackRef.current;
      const cloud   = cloudRef.current;
      const cloudStrip = cloudStripRef.current;
      if (!wrapper || !track || !cloud || !cloudStrip || totalPanels < 2) return;

      ctx = gsap.context(() => {
        const gaps        = totalPanels - 1;
        const totalTravel = track.scrollWidth - window.innerWidth;
        const fullDur     = entryDwell + transition * gaps + exitDwell;
        const cloudTravel = totalTravel * bgParallax;
        const cloudTiles  = 4;

        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;
          gsap.set(panel, {
            opacity: i === 0 ? 1 : 0.35,
            scale: i === 0 ? 1 : 0.985,
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            start: "top top",
            end: () => `+=${window.innerHeight * fullDur}`,
            scrub: 1.3,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track, { x: 0, ease: "none", duration: entryDwell });

        for (let i = 0; i < gaps; i++) {
          const xTo = -(((i + 1) / gaps) * totalTravel);
          const currentPanel = panelRefs.current[i];
          const nextPanel = panelRefs.current[i + 1];

          tl.to(track, { x: xTo, ease: "sine.inOut", duration: transition });

          if (currentPanel && nextPanel) {
            tl.to(currentPanel, { opacity: 0.35, scale: 0.985, ease: "none", duration: transition }, "<");
            tl.to(nextPanel, { opacity: 1, scale: 1, ease: "none", duration: transition }, "<");
          }
        }

        tl.to(track, { x: -totalTravel, ease: "none", duration: exitDwell });
        tl.to(
          cloudStrip,
          {
            x: () => cloudTravel,
            ease: "none",
            duration: fullDur,
            modifiers: {
              x: (value) => {
                const distance = parseFloat(value);
                const loop = cloudStrip.scrollWidth / cloudTiles;
                const wrapped = ((distance % loop) + loop) % loop;
                return `${wrapped}px`;
              },
            },
          },
          0,
        );
      }, wrapper);
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [totalPanels, entryDwell, transition, exitDwell, bgParallax]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000027",
      }}
    >
      {/* Cloud parallax background */}
      <div
        ref={cloudRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          willChange: "transform",
          overflow: "hidden",
        }}
      >
        <div
          ref={cloudStripRef}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "-2vh",
            display: "flex",
            width: "max-content",
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <img
              key={i}
              src="/svg/illus-clouds.svg"
              alt=""
              aria-hidden="true"
              style={{
                display: "block",
                width: "118vw",
                maxWidth: "none",
                height: "auto",
                marginRight: "-8px",
                opacity: 0.22,
                mixBlendMode: "screen",
                userSelect: "none",
                flexShrink: 0,
                transform: i % 2 === 1 ? "scaleX(-1)" : "none",
                transformOrigin: "center",
              }}
            />
          ))}
        </div>
      </div>

      {/* Panel track */}
      <div
        ref={trackRef}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          width: `${totalPanels * 100}vw`,
          height: "100%",
          willChange: "transform",
        }}
      >
        {panels.map((panel, i) => (
          <div
            key={i}
            ref={(node) => {
              panelRefs.current[i] = node;
            }}
            style={{
              width: "100vw",
              height: "100%",
              flexShrink: 0,
              overflow: "visible",
              opacity: i === 0 ? 1 : 0.4,
              transform: i === 0 ? "scale(1)" : "scale(0.985)",
              transformOrigin: "center center",
              willChange: "transform, opacity",
            }}
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
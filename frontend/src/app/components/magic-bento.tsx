"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  showMascotBg?: boolean; // New optional flag to assign the mascot background
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "59, 91, 255";
const MOBILE_BREAKPOINT = 768;

// Configured 6 cards to flow into the asymmetric reference layout structure
const cardData: BentoCardProps[] = [
  { title: "Figma", description: "My primary tool for UI/UX design and prototyping.", label: "Design" },
  { title: "React", description: "Building interactive UIs with components.", label: "Frontend", showMascotBg: true }, // Placed mascot behind React card
  { title: "Next.js", description: "Full-stack React framework for production.", label: "Framework" },
  { title: "Tailwind", description: "Utility-first CSS for rapid styling.", label: "Styling" },
  { title: "VS Code", description: "My go-to code editor.", label: "Tools" },
  { title: "Git", description: "Version control and collaboration.", label: "Workflow" },
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},0.6);pointer-events:none;z-index:100;left:${x}px;top:${y}px;`;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--glow-x", `${((mouseX - rect.left) / rect.width) * 100}%`);
  card.style.setProperty("--glow-y", `${((mouseY - rect.top) / rect.height) * 100}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach((p) =>
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, ease: "back.in(1.7)", onComplete: () => p.parentNode?.removeChild(p) })
    );
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();
    memoizedParticles.current.forEach((particle, index) => {
      const id = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: "none", repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true });
      }, index * 100);
      timeoutsRef.current.push(id);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;

    const onEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) gsap.to(el, { rotateX: 2, rotateY: 2, duration: 0.3, ease: "power2.out", transformPerspective: 1000 });
    };

    const onLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    };

    const onMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      if (enableTilt) gsap.to(el, { rotateX: ((y - cy) / cy) * -4, rotateY: ((x - cx) / cx) * 4, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
      if (enableMagnetism) magnetismAnimationRef.current = gsap.to(el, { x: (x - cx) * 0.02, y: (y - cy) * 0.02, duration: 0.3, ease: "power2.out" });
    };

    const onClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxD = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
      const ripple = document.createElement("div");
      ripple.style.cssText = `position:absolute;width:${maxD * 2}px;height:${maxD * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);left:${x - maxD}px;top:${y - maxD}px;pointer-events:none;z-index:1000;`;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("click", onClick);

    return () => {
      isHoveredRef.current = false;
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("click", onClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement("div");
    spotlight.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.15) 0%,rgba(${glowColor},0.08) 15%,rgba(${glowColor},0.04) 25%,rgba(${glowColor},0.02) 40%,rgba(${glowColor},0.01) 65%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const onMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      const cards = gridRef.current.querySelectorAll(".bento-card");

      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        cards.forEach((c) => (c as HTMLElement).style.setProperty("--glow-intensity", "0"));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDist = Infinity;
      cards.forEach((c) => {
        const cardEl = c as HTMLElement;
        const cr = cardEl.getBoundingClientRect();
        const eff = Math.max(0, Math.hypot(e.clientX - (cr.left + cr.width / 2), e.clientY - (cr.top + cr.height / 2)) - Math.max(cr.width, cr.height) / 2);
        minDist = Math.min(minDist, eff);
        const intensity = eff <= proximity ? 1 : eff <= fadeDistance ? (fadeDistance - eff) / (fadeDistance - proximity) : 0;
        updateCardGlowProperties(cardEl, e.clientX, e.clientY, intensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1 });
      const op = minDist <= proximity ? 0.8 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: op, duration: op > 0 ? 0.2 : 0.5 });
    };

    const onLeave = () => {
      gridRef.current?.querySelectorAll(".bento-card").forEach((c) => (c as HTMLElement).style.setProperty("--glow-intensity", "0"));
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const baseCardClass = `bento-card group flex flex-col justify-between relative w-full p-6 rounded-2xl font-sans overflow-hidden cursor-default transition-all duration-300 ease-out ${enableBorderGlow ? "bento-card--glow" : ""}`;

  const cardStyle = () => ({
    backgroundColor: "#000027",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    boxShadow: "0 0 0 0 rgba(59, 91, 255, 0)",
    color: "#fff",
    "--glow-x": "50%",
    "--glow-y": "50%",
    "--glow-intensity": "0",
    "--glow-radius": "200px",
  } as React.CSSProperties);

  const renderContent = (card: BentoCardProps) => (
    <>
      <div className="flex justify-between items-center gap-3 z-10">
        <span className="font-sans text-xs font-semibold tracking-widest uppercase text-[#3b5bff]">
          {card.label}
        </span>
        <span className="text-white/20 text-xs transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true">▼</span>
      </div>
      
      {/* Background Mascot Integration */}
      {card.showMascotBg && (
        <img 
          src="/svg/illus-mascot-wink.svg" 
          alt="" 
          className="absolute right-[-15px] bottom-[-20px] w-36 h-36 object-contain pointer-events-none opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-300 z-0" 
        />
      )}

      <div className="flex flex-col gap-1.5 mt-auto z-10">
        <h3 className={`font-sans font-extrabold text-lg text-white m-0 tracking-wide uppercase ${textAutoHide ? "bento-clamp-1" : ""}`}>
          {card.title}
        </h3>
        <p className={`font-sans text-xs leading-relaxed text-white/60 ${textAutoHide ? "bento-clamp-2" : ""}`}>
          {card.description}
        </p>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        .bento-section {
          --glow-color: ${glowColor};
        }

        /* Base Mobile Layout */
        .bento-grid {
          display: grid;
          gap: 1.5rem;
          width: 100%;
          grid-template-columns: 1fr;
        }

        /* Tablet/Small Desktop Layout Conversion */
        @media (min-width: 600px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Asymmetric Layout Grid Structure ── */
        @media (min-width: 1024px) {
          .bento-grid {
            grid-template-columns: repeat(12, 1fr);
            grid-auto-rows: minmax(160px, auto);
          }
          
          /* Card 1: Left tall vertical anchor card */
          .bento-grid .bento-card:nth-child(1) {
            grid-column: span 5;
            grid-row: span 2;
          }
          
          /* Card 2: Top right horizontal wide card */
          .bento-grid .bento-card:nth-child(2) {
            grid-column: span 7;
            grid-row: span 1;
          }
          
          /* Card 3: Middle center medium box card */
          .bento-grid .bento-card:nth-child(3) {
            grid-column: span 3;
            grid-row: span 1;
          }
          
          /* Card 4: Middle right medium box card */
          .bento-grid .bento-card:nth-child(4) {
            grid-column: span 4;
            grid-row: span 1;
          }
          
          /* Card 5: Bottom left-center box card */
          .bento-grid .bento-card:nth-child(5) {
            grid-column: span 4;
            grid-row: span 1;
          }
          
          /* Card 6: Bottom right long horizontal footer banner card */
          .bento-grid .bento-card:nth-child(6) {
            grid-column: span 8;
            grid-row: span 1;
          }
        }

        .bento-card {
          min-height: 160px;
        }

        .bento-card--glow {
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        .bento-card--glow:hover {
          transform: scale(1.01) !important;
          border-color: rgba(${glowColor}, 0.4) !important;
          box-shadow: 0 0 25px -5px rgba(${glowColor}, 0.3) !important;
        }

        .bento-card--glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.2)) 40%,
            transparent 70%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }

        .bento-clamp-1 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .bento-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .particle::before {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: rgba(${glowColor}, 0.2);
          border-radius: 50%;
          z-index: -1;
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div className="bento-section w-full" ref={gridRef}>
        <div className="bento-grid">
          {cardData.map((card, index) =>
            enableStars ? (
              <ParticleCard
                key={index}
                className={baseCardClass}
                style={cardStyle()}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
              >
                {renderContent(card)}
              </ParticleCard>
            ) : (
              <div key={index} className={baseCardClass} style={cardStyle()}>
                {renderContent(card)}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default MagicBento;
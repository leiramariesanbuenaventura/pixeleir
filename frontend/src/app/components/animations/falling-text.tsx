"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import styles from "./falling-text.module.css";

type TriggerMode = "auto" | "scroll" | "click" | "hover";

interface FallingTextProps {
  className?: string;
  text?: string;
  highlightWords?: string[];
  highlightClass?: string;
  trigger?: TriggerMode;
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  fontFamily?: string;
}

type WordNode = {
  elem: HTMLSpanElement;
  body: Matter.Body;
};

export default function FallingText({
  className = "",
  text = "",
  highlightWords = [],
  highlightClass = styles.highlighted,
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
  fontFamily,
}: FallingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [effectStarted, setEffectStarted] = useState(false);
  const isEffectActive = trigger === "auto" || effectStarted;

  useEffect(() => {
    if (trigger !== "scroll" || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEffectStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [trigger]);

  useEffect(() => {
    if (!isEffectActive) return;

    const container = containerRef.current;
    const textLayer = textRef.current;
    const canvasContainer = canvasContainerRef.current;
    if (!container || !textLayer || !canvasContainer) return;

    // 1️⃣ Inject HTML first
    const words = text.trim() ? text.split(/\s+/) : [];
    const html = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
        return `<span class="${styles.word} ${isHighlighted ? highlightClass : ""}">${word}</span>`;
      })
      .join(" ");
    textLayer.innerHTML = html;

    let raf1: number;
    let raf2: number;
    let gravityTimeout: ReturnType<typeof setTimeout>;
    let cleanupFn: (() => void) | null = null;

    // 2️⃣ Double RAF — first lets the DOM update, second guarantees paint
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const {
          Body, Bodies, Composite, Engine,
          Events, Mouse, MouseConstraint, Render, Runner,
        } = Matter;

        const containerRect = container.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        if (width <= 0 || height <= 0) return;

        const engine = Engine.create();
        engine.world.gravity.y = 0; // start frozen

        const render = Render.create({
          element: canvasContainer,
          engine,
          options: {
            width,
            height,
            background: backgroundColor,
            wireframes,
            hasBounds: false,
          },
        });

        const boundaryOptions = {
          isStatic: true,
          render: { fillStyle: "transparent" },
        };

        const floor     = Bodies.rectangle(width / 2,  height + 25, width,  50,     boundaryOptions);
        const leftWall  = Bodies.rectangle(-25,         height / 2,  50,     height, boundaryOptions);
        const rightWall = Bodies.rectangle(width + 25, height / 2,  50,     height, boundaryOptions);
        const ceiling   = Bodies.rectangle(width / 2,  -25,         width,  50,     boundaryOptions);

        const wordSpans = Array.from(
          textLayer.querySelectorAll<HTMLSpanElement>(`.${styles.word}`)
        );

        let firstFrame = true;

        const wordBodies: WordNode[] = wordSpans.map((elem) => {
          // ✅ Measured after double RAF — guaranteed to include pill padding
          const rect = elem.getBoundingClientRect();

          const x = Math.random() * (width - rect.width) + rect.width / 2;
          const y = height * 0.6 + Math.random() * (height * 0.35);

          const body = Bodies.rectangle(x, y, rect.width, rect.height, {
            restitution: 0.3,
            frictionAir: 0.05,
            friction: 0.5,
            render: { fillStyle: "transparent" },
          });

          Body.setVelocity(body, { x: 0, y: 0 });
          Body.setAngularVelocity(body, 0);

          elem.style.left = `${x}px`;
          elem.style.top = `${y}px`;
          elem.style.visibility = "hidden";

          return { elem, body };
        });

        const mouse = Mouse.create(container);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse,
          constraint: {
            stiffness: mouseConstraintStiffness,
            render: { visible: false },
          },
        });

        render.mouse = mouse;

        Composite.add(engine.world, [
          floor, leftWall, rightWall, ceiling,
          mouseConstraint,
          ...wordBodies.map((w) => w.body),
        ]);

        const syncWords = () => {
          wordBodies.forEach(({ elem, body }) => {
            elem.style.left = `${body.position.x}px`;
            elem.style.top = `${body.position.y}px`;
            elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
          });
        };

        const onAfterUpdate = () => {
          if (firstFrame) {
            wordBodies.forEach(({ elem }) => {
              elem.style.visibility = "visible";
            });
            firstFrame = false;
          }
          syncWords();
        };

        Events.on(engine, "afterUpdate", onAfterUpdate);

        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        // 3️⃣ Enable gravity after pills are visible
        gravityTimeout = setTimeout(() => {
          engine.world.gravity.y = gravity;
        }, 500);

        cleanupFn = () => {
          Events.off(engine, "afterUpdate", onAfterUpdate);
          Render.stop(render);
          Runner.stop(runner);
          Composite.clear(engine.world, false);
          Engine.clear(engine);
          if (render.canvas?.parentNode) {
            render.canvas.parentNode.removeChild(render.canvas);
          }
        };
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(gravityTimeout);
      cleanupFn?.();
    };
  }, [isEffectActive, text, highlightWords, highlightClass, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.fallingTextContainer} ${className}`.trim()}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        ref={textRef}
        className={styles.fallingTextTarget}
        style={{ fontSize, lineHeight: 1.4, fontFamily }}
      />
      <div ref={canvasContainerRef} className={styles.fallingTextCanvas} />
    </div>
  );
}
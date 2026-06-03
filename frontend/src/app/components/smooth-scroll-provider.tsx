"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const defaultEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

// ─── Context ──────────────────────────────────────────────────────────────────

type LenisContextValue = {
  lenis: Lenis | null;
  /** Call stop() to pause smooth scroll (e.g. during a horizontal drag section) */
  stop: () => void;
  /** Call start() to resume smooth scroll */
  start: () => void;
};

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  stop: () => {},
  start: () => {},
});

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Access the Lenis instance from any child component.
 *
 * @example
 * const { lenis, stop, start } = useLenis();
 *
 * useEffect(() => {
 *   // Pause smooth scroll while your horizontal section is active
 *   stop();
 *   return () => start();
 * }, []);
 */
export function useLenis() {
  return useContext(LenisContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface SmoothScrollProviderProps {
  children: ReactNode;
  /**
   * Smoothing duration in seconds.
   * Lower = snappier, Higher = dreamier. Default: 1.2
   */
  duration?: number;
  /**
   * Easing function applied to the scroll lerp.
   * Default: cubic ease-out
   */
  easing?: (t: number) => number;
  /**
   * Disable smooth scroll on touch devices.
   * Default: true (recommended — native momentum feels better on mobile)
   */
  disableOnTouch?: boolean;
}

export function SmoothScrollProvider({
  children,
  duration = 1.2,
  easing = defaultEasing,
  disableOnTouch = true,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Detect touch — optionally skip smooth scroll
    const isTouch =
      disableOnTouch &&
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;

    const instance = new Lenis({
      duration,
      easing,
      // On touch we keep the instance but with a much shorter lerp
      // so ScrollTrigger still syncs correctly
      ...(isTouch ? { duration: 0 } : {}),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = instance;

    // ── Sync Lenis raf with GSAP ticker ──────────────────────
    // This is the canonical integration: GSAP drives the frame loop,
    // Lenis reads the scroll position, then ScrollTrigger refreshes.
    function onTick(time: number) {
      instance.raf(time * 1000); // gsap time is seconds; lenis expects ms
    }

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0); // prevent jumps after tab switch

    // ── Keep ScrollTrigger in sync with Lenis scroll position ──
    instance.on("scroll", ScrollTrigger.update);

    // ── Tell ScrollTrigger to use Lenis for scroll offset ─────
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      instance.destroy();
      lenisRef.current = null;
      // Reset ScrollTrigger proxy on unmount
      ScrollTrigger.scrollerProxy(document.documentElement, undefined as any);
      ScrollTrigger.refresh();
    };
  }, [duration, easing, disableOnTouch]);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const value = useMemo(() => ({ lenis: lenisRef.current, stop, start }), [stop, start]);

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  );
}
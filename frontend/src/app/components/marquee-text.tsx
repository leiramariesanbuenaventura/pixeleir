'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

interface TextScrollMarqueeProps {
  children: string;
  baseVelocity: number;
  className?: string;
  scrollDependent?: boolean;
  delay?: number;
  direction?: 'left' | 'right';
}

export default function TextScrollMarquee({
  children,
  baseVelocity = 1,
  className,
  scrollDependent = false,
  delay = 0,
  direction = 'left',
}: TextScrollMarqueeProps) {
  // To start the animation from the middle and avoid seeing the text enter the screen,
  // we can initialize baseX to a value within our loop range, e.g., -12.5 for a -25 to 0 range.
  const baseX = useMotionValue(-12.5);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false,
  });

  // With 4 repetitions of the content, we create a seamless loop by wrapping the translation
  // every 25% of the total width. The range is from -25% to 0%.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const directionFactor = useRef<number>(direction === 'left' ? 1 : -1);
  const hasStarted = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      hasStarted.current = true;
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    directionFactor.current = direction === 'left' ? 1 : -1;
  }, [direction]);

  useAnimationFrame((t, delta) => {
    if (!hasStarted.current) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (scrollDependent) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    // To scroll left, `translateX` must become more negative.
    // With our `wrap(-25, 0, v)` transform, this means `baseX` (v) must decrease.
    // Since `moveBy` is positive for a left scroll, we subtract it.
    baseX.set(baseX.get() - moveBy);
  });

  return (
    <div
      className="overflow-hidden font-sans text-sm py-2 whitespace-nowrap flex flex-nowrap"
      style={{
        background: 'rgba(59, 91, 255, 0.2)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(59, 91, 255, 0.15)',
      }}
    >
      <motion.div
        className="flex whitespace-nowrap flex-nowrap"
        style={{ x }}
      >
        {[...Array(4)].map((_, index) => (
          <span key={index} className={cn('block text-sm', className)}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';

type Position = 'top' | 'bottom' | 'left' | 'right';
type CurveType = 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
type TargetType = 'parent' | 'page';
type AnimatedType = boolean | 'scroll';

export interface GradualBlurProps {
  preset?: keyof typeof PRESETS;
  position?: Position;
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: AnimatedType;
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: CurveType;
  responsive?: boolean;
  target?: TargetType;
  className?: string;
  style?: React.CSSProperties;
  hoverIntensity?: number;
  onAnimationComplete?: () => void;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  mobileWidth?: string;
  tabletWidth?: string;
  desktopWidth?: string;
}

const PRESETS = {
  top:           { position: 'top'    as Position, height: '6rem' },
  bottom:        { position: 'bottom' as Position, height: '6rem' },
  left:          { position: 'left'   as Position, height: '6rem' },
  right:         { position: 'right'  as Position, height: '6rem' },
  subtle:        { height: '4rem',  strength: 1,   opacity: 0.8, divCount: 3 },
  intense:       { height: '10rem', strength: 4,   divCount: 8,  exponential: true },
  smooth:        { height: '8rem',  curve: 'bezier' as CurveType, divCount: 10 },
  sharp:         { height: '5rem',  curve: 'linear' as CurveType, divCount: 4 },
  header:        { position: 'top'    as Position, height: '8rem', curve: 'ease-out' as CurveType },
  footer:        { position: 'bottom' as Position, height: '8rem', curve: 'ease-out' as CurveType },
  sidebar:       { position: 'left'   as Position, height: '6rem', strength: 2.5 },
  'page-header': { position: 'top'    as Position, height: '10rem', target: 'page' as TargetType, strength: 3 },
  'page-footer': { position: 'bottom' as Position, height: '10rem', target: 'page' as TargetType, strength: 3 },
} as const;

const DEFAULT_CONFIG: Required<Omit<GradualBlurProps, 'preset' | 'onAnimationComplete' | 'hoverIntensity' | 'width' | 'mobileHeight' | 'tabletHeight' | 'desktopHeight' | 'mobileWidth' | 'tabletWidth' | 'desktopWidth'>> = {
  position:    'bottom',
  strength:    2,
  height:      '6rem',
  divCount:    5,
  exponential: false,
  zIndex:      1000,
  animated:    false,
  duration:    '0.3s',
  easing:      'ease-out',
  opacity:     1,
  curve:       'linear',
  responsive:  false,
  target:      'parent',
  className:   '',
  style:       {},
};

const CURVE_FUNCTIONS: Record<CurveType, (p: number) => number> = {
  linear:       p => p,
  bezier:       p => p * p * (3 - 2 * p),
  'ease-in':    p => p * p,
  'ease-out':   p => 1 - Math.pow(1 - p, 2),
  'ease-in-out':p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};

const getGradientDirection = (position: Position) =>
  ({ top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' })[position];

const debounce = (fn: () => void, wait: number) => {
  let t: ReturnType<typeof setTimeout>;
  return () => { clearTimeout(t); t = setTimeout(fn, wait); };
};

function useResponsiveDimension(
  responsive: boolean,
  base: string | undefined,
  mobile: string | undefined,
  tablet: string | undefined,
  desktop: string | undefined,
) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    if (!responsive) return;
    const calc = () => {
      const w = window.innerWidth;
      if (w <= 480 && mobile)  { setValue(mobile);  return; }
      if (w <= 768 && tablet)  { setValue(tablet);  return; }
      if (w <= 1024 && desktop){ setValue(desktop); return; }
      setValue(base);
    };
    const debounced = debounce(calc, 100);
    calc();
    window.addEventListener('resize', debounced);
    return () => window.removeEventListener('resize', debounced);
  }, [responsive, base, mobile, tablet, desktop]);
  return responsive ? value : base;
}

function useIntersectionObserver(ref: React.RefObject<HTMLDivElement | null>, shouldObserve: boolean) {
  const [isVisible, setIsVisible] = useState(!shouldObserve);
  useEffect(() => {
    if (!shouldObserve || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);
  return isVisible;
}

function GradualBlur(props: GradualBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Merge default → preset → props
  const config = useMemo(() => {
    const presetConfig = props.preset ? PRESETS[props.preset] : {};
    return { ...DEFAULT_CONFIG, ...presetConfig, ...props } as GradualBlurProps & typeof DEFAULT_CONFIG;
  }, [props]);

  const responsiveHeight = useResponsiveDimension(
    config.responsive, config.height,
    config.mobileHeight, config.tabletHeight, config.desktopHeight
  );
  const responsiveWidth = useResponsiveDimension(
    config.responsive, config.width,
    config.mobileWidth, config.tabletWidth, config.desktopWidth
  );

  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');

  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity
        ? config.strength * config.hoverIntensity
        : config.strength;
    const curveFunc = CURVE_FUNCTIONS[config.curve] ?? CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      const blurValue = config.exponential
        ? Math.pow(2, progress * 4) * 0.0625 * currentStrength
        : 0.0625 * (progress * config.divCount + 1) * currentStrength;

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;

      const direction = getGradientDirection(config.position);

      divs.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: '0',
            maskImage: `linear-gradient(${direction}, ${gradient})`,
            WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
            backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            opacity: config.opacity,
            transition:
              config.animated && config.animated !== 'scroll'
                ? `backdrop-filter ${config.duration} ${config.easing}`
                : undefined,
          }}
        />
      );
    }
    return divs;
  }, [config, isHovered]);

  const containerStyle = useMemo<React.CSSProperties>(() => {
    const isVertical   = config.position === 'top'  || config.position === 'bottom';
    const isHorizontal = config.position === 'left' || config.position === 'right';
    const isPageTarget = config.target === 'page';

    const base: React.CSSProperties = {
      position:   isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity:    isVisible ? 1 : 0,
      transition: config.animated ? `opacity ${config.duration} ${config.easing}` : undefined,
      zIndex:     isPageTarget ? (config.zIndex ?? 1000) + 100 : config.zIndex,
      ...config.style,
    };

    if (isVertical) {
      base.height = responsiveHeight ?? '6rem';
      base.width  = responsiveWidth  ?? '100%';
      base[config.position] = 0;
      base.left  = 0;
      base.right = 0;
    } else if (isHorizontal) {
      base.width  = responsiveWidth ?? responsiveHeight ?? '6rem';
      base.height = '100%';
      base[config.position] = 0;
      base.top    = 0;
      base.bottom = 0;
    }

    return base;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  useEffect(() => {
    if (isVisible && config.animated === 'scroll' && config.onAnimationComplete) {
      const ms = parseFloat(config.duration) * 1000;
      const t  = setTimeout(() => config.onAnimationComplete?.(), ms);
      return () => clearTimeout(t);
    }
  }, [isVisible, config]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className ?? ''}`}
      style={containerStyle}
      onMouseEnter={config.hoverIntensity ? () => setIsHovered(true)  : undefined}
      onMouseLeave={config.hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className="gradual-blur-inner">
        {blurDivs}
      </div>
    </div>
  );
}

const GradualBlurMemo = React.memo(GradualBlur);
GradualBlurMemo.displayName = 'GradualBlur';
export { PRESETS, CURVE_FUNCTIONS };
export default GradualBlurMemo;

// Inject all styles once on import
const injectStyles = () => {
  if (typeof document === 'undefined') return;
  const styleId = 'gradual-blur-styles';
  if (document.getElementById(styleId)) return;
  const el = document.createElement('style');
  el.id = styleId;
  el.textContent = `
    .gradual-blur {
      pointer-events: none;
      transition: opacity 0.3s ease-out;
      isolation: isolate;
    }
    .gradual-blur-parent { overflow: hidden; }
    .gradual-blur-inner {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .gradual-blur-inner > div {
      -webkit-backdrop-filter: inherit;
      backdrop-filter: inherit;
    }
    .gradual-blur-fixed {
      position: fixed !important;
      top: 0; left: 0; right: 0; bottom: 0;
      pointer-events: none;
      z-index: 1000;
    }
    @supports not (backdrop-filter: blur(1px)) {
      .gradual-blur-inner > div {
        background: rgba(0, 0, 0, 0.3);
        opacity: 0.5;
      }
    }
  `;
  document.head.appendChild(el);
};

if (typeof document !== 'undefined') injectStyles();
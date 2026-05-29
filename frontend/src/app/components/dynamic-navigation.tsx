"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export interface DynamicNavigationProps {
  links: {
    id: string;
    label: string;
    href: string;
    icon?: React.ReactNode;
  }[];
  backgroundColor?: string;
  textColor?: string;
  highlightColor?: string;
  glowIntensity?: number;
  className?: string;
  showLabelsOnMobile?: boolean;
  onLinkClick?: (id: string) => void;
  activeLink?: string;
  enableRipple?: boolean;
}

export function DynamicNavigation({
  links,
  backgroundColor,
  textColor,
  highlightColor,
  glowIntensity = 5,
  className,
  showLabelsOnMobile = false,
  onLinkClick,
  activeLink,
  enableRipple = true,
}: DynamicNavigationProps) {
  const navRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [internalActive, setInternalActive] = useState<string | null>(
    links.length > 0 ? links[0].id : null
  );
  const active = activeLink ?? internalActive;

  const defaultThemeStyles = {
    bg: backgroundColor ? "" : "bg-background",
    border: "border border-foreground/10",
    text: textColor ? "" : "text-foreground",
    highlight: highlightColor ? "" : "bg-foreground/10",
    glow: `shadow-[0_0_${glowIntensity}px_rgba(255,255,255,0.3)]`,
  };

  const updateHighlightPosition = useCallback(
    (id?: string) => {
      if (!navRef.current || !highlightRef.current) return;

      const activeId = id || active;
      if (!activeId) return;

      const linkElement = navRef.current.querySelector(`#nav-item-${activeId}`);
      if (!linkElement) return;

      const { left, width } = linkElement.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();

      highlightRef.current.style.transform = `translateX(${
        left - navRect.left
      }px)`;
      highlightRef.current.style.width = `${width}px`;
    },
    [active]
  );

  const createRipple = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enableRipple) return;

    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const rect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - diameter / 2}px`;
    circle.style.top = `${event.clientY - rect.top - diameter / 2}px`;
    circle.classList.add(
      "ripple",
      "absolute",
      "bg-white",
      "rounded-full",
      "pointer-events-none",
      "opacity-30",
      "animate-ripple"
    );

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  const handleLinkClick = (
    id: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    createRipple(event);
    setInternalActive(id);
    onLinkClick?.(id);
  };

  useEffect(() => {
    updateHighlightPosition();

    const handleResize = () => {
      updateHighlightPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [links, updateHighlightPosition]);

  return (
    <nav
      ref={navRef}
      className={cn(
        "relative rounded-full backdrop-blur-md border shadow-lg transition-all duration-300",
        defaultThemeStyles.bg,
        defaultThemeStyles.border,
        defaultThemeStyles.glow,
        className
      )}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <div
        ref={highlightRef}
        className={cn(
          "absolute left-0 top-0 z-0 h-full rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
          defaultThemeStyles.highlight
        )}
        style={{ backgroundColor: highlightColor }}
      />

      <ul className="relative z-10 flex items-center justify-between gap-4 py-2">
        {links.map((link) => (
          <li
            key={link.id}
            id={`nav-item-${link.id}`}
            className="mx-1 flex-1 rounded-full px-4 lg:mx-2"
          >
            <a
              href={link.href}
              className={cn(
                "relative flex h-7 items-center justify-center gap-1 overflow-hidden rounded-full text-xs font-medium transition-all duration-300 hover:scale-105",
                defaultThemeStyles.text,
                active === link.id && "font-semibold"
              )}
              onClick={(event) => handleLinkClick(link.id, event)}
              onMouseEnter={() => updateHighlightPosition(link.id)}
            >
              {link.icon && (
                <span className="text-xs text-current">{link.icon}</span>
              )}
              <span className={cn(showLabelsOnMobile ? "flex" : "hidden sm:flex")}>
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ripple {
              to {
                transform: scale(4);
                opacity: 0;
              }
            }

            .animate-ripple {
              animation: ripple 0.6s linear;
            }
          `,
        }}
      />
    </nav>
  );
}

export default DynamicNavigation;

import React from "react";

type PillVariant = "default" | "green" | "yellow" | "red" | "outline";

interface PillProps {
  label: string;
  icon?: React.ReactNode; // Added optional icon prop
  className?: string;
  variant?: PillVariant;
  onClick?: () => void;
}

export default function Pill({
  label,
  icon,
  className = "",
  variant = "default",
  onClick,
}: PillProps) {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all select-none";

  const variants: Record<PillVariant, string> = {
    default:
      "bg-[#0B1220] text-blue-400 border border-blue-500/30 hover:bg-[#0f1a2e]",
    green:
      "bg-[#0B1220] text-emerald-400 border border-emerald-500/30 hover:bg-[#0f1a2e]",
    yellow:
      "bg-[#0B1220] text-yellow-400 border border-yellow-500/30 hover:bg-[#0f1a2e]",
    red:
      "bg-[#0B1220] text-red-400 border border-red-500/30 hover:bg-[#0f1a2e]",
    outline:
      "bg-transparent text-slate-300 border border-slate-600 hover:bg-slate-800/40",
  };

  return (
    <span
      onClick={onClick}
      className={`${base} ${variants[variant]} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {icon && <span className="mr-1.5 flex items-center">{icon}</span>}
      {label}
    </span>
  );
}
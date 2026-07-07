import type { ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso em ms antes da animação começar, útil para escalonar itens de uma lista. */
  delay?: number;
  /** Direção de onde o elemento "chega". */
  direction?: "up" | "left" | "right" | "none";
};

const directionOffset: Record<string, string> = {
  up: "translateY(24px)",
  left: "translateX(-24px)",
  right: "translateX(24px)",
  none: "none",
};

export function Reveal({ children, className, delay = 0, direction = "up" }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : directionOffset[direction],
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

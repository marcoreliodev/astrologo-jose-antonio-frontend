import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "outline" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, variant = "primary", className, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-bronze/40 disabled:cursor-not-allowed disabled:opacity-60";

    const variants: Record<string, string> = {
      primary: "bg-marte text-offwhite hover:bg-marte-dark active:scale-[0.99]",
      outline: "border border-noturno/15 bg-transparent text-noturno hover:bg-noturno/5",
      ghost: "bg-transparent text-noturno hover:bg-noturno/5",
    };

    return (
      <button
        ref={ref}
        className={[base, variants[variant], className ?? ""].join(" ")}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 size={18} className="animate-spin" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

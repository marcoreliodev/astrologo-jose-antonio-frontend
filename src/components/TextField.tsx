import { forwardRef, useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, icon, id, className, type = "text", ...props }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const isPassword = type === "password";
    const [revealed, setRevealed] = useState(false);

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId} className="text-sm font-medium text-ink">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/60">
              {icon}
            </span>
          )}
          <input
            id={fieldId}
            ref={ref}
            type={isPassword ? (revealed ? "text" : "password") : type}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            className={[
              "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft/40",
              "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-bronze/40",
              icon ? "pl-11" : "",
              isPassword ? "pr-11" : "",
              error ? "border-marte focus:border-marte" : "border-line focus:border-bronze",
              className ?? "",
            ].join(" ")}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setRevealed((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft/60 transition-colors hover:text-noturno"
              tabIndex={-1}
              aria-label={revealed ? "Ocultar senha" : "Mostrar senha"}
            >
              {revealed ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p id={`${fieldId}-error`} role="alert" className="text-xs font-medium text-marte">
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";

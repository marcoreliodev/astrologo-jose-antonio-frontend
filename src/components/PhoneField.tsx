import { useId } from "react";
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Phone } from "lucide-react";
import { maskPhone } from "../lib/phone-mask";

interface PhoneFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  error?: string;
  autoComplete?: string;
}

/**
 * Campo de telefone com máscara brasileira aplicada em tempo real:
 * (XX) XXXXX-XXXX. O valor mantido no formulário fica sempre só com
 * dígitos — a máscara é puramente visual.
 */
export function PhoneField<TFieldValues extends FieldValues>({
  control,
  name,
  label = "Telefone",
  error,
  autoComplete = "tel",
}: PhoneFieldProps<TFieldValues>) {
  const generatedId = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={generatedId} className="text-sm font-medium text-ink">
            {label}
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/60">
              <Phone size={18} />
            </span>
            <input
              id={generatedId}
              type="tel"
              inputMode="numeric"
              autoComplete={autoComplete}
              placeholder="(83) 99999-0000"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${generatedId}-error` : undefined}
              value={maskPhone(field.value ?? "")}
              onChange={(event) => field.onChange(maskPhone(event.target.value))}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className={[
                "w-full rounded-xl border bg-white px-4 py-3 pl-11 text-[15px] text-ink placeholder:text-ink-soft/40",
                "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-bronze/40",
                error ? "border-marte focus:border-marte" : "border-line focus:border-bronze",
              ].join(" ")}
            />
          </div>
          {error && (
            <p id={`${generatedId}-error`} role="alert" className="text-xs font-medium text-marte">
              {error}
            </p>
          )}
        </div>
      )}
    />
  );
}

import { useId } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Link } from 'react-router-dom';

interface TermsCheckboxProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  error?: string;
}

export function TermsCheckbox<TFieldValues extends FieldValues>({
  control,
  name,
  error,
}: TermsCheckboxProps<TFieldValues>) {
  const generatedId = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={generatedId}
            className="flex cursor-pointer items-start gap-2.5"
          >
            <input
              id={generatedId}
              type="checkbox"
              checked={Boolean(field.value)}
              onChange={(event) => field.onChange(event.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${generatedId}-error` : undefined}
              className={[
                'mt-0.5 h-4 w-4 shrink-0 rounded border text-marte focus:outline-none focus:ring-2 focus:ring-bronze/40',
                error ? 'border-marte' : 'border-line',
              ].join(' ')}
            />
            <span className="text-sm leading-relaxed text-ink-soft">
              Li e aceito os{' '}
              <Link
                to="/termos-de-uso"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-noturno underline underline-offset-2 hover:text-marte"
              >
                Termos de Uso
              </Link>{' '}
              e a{' '}
              <Link
                to="/politica-de-privacidade"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-noturno underline underline-offset-2 hover:text-marte"
              >
                Política de Privacidade
              </Link>
              .
            </span>
          </label>
          {error && (
            <p
              id={`${generatedId}-error`}
              role="alert"
              className="text-xs font-medium text-marte"
            >
              {error}
            </p>
          )}
        </div>
      )}
    />
  );
}

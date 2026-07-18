import { useEffect, useId, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Search, Loader2 } from "lucide-react";
import { searchCities } from "../api/charts";
import type { CityOption } from "../types/charts";

export function CityAutocomplete({
  value,
  onSelect,
  onClear,
  error,
}: {
  value: string;
  onSelect: (city: CityOption) => void;
  onClear?: () => void;
  error?: string;
}) {
  const fieldId = useId();
  const [query, setQuery] = useState(value);
  const [debouncedQuery, setDebouncedQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 350);
    return () => window.clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const shouldSearch = debouncedQuery.trim().length >= 3 && debouncedQuery !== value;

  const { data, isFetching } = useQuery({
    queryKey: ["charts", "cities", debouncedQuery],
    queryFn: () => searchCities(debouncedQuery.trim()),
    enabled: shouldSearch,
    staleTime: 60 * 1000,
  });

  const results: CityOption[] = shouldSearch ? (data ?? []) : [];

  return (
    <div className="flex flex-col gap-1.5" ref={wrapperRef}>
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        Cidade de nascimento
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft/60">
          <MapPin size={18} />
        </span>
        <input
          id={fieldId}
          type="text"
          autoComplete="off"
          placeholder="Digite a cidade de nascimento…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            onClear?.();
          }}
          onFocus={() => setOpen(true)}
          aria-invalid={Boolean(error)}
          className={[
            "w-full rounded-xl border bg-white px-4 py-3 pl-11 pr-10 text-[15px] text-ink placeholder:text-ink-soft/40",
            "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-bronze/40",
            error ? "border-marte focus:border-marte" : "border-line focus:border-bronze",
          ].join(" ")}
        />
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft/60">
          {isFetching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
        </span>

        {open && shouldSearch && (
          <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-line bg-white shadow-lg">
            {isFetching ? (
              <p className="px-4 py-3 text-sm text-ink-soft">Buscando cidades…</p>
            ) : results.length === 0 ? (
              <p className="px-4 py-3 text-sm text-ink-soft">Nenhuma cidade encontrada.</p>
            ) : (
              <ul className="max-h-64 overflow-y-auto">
                {results.map((city, index) => (
                  <li key={`${city.lat}-${city.lon}-${index}`}>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery(city.displayName);
                        setOpen(false);
                        onSelect(city);
                      }}
                      className="flex w-full items-start gap-2 px-4 py-2.5 text-left text-sm text-ink transition-colors hover:bg-bronze-light/20"
                    >
                      <MapPin size={15} className="mt-0.5 shrink-0 text-bronze" />
                      {city.displayName}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {error && (
        <p role="alert" className="text-xs font-medium text-marte">
          {error}
        </p>
      )}
    </div>
  );
}

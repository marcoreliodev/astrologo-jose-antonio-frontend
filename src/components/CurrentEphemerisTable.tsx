import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getCurrentEphemeris } from "../api/ephemeris";
import { getApiErrorMessage } from "../lib/api-client";
import { translatePlanet } from "../lib/astro-labels";
import { POINT_ICONS, RETROGRADE_ICON, SIGN_ICONS } from "../lib/zodiac-icons";
import { ZodiacGlyph } from "./ZodiacGlyph";
import { AlertBanner } from "./AlertBanner";
import type { EphemerisBody, EphemerisResponse } from "../types/ephemeris";

const MONTH_LABELS = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez",
];

function formatUtc(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = MONTH_LABELS[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${day}-${month}-${year}, ${hours}:${minutes}`;
}

function formatBrasilia(iso: string): string {
  const date = new Date(iso);
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const month = get("month").replace(".", "");
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  return `${get("day")}-${capitalizedMonth}-${get("year")}, ${get("hour")}:${get("minute")}`;
}

/** Formata a declinação (grau decimal, com sinal) como graus/minutos, ex: "20°05' N" / "4°21' S". */
function formatDeclination(declination: number): string {
  const hemisphere = declination >= 0 ? "N" : "S";
  const abs = Math.abs(declination);
  const degrees = Math.floor(abs);
  const minutes = Math.round((abs - degrees) * 60);
  return `${degrees}°${String(minutes).padStart(2, "0")}' ${hemisphere}`;
}

function EphemerisRow({ body }: { body: EphemerisBody }) {
  return (
    <tr className="border-b border-line transition-colors last:border-0 hover:bg-bronze-light/10">
      <td className="whitespace-nowrap px-4 py-3">
        <span className="inline-flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-noturno text-offwhite shadow-sm">
            <ZodiacGlyph svg={POINT_ICONS[body.name]} size={20} />
          </span>
          <span className="font-display font-semibold text-noturno">
            {translatePlanet(body.name)}
          </span>
        </span>
      </td>
      <td className="whitespace-nowrap px-3 py-3 text-right text-base font-semibold text-noturno">
        {body.degInSign}°
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bronze/15 text-bronze">
          <ZodiacGlyph svg={SIGN_ICONS[body.signName]} size={20} />
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-3 font-medium text-ink-soft">
        {body.minute}'{body.second}"
        {body.retrograde && (
          <span
            className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-marte/10 px-1.5 py-0.5 text-marte"
            title="Retrógrado"
          >
            <ZodiacGlyph svg={RETROGRADE_ICON} size={12} />
            <span className="text-[10px] font-bold uppercase">r</span>
          </span>
        )}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-ink-soft">
        {formatDeclination(body.declination)}
      </td>
    </tr>
  );
}

export function CurrentEphemerisTable() {
  const [data, setData] = useState<EphemerisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCurrentEphemeris()
      .then((response) => {
        if (active) setData(response);
      })
      .catch((err) => {
        if (active) setError(getApiErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border-2 border-line bg-white p-8 text-center text-sm text-ink-soft shadow-lg">
        Carregando posições atuais dos planetas...
      </div>
    );
  }

  if (error || !data) {
    return <AlertBanner message={error ?? "Não foi possível carregar as efemérides."} />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-bronze/25 bg-white shadow-lg shadow-bronze/10">
      <div className="border-b border-line bg-noturno px-5 py-4 sm:px-6">
        <h3 className="font-display text-lg font-semibold text-offwhite sm:text-xl">
          Posições atuais dos planetas
        </h3>
        <div className="mt-2 flex flex-col gap-1 text-xs font-medium text-offwhite/70 sm:flex-row sm:flex-wrap sm:gap-x-5">
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {formatUtc(data.calculatedAt)} UT/GMT
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {formatBrasilia(data.calculatedAt)} horário de Brasília
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-bronze-light/15 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-2.5">Planeta</th>
              <th className="px-3 py-2.5 text-right">Grau</th>
              <th className="px-3 py-2.5">Signo</th>
              <th className="px-4 py-2.5">Min/Seg</th>
              <th className="px-4 py-2.5">Declinação</th>
            </tr>
          </thead>
          <tbody>
            {data.bodies.map((body) => (
              <EphemerisRow key={body.name} body={body} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

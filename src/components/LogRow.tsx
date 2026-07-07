import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { LogEntry } from "../types/logs";
import { LogLevelBadge } from "./LogLevelBadge";
import { StatusCodeBadge } from "./StatusCodeBadge";
import { describeLog, formatLogTime, maskSensitiveHeaders } from "../lib/log-utils";

export function LogRow({ entry }: { entry: LogEntry }) {
  const [expanded, setExpanded] = useState(false);
  const { title, subtitle } = describeLog(entry);

  const maskedEntry = {
    ...entry,
    req: entry.req
      ? { ...entry.req, headers: maskSensitiveHeaders(entry.req.headers) }
      : entry.req,
  };

  return (
    <>
      <tr
        className="cursor-pointer border-b border-line last:border-0 hover:bg-noturno/[0.02]"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <td className="w-8 px-4 py-3.5 text-ink-soft">
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </td>
        <td className="px-3 py-3.5 text-xs text-ink-soft tabular-nums">{formatLogTime(entry.time)}</td>
        <td className="px-3 py-3.5">
          <LogLevelBadge level={entry.level} />
        </td>
        <td className="px-3 py-3.5">
          <p className="max-w-md truncate font-medium text-ink">{title}</p>
          {subtitle && subtitle !== title && (
            <p className="max-w-md truncate text-xs text-ink-soft">{subtitle}</p>
          )}
        </td>
        <td className="px-3 py-3.5">
          <StatusCodeBadge status={entry.res?.statusCode ?? entry.status} />
        </td>
        <td className="px-3 py-3.5 text-xs text-ink-soft tabular-nums">
          {entry.responseTime != null ? `${entry.responseTime}ms` : "—"}
        </td>
      </tr>

      {expanded && (
        <tr className="border-b border-line last:border-0 bg-noturno/[0.015]">
          <td colSpan={6} className="px-4 py-4">
            <pre className="max-h-80 overflow-auto rounded-xl bg-noturno p-4 text-xs leading-relaxed text-offwhite/90">
              {JSON.stringify(maskedEntry, null, 2)}
            </pre>
          </td>
        </tr>
      )}
    </>
  );
}

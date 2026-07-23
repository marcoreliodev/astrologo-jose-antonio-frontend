import { api } from "../lib/api-client";
import type { EphemerisResponse } from "../types/ephemeris";

export async function getCurrentEphemeris(): Promise<EphemerisResponse> {
  const { data } = await api.get<EphemerisResponse>("/ephemeris/current");
  return data;
}

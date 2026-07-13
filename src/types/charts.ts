export interface CityOption {
  lat: number;
  lon: number;
  displayName: string;
}

export interface ChartPlanet {
  name: string;
  longitude: number;
  sign: number;
  signName: string;
  degInSign: number;
  retrograde: boolean;
  speed: number;
}

export interface ChartCusp {
  house: number;
  longitude: number;
  sign: number;
  signName: string;
  degInSign: number;
}

export interface ChartAngles {
  asc: number;
  mc: number;
  dsc: number;
  ic: number;
}

export interface ChartAspect {
  planet1: string;
  planet2: string;
  aspect: string;
  angle: number;
  orb: number;
}

export interface ChartData {
  planets: ChartPlanet[];
  cusps: ChartCusp[];
  angles: ChartAngles;
  aspects: ChartAspect[];
}

export interface AstralChart {
  id: string;
  name: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  birthHour: number;
  birthMin: number;
  lat: number;
  lon: number;
  tzone: number;
  city: string;
  chartData: ChartData;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChartPayload {
  name: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  birthHour: number;
  birthMin: number;
  lat: number;
  lon: number;
  tzone: number;
  city: string;
}

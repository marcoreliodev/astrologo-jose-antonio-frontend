export interface EphemerisBody {
  name: string;
  longitude: number;
  sign: number;
  signName: string;
  degInSign: number;
  minute: number;
  second: number;
  longitudeFormatted: string;
  speedLongitude: number;
  retrograde: boolean;
  latitude: number;
  distance: number;
  declination: number;
}

export interface EphemerisResponse {
  calculatedAt: string;
  bodies: EphemerisBody[];
}

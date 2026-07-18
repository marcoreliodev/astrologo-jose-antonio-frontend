export const SIGN_LABELS: Record<string, string> = {
  Aries: "Áries",
  Taurus: "Touro",
  Gemini: "Gêmeos",
  Cancer: "Câncer",
  Leo: "Leão",
  Virgo: "Virgem",
  Libra: "Libra",
  Scorpio: "Escorpião",
  Sagittarius: "Sagitário",
  Capricorn: "Capricórnio",
  Aquarius: "Aquário",
  Pisces: "Peixes",
};

/** Pequeno resumo do signo solar, exibido no resultado do mapa astral. */
export const SIGN_DESCRIPTIONS: Record<string, string> = {
  Aries:
    "Signo de fogo regido por Marte. Áries carrega energia pioneira, coragem e impulso para agir primeiro e pensar depois — a chama que dá início a tudo.",
  Taurus:
    "Signo de terra regido por Vênus. Touro busca estabilidade, prazer e conforto material, com uma determinação tranquila e um gosto refinado pelas coisas boas da vida.",
  Gemini:
    "Signo de ar regido por Mercúrio. Gêmeos é curioso, comunicativo e adaptável, sempre em busca de novas ideias, conversas e conexões.",
  Cancer:
    "Signo de água regido pela Lua. Câncer é sensível, protetor e profundamente ligado à família e às emoções, criando raízes fortes por onde passa.",
  Leo: "Signo de fogo regido pelo Sol. Leão tem brilho, generosidade e vontade de se expressar, irradiando confiança e calor para quem está ao redor.",
  Virgo:
    "Signo de terra regido por Mercúrio. Virgem é analítico, dedicado e detalhista, com talento para organizar, aperfeiçoar e cuidar do que é importante.",
  Libra:
    "Signo de ar regido por Vênus. Libra busca equilíbrio, harmonia e justiça nas relações, com um olhar estético apurado e talento para mediar conflitos.",
  Scorpio:
    "Signo de água regido por Plutão. Escorpião é intenso, magnético e investigativo, com uma força emocional profunda e capacidade de transformação.",
  Sagittarius:
    "Signo de fogo regido por Júpiter. Sagitário é otimista, aventureiro e filosófico, sempre em busca de expansão, liberdade e novos horizontes.",
  Capricorn:
    "Signo de terra regido por Saturno. Capricórnio é disciplinado, ambicioso e responsável, construindo resultados sólidos com paciência e persistência.",
  Aquarius:
    "Signo de ar regido por Urano. Aquário é original, independente e visionário, com um olhar voltado para o coletivo e para o futuro.",
  Pisces:
    "Signo de água regido por Netuno. Peixes é sensível, intuitivo e criativo, com uma conexão espiritual profunda e grande capacidade de empatia.",
};

export const PLANET_LABELS: Record<string, string> = {
  Sun: "Sol",
  Moon: "Lua",
  Mercury: "Mercúrio",
  Venus: "Vênus",
  Mars: "Marte",
  Jupiter: "Júpiter",
  Saturn: "Saturno",
  Uranus: "Urano",
  Neptune: "Netuno",
  Pluto: "Plutão",
  NorthNode: "Nodo Norte",
  Chiron: "Quíron",
};

export const ASPECT_LABELS: Record<string, string> = {
  conjunction: "Conjunção",
  opposition: "Oposição",
  square: "Quadratura",
  trine: "Trígono",
  sextile: "Sextil",
  quincunx: "Quincúncio",
  semisextile: "Semisextil",
  sesquisquare: "Sesquiquadratura",
};

export const SIGN_ORDER = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export const POINT_GLYPHS: Record<string, string> = {
  AC: "As",
  MC: "Mc",
};

export const ASPECT_GLYPHS: Record<string, string> = {
  conjunction: "☌",
  opposition: "☍",
  square: "□",
  trine: "△",
  sextile: "⚹",
  semisextile: "⚺",
  quincunx: "⚻",
  sesquisquare: "⚼",
};

/** Graus/orbes usados para classificar aspectos entre dois pontos quaisquer (usado para AC/MC, que a API não inclui na lista de aspectos). */
const ASPECT_DEFINITIONS: { name: string; degree: number; orb: number }[] = [
  { name: "conjunction", degree: 0, orb: 8 },
  { name: "semisextile", degree: 30, orb: 2 },
  { name: "sextile", degree: 60, orb: 6 },
  { name: "square", degree: 90, orb: 8 },
  { name: "trine", degree: 120, orb: 8 },
  { name: "sesquisquare", degree: 135, orb: 2 },
  { name: "quincunx", degree: 150, orb: 3 },
  { name: "opposition", degree: 180, orb: 8 },
];

export function angularDistance(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

export function findAspect(longitudeA: number, longitudeB: number): string | null {
  const distance = angularDistance(longitudeA, longitudeB);
  for (const definition of ASPECT_DEFINITIONS) {
    if (Math.abs(distance - definition.degree) <= definition.orb) {
      return definition.name;
    }
  }
  return null;
}

export function signFromLongitude(longitude: number): { signName: string; degInSign: number } {
  const normalized = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  return { signName: SIGN_ORDER[signIndex], degInSign: normalized - signIndex * 30 };
}

export function getHouseOfLongitude(longitude: number, cusps: number[]): number {
  const normalized = ((longitude % 360) + 360) % 360;
  for (let i = 0; i < 12; i++) {
    const start = cusps[i];
    const end = cusps[(i + 1) % 12];
    if (start <= end) {
      if (normalized >= start && normalized < end) return i + 1;
    } else if (normalized >= start || normalized < end) {
      return i + 1;
    }
  }
  return 1;
}

export function formatDegreeDMS(degInSign: number): string {
  const degrees = Math.floor(degInSign);
  const minutesFull = (degInSign - degrees) * 60;
  const minutes = Math.floor(minutesFull);
  const seconds = Math.round((minutesFull - minutes) * 60);
  return `${degrees}° ${String(minutes).padStart(2, "0")}' ${String(seconds).padStart(2, "0")}"`;
}


export function translateSign(signName: string): string {
  return SIGN_LABELS[signName] ?? signName;
}

export function translatePlanet(name: string): string {
  return PLANET_LABELS[name] ?? name;
}

export function translateAspect(aspect: string): string {
  return ASPECT_LABELS[aspect] ?? aspect;
}

export function formatDegree(degInSign: number): string {
  const degrees = Math.floor(degInSign);
  const minutes = Math.round((degInSign - degrees) * 60);
  return `${degrees}°${minutes.toString().padStart(2, "0")}'`;
}

export const HOUSE_ORDINALS = [
  "1ª",
  "2ª",
  "3ª",
  "4ª",
  "5ª",
  "6ª",
  "7ª",
  "8ª",
  "9ª",
  "10ª",
  "11ª",
  "12ª",
];

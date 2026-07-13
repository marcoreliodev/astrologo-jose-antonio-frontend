import aries from "zodiacfonts/icons/signs/aries.svg?raw";
import taurus from "zodiacfonts/icons/signs/taurus.svg?raw";
import gemini from "zodiacfonts/icons/signs/gemini.svg?raw";
import cancer from "zodiacfonts/icons/signs/cancer.svg?raw";
import leo from "zodiacfonts/icons/signs/leo.svg?raw";
import virgo from "zodiacfonts/icons/signs/virgo.svg?raw";
import libra from "zodiacfonts/icons/signs/libra.svg?raw";
import scorpio from "zodiacfonts/icons/signs/scorpio.svg?raw";
import sagittarius from "zodiacfonts/icons/signs/sagittarius.svg?raw";
import capricorn from "zodiacfonts/icons/signs/capricorn.svg?raw";
import aquarius from "zodiacfonts/icons/signs/aquarius.svg?raw";
import pisces from "zodiacfonts/icons/signs/pisces.svg?raw";

import sun from "zodiacfonts/icons/main-planets/sun.svg?raw";
import moon from "zodiacfonts/icons/main-planets/moon.svg?raw";
import mercury from "zodiacfonts/icons/main-planets/mercury.svg?raw";
import venus from "zodiacfonts/icons/main-planets/venus.svg?raw";
import mars from "zodiacfonts/icons/main-planets/mars.svg?raw";
import jupiter from "zodiacfonts/icons/main-planets/jupiter.svg?raw";
import saturn from "zodiacfonts/icons/main-planets/saturn.svg?raw";
import uranus from "zodiacfonts/icons/main-planets/uranus.svg?raw";
import neptune from "zodiacfonts/icons/main-planets/neptune.svg?raw";
import pluto from "zodiacfonts/icons/main-planets/pluto.svg?raw";
import chiron from "zodiacfonts/icons/dwarf-planets-and-asteroids/chiron.svg?raw";
import northNode from "zodiacfonts/icons/celestial-points/north-node.svg?raw";
import ascendant from "zodiacfonts/icons/houses/ascendant.svg?raw";
import mediumCoeli from "zodiacfonts/icons/houses/medium-coeli.svg?raw";

import retrograde from "zodiacfonts/icons/movements/retrograde.svg?raw";

import conjunction from "zodiacfonts/icons/major-aspects/conjunction.svg?raw";
import sextile from "zodiacfonts/icons/major-aspects/sextile.svg?raw";
import square from "zodiacfonts/icons/major-aspects/square.svg?raw";
import trine from "zodiacfonts/icons/major-aspects/trine.svg?raw";
import opposition from "zodiacfonts/icons/major-aspects/opposition.svg?raw";

export const SIGN_ICONS: Record<string, string> = {
  Aries: aries,
  Taurus: taurus,
  Gemini: gemini,
  Cancer: cancer,
  Leo: leo,
  Virgo: virgo,
  Libra: libra,
  Scorpio: scorpio,
  Sagittarius: sagittarius,
  Capricorn: capricorn,
  Aquarius: aquarius,
  Pisces: pisces,
};

export const POINT_ICONS: Record<string, string> = {
  Sun: sun,
  Moon: moon,
  Mercury: mercury,
  Venus: venus,
  Mars: mars,
  Jupiter: jupiter,
  Saturn: saturn,
  Uranus: uranus,
  Neptune: neptune,
  Pluto: pluto,
  Chiron: chiron,
  NorthNode: northNode,
  AC: ascendant,
  MC: mediumCoeli,
};

export const ASPECT_ICONS: Record<string, string> = {
  conjunction,
  sextile,
  square,
  trine,
  opposition,
};

export const RETROGRADE_ICON = retrograde;

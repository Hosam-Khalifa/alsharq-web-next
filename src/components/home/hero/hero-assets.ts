export const HERO_ASSETS = {
  factoryLight: "/images/Homehero/home-hero-scene-light.webp",
  factoryDark: "/images/Homehero/home-hero-scene-dark.webp",
} as const;

/** Homepage hero cinematic sequence — play in order, then restart from 01. */
export const HERO_VIDEOS = [
  "/videos/home/Alsharq-01.mp4",
  "/videos/home/Alsharq-02.mp4",
  "/videos/home/Alsharq-03.mp4",
  "/videos/home/Alsharq-04.mp4",
  "/videos/home/Alsharq-05.mp4",
  "/videos/home/Alsharq-06.mp4",
] as const;

export const HERO_IMAGE_DIMENSIONS = {
  width: 2560,
  height: 1440,
} as const;

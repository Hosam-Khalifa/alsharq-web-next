import type { DoorProduct } from "./types";

const ASSET_BASE = "/images/door-showcase";

export const DOOR_SHOWCASE_ASSETS = {
  backgroundLight: `${ASSET_BASE}/optional/door-showcase-bg-light.webp`,
  backgroundDark: `${ASSET_BASE}/optional/door-showcase-bg-dark.webp`,
  platform: `${ASSET_BASE}/optional/door-platform.png`,
} as const;

export const DOOR_PRODUCTS: DoorProduct[] = [
  {
    code: "SHD-593",
    name: "Natural Oak",
    door: `${ASSET_BASE}/doors/door-shd593.png`,
    texture: `${ASSET_BASE}/textures/texture-shd593.webp`,
  },
  {
    code: "SHD-601",
    name: "Dark Walnut",
    door: `${ASSET_BASE}/doors/door-shd601.png`,
    texture: `${ASSET_BASE}/textures/texture-shd601.webp`,
  },
  {
    code: "SHD-605",
    name: "Warm Walnut",
    door: `${ASSET_BASE}/doors/door-shd605.png`,
    texture: `${ASSET_BASE}/textures/texture-shd605.webp`,
  },
];

export const AUTOPLAY_INTERVAL_MS = 5000;
export const AUTOPLAY_RESUME_MS = 8000;
export const SLIDE_TRANSITION_MS = 500;
export const SWIPE_THRESHOLD_PX = 48;

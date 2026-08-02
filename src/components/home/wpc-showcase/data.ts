import type { WpcBoard } from "./types";

const ASSET_BASE = "/images/wpc-showcase";

export const WPC_SHOWCASE_ASSETS = {
  backgroundLight: `${ASSET_BASE}/backgrounds/wpc-bg-light.webp`,
  backgroundDark: `${ASSET_BASE}/backgrounds/wpc-bg-dark.webp`,
} as const;

export const WPC_BOARDS: WpcBoard[] = [
  {
    id: "05",
    image: `${ASSET_BASE}/boards/board-05mm.png`,
    width: 2200,
    height: 2800,
  },
  {
    id: "08",
    image: `${ASSET_BASE}/boards/board-08mm.png`,
    width: 2200,
    height: 2800,
  },
  {
    id: "12",
    image: `${ASSET_BASE}/boards/board-12mm.png`,
    width: 2200,
    height: 2800,
  },
  {
    id: "19",
    image: `${ASSET_BASE}/boards/board-19mm.png`,
    width: 2200,
    height: 2800,
  },
];

export const SLIDE_TRANSITION_MS = 600;
export const SWIPE_THRESHOLD_PX = 48;

import type { BoardThicknessMm } from "@/data/board-specs";
import { BOARD_SPEC_MATRIX } from "@/data/board-specs";

export interface CatalogBoardOption {
  thicknessMm: BoardThicknessMm;
  sizeMm: string;
  density: "0.55";
  image: string;
}

const BOARD_IMAGES: Record<BoardThicknessMm, string> = {
  "5": "/images/boards/board-05mm.png",
  "8": "/images/boards/board-08mm.png",
  "12": "/images/boards/board-12mm.png",
  "18": "/images/boards/board-19mm.png",
};

export const catalogBoards: CatalogBoardOption[] = (
  Object.keys(BOARD_SPEC_MATRIX) as BoardThicknessMm[]
).map((thicknessMm) => ({
  thicknessMm,
  sizeMm: BOARD_SPEC_MATRIX[thicknessMm].sizeMm,
  density: "0.55",
  image: BOARD_IMAGES[thicknessMm],
}));

export const CATALOG_BOARD_SERVICES = [
  { id: "cutting", titleKey: "boardsServiceCuttingTitle", textKey: "boardsServiceCuttingText" },
  { id: "edgebanding", titleKey: "boardsServiceEdgebandingTitle", textKey: "boardsServiceEdgebandingText" },
  { id: "forming", titleKey: "boardsServiceFormingTitle", textKey: "boardsServiceFormingText" },
] as const;

export const CATALOG_BOARD_SURFACES = [
  { id: "plain", titleKey: "boardsSurfacePlainTitle", textKey: "boardsSurfacePlainText" },
  { id: "textured", titleKey: "boardsSurfaceTexturedTitle", textKey: "boardsSurfaceTexturedText" },
] as const;

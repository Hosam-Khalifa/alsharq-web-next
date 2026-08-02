export type BoardThicknessMm = "5" | "8" | "12" | "18";
export type BoardDensity = "0.55" | "0.70";
export type BoardClassification = "standard" | "low" | "high";

export interface BoardSpecOption {
  thicknessMm: BoardThicknessMm;
  sizeMm: string;
  densities: BoardDensity[];
  classificationFor: Record<BoardDensity, BoardClassification>;
}

export const BOARD_SPEC_MATRIX: Record<BoardThicknessMm, BoardSpecOption> = {
  "5": {
    thicknessMm: "5",
    sizeMm: "1220 × 2900 mm",
    densities: ["0.55"],
    classificationFor: { "0.55": "standard", "0.70": "standard" },
  },
  "8": {
    thicknessMm: "8",
    sizeMm: "1220 × 2440 mm",
    densities: ["0.55"],
    classificationFor: { "0.55": "standard", "0.70": "standard" },
  },
  "12": {
    thicknessMm: "12",
    sizeMm: "1220 × 2440 mm",
    densities: ["0.55"],
    classificationFor: { "0.55": "standard", "0.70": "standard" },
  },
  "18": {
    thicknessMm: "18",
    sizeMm: "1220 × 2440 mm",
    densities: ["0.55", "0.70"],
    classificationFor: { "0.55": "low", "0.70": "high" },
  },
};

export const BOARD_THICKNESS_OPTIONS = Object.keys(BOARD_SPEC_MATRIX) as BoardThicknessMm[];

export function resolveBoardSpec(thicknessMm: BoardThicknessMm, density?: BoardDensity) {
  const option = BOARD_SPEC_MATRIX[thicknessMm];
  const resolvedDensity = density && option.densities.includes(density) ? density : option.densities[0];
  return {
    sizeMm: option.sizeMm,
    density: resolvedDensity,
    classification: option.classificationFor[resolvedDensity],
    densityChoices: option.densities,
  };
}

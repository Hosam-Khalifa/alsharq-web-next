export type SlideDirection = 1 | -1;

export interface WpcBoard {
  id: "05" | "08" | "12" | "19";
  image: string;
  width: number;
  height: number;
}

export interface WpcShowcaseLabels {
  sectionAriaLabel: string;
  title: string;
  subtitle: string;
  previousLabel: string;
  nextLabel: string;
  thicknessLabel: string;
  selectorAriaLabel: string;
  catalogLabel: string;
  catalogHref: string;
  selectorLabels: Record<WpcBoard["id"], string>;
  thicknessValues: Record<WpcBoard["id"], string>;
}

export interface BoardSliderProps {
  boards: WpcBoard[];
  activeIndex: number;
  direction: SlideDirection;
  reducedMotion: boolean;
  previousLabel: string;
  nextLabel: string;
  onPrevious: () => void;
  onNext: () => void;
}

export interface BoardSelectorProps {
  boards: WpcBoard[];
  activeIndex: number;
  selectorAriaLabel: string;
  selectorLabels: Record<WpcBoard["id"], string>;
  onSelect: (index: number) => void;
}

export interface BoardInfoProps {
  thicknessLabel: string;
  thicknessValue: string;
  catalogLabel: string;
  catalogHref: string;
  reducedMotion: boolean;
  boardId: WpcBoard["id"];
}

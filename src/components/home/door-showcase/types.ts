export interface DoorProduct {
  code: string;
  name: string;
  door: string;
  texture: string;
}

export interface DoorShowcaseProps {
  sectionAriaLabel: string;
  previousLabel: string;
  nextLabel: string;
  catalogPreviewLabel: string;
  catalogHref: string;
  productNames: Record<string, string>;
}

export type SlideDirection = 1 | -1;

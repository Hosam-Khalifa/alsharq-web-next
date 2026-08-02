export interface PartnerItem {
  id: string;
  imageLight: string;
  imageDark: string;
  altKey: string;
  width: number;
  height: number;
  order: number;
  website?: string;
}

export interface ResolvedPartner {
  id: string;
  imageLight: string;
  imageDark: string;
  alt: string;
  width: number;
  height: number;
  website?: string;
}

export interface PartnersSliderLabels {
  sliderLabel: string;
}

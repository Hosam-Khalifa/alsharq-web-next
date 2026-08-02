export type TrustIndicatorIcon =
  | "award"
  | "shield-check"
  | "droplets"
  | "bug-off"
  | "puzzle"
  | "thermometer-sun"
  | "shield-plus"
  | "droplet";

export interface HomeTrustIndicator {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: TrustIndicatorIcon;
}

export const homeTrustIndicators: HomeTrustIndicator[] = [
  {
    id: "high-quality",
    titleAr: "جودة عالية",
    titleEn: "High quality",
    icon: "award",
  },
  {
    id: "superior-durability",
    titleAr: "متانة فائقة",
    titleEn: "Superior durability",
    icon: "shield-check",
  },
  {
    id: "moisture-resistant",
    titleAr: "ضد الرطوبة",
    titleEn: "Moisture resistant",
    icon: "droplets",
  },
  {
    id: "termite-resistant",
    titleAr: "ضد النمل الأبيض",
    titleEn: "Termite resistant",
    icon: "bug-off",
  },
  {
    id: "assembly-flexibility",
    titleAr: "مرونة في الفك والتركيب",
    titleEn: "Flexible assembly & disassembly",
    icon: "puzzle",
  },
  {
    id: "heat-resistant",
    titleAr: "ضد الحرارة",
    titleEn: "Heat resistant",
    icon: "thermometer-sun",
  },
  {
    id: "bacteria-resistant",
    titleAr: "ضد البكتيريا",
    titleEn: "Bacteria resistant",
    icon: "shield-plus",
  },
  {
    id: "water-resistant",
    titleAr: "ضد الماء",
    titleEn: "Water resistant",
    icon: "droplet",
  },
];

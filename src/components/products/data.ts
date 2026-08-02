import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  FileText,
  ImageIcon,
  Layers,
  Leaf,
  Maximize2,
  PersonStanding,
  RefreshCw,
  Ruler,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export interface ProductsHeroFeature {
  id: string;
  icon: LucideIcon;
  labelKey: string;
}

export interface ProductsHighlight {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  textKey: string;
}

export interface ProductsBullet {
  id: string;
  textKey: string;
}

export interface ProductsPanelSpec {
  id: string;
  icon: LucideIcon;
  textKey: string;
}

export const PRODUCTS_HERO_FEATURES: ProductsHeroFeature[] = [
  { id: "updates", icon: RefreshCw, labelKey: "heroFeatureUpdates" },
  { id: "technical", icon: FileText, labelKey: "heroFeatureTechnical" },
  { id: "images", icon: ImageIcon, labelKey: "heroFeatureImages" },
  { id: "experience", icon: Sparkles, labelKey: "heroFeatureExperience" },
];

export const PRODUCTS_HIGHLIGHTS: ProductsHighlight[] = [
  {
    id: "maintenance",
    icon: Settings2,
    titleKey: "highlightMaintenanceTitle",
    textKey: "highlightMaintenanceText",
  },
  {
    id: "durability",
    icon: ShieldCheck,
    titleKey: "highlightDurabilityTitle",
    textKey: "highlightDurabilityText",
  },
  {
    id: "insulation",
    icon: Leaf,
    titleKey: "highlightInsulationTitle",
    textKey: "highlightInsulationText",
  },
  {
    id: "moisture",
    icon: Droplets,
    titleKey: "highlightMoistureTitle",
    textKey: "highlightMoistureText",
  },
];

export const PRODUCTS_DOOR_BULLETS: ProductsBullet[] = [
  { id: "d1", textKey: "doorsBullet1" },
  { id: "d2", textKey: "doorsBullet2" },
  { id: "d3", textKey: "doorsBullet3" },
  { id: "d4", textKey: "doorsBullet4" },
  { id: "d5", textKey: "doorsBullet5" },
];

export const PRODUCTS_PANEL_BULLETS: ProductsBullet[] = [
  { id: "p1", textKey: "panelsBullet1" },
  { id: "p2", textKey: "panelsBullet2" },
  { id: "p3", textKey: "panelsBullet3" },
  { id: "p4", textKey: "panelsBullet4" },
];

export const PRODUCTS_PANEL_SPECS: ProductsPanelSpec[] = [
  { id: "thickness", icon: Layers, textKey: "panelsSpecThickness" },
  { id: "width", icon: Maximize2, textKey: "panelsSpecWidth" },
  { id: "length", icon: Ruler, textKey: "panelsSpecLength" },
  { id: "usage", icon: PersonStanding, textKey: "panelsSpecUsage" },
];

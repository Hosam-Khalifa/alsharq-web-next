export type AboutMotionDirection = "up" | "left" | "right" | "scale";

export type AboutIconKey =
  | "saudi"
  | "shield-check"
  | "droplets"
  | "users"
  | "lightbulb"
  | "handshake"
  | "award"
  | "factory"
  | "building"
  | "timer";

export interface AboutFeatureItem {
  id: string;
  icon: AboutIconKey;
  titleKey: string;
  textKey: string;
}

export interface AboutValueCard {
  id: string;
  icon: AboutIconKey;
  titleKey: string;
  textKey: string;
}

export interface AboutStoryPoint {
  id: string;
  textKey: string;
}

export interface AboutStatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  labelKey: string;
  icon: AboutIconKey;
}

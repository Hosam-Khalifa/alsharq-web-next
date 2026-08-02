import type {
  AboutFeatureItem,
  AboutStatItem,
  AboutStoryPoint,
  AboutValueCard,
} from "./types";

export const ABOUT_FEATURES: AboutFeatureItem[] = [
  {
    id: "saudi",
    icon: "saudi",
    titleKey: "featureSaudiTitle",
    textKey: "featureSaudiText",
  },
  {
    id: "quality",
    icon: "shield-check",
    titleKey: "featureQualityTitle",
    textKey: "featureQualityText",
  },
  {
    id: "moisture",
    icon: "droplets",
    titleKey: "featureMoistureTitle",
    textKey: "featureMoistureText",
  },
];

export const ABOUT_STORY_POINTS: AboutStoryPoint[] = [
  { id: "lines", textKey: "storyPoint1" },
  { id: "materials", textKey: "storyPoint2" },
  { id: "climate", textKey: "storyPoint3" },
];

export const ABOUT_VALUES: AboutValueCard[] = [
  {
    id: "customers",
    icon: "users",
    titleKey: "valueCustomersTitle",
    textKey: "valueCustomersText",
  },
  {
    id: "innovation",
    icon: "lightbulb",
    titleKey: "valueInnovationTitle",
    textKey: "valueInnovationText",
  },
  {
    id: "commitment",
    icon: "handshake",
    titleKey: "valueCommitmentTitle",
    textKey: "valueCommitmentText",
  },
  {
    id: "quality",
    icon: "award",
    titleKey: "valueQualityTitle",
    textKey: "valueQualityText",
  },
];

export const ABOUT_STATS: AboutStatItem[] = [
  {
    id: "saudi",
    value: 100,
    suffix: "%",
    labelKey: "statSaudiLabel",
    icon: "factory",
  },
  {
    id: "projects",
    value: 500,
    prefix: "+",
    labelKey: "statProjectsLabel",
    icon: "building",
  },
  {
    id: "experience",
    value: 10,
    prefix: "+",
    labelKey: "statExperienceLabel",
    icon: "timer",
  },
];

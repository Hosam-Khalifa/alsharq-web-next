import {
  Award,
  Building2,
  Droplets,
  Factory,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Timer,
  TreePalm,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { AboutIconKey } from "./types";

export const aboutIconMap: Record<AboutIconKey, LucideIcon> = {
  saudi: TreePalm,
  "shield-check": ShieldCheck,
  droplets: Droplets,
  users: Users,
  lightbulb: Lightbulb,
  handshake: Handshake,
  award: Award,
  factory: Factory,
  building: Building2,
  timer: Timer,
};

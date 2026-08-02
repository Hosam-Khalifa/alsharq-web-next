import type { MetadataRoute } from "next";
import { company } from "@/config/company";
import { brandAssets } from "@/config/brand-assets";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name.en,
    short_name: "NE WPC",
    description: "Near East WPC Factory website",
    start_url: "/ar",
    display: "standalone",
    background_color: "#f7f8fa",
    theme_color: "#e67e22",
    lang: "ar",
    icons: [
      {
        src: brandAssets.icon,
        sizes: "671x698",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

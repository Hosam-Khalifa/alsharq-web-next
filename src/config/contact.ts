import { company } from "./company";

const mapsQuery = `${company.locationCode}, ${company.city.en}`;

export const contactConfig = {
  heroImage: "/images/About/about-bg-3.webp",
  mapsEmbedUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ||
    `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=16&output=embed`,
  mapsDirectionsUrl:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
  businessHours: [
    { id: "weekdays", daysKey: "hoursWeekdays", timeKey: "hoursWeekdaysTime" },
    { id: "weekend", daysKey: "hoursWeekend", timeKey: "hoursWeekendTime" },
  ] as const,
} as const;

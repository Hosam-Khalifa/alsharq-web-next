export interface Partner {
  id: string;
  name: { ar: string; en: string };
  logo: string;
  website?: string;
}

// Placeholder partners — replace with confirmed customer/partner list
export const partners: Partner[] = [
  {
    id: "partner-001",
    name: { ar: "[عينة] شريك 1", en: "[Sample] Partner 1" },
    logo: "/images/placeholders/partner.svg",
  },
  {
    id: "partner-002",
    name: { ar: "[عينة] شريك 2", en: "[Sample] Partner 2" },
    logo: "/images/placeholders/partner.svg",
  },
  {
    id: "partner-003",
    name: { ar: "[عينة] شريك 3", en: "[Sample] Partner 3" },
    logo: "/images/placeholders/partner.svg",
  },
];

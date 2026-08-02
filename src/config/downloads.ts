export const downloads = {
  catalog: {
    href: "/downloads/placeholders/alsharq-digital-catalogue.pdf",
    filename: "Alsharq-Digital-Catalogue.pdf",
  },
  profile: {
    href: "/downloads/placeholders/Alsharq-Profile.pdf",
    filename: "Alsharq-Profile.pdf",
  },
} as const;

export type DownloadKey = keyof typeof downloads;

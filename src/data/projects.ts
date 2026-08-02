export interface Project {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  summary: { ar: string; en: string };
  category: string;
  city?: string;
  client?: string;
  completionDate?: string;
  productsUsed?: string[];
  scopeOfWork?: string[];
  coverImage: string;
  gallery: string[];
  width: number;
  height: number;
  order: number;
  orientation: "portrait" | "landscape";
  featured?: boolean;
}

export const projectCategories = [
  { id: "all", labelKey: "projects.filters.all" },
  { id: "doors", labelKey: "projects.filters.doors" },
  { id: "projects", labelKey: "projects.filters.projects" },
  { id: "installations", labelKey: "projects.filters.installations" },
  { id: "interior-finishes", labelKey: "projects.filters.interiorFinishes" },
] as const;

const ASSET_BASE = "/images/Projects";

function createProject(order: number): Project {
  const padded = String(order).padStart(2, "0");
  const image = `${ASSET_BASE}/Projects-${order}.jpg`;

  return {
    id: `proj-${padded}`,
    slug: `project-${padded}`,
    title: {
      ar: `مشروع ${padded}`,
      en: `Project ${padded}`,
    },
    summary: {
      ar: "مشروع منفذ من مصنع الشرق الأدنى.",
      en: "A completed project by Near East Factory.",
    },
    category: "projects",
    coverImage: image,
    gallery: [image],
    width: 2480,
    height: 3508,
    order,
    orientation: "portrait",
    featured: order <= 2,
  };
}

export const projects: Project[] = [1, 2, 3, 4, 5, 6, 7].map(createProject);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

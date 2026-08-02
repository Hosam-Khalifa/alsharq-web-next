import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routes } from "@/config/routes";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/shared/section-heading/section-heading";
import type { Locale } from "@/types";

interface FeaturedProjectsProps {
  locale: Locale;
}

export async function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const t = await getTranslations({ locale });

  return (
    <section className="py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading title={t("home.projectsTitle")} subtitle={t("home.projectsSubtitle")} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <Link
                key={project.id}
                href={routes.projectDetail(project.slug)}
                className="brand-interactive-card rounded-lg p-4"
              >
                <h3 className="font-medium">{project.title[locale]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{project.summary[locale]}</p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

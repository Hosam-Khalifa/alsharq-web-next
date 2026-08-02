import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getProjectBySlug } from "@/data/projects";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { PageHero } from "@/components/shared/page-hero/page-hero";
import type { Locale } from "@/types";

interface ProjectDetailPageProps {
  params: Promise<{ locale: Locale; projectSlug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { locale, projectSlug } = await params;
  const project = getProjectBySlug(projectSlug);
  if (!project) return {};
  return generatePageMetadata({
    locale,
    title: project.title[locale],
    description: project.summary[locale],
    pathname: `/projects/${projectSlug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, projectSlug } = await params;
  setRequestLocale(locale);
  const project = getProjectBySlug(projectSlug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projects" });

  return (
    <>
      <PageHero title={project.title[locale]} subtitle={project.summary[locale]} />
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-lg font-semibold">{t("gallery")}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.gallery.map((image, index) => (
            <div
              key={`${project.id}-${index}`}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-soft)]"
            >
              <Image
                src={image}
                alt={`${project.title[locale]} ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-contain bg-surface-muted p-3"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

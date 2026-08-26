import { ArrowRight } from "lucide-react";
import { localePath, t, type Locale } from "@/lib/i18n";
import { featuredProjects } from "@/content/projects";
import { ui } from "@/content/site";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import { ButtonLink } from "./Button";

export function FeaturedWork({ lang }: { lang: Locale }) {
  return (
    <Section
      id="featured"
      eyebrow={t(ui.featured, lang)}
      heading={t(ui.featuredHeading, lang)}
      lead={t(ui.featuredLead, lang)}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i} className="h-full">
            <ProjectCard project={project} lang={lang} size="lg" priority={i < 2} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={2} className="mt-12 flex justify-center">
        <ButtonLink href={localePath(lang, "work")} variant="secondary">
          {t(ui.allWork, lang)}
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

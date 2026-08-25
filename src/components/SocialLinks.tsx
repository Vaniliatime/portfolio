import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile, socials, type SocialId } from "@/content/site";
import { WhatsAppIcon } from "./icons/WhatsApp";
import { cn } from "@/lib/utils";

const icons: Record<SocialId, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  // Replaced below; lucide has no brand glyph for WhatsApp.
  whatsapp: Github,
};

interface SocialLinksProps {
  className?: string;
  /** Puts the email address first, for the contact page and the footer. */
  withEmail?: boolean;
  emailLabel?: string;
}

export function SocialLinks({ className, withEmail, emailLabel = "Email" }: SocialLinksProps) {
  const base =
    "grid h-9 w-9 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-accent/50 hover:bg-accent-wash hover:text-accent";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {withEmail && (
        <a href={`mailto:${profile.email}`} aria-label={emailLabel} title={emailLabel} className={base}>
          <Mail className="h-4 w-4" />
        </a>
      )}

      {socials.map((social) => {
        const Icon = icons[social.id];

        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
            className={base}
          >
            {social.id === "whatsapp" ? (
              <WhatsAppIcon className="h-4 w-4" />
            ) : (
              <Icon className="h-4 w-4" />
            )}
          </a>
        );
      })}
    </div>
  );
}

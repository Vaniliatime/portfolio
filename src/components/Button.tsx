import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_1px_2px_rgb(124_58_237/0.2),0_10px_24px_-10px_rgb(124_58_237/0.55)] hover:bg-accent-hover hover:shadow-[0_2px_4px_rgb(124_58_237/0.24),0_16px_32px_-12px_rgb(124_58_237/0.65)] hover:-translate-y-0.5",
  secondary:
    "border border-line-strong bg-surface text-ink hover:border-accent/50 hover:bg-accent-wash hover:text-accent hover:-translate-y-0.5",
  ghost: "text-ink-muted hover:bg-surface-2 hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-[0.9375rem]",
  sm: "px-4 py-2 text-sm",
};

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  /** Set for links leaving the site. */
  external?: boolean;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

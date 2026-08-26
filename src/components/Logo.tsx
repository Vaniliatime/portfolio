import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The KK mark: two interlocking K forms drawn as one faceted ribbon.
 *
 * The existing brand asset, not a redraw. Only the violet cut is used; it
 * holds on both the light and the dark theme, so there is nothing to swap and
 * no chance of flashing the wrong one before hydration. Source PNGs live in
 * /assets, outside what gets served.
 *
 * `animated` adds the periodic shine, which the header wants and the footer
 * does not; two of them sweeping on the same page would pull the eye twice.
 */
export function LogoMark({ className, animated }: { className?: string; animated?: boolean }) {
  const image = (
    <Image
      src="/logo-mark.webp"
      alt=""
      width={189}
      height={179}
      priority
      className={cn("w-auto object-contain", className)}
    />
  );

  if (!animated) return image;

  return <span className="logo-shine">{image}</span>;
}

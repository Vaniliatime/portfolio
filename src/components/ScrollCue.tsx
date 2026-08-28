"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { t, type Locale } from "@/lib/i18n";
import { ui } from "@/content/site";

/**
 * The nudge that says the page carries on below.
 *
 * On a short screen the hero fills the whole viewport and nothing pokes above
 * the fold to say otherwise, so people leave believing they have seen the site.
 * The arrow bounces gently, scrolls to the work when clicked, and fades out as
 * soon as the page moves, because after that it has made its point.
 */
export function ScrollCue({ lang, target = "featured" }: { lang: Locale; target?: string }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 160], [1, 0]);

  const go = () => {
    const next = document.getElementById(target);
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Nothing to aim at: a screenful down is still better than nothing.
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    /*
     * Small screens only. On a wide one the next section is already peeking
     * over the fold, so the arrow would be telling somebody something they can
     * see for themselves. It also sits inside the padding the section already
     * had: a cue that pushes the page apart to make room for itself is doing
     * the opposite of its job.
     */
    <motion.div
      style={{ opacity }}
      className="-mb-6 mt-10 flex justify-center md:-mb-10 md:mt-12 lg:hidden"
    >
      <button
        type="button"
        onClick={go}
        aria-label={t(ui.scrollDown, lang)}
        className="scroll-cue group grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-surface text-ink-muted shadow-card transition-colors hover:border-accent/50 hover:text-accent"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

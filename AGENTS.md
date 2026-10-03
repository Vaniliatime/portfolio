# Working agreements

Rules for anyone (or anything) working in this repo. They come from things that
actually went wrong here, not from general preference.

## Committing

**One commit at the end of a working session, not one per change.** Keep editing
and verifying freely; leave the tree dirty in between. When the session ends, or
when asked, stage everything and write a single commit describing what changed
and why.

Do not commit after each small fix. A session's worth of tweaks belongs in one
commit, not thirty.

## Writing

**No em dashes**, in site copy, comments, commit messages or chat. Use a colon
when introducing a list or explanation, a comma for a light aside, parentheses
for a real interjection. Rewrite the sentence if no mark fits.

Site copy is English first, Polish second, and every string lives in
`src/content/*` as `{ en, pl }`. Never put user-facing text in a component.

## Verifying

`npm run typecheck` is the routine check. It is fast and touches nothing.

**Do not run `npm run build` while the dev server is up.** They share `.next`,
so a build deletes the manifests the dev server is serving and every route
starts returning 500. Build before a deploy, or when the static export itself is
what changed, and stop the dev server first.

**Check the rendered output, not the source.** A scripted edit that silently
matches nothing looks identical to one that worked. `curl` the dev server and
grep for what should be there.

## Editing files

**Never round-trip a source file through PowerShell.** `Get-Content` reads as
ANSI here and `Set-Content` writes UTF-8, which turns every Polish character
into mojibake. Use the editing tools, or Python with explicit `encoding="utf-8"`.

Scripted find-and-replace is fragile against reindentation. If a replacement
targets JSX, confirm afterwards that it landed.

## Animation

Anything that loops must be `transform` or `opacity` only. Large blur filters
and per-frame `background-position` changes are cheap in Chrome and punishing in
Firefox, where they drop enough frames to stall every other animation on the
page. Gradient stops instead of blur.

Two animations cannot share one element's `transform`. Nest them: wrapper for
one, child for the other.

Stagger anything that repeats across a grid, by delay **and** by duration.
Identical cycles drift back into step no matter how the delays are set.

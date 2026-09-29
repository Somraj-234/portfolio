# AEO, SEO, and performance decisions

Written after implementing the approved one-page plan (no extra user routes, no markdown pages in the UI). Scores cited below are from PageSpeed report `xalsj7io9p` (29 Sep 2026) and the Framer AEO scan for `somraj.net`.

## Constraints that shaped the work

- Keep the existing visual layout (type, spacing, faded section labels, archive on the homepage).
- Stay a single HTML page. Do not add `/about`, `/work`, `/archive` for humans.
- Do not ship `.md` URLs or put machine files in the nav/footer. `/llms.txt` exists because Lighthouse and Framer look for that exact path; it is not linked in the UI.

## What was actually wrong

Cloudflare was serving `index.html` for missing paths. `/robots.txt` and `/sitemap.xml` therefore returned HTML. PageSpeed parsed that HTML as robots rules (228 errors, SEO 92). Framer still treated a 200 as “file present.” Lighthouse then failed `llms.txt` and `ai-catalog.json` for the same reason: HTML is not those formats.

Most of the work and project copy lived only in `main.js`, so non-JS crawlers saw little more than the bio.

Mobile performance (71) was dominated by ~30 MB of images (archive JPGs plus large project thumbs), not by the small CSS/JS of the page itself.

## Changes and why

### Real `robots.txt`

Plain Allow rules plus an explicit sitemap line. Named AI crawlers are allowed so answer engines can fetch the public site. This is the robots protocol, not a ranking cheat. Fixes PageSpeed “robots.txt is not valid.”

### Real `sitemap.xml`

One URL: `https://somraj.net/`, with `lastmod`. Matches the single-page site. Helps discovery without inventing pages.

### `llms.txt` (not `llm.txt`)

Jeremy Howard’s `/llms.txt` format: H1, summary blockquote, then lists of real work and project URLs. Linked from `<link rel="describedby">` in the head. Agents that fetch it get the same facts as the page. Humans who type the URL will see text; that is how the standard works. It is not shown in the layout.

### No `ai-catalog.json`

Lighthouse fails schema if that path returns HTML. This site has no MCP server or agent API. A fake catalog would be dishonest and would still fail. `wrangler.jsonc` uses `not_found_handling: "404-page"`, so missing `/.well-known/ai-catalog.json` returns `404.html` instead of the homepage. Workers `_redirects` cannot use status 404 (only 200/301/302/303/307/308), so a redirects file is not used for this.

### `_headers`

Forces `text/plain` / `application/xml` on the machine files so they are not sniffed as HTML.

### Homepage metadata

- Canonical and `og:url` / `twitter:url` point at `https://somraj.net/`, not the OG image (that was a bug).
- Meta description shortened to the 50–160 character band Framer checks.
- JSON-LD `WebSite` + `Person` with `dateModified` and `sameAs` profiles that already exist. Freshness for AEO without a fake blog.

### HTML instead of JS for work and projects

Same classes and copy as before. Crawlers and screen readers get the text without running scripts. Visual structure is unchanged.

### Headings

One `h1` (name). Section titles are `h2` with the same `opacity-25` classes as the old `h1`s so they still look faded. Company and project titles are `h3` with the same `text-xl` / `lastik-font` classes. Fixes Lighthouse heading order without restyling.

Section contrast was **not** increased. That would make the labels darker and change the design. Automated accessibility may still flag contrast.

### Links

- Company URLs were broken (`href=""https://...`). They now go to `enine.com` and `vidgencraft.com`.
- Instagram pointed at X; it now points at `instagram.com/somrajadhav`.
- Repeated “Live” / “Code” text gets unique `aria-label`s so Lighthouse “identical links” can tell them apart. Visible label is unchanged.
- Skip link is off-screen until focused.

### Archive lazy-load

Still rendered on the homepage. Images after the first in each column use `loading="lazy"`. Width/height attributes are estimates so the browser can reserve space; masonry layout CSS is unchanged. This is the main honest performance lever without moving the gallery.

### Performance (lab payload)

PageSpeed mobile after the first ship was still **77**, with **~30.5 MB** transferred and **LCP ~5.7s**. Native `loading="lazy"` did not help the lab test: every archive `<img src>` is still a request (Chrome also prefetches a large lazy margin, and four column-top images were `eager`). The Tailwind browser runtime stayed render-blocking (~590ms) and showed unused/legacy JS.

Fix: do not set `src` until `IntersectionObserver` (small `rootMargin`). Profile photo stays a real `src` plus preload. Project thumbs use `data-src` the same way. Tailwind CDN (`@tailwindcss/browser`) stays for layout. Assets get a long Cache-Control. Archive uses `content-visibility: auto` so offscreen masonry is cheaper to style.

### Document title

Head `<title>` is more descriptive for search tabs. The on-page `h1` is still “Somraj Jadhav.”

## What we refused

- Extra HTML routes only to farm Framer’s internal-link 18 points.
- User-facing markdown pages.
- Keyword FAQ blocks.
- WebMCP or ARD catalog entries for tools that do not exist.
- Guaranteeing #1 rankings. Technical files cannot do that.

## Cloudflare Workers deploy

The Git deploy command is `npx wrangler versions upload`, which requires `wrangler.jsonc` with an `assets.directory`. This project has no Worker script; it is static files from `.`. `not_found_handling` is `404-page` (not SPA) so missing paths like `/.well-known/ai-catalog.json` do not return `index.html`. If the dashboard Worker name is not `portfolio`, change `"name"` in `wrangler.jsonc` to match.

## How to verify after deploy

1. `curl -I https://somraj.net/robots.txt` — `text/plain`, body starts with `User-agent`.
2. Same for `/sitemap.xml` (XML) and `/llms.txt` (markdown).
3. `https://somraj.net/.well-known/ai-catalog.json` — 404, not the homepage.
4. Re-run PageSpeed (mobile + desktop) and Framer AEO.
5. Cloudflare: if SEO is still 92, turn off SPA “rewrite all paths to index” and disable managed robots.txt if it prepends AI Disallow.

## Expected leftover gaps

- Framer internal links stay weak on a one-URL site.
- Fade-out section titles may keep an accessibility contrast fail.
- Mobile LCP may stay imperfect while ~58 archive images and remote OG thumbs remain on `/`.
- Agentic browsing is a pass fraction (files + CLS + a11y tree), not a 0–100 score.

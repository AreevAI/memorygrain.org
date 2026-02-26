# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with Turbopack (auto-selects port if 3000 is busy)
npm run build     # Static export to /out + generates public/feed.xml
npm run start     # Not usable with static export; use `npx serve out` instead
npm run lint      # ESLint
```

No test framework is configured. To verify binary/hash values in the blog content, run:

```bash
pip install msgpack
python3 verify_hashes.py
```

## Architecture

This is the **memorygrain.org** documentation website — a Next.js 15 **static export** (`output: 'export'` in `next.config.ts`). No API routes. No server-side runtime. Everything is pre-rendered at build time.

### Content Sources

There are two distinct content types, each with its own pipeline:

1. **Blog posts** — `content/blog/*.mdx`
   - Parsed by `lib/blog.ts` using `gray-matter` for frontmatter
   - Rendered in `app/blog/[slug]/page.tsx` using `next-mdx-remote/rsc` + `rehype-pretty-code`
   - Required frontmatter: `title`, `description`, `date`, `readTime`, `tags[]`
   - Two MDX components available inside posts: `<Callout type="info|warning|success|security">` and `<PlaceholderImage label="...">`

2. **Specification** — `../oms/SPECIFICATION.md` (copied to `docs/oms-specification.md` at build time)
   - A single Markdown file rendered in `app/spec/page.tsx` via the `unified` pipeline (remark → rehype → stringify)
   - The sidebar TOC in that page is hardcoded — update `tocSections` array when spec sections change

### Styling System

All styling uses **inline styles + CSS custom properties** — not Tailwind utility classes. Tailwind v4 is present only for the `@custom-variant dark` directive and reset.

Design tokens live in `app/globals.css` under `:root` / `.dark`. Key tokens:
- Layout: `--bg`, `--surface`, `--elevated`, `--border`, `--border-subtle`
- Text: `--fg`, `--fg-secondary`, `--fg-muted`
- Accent: `--accent`, `--accent-hover`, `--accent-light`
- Code: `--code-bg`, `--code-border`
- Memory type colors: `--fact`, `--episode`, `--checkpoint`, `--workflow`, `--toolcall`, `--observation`, `--goal`

Dark mode is applied via the `.dark` class on `<html>` (managed by `next-themes` in `components/layout/Providers.tsx`).

### Path Alias

`@/` maps to the repository root (e.g., `@/lib/blog`, `@/components/ui/Badge`).

### Homepage Composition

`app/page.tsx` assembles the homepage from ordered section components in `components/home/`. The render order is: `Hero → GitAnalogy → UseCases → HowItWorks → MemoryTypes → GrainShowcase → PortabilitySection → ConformanceLevels → BlogPreview → HomeCTA`.

### Metadata

All pages use `buildMetadata()` from `lib/metadata.ts`. Pass overrides for page-specific title/description. The site URL is controlled by `NEXT_PUBLIC_SITE_URL` (defaults to `https://memorygrain.org`). GA tracking ID via `NEXT_PUBLIC_GA_ID`.

### Hash/Binary Accuracy

The blog posts and `components/home/HowItWorks.tsx` contain specific binary values (SHA-256 namespace hash bytes, timestamps, flags). These must be computed values, not guesses. Use `verify_hashes.py` to check and update them when content changes.

### Files That Must Stay in Sync

When content, pages, or spec details change, the following files **must** be updated to match:

| File | What to sync |
|------|-------------|
| `public/llms.txt` | Page list (## Pages), memory type count/table, binary format summary, GitHub URLs |
| `public/llms-full.txt` | Memory type definitions, header byte layout, conformance levels, spec section index, canonical description block at the end |
| `app/sitemap.ts` | Add/remove page URLs, update `lastModified` dates when pages change. Blog post dates are pulled from frontmatter automatically. |

**Triggers:**
- **New/removed page** → update `llms.txt` Pages section + `sitemap.ts` static entries
- **New/removed blog post** → `sitemap.ts` handles this automatically via `getAllPosts()`; update `llms.txt` if the blog section description changes
- **Spec changes** (memory types, header format, conformance levels, sections) → update both `llms.txt` and `llms-full.txt`
- **GitHub URL changes** → update `llms.txt` Source section, `Header.tsx`, `Footer.tsx`, `HomeCTA.tsx`, `about/page.tsx`, `README.md`

### GitHub URLs

The project lives under the `openmemoryspec` GitHub organization:
- Organization: `https://github.com/openmemoryspec/`
- Specification repo: `https://github.com/openmemoryspec/oms`
- Website repo: `https://github.com/AreevAI/memorygrain.org`

### Brand Colors (Navy-to-Cyan Palette)

The memorygrain brand uses a navy-to-cyan gradient palette aligned with the areev parent brand.

**Icon gradient (4 squares, light → dark):**

| Square | Hex | Position |
|--------|-----|----------|
| Bright Cyan | `#00E5FF` | Top-left |
| Bright Teal | `#00BBD6` | Top-right |
| Medium Teal | `#0088AA` | Bottom-left |
| Deep Teal | `#005577` | Bottom-right |

**Text colors:**

| Token | Hex | Usage |
|-------|-----|-------|
| Dark Text | `#001830` | Wordmark + tagline on light backgrounds |
| White | `#FFFFFF` | Wordmark + tagline on dark backgrounds |

**CSS design tokens** (defined in `app/globals.css`):

| Mode | `--accent` | `--accent-hover` | `--bg` |
|------|-----------|-----------------|--------|
| Light | `#0088AA` | `#005577` | `#ffffff` |
| Dark | `#00BBD6` | `#00E5FF` | `#000A1A` |

**Typography:** Space Grotesk 600 (wordmark), Inter (body), JetBrains Mono (code)

**Logo files** (in `public/`):
- `logo-header.svg` / `logo-header-dark.svg` — horizontal lockup (icon + "MemoryGrain")
- `logo-tagline.svg` / `logo-tagline-dark.svg` — with ".mg — open memory format"
- `favicon.svg` — 4-square icon only

**Editable source:** `/Users/sathish/mg/marketing/memorygrain/logo/mem-logo.pen` (Pencil format)

**Do NOT use old teal-green colors** (`#99F6E4`, `#5EEAD4`, `#2DD4BF`, `#0D9488`). The brand has moved to navy-to-cyan.

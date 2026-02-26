# memorygrain.org

The documentation website for the **Open Memory Specification (OMS)** — an open standard for portable, auditable, and interoperable agent memory across autonomous systems.

**Live site:** [memorygrain.org](https://memorygrain.org)

## About OMS

The Open Memory Specification defines the **Memory Grain (`.mg`)** container — a binary wire format for immutable, content-addressed knowledge units produced and consumed by autonomous systems (AI agents, robots, autonomous vehicles, IoT networks).

Each memory grain is:

- **Content-addressed** — the SHA-256 hash of the complete blob bytes is the grain's unique identifier
- **Immutable** — any change produces a different hash
- **Canonically serialized** — MessagePack (default) or CBOR (RFC 8949)
- **Optionally signed** — COSE Sign1 (RFC 9052) with W3C DID identity
- **Optionally encrypted** — AES-256-GCM with per-user key derivation (HKDF-SHA256)

### Binary Format

Every grain begins with a 9-byte fixed header:

```
Byte 0:     Version (0x01)
Byte 1:     Flags (signed|encrypted|compressed|has_content_refs|has_embedding_refs|cbor_encoding|sensitivity[2 bits])
Byte 2:     Type (0x01–0x07)
Bytes 3–4:  Namespace hash (first 2 bytes of SHA-256(namespace), uint16 big-endian)
Bytes 5–8:  Created-at (uint32 epoch seconds, big-endian)
Byte 9+:    MessagePack or CBOR payload
```

### Memory Types

| Type ID | Name | Description |
|---------|------|-------------|
| `0x01` | Fact | Structured knowledge claim (subject–relation–object) |
| `0x02` | Episode | Raw, unstructured interaction record |
| `0x03` | Checkpoint | Agent state snapshot |
| `0x04` | Workflow | Procedural memory — learned action sequences |
| `0x05` | ToolCall | Tool/function invocation record |
| `0x06` | Observation | Sensor reading or environmental measurement |
| `0x07` | Goal | Explicit objective with lifecycle semantics |

### Conformance Levels

| Level | Name | Key Requirements |
|-------|------|-----------------|
| 1 | Minimal Reader | Deserialize, hash verify, field compaction, ignore unknowns |
| 2 | Full Implementation | Level 1 + serialization, canonical enforcement, schema validation, test vector compliance |
| 3 | Production Store | Level 2 + persistent backend, AES-256-GCM encryption, per-user key derivation, hexastore indexes, full-text search |

### Device Profiles

| Profile | Max Blob Size | Target |
|---------|---------------|--------|
| Extended | 1 MB | Servers, edge |
| Standard | 32 KB | Mobile, IoT, SBC |
| Lightweight | 512 bytes | Microcontrollers |

## Website Structure

This is a **Next.js 15 static export** site (`output: 'export'`). No API routes, no server-side runtime — everything is pre-rendered at build time.

### Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — overview, use cases, memory types, conformance levels |
| `/spec/` | Full OMS v1.0 specification with sidebar TOC |
| `/blog/` | Technical blog with MDX posts |
| `/about/` | About OMS, design principles, license, contributing |

### Content Pipeline

- **Blog posts** — MDX files in `content/blog/`, parsed with `gray-matter` and rendered with `next-mdx-remote/rsc` + `rehype-pretty-code`
- **Specification** — Markdown processed through `unified` (remark → rehype → rehype-pretty-code → rehype-slug → stringify)

### Styling

All styling uses **inline styles + CSS custom properties** (not Tailwind utility classes). Design tokens are defined in `app/globals.css` under `:root` / `.dark`. Dark mode is applied via the `.dark` class on `<html>`, managed by `next-themes`.

## Getting Started

### Prerequisites

- Node.js (compatible with Next.js 15)
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the dev server with Turbopack. Auto-selects an available port if 3000 is busy.

### Build

```bash
npm run build
```

Produces a static export in `/out` and generates `public/feed.xml` (RSS 2.0).

To preview the build locally:

```bash
npx serve out
```

> `npm run start` is not usable with static export.

### Lint

```bash
npm run lint
```

### Verify Hashes

The blog posts and homepage contain specific binary values (SHA-256 namespace hash bytes, timestamps, flags). To verify them:

```bash
pip install msgpack
python3 verify_hashes.py
```

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (static export)
- **Language:** TypeScript
- **React:** 19
- **MDX:** `next-mdx-remote` + `rehype-pretty-code` + `shiki`
- **Markdown:** `unified` / `remark` / `rehype` pipeline
- **Fonts:** Inter (sans-serif), JetBrains Mono (monospace) via Google Fonts
- **Theme:** `next-themes` (light/dark)
- **Analytics:** Google Analytics (optional, via `NEXT_PUBLIC_GA_ID`)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | `https://memorygrain.org` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics tracking ID | _(none)_ |

## Related Repositories

- **Specification:** [openmemoryspec/oms](https://github.com/openmemoryspec/oms) — the OMS v1.0 specification
- **Website:** [AreevAI/memorygrain.org](https://github.com/AreevAI/memorygrain.org) — this repository

## License

- **Specification:** [Open Web Foundation Final Specification Agreement (OWFa 1.0)](https://www.openwebfoundation.org/the-agreements/the-owf-1-0-agreements-granted-claims/owfa-1-0)
- **Website:** [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/)

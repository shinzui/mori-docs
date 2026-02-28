# mori-docs

Documentation site for [mori](https://github.com/shinzui/mori), a Haskell-based project identity and automation system.

Built with [fumadocs](https://fumadocs.vercel.app/), [TanStack Start](https://tanstack.com/start), and [Tailwind CSS v4](https://tailwindcss.com/).

## Development

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:3000`.

## Build

```bash
pnpm build
pnpm start
```

Produces a fully static site in `dist/client/` with all pages prerendered.

## Content

Documentation lives in `content/docs/` as MDX files:

| Section | Path | Description |
|---------|------|-------------|
| Getting Started | `content/docs/getting-started.mdx` | Setup, init, and first steps |
| Schema Guide | `content/docs/schema-guide.mdx` | Writing `mori.dhall` manifests |
| Concepts | `content/docs/concepts/` | Event sourcing, VCS integration, agent context, local registry |
| Guides | `content/docs/guides/` | Automation, schema reference, shell integration |
| Architecture | `content/docs/architecture/` | CLI, schema, and registry design |
| Roadmap | `content/docs/roadmap.mdx` | Implementation phases and milestones |

## Stack

- **fumadocs-mdx** — MDX content collections with syntax highlighting
- **fumadocs-ui** — Documentation UI components and layouts
- **TanStack Start** — SPA mode with static prerendering
- **Vite** — Build tooling
- **Tailwind CSS v4** — Styling
- **Orama** — Client-side full-text search

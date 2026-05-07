# Ignite Legacy — The Toolbox

A growing suite of trainings and tools for the Ignite Legacy community. Hosted as a single Vercel project.

## Routes

- `/` — The Toolbox homepage
- `/boutique` — The Boutique training (lesson + tools embedded inline)
- `/bio-generator` — Standalone Bio Generator
- `/pinned-posts` — Standalone Pinned Posts Generator

## Architecture

- **`src/pages/`** — Top-level page components, one per route
- **`src/tools/`** — Reusable tool components that can be embedded anywhere
  - `BioGeneratorTool.jsx` — used on `/bio-generator` AND inline in `/boutique`
  - `PinnedPostsTool.jsx` — used on `/pinned-posts` AND inline in `/boutique`
  - Each accepts a `compact` prop. `compact={false}` shows the full intro flow. `compact={true}` skips the intro for inline use.
- **`api/`** — Vercel serverless functions. Hold the API key. Tools call these, never Anthropic directly.

## Deploy

1. Push to GitHub
2. Import to Vercel
3. Add environment variable: `ANTHROPIC_API_KEY`
4. Deploy

## Adding a new tool

1. Create `src/tools/NewTool.jsx` with `compact` prop support
2. Create `src/pages/NewTool.jsx` as a thin wrapper for the standalone route
3. Add route to `src/main.jsx`
4. Add card to `src/pages/Home.jsx`
5. (If AI-powered) Add `api/generate-new-thing.js`
6. Embed in `/boutique` lesson page where relevant

## Cost

Each AI generation: ~$0.05–$0.10. Watch your Anthropic dashboard.

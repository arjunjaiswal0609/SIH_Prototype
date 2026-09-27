# IP-SAKTI Sahayak

IP-SAKTI Sahayak is a React + TypeScript research workspace for Ayurvedic intellectual-property intelligence. It brings formulation screening, patent intelligence, prior-art tracing, traditional-knowledge exploration, ABS assessment, international jurisdiction research, cost planning, reports and expert escalation into one evidence-first interface.

## Data model

The current build uses a bundled reference dataset under `src/data/referenceData.ts`. It is intentionally presented as reference data rather than a live patent, regulatory or AI service. Domain service adapters under `src/services/` isolate the UI from that storage layer so live APIs or a database can be introduced without rewriting the workspaces.

## Development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Architecture

- `src/routes/` — route-level workspaces and workflows
- `src/components/ip/` — IP-SAKTI application shell and semantic UI primitives
- `src/components/ui/` — reusable Radix/shadcn-style controls
- `src/services/` — domain data/service boundaries
- `src/data/referenceData.ts` — current local reference records
- `src/styles.css` — light botanical research design system

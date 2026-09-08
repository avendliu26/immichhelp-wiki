# SERP Competitor Audit

Audit date: 2026-09-08. Search results were checked live for the eight published-page queries. Google result ordering can vary by locale and personalization; this report records the pages surfaced in the live checks rather than claiming stable rankings.

## Queries checked

| Query | Main result types observed | Relevant benchmark pages surfaced |
|---|---|---|
| immich error loading image | Official errors, Reddit threads, GitHub/community issue discussions | docs.immich.app/errors, Reddit issue threads |
| immich backup | Official backup docs, independent self-hosting guides, community posts | docs.immich.app/administration/backup-and-restore, priviy.com, bigiron.cc |
| immich proxmox | Independent how-to guides, YouTube, community discussions | serverman.co.uk, YouTube, Reddit |
| immich docker compose | Official installation documentation, GitHub source | docs.immich.app/install/docker-compose, GitHub immich-app/immich |
| how to update immich | Official upgrading docs, community tutorials and discussions | docs.immich.app/install/upgrading, Reddit, YouTube |
| immich for synology | Official community documentation, Reddit, community tutorials | docs.immich.app/install/synology, Reddit |
| immich external library | Official feature docs, independent distribution guides, Reddit | docs.immich.app/features/libraries, immich.app/docs/guides/external-library |
| how to use immich | Official download/FAQ/docs pages, guides and videos | immich.app/download, docs.immich.app/FAQ, YouTube |

## Benchmark domains

### priviy.com
- Why it ranks: focused, current backup article with a direct warning that copying photos alone is incomplete and version-specific commands must be checked.
- Keywords found: immich backup.
- Strengths: direct answer, practical backup model, recent publication.
- Weaknesses: one primary topic and no evidence of broad Immich topic coverage in this audit.
- What we can learn: lead with the failure mode and separate database, originals, and restore verification.

### bigiron.cc
- Why it ranks: detailed self-hosting backup guide with a restore drill and broader homelab context.
- Keywords found: immich backup.
- Strengths: operational depth and clear workflow.
- Weaknesses: longer path to the answer than official docs.
- What we can learn: pair concise answer blocks with a verification checklist.

### serverman.co.uk
- Why it ranks: focused Proxmox/LXC tutorial matching the platform query.
- Keywords found: immich proxmox.
- Strengths: exact platform intent and concrete deployment framing.
- Weaknesses: community guidance must be checked against current Immich support boundaries.
- What we can learn: make platform scope and support caveats visible above the fold.

### Reddit / GitHub
- These are recurring SERP result types rather than independent benchmark domains. They expose real symptom language for “error loading image”, permissions, storage moves, and platform-specific incidents. They are evidence sources for future research, not copy targets.

## Official fact baseline

The live official Docker Compose page identifies Compose as the recommended production method and points users to the current release files. Official backup guidance says a complete backup includes both the database and uploaded media, and the external-library documentation calls out volume mounts, import paths, permissions, and read-only behavior. These facts are already represented in the published source-backed pages; no new technical claims were added in this audit.

## Content gaps

### HIGH
- A dedicated, research-backed update troubleshooting page covering the current upgrade paths and breaking-change warnings.
- A focused Synology migration/permissions troubleshooting page if the source library gains enough current evidence.

### MEDIUM
- A “how to use Immich” workflow page with deeper first-login, mobile backup, and server backup pathways after GSC query data is available.
- A Proxmox page that compares VM and LXC operational trade-offs only after more current official/community evidence is collected.

### LOW
- Comparison pages for PhotoPrism or Synology Photos until there is enough first-party evidence and measurable search demand.
- Generic feature pages without a specific task intent.

## Audit findings and priority

- P0: no live 404, canonical, or sitemap conflict was found in the local build audit.
- P1: empty Compare/Features entry points, stale Compare home card, and misleading breadcrumb routes reduced crawl and navigation quality. These were fixed by hiding/noindexing empty sections, removing them from sitemap, and correcting category routes.
- P1: Setup did not expose official installation resources or published platform guides. It now does, with explicit external-link labels and safe link attributes.
- P2: the site can later add richer FAQ/structured data only when question-answer evidence exists; no speculative FAQ schema was added.

## Follow-up SERP round (2026-09-08)

The five priority queries were checked live. `immich update error` surfaced official Errors/Upgrading material plus community tutorials; `immich migration` surfaced the official v3 migration post, GitHub discussions, and a recent independent runbook; `immich synology permissions` surfaced the official Synology community guide and current Reddit permission cases; `immich restore backup` was dominated by official Backup and Restore documentation, Reddit recovery questions, and community runbooks. The official `Quick start` page also appeared for the broader onboarding intent.

No new article was generated from these results. The existing pages already link to the relevant published topic clusters. A low-risk internal-link layer was added to every published article: two category-relevant links to Setup, Platforms, Backup & Storage, or Troubleshooting. Breadcrumb JSON-LD now uses the same valid category routes as the visible breadcrumb UI.

Follow-up content gaps remain research-only: migration runbooks, update-error diagnosis, Synology permissions, and restore verification. The live results confirm these are useful intents, but they require additional current, source-backed research before publication.

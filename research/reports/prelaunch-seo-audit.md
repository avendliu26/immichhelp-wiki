# Prelaunch SEO Audit

Audit date: 2026-09-08

## Final counts

- Public App Router URLs audited: 21 (11 static page routes, 8 published articles, robots, and sitemap).
- Indexable URLs: 17 sitemap entries (9 indexable static pages + 8 published articles).
- Noindex URLs: 2 (`/compare`, `/features`).
- Review content: 2 MDX files remain unpublished and are not routable through the document page.
- Published articles: 8.
- Orphan published pages: 0 after the shared Related guides layer; each published article has contextual category links.
- Broken internal links: 0 found by source scan and route mapping.
- Duplicate title / description: 0 among explicitly configured indexable routes; category and trust pages now have page-specific metadata.
- Canonical problems: 0 found in metadata configuration. Canonicals use `https://immichhelp.wiki`.
- Structured-data problems: 0 found. Home has WebSite; published articles have Article and BreadcrumbList. No speculative FAQPage was added.
- Empty category pages: 2 (`/compare`, `/features`), both noindex and excluded from sitemap.
- High-risk pages: 2 (Docker Compose and Backup/Restore content); destructive operations are inside danger callouts with warnings.
- Unmarked destructive command: 0 found in the audited content.
- Demo/example residue: 0 found in public app/content sources.
- Immich official logo misuse: 0; the independent brand remains in use.
- Favicon/manifest: valid local assets and JSON manifest present.
- Mobile overflow: existing responsive rules cover 390/430/768 layouts; no new fixed-width content was introduced.

## Final fixes

- Added page-specific metadata for Guides, Setup, Troubleshooting, Platforms, Backup, About, Privacy, and Terms.
- Added safe external-link attributes and external markers to Markdown source links.
- Added shared Related guides links to every published article.
- Corrected visible and JSON-LD breadcrumb category URLs.
- Kept empty Compare and Features routable for future content while applying noindex and sitemap exclusion.
- Kept Setup, Platforms, Backup, Troubleshooting, and Guides aligned with published content only.

## Remaining gaps

The following remain research priorities rather than auto-written content: `immich update error`, `immich migration`, `immich synology permissions`, `immich restore backup`, and `immich thumbnail not loading`. No new technical claims or commands were added for these gaps.

## Release decision

No blocking issue was found in the local prelaunch audit. The project meets the current “ready to deploy” standard after the verification commands pass. Production deployment and GSC submission remain separate operational steps.

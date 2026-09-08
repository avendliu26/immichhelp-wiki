# Immich Help

Independent community guide for Immich setup, storage, backup, migration, and troubleshooting.

A reusable, database-free Next.js App Router template for software documentation, help centers, setup guides, troubleshooting, backup/migration notes, and comparisons.

## Replace these files first

- `src/config/site.ts` — software name, domain, logo, official URL, and theme colors.
- `src/config/navigation.ts` — documentation groups and links.
- `src/data/home.ts` — homepage sections and cards.
- `content/` — published MDX-like pages with frontmatter.
- `public/images/` — optional site imagery.

## Content frontmatter

```yaml
title: A useful page title
description: One-sentence description for cards and SEO.
category: Troubleshooting
keywords: error, diagnosis, fix
status: published
lastReviewed: Sep 2026
verifiedVersion: vX.X
updated: Sep 2026
draft: false
```

Only `status: published` pages appear in navigation indexes, search, and `sitemap.xml`. Use `status: draft` or `status: review` for unpublished work.

## Local development

```bash
npm install
npm run dev
```

Run verification with `npm test` and `npm run build`. The template has no database, authentication, external search service, or heavyweight UI framework and is ready for Vercel deployment.

## Reusable MDX patterns

Use Markdown headings, lists, tables, links, inline code, fenced code blocks, and callouts such as `:::warning` or `:::danger`. Keep one H1 per page; the page shell owns the H1 and the content body should begin at H2.

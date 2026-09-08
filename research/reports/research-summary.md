# Research Summary

## Keywords Processed

12 high-value keywords from `research/keywords.json`.

## Ready for Writing

- immich error loading image
- how to use immich
- immich docker compose
- immich backup
- immich proxmox
- immich unraid
- immich setup
- how to update immich

## Insufficient Research

- immich for synology — current Synology machine-learning case has no confirmed fix; page is a community contribution.
- immich external library — open read-only XMP issue and conflicting metadata behavior.
- immich vs photoprism — official comparison is brief; no official full migration.
- immich vs synology photos — comparison needs same-version feature evidence.

## Strongest Opportunities

1. immich backup
2. immich docker compose
3. immich error loading image
4. immich external library
5. how to update immich

These have clear intent and first-party documentation; comparison pages need more evidence.

## Version Risks

Current stable checked: v3.1.0 (2026-07-29). Current prerelease: v3.2.0-rc.3 (2026-09-04). v3 introduces x86-64-v2 ML requirement and VectorChord context. Backup restore changed in v2.5.0. Many issue records are v1/v2 and are historical.

## High-Risk Pages

immich backup, immich docker compose, immich proxmox, immich unraid, immich setup, how to update immich. Risks include `docker compose down -v`, deleting DB_DATA_LOCATION, restore, database migration, storage-template migration, and filesystem permissions.

## Source Coverage

- Official Immich docs/compose snapshots: 16
- GitHub issues/discussions and API snapshots: 30+
- Community/competitor official docs: 8
- All fetched URLs returned HTTP 200; Synology release page returned empty body and is marked inaccessible for content verification.
- Snapshots are stored under `research/sources/snapshots/`; credentials found in public examples were redacted.

## Quality Checks

- No website code, routes, UI, deployment, Git push, or publishing changes were made.
- Duplicate URL check: no duplicate canonical URLs in source index.
- Unverified claims are labeled as unconfirmed or insufficient-research.
- Dangerous operations retain warnings and backup preconditions.


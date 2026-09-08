# Query

immich backup

# User Problem

Recover database state and actual originals together without destroying the only usable copy.

Original dossier, source-index, research-summary and seo-competitor-audit read before expansion. Existing research lacked operational coverage; new evidence and corrections are recorded here without changing those files.

# Problem Coverage Matrix

| User situation | Identify/check | Action | Verify | Boundary |
|---|---|---|---|---|
| DB-only backup | Dump exists but no protected originals | Inventory DB, upload, external originals, config | Restore rehearsal, sample originals | Automatic dump is not filesystem backup |
| Backup consistency | Uploads active during copy | Stop writes or database first, filesystem second | Matching restore point | External writers need separate coordination |
| Existing/fresh restore | Working admin versus new instance | Maintenance versus onboarding | Health, users, assets, integrity | Pre-v2.5 uses versioned docs |
| Restore failure | No admin, missing paths, schema conflict | Preserve restore point and inspect logs | Recovery target remains usable | No volume reset on production |



# Official Sources

- [Compose installation](https://docs.immich.app/install/docker-compose/) — official; Official Immich release files/environment. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [v3.1.0 Compose file](https://github.com/immich-app/immich/releases/download/v3.1.0/docker-compose.yml) — official; Official release configuration. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Upgrading](https://docs.immich.app/install/upgrading/) — official; Official Immich version/migration policy. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Backup and Restore](https://docs.immich.app/administration/backup-and-restore/) — official; Official Immich recovery prerequisites. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [System Integrity](https://docs.immich.app/administration/system-integrity/) — official; Official Immich verification. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Maintenance Mode](https://docs.immich.app/administration/maintenance-mode/) — official; Official Immich documentation; recovery login. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Backup Script](https://docs.immich.app/guides/template-backup-script/) — official; Official Immich example; optional Borg workflow. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [SQL Dump](https://www.postgresql.org/docs/current/backup-dump.html) — official; Official PostgreSQL documentation; logical backups. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [docker compose stop](https://docs.docker.com/reference/cli/docker/compose/stop/) — official; Official Docker command reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# GitHub Evidence

- [No admin exists, #26522](https://github.com/immich-app/immich/issues/26522) — github-issue; GitHub issue; historical Unraid v2.5.6 case. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# Community Cases

- [Backup strategy advice](https://www.reddit.com/r/immich/comments/1pep6pu/backup_strategy_advice/) — forum-reddit; Reddit; user question, not fix authority. Checked 2026-09-08. Direct fetch blocked; browser/agent read used where recorded
- [Backup tool choices](https://www.reddit.com/r/immich/comments/1m6x9li/how_do_you_back_up_your_immich_photosvideos_what/) — forum-reddit; Reddit; workflow question. Checked 2026-09-08. Direct fetch blocked; browser/agent read used where recorded

# Confirmed Facts

- DB contains paths/user metadata, not media; managed upload folder is not scanned to reconstruct state.
- Automatic dumps default to 02:00/14 retained; UI dump job and Maintenance/onboarding restore are documented.
- Stop application writes for consistency, or DB first then filesystem for a live backup.
- Restore creates a DB restore point, performs migration/health checks; this is not a media backup.
- SQL dump is a logical format; live PostgreSQL directory copying is a different backup method.

Claim-to-source mappings are provided by the section ledger below and inline citations in the final article. These are documentary confirmations, not hardware test results.

# Version Differences

Pre-v2.5.0 restore instructions differ; current UI provides version compatibility indicators. VectorChord-era dumps need compatible DB extension images.

# Platform Differences

Linux gzip pipeline versus PowerShell examples; actual bind/named volumes in Synology, Unraid, TrueNAS; external guest mounts separately inventoried.

# Common Failure Modes

Absent backup list; missing .immich/folders; no admin; schema conflicts; originals missing despite login.

# Confirmed Fixes

UI create dump; coordinated DB/media copy; same external container structure; restore via Maintenance or fresh onboarding. Missing derivatives use missing jobs. No universal no-admin workaround.

# Risky Operations

Restore replacement, down -v, DB directory deletion, recursive permissions, mixed recovery timestamps, unprotected external originals.

# Verification Steps

Saved backup browse and copied-file checks; isolated restore, users/albums, original download/video playback; full integrity check versus refresh; derivative regeneration. Reader acceptance checks are editorial synthesis from cited procedures, explicitly not claimed as executed.

# Conflicts

Original dossier implied #26522 had general remediation; it is a v2.5.6 Unraid user workaround. Borg template claims coordination; backup-order policy remains authoritative and stopping writes is stronger.

# Remaining Unknowns

No live restore drill or backup-tool deployment performed. Exact arbitrary historical backup compatibility and every platform-specific volume layout require operator testing.

# Recommended Final Article Structure

- Direct Answer
- What belongs in the backup set
- Step 1: Establish the recovery point
- Step 2: Keep the database and media consistent
- Step 3: Verify the saved copy before relying on it
- Step 4: Choose the correct restore workflow
- Step 5: Verify the restored installation
- If this does not work
- Platform and version boundaries
- FAQ
- Sources

# Search Waves and Stopping Decision

- Wave 1: read existing research and primary documentation/release baseline.
- Wave 2: targeted queries: `immich backup restore 26522 version admin`; `site:reddit.com/r/immich backup database media restore order`; `Immich backup tools database dump Borg consistency`.
- Wave 3 / reconciliation: Original dossier implied #26522 had general remediation; it is a v2.5.6 Unraid user workaround. Borg template claims coordination; backup-order policy remains authoritative and stopping writes is stronger.
- Stop decision: Official recovery components, order, UI and CLI paths covered; follow-up community searches repeated consistency/tool questions rather than a new supported recovery mechanism.
- Priority was independent primary evidence; generic blogs/YouTube repetition was not added for source-count inflation.

# Claim-to-Source Ledger

| Article section | Evidence URLs | Evidence interpretation |
|---|---|---|
| Direct Answer | [1](https://docs.immich.app/administration/backup-and-restore/) | Risk boundary / editorial caution |
| What belongs in the backup set | [1](https://docs.immich.app/administration/backup-and-restore/); [2](https://github.com/immich-app/immich/releases/download/v3.1.0/docker-compose.yml); [3](https://www.postgresql.org/docs/current/backup-dump.html) | Synthesis of cited procedure/case; preserve stated version |
| Step 1: Establish the recovery point | [1](https://docs.immich.app/administration/backup-and-restore/) | Synthesis of cited procedure/case; preserve stated version |
| Step 2: Keep the database and media consistent | [1](https://docs.docker.com/reference/cli/docker/compose/stop/); [2](https://docs.immich.app/administration/backup-and-restore/); [3](https://docs.immich.app/guides/template-backup-script/); [4](https://docs.immich.app/install/docker-compose/) | Synthesis of cited procedure/case; preserve stated version |
| Step 3: Verify the saved copy before relying on it | Cross-reference adjacent cited procedure and article Sources; editorial diagnostic organization | Synthesis of cited procedure/case; preserve stated version |
| Step 4: Choose the correct restore workflow | [1](https://docs.immich.app/administration/backup-and-restore/) | Risk boundary / editorial caution |
| Step 5: Verify the restored installation | [1](https://docs.immich.app/administration/system-integrity/) | Synthesis of cited procedure/case; preserve stated version |
| If this does not work | [1](https://docs.immich.app/administration/maintenance-mode/) | Risk boundary / editorial caution |
| Platform and version boundaries | [1](https://docs.immich.app/administration/backup-and-restore/); [2](https://github.com/immich-app/immich/issues/26522) | Synthesis of cited procedure/case; preserve stated version |
| FAQ | [1](https://docs.immich.app/install/upgrading/); [2](https://www.reddit.com/r/immich/comments/1m6x9li/how_do_you_back_up_your_immich_photosvideos_what/); [3](https://www.reddit.com/r/immich/comments/1pep6pu/backup_strategy_advice/) | Synthesis of cited procedure/case; preserve stated version |

# FAQ Provenance

- Can I keep uploading while the backup runs? — https://www.reddit.com/r/immich/comments/1pep6pu/backup_strategy_advice/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Will changing to VectorChord invalidate all older dumps? — https://docs.immich.app/install/upgrading/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Does the database backup replace a filesystem backup tool? — https://www.reddit.com/r/immich/comments/1m6x9li/how_do_you_back_up_your_immich_photosvideos_what/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.

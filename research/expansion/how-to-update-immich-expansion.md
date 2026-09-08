# Query

how to update immich

# User Problem

Choose correct routine versus historical migration path with recoverable data.

Original dossier, source-index, research-summary and seo-competitor-audit read before expansion. Existing research lacked operational coverage; new evidence and corrections are recorded here without changing those files.

# Problem Coverage Matrix

| User situation | Identify/check | Action | Verify | Boundary |
|---|---|---|---|---|
| Routine v3 update | Already VectorChord | Notes, backup, pull, up | Version, migrations, upload/download | RC separate |
| Old v1 path | Invalid upgrade path | Documented intermediate v1.132.3 | Successful intermediate startup | Avoid v1.136 from <=v1.131 |
| v2 to v3 | pgvecto.rs or old CPU | Migrate extension before v3, verify CPU | DB and ML functioning | Preserve PostgreSQL major |
| Failure/rollback | Restart loop or migration error | Logs, mounts, restore rehearsal | Stable startup and assets | Downgrade unsupported |



# Official Sources

- [Compose installation](https://docs.immich.app/install/docker-compose/) — official; Official Immich release files/environment. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Upgrading](https://docs.immich.app/install/upgrading/) — official; Official Immich version/migration policy. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Docker ps](https://docs.docker.com/reference/cli/docker/compose/ps/) — official; Official Docker reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Docker logs](https://docs.docker.com/reference/cli/docker/compose/logs/) — official; Official Docker reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Releases](https://github.com/immich-app/immich/releases) — official; Official GitHub releases; stable/prerelease metadata. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Backup and Restore](https://docs.immich.app/administration/backup-and-restore/) — official; Official Immich recovery prerequisites. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Errors](https://docs.immich.app/errors/) — official; Official Immich historical upgrade/path errors. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Migrating to v3](https://immich.app/blog/v3-migration) — official; Official Immich breaking changes. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Pre-existing Postgres](https://docs.immich.app/administration/postgres-standalone/) — official; Official Immich custom-database boundary. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [System Integrity](https://docs.immich.app/administration/system-integrity/) — official; Official Immich verification. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Compose config](https://docs.docker.com/reference/cli/docker/compose/config/) — official; Official Docker command reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# GitHub Evidence

- [Synology helper, #25771](https://github.com/immich-app/immich/discussions/25771) — github-discussion; GitHub community script discussion. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Old-version upgrade case, #30621](https://github.com/immich-app/immich/discussions/30621) — github-discussion; GitHub community guide; one documented environment. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# Community Cases

No distinct source in this class used; GitHub community evidence is classified separately, not double-counted.

# Confirmed Facts

- Latest stable and RC independently checked via GitHub API/release page.
- Official pull && up -d, preserve env/custom paths and read intervening notes.
- Downgrades unsupported; mobile clients first per dedicated versioning policy.
- v3 rejects pgvecto.rs; pre-v3 extension migration must precede the boundary.
- Historical invalid path requires successful intermediate startup; v1.132.3 recommended.

Claim-to-source mappings are provided by the section ledger below and inline citations in the final article. These are documentary confirmations, not hardware test results.

# Version Differences

v1.131 or older must avoid v1.136 intermediate; pre-v2.5 restore differs; v3 ML CPU and removed variables/OAuth/API. Do not generalize case-specific upgrade checkpoint list.

# Platform Differences

Separate PostgreSQL and packaged Unraid/TrueNAS/native LXC distributions need own lifecycle; Synology build/firewall controls.

# Common Failure Modes

Pull error, old pin, invalid upgrade path, reindex slow vs restart, unsupported extension/CPU, missing storage, mobile mismatch.

# Confirmed Fixes

Target-specific config and preserved DB major; allow error-free reindex; correct documented intermediate; use matching pre-update recovery set instead of image-only rollback.

# Risky Operations

DB migration, unsupported downgrade, Postgres major swap, restore/reset and broad permissions.

# Verification Steps

Actual version, persistent service health, no migration failure, old original/new upload/video, external sample/search/jobs/integrity. Reader acceptance checks are editorial synthesis from cited procedures, explicitly not claimed as executed.

# Conflicts

General FAQ still says matching major/minor; dedicated Upgrading current policy takes precedence. #30621 is one community path, not mandatory full sequence. #25771 is unconfirmed helper failure, not official updater.

# Remaining Unknowns

No real v1/v2/v3 migration tested. Arbitrary custom PostgreSQL/extension paths require distribution-specific procedure and rehearsal.

# Recommended Final Article Structure

- Direct Answer
- Step 1: Identify the upgrade path
- Step 2: Prepare a usable recovery set
- Step 3: Apply a routine stable update
- Step 4: Wait for migrations and verify
- Migrating pgvecto.rs to VectorChord
- v1, v2 and v3 differences
- If this does not work
- Platform differences and real-world evidence
- FAQ
- Sources

# Search Waves and Stopping Decision

- Wave 1: read existing research and primary documentation/release baseline.
- Wave 2: targeted queries: `immich v3 VectorChord migration upgrade`; `site:github.com/immich-app/immich old v1 upgrade 30621`; `immich upgrade Synology helper 25771`.
- Wave 3 / reconciliation: General FAQ still says matching major/minor; dedicated Upgrading current policy takes precedence. #30621 is one community path, not mandatory full sequence. #25771 is unconfirmed helper failure, not official updater.
- Stop decision: Primary migration constraints resolved; targeted old-install guide adds checkpoints but no different official path; custom setups explicitly bounded.
- Priority was independent primary evidence; generic blogs/YouTube repetition was not added for source-count inflation.

# Claim-to-Source Ledger

| Article section | Evidence URLs | Evidence interpretation |
|---|---|---|
| Direct Answer | [1](https://docs.immich.app/install/upgrading/); [2](https://github.com/immich-app/immich/releases) | Synthesis of cited procedure/case; preserve stated version |
| Step 1: Identify the upgrade path | [1](https://docs.immich.app/install/upgrading/) | Synthesis of cited procedure/case; preserve stated version |
| Step 2: Prepare a usable recovery set | [1](https://docs.immich.app/install/docker-compose/) | Risk boundary / editorial caution |
| Step 3: Apply a routine stable update | [1](https://docs.docker.com/reference/cli/docker/compose/config/); [2](https://docs.immich.app/install/upgrading/) | Synthesis of cited procedure/case; preserve stated version |
| Step 4: Wait for migrations and verify | [1](https://docs.docker.com/reference/cli/docker/compose/logs/); [2](https://docs.docker.com/reference/cli/docker/compose/ps/); [3](https://docs.immich.app/administration/system-integrity/); [4](https://docs.immich.app/install/upgrading/) | Synthesis of cited procedure/case; preserve stated version |
| Migrating pgvecto.rs to VectorChord | [1](https://docs.immich.app/administration/postgres-standalone/); [2](https://docs.immich.app/install/upgrading/#migrating-to-vectorchord) | Risk boundary / editorial caution |
| v1, v2 and v3 differences | [1](https://docs.immich.app/administration/backup-and-restore/); [2](https://docs.immich.app/errors/); [3](https://immich.app/blog/v3-migration) | Synthesis of cited procedure/case; preserve stated version |
| If this does not work | [1](https://docs.immich.app/errors/) | Synthesis of cited procedure/case; preserve stated version |
| Platform differences and real-world evidence | [1](https://github.com/immich-app/immich/discussions/25771); [2](https://github.com/immich-app/immich/discussions/30621) | Synthesis of cited procedure/case; preserve stated version |
| FAQ | [1](https://docs.immich.app/install/upgrading/) | Synthesis of cited procedure/case; preserve stated version |

# FAQ Provenance

- Why were the old PostgreSQL health-check lines removed? — https://docs.immich.app/install/upgrading/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Do I still need pgvecto.rs installed after the transition? — https://docs.immich.app/install/upgrading/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Should I use SSD or HDD database tuning? — https://docs.immich.app/install/upgrading/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.

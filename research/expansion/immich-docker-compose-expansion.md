# Query

immich docker compose

# User Problem

Complete a new install without incorrect paths, incompatible runtime or unsafe resets.

Original dossier, source-index, research-summary and seo-competitor-audit read before expansion. Existing research lacked operational coverage; new evidence and corrections are recorded here without changing those files.

# Problem Coverage Matrix

| User situation | Identify/check | Action | Verify | Boundary |
|---|---|---|---|---|
| First installation | No existing data | Release files, .env, local DB, start | Four services, login, sample upload | Linux preferred |
| Wrong path | Wrong capacity or missing mounts | Resolve host versus /data paths | Container sees intended files | Never point upload at external collection |
| Startup errors | Compose syntax, permissions, healthcheck | Identify Docker version and DB filesystem | ps/logs then access | Windows DB volume differs |
| Maintenance | Existing install | Backup then release-specific update | Version and original download | No destructive reset |



# Official Sources

- [Requirements](https://docs.immich.app/install/requirements/) — official; Official Immich platform limits. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Compose installation](https://docs.immich.app/install/docker-compose/) — official; Official Immich release files/environment. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [v3.1.0 Compose file](https://github.com/immich-app/immich/releases/download/v3.1.0/docker-compose.yml) — official; Official release configuration. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Post-installation](https://docs.immich.app/install/post-install/) — official; Official Immich account setup. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Mobile Backup](https://docs.immich.app/features/mobile-backup/) — official; Official Immich phone behavior. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Upgrading](https://docs.immich.app/install/upgrading/) — official; Official Immich version/migration policy. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Docker ps](https://docs.docker.com/reference/cli/docker/compose/ps/) — official; Official Docker reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Docker logs](https://docs.docker.com/reference/cli/docker/compose/logs/) — official; Official Docker reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Backup and Restore](https://docs.immich.app/administration/backup-and-restore/) — official; Official Immich recovery prerequisites. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Errors](https://docs.immich.app/errors/) — official; Official Immich historical upgrade/path errors. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [System Integrity](https://docs.immich.app/administration/system-integrity/) — official; Official Immich verification. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Compose config](https://docs.docker.com/reference/cli/docker/compose/config/) — official; Official Docker command reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [FAQ](https://docs.immich.app/FAQ/) — official; Official Immich filename questions. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Docker Engine installation](https://docs.docker.com/engine/install/) — official; Official Docker runtime instructions. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# GitHub Evidence

- [Compose prerequisites, #8843](https://github.com/immich-app/immich/discussions/8843) — github-discussion; GitHub discussion; historical packaging distinction. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# Community Cases

- [NAS storage capacity mismatch](https://www.reddit.com/r/immich/comments/1u5kf89/path_to_storage_not_working_not_done_properly/) — forum-reddit; Reddit; first-person storage symptom. Checked 2026-09-08. Direct fetch blocked; browser/agent read used where recorded

# Confirmed Facts

- Release v3.1.0 includes server, ML, redis service running Valkey, and Immich PostgreSQL/VectorChord.
- Use release files together, new upload directory, local permission-capable DB path.
- Compose plugin required; 6 GB/2 core minimum, 8 GB/4 core recommended.
- v3 amd64 ML needs x86-64-v2; old CPU exception v2.7.5 unsupported.
- config --quiet, ps -a and logs --tail are documented Docker diagnostics.

Claim-to-source mappings are provided by the section ledger below and inline citations in the final article. These are documentary confirmations, not hardware test results.

# Version Differences

Live stable v3.1.0; v3 metatag excludes RC. Old healthcheck start_interval workaround only applies when that field/error exists. Windows DB differs.

# Platform Differences

Linux/full VM preferred; Windows NTFS/WSL host mount unsuitable for DB, named-volume alternative; platform apps not interchangeable with Compose.

# Common Failure Modes

Wrong runtime; .env inaccessible; invalid YAML; unsupported DB FS; wrong mounted capacity; missing markers; unreachable 2283.

# Confirmed Fixes

Correct release files/runtime, validate environment, preserve /data destination, diagnose actual DB filesystem and service logs before re-start.

# Risky Operations

Download overwrites existing configuration, down -v or DB deletion destroys state; recursive permissions and wrong media root.

# Verification Steps

Configuration exit success, four running services, first admin, mobile sample, original download/video, independent backup. Reader acceptance checks are editorial synthesis from cited procedures, explicitly not claimed as executed.

# Conflicts

Old prose called redis an image; actual v3.1.0 service uses Valkey. Community Unraid prerequisites differ from official Compose. Distro .env permission error is possible runtime symptom, not always runtime cause.

# Remaining Unknowns

No actual Docker deployment or host-specific database permissions tested. NAS capacity Reddit report is a symptom, no asserted root cause.

# Recommended Final Article Structure

- Direct Answer
- Step 1: Check the host and storage
- Step 2: Download the two release files
- Step 3: Populate .env and understand the mounts
- Step 4: Validate and start
- Step 5: Verify startup and create the admin
- If this does not work
- Platform differences and first maintenance
- FAQ
- Sources

# Search Waves and Stopping Decision

- Wave 1: read existing research and primary documentation/release baseline.
- Wave 2: targeted queries: `immich docker compose storage path postgres permission`; `site:docs.docker.com docker compose ps logs config`; `immich docker compose database password authentication failed`.
- Wave 3 / reconciliation: Old prose called redis an image; actual v3.1.0 service uses Valkey. Community Unraid prerequisites differ from official Compose. Distro .env permission error is possible runtime symptom, not always runtime cause.
- Stop decision: Runtime/storage/account/verification branches covered with primary docs and exact release assets; additional results repeated path and ownership mistakes.
- Priority was independent primary evidence; generic blogs/YouTube repetition was not added for source-count inflation.

# Claim-to-Source Ledger

| Article section | Evidence URLs | Evidence interpretation |
|---|---|---|
| Direct Answer | [1](https://docs.immich.app/install/docker-compose/) | Synthesis of cited procedure/case; preserve stated version |
| Step 1: Check the host and storage | [1](https://docs.docker.com/engine/install/); [2](https://docs.immich.app/install/requirements/) | Synthesis of cited procedure/case; preserve stated version |
| Step 2: Download the two release files | [1](https://docs.immich.app/install/docker-compose/) | Synthesis of cited procedure/case; preserve stated version |
| Step 3: Populate .env and understand the mounts | [1](https://github.com/immich-app/immich/discussions/8843); [2](https://github.com/immich-app/immich/releases/download/v3.1.0/docker-compose.yml) | Synthesis of cited procedure/case; preserve stated version |
| Step 4: Validate and start | [1](https://docs.docker.com/reference/cli/docker/compose/config/); [2](https://docs.immich.app/install/docker-compose/) | Synthesis of cited procedure/case; preserve stated version |
| Step 5: Verify startup and create the admin | [1](https://docs.docker.com/reference/cli/docker/compose/logs/); [2](https://docs.docker.com/reference/cli/docker/compose/ps/); [3](https://docs.immich.app/features/mobile-backup/); [4](https://docs.immich.app/install/post-install/) | Synthesis of cited procedure/case; preserve stated version |
| If this does not work | [1](https://docs.immich.app/administration/system-integrity/); [2](https://docs.immich.app/errors/); [3](https://www.reddit.com/r/immich/comments/1u5kf89/path_to_storage_not_working_not_done_properly/) | Risk boundary / editorial caution |
| Platform differences and first maintenance | [1](https://docs.immich.app/install/requirements/) | Synthesis of cited procedure/case; preserve stated version |
| FAQ | [1](https://docs.immich.app/FAQ/); [2](https://docs.immich.app/administration/backup-and-restore/); [3](https://docs.immich.app/install/upgrading/) | Synthesis of cited procedure/case; preserve stated version |

# FAQ Provenance

- Can I copy existing photos into the upload directory to import them? — https://docs.immich.app/administration/backup-and-restore/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Why does the database health check disappear in a newer Compose example? — https://docs.immich.app/install/upgrading/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Why are my stored filenames random? — https://docs.immich.app/FAQ/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.

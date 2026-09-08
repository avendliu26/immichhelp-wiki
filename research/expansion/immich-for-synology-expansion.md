# Query

immich for synology

# User Problem

Install, verify and maintain a Container Manager project without mistaking NAS paths or cleanup scope.

Original dossier, source-index, research-summary and seo-competitor-audit read before expansion. Existing research lacked operational coverage; new evidence and corrections are recorded here without changing those files.

# Problem Coverage Matrix

| User situation | Identify/check | Action | Verify | Boundary |
|---|---|---|---|---|
| Container Manager install | Supported DSM package available | Folders, project files, env, build | 2283 and upload | Community guide |
| Paths and ACLs | External library empty | NAS path to container mapping and identity | Read known file and scan | No global chmod |
| Firewall | LAN or ML request fails | Port and container network rules | Client/server connectivity | Unresolved ML case not fixed by assertion |
| Update/backup | Rebuild existing project | Preserve env/data, backups, release notes | Version, mounts, originals | Hardware/version constraints |



# Official Sources

- [Synology installation](https://docs.immich.app/install/synology/) — community-contribution; Community contribution hosted in Immich docs. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Requirements](https://docs.immich.app/install/requirements/) — official; Official Immich platform limits. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Compose installation](https://docs.immich.app/install/docker-compose/) — official; Official Immich release files/environment. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [v3.1.0 Compose file](https://github.com/immich-app/immich/releases/download/v3.1.0/docker-compose.yml) — official; Official release configuration. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Post-installation](https://docs.immich.app/install/post-install/) — official; Official Immich account setup. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Mobile Backup](https://docs.immich.app/features/mobile-backup/) — official; Official Immich phone behavior. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [External Libraries](https://docs.immich.app/features/libraries/) — official; Official Immich mounts/scans. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Upgrading](https://docs.immich.app/install/upgrading/) — official; Official Immich version/migration policy. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Container Manager Project](https://kb.synology.com/en-us/DSM/help/ContainerManager/docker_project) — official; Official Synology help; indexed text only, full body inaccessible. Checked 2026-09-08. Official indexed text read via web search; direct body is JS shell, no version-specific UI verification

# GitHub Evidence

- [DSM ML failure, #28987](https://github.com/immich-app/immich/discussions/28987) — github-discussion; GitHub discussion; unresolved v2 case. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Synology helper, #25771](https://github.com/immich-app/immich/discussions/25771) — github-discussion; GitHub community script discussion. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# Community Cases

- [Synology firewall after update](https://www.reddit.com/r/immich/comments/1jq4kuk/synology_firewall/) — forum-reddit; Reddit; user-reported network-rule correction. Checked 2026-09-08. Direct fetch blocked; browser/agent read used where recorded

# Confirmed Facts

- Synology doc explicitly community-contributed; use project/library/postgres directories and release files.
- Create existing Compose project, skip optional portal, verify 2283 and actual container IP.
- Fixed subnet optional; all services must share chosen non-conflicting network.
- Database on NAS local supported filesystem differs from a remote network share.
- Clean/delete scope must be checked; official Synology index wording broader than Immich community summary.

Claim-to-source mappings are provided by the section ledger below and inline citations in the final article. These are documentary confirmations, not hardware test results.

# Version Differences

Stable v3.1.0 checked; #28987 DSM7.2.2 Update4/Immich v2; helper error reported v2.5.2; cannot infer current model compatibility.

# Platform Differences

DSM Package Center/File Station/Text Editor/Container Manager; absolute volume paths vary; NAS ACL and read-only external mount.

# Common Failure Modes

Bad .env, project parse, DB ownership, changed firewall IP, external empty scan, unresolved ML HTTP500.

# Confirmed Fixes

Correct project paths and configuration, actual firewall source rule, tested mount; community update Stop/Clean/unused-images/Build only with backup/scope checks.

# Risky Operations

Clean/Delete/volume or DB removal; restore; broad ACL/chmod; writable original mounts.

# Verification Steps

Containers and logs, reachable 2283, first admin, foreground phone upload, original/video, external sample, jobs after update. Reader acceptance checks are editorial synthesis from cited procedures, explicitly not claimed as executed.

# Conflicts

Synology Project official search-index says broader cleanup than community guide. Full KB body JS shell, exact DSM UI not tested. #28987 firewall/name/cache theories failed or recurred.

# Remaining Unknowns

Model-by-model Container Manager/GPU support, current DSM cleanup dialog, live NAS install and unresolved ML root cause.

# Recommended Final Article Structure

- Direct Answer
- Step 1: Prepare Container Manager and shared storage
- Step 2: Place and edit the release files
- Step 3: Create and build the project
- Step 4: Establish LAN access and firewall rules
- Step 5: Create the admin and test mobile upload
- Step 6: Add an existing NAS photo folder
- Backup and update the existing project
- If this does not work
- FAQ
- Sources

# Search Waves and Stopping Decision

- Wave 1: read existing research and primary documentation/release baseline.
- Wave 2: targeted queries: `Immich Synology Container Manager shared folder firewall update`; `Synology Project Clean volumes images official`; `Immich 28987 machine learning Synology 25771 helper`; `site:reddit.com/r/immich Synology firewall`.
- Wave 3 / reconciliation: Synology Project official search-index says broader cleanup than community guide. Full KB body JS shell, exact DSM UI not tested. #28987 firewall/name/cache theories failed or recurred.
- Stop decision: Three rounds establish standard UI workflow; new reports repeat firewall/path/ML splits. Unresolved ML and cleanup version differences explicitly retained.
- Priority was independent primary evidence; generic blogs/YouTube repetition was not added for source-count inflation.

# Claim-to-Source Ledger

| Article section | Evidence URLs | Evidence interpretation |
|---|---|---|
| Direct Answer | [1](https://docs.immich.app/install/requirements/); [2](https://docs.immich.app/install/synology/) | Synthesis of cited procedure/case; preserve stated version |
| Step 1: Prepare Container Manager and shared storage | [1](https://docs.immich.app/install/requirements/); [2](https://docs.immich.app/install/synology/) | Synthesis of cited procedure/case; preserve stated version |
| Step 2: Place and edit the release files | [1](https://docs.immich.app/install/docker-compose/); [2](https://github.com/immich-app/immich/releases/download/v3.1.0/docker-compose.yml) | Synthesis of cited procedure/case; preserve stated version |
| Step 3: Create and build the project | [1](https://docs.immich.app/install/synology/) | Synthesis of cited procedure/case; preserve stated version |
| Step 4: Establish LAN access and firewall rules | [1](https://docs.immich.app/install/synology/) | Synthesis of cited procedure/case; preserve stated version |
| Step 5: Create the admin and test mobile upload | [1](https://docs.immich.app/features/mobile-backup/); [2](https://docs.immich.app/install/post-install/) | Synthesis of cited procedure/case; preserve stated version |
| Step 6: Add an existing NAS photo folder | [1](https://docs.immich.app/features/libraries/) | Risk boundary / editorial caution |
| Backup and update the existing project | [1](https://docs.immich.app/install/synology/); [2](https://docs.immich.app/install/upgrading/); [3](https://kb.synology.com/en-us/DSM/help/ContainerManager/docker_project) | Risk boundary / editorial caution |
| If this does not work | [1](https://github.com/immich-app/immich/discussions/28987); [2](https://www.reddit.com/r/immich/comments/1jq4kuk/synology_firewall/) | Synthesis of cited procedure/case; preserve stated version |
| FAQ | [1](https://docs.immich.app/install/requirements/); [2](https://github.com/immich-app/immich/discussions/25771); [3](https://github.com/immich-app/immich/discussions/28987) | Synthesis of cited procedure/case; preserve stated version |

# FAQ Provenance

- Can I use a 4 GB or older Synology model? — https://docs.immich.app/install/requirements/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Is a community Synology upgrade helper the official updater? — https://github.com/immich-app/immich/discussions/25771; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Should I change the ML service name from a dash to an underscore? — https://github.com/immich-app/immich/discussions/28987; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.

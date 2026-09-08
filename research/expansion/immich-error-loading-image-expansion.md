# Query

immich error loading image

# User Problem

Classify original, generated, mount, format, proxy and version-related failures without destructive guesses.

Original dossier, source-index, research-summary and seo-competitor-audit read before expansion. Existing research lacked operational coverage; new evidence and corrections are recorded here without changing those files.

# Problem Coverage Matrix

| User situation | Identify/check | Action | Verify | Boundary |
|---|---|---|---|---|
| Thumbnail only | Original downloads | Job and generated-path diagnostics | Affected tile works | Regeneration needs original |
| Original missing | ENOENT or integrity missing | Trace storage path and backup | Original opens, integrity refresh | No database reset |
| External only | Other uploads work | Import paths, mounts, permissions, scan | Affected external file opens | No blind rescan during outage |
| Network/format/update | Local works or one format fails | Proxy comparison, format support, version logs | Same asset on same client | Historical bugs do not prove current cause |



# Official Sources

- [External Libraries](https://docs.immich.app/features/libraries/) — official; Official Immich mounts/scans. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Docker ps](https://docs.docker.com/reference/cli/docker/compose/ps/) — official; Official Docker reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Docker logs](https://docs.docker.com/reference/cli/docker/compose/logs/) — official; Official Docker reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Errors](https://docs.immich.app/errors/) — official; Official Immich historical upgrade/path errors. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [System Integrity](https://docs.immich.app/administration/system-integrity/) — official; Official Immich verification. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [FAQ](https://docs.immich.app/FAQ/) — official; Official Immich filename questions. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Jobs and Workers](https://docs.immich.app/administration/jobs-workers/) — official; Official Immich processing model. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Reverse Proxy](https://docs.immich.app/administration/reverse-proxy/) — official; Official Immich proxy requirements. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Supported Media Formats](https://docs.immich.app/features/supported-formats/) — official; Official Immich image/video compatibility. Checked 2026-09-08. Web tool full official page read

# GitHub Evidence

- [Missing uploaded originals, #26720](https://github.com/immich-app/immich/issues/26720) — github-issue; GitHub issue; historical v2.5.6 record. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Multiple instances, #23574](https://github.com/immich-app/immich/issues/23574) — github-issue; GitHub issue; v2.2.1 queue-isolation case. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Thumbnail refresh, #10570](https://github.com/immich-app/immich/discussions/10570) — github-discussion; GitHub discussion; historical user observations. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [External mount outage, #30820](https://github.com/immich-app/immich/discussions/30820) — github-discussion; GitHub discussion; v3.1.0, unresolved recovery discrepancy. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# Community Cases

- [Initial TrueNAS processing](https://www.reddit.com/r/immich/comments/1pgql6k/error_loading_image/) — forum-reddit; Reddit; user-reported progress. Checked 2026-09-08. Direct fetch blocked; browser/agent read used where recorded
- [Images after v2.5 update](https://www.reddit.com/r/immich/comments/1qs5jqm/issue_after_updating_to_25x/) — forum-reddit; Reddit; user-reported NFS/configuration correction. Checked 2026-09-08. Direct fetch blocked; browser/agent read used where recorded

# Confirmed Facts

- Integrity missing/untracked/checksum categories differ; refresh only known findings.
- Generated media can regenerate only with originals accessible.
- Check container path not host view; default server includes worker processing.
- Proxy requires root path; compare same asset direct/proxy as editorial isolation test.
- Multi-instance #23574 later confirms omitted REDIS_HOSTNAME, not unexplained generic corruption.

Claim-to-source mappings are provided by the section ledger below and inline citations in the final article. These are documentary confirmations, not hardware test results.

# Version Differences

v1.106.4 refresh report historical; #23574 v2.2.1; #26720 v2.5.6 Podman/Raspberry, first release of sync fix unestablished; #30820 current v3.1.0.

# Platform Differences

Compose logs versus DSM/platform manager; TrueNAS import queue case; NAS mounts; Podman historical case not Compose-specific proof.

# Common Failure Modes

Thumbnail only; original ENOENT; EACCES; external only; update/mount marker; proxy route; decoder or HDR display; shared queues.

# Confirmed Fixes

Repair correct mount/access; retry one/missing thumbnail jobs; recover genuine originals; root proxy mapping; isolate caches per actual instances; no blanket SQL.

# Risky Operations

DB resets, volume deletion, recursive permission changes, deleting/reuploading mismatches and clearing Trash may lose associations.

# Verification Steps

Same failing original and preview, no repeated error, job progress and refreshed integrity; old/new/external sample coverage. Reader acceptance checks are editorial synthesis from cited procedures, explicitly not claimed as executed.

# Conflicts

Original #23574 summary omitted final Redis finding. #26720 asset_file absence can be normal. #30820 maintainer advises rescan but author reports unresolved recovery.

# Remaining Unknowns

No live broken-library reproduction; #26720 first fixed tag unverified, no universal decoder fix, #30820 unresolved.

# Recommended Final Article Structure

- Direct Answer
- Choose the matching symptom
- Step 1: Collect useful logs and integrity findings
- Thumbnail-only branch
- Missing-original or permission branch
- External-library branch
- Post-update or storage-move branch
- Network and reverse-proxy branch
- Format, checksum and multi-instance branches
- Verification and escalation
- FAQ
- Sources

# Search Waves and Stopping Decision

- Wave 1: read existing research and primary documentation/release baseline.
- Wave 2: targeted queries: `Immich error loading image thumbnail original ENOENT jobs`; `Immich 23574 comments Redis 26720 sync missing files`; `Immich reverse proxy supported formats update images`; `Immich external mount 30820 3.1.0`.
- Wave 3 / reconciliation: Original #23574 summary omitted final Redis finding. #26720 asset_file absence can be normal. #30820 maintainer advises rescan but author reports unresolved recovery.
- Stop decision: Two rounds and current case cover distinct symptom branches; repeated community refresh suggestions add no reliable universal repair.
- Priority was independent primary evidence; generic blogs/YouTube repetition was not added for source-count inflation.

# Claim-to-Source Ledger

| Article section | Evidence URLs | Evidence interpretation |
|---|---|---|
| Direct Answer | [1](https://docs.immich.app/administration/system-integrity/) | Synthesis of cited procedure/case; preserve stated version |
| Choose the matching symptom | Cross-reference adjacent cited procedure and article Sources; editorial diagnostic organization | Synthesis of cited procedure/case; preserve stated version |
| Step 1: Collect useful logs and integrity findings | [1](https://docs.docker.com/reference/cli/docker/compose/logs/); [2](https://docs.docker.com/reference/cli/docker/compose/ps/); [3](https://docs.immich.app/administration/system-integrity/) | Synthesis of cited procedure/case; preserve stated version |
| Thumbnail-only branch | [1](https://docs.immich.app/administration/jobs-workers/); [2](https://docs.immich.app/administration/system-integrity/); [3](https://github.com/immich-app/immich/discussions/10570); [4](https://www.reddit.com/r/immich/comments/1pgql6k/error_loading_image/) | Synthesis of cited procedure/case; preserve stated version |
| Missing-original or permission branch | [1](https://docs.immich.app/features/libraries/#troubleshooting); [2](https://github.com/immich-app/immich/issues/26720) | Risk boundary / editorial caution |
| External-library branch | [1](https://docs.immich.app/features/libraries/); [2](https://github.com/immich-app/immich/discussions/30820) | Synthesis of cited procedure/case; preserve stated version |
| Post-update or storage-move branch | [1](https://docs.immich.app/administration/system-integrity/); [2](https://docs.immich.app/errors/); [3](https://www.reddit.com/r/immich/comments/1qs5jqm/issue_after_updating_to_25x/) | Synthesis of cited procedure/case; preserve stated version |
| Network and reverse-proxy branch | [1](https://docs.immich.app/administration/reverse-proxy/) | Synthesis of cited procedure/case; preserve stated version |
| Format, checksum and multi-instance branches | [1](https://docs.immich.app/features/supported-formats/); [2](https://github.com/immich-app/immich/issues/23574); [3](https://github.com/immich-app/immich/issues/23574#issuecomment-3486006690) | Risk boundary / editorial caution |
| Verification and escalation | Cross-reference adjacent cited procedure and article Sources; editorial diagnostic organization | Synthesis of cited procedure/case; preserve stated version |
| FAQ | [1](https://docs.immich.app/FAQ/); [2](https://github.com/immich-app/immich/issues/26720) | Synthesis of cited procedure/case; preserve stated version |

# FAQ Provenance

- Why can the phone show a photo that the web cannot load? — https://github.com/immich-app/immich/issues/26720; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Why are there more thumbnail jobs than photos? — https://docs.immich.app/FAQ/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Why does an HDR video look pale in playback but normal after download? — https://docs.immich.app/FAQ/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.

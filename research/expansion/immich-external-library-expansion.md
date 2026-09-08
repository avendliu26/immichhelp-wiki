# Query

immich external library

# User Problem

Index existing files, understand identity/metadata limits and recover safely from mount outages.

Original dossier, source-index, research-summary and seo-competitor-audit read before expansion. Existing research lacked operational coverage; new evidence and corrections are recorded here without changing those files.

# Problem Coverage Matrix

| User situation | Identify/check | Action | Verify | Boundary |
|---|---|---|---|---|
| First import | Existing disk collection | Read-only mount, container path, owner, scan | Known original and jobs | One owner |
| Empty/partial scan | Host files visible only | Container visibility, formats, exclusions | Selected samples import | Network watcher limitations |
| Metadata edits | Read-only sidecar or move | Distinguish DB metadata/XMP/version | Inspect test sidecar and rescan | Unresolved old issue |
| Disappearing path | NAS offline or renamed folder | Restore mount before scan/cleanup | Assets available again | Deletion and identity-loss risk |



# Official Sources

- [Synology installation](https://docs.immich.app/install/synology/) — community-contribution; Community contribution hosted in Immich docs. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Compose installation](https://docs.immich.app/install/docker-compose/) — official; Official Immich release files/environment. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [External Libraries](https://docs.immich.app/features/libraries/) — official; Official Immich mounts/scans. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [FAQ](https://docs.immich.app/FAQ/) — official; Official Immich filename questions. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [External Library walkthrough](https://docs.immich.app/guides/external-library/) — official; Official Immich UI and verification steps. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [XMP Sidecars](https://docs.immich.app/features/xmp-sidecars/) — official; Official Immich field/sidecar behavior. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# GitHub Evidence

- [External mount outage, #30820](https://github.com/immich-app/immich/discussions/30820) — github-discussion; GitHub discussion; v3.1.0, unresolved recovery discrepancy. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Read-only metadata, #10538](https://github.com/immich-app/immich/issues/10538) — github-issue; GitHub issue; open historical and later unversioned reports. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Folder rename, #29724](https://github.com/immich-app/immich/issues/29724) — github-issue; GitHub issue; exact version unspecified, not a confirmed current fix. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# Community Cases

- [External scan on Proxmox/SMB](https://www.reddit.com/r/immich/comments/1unxce7/ext_library_unable_to_scan_files/) — forum-reddit; Reddit; v3.0.1 user case, final exact change unspecified. Checked 2026-09-08. Direct fetch blocked; browser/agent read used where recorded

# Confirmed Facts

- Host mount and UI container import path differ; preserve managed /data mount.
- One owner; scan and jobs; read-only blocks sidecar writes.
- Network watcher experimental/unreliable, scheduled rescan available.
- Paths/renames affect asset identity; deleted external original enters Trash, documented 30-day lifecycle.
- XMP discovery/sync and supported fields differ from DB-only organizational relationships.

Claim-to-source mappings are provided by the section ledger below and inline citations in the final article. These are documentary confirmations, not hardware test results.

# Version Differences

#10538 original v1.106.3 open, later 2026 comments unversioned; #30820 v3.1.0; Reddit SMB case v3.0.1; #29724 no exact version.

# Platform Differences

Synology host paths, Proxmox nested mounts/UIDs, TrueNAS/Unraid volume controls, macOS case-only rename report.

# Common Failure Modes

Zero scan, wrong owner, missing worker mount, exclusions/permissions, watcher inactivity, reverted metadata, offline/Trash after NAS outage.

# Confirmed Fixes

Official mount+up+exec/ls+UI scan; correct container path, periodic scan; sidecar DISCOVER/SYNC; restore original mount before scan/cleanup.

# Risky Operations

Writable mounts can delete originals; recursive permissions, SQL, volume/database reset, Trash expiry and restore replacement.

# Verification Steps

Known file visible in container, correct owner timeline, original/video, completed metadata/thumbnail jobs, scheduled new sample, controlled sidecar persistence test. Reader acceptance checks are editorial synthesis from cited procedures, explicitly not claimed as executed.

# Conflicts

General Libraries DB-only phrasing versus specific XMP writeback docs; scope to field/access and retain uncertainty. #30820 advice/rescan outcome differs; no SQL endorsement.

# Remaining Unknowns

No current read-only/writable metadata persistence test; #10538 current-version fix unconfirmed; #30820 normal recovery not universally confirmed.

# Recommended Final Article Structure

- Direct Answer
- Choose the right library and access mode
- Step 1: Prepare a small source folder and record both paths
- Step 2: Apply and verify the mount
- Step 3: Create and scan the library
- Step 4: Verify ownership, originals and indexing
- Step 5: Configure rescans for ongoing changes
- Metadata: database, XMP and read-only conflicts
- When the original path disappears
- Platform and version differences
- If this does not work
- FAQ
- Sources

# Search Waves and Stopping Decision

- Wave 1: read existing research and primary documentation/release baseline.
- Wave 2: targeted queries: `Immich external library read only XMP scans mount permissions`; `Immich 10538 latest comments 29724 folder rename`; `Immich 3.1.0 external offline 30820`; `site:reddit.com/r/immich external library Proxmox SMB 3.0.1`.
- Wave 3 / reconciliation: General Libraries DB-only phrasing versus specific XMP writeback docs; scope to field/access and retain uncertainty. #30820 advice/rescan outcome differs; no SQL endorsement.
- Stop decision: New v3.1.0 case closes prior current-evidence gap; remaining metadata/recovery disagreements cannot be resolved by repeating weaker blog advice.
- Priority was independent primary evidence; generic blogs/YouTube repetition was not added for source-count inflation.

# Claim-to-Source Ledger

| Article section | Evidence URLs | Evidence interpretation |
|---|---|---|
| Direct Answer | [1](https://docs.immich.app/features/libraries/); [2](https://docs.immich.app/features/xmp-sidecars/) | Synthesis of cited procedure/case; preserve stated version |
| Choose the right library and access mode | [1](https://docs.immich.app/features/libraries/) | Synthesis of cited procedure/case; preserve stated version |
| Step 1: Prepare a small source folder and record both paths | [1](https://docs.immich.app/features/libraries/#mount-docker-volumes) | Synthesis of cited procedure/case; preserve stated version |
| Step 2: Apply and verify the mount | [1](https://docs.immich.app/features/libraries/#troubleshooting); [2](https://docs.immich.app/install/docker-compose/) | Synthesis of cited procedure/case; preserve stated version |
| Step 3: Create and scan the library | [1](https://docs.immich.app/guides/external-library/) | Synthesis of cited procedure/case; preserve stated version |
| Step 4: Verify ownership, originals and indexing | Cross-reference adjacent cited procedure and article Sources; editorial diagnostic organization | Synthesis of cited procedure/case; preserve stated version |
| Step 5: Configure rescans for ongoing changes | [1](https://docs.immich.app/features/libraries/) | Synthesis of cited procedure/case; preserve stated version |
| Metadata: database, XMP and read-only conflicts | [1](https://docs.immich.app/features/xmp-sidecars/); [2](https://github.com/immich-app/immich/issues/10538) | Risk boundary / editorial caution |
| When the original path disappears | [1](https://docs.immich.app/features/libraries/); [2](https://github.com/immich-app/immich/discussions/30820) | Risk boundary / editorial caution |
| Platform and version differences | [1](https://docs.immich.app/features/libraries/); [2](https://docs.immich.app/install/synology/); [3](https://github.com/immich-app/immich/issues/29724); [4](https://www.reddit.com/r/immich/comments/1unxce7/ext_library_unable_to_scan_files/) | Synthesis of cited procedure/case; preserve stated version |
| If this does not work | Cross-reference adjacent cited procedure and article Sources; editorial diagnostic organization | Synthesis of cited procedure/case; preserve stated version |
| FAQ | [1](https://docs.immich.app/FAQ/); [2](https://docs.immich.app/FAQ/#can-i-add-an-external-library-while-keeping-the-existing-album-structure); [3](https://docs.immich.app/FAQ/#how-are-deletions-of-files-handled-in-external-libraries) | Synthesis of cited procedure/case; preserve stated version |

# FAQ Provenance

- Can the existing folders automatically become albums? — https://docs.immich.app/FAQ/#can-i-add-an-external-library-while-keeping-the-existing-album-structure; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Why do deleted items reappear with a read-only mount? — https://docs.immich.app/FAQ/#how-are-deletions-of-files-handled-in-external-libraries; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Does the upload checksum check deduplicate an external collection? — https://docs.immich.app/FAQ/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.

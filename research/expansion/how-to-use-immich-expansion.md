# Query

how to use immich

# User Problem

Go from account access through tested uploads, organization, sharing and independent recovery.

Original dossier, source-index, research-summary and seo-competitor-audit read before expansion. Existing research lacked operational coverage; new evidence and corrections are recorded here without changing those files.

# Problem Coverage Matrix

| User situation | Identify/check | Action | Verify | Boundary |
|---|---|---|---|---|
| First login | New server versus existing account | Admin then users, server URL | Browser and mobile access | Version compatibility |
| Mobile upload | Selected albums, Wi-Fi, background | Configure small album then backup | Open original from web | iOS scheduling vs Android restrictions |
| Organization | Uploaded files ready | Albums, search, faces, sharing | Find asset, recipient access | Jobs and permissions |
| Storage and maintenance | Phone backed up only | External versus upload, independent backup | Recovery sample | Do not delete only copy |



# Official Sources

- [Post-installation](https://docs.immich.app/install/post-install/) — official; Official Immich account setup. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Mobile Backup](https://docs.immich.app/features/mobile-backup/) — official; Official Immich phone behavior. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [External Libraries](https://docs.immich.app/features/libraries/) — official; Official Immich mounts/scans. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Backup and Restore](https://docs.immich.app/administration/backup-and-restore/) — official; Official Immich recovery prerequisites. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [FAQ](https://docs.immich.app/FAQ/) — official; Official Immich filename questions. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Jobs and Workers](https://docs.immich.app/administration/jobs-workers/) — official; Official Immich processing model. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Mobile App](https://docs.immich.app/features/mobile-app/) — official; Official Immich album sync, local uploads and iCloud deletion behavior. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [v3.0.0 release](https://immich.app/blog/v3.0.0-release) — official; Official release notes; current mobile changes and Recently Added. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Searching](https://docs.immich.app/features/searching/) — official; Official search workflow. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Facial Recognition](https://docs.immich.app/features/facial-recognition/) — official; Official people workflow. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Sharing](https://docs.immich.app/features/sharing/) — official; Official sharing scope and roles. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# GitHub Evidence

- [iOS background request, #27250](https://github.com/immich-app/immich/discussions/27250) — github-discussion; GitHub discussion; unresolved behavior report. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Android background report, #24110](https://github.com/immich-app/immich/issues/24110) — github-issue; GitHub issue; historical v2.3.1 case, closed as duplicate. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# Community Cases

No distinct source in this class used; GitHub community evidence is classified separately, not double-counted.

# Confirmed Facts

- First registered user admin; family accounts separate; same reachable server endpoint on mobile.
- Select/exclude albums, Wi-Fi default, content checksum, foreground test first.
- iOS scheduler controls timing; Android restrictions matter; iCloud originals require temporary download space.
- v3 Recently Added and revised mobile scheduling; Album Sync one-way/same-name shared album risk.
- Search/face processing is distinct from stored originals; partner sharing is entire library; dump excludes media.

Claim-to-source mappings are provided by the section ledger below and inline citations in the final article. These are documentary confirmations, not hardware test results.

# Version Differences

v3 mobile improvements do not promise immediate background backup; #24110 explicitly Android14/v2.3.1; #27250 placeholders not real tested versions.

# Platform Differences

Android battery/charging/delay versus iOS Background App Refresh; LAN/VPN/remote endpoint; web/manual upload and external NAS distinction.

# Common Failure Modes

Login vs network vs client compatibility; local-only photos vs server; skipped/excluded album; pending processing; shared link unreachable.

# Confirmed Fixes

Small foreground upload and independent web check; actual OS backup settings; queue review; correct share permissions; backup both layers.

# Risky Operations

Free Up Space with iCloud deletes across devices; same-name album sharing; storage migration/permissions; losing only original.

# Verification Steps

Web original download/video, recently added, filename then semantic search, people after jobs, signed-out share test, recoverable DB/media copy. Reader acceptance checks are editorial synthesis from cited procedures, explicitly not claimed as executed.

# Conflicts

FAQ version wording versus dedicated upgrade policy; old iOS issue examples are not facts. Avoid timezone template claim due old/new document discrepancy outside task.

# Remaining Unknowns

No real Android/iOS background timing tests; vendor-specific behavior and #27250 unresolved. Exact long-term sync reliability not promised.

# Recommended Final Article Structure

- Direct Answer
- Step 1: Log in and establish the account
- Step 2: Back up a small phone album
- Step 3: Verify the server has the files
- Step 4: Configure background backup for your platform
- Step 5: Upload from the web and choose a storage model
- Step 6: Organize, search and identify people
- Step 7: Share deliberately and verify the recipient's view
- Step 8: Perform the first server maintenance tasks
- If this does not work
- FAQ
- Sources

# Search Waves and Stopping Decision

- Wave 1: read existing research and primary documentation/release baseline.
- Wave 2: targeted queries: `Immich post install mobile backup search sharing people`; `Immich v3 Android scheduler iOS parallel backup release`; `Immich 24110 background Android 27250 iOS`; `Immich Album Sync iCloud Free Up Space FAQ`.
- Wave 3 / reconciliation: FAQ version wording versus dedicated upgrade policy; old iOS issue examples are not facts. Avoid timezone template claim due old/new document discrepancy outside task.
- Stop decision: Two rounds fill all onboarding feature and platform branches; remaining timing is OS/device-dependent, not supportable as guarantee.
- Priority was independent primary evidence; generic blogs/YouTube repetition was not added for source-count inflation.

# Claim-to-Source Ledger

| Article section | Evidence URLs | Evidence interpretation |
|---|---|---|
| Direct Answer | [1](https://docs.immich.app/install/post-install/) | Synthesis of cited procedure/case; preserve stated version |
| Step 1: Log in and establish the account | [1](https://docs.immich.app/install/post-install/) | Synthesis of cited procedure/case; preserve stated version |
| Step 2: Back up a small phone album | [1](https://docs.immich.app/features/mobile-app/); [2](https://docs.immich.app/features/mobile-backup/) | Synthesis of cited procedure/case; preserve stated version |
| Step 3: Verify the server has the files | [1](https://docs.immich.app/administration/jobs-workers/); [2](https://immich.app/blog/v3.0.0-release) | Synthesis of cited procedure/case; preserve stated version |
| Step 4: Configure background backup for your platform | [1](https://docs.immich.app/features/mobile-backup/); [2](https://github.com/immich-app/immich/discussions/27250); [3](https://github.com/immich-app/immich/issues/24110); [4](https://immich.app/blog/v3.0.0-release) | Synthesis of cited procedure/case; preserve stated version |
| Step 5: Upload from the web and choose a storage model | [1](https://docs.immich.app/features/libraries/); [2](https://docs.immich.app/install/post-install/) | Risk boundary / editorial caution |
| Step 6: Organize, search and identify people | [1](https://docs.immich.app/features/facial-recognition/); [2](https://docs.immich.app/features/mobile-app/); [3](https://docs.immich.app/features/searching/) | Synthesis of cited procedure/case; preserve stated version |
| Step 7: Share deliberately and verify the recipient's view | [1](https://docs.immich.app/features/sharing/) | Synthesis of cited procedure/case; preserve stated version |
| Step 8: Perform the first server maintenance tasks | [1](https://docs.immich.app/administration/backup-and-restore/) | Risk boundary / editorial caution |
| If this does not work | Cross-reference adjacent cited procedure and article Sources; editorial diagnostic organization | Synthesis of cited procedure/case; preserve stated version |
| FAQ | [1](https://docs.immich.app/FAQ/#how-can-i-hide-a-photo-or-video-from-the-timeline); [2](https://docs.immich.app/FAQ/#what-happens-if-an-asset-exists-in-more-than-one-account); [3](https://docs.immich.app/FAQ/#why-do-files-from-whatsapp-not-appear-with-the-correct-date) | Synthesis of cited procedure/case; preserve stated version |

# FAQ Provenance

- Why do WhatsApp photos have the wrong date? — https://docs.immich.app/FAQ/#why-do-files-from-whatsapp-not-appear-with-the-correct-date; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Are identical uploads deduplicated across family accounts? — https://docs.immich.app/FAQ/#what-happens-if-an-asset-exists-in-more-than-one-account; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Does Archive make a photo secret? — https://docs.immich.app/FAQ/#how-can-i-hide-a-photo-or-video-from-the-timeline; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.

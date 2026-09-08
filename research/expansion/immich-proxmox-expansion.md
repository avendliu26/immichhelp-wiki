# Query

immich proxmox

# User Problem

Deploy with clear VM/LXC support, storage, UID, acceleration and backup boundaries.

Original dossier, source-index, research-summary and seo-competitor-audit read before expansion. Existing research lacked operational coverage; new evidence and corrections are recorded here without changing those files.

# Problem Coverage Matrix

| User situation | Identify/check | Action | Verify | Boundary |
|---|---|---|---|---|
| VM or LXC | New deployment or existing helper | Prefer full VM with Compose | Guest CPU, services, sample upload | LXC community boundary |
| NAS path/permissions | Host sees files guest does not | Trace host to guest to container | Same test file at each layer | Unprivileged UID mapping |
| GPU | Acceleration requested | Separate hypervisor passthrough and Immich backend | Verify real job on device | Hardware-specific |
| Backup and upgrade | Guest snapshot mistaken for full backup | Include external mount and DB dump | Restore all layers | Bind mounts excluded from LXC backup |



# Official Sources

- [Requirements](https://docs.immich.app/install/requirements/) — official; Official Immich platform limits. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Compose installation](https://docs.immich.app/install/docker-compose/) — official; Official Immich release files/environment. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Post-installation](https://docs.immich.app/install/post-install/) — official; Official Immich account setup. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [External Libraries](https://docs.immich.app/features/libraries/) — official; Official Immich mounts/scans. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Virtual Machines](https://pve.proxmox.com/pve-docs/chapter-qm.html) — official; Official Proxmox CPU, VM and passthrough documentation. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Containers](https://pve.proxmox.com/pve-docs/chapter-pct.html) — official; Official Proxmox mount and backup scope. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Unprivileged LXC](https://pve.proxmox.com/wiki/Unprivileged_LXC_containers) — official; Official Proxmox UID mapping documentation. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Hardware Transcoding](https://docs.immich.app/features/hardware-transcoding/) — official; Official Immich video acceleration. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [ML Hardware Acceleration](https://docs.immich.app/features/ml-hardware-acceleration/) — official; Official Immich ML backend guide. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Docker ps](https://docs.docker.com/reference/cli/docker/compose/ps/) — official; Official Docker reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Docker logs](https://docs.docker.com/reference/cli/docker/compose/logs/) — official; Official Docker reference. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# GitHub Evidence

- [LXC migration question, #29317](https://github.com/immich-app/immich/discussions/29317) — github-discussion; GitHub discussion with maintainer support clarification. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [Upgrade restart loop, #29626](https://github.com/immich-app/immich/discussions/29626) — github-discussion; GitHub historical v3.0.1 community case. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# Community Cases

- [Unprivileged write-access case](https://forum.proxmox.com/threads/issues-with-giving-an-unprivileged-lxc-write-access-to-storage-on-the-host.184141/) — forum-reddit; Proxmox forum; user-confirmed ACL case. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research
- [NFS bind-mount access](https://forum.proxmox.com/threads/access-via-nfs-bindmount-in-an-unprivileged-lxc.165001/) — forum-reddit; Proxmox forum; unresolved read-only scenario. Checked 2026-09-08. HTTP body fetched; evidence reviewed in research

# Confirmed Facts

- Immich recommends Compose and full VM; Docker-in-LXC is advanced/not recommended.
- Proxmox kvm64 is x86-64-v1; CPU must expose v2 for Immich v3 ML.
- LXC bind mounts excluded from vzdump; backup flag concerns storage-backed volumes.
- Unprivileged IDs map; actual service identity matters.
- GPU passthrough requires suitable host configuration; video and ML acceleration are separate.

Claim-to-source mappings are provided by the section ledger below and inline citations in the final article. These are documentary confirmations, not hardware test results.

# Version Differences

Current requirements v3; #29626 is historical v2.7.5→v3.0.1 memory observation. No pinned model support implied.

# Platform Differences

VM guest kernel versus Docker-in-LXC versus helper-native services; local PostgreSQL vs NAS originals; privileged/unprivileged mapping.

# Common Failure Modes

Guest cannot see NAS, container path missing, EACCES, v3 CPU failure, upgrade restart, GPU device absent at different layers.

# Confirmed Fixes

VM baseline, verify host→guest→container, dedicated directory ACL matched to actual mapped identity, correct backend-specific acceleration steps.

# Risky Operations

Privileged switch, recursive ownership/ACL or pool-level ACL modification; guest/database restore; missing bind mounts in backup.

# Verification Steps

Guest CPU/resources/IP; four services; original upload/download/video; external sample; actual acceleration job; recovery includes mount contents. Reader acceptance checks are editorial synthesis from cited procedures, explicitly not claimed as executed.

# Conflicts

Maintainer recommending Docker does not mean endorsing Docker-in-LXC. Forum ACL result uses environment-specific UID; NFS forum remains unresolved.

# Remaining Unknowns

No hardware installation/GPU test; arbitrary UID map/ACL and passthrough groups require actual host checks. No verified helper-to-Compose migration recipe.

# Recommended Final Article Structure

- Direct Answer
- Choose VM, Docker-in-LXC or native LXC
- Step 1: Create the Linux VM
- Step 2: Plan the storage layers
- Step 3: Install Docker and Immich inside the guest
- Step 4: Verify the complete path
- Advanced branch: LXC storage and permissions
- Advanced branch: GPU and hardware acceleration
- Backup and upgrade
- If this does not work
- FAQ
- Sources

# Search Waves and Stopping Decision

- Wave 1: read existing research and primary documentation/release baseline.
- Wave 2: targeted queries: `Proxmox Immich VM LXC requirements GPU backup UID`; `site:forum.proxmox.com Immich unprivileged write access storage 184141`; `site:forum.proxmox.com NFS bindmount unprivileged 165001`.
- Wave 3 / reconciliation: Maintainer recommending Docker does not mean endorsing Docker-in-LXC. Forum ACL result uses environment-specific UID; NFS forum remains unresolved.
- Stop decision: Three rounds resolved VM/CPU, backup exclusion and mapped permissions; remaining device-specific commands cannot responsibly generalize.
- Priority was independent primary evidence; generic blogs/YouTube repetition was not added for source-count inflation.

# Claim-to-Source Ledger

| Article section | Evidence URLs | Evidence interpretation |
|---|---|---|
| Direct Answer | [1](https://docs.immich.app/install/requirements/); [2](https://pve.proxmox.com/pve-docs/chapter-pct.html) | Synthesis of cited procedure/case; preserve stated version |
| Choose VM, Docker-in-LXC or native LXC | [1](https://github.com/immich-app/immich/discussions/29317) | Synthesis of cited procedure/case; preserve stated version |
| Step 1: Create the Linux VM | [1](https://docs.immich.app/install/requirements/); [2](https://pve.proxmox.com/pve-docs/chapter-qm.html) | Synthesis of cited procedure/case; preserve stated version |
| Step 2: Plan the storage layers | [1](https://docs.immich.app/features/libraries/) | Synthesis of cited procedure/case; preserve stated version |
| Step 3: Install Docker and Immich inside the guest | [1](https://docs.immich.app/install/docker-compose/) | Synthesis of cited procedure/case; preserve stated version |
| Step 4: Verify the complete path | [1](https://docs.docker.com/reference/cli/docker/compose/logs/); [2](https://docs.docker.com/reference/cli/docker/compose/ps/); [3](https://docs.immich.app/install/post-install/) | Synthesis of cited procedure/case; preserve stated version |
| Advanced branch: LXC storage and permissions | [1](https://forum.proxmox.com/threads/access-via-nfs-bindmount-in-an-unprivileged-lxc.165001/); [2](https://forum.proxmox.com/threads/issues-with-giving-an-unprivileged-lxc-write-access-to-storage-on-the-host.184141/); [3](https://pve.proxmox.com/wiki/Unprivileged_LXC_containers) | Risk boundary / editorial caution |
| Advanced branch: GPU and hardware acceleration | [1](https://docs.immich.app/features/hardware-transcoding/); [2](https://docs.immich.app/features/ml-hardware-acceleration/); [3](https://pve.proxmox.com/pve-docs/chapter-qm.html) | Synthesis of cited procedure/case; preserve stated version |
| Backup and upgrade | [1](https://pve.proxmox.com/pve-docs/chapter-pct.html) | Risk boundary / editorial caution |
| If this does not work | [1](https://github.com/immich-app/immich/discussions/29626) | Synthesis of cited procedure/case; preserve stated version |
| FAQ | [1](https://forum.proxmox.com/threads/issues-with-giving-an-unprivileged-lxc-write-access-to-storage-on-the-host.184141/); [2](https://github.com/immich-app/immich/discussions/29317); [3](https://pve.proxmox.com/pve-docs/chapter-pct.html) | Synthesis of cited procedure/case; preserve stated version |

# FAQ Provenance

- Should a working Docker-in-LXC installation move to a helper script? — https://github.com/immich-app/immich/discussions/29317; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Can I make the LXC backup flag include an arbitrary bind mount? — https://pve.proxmox.com/pve-docs/chapter-pct.html; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.
- Why does adding my host account to a group not fix the app? — https://forum.proxmox.com/threads/issues-with-giving-an-unprivileged-lxc-write-access-to-storage-on-the-host.184141/; question paraphrased from the cited official FAQ / documented user question; answer scoped to cited evidence.

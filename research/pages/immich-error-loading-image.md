# Keyword

主关键词：immich error loading image

# Search Intent

用户遇到缩略图或原图无法显示，需要区分文件缺失、缩略图任务失败、数据库/挂载不一致、代理或版本回归。

# Source Summary

## Official Sources

1. https://docs.immich.app/administration/system-integrity/ — System Integrity；official-docs；2026-07-27；说明 missing files、checksum mismatch、untracked files 和检查任务。
2. https://docs.immich.app/administration/jobs-workers/ — Jobs and Workers；official-docs；2026-07-27；说明缩略图由后台 job 处理。

## GitHub Issues / Discussions

1. https://github.com/immich-app/immich/issues/26720 — #26720；2026-03-05；Debian 13.3/Raspberry；v2.5.6；数据库有 asset 但上传文件缺失；后续写入同步改动已合并；closed/fixed，旧记录未自动修复。
2. https://github.com/immich-app/immich/discussions/10570 — #10570；2024-06-23；Debian/Docker；v1.106.4；用户报告刷新缩略图后改善；unanswered。
3. https://github.com/immich-app/immich/issues/23574 — #23574；2025-11-03；Ubuntu/Docker/iOS；v2.2.1；记录 ENOENT；closed，个案。

## Community Sources

- https://github.com/immich-app/immich/discussions/10570；GitHub；Unraid/NFS/Cloudflare；用户怀疑 locking/代理；未形成当前版结论。

# Verified Facts

- Fact: 完整性检查区分 untracked、missing 和 checksum mismatch。 Source: System Integrity。 Scope: storage。 Version: current。 Confidence: high
- Fact: 缩略图生成是后台 job。 Source: Jobs and Workers。 Scope: all deployments。 Version: current。 Confidence: high
- Fact: #26720 中数据库记录存在但原文件缺失。 Source: Issue #26720。 Scope: Debian 13.3/Raspberry v2.5.6。 Version: v2.5.6。 Confidence: high
- Fact: #26720 维护者说明写入同步改动已合并。 Source: Issue #26720 comments。 Scope: future release。 Version: post-v2.5.6。 Confidence: medium
- Fact: #23574 报告 ENOENT 缩略图路径。 Source: Issue #23574。 Scope: Ubuntu/Docker v2.2.1。 Version: v2.2.1。 Confidence: high
- Fact: #10570 用户称 Refresh Thumbnails 后可显示。 Source: Discussion #10570。 Scope: v1.106.4。 Version: v1.106.4。 Confidence: medium

# Real User Scenarios

- Environment: Debian 13.3/Raspberry v2.5.6；Symptom: DB 有 asset，磁盘没有上传文件；Likely cause: missing file；Confirmed fix: 后续写入同步改动，已有记录仍需人工处理；Source: #26720；Version: v2.5.6；Confidence: high
- Environment: Ubuntu/Docker v2.2.1；Symptom: ENOENT thumbs；Likely cause: 缩略图路径或挂载问题；Confirmed fix: 未提供；Source: #23574；Version: v2.2.1；Confidence: medium
- Environment: Unraid/NFS/Cloudflare v1.114；Symptom: 快速滚动时错误图；Likely cause: unconfirmed；Confirmed fix: unconfirmed；Source: #10570；Version: v1.114；Confidence: low

# Version Notes

当前稳定 v3.1.0；RC v3.2.0-rc.3。v1/v2 案例不可直接套用。

# Risky Operations

- Command / action: docker compose down -v / 删除 DB_DATA_LOCATION；Risk: 删除数据库卷；Why risky: 官方恢复命令标注 CAUTION；Source: backup docs；Preconditions: 可验证 DB 与文件备份；Safer alternative: 维护页恢复并保留 restore point；Backup required: yes

# Conflicts

Source A says: 可运行缩略图/完整性任务。 Source B says: 个案中重建无效或数据库错误。 Reason: version/platform/storage differences；未解决。

# Recommended Article Structure

H1；Direct Answer；What the Error Means；Integrity Report；Original/Thumbnail Paths；Version Cases；Safe Diagnostics；Sources

ready-for-writing: true
missing: []

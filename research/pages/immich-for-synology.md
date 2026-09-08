# Keyword

主关键词：immich for synology

# Search Intent

用户需要围绕“immich for synology”获得可核验信息。

# Source Summary

## Official Sources

1. https://docs.immich.app/install/synology/ — Synology install；official-docs；最后检查 2026-09-08；提供当前文档事实。
2. https://docs.immich.app/install/docker-compose/ — Docker Compose；official-docs；最后检查 2026-09-08；提供部署基线。

## GitHub Issues / Discussions

1. https://github.com/immich-app/immich/discussions/28987 — 真实记录；涉及版本/环境：v2；状态和确认程度见来源；不把用户建议当官方修复。

## Community Sources

- https://github.com/immich-app/immich/discussions/28987；GitHub/相关社区；场景：DSM 7.2.2 ML connection failure; no confirmed fix；仅作补充证据。

# Verified Facts

- Fact: Synology page is community contribution。 Source: Synology install；scope: immich for synology；Version: v2；Confidence: high
- Fact: Container Manager。 Source: Synology install；scope: immich for synology；Version: v2；Confidence: high
- Fact: firewall port 2283。 Source: Synology install；scope: immich for synology；Version: v2；Confidence: high
- Fact: fixed subnet can stabilize firewall。 Source: Synology install；scope: immich for synology；Version: v2；Confidence: high
- Fact: check releases before upgrade。 Source: Synology install；scope: immich for synology；Version: v2；Confidence: medium
- Fact: DB_STORAGE_TYPE HDD option。 Source: Synology install；scope: immich for synology；Version: v2；Confidence: medium

# Real User Scenarios

- Environment: v2；Symptom: DSM 7.2.2 ML connection failure; no confirmed fix；Likely cause: 需按来源核对；Confirmed fix: 未提供或仅个案；Source: https://github.com/immich-app/immich/discussions/28987；Version: v2；Confidence: medium
- Environment: Docker Compose；Symptom: 用户按旧教程操作；Likely cause: version difference；Confirmed fix: 以当前官方文档和 release notes 为准；Source: https://docs.immich.app/install/synology/；Version: current；Confidence: high

# Version Notes

当前稳定版 v3.1.0；prerelease v3.2.0-rc.3。v2 资料可能受版本变化影响。

# Risky Operations

- Command / action: 数据库恢复、删除卷、迁移或权限递归修改；Risk: 数据丢失或路径变化；Why risky: 官方文档含 warning/caution；Source: https://docs.immich.app/administration/backup-and-restore/；Preconditions: 完整备份并验证；Safer alternative: 维护页/小范围测试；Backup required: yes

# Conflicts

Source A: 官方文档给出当前流程。 Source B: 社区记录可能是旧版本或平台特例。 Reason: version/platform difference；保留冲突。

# Recommended Article Structure

H1；Direct Answer；适用版本；官方流程；真实场景；平台差异；风险操作；FAQ；Sources

ready-for-writing: false
missing: - 当前版本的高相关社区或 GitHub 记录\n- comparison 需补充同版本功能证据

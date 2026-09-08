# Keyword

主关键词：immich proxmox

# Search Intent

用户需要围绕“immich proxmox”获得可核验信息。

# Source Summary

## Official Sources

1. https://docs.immich.app/install/requirements/ — Requirements；official-docs；最后检查 2026-09-08；提供当前文档事实。
2. https://docs.immich.app/install/docker-compose/ — Docker Compose；official-docs；最后检查 2026-09-08；提供部署基线。

## GitHub Issues / Discussions

1. https://github.com/immich-app/immich/discussions/29317 — 真实记录；涉及版本/环境：2026；状态和确认程度见来源；不把用户建议当官方修复。

## Community Sources

- https://github.com/immich-app/immich/discussions/29317；GitHub/相关社区；场景：Proxmox LXC migration question; maintainer says Docker compose remains only supported；仅作补充证据。

# Verified Facts

- Fact: Full VM supported。 Source: Requirements；scope: immich proxmox；Version: 2026；Confidence: high
- Fact: Docker in LXC not recommended。 Source: Requirements；scope: immich proxmox；Version: 2026；Confidence: high
- Fact: current compose only supported method。 Source: Requirements；scope: immich proxmox；Version: 2026；Confidence: high
- Fact: v3 amd64 needs x86-64-v2。 Source: Requirements；scope: immich proxmox；Version: 2026；Confidence: high
- Fact: DB should be local SSD。 Source: Requirements；scope: immich proxmox；Version: 2026；Confidence: medium
- Fact: 6GB RAM minimum。 Source: Requirements；scope: immich proxmox；Version: 2026；Confidence: medium

# Real User Scenarios

- Environment: 2026；Symptom: Proxmox LXC migration question; maintainer says Docker compose remains only supported；Likely cause: 需按来源核对；Confirmed fix: 未提供或仅个案；Source: https://github.com/immich-app/immich/discussions/29317；Version: 2026；Confidence: medium
- Environment: Docker Compose；Symptom: 用户按旧教程操作；Likely cause: version difference；Confirmed fix: 以当前官方文档和 release notes 为准；Source: https://docs.immich.app/install/requirements/；Version: current；Confidence: high

# Version Notes

当前稳定版 v3.1.0；prerelease v3.2.0-rc.3。2026 资料可能受版本变化影响。

# Risky Operations

- Command / action: 数据库恢复、删除卷、迁移或权限递归修改；Risk: 数据丢失或路径变化；Why risky: 官方文档含 warning/caution；Source: https://docs.immich.app/administration/backup-and-restore/；Preconditions: 完整备份并验证；Safer alternative: 维护页/小范围测试；Backup required: yes

# Conflicts

Source A: 官方文档给出当前流程。 Source B: 社区记录可能是旧版本或平台特例。 Reason: version/platform difference；保留冲突。

# Recommended Article Structure

H1；Direct Answer；适用版本；官方流程；真实场景；平台差异；风险操作；FAQ；Sources

ready-for-writing: true
missing: []

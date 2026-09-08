# Keyword

主关键词：immich setup

# Search Intent

用户需要围绕“immich setup”获得可核验信息。

# Source Summary

## Official Sources

1. https://docs.immich.app/install/post-install/ — Post installation；official-docs；最后检查 2026-09-08；提供当前文档事实。
2. https://docs.immich.app/install/docker-compose/ — Docker Compose；official-docs；最后检查 2026-09-08；提供部署基线。

## GitHub Issues / Discussions

1. https://github.com/immich-app/immich/discussions/8843 — 真实记录；涉及版本/环境：current；状态和确认程度见来源；不把用户建议当官方修复。

## Community Sources

- https://github.com/immich-app/immich/discussions/8843；GitHub/相关社区；场景：Unraid user asked about bundled services; maintainer confirms compose includes them；仅作补充证据。

# Verified Facts

- Fact: First user admin。 Source: Post installation；scope: immich setup；Version: current；Confidence: high
- Fact: storage template optional。 Source: Post installation；scope: immich setup；Version: current；Confidence: high
- Fact: mobile app backup。 Source: Post installation；scope: immich setup；Version: current；Confidence: high
- Fact: server backup required。 Source: Post installation；scope: immich setup；Version: current；Confidence: high
- Fact: 3-2-1 recommended。 Source: Post installation；scope: immich setup；Version: current；Confidence: medium
- Fact: external libraries optional。 Source: Post installation；scope: immich setup；Version: current；Confidence: medium

# Real User Scenarios

- Environment: current；Symptom: Unraid user asked about bundled services; maintainer confirms compose includes them；Likely cause: 需按来源核对；Confirmed fix: 未提供或仅个案；Source: https://github.com/immich-app/immich/discussions/8843；Version: current；Confidence: medium
- Environment: Docker Compose；Symptom: 用户按旧教程操作；Likely cause: version difference；Confirmed fix: 以当前官方文档和 release notes 为准；Source: https://docs.immich.app/install/post-install/；Version: current；Confidence: high

# Version Notes

当前稳定版 v3.1.0；prerelease v3.2.0-rc.3。current 资料可能受版本变化影响。

# Risky Operations

- Command / action: 数据库恢复、删除卷、迁移或权限递归修改；Risk: 数据丢失或路径变化；Why risky: 官方文档含 warning/caution；Source: https://docs.immich.app/administration/backup-and-restore/；Preconditions: 完整备份并验证；Safer alternative: 维护页/小范围测试；Backup required: yes

# Conflicts

Source A: 官方文档给出当前流程。 Source B: 社区记录可能是旧版本或平台特例。 Reason: version/platform difference；保留冲突。

# Recommended Article Structure

H1；Direct Answer；适用版本；官方流程；真实场景；平台差异；风险操作；FAQ；Sources

ready-for-writing: true
missing: []

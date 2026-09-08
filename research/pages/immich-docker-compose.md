# Keyword

主关键词：immich docker compose

# Search Intent

用户想用官方 Docker Compose 部署，并解决 Docker 版本、环境变量、数据库存储和启动错误。

# Source Summary

## Official Sources

1. https://docs.immich.app/install/docker-compose/ — Docker Compose [Recommended]；official-docs；2026-07-27；下载 compose/.env、启动命令、Docker 要求。
2. https://docs.immich.app/install/requirements/ — Requirements；official-docs；2026-07-27；RAM、filesystem、DB 不可用 network share、LXC 不推荐。

## GitHub Issues / Discussions

1. https://github.com/immich-app/immich/discussions/8843 — #8843；2024-04-16；Unraid；确认 Postgres/Redis 已包含；closed/answered。
2. https://github.com/immich-app/immich/issues/10825 — #10825；2024-07-03；Unraid 6.12.8；v1.106.4；Postgres chown 循环重启；closed/completed。
3. https://github.com/immich-app/immich/discussions/29317 — #29317；2026-06-25；Proxmox LXC；维护者确认 Docker compose 仍唯一推荐/支持。

## Community Sources

- https://github.com/immich-app/immich/discussions/29317；GitHub；Proxmox LXC；迁移询问；维护者回答可核验。

# Verified Facts

- Fact: Docker Compose 是生产推荐方法。 Source: Docker Compose docs。 Scope: production。 Version: current。 Confidence: high
- Fact: 命令为 docker compose，docker-compose 已弃用。 Source: Requirements。 Scope: Docker。 Version: current。 Confidence: high
- Fact: DB_DATA_LOCATION 不应放 network share。 Source: Requirements。 Scope: Postgres。 Version: current。 Confidence: high
- Fact: LXC 中 Docker 不推荐，问题时建议完整 VM。 Source: Requirements。 Scope: Proxmox/LXC。 Version: current。 Confidence: high
- Fact: official compose 包含 Redis 与 Postgres。 Source: stable compose/#8843。 Scope: official compose。 Version: v3.1.0。 Confidence: high
- Fact: v3 amd64 ML 需要 x86-64-v2。 Source: Requirements。 Scope: amd64。 Version: v3+。 Confidence: high

# Real User Scenarios

- Environment: Ubuntu 22.04 distro Docker；Symptom: flag/permission errors；Likely cause: wrong Docker package/version；Confirmed fix: 按官方 Docker Engine install；Source: compose docs；Version: current；Confidence: high
- Environment: Proxmox LXC；Symptom: 想迁移 dedicated LXC；Likely cause: unsupported deployment choice；Confirmed fix: 无迁移指南；Source: #29317；Version: 2026；Confidence: high

# Version Notes

稳定 v3.1.0；RC v3.2.0-rc.3。v1.106.4 issue 不代表 v3。

# Risky Operations

- Command / action: docker compose down -v；Risk: 删除卷；Why risky: 官方恢复示例明确从头开始；Source: backup docs；Preconditions: DB/files backup；Safer alternative: stop/up；Backup required: yes

# Conflicts

Source A: community Unraid template may require external Postgres/Redis。 Source B: official compose includes both。 Reason: deployment method difference。

# Recommended Article Structure

H1；Prerequisites；Current Files；.env；Start；Database Storage；Proxmox/LXC；Unraid；Upgrade；Sources

ready-for-writing: true
missing: []

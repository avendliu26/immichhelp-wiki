# Keyword

主关键词：how to use immich

# Search Intent

新用户需要完成首次注册、手机备份、导入、账户和服务器备份，并知道哪些数据由数据库保存。

# Source Summary

## Official Sources

1. https://docs.immich.app/install/post-install/ — Post installation steps；official-docs；2026-07-27；注册 admin、存储模板、移动端备份、3-2-1。
2. https://docs.immich.app/features/mobile-backup/ — Mobile Backup；official-docs；2026-07-27；相册选择、checksum 去重、Wi‑Fi、iOS/Android 限制。

## GitHub Issues / Discussions

1. https://github.com/immich-app/immich/discussions/27250 — #27250；2026-03-25；iPhone/iOS；后台上传停止；feature request，open/duplicate comment。
2. https://github.com/immich-app/immich/discussions/8843 — #8843；2024-04-16；Unraid；维护者确认 official compose 已包含 Postgres/Redis；closed/answered。

## Community Sources

- https://github.com/immich-app/immich/discussions/27250；GitHub；iOS；用户反馈重开 app 后恢复；非官方承诺。

# Verified Facts

- Fact: 首个注册用户是 admin。 Source: Post-install。 Scope: fresh install。 Version: current。 Confidence: high
- Fact: 手机备份可选择及排除相册。 Source: Mobile Backup。 Scope: mobile。 Version: current。 Confidence: high
- Fact: 手机端用内容 checksum 跳过已有文件。 Source: Mobile Backup。 Scope: dedup。 Version: current。 Confidence: high
- Fact: 默认仅 Wi‑Fi 上传。 Source: Mobile Backup。 Scope: mobile。 Version: current。 Confidence: high
- Fact: iOS 后台任务由系统决定时机。 Source: Mobile Backup。 Scope: iOS。 Version: current。 Confidence: high
- Fact: official compose 已包含 Postgres 和 Redis。 Source: #8843 maintainer answer。 Scope: Unraid compose。 Version: 2024 context。 Confidence: high

# Real User Scenarios

- Environment: 新 Docker 安装；Symptom: 不知道首个账户权限；Likely cause: onboarding misunderstanding；Confirmed fix: 首个注册用户成为 admin；Source: post-install；Version: current；Confidence: high
- Environment: iOS app 后台；Symptom: app 关闭后停止上传；Likely cause: iOS background execution limitation；Confirmed fix: 开启 Background App Refresh 并按需重开；Source: mobile backup/#27250；Version: current/2026；Confidence: medium

# Version Notes

当前稳定 v3.1.0；RC v3.2.0-rc.3。升级需遵循服务器/移动端主版本兼容说明。

# Risky Operations

- Command / action: 修改存储模板并运行 Migration job；Risk: 文件移动/路径变化；Why risky: 可能产生 untracked/missing；Source: post-install；Preconditions: 完整备份；Safer alternative: 小规模测试；Backup required: yes

# Conflicts

Source A says: compose 自带 Postgres/Redis。 Source B: 部分 Unraid community template 要先建容器。 Reason: deployment method difference。

# Recommended Article Structure

H1；First Login；Mobile Backup；Albums/Dedup；Server Backup；iOS/Android Limits；Storage Template；Sources

ready-for-writing: true
missing: []

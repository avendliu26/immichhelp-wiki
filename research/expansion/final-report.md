# 已发布内页深度重写：最终报告

日期：2026-09-08。项目：/Users/bulinlin/Desktop/刘志强/软件网站/01-immichhelp.wiki。本轮为本地内容与研究交付，未部署、提交或推送。

## 1–5. 实际范围、字数、问题覆盖和新增来源

仅重写既有 8 个 published 内页。没有新建第 9 个 SEO 页面，没有发布 review/insufficient-research 内容。frontmatter（含关键词和状态）、content/index.json、导航、UI、品牌和 sitemap 代码保持原样。

字数以同一脚本分别读取 HEAD 和最终正文：包含可见标题、表格、代码 token、FAQ、Sources 标签，排除 frontmatter、URL/链接目标及 Markdown 标记；不是衡量完成度的目标。来源按每页 Sources 的规范化 URL 去重，去除锚点及末尾斜线。“新增”相对该页旧正文，不等于所有来源首次出现于整站。

| 页面 | 原字数 | 新字数 | 来源 原→新 | 本页新增 | 新覆盖 |
|---|---:|---:|---:|---:|---|
| [immich-backup](/Users/bulinlin/Desktop/刘志强/软件网站/01-immichhelp.wiki/content/backup/immich-backup.mdx) | 321 | 2092 | 3→12 | 9 | 完整备份组成、停写/在线顺序、SQL 导出、新旧实例恢复、版本兼容、恢复点和完整性验收 |
| [immich-docker-compose](/Users/bulinlin/Desktop/刘志强/软件网站/01-immichhelp.wiki/content/setup/immich-docker-compose.mdx) | 242 | 1787 | 4→16 | 12 | 环境要求、release 文件、.env/双路径、四服务、Windows 数据库例外、首个 admin/手机与启动故障 |
| [how-to-update-immich](/Users/bulinlin/Desktop/刘志强/软件网站/01-immichhelp.wiki/content/setup/how-to-update-immich.mdx) | 219 | 1795 | 4→13 | 9 | 版本/镜像盘点、备份、官方更新命令、旧 v1 中间版本、v3/VectorChord、迁移观察与回滚限制 |
| [immich-error-loading-image](/Users/bulinlin/Desktop/刘志强/软件网站/01-immichhelp.wiki/content/troubleshooting/immich-error-loading-image.mdx) | 287 | 2042 | 5→15 | 10 | 原图/缩略图/外部库/代理/格式分流、logs、jobs、更新后路径、校验异常、双实例 Redis 真实案例 |
| [immich-external-library](/Users/bulinlin/Desktop/刘志强/软件网站/01-immichhelp.wiki/content/storage/immich-external-library.mdx) | 234 | 2028 | 4→10 | 6 | 只读挂载与容器路径、owner、scan/jobs、定时扫描、XMP 冲突、改名身份变化、v3.1.0 断挂载/Trash |
| [immich-proxmox](/Users/bulinlin/Desktop/刘志强/软件网站/01-immichhelp.wiki/content/platforms/immich-proxmox.mdx) | 224 | 1823 | 4→15 | 11 | VM/LXC 支持边界、CPU 模型、三层挂载、UID/ACL、NAS、GPU/ML 分离、bind mount 备份遗漏 |
| [immich-for-synology](/Users/bulinlin/Desktop/刘志强/软件网站/01-immichhelp.wiki/content/platforms/immich-for-synology.mdx) | 215 | 1950 | 3→12 | 9 | Container Manager 分步安装、共享文件夹、映射/ACL、2283/子网、手机上传、更新与 Clean 风险 |
| [how-to-use-immich](/Users/bulinlin/Desktop/刘志强/软件网站/01-immichhelp.wiki/content/getting-started/how-to-use-immich.mdx) | 222 | 1912 | 4→13 | 9 | 账户/URL、前台测试、Android/iOS 后台、iCloud、web 上传、相册同步分享风险、搜索/人物/服务器备份 |

总可见词数：1964 → 15429。按页面计算新增来源引用 75 个；最终按页面累计来源 106 个，全站去重 63 个。

## 6–8. 来源分类

| 类型 | 全站去重来源数 |
|---|---:|
| 官方资料（Immich、Docker、PostgreSQL、Proxmox、Synology；含官方 release） | 38 |
| GitHub Issue | 6 |
| GitHub Discussion | 9 |
| 平台论坛 / Reddit | 9（Proxmox 论坛 2、Reddit 7） |
| 独立分类的社区贡献指南 | 1（Immich 文档内的 Synology Community） |

GitHub Release 不重复算入 Issue/Discussion；Synology 社区指南不冒充官方平台支持。官方 KB 搜索索引可读、正文 JS 壳的限制已保留。Reddit 直接 HTTP 请求被拒的页面通过网页检索/浏览工具阅读，不把直接抓取失败伪报为 HTTP200。

| 页面 | 官方 | Issue | Discussion | 论坛/Reddit | 社区指南 |
|---|---:|---:|---:|---:|---:|
| immich-backup | 9 | 1 | 0 | 2 | 0 |
| immich-docker-compose | 14 | 0 | 1 | 1 | 0 |
| how-to-update-immich | 11 | 0 | 2 | 0 | 0 |
| immich-error-loading-image | 9 | 2 | 2 | 2 | 0 |
| immich-external-library | 5 | 2 | 1 | 1 | 1 |
| immich-proxmox | 11 | 0 | 2 | 2 | 0 |
| immich-for-synology | 8 | 0 | 2 | 1 | 1 |
| how-to-use-immich | 11 | 1 | 1 | 0 | 0 |

## 9–15. 教程要素覆盖

8 页全部新增或实质扩充 Step-by-Step、Verification、Failure Recovery、平台差异、版本差异、有来源的 FAQ 和 Danger 提示。Image Error 的步骤用于诊断，其余按安装/使用/维护流程组织。部分旧页已有简短验证或风险段落，本轮不是将其错误宣称为首次存在，而是扩成可操作流程。

| 页面 | 步骤 | 验证 | 失败恢复 | 平台 | 版本 | FAQ 数 | Danger 数 |
|---|---|---|---|---|---|---:|---:|
| immich-backup | 有 | 有 | 有 | 有 | 有 | 3 | 4 |
| immich-docker-compose | 有 | 有 | 有 | 有 | 有 | 3 | 1 |
| how-to-update-immich | 有 | 有 | 有 | 有 | 有 | 3 | 2 |
| immich-error-loading-image | 有 | 有 | 有 | 有 | 有 | 3 | 2 |
| immich-external-library | 有 | 有 | 有 | 有 | 有 | 3 | 2 |
| immich-proxmox | 有 | 有 | 有 | 有 | 有 | 3 | 2 |
| immich-for-synology | 有 | 有 | 有 | 有 | 有 | 3 | 2 |
| how-to-use-immich | 有 | 有 | 有 | 有 | 有 | 3 | 2 |

共 24 个有来源 FAQ、17 个 Danger 区块、21 个表格、19 个命令/配置代码块。没有复制删除数据库/卷的批量修复脚本；文中命令注明执行地点、用途、预期结果和失败含义。

## 16–17. 资料缺口与事实边界

| 页面 | 保留的限制 |
|---|---|
| immich-backup | 尚未在真实 Immich 上执行恢复演练；任意历史备份及自定义卷布局仍须操作者验证。 |
| immich-docker-compose | 未实机安装 Docker/Windows 或测试目标磁盘权限；NAS 容量个案不宣称已找到根因。 |
| how-to-update-immich | 未运行真实 v1→v2→v3 迁移；独立 PostgreSQL 和发行版自管数据库不能用一个通用命令覆盖。 |
| immich-error-loading-image | #26720 写入修复首发 tag 未确认；#30820 恢复结果有分歧；无通用解码修复。 |
| immich-external-library | #10538 只读 metadata 当前版本是否修复未确认；#30820 rescan 建议与用户恢复结果有分歧；需实机小库测试 XMP。 |
| immich-proxmox | 未实机测试 GPU、IOMMU/ACL/UID 映射；没有可确认的 helper-native LXC 通用迁移配方。 |
| immich-for-synology | #28987 的 ML 根因未解决；DSM 当前 Clean 对话框和各型号兼容性未实测；官方 KB 完整正文不可读，搜索索引可读。 |
| how-to-use-immich | 未测不同手机后台调度；#27250 没有通用修复，原帖示例版本不能当成真实环境。 |

没有将无法确认的说法新增为已验证事实。实用验收方法属于依据官方流程整理的编辑性检查，文章明确标注，并未声称在用户硬件上实际执行。社区建议只有在证据支持时才描述为该环境的用户确认结果。未公开案例用户名、个人照片或不必要的环境身份数据。

本轮纠正：#23574 后续 Redis 配置遗漏；#26720 asset_file 缺行并非损坏证据；v3 已移除 pgvecto.rs；当前默认 Compose 的 redis 服务用 Valkey；#27250 示例版本不是测试版本；Synology Clean 来源措辞冲突；XMP 专门文档与 Libraries 概述冲突。冲突均按适用范围处理或明确保留，没有用推断强行填平。

## 18–19. 范围保护

- 新 SEO 页面：0；published 集合始终为相同的 8 个路径。
- 原 research 修改：0；baseline.json 记录的所有原研究文件逐个 SHA-256 校验一致。
- 新研究全部位于 research/expansion/，每页均有要求的 15 个主题字段以及预先建立的问题覆盖矩阵、查询/停止理由、来源与章节证据映射。
- 未修改关键词体系、review 内容、导航/品牌/UI、广告、多语言、GA4/GSC/DNS。
- 没有执行 Immich 安装、restore、删除数据库或权限变更；这些是教程内容。

## 20–23. 验证结果

| 检查 | 结果 |
|---|---|
| npm run lint | PASS，tsc --noEmit，退出 0 |
| npm test | PASS，3 个测试文件、4 个测试，退出 0 |
| npm run build | PASS，Next.js 生产构建，23 个静态生成项；正式文章仍为原 8 个 |
| git diff --check | PASS，退出 0 |
| 内容/范围审计 | PASS，正文块、3–8 FAQ、内部链接、来源清单、原研究哈希、发布集合一致 |
| 生产页面 HTML | 8/8 HTTP200；每页单一 H1；表格、代码、Danger 渲染；无失效目录锚点或重复 ID |
| 桌面视觉抽查 | Backup 首屏/命令步骤、Image Error 诊断表与目录跳转可读；没有宣称逐屏或手机视觉验收 |

测试输出有现存 Vite 警告：vitest.config.ts 使用 __dirname，与未来 native configLoader 默认行为不兼容。本轮未改测试配置；当前测试通过。构建生成的 tsconfig.tsbuildinfo 已恢复至开始时版本，交付范围只剩 8 篇正文及新增研究。

## 24–25. 最完整教程与优先人工验证

最完整的是 Immich Backup：备份组成、数据库导出、同步顺序、两条 UI 恢复路径、恢复后验证、失败分流和数据风险形成完整流程。这里的完整是公开资料与教程覆盖完整，不代表已替用户完成实机恢复演练。

最需要后续人工验证的是 Synology：须在实际 NAS/DSM 版本上确认 Clean/Build 控件语义、卷类型、ACL、硬件能力和 ML 行为。其次是 External Library 的只读 XMP 与断挂载恢复差异。

## 交付文件

- [来源索引](source-index.json)：去重来源、分类、访问记录与被哪些页面引用。
- [问题与证据映射](claim-ledger.json)：逐页章节到证据 URL。
- [搜索记录](search-log.json)：查询主题、轮次、停止理由与未解问题。
- [统计结果](metrics.json) 与 [可重复审计脚本](audit.py)。
- [页面结构验收](render-check.json)。
- 每篇 `<slug>-expansion.md`：完整扩展研究档案与覆盖矩阵。

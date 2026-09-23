# Koo SEO / GEO 前端实施方案

| 字段 | 值 |
| --- | --- |
| 文档版本 | 1.0（基于 Growth 规格 V3 · Frontend execution edition，2026-09-19） |
| 适用仓库 | `koo-www`（www.koo.xyz） |
| 配套交付 | `Koo_SEO_GEO_前端实施规格(1).pdf`、`Koo_SEO_GEO_前端任务与验收表_V2.xlsx` |
| 受众 | 前端、Growth、Product、发布评审 |
| 范围 | www 可索引 12 页 + 全站 SEO 基建；app.koo.xyz noindex 与 KryptoX 迁移为跨仓/infra 协作项 |

---

## 1. 文档目的

本文档在官方《Koo SEO/GEO 前端实施规格》基础上，结合 **当前 `koo-www` 工程现状**，给出可执行的：

- 差距分析与必须重构的范围；
- 推荐技术架构与目录结构；
- 12 页面 + 全站任务（G01–G14）的工程映射；
- 分阶段上线、验收与风险清单。

**必须守住的边界（与 Growth 一致）**：URL、页面意图、可抓取 HTML、已确认事实、内部链接、验收结果。  
**可由前端裁量的部分**：SSR/SSG 选型、组件拆分、发布顺序、在不影响验收前提下的 UI 实现细节。

---

## 2. 为什么要做这次修改

### 2.1 业务目标

- 让官网把 **已上线产品** 解释清楚，供用户、搜索引擎与 AI 稳定读取。
- 用户搜索 Koo、Fees、Funding、Liquidation 等问题时，官网直接给出 **与 Docs / 产品一致** 的答案。
- 串联可观测路径：**Organic Discovery → Explore Markets → Wallet / Deposit / First Order**。
- 建立可复用模板，降低后续新增说明页（如 `/contract-specifications`）的边际成本。

### 2.2 最关键的技术问题（现状）

当前 `koo-www` 为 **Vite + React CSR**：首次 HTTP 响应的 HTML 基本是 `#root` 空壳。H1、核心答案、正文与站内链接依赖 JS 执行后才出现。

影响：

- Google 等搜索引擎可能延迟二次渲染，收录变慢；
- 部分 AI 抓取器只读首包 HTML，可能只看到空壳；
- 无法满足规格 **G02**（curl / View Page Source 不执行 JS 即可见核心内容）。

**目标态**：SSR、SSG 或可靠 prerender，使 H1、直接答案、主要正文、内链出现在 **首次 HTML**；JS 仅负责动画、行情刷新与交互。

---

## 3. 分工与协作

| 角色 | 职责 |
| --- | --- |
| Growth / Product | 页面目标、产品事实、英文文案、URL、内链、优先级、内容终稿；Excel 中 Owner / Status / Evidence |
| Frontend | 渲染架构、路由、组件、响应式、API 接入、metadata / schema / sitemap、埋点、发布顺序 |
| Infra / App 仓 | `app.koo.xyz` noindex（G06）、KryptoX 301/308/410（G12）、CDN / Vercel redirects |

**Blocked 流程**：接口或工程条件不足时，在验收表标记 Blocked，写清「缺什么、影响哪一页」；Growth 协调补齐。

---

## 4. 交付范围摘要

| 类别 | 内容 |
| --- | --- |
| 页面 | 首页改造 **P01** + **11** 个新内页，共 **12** 个可索引 URL |
| 模板 | Homepage、Guide、Product、Market、Rules（UI 参考图为层级关系，非像素锁稿） |
| 全站 | SSR/SSG、metadata、robots、sitemap、schema、内链、埋点；www 迁移规则 |
| 不在本期 | `/contract-specifications`（第二阶段） |
| 域名策略 | **www.koo.xyz** = 可索引内容；**app.koo.xyz** = 产品应用 + **noindex**（非本仓） |

---

## 5. 当前工程差距分析（`koo-www`）

基于仓库现状（Vite 7、React 19、Tailwind 4、单页 `App.tsx`、Vitest）。

| 维度 | 规格要求 | 当前状态 | 严重度 |
| --- | --- | --- | --- |
| G02 首包 HTML | H1、直接答案、正文、内链 | 仅 `index.html` 静态 meta + 空 `#root` | **P0** |
| G03 路由 | 12 URL，深链/刷新 200 | 无客户端路由 | **P0** |
| G04 Metadata | 每页 title / description / canonical / OG | 全站共用一条 description | **P0** |
| G05 robots / sitemap | 200 且含 12 canonical URL | 无 | **P0** |
| G08 Schema | Organization+WebSite / WebPage / FAQPage | 无 | **P0** |
| G09 内链 | §8 关系图 + Related 3–5 | 几乎无站内路径链接 | **P0** |
| G10 动态事实 | 生产 API / 单一配置源 | 无 API 层 | **P1** |
| G11 漏斗埋点 | Explore Markets 等事件 | 仅 Vercel Analytics 默认 | **P1** |
| Header IA | Products / Learn / Docs / Explore Markets | Home / Docs / Roadmap / Launch App | **P1** |
| P01 文案 | 规格 H1 / opening / FAQ | H1 为「Portable Accounts…」，副文案含 KFC 等，与 P01 稿不一致 | **需 Product 确认** |
| G06 / G12 | app noindex、KryptoX 重定向 | 不在本仓 | **跨团队** |

**结论**：需 **架构级升级（推荐 Next.js App Router）** + **内容层 + 四套页面模板**；首页保留现有 `src/components/home/*` 动效，以 Client Component 形式迁入，并增加 Server 侧 SEO 语义层。

---

## 6. 推荐架构

### 6.1 方案对比

| 方案 | 优点 | 缺点 | 建议 |
| --- | --- | --- | --- |
| **A. 迁移 Next.js（App Router）** | 原生 metadata / sitemap / robots / ISR；Vercel 一等公民；G02/G04/G05 成本低 | 一次性迁移工作量 | **推荐** |
| B. 保留 Vite + 全路由 prerender | 改动栈小 | metadata、sitemap、revalidate、redirects 需多套插件；长期维护贵 | 仅当有强约束不能换框架时 |
| C. 纯 CSR + 事后 prerender 插件 | 实施快 | 动态页与验收稳定性差 | **不推荐** |

### 6.2 渲染策略

| 页面类型 | 策略 |
| --- | --- |
| Guide / Product（静态事实为主） | **SSG**，构建时生成 HTML |
| Rules（fees / funding / liquidation） | **SSG + revalidate**（如 300s），build/edge 拉配置 |
| Market（instruments 列表） | **SSG + revalidate**；API 失败时展示上次成功值 + Docs 链 |
| Homepage | **混合**：Server 输出 SEO  intro + 产品链接；Client 保留 Hero / Experience 等 |

### 6.3 验收命令（G02 示例）

```bash
# 不执行 JS，首包应含规格 H1 关键词与正文片段
curl -sL "https://www.koo.xyz/fees" | grep -i "<h1"
curl -sL "https://www.koo.xyz/fees" | grep -i "0.02%"
```

Staging 环境在上线前对 12 URL 各跑一遍。

---

## 7. 目标工程结构

迁移 Next.js 后的建议布局（现有 `public/`、`src/components/home/` 尽量原样迁入）：

```text
koo-www/
├── app/
│   ├── layout.tsx                 # 字体、全站 shell、Organization（首页）
│   ├── page.tsx                   # P01
│   ├── what-is-koo/page.tsx       # P02 …
│   ├── how-to-trade/page.tsx
│   ├── nft-account/page.tsx
│   ├── yield-bearing-margin/page.tsx
│   ├── event-contracts/page.tsx
│   ├── vault/page.tsx
│   ├── crypto-perpetuals/page.tsx
│   ├── tradfi-perpetuals/page.tsx
│   ├── fees/page.tsx
│   ├── funding/page.tsx
│   ├── liquidation/page.tsx
│   ├── robots.ts                  # G05、G07
│   └── sitemap.ts                 # G05
├── src/
│   ├── components/
│   │   ├── chrome/                # SiteHeader、SiteFooter
│   │   ├── content/               # AnswerHero、FAQ、RelatedPages…
│   │   ├── seo/                   # JsonLd
│   │   └── home/                  # 现有首页区块（"use client"）
│   ├── content/
│   │   ├── pages/                 # 12 页结构化文案（TS，Growth 稿为源）
│   │   └── related-links.ts       # G09 内链图
│   ├── templates/
│   │   ├── GuidePage.tsx
│   │   ├── ProductPage.tsx
│   │   ├── MarketPage.tsx
│   │   └── RulesPage.tsx
│   └── lib/
│       ├── links.ts               # APP_URL、DOCS_URL 等（已有）
│       ├── api/                   # market、funding、fees、vault
│       └── facts/                 # 静态确认事实单源（G10）
├── public/                        # 现有静态资源
└── next.config.ts                 # redirects（G12）、headers
```

---

## 8. 统一组件与内页结构（规格 §9–10）

### 8.1 内页内容顺序

```text
H1 + 直接答案 → 核心事实摘要 → 正文（How it works / 步骤 / 机制）→ 示例或流程 → 风险与限制 → FAQ → Related Pages → Explore Markets CTA
```

Phase 1 **不要求** breadcrumb。

### 8.2 组件契约

| 组件 | 要求 |
| --- | --- |
| **SiteHeader** | Logo；Products；Learn；Docs（外链）；Explore Markets → `https://app.koo.xyz/`。Mobile：Logo + CTA + 无障碍菜单 |
| **AnswerHero** | Eyebrow + **唯一 H1** + 直接答案段 + 最多 3 张 fact card；**禁止**动画文字作为唯一 H1 答案 |
| **FactSummary** | 2–4 条短事实；动态值标注 freshness / Last updated |
| **ContentSection** | 语义化 H2/H3，短段落与列表；不为样式跳 heading 级别 |
| **RiskCallout** | 风险文案常驻可见 HTML；**不得**仅存在于 tooltip 或 accordion |
| **RelatedPages** | 3–5 条站内 `<a href>`，描述性 anchor 文案 |
| **ExploreMarketsCTA** | 固定 `APP_URL` + G11 埋点事件 |
| **UpdatedSource** | Rules 页：Last updated + Docs 源链接 |

### 8.3 页面模板映射

| 模板 | 页面 ID | 路由 |
| --- | --- | --- |
| Homepage (A) | P01 | `/` |
| Guide (B) | P02, P03 | `/what-is-koo`, `/how-to-trade` |
| Product (C) | P04–P07 | `/nft-account`, `/yield-bearing-margin`, `/event-contracts`, `/vault` |
| Market (D) | P08, P09 | `/crypto-perpetuals`, `/tradfi-perpetuals` |
| Rules (D) | P10–P12 | `/fees`, `/funding`, `/liquidation` |

---

## 9. 全站信息架构与内链（G09）

### 9.1 规则摘要

- **首页**：链向全部 11 个内页（唯一可展示全部产品入口的页面）。
- **每内页末尾**：3–5 条 Related， genuinely 相关（非全站 spam）。
- 所有关系用 **普通可抓取 `<a href>`**，不用纯 JS 导航替代。

### 9.2 必选关系边（规格 §8）

| 来源 | 必须指向 |
| --- | --- |
| `/` | 全部 11 内页 |
| `/how-to-trade` | `/fees`, `/funding`, `/liquidation` |
| `/crypto-perpetuals`, `/tradfi-perpetuals` | `/fees`, `/funding`, `/liquidation` |
| `/nft-account` | `/yield-bearing-margin`, `/liquidation`, `/how-to-trade` |
| `/event-contracts` | 具体市场规则（Docs 或规格内链）、`/liquidation` |
| `/vault` | 清算/风险信息、生产 Vault 入口（app） |

### 9.3 Related Pages 配置表（实现 `related-links.ts`）

| 页面 | Related（规格明示） |
| --- | --- |
| P01 `/` | what-is-koo, how-to-trade, nft-account, yield-bearing-margin, event-contracts, vault, crypto-perpetuals, tradfi-perpetuals, fees, funding, liquidation |
| P02 | how-to-trade, nft-account, event-contracts, crypto-perpetuals, tradfi-perpetuals |
| P03 | nft-account, fees, funding, liquidation |
| P04 | yield-bearing-margin, liquidation, how-to-trade |
| P05 | nft-account, vault, how-to-trade, liquidation |
| P06 | funding, liquidation, nft-account, how-to-trade |
| P07 | liquidation, yield-bearing-margin, nft-account, how-to-trade |
| P08 | fees, funding, liquidation, how-to-trade |
| P09 | fees, funding, liquidation, how-to-trade |
| P10 | funding, liquidation, crypto-perpetuals, tradfi-perpetuals |
| P11 | fees, liquidation, crypto-perpetuals, tradfi-perpetuals |
| P12 | nft-account, fees, funding, how-to-trade |

实现时 Related 组件从该表读取；Header 的 Products / Learn 分组与上表一致。

---

## 10. 全站技术任务详解（G01–G14）

### G01 · 确认生产源码

**动作**：在开始编码前记录：

1. 生产 Git 仓库（本仓 `koo-www`）
2. 活跃分支 / 发布分支策略
3. Vercel（或等价）部署项目名
4. Staging URL
5. 发布负责人

**落盘建议**：写入 `docs/production-source.md` 或 README 专节。

**验收**：五项齐全后再开 G02+。

---

### G02 · 渲染架构

**动作**：首页 + 全部内容页首包 HTML 含：H1、直接答案、主要正文、内链。

**验收**：View Page Source / `curl` 不执行 JS 即可见上述内容。

---

### G03 · 路由

**动作**：11 内页 + 首页；有效路径 HTTP **200**；浏览器直接打开与刷新无 SPA fallback 404。

**验收**：12 URL 直载 + 刷新测试通过。

---

### G04 · Metadata

**每页必备**：

- 唯一 `<title>`
- `meta description`
- 页面 H1（与 metadata 意图一致）
- `link rel="canonical"` 指向自身 canonical URL（`https://www.koo.xyz/...`）
- Open Graph：`og:title`, `og:description`, `og:image`（需设计默认 OG 或模板图）

Next.js 使用 `export const metadata` + `alternates.canonical`。

---

### G05 · Robots 与 Sitemap

**www**：

- `/robots.txt` → 200
- `/sitemap.xml` → 200，包含 12 个 canonical 内容 URL
- **不包含** app.koo.xyz 路由

---

### G06 · App 索引策略（跨仓）

**app.koo.xyz** 每个路由 **首屏 HTML** 含 `noindex`；仍须可被爬取以读取 noindex；sitemap 不含 app；避免 app 首页 universal canonical 覆盖 www。

**本仓**：文档化依赖，在 app 仓库单独工单验收。

---

### G07 · 爬虫策略

在 `robots.txt` 中（政策以 Growth 为准）：

- **Allow**：Googlebot、Bingbot、OAI-SearchBot、ChatGPT-User（对公开内容）
- **Disallow / block**：GPTBot（search-yes / training-no 政策存续期间）

**验收**：按 User-Agent 测试规则符合预期。

---

### G08 · 结构化数据

| 页面 | Schema |
| --- | --- |
| 首页 P01 | `Organization` + `WebSite` |
| 内页 | `WebPage` |
| 含 FAQ 且与可见文案一致 | `FAQPage` |

**验收**：Google Rich Results / schema 校验通过。

---

### G09 · 内链

实现 §9 关系图 + 每页 Related；Header/Footer 补充产品/learn 链接。

**验收**：每条必选边可点击且 200。

---

### G10 · 动态与静态事实

- **动态**：instrument 状态、杠杆、风险、订单限制、funding、vault 指标等 → 生产 API 或中心化配置。
- **静态**：已确认不变事实 → `src/lib/facts/` 单源；页面禁止复制粘贴硬编码费率/旧阈值（如历史 600k USDC 部分清算阈值）。

**验收**：每个动态字段可追溯至单一权威源；失败时有明确降级 UX。

**已知 API（规格引用）**：

- `https://api.koo.xyz/api/v1/market/instruments-info`
- funding / fees / vault / account 等以 Excel 与后端文档为准

**Blocked 风险**：浏览器 CORS 不可用时，改用 Next Route Handler 或 build-time fetch。

---

### G11 · 分析

使用 **官方 ID**（Growth 提供）。事件至少包括：

- Explore Markets 点击（www CTA）
- Wallet connect 成功
- Deposit 成功
- First order 成功

**禁止** payload 含 wallet 地址或敏感 ID。

**验收**：Debug 模式可见事件且字段安全。

---

### G12 · 迁移（KryptoX → Koo）

- 旧 URL → 最近 Koo 页：**单跳** 301/308
- 保留必要 query
- 无替代目标 → **410**

配置在 `next.config.ts` redirects 或 Vercel 项目级 redirects；映射表以 Excel 为准。

**验收**：爬取/脚本验证每条 legacy URL。

---

### G13 · 无障碍与移动端

- 键盘 focus、语义 heading
- 触控目标 ≥ 44px
- 对比度足够
- `prefers-reduced-motion`（现有首页视频/动画契约继续遵守 README）
- **390px** 宽度无重叠、无横向滚动

**验收**：桌面 + 移动 + 键盘手工检查。

---

### G14 · 发布验证

Staging 与 Production 检查：

- Raw HTML vs 渲染 HTML
- Status、canonical、schema、内链、OG、analytics

**验收**：验收表签字完成（§14 清单）。

---

## 11. 首页重构策略（P01 + 保留动效）

### 11.1 双层结构

```text
┌──────────────────────────────────────────┐
│ Server：SEO 语义层                        │
│  - 规格 H1 + Opening + Core facts         │
│  - 产品卡片（链到 11 内页）               │
│  - FAQ（可选 FAQPage）                    │
│  - 市场卡（API 或 build 注入）            │
├──────────────────────────────────────────┤
│ Client：现有品牌层                        │
│  - HeroSection（视频/动效）               │
│  - WhyKoo / ExclusiveExperience / …       │
└──────────────────────────────────────────┘
```

### 11.2 H1 与品牌 slogan

规格 **H1**：`Derivatives built around your NFT account.`

当前 Hero **H1**：`Portable Accounts, Productive Capital`

**建议**：

- 全页仅 **一个** `<h1>`，采用规格 H1（SEO + 可访问性）。
- 现 slogan 降为 **副标题 / display 文案**（非 H1），或通过视觉层次保留品牌句而不重复 H1。
- 副文案中 **KFC token** 等未出现在 P01 规格稿的内容 → **Product 确认** 后保留或删除。

### 11.3 动效约束

- 动画文字不得成为 **唯一** H1 答案来源。
- 装饰性动画可用 `aria-hidden`；真实 H1 始终在 DOM 中可读。

### 11.4 P01 SEO 字段（Growth 定稿）

| 字段 | 内容 |
| --- | --- |
| Title | Koo \| NFT Account-Based Derivatives on Arbitrum |
| Meta description | Explore Koo, an Arbitrum-based hybrid derivatives platform for crypto, TradFi and event contracts, built around NFT trading accounts. |
| H1 | Derivatives built around your NFT account. |
| Primary CTA | Explore Markets → `https://app.koo.xyz/` |

正文区块顺序：Core products → Markets → How Koo works → Trust and risk → FAQ → Related（11 内页）。

**Docs 源**：

- https://docs.koo.xyz/about-koo.xyz
- https://docs.koo.xyz/about-koo.xyz/core-technical-architecture

**动态**：市场卡与状态来自生产 market API。

---

## 12. 十一内页规格摘要

以下为元数据、意图与工程要点；**完整英文正文**以 PDF / Word 为准，实现时录入 `src/content/pages/*.ts`。

### P02 · `/what-is-koo` — Guide · P0

| 项 | 值 |
| --- | --- |
| Title | What Is Koo? NFT Account-Based Derivatives Explained |
| H1 | What is Koo? |
| Related | how-to-trade, nft-account, event-contracts, crypto-perpetuals, tradfi-perpetuals |
| 动态 | 无（透明度内容 phase-1 在本页内） |

---

### P03 · `/how-to-trade` — Guide · P0

| 项 | 值 |
| --- | --- |
| Title | How to Trade on Koo: A Step-by-Step Guide |
| H1 | How to trade on Koo |
| Related | nft-account, fees, funding, liquidation |
| 动态 | Market status、contract specs（生产 API） |

**Docs**：

- deposit-and-withdrawal-onchain
- nft-accounts
- order-types-and-matching

---

### P04 · `/nft-account` — Product · P1

| 项 | 值 |
| --- | --- |
| Title | Koo NFT Accounts: How Trading Accounts Work |
| H1 | What is a Koo NFT Account? |
| Related | yield-bearing-margin, liquidation, how-to-trade |
| 动态 | Transfer eligibility、account status（account API） |

---

### P05 · `/yield-bearing-margin` — Product · P1

| 项 | 值 |
| --- | --- |
| Title | Yield-Bearing Margin on Koo |
| H1 | What is Yield-bearing Margin on Koo? |
| Related | nft-account, vault, how-to-trade, liquidation |
| 动态 | 当前 yield / eligibility；APR 标 variable / historical |

**合规**：禁止 fixed APR、guaranteed、100% return 等表述。

---

### P06 · `/event-contracts` — Product · P1

| 项 | 值 |
| --- | --- |
| Title | Koo Event Contracts: Delivery and Perpetual Markets |
| H1 | What are Koo Event Contracts? |
| Related | funding, liquidation, nft-account, how-to-trade |
| 动态 | stage、leverage、rules URL、lock/settlement（market config） |

---

### P07 · `/vault` — Product · P1

| 项 | 值 |
| --- | --- |
| Title | Koo Vault: Insurance-Fund Participation and Risks |
| H1 | What is the Koo Vault? |
| Related | liquidation, yield-bearing-margin, nft-account, how-to-trade |
| 动态 | Vault Equity、historical APR、Total P&L、liquidity、withdraw eligibility |

**文案**：界面用 Vault Equity（非模糊 TVL）；Total P&L（非 All-time Earned）。

---

### P08 · `/crypto-perpetuals` — Market · P1

| 项 | 值 |
| --- | --- |
| Title | Crypto Perpetuals on Koo |
| H1 | Trade crypto perpetuals on Koo |
| Related | fees, funding, liquidation, how-to-trade |
| 动态 | instruments-info；funding rate & cap |

**静态 fallback**：BTC/ETH 仅作示例，完整列表以 API 为准。

---

### P09 · `/tradfi-perpetuals` — Market · P1

| 项 | 值 |
| --- | --- |
| Title | TradFi Perpetuals on Koo: Stocks, ETFs and Commodities |
| H1 | Trade selected TradFi perpetuals on Koo |
| Related | fees, funding, liquidation, how-to-trade |
| 动态 | live instruments、market stage、leverage |

**注意**：不宣称 Forex；RWA 表述遵守规格。

---

### P10 · `/fees` — Rules · P0

| 项 | 值 |
| --- | --- |
| Title | Koo Trading Fees: Maker and Taker Rates |
| H1 | What are Koo’s trading fees? |
| Related | funding, liquidation, crypto-perpetuals, tradfi-perpetuals |
| 动态 | Maker/taker 配置 + **Last updated** |

**确认事实（当前）**：Taker 0.02%；Maker -0.005%（rebate）；limit 立即成交可为 taker。

---

### P11 · `/funding` — Rules · P0

| 项 | 值 |
| --- | --- |
| Title | Koo Funding Rates: Schedule, Direction and Formula |
| H1 | How does funding work on Koo? |
| Related | fees, liquidation, crypto-perpetuals, tradfi-perpetuals |
| 动态 | interval、current rate、next settlement、cap、last updated |

**说明**：Goal Difference delivery 无 funding；Market Share perpetual 有 funding。

---

### P12 · `/liquidation` — Rules · P0

| 项 | 值 |
| --- | --- |
| Title | Koo Liquidation: Risk Ratio and Cross Margin Explained |
| H1 | How does liquidation work on Koo? |
| Related | nft-account, fees, funding, how-to-trade |
| 动态 | riskRate、MMR、partial liquidation 配置（后端权威） |

**关键**：Risk Ratio 100% 触发强平；95% 取消挂单；**Mark Price** 非 Last Price；前端不替代后端 risk 计算。

---

## 13. 数据层设计（G10）

### 13.1 分层

```text
src/lib/facts/static.ts     # 网络、USDC、Cross Margin、架构描述等
src/lib/facts/fees.ts       # 从 API/sync 的费率
src/lib/api/market.ts       # instruments-info
src/lib/api/funding.ts
src/lib/api/vault.ts
src/lib/api/account.ts      # NFT transfer 等（若公开）
```

### 13.2 刷新策略

- 内容页：`fetch(url, { next: { revalidate: 300 } })` 或 Growth 指定间隔。
- Build 失败：保留 `lastSuccessful` + 明确提示 + Docs 链接。
- **禁止**在组件内硬编码与 API 冲突的数字。

### 13.3 常量（已有，继续沿用）

```ts
// src/lib/links.ts
APP_URL   = "https://app.koo.xyz/"
DOCS_URL  = "https://docs.koo.xyz/"
```

Explore Markets / Launch App 统一指向 `APP_URL`，命名向规格靠拢。

---

## 14. Chrome 改造要点

### 14.1 SiteHeader

| 导航项 | 行为 |
| --- | --- |
| Logo | `/` |
| Products | 下拉 → P04–P09 产品/市场页 |
| Learn | 下拉 → P02, P03, P10–P12 |
| Docs | `DOCS_URL`（新 tab） |
| Explore Markets | `APP_URL` + 埋点 |

Mobile：保留现有 drawer 模式（`chrome.test.tsx` 行为可扩展断言）。

### 14.2 SiteFooter

- 增加 Products / Learn 链接组或 compact sitemap。
- **Terms of Use**：当前为纯文本，需 Product 提供 URL 后改为 `<a>`（禁止 `href="#"`，见 README）。

### 14.3 现有首页组件

| 组件 | 迁移说明 |
| --- | --- |
| HeroSection, WhyKooSection, ExclusiveExperienceSection, CommunitySection, EnterKooSection | Client 保留；README 中 media/scroll 契约不变 |
| DevelopmentMilestonesSection | 当前未挂载于 `App.tsx`；是否回到首页由 Product 决定，不阻塞 12 页 |

---

## 15. 分阶段实施计划

### Phase 0 — 基础（约 1–2 周）

1. Next.js 脚手架、Tailwind/字体/`public` 迁入
2. `layout`、chrome、4 templates、content 管道
3. G02/G04/G05/G08/G09 基建
4. POC：`/fees` + `/` 部分 SEO 层，`curl` 验收

### Phase 1 — P0 六页（规格第一批）

`/`, `/what-is-koo`, `/how-to-trade`, `/fees`, `/funding`, `/liquidation`

- 首页 SEO 层 + 内链
- Rules 三页接入 fees/funding 数据源

### Phase 2 — P1 五页

`/nft-account`, `/yield-bearing-margin`, `/event-contracts`, `/vault`, `/crypto-perpetuals`, `/tradfi-perpetuals`

- Market 表格与 event 动态字段（Blocked 项并行解决）

### Phase 3 — 增长与迁移

- G11 漏斗事件
- G12 Excel 映射上线
- G14 全量签字
- app 仓 G06 联调

---

## 16. 测试策略

| 层级 | 内容 |
| --- | --- |
| 单元 | `related-links` 覆盖、JSON-LD 快照、facts 解析 |
| 组件 | 每模板必含 H1、RiskCallout（适用时）、ExploreMarketsCTA |
| E2E（建议 Playwright） | 12×200、390px 无 overflow、CTA href |
| CI SEO | `curl` 检查 title/canonical；robots/sitemap 200 |
| 回归 | 现有 Vitest（home media、chrome、milestone layout）迁移后继续跑 |

---

## 17. 风险与 Blocked 登记模板

| ID | 风险 | 影响页面 | 缓解 |
| --- | --- | --- | --- |
| R1 | Market/Vault API 无浏览器 CORS | P05, P07, P08, P09 | Route Handler / 仅 SSG |
| R2 | app noindex 未上 | G06 | app 仓工单 + 发布门禁 |
| R3 | KryptoX 映射不全 | G12 | Excel 补齐前不宣称完成 G12 |
| R4 | P01 文案/KFC 与规格冲突 | P01 | Growth 单次确认 |
| R5 | Terms URL 缺失 | Footer | Product 供链 |
| R6 | OG 图未设计 | G04 | 默认全站 OG 模板 |

**Blocked 记录格式**（粘贴到 Excel）：

```text
Task: P08 instruments table
Blocked: API returns 403 from Vercel edge without auth
Impact: /crypto-perpetuals live market list empty in HTML
Need: Public read endpoint or server-side token in env
```

---

## 18. 工程拆票建议（Linear / Jira）

| ID | 标题 | 依赖 |
| --- | --- | --- |
| ARCH-1 | Next 迁移 POC + `/fees` curl 验收 | G01 |
| CONTENT-1 | 12 页 TS content 模块 | — |
| UI-1 | 8 个 content 组件 + 4 templates | CONTENT-1 |
| CHROME-1 | Header/Footer IA + 内链 | UI-1 |
| HOME-1 | P01 SEO 层 + H1/文案对齐 | Product 确认 |
| API-1 | market / funding / fees 数据层 + revalidate | — |
| SEO-1 | robots, sitemap, JsonLd | ARCH-1 |
| ANALYTICS-1 | G11 事件（Growth ID） | CHROME-1 |
| INFRA-1 | G12 redirects + app G06 | Excel / app 仓 |
| QA-1 | G14 自动化 + 验收表 | Phase 1–3 |

---

## 19. 上线检查清单（G14）

- [ ] G01 生产源五项已记录
- [ ] 12 canonical pages 返回 200
- [ ] Raw HTML 含 H1、直接答案、主要正文
- [ ] `robots.txt`、`sitemap.xml` 返回 200 且 URL 正确
- [ ] App 路由 raw HTML 含 noindex（app 仓）
- [ ] 每页 title、description、canonical 唯一且与规格一致
- [ ] Open Graph 抽检通过
- [ ] Schema 校验通过（Organization/WebSite/WebPage/FAQPage）
- [ ] G09 必选内链全部 200
- [ ] G07 User-Agent 规则抽检
- [ ] G11 事件在 debug 可见且无敏感字段
- [ ] G12 legacy URL 抽检 301/308/410
- [ ] G13 桌面 / 390px 移动 / 键盘通过
- [ ] Staging 与 Production 各完成一轮
- [ ] 验收表签字

---

## 20. 附录 A · 页面优先级与批次

| 批次 | 页面 ID | 路由 |
| --- | --- | --- |
| 第一批 P0 | P01, P02, P03, P10, P11, P12 | `/`, `/what-is-koo`, `/how-to-trade`, `/fees`, `/funding`, `/liquidation` |
| 第二批 P1 | P04–P09 | `/nft-account`, `/yield-bearing-margin`, `/event-contracts`, `/vault`, `/crypto-perpetuals`, `/tradfi-perpetuals` |
| 第二阶段 | — | `/contract-specifications` |

---

## 21. 附录 B · 统一内页验收标准（每页）

每页上线前必须满足（与规格 Page acceptance 一致）：

1. 真实 **200**；直接打开与刷新无错误 fallback。
2. Title、description、H1、canonical **唯一**且与本文件 / PDF 一致。
3. Opening answer 与 core facts 出现在 **initial/rendered HTML**（G02）。
4. Related links 与 CTA 为 **可抓取 anchor**，目标正确。
5. Desktop 与 **390px** 移动无重叠、无横向溢出。
6. 公开文案与规格一致；动态数字与 **生产数据** 一致。
7. Rules 页展示 **Last updated**（适用时）与 Docs 源链。

---

## 22. 附录 C · 文档维护

| 变更类型 | 更新位置 |
| --- | --- |
| Growth 更新 PDF / Word 文案 | `src/content/pages/*` + 本文件 §12 |
| 新增 URL / 内链 | `related-links.ts` + §9 |
| API 端点变更 | `src/lib/api/*` + §13 |
| 发布环境变更 | G01 记录 + README |

---

## 23. 修订历史

| 版本 | 日期 | 说明 |
| --- | --- | --- |
| 1.0 | 2026-09-23 | 初版：基于规格 V3 + `koo-www` 现状差距与 Next 迁移方案 |

# AGW.to — API Gateway, TO everywhere

> 一句话定位:**agw.to 是一家做「链接跳转」的服务公司 —— 给任何地址一个短域名,一次 HTTP 跳转,直达目标。**

- **AGW** = **A GateWay**(跳转网关),也可读作 API Gateway;
- **.to** = "to somewhere",天然带「去往」语义(同类先例:youtu.be、fb.me、t.co);
- 品牌口号:*One short link, to everywhere.*(一条短链,通往一切)

---

## 1. 产品定位

| 维度 | 定位 |
|------|------|
| 产品形态 | 短链接 / 跳转网关 SaaS(Link Shortener + Redirect Gateway) |
| 核心动作 | `agw.to/xxx` → HTTP 301/302 → 目标地址 |
| 目标用户 | 营销运营(投放追踪)、开发者(API 建链)、企业(品牌短域)、个人(分享) |
| 差异化 | 不只是"缩短",而是**智能跳转**:按设备 / 地域 / 语言 / 时间分流,链接即路由 |
| 对标产品 | bit.ly、TinyURL、short.io、dub.co、Rebrandly |

## 2. 应用场景

1. **通用短链**:长 URL 缩短,用于社交分享、短信(字数受限)、印刷物料。
2. **品牌短域**:企业绑定自有域名(`go.example.com`),由 agw.to 托管跳转。
3. **营销追踪**:短链自动附带 UTM,统计点击量、来源、地域、设备,评估投放效果。
4. **二维码**:每条短链一键生成二维码,线下物料扫码直达;换目标不用换码。
5. **App 深度链接**:按 UA 智能分流 —— iOS 跳 App Store、Android 跳应用市场、已装 App 直接唤起(Deep Link / Universal Link)。
6. **智能路由**:同一短链按地域 / 语言 / 时段跳不同落地页,支持 A/B 测试分流。
7. **链接治理**:有效期、访问密码、点击上限、随时改指向、失效兜底页。
8. **开发者 API**:RESTful API 批量建链 / 查询统计,嵌入客户自己的系统。

## 3. 产品路线(三阶段)

| 阶段 | 内容 | 说明 |
|------|------|------|
| P1 MVP | 官网 + 核心跳转 | 官网(本仓库,Astro 静态站)介绍产品;跳转服务实现 `agw.to/{slug}` → 301/302 |
| P2 控制台 | 建链管理 + 基础统计 | 登录、创建/编辑短链、二维码、点击量报表 |
| P3 平台化 | API + 智能路由 + 品牌域 | 开放 API、按设备/地域分流、客户自定义域名、计费 |

## 4. 技术方案

| 项 | 选型 | 理由 |
|----|------|------|
| 官网框架 | **Astro ≥ 7.0**(静态优先,Islands 按需交互) | 与 airdb-site 各站统一技术栈;零 JS 起步、SEO 友好 |
| 包管理 | pnpm(供应链策略:依赖发布满 24h 才安装) | 已定,见 `pnpm-workspace.yaml` |
| 构建/任务 | Makefile(`make install / run / build`) | 已定,保持现状 |
| 样式 | Tailwind CSS 4 | 已在依赖中 |
| 跳转服务 | 建议 Cloudflare Workers + KV/D1(边缘 301/302,全球低延迟) | 官网静态托管与跳转逻辑分离,互不影响 |
| 部署 | Cloudflare Pages(官网)+ Workers(跳转) | 同一平台,域名路由好切分:`/` 走官网,`/{slug}` 走 Worker |

## 5. 官网信息架构(P1)

- **首页**:一句话定位 + 输入框演示(贴长链 → 出短链)+ 核心场景三栏
- **功能页**:短链 / 二维码 / 统计 / 智能路由 / API
- **价格页**:Free / Pro / Business(占位)
- **文档页**:API 文档、品牌域接入指引
- **关于**:品牌故事(A GateWay, to everywhere)

---

*注:原 README 中 agw.bot(实体机器人)的品牌笔记已归档至 `docs/agw.bot-notes.md`,该项目有独立仓库 `../agw.bot`。*

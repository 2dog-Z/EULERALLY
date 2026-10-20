# Stage 0 Smoke Test Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 交付可 `npm run dev` 操作的两道写死四选一题页面，含正误反馈、提交锁与 Next 切换。

**Architecture:** 单个 `App` 组件持有 `questionIndex` / `selectedOptionId` 两个状态；题目来自 `src/questions.ts` 的静态常量数组。无引擎、无路由、无存储。

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-19-stage-0-smoke.md`

## Global Constraints

- 仅 Web；不引入 Capacitor、Dexie、KaTeX、Zustand。
- 正确答案以稳定 option ID 判定，不依赖显示位置。
- 320 CSS px 下无页面级横向溢出。
- 每个 Stage 交付含 `STAGE_0_TEST.md`。

## File Structure

| 文件 | 职责 |
|---|---|
| `package.json` | 依赖与脚本 |
| `index.html` | Vite 入口 |
| `src/main.tsx` | React 挂载 |
| `src/App.tsx` | 页面与交互状态 |
| `src/questions.ts` | 两道静态题与类型 |
| `src/styles.css` | Tailwind 引入 + 主题变量 |
| `src/App.test.tsx` | 交互测试 |
| `vite.config.ts` / `tsconfig*.json` | 构建与测试配置 |

## Tasks

### Task 1: 脚手架与失败测试

- [x] 创建 `package.json`、TS/Vite 配置、`index.html`。
- [x] 安装依赖。
- [x] 写 `src/App.test.tsx`：初始显示第一题；点错显示 Wrong 与正确答案；重复点击结果不变；Next 后显示第二题且状态重置；点对显示 Correct。
- [x] 运行 `npm run test`，确认因 `App` 未实现而失败。

### Task 2: 最小实现

- [x] 实现 `src/questions.ts`（两题、稳定 ID）。
- [x] 实现 `src/App.tsx`、`src/main.tsx`、`src/styles.css`。
- [x] 运行 `npm run test`，确认全绿。
- [x] 运行 `npm run build` 与 `npm run typecheck`。

### Task 3: 人工烟测与记录

- [x] `npm run dev`，按 Stage 0 四步脚本操作。
- [x] 360px / 320px 宽度检查布局。
- [x] 写 `docs/STAGE_0_TEST.md`。

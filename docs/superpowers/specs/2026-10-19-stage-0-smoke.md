# Stage 0 — 最小功能烟测设计

**来源：** `docs/Development_CN.md` 第 11 章 Stage 0
**日期：** 2026-10-19
**范围锁定：** 只做 Stage 0。不引入题目引擎、KaTeX、数据库、Capacitor、三模式。

## 目标

用尽可能少的代码验证：React 页面可启动、四选一可点击、正误反馈可见、提交后锁定、`Next` 切到第二题、移动端宽度不横向溢出、生产构建成功。

## 技术选择

| 项 | 选择 | 理由 |
|---|---|---|
| 构建 | Vite + React + TypeScript | 文档 8.2 已锁定 |
| 样式 | Tailwind CSS + 原生 CSS | 文档 8.2 已锁定；Stage 0 只用少量工具类与 CSS 变量 |
| 测试 | Vitest + Testing Library + jsdom | 文档 14 要求每阶段最小门禁含 Vitest |
| 公式 | 纯文本 | KaTeX 按文档留到 Stage 1 |

## 交互契约

1. 页面显示标题、当前题目、四个选项按钮。
2. 点击任一选项后立即判定，显示 `Correct` 或 `Wrong`，并在答错时显示正确选项内容。
3. 同题提交后按钮全部禁用；再次点击不改变结果。
4. `Next` 切到第二道写死题，并清空选择、反馈与锁定状态。
5. 第二题答完后 `Next` 循环回第一题（Stage 0 仅两题轮播）。
6. 360px / 320px 宽度下无页面级横向溢出。

## 非目标

- 随机题、KaTeX、键盘输入、题目轮播池、计时、模式选择、持久化。
- 任何 `src/core` 架构拆分（Stage 1/3 再做）。

## 验收

- `npm run dev` 可启动并完成 4 步人工烟测。
- `npm run test` 通过。
- `npm run build` 成功。
- 产出 `docs/STAGE_0_TEST.md`。

# STAGE_0_TEST

- **Commit / 版本：** 工作区（未提交）；`eulerally@0.0.0`
- **日期：** 2026-10-20
- **平台与设备：** macOS Darwin 25.3.0（Apple Silicon）；Node v26.0.0 / npm 11.12.1；Chromium 无头浏览器 360×740 与 320×640（Playwright）
- **启动与构建命令：** `npm install` → `npm run dev`（Vite 7.3.7，http://localhost:5173/）；`npm run build`；`npm run typecheck`
- **新增可操作功能：** 单页两道写死四选一题；点击选项显示 Correct / Wrong，答错同时显示正确答案；提交后该题按钮全部禁用；`Next` 切题并重置状态。

## 手动步骤 / 预期结果 / 实际结果

| # | 步骤 | 预期结果 | 实际结果 |
|---|---|---|---|
| 1 | `npm install && npm run dev`，打开开发地址 | 出现标题、题目 `2 + 3 = ?` 和四个按钮 | PASS — 标题、提示语、题目、A–D 四个按钮均显示 |
| 2 | 点 `A. 4`（错误），再点其他选项 | 显示 `Wrong` 与 `Correct answer: 5`；再次点击结果不变 | PASS — 状态保持 Wrong，按钮全部 disabled |
| 3 | 点 `Next`，再点 `B. 56` | 切到 `7 × 8 = ?`，反馈清空，焦点落在新题目；点击后显示 `Correct` | PASS — live region 清空，`document.activeElement` 为新题标题，显示 Correct |
| 4 | 开发者工具切到 360px / 320px 宽；`npm run build` | 四选项可见可点、无横向溢出；构建成功 | PASS — 移除 `overflow-x: hidden` 后仍 `scrollWidth - clientWidth = 0`；`vite build` 退出码 0 |
| 5 | 键盘操作：Tab 到选项 → 作答 → Tab 到 Next → Enter | 焦点不丢失，新题目被读屏播报 | PASS — 焦点移至新题标题（`tabIndex={-1}`） |

## 自动测试

| 命令 | 结果 |
|---|---|
| `npm run typecheck` | 通过（`tsc --noEmit`，0 错误） |
| `npm run test` | 通过，1 个测试文件 / 5 个用例 |
| `npm run build` | 通过，`dist/` 产出 JS 224.48 kB（gzip 70.09 kB）、CSS 7.12 kB（gzip 2.30 kB） |
| 浏览器烟测（Playwright，临时脚本） | 5/5 通过；页面无 console error / page error |

## 失败项和已知限制

- 初版安装的 `vitest@3` 带入 tinypool / @vitest/mocker 的 3 个漏洞（1 moderate / 2 critical）；已升级到 `vitest@5.0.5` + `jsdom@30.1.3`，`npm audit` 现为 **0 vulnerabilities**，typecheck / test / build 均重新通过。
- 题目为两道写死数据，`Next` 在第二题后会循环回第一题；Stage 1 由题目轮播替换。
- 未实现 KaTeX、键盘输入、触觉反馈、计时与持久化——按计划属于后续 Stage。
- 未在真实 Android 设备验证（Stage 5 起）。
- 代码评审后修正：`Next` 后焦点落到新题目标题，避免禁用按钮丢焦点导致读屏无提示；反馈区合并为单一 `role="status"`，避免嵌套 live region 重复播报；移除 `body { overflow-x: hidden }` 以免掩盖真实溢出。

## 截图或录屏

- `/tmp/eulerally-smoke/320.png`（320×640 布局，临时文件，未纳入仓库）

## 是否达到 Stage Done

**PASS** — 功能实现、自动验证、人工烟测、测试记录四项齐全。

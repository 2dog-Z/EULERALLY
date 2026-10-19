# EULERALLY

## 数学直觉与心算训练游戏 — 产品需求与开发设计文档

**版本：** v1.3（规则统一与去重整合版；Web 在线 + Android APK 离线）  
**阶段：** 可逐 Stage 验收的实施规划  
**平台：** Web（在线访问，不要求离线）+ Android（Capacitor APK，必须离线运行）；不开发 PWA / iOS / Electron  
**目标用户：** 学过微积分、向量微积分、线性代数、抽象代数、离散数学、数论的大学数学专业学生及数学爱好者  
**核心交互：** 四选一；Time Attack / Survival / Zen 三种模式。

---

# 1. 产品定位

EULERALLY 是面向大学数学背景玩家的数学直觉与心算训练游戏。通过短时、明确、可校验的四选一题目，训练数值感、数学结构识别、心算能力、性质判断及数学反应速度。

> See the structure. Trust your intuition. Answer fast.  
> 看到结构，形成直觉，快速作答。

## 1.1 设计原则

1. **Fast to understand, hard to master：** 题目尽量在 1–3 秒内读懂，标准题目通常在 3–15 秒内可用心算或结构识别解出。
2. **数学深度 ≠ 运算量：** 优先考察结构，不以长计算充当高难度。
3. **统一四选一：** A/B/C/D，支持触控与键盘。
4. **正确性优先：** 每题有完整假设、四个数学意义不同的选项和恰好一个正确答案；反馈规则统一见第 3.1 章。
5. **训练迁移：** 同技能使用多个模板与表现形式，避免只记住答案位置或机械重复模板。

例：比起计算复杂不定积分，更推荐判断

$$
\int_{-2}^{2}x^5e^{x^2}\,dx=0
$$

因为它考察奇偶性。

---

# 2. 三种游戏模式

## 2.1 Time Attack — 限时挑战

**目标：** 规定时间内尽可能多地答对题目。

| 项目 | MVP 规则 |
|---|---|
| 默认时长 | 60 秒 |
| 后续可选时长 | 30 / 60 / 120 秒 |
| 形式 | 四选一 |
| 单题时间 | 无单题上限，总倒计时持续 |
| 答对 | 正确题数 +1 |
| 答错 | 不得分，不结束 |
| 跳过 | 初版不允许 |
| 难度 | 开局固定 |
| 结束条件 | 总时间归零 |
| 主成绩 | 正确题数 |

$$
\text{Score}=\text{Correct Answers},\qquad
\text{Accuracy}=\frac{\text{Correct Answers}}{\text{Total Answers}}
$$

**MVP 本地纪录：** 按时长、难度、知识范围分别记录玩家个人最佳成绩；同分依次比较准确率、平均正确作答时间。在线排行榜与跨玩家分榜仅列入未来规划（第 9.2 章）。

**流程：** 选择模式 → 选择难度和知识范围 → 3/2/1 倒计时 → 作答 → 立即反馈 → 下一题 → 时间结束 → 结算/错题回顾/再来一局。

**反馈建议：** 答对约 180ms；答错显示正确答案，初始展示约 900ms（建议试玩调整范围 700–1000ms）。反馈阶段锁定输入且持续计入 60 秒倒计时；若截止时间先到，立即结算，不为反馈额外延时。复杂公式须保证可辨认，必要时调整字体与布局而非强制固定时长。

**计时与暂停：** 使用 `performance.now()` 等单调时钟按真实经过时间计算；Time Attack **不允许暂停倒计时**，标签页切换、锁屏和退出确认弹窗均不停止计时；只接受截止前收到的首次输入。进程被杀时会话标记为 `interrupted`，不得算入有效完成成绩；输入与结算优先级见第 8.5 章。题目提前本地生成，避免网络延迟。

**结果展示：** Correct、Wrong、Accuracy、Average Response、Best Streak。

**后续扩展：** 固定种子的 Daily Sprint 见第 9.2 章，不属于当前 MVP。

## 2.2 Survival — 生存模式

**目标：** 没有总时限，连续答对；答错一次立即结束。

| 项目 | MVP 规则 |
|---|---|
| 总时长 | 无限 |
| 单题时限 | 无 |
| 答对 | 连胜 +1 |
| 答错 | 立即结束 |
| 跳过 | 不允许 |
| 难度 | 随连胜逐级上升 |
| 排名指标 | 最长连胜 |
| 暂停 | 任意时刻允许暂停；后台或锁屏时自动保存当前题目并暂停 |

建议进阶节奏：

| 连胜数 | 阶段 |
|---|---|
| 0–4 | Warm Up |
| 5–14 | Standard |
| 15–29 | Advanced |
| 30–49 | Expert |
| 50+ | Master |

难度提升应体现概念、结构和思维步骤的变化，而不只是更大的数字。

**结束页：** `RUN ENDED`、连胜数、最终失误题目、玩家答案、正确答案、Retry、Review Run；反馈内容遵循第 3.1 章。

无限时间意味着玩家可查资料；MVP 的个人最高连胜仅作为娱乐性纪录，不声称考试级防作弊。

## 2.3 Zen — 禅模式

**目标：** 无时间压力、无失败惩罚，专注理解和长期训练。

| 项目 | MVP 规则 |
|---|---|
| 时限 | 无 |
| 答错 | 不结束、不扣分 |
| 跳过 | 允许 |
| 错题反馈 | 遵循第 3.1 章 |
| 难度 | 自选，后续支持自适应 |
| 知识范围 | 自由选择 |
| 排行榜 | 无 |
| 记录 | 保存技能表现、错题、思考时间 |

**双阶段流程：**

1. 作答：呈现题目和四个选项；首次提交后判定正误并锁定该题。
2. 反馈：按第 3.1 章显示结果；答对或答错后由玩家主动点击 `Next Question`。`Practice Similar` 生成相同技能、不同具体参数的迁移题。**跳过（Skip）直接进入下一题，不展示正确答案，不计 Correct/Wrong，单独记为 Skipped。**

后续可加入 Explore（探索）、Practice（专项）、Weakness Training（弱项训练）。Zen 不显示紧张的倒计时和惩罚性动画。

---

# 3. 四选一交互设计

## 3.1 操作规则

**统一反馈规范（唯一规则来源）：** 答对显示 `Correct`；答错显示 `Wrong`、玩家选择及**正确答案**，不提供解释、原因、公式推导、解题步骤或 `Key Insight`。Time Attack 在限定反馈时长后自动切题，且反馈计入总倒计时；Survival 首次答错进入结算页并保留正确答案；Zen 答错后保留正确答案，玩家主动 `Next`。错题回顾只呈现题目、玩家选择、正确答案和技能标签。Zen 的 Skip 不判错、不显示答案、单独计数。

- 每题固定四个选项，选项具有稳定内部 ID，显示位置随机。
- 桌面端支持 `1/2/3/4` 或 `A/S/D/F`（设置中选择）；Zen 支持 Enter/Space 下一题；Esc 打开模式菜单。Time Attack 的菜单不暂停计时；Survival / Zen 可以暂停。
- 移动端采用 2×2 大按钮，最小触控目标 44×44 CSS px；长公式自动换行或允许公式局部横向滚动。
- 作答提交后锁定当前题输入；反馈结束后解锁下一题。
- 显示焦点指示、文字/图标正误提示，不能只靠颜色。

## 3.2 题型语义

| 类型 | 英文名 | 玩法 |
|---|---|---|
| 精确值 | Exact Value | 计算确定值，如 $3^{100}\bmod7$ |
| 近似值 | Approximation | 选择最接近的估算值 |
| 比较 | Comparison | 比较两个表达式大小或增长率 |
| 性质判断 | Property Recognition | 判断矩阵、群、函数等性质 |
| 收敛判断 | Convergence | 判断收敛、条件收敛、发散 |
| 结构识别 | Structure Recognition | 识别秩、阶、循环节、不变量 |
| 反例选择 | Counterexample | 四项中找到违反命题者 |
| 方法识别 | Method Recognition | 选择最直接适用的方法 |

如真假命题只有两个自然答案，建议改成“下列四个命题中哪一个成立/不成立”，但这类题阅读较慢，应主要放在 Zen 或较高难度 Survival。

---

# 4. 数学课程覆盖与题库蓝图

基于已学的 Mathematics 1A/1B、Vector Calculus、Linear and Abstract Algebra、Discrete Mathematics、Number Theory。部分课程名称曾在截图中截断，具体知识范围需以实际课程大纲校准。

## 4.1 模块优先级

| ID | 模块 | 优先级 | 代表技能 |
|---|---|---|---|
| NUM | Numerical Sense | P0 | 指数对数估算、Taylor、数量级 |
| CAL | Calculus | P0 | 导数、极限、积分对称、级数 |
| VEC | Vector Calculus | P1 | 梯度、方向导数、散度、旋度、Jacobian |
| LIN | Linear Algebra | P0 | 行列式、秩、零空间、特征值、正定性 |
| ALG | Abstract Algebra | P0 | 元素的阶、循环群、同态、环与域 |
| NT | Number Theory | P0 | 整除、模幂、欧拉函数、模逆元、同余 |
| DIS | Discrete Mathematics | P1 | 组合计数、图论、递推、逻辑等价 |
| LOG | Mathematical Logic | P1 | 命题、反例、缺失假设 |
| PAT | Pattern Recognition | P1 | 数学结构、工具识别、跨领域迁移 |

## 4.2 推荐长期模板清单

| 模块 | 子题型 | 目标模板数 |
|---|---|---:|
| Numerical | 指数/对数近似 | 8 |
| Numerical | Taylor 近似 | 8 |
| Numerical | 数量级比较 | 8 |
| Calculus | 快速求导 | 8 |
| Calculus | 极限 | 12 |
| Calculus | 积分对称性 | 8 |
| Calculus | 级数收敛 | 10 |
| Calculus | 单调性/凸性 | 6 |
| Vector | 梯度 | 6 |
| Vector | 散度/旋度 | 8 |
| Vector | Jacobian | 6 |
| Vector | 方向导数 | 6 |
| Linear | 行列式 | 12 |
| Linear | 秩/零空间 | 10 |
| Linear | 特征值 | 10 |
| Linear | 正定性 | 8 |
| Linear | 线性相关/正交性 | 8 |
| Algebra | 元素的阶 | 8 |
| Algebra | 循环群 | 8 |
| Algebra | 群同态 | 6 |
| Algebra | 环与域 | 8 |
| Number Theory | GCD/整除 | 8 |
| Number Theory | 模运算 | 12 |
| Number Theory | 欧拉函数 | 8 |
| Number Theory | 模逆元 | 8 |
| Number Theory | 同余方程 | 8 |
| Discrete | 组合计数 | 10 |
| Discrete | 图论性质 | 10 |
| Discrete | 递推关系 | 8 |
| Discrete | 逻辑等价 | 8 |
| Logic | 命题判断变体 | 10 |
| Logic | Missing Assumption | 8 |
| Logic | Counterexample | 8 |
| Pattern | 结构比较 | 8 |
| Pattern | 方法识别 | 8 |
| Pattern | 跨领域关联 | 6 |
| **合计** | **35 子题型** | **290** |

**路线：** 原型 20 模板；MVP 50–60 模板；长期约 290 模板。题目总数不是核心指标，模板间的技能多样性和题目质量更重要。

## 4.3 示例题目

- **Calculus：** $\int_{-3}^{3}x^5\cos x\,dx=0$（奇函数）。
- **Vector：** $\mathbf F(x,y)=(-y,x)$ 的二维标量旋度为 $2$，散度为 $0$。
- **Linear：** $\det\begin{pmatrix}101&102\\102&103\end{pmatrix}=-1$。
- **Abstract Algebra：** $\operatorname{ord}_{\mathbb Z_{12}}(3)=4$。
- **Number Theory：** $\varphi(45)=24$；$3^{100}\bmod7=4$。
- **Discrete：** 15 个顶点的树有 14 条边。
- **Logic：** “所有有限整环都是域”成立。
- **Pattern：** 看到 $A^TA$ 识别实矩阵上的半正定性。

---

# 5. 题目生成与校验系统

## 5.1 程序化模板生成流程

```text
模式/知识范围/难度
    → 选择 Skill
    → 选择 Template
    → 生成受约束的参数
    → 独立计算标准答案
    → 生成语义合理的错误选项
    → 校验答案与选项唯一性
    → 校验数学前提、难度和格式
    → 打乱选项
    → 放入题目缓冲池
```

不建议把实时大语言模型输出直接用于正式竞技题；AI 可辅助编写模板草稿，正式题需通过自动校验与人工审核。

## 5.2 数据结构

```ts
interface AnswerOption {
  id: string;
  content: string; // TeX or plain text
}

interface Question {
  id: string;
  templateId: string;
  templateVersion: number;
  category: string;
  subcategory: string;
  skillId: string;
  difficulty: QuestionDifficulty; // 第 6.1 章的双维度定义
  prompt: string;
  options: [AnswerOption, AnswerOption, AnswerOption, AnswerOption];
  correctOptionId: string;
  estimatedTime: number;
  seed: string;
}
```

**注意：** 正确答案应绑定稳定 `Option ID`，不能存为 `A/B/C/D`，因为选项会重排。`QuestionDifficulty` 在第 6.1 章定义，玩家可见难度由独立映射函数计算。

### 会话与作答记录契约

```ts
type GameMode = 'timeAttack' | 'survival' | 'zen';
type SessionStatus = 'active' | 'completed' | 'interrupted';

type AnswerOutcome = 'correct' | 'wrong' | 'skipped';

interface AnswerRecord {
  id: string;               // 一次作答/跳过的唯一 ID
  sessionId: string;
  questionInstanceId: string;
  questionId: string;
  selectedOptionId?: string; // Skip 时不存在
  correctOptionId: string;
  outcome: AnswerOutcome;
  responseTimeMs?: number;    // Skip 可不计入平均正确作答时间
  timestamp: number;
}

interface GameSession {
  id: string;
  mode: GameMode;
  status: SessionStatus;     // 与第 8.5 章 UI GameState 分离
  difficultyPreset: 'Foundation' | 'Standard' | 'Advanced' | 'Expert';
  categories: string[];
  startedAt: number;        // 可持久化的墙钟时间戳
  completedAt?: number;
  durationMs?: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  currentStreak: number;
  bestStreak: number;
  questionIndex: number;
  currentQuestionSnapshot?: Question;
  rngState?: string;        // 可序列化的 PRNG 状态
}
```

`AnswerRecord` 存入独立的 `answers` 表，并通过 `sessionId` 查询；不在 `GameSession` 中冗余持有完整 answers 数组。`Question` 快照供 Survival / Zen 恢复使用，历史错题只需最小可重建信息与展示字段。

## 5.3 模板：模幂

$$
a^n\bmod m
$$

参数包括 `base, exponent, modulus`，应约束模数大小、底数与模数关系、周期长度和推理步骤。

例：$3^{100}\bmod 7=4$，因为 $3^6\equiv1\pmod7$ 且 $100\equiv4\pmod6$。

使用 `BigInt` 快速模幂求精确答案；避免先求大整数指数再取模。

## 5.4 模板：结构化行列式

$$
A=\begin{pmatrix}n&n+k\\n+k&n+2k\end{pmatrix},
\qquad\det A=-k^2.
$$

例如 $n=100,k=3$，正确答案是 $-9$。可设计：$9$（符号错误）、$0$（误判相关）、$-3$（忘记平方）。

## 5.5 Distractor Generator

| 错误类型 | 示例 |
|---|---|
| Sign Error | $-5\to5$ |
| Off-by-One | $n-1\to n$ |
| Formula Error | 错用行列式公式 |
| Concept Confusion | 正定与半正定混淆 |
| Approximation Error | 忽略二阶项 |
| Boundary Error | 漏掉 $p=1$ 的特殊情况 |
| Arithmetic Error | 常见心算失误 |

检查：选项两两数学意义不同；仅一个正确；不通过长度/格式泄露答案；近似题没有多个同样接近的答案；必要时用精确代数或独立算法检测等价性。复杂表达式无法可靠确认等价时拒绝重生。

## 5.6 校验体系

1. **参数合法性：** 定义域、非零分母、模逆元存在、矩阵维度等。
2. **精确答案：** 尽量使用整数、有理数、符号和离散数学判定算法。
3. **唯一正确性：** 恰好一个可接受答案，无数学等价重复。
4. **题目质量：** 完整假设、目标时间、合理干扰项、无近期重复。

为模板编写边界测试、性质测试和大量随机测试；重要计算使用纯 TypeScript 独立实现、固定数学样例及性质测试交叉验证，避免同一错误函数既生成又校验。

---

# 6. 难度与自适应

## 6.1 内部双维度

- **Mathematical Depth (D1–D5)：** 相关概念抽象程度。
- **Mental Complexity (M1–M5)：** 需要的心算和推理步骤数。

| 示例 | Depth | Complexity |
|---|---:|---:|
| $7\times8$ | 1 | 1 |
| $\lim_{x\to0}\sin x/x$ | 2 | 1 |
| $\mathbb Z_7$ 是否为域 | 4 | 1 |
| 特殊结构行列式 | 2 | 3 |
| 多条件群同构 | 4 | 4 |

```ts
type DifficultyLevel = 1 | 2 | 3 | 4 | 5;
interface QuestionDifficulty {
  depth: DifficultyLevel;
  mentalComplexity: DifficultyLevel;
}
```

玩家可见：Foundation、Standard、Advanced、Expert。初版映射采用可测试的确定性策略：计算 `tier = max(depth, mentalComplexity)`；Foundation 对应 1、Standard 对应 2、Advanced 对应 3、Expert 对应 4–5。该映射是 **MVP 的默认实现假设**，可在试玩后调整，但更改应有配置/版本记录。Zen 的 Adaptive 属于未来功能。

- Time Attack：难度固定，以便比较成绩。
- Survival：根据连胜逐渐提高难度。
- Zen：自选难度，后续按薄弱技能自适应。

## 6.2 按技能记录

示例：

```text
Linear Algebra
  Determinant Structure: 92%
  Matrix Rank: 82%
Number Theory
  Modular Exponents: 74%
  Modular Inverse: 58%
```

根据正确率、耗时、近期复习和探索需求分配题目。低样本数时标注“数据不足”，避免将观察值等同于精确掌握程度。

---

# 7. 界面与交互流程

## 7.1 视觉方向

**Minimalist Mathematical Arcade：** 数学公式居中突出，深色/浅色主题、高对比度、大按钮、少量强调色、短音效与轻微动画。不用复杂 HUD 淹没数学题。

## 7.2 首页

```text
EULERALLY
TRAIN YOUR MATH INTUITION

[TIME ATTACK]  Solve as many as you can
[SURVIVAL]     One mistake. Game over.
[ZEN]          No pressure. Just math.

Statistics      Settings
```

## 7.3 Time Attack 页面

```text
TIME ATTACK                         00:38
SCORE 12                          STREAK 5

           LINEAR ALGEBRA

     det [[101, 102], [102, 103]] = ?

    [A. 1]             [B. -1]
    [C. 0]             [D. 2]

            QUESTION 15
```

## 7.4 Survival 页面

```text
SURVIVAL                            EXPERT
                 27
           CURRENT STREAK

            NUMBER THEORY
              φ(45) = ?

    [A. 18]           [B. 24]
    [C. 30]           [D. 36]

       Take your time. Stay alive.
```

## 7.5 Zen 页面

```text
ZEN                                 EXIT
Abstract Algebra · Cyclic Groups
Question 14

Order of 3 in Z₁₂ = ?

    [A. 3]            [B. 4]
    [C. 6]            [D. 12]

          Take your time.
```

答题后的界面按第 3.1 章统一反馈规范处理；Zen 提供 `Practice Similar` 和 `Next Question`，Skip 直接切题。

## 7.6 游戏结束页面

- Time Attack：Correct、Wrong、Accuracy、Average Time、Best Streak、Play Again、Review Mistakes。
- Survival：Streak、终结题目、玩家答案与正确答案、Try Again、Review Run（遵循第 3.1 章）。
- Zen：无需传统 Game Over，可随时退出或查看本次练习摘要。

---

# 8. 技术架构与 Web/Android 落地方案

## 8.1 已确定的技术决策（不可隐式改变）

- **平台仅 Web + Android。** Web 版通过浏览器在线访问，不开发 PWA 或 Web 离线缓存；Android 版是可离线安装和启动的 APK。没有 iOS、Electron 或运行时 Node.js 服务。
- **数学题目全部由 TypeScript 在设备本地生成、求值、生成干扰项、验证和缓存。** 不使用 Python、SymPy、Flask、FastAPI、远程题目 API，也不需要手机本地 HTTP 服务器。
- **一套代码共用：** React UI + 与 React/DOM/Capacitor 解耦的纯 TypeScript Math Engine；用 Capacitor Android WebView 承载 APK 内的静态构建资源。
- **离线边界：** Android 包含所有运行资源，必须首装断网可玩；Web 在线静态托管，不提供 PWA 或离线承诺；具体发布与测试分别见第 8.6、8.7 章。
- **原生游戏式交互：** Android 不出现浏览器地址栏；答题屏禁止整页滚动、误选文本与无意缩放。错题回顾、设置、统计页面仍应允许必要的内容滚动和无障碍操作。
- **后端为非 MVP 范围。** 不提供在线排行榜、云账号或跨端同步；Web 的浏览器存储与 Android APK 存储相互独立，未来扩展见第 9.2 章。

## 8.2 技术栈

| 用途 | 已选技术 | 原则 |
|---|---|---|
| 语言 / UI | TypeScript + React | 业务逻辑与 UI 分离 |
| 构建 / Web 部署 | Vite | 本地构建 `dist/`，静态托管 |
| CSS / 适配 | Tailwind CSS + 原生 CSS | Android 游戏屏单独限制触控行为 |
| 数学显示 | KaTeX（本地打包字体） | 不加载外部 CDN |
| 状态 | Zustand + 纯 TS 状态机 | 单题只提交一次 |
| 本地存储 | IndexedDB + Dexie；少量设置用 localStorage | 离线优先、结构化作答记录 |
| Web 发布 | Vite 静态文件托管 | 在线访问即可；不引入 PWA/Service Worker 离线缓存 |
| Android | Capacitor + Android Studio/Gradle | 打包 APK；必要的原生行为适配 |
| 原生触觉 | Capacitor Haptics（可选） | 仅 Android 有效；允许关闭 |
| 数学精确计算 | BigInt + 自研 Rational + 受限数学模板 | 不尝试实现全能 CAS |
| 运行时 schema | Zod | 模板和题目数据校验 |
| 单元 / 属性 / E2E | Vitest + fast-check + Playwright | 数学与玩法都自动验证 |
| 服务端 / Python | **无** | 不列入构建和运行依赖 |

## 8.3 模块边界与目录

```text
eulerally/
├── src/
│   ├── core/                  # 纯 TypeScript，不引用 React、DOM、Capacitor
│   │   ├── math/              # bigint、rational、gcd、modPow、matrix 等
│   │   ├── questions/         # 模板注册、受约束参数、答案/干扰项、校验、去重
│   │   │   └── templates/     # calculus、linear、algebra、numberTheory 等
│   │   ├── rng/               # 有版本号、可复现的 PRNG
│   │   └── game/              # 纯 TS 三模式规则与状态机
│   ├── ui/                    # React 组件、页面、KaTeX 渲染
│   ├── stores/                # Zustand；连接 UI 和 core
│   ├── storage/               # Dexie 仓储、迁移、备份恢复策略
│   ├── platform/              # web/android adapter：触觉、后台、返回键、全屏
│   ├── styles/
│   └── App.tsx
├── public/                   # 随 APK 打包的图标、字体和音效
├── tests/                    # unit / property / integration / e2e
├── android/                  # `npx cap add android` 后由 Capacitor 生成
├── capacitor.config.ts
├── vite.config.ts
└── package.json
```

**依赖方向：** `core` 不导入 `ui` / `platform` / `storage`；`ui` 仅调用 core 和仓储接口；Capacitor 平台特性通过 `platform` 接口隔离。Web 端不得因为 Capacitor 插件不存在而崩溃。

## 8.4 本地题目生成与数学正确性

```text
Category + Skill + Difficulty + RNG Seed
    → 选择 Template(含 version)
    → 生成合法参数（不满足则有限次重试）
    → 专用精确求值函数（BigInt / Rational / 有证明的规则）
    → 专属错误模型生成 3 个 distractors
    → 独立验证 + 语义去重 + 唯一正确选项校验
    → 确定性洗牌 → 缓冲队列 → React 显示
```

- `QuestionTemplate.generate(rng, constraints)`、`validate(question)`、`getMetadata()` 应为纯函数或确定性接口；题目 `id` 包含模板版本和参数标识。
- **不依赖通用符号引擎。** 极限、级数、群论等使用数学上已验证的有限模板和参数约束；验证不了的表达式直接弃题重生。
- **校验执行：** 第 5.6 章是数学正确性的规范来源。本模块实现精确数学函数、独立交叉校验与自动/人工测试；`BigInt` 表示整数，`Rational` 规范约分与负号并拒绝零分母，近似题必须事先规定舍入规则。
- 随机生成的复现和版本规则以第 9.2 章为准；重试次数有上限，失败时回退到已验证题库，不显示空白题。
- 开局预生成约 30 题；低于 10 题时补齐约 20 题；复杂模板可以交给 Web Worker。所有运行资源打包在 APK 内。

## 8.5 游戏状态、计时与输入

```ts
type GameState =
  | 'menu' | 'preparing' | 'countdown'
  | 'playing' | 'feedback' | 'paused' | 'finished';
// 会话持久状态 SessionStatus 在第 5.2 章单独定义。
```

**状态转换主干：** `menu → preparing → countdown → playing ⇄ feedback → finished`。Zen 可跳过 `countdown`；Survival / Zen 允许 `playing/feedback → paused → 原状态`；Time Attack **不得进入** `paused`。Survival 答错直接进入 `finished`；Zen Skip 从 `playing` 直接进入下一题的 `playing`，先写入 skipped 记录。

- **Time Attack：** `deadline = performance.now() + durationMs`；同一进程内用单调时钟判断输入截止。后台切换后以实际时间流逝结算；Time Attack 退出确认界面仅覆盖 UI、不停止计时。进程被杀死后保存的 `SessionStatus` 设为 `interrupted`，不计入有效个人最佳纪录；不能把进程重启后的 `performance.now()` 与旧起点直接相减。
- **Survival：** 任意时刻手动/后台暂停，保存当前题快照、RNG 状态与会话进度；首错立即结束。恢复时保持同一题，不重新抽题。
- **Zen：** 任意时刻手动/后台暂停，答题与 Skip 每次提交后立即保存；恢复保持原题。Skip 不显示正确答案，不计入正确率分母。
- **统一输入与截止优先级：** 一道题用 `questionInstanceId` + 提交锁去重；对于 Time Attack，首先以收到输入时的单调时钟判断是否过期，过期直接结束；有效提交只能记一次。反馈期间与切题过渡忽略额外操作，到截止时立即结算。

## 8.6 Android APK 与手机式交互

**发布路径：** `npm run build` → `npx cap sync android` → Android Studio/Gradle 生成调试 APK 或签名 APK；`webDir: 'dist'`，发布版不得依赖 `server.url` 远程站点。正式发布需保管签名密钥并测试升级时的本地数据保留。

- Android Capacitor 使用 App 内 WebView 加载随包静态资源；没有浏览器地址栏和标签栏，也**不需要**运行 Python/Node/HTTP 服务。
- **答题屏** 使用屏幕内固定区域、`overscroll-behavior: none`、局部 `touch-action: none`、`user-select: none`；按钮正常触控。错题回顾/历史/设置屏使用 `overflow-y: auto` 和 `touch-action: pan-y`，不能把长内容裁掉。
- 在 Android 配置关闭 WebView 缩放（如 Capacitor 的 `android.zoomEnabled: false`）；不要为了阻止缩放破坏公开 Web 版用户的阅读辅助能力。不同设备需实测长按选词、双指放大、橡皮筋滚动和系统返回手势。
- 可在游戏中使用沉浸式状态栏/导航栏，但遵守 Android 系统手势与无障碍要求；首页、设置、结果页恢复常规系统栏。
- Android 以竖屏为首版目标；适配刘海/打孔、安全区域和底部导航手势。不可直接将桌面布局缩小。
- Capacitor App 生命周期 + Web `visibilitychange`：按第 8.5 章执行各模式计时、暂停与恢复；Android 返回键先打开退出确认，不得误退整局（Time Attack 确认弹窗不冻结倒计时）。
- 触觉反馈使用 Capacitor Haptics（可选）并提供静音/关闭设置；Web 端无插件时安全退化，不影响答题。
- **首装飞行模式测试为硬性验收**：数学字体、题库、音效、成绩保存均不得请求 CDN 或 API。

## 8.7 Web 在线发布（不开发 PWA）

- Web 版本通过 Vite 构建成 `dist/`，上传普通静态托管服务，以网址访问；**不实现 PWA、Service Worker 缓存、网页离线安装或离线重启**。
- Web 版可以在网络正常时完成三种模式；题目仍由浏览器中的 TypeScript 引擎本地生成，不需要远程出题 API。页面首次加载和刷新需要网络属于可接受行为。
- Web 资源版本更新使用静态托管的正常部署流程；如需避免游戏中刷新，可只在非游戏页面提供新版本提示，无须开发离线更新机制。
- Web 可以保留正常文字复制和辅助缩放；仅答题交互区域按需要限制滚动和误触。Android 的严格游戏式交互由平台适配层处理。
- **独立验收边界：** 网站在线可访问是 Web 的验收条件；飞行模式游玩属于 Android APK 验收条件。**Web 与 APK 各自本地保存**，同一设备上两者的历史数据也不自动同步。

## 8.8 本地存储与版本迁移

- Dexie 表：`sessions`、`answers`、`skillStats`、`reviewQueue`、`settings`，遵循第 5.2 章的数据契约。`answers` 通过 `sessionId` 关联 `sessions`；必要的题目快照、seed 和模板版本应保存在可恢复/可回顾的数据中。
- **持久化与恢复是两项不同能力：** 每次答题、Skip、会话结束时写入进度；已提交答案和已完成成绩在正常刷新/重启后不得丢失。Survival / Zen 在异常进程终止后尽可能恢复同一未完成题；Time Attack 进程终止后标记 `interrupted` 并排除有效纪录。写入应避免单次答案重复计数。
- 数据库 schema 必须版本化并测试升级迁移。Web 浏览器与 Android APK 的数据互不自动同步；卸载 App、清空站点数据或浏览器策略清理可能导致数据丢失，未来可提供导出备份。

---

# 9. 公平性、复现与统计

## 9.1 去重和混合出题

同一局不得重复 **规范化题目内容和四个选项完全相同** 的具体题目（选项位置变化不算新题）。普通混合训练同模板最多连续出现 2 次；Zen 专项训练可多次使用同一模板，但应改变参数，且同局不得重复相同具体题。固定 seed 的确定性去重逻辑也要参与版本测试。

## 9.2 确定性复现与未来在线竞技

**MVP 的复现契约：** 固定 seed、PRNG 算法及版本、模板及版本、参数抽样顺序、干扰项算法及版本、去重/失败重试机制、选项洗牌算法及版本、模板选择/题序算法及版本，以及难度映射版本。相同版本集合与配置必须产生相同题目、正确答案与选项位置；任一算法变更若影响输出必须更新对应版本标识，并增加固定向量回归测试。普通随机局仅用于个人练习，分数不宣称跨人公平可比。

**未来 Stage 9（非 MVP）：** 固定种子的 Daily Sprint、用户账户、云同步、在线排行榜、分享、基础异常成绩检测。未来联网服务需要单独讨论安全、后台校验和离线降级；MVP 只记录本地个人最佳，不依赖这些服务。

## 9.3 个人统计

建议记录：总题数、正确率、平均作答时间、最佳限时分数、最佳 Survival 连胜、各技能表现、错题及正确答案查看情况。学习页面根据具体技能而非仅课程名称聚合。

**示例：**

| Skill | Accuracy | Avg Time |
|---|---:|---:|
| Determinant Structure | 94% | 2.1s |
| Matrix Rank | 82% | 3.4s |
| Eigenvalues | 79% | 4.8s |
| Modular Exponents | 72% | 6.1s |
| Group Order | 91% | 2.7s |

不应仅因几次答题就推断稳定能力。错题训练最好生成同技能的新题，而不是只重复原题。

---

# 10. 性能、声音与无障碍

- **预生成：** 建议开局准备约 30 道题，低于阈值再补充；预渲染 KaTeX，减少切题卡顿。
- **计时：** 基于单调时钟与明确截止时间；反馈和后台标签切换不延长 Time Attack。
- **反馈：** Time Attack 快速、Survival 结束感较强、Zen 平静且正确答案清晰。
- **连胜：** 可展示 streak 里程碑，但 MVP 不将 combo 叠乘到主成绩。
- **设置：** 音效开关、减少动画、键位偏好、主题。
- **无障碍：** 支持键盘、可见焦点、屏幕阅读器、足够对比度、非纯颜色提示。
- **移动端：** 320px 宽仍可使用，避免页面级横向溢出；长数学表达式采用合适的局部滚动/换行策略。

---

# 11. 分阶段实施计划：每个 Stage 都必须可操作测试

## 11.1 交付契约（所有 Stage 通用）

**Stage 结束的最低标准：** `npm install` / `npm run dev` 可启动；所列新增功能可由人亲手操作；本 Stage 的自动化检查通过；提供一份简短的 `STAGE_N_TEST.md` 测试记录，包括环境、操作、预期结果、实际结果和已知问题。禁止以“代码已完成但无法操作”为 Stage 完成标准。后续阶段必须保留前阶段已通过的操作路径。

**推荐开发命令：** `npm run dev`（网页试玩）、`npm run build`（正式构建）、`npm run test`（Vitest）、`npm run test:e2e`（Playwright）；从 Stage 5 开始另增加 `npx cap sync android` 与 Android Studio APK 构建路径。

| Stage | 里程碑 | 结束后可以实际试玩什么 | 平台 |
|---|---|---|---|
| **0** | **最小功能烟测** | 打开页面 → 看到 1 道固定数学四选一 → 点击 → 看到正误 → 下一题 | Web |
| **1** | 交互完整化 | 随机题、KaTeX、键盘/触控、输入锁与反馈 | Web |
| **2** | 三模式可玩 | Time Attack / Survival / Zen 都能从首页进入并完整结束/继续 | Web |
| **3** | 本地数学引擎 | 四领域模板与精确算法，能够长时间重复玩且验证通过 | Web |
| **4** | 训练记录与体验 | 本地成绩/错题正确答案/筛选；刷新后仍保留 | Web |
| **5** | Android 首个可安装包 | 构建 APK → 手机安装 → 飞行模式打开、答题 | Web + Android |
| **6** | 手机游戏交互与生命周期 | 禁缩放/禁选择/无整页拖动、系统返回、后台恢复 | Web + Android |
| **7** | Web 正式部署与跨平台回归 | Web 在线网址可玩；Android APK 仍可断网运行；跨平台行为一致 | Web + Android |
| **8** | MVP 验收与稳定性 | 50–60 模板、统计、性能和回归测试，可公开分发 | Web + Android |

## Stage 0 — 最小功能烟测（必做第一步）

**目标：** 用尽可能少的代码验证 React 页面、纯文本算术题、按钮事件与本地静态题目数据。KaTeX 公式渲染在 Stage 1 引入。**不要**在这一阶段写题目引擎、复杂架构、数据库、Capacitor 或三模式。

**实现清单：**
- [ ] 使用 Vite + React + TypeScript 建立项目，并能 `npm run dev` 启动。
- [ ] 单一页面：标题、1 道写死的题（例如 $2+3=?$）、四个固定选项。
- [ ] 点击一个选项后显示 Correct/Wrong，并且当前题不能再次提交。
- [ ] 点击 `Next` 展示第二道写死的题，重置交互状态。
- [ ] 页面在手机宽度浏览器中不横向溢出；项目 `npm run build` 成功。

**人工烟测脚本：**
1. `npm install && npm run dev`，在浏览器打开开发服务器地址，出现标题、题目和四个按钮。
2. 故意点错 → 显示 Wrong 和正确选项；再次点击其他选项 → 结果不改变。
3. 点 Next → 换成第二题；选择正确答案 → 显示 Correct。
4. 浏览器开发者工具切到约 360px 宽 → 所有选项可见可点；执行 `npm run build` 成功。

**通过条件：** 4 步全通过，留存 Stage 0 截图/测试记录；没有报错、空白页和重复提交。**可试玩产物：** 最小网页 Demo。

## Stage 1 — 四选一交互和数学显示

**实现清单：**
- [ ] `Question` / `AnswerOption` 类型和 UI 组件；正确答案使用稳定 option ID。
- [ ] KaTeX 本地渲染（不引用 CDN）；至少支持分数、幂、矩阵。
- [ ] 先用 10–20 道已审核静态题形成题目轮播（不是完整模板引擎）。
- [ ] 支持键盘 `1/2/3/4`、触屏四按钮、重复输入锁、短反馈动画、`Next`。
- [ ] 加入最小的 React 组件与事件测试。

**人工操作验收：** 从首页进入练习 → 用触屏完成 3 题 → 用键盘完成 3 题 → 高速连点同一题只计一次 → 公式正确排版 → 手机宽度下无横向溢出。**通过条件：** 所有输入路径可玩且无重复提交。**可试玩产物：** 数学四选一练习页。

## Stage 2 — 三种游戏模式闭环

**实现清单：**
- [ ] 主页选择 Time Attack、Survival、Zen；支持重新开始和回首页。
- [ ] 统一纯 TypeScript 状态机，三模式明确的结束/继续条件；Time Attack 不可暂停，Survival/Zen 可任意时刻暂停。
- [ ] Time Attack 先固定 60 秒，计数、准确率、倒计时与结算。
- [ ] Survival 答错立即结束，正确则连胜+1；暂用静态题按连胜区间模拟难度阶段，Stage 3 再对接真实难度筛选。
- [ ] Zen 不限时；Skip 直接切题、单独记数、不显示答案；答错按第 3.1 章反馈并主动 Next。
- [ ] 计时截止、反馈锁、暂停等边界单元测试。

**人工操作验收：** Time Attack 完成一整局 60 秒、尝试暂停但倒计时仍持续；Survival 连答 2 题、测试题中暂停恢复后故意答错立即 Game Over；Zen 分别测试答错 Next 和 Skip（无答案、Skipped +1）；每个结果页可重新挑战或回首页。**通过条件：** 三条完整操作路径均可独立跑通。**可试玩产物：** 三模式网页游戏（静态小题库）。

## Stage 3 — 纯 TypeScript 本地出题引擎

**实现清单：**
- [ ] `core/math` 实现 `gcd`、`modPow(BigInt)`、有理数、基础矩阵精确运算。
- [ ] 有版本的 seeded PRNG、题目模板注册、受限参数、错误选项生成、数学唯一性校验。
- [ ] 数论 / 线代 / 微积分 / 抽象代数每类至少 5 个可运行模板（合计 ≥20）。
- [ ] 题目缓冲与模板重试失败的安全回退；按技能和难度筛选。
- [ ] Vitest 固定与边界用例，fast-check 属性测试；关键模板采用独立验证计算。
- [ ] core 的测试不得依赖 React、DOM、Capacitor 或 Python。

**人工操作验收：** 每类至少玩 10 题；连续 100 题无空白、无相同规范化题目重复（第 9.1 章）、无等价选项；混合模式同模板不连续出现超过 2 次；固定 seed 与算法版本组合产生相同题序及选项；已加载页面断网后仍能本地出题（不构成 Web 离线启动承诺）；全部模板测试通过。**通过条件：** ≥20 模板经过审核，且上述路径全部通过。**可试玩产物：** 真正的本地无限出题三模式版本。

## Stage 4 — 本地成绩、错题答案和训练配置

**实现清单：**
- [ ] 接入 IndexedDB + Dexie 的 sessions、answers、settings 及对应结构化契约；添加版本迁移测试。
- [ ] 首页模式配置：四个 P0 领域与难度选择；Time Attack 固定难度。
- [ ] 结算、历史纪录、错题回顾与 Practice Similar；错题展示遵循第 3.1 章。
- [ ] 基础知识技能统计；成绩计算与数据迁移测试。
- [ ] 单独验证已提交记录持久化、Survival / Zen 的题中恢复以及 Time Attack 中断不计入有效纪录；答题主界面保持简洁。

**人工操作验收：** 完成 Time Attack → 查看错题 → 进入 Zen 类似题 → 刷新网页后记录仍在；Survival / Zen 题中刷新后恢复相同题目；模拟 Time Attack 进程中断后该局显示 interrupted 且不计最佳纪录；修改领域筛选后题目范围变化；Survival 最佳连胜保留。**通过条件：** 历史和设置在正常重启后保留，Survival / Zen 尽可能恢复进行中题目，Time Attack 异常中断不伪造成绩，统计一致。**可试玩产物：** 带本地记录的训练版网页游戏。

## Stage 5 — Android 可安装 APK（第一个手机验收节点）

**实现清单：**
- [ ] 安装 Capacitor 核心与 Android 平台，配置 `webDir: dist` 和应用 ID。
- [ ] 执行 `npm run build && npx cap sync android`，在 Android Studio 生成可安装调试 APK。
- [ ] 把 KaTeX 字体、题目模板、CSS、图标等所有依赖打包至本地。
- [ ] 验证 Android 本地 IndexedDB 持久性和 Android WebView 兼容性。
- [ ] 记录 APK 构建命令、最小 Android 版本及实机测试设备。

**人工操作验收：** 将 APK 复制到 Android 手机 → 关闭 Wi-Fi 和移动数据（飞行模式）→ 首次安装 → 从桌面图标打开 → 三种模式均能答题 → 完成一局并退出重开 → 成绩仍在。**通过条件：** 不需要网络、远程服务器或 Python；APK 启动无地址栏/白屏。**可试玩产物：** 首个真正可离线安装的 APK。

## Stage 6 — Android 游戏级交互与系统生命周期

**实现清单：**
- [ ] 答题屏不整页滚动，不支持普通长按选词和误触缩放；查看历史/错题回顾页面仍能滚动。
- [ ] 设置 WebView 缩放控制和 Android 竖屏布局；处理安全区域。
- [ ] 统一平台适配层：Android 返回键、App 后台、前台、可选触觉反馈。
- [ ] Time Attack 后台继续按真实经过时间结算；Survival 和 Zen 自动暂停/恢复。
- [ ] 游戏屏可选沉浸式显示；其它页面安全回退系统栏；保留无障碍操作。

**人工操作验收：** 答题时上下划动/双指缩放/长按题目不会产生浏览器式误操作；Zen 正确答案清楚可见，历史/错题回顾长内容能滚动；按 Android 返回键打开确认；切后台 70 秒后回到 Time Attack 应已结束，Survival/Zen 能继续；触觉反馈可关。**通过条件：** Android 真机逐项通过；网页端原有操作不回归。**可试玩产物：** 手感接近原生手机游戏的 APK。

## Stage 7 — Web 正式部署与跨平台操作测试

**目标：** 将现有 Web 游戏部署到真实 HTTPS 网址，并验证浏览器与 Android APK 的同一套玩法；**不开发 PWA 或任何 Web 离线能力**。

**实现清单：**
- [ ] 配置 Vite 生产构建并将 `dist/` 发布至静态网站托管；提供可公开访问的 HTTPS 地址。
- [ ] 检查生产环境静态资源路径、KaTeX 字体、音效及刷新/路由加载（如采用客户端路由，配置静态托管回退）。
- [ ] 测试桌面浏览器与 Android 手机浏览器的答题、键盘/触摸、三种模式和本地成绩保存。
- [ ] 为 Web 与 APK 保持独立发布流程：Web 正常在线更新，APK 从包内资源加载且不依赖 Web 域名或 CDN。
- [ ] 执行跨平台回归：同一 seed、题库版本和难度应生成相同题目及选项；修复布局或状态差异。

**人工操作验收：** 浏览器访问正式网址 → 选择三种模式分别完成一局 → 刷新后确认历史成绩保留 → 换手机浏览器在线访问并完成一局 → Android 手机打开已安装 APK，在飞行模式下完成三种模式。**通过条件：** Web 在线部署正常，APK 完全不依赖网站联网；两端题目与游戏规则一致。**可试玩产物：** 一个可访问的 Web 正式网址 + 一个独立可离线的 APK。

## Stage 8 — MVP 扩容、性能、回归与发行准备

**实现清单：**
- [ ] 模板扩至 50–60 个；每个模板审查数学条件、答案唯一性和正确答案显示。
- [ ] 增加技能统计、Survival 难度曲线、Zen 专项训练可用性优化。
- [ ] 性能压测：连续 300 题、快速连按、低端 Android 机、Web 在线生产构建。
- [ ] 单元/属性/E2E 测试和实际手机回归测试；主题、动画减弱、音效开关、辅助访问。
- [ ] 发布签名 APK 和 Web 静态产物；版本升级前后存储迁移测试。

**人工操作验收：** 在 Web 和 Android 各连续完成 Time Attack、Survival、Zen 的完整流程；随机抽查每个模板；连续 300 题无崩溃、空题、重复计分；离线重启、后台恢复、版本更新后历史数据正常。**通过条件：** 第 12 章全部验收项通过。**可试玩产物：** 可分发的 MVP Web + Android APK。

**未来扩展：** Stage 9 的内容统一见第 9.2 章，不作为 Stage 8 完成条件。

---

# 12. 验收矩阵与测试记录规范

## 12.1 跨 Stage 必测项

| 测试项 | 首次引入 | 后续每阶段回归 | 通过标准 |
|---|---|---|---|
| Web 可启动 / 构建 | 0 | 是 | 无空白页、构建成功 |
| 四选一与防重复提交 | 0 | 是 | 同题只计一次 |
| 公式渲染 / 键盘触控 | 1 | 是 | 数学正确显示且操作正常 |
| 三模式完整循环 | 2 | 是 | 时间截止、答错结束、Zen 继续规则成立 |
| 本地题目生成和独立验证 | 3 | 是 | 无数学歧义，所有测试通过 |
| 筛选 / 历史 / 错题答案 / 会话恢复 | 4 | 是 | 已提交记录保留；Survival/Zen 可恢复；Time Attack 中断不计纪录 |
| 飞行模式首装 APK | 5 | 是（Android） | 无网络也能进入和作答 |
| 长按 / 缩放 / 后台 / 返回键 | 6 | 是（Android） | 按各页面约定运行 |
| Web 在线部署与跨平台回归 | 7 | 是（Web + Android） | HTTPS 网址可玩、APK 断网可玩、玩法一致 |
| 性能 / 完整题库 / 升级迁移 | 8 | 发行前必测 | 指标和数据均符合要求 |

## 12.2 每个 Stage 的测试报告模板

```md
# STAGE_N_TEST
- Commit / 版本：
- 日期：
- 平台与设备：Web 浏览器版本；Android 型号/系统版本（如适用）
- 启动与构建命令：
- 新增可操作功能：
- 手动步骤 / 预期结果 / 实际结果：
- 自动测试命令 / 通过数量：
- 失败项和已知限制：
- 截图或录屏：
- 是否达到 Stage Done：PASS / FAIL
```

## 12.3 发布级关键断言

- [ ] Time Attack 60 秒实际截止；超时答案不计，后台不能延长时间。
- [ ] Survival 第一题答错也能正常结束，记录最大连胜。
- [ ] Zen 答错和跳过均不终止练习，答错仅显示正确答案，类似题有效。
- [ ] 任意生成题恰好四个数学上不同的选项，且唯一正确。
- [ ] 所有数论整数结果、分数和小矩阵运算在规定范围内精确。
- [ ] 第 9.2 章所列所有生成与洗牌版本固定时，题序与选项可复现。
- [ ] 手机游戏屏不可无意缩放/选词/整页拖动；长题目及历史记录仍能阅读。
- [ ] 无联网、无 CDN、无服务端时 Android 首装可玩；Web 仅要求联网访问，无离线保证。
- [ ] 本地设置、完成成绩和学习记录重启后保留，升级迁移通过。
- [ ] 320 CSS px 布局下题目和选项可操作，不发生页面级横向溢出。
- [ ] 高频点击、后台切换和截止时刻不会重复计分或破坏状态机。
- [ ] 关闭音效/触觉、减少动画、键盘与可读反馈工作正常。

---

# 13. 默认配置和范围锁定

| 项目 | v1.3 决定 |
|---|---|
| 产品名 | EULERALLY |
| 发行平台 | Web + Android APK |
| 出题运行时 | 纯 TypeScript，本地生成与校验 |
| Python / 服务器 | 无 |
| Web 运行 | 普通在线静态网站；不做 PWA/离线支持 |
| Android 离线 | 安装包内包含全部运行资源，首次启动无需网络 |
| Android 容器 | Capacitor；不使用 Electron |
| 数学公式 | KaTeX 本地字体 |
| 题型 | 四选一 |
| Time Attack | 60 秒，答错不扣分，固定难度 |
| Survival | 无总时限，答错立即结束，动态升难度 |
| Zen | 无时间限制，跳过、错题仅显示正确答案、同技能练习 |
| 优先题库 | 数论、线代、微积分、抽象代数 |
| Stage 0 | 固定题目最小可操作烟测 |
| Stage 3 模板 | ≥20 个 |
| Stage 8 模板 | 50–60 个 |
| 远期目标 | 290 模板、在线竞技（另立规划） |
| 本地数据 | Dexie/IndexedDB；Web 和 APK 各自存储，不自动同步 |

**待实测调参：** 60 秒是否适合、答对 180ms / 答错约 900ms 的反馈体验、各模板平均作答时间、Zen 的 Next/Skip 体验、不同类别成绩可比性、低端机 KaTeX 性能、Survival 难度跃迁、Android 不同 WebView 的交互差异。

---

# 14. 工程实践与 Stage 结束门禁

1. **不跳 Stage：** Stage 0 必须先完成独立烟测；每个 Stage 以可操作验收为准，而不是以“代码写完”为准。
2. **每次交付含演示方式：** Web 开发地址/命令；自 Stage 5 起补充 APK 构建路径及手机安装步骤。
3. **每次交付含测试证据：** 至少一份 `STAGE_N_TEST.md`，包含成功步骤、失败项和测试设备。
4. **持续集成最小门禁：** 类型检查、Lint（启用后）、Vitest、生产构建；Stage 2 起加入 E2E；Stage 5 起至少一次实际 Android APK 手测。
5. **数学模板准入：** 严格执行第 5.6 章的数学正确性规则及第 12.3 章的发布级验收；无法确认则不上线。
6. **回归责任：** 任何 Stage 新增功能不得破坏此前已通过的 Time Attack / Survival / Zen 基本操作。
7. **完成定义：** 功能实现 + 自动验证 + 实际试玩 + 文档记录四项齐全，才能标记该 Stage 为 DONE。

---

# 15. 完整用户体验示例

1. 玩家在首页选 **Time Attack**。
2. 配置 `Standard / 60 seconds / Calculus + Linear Algebra + Number Theory + Abstract Algebra`。
3. `3 → 2 → 1 → GO`。
4. 第一题：$\varphi(21)=?$，答案 12。
5. 第二题：$\det\begin{pmatrix}3&5\\6&10\end{pmatrix}=?$，答案 0。
6. 第三题：$\operatorname{ord}_{\mathbb Z_{10}}(4)=?$，答案 5；答错也继续。
7. 60 秒结束后展示 Correct / Wrong / Accuracy / Average Time / Best Streak。
8. 玩家打开错题回顾，识别薄弱技能 `Element Order`。
9. 点击 `Practice This Skill` 进入 Zen，练习新生成的同技能题。

形成产品闭环：

$$
\boxed{\text{Challenge}\rightarrow\text{Feedback}\rightarrow\text{Practice}\rightarrow\text{Improvement}}
$$

---

# 16. 总结

| 模式 | 体验 | 能力目标 |
|---|---|---|
| **Time Attack** | 快节奏、追纪录 | 数学反应速度 |
| **Survival** | 连续挑战、容错为零 | 数学判断稳定性 |
| **Zen** | 平静、自由、反思 | 数学直觉与知识巩固 |

**开发顺序以第 11 章 Stage 0–8 为准。** 核心交付标准是经验证的题目模板、稳定的三模式流程，以及 Web 在线和 Android 离线两端可操作且可验收的体验。

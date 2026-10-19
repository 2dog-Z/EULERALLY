<div align="center">

# EULERALLY

### Train Your Math Intuition.

**See the structure. Trust your intuition. Answer fast.**

A mathematics intuition and mental calculation game for university-level learners and math enthusiasts.

**Web (online) · Android APK (offline) · Locally generated questions**

**English** · [简体中文](docs/README_CN.md)

[Overview](#overview) · [Game Modes](#game-modes) · [Math Topics](#math-topics) · [Getting Started](#getting-started) · [Roadmap](#roadmap)

</div>

> [!NOTE]
> **Project status:** This README describes the product and implementation plan in the EULERALLY v1.3 development specification. A playable release, repository URL, and completed implementation stages have **not been verified**. Planned features are not claims of shipped functionality.

## Overview

EULERALLY turns university-level mathematics into short, four-choice challenges. Instead of rewarding lengthy calculations for their own sake, it focuses on recognizing structure, estimating intelligently, recalling properties, and making accurate decisions quickly.

For example, consider

$$
\int_{-3}^{3}x^5\cos x\,dx.
$$

Rather than finding an antiderivative, notice that the integrand is odd. The integral is **0**.

**The idea:** build the habit of seeing the useful mathematical structure before reaching for a long computation.

## Why EULERALLY?

- **Intuition over computation:** conceptual recognition matters more than bigger numbers.
- **Quick to read, challenging to master:** questions aim to be understood in 1–3 seconds; standard questions typically target 3–15 seconds of mental reasoning.
- **One consistent interaction:** exactly four answer choices, with touch and keyboard support planned.
- **Meaningful variety:** multiple templates and parameter combinations train a skill without simply repeating fixed answers.
- **Correctness first:** valid assumptions, distinct choices, and exactly one correct answer per question.
- **Shared game logic:** a pure TypeScript math engine is designed to work on both Web and Android.

## Game Modes

| Mode | The challenge | MVP rules |
| --- | --- | --- |
| **Time Attack** | How many can you get right in **60 seconds**? | +1 per correct answer; wrong answers do not end a run; fixed difficulty; no pause or skip. |
| **Survival** | **One mistake. Game over.** | Unlimited time; streak increases on correct answers; first wrong answer ends the run; difficulty rises with the streak. |
| **Zen** | **No pressure. Just math.** | No timer or failure penalty; choose topics and difficulty; skip questions; practice another question targeting the same skill. |

### Time Attack

Race the overall clock, not an individual question timer. The score is the number of correct answers; the results also show accuracy, average response time, and best streak. Feedback time counts toward the 60 seconds, and switching apps or tabs does not pause the clock.

### Survival

Build the longest possible streak. Difficulty progresses through **Warm Up (0–4)**, **Standard (5–14)**, **Advanced (15–29)**, **Expert (30–49)**, and **Master (50+)**. Unlike Time Attack, Survival can be paused and resumed.

### Zen

Explore concepts without a countdown. After answering, review whether you were correct and move on when ready. **Practice Similar** is designed to generate a fresh question for the same skill. Skipping moves straight to the next question without revealing the answer or counting as correct/wrong.

> **Feedback philosophy:** The MVP shows correctness and, when wrong, the correct choice. It does **not** automatically provide worked solutions, derivations, or explanatory hints.

## Math Topics

The planned coverage spans nine subject areas:

| Area | Examples |
| --- | --- |
| **Numerical Sense** | Estimates, logarithms, Taylor approximations, orders of magnitude |
| **Calculus** | Derivatives, limits, symmetry in integration, series |
| **Vector Calculus** | Gradient, directional derivatives, divergence, curl, Jacobians |
| **Linear Algebra** | Determinants, rank, null spaces, eigenvalues, definiteness |
| **Abstract Algebra** | Element orders, cyclic groups, homomorphisms, rings and fields |
| **Number Theory** | Divisibility, modular arithmetic, Euler's totient, modular inverses |
| **Discrete Mathematics** | Counting, graphs, recurrences, logical equivalence |
| **Mathematical Logic** | Statements, counterexamples, missing assumptions |
| **Pattern Recognition** | Structural comparison, method recognition, cross-topic connections |

**MVP priorities:** Calculus, Linear Algebra, Abstract Algebra, and Number Theory. The longer-term blueprint targets approximately **290 templates across 35 subtypes**; the MVP target is **50–60 templates**, not an already available question count.

### Sample Challenges

| Area | Prompt | Answer |
| --- | --- | --- |
| Calculus | $\int_{-2}^{2}x^5e^{x^2}\,dx$ | $0$ |
| Linear Algebra | $\det\begin{pmatrix}101&102\\102&103\end{pmatrix}$ | $-1$ |
| Number Theory | $3^{100}\bmod 7$ | $4$ |
| Abstract Algebra | Order of $3$ in the additive group $\mathbb Z_{12}$ | $4$ |

The game presents these as **four-choice questions**; the answer column here is only for illustration.

## How Questions Work

The planned generator is **local, deterministic when seeded, and mathematically validated**:

```text
Topic + Skill + Difficulty + Seed
                ↓
          Select template
                ↓
     Generate valid parameters
                ↓
     Compute the exact answer
                ↓
    Generate three distractors
                ↓
 Validate assumptions and unique answer
                ↓
    Shuffle choices → question buffer
```

Key design commitments:

- Question generation, answer calculation, distractors, validation, and buffering run in **pure TypeScript on the device**.
- `BigInt`, a dedicated rational-number representation, and constrained templates support exact calculations where appropriate.
- Each question has **four mathematically distinct choices** and **exactly one correct choice**; answer identity is tied to a stable option ID, not its shuffled A/B/C/D position.
- Seeds and versioned generation components are intended to reproduce the same questions and choice positions under the same configuration.
- Template tests, boundary cases, property-based tests, and independent verification protect mathematical correctness. If equivalence cannot be established reliably, the question is rejected.
- AI may assist in drafting templates, but **unverified live LLM output is not used as a competitive question source**.

## Platforms and Data

| Platform | Delivery | Network requirement |
| --- | --- | --- |
| **Web** | Online, statically hosted site | Network required for initial load and refresh; no PWA/offline guarantee |
| **Android** | Capacitor-based APK with bundled assets | Must work offline from first install, including in airplane mode |

Questions are generated locally on **both** platforms. Personal bests, session history, mistakes, and per-skill statistics are designed to be stored locally with IndexedDB/Dexie. **Web and Android do not automatically sync** in the MVP. No server, account system, online leaderboard, iOS build, Electron app, or Python runtime is planned for the MVP.

## Getting Started

### Play

- **Web:** Public demo URL **to be announced**.
- **Android:** APK download / GitHub Release **to be announced**.

### Development (planned commands)

The following commands come from the development specification and **must be checked against the actual repository** before use. Replace `<REPOSITORY_URL>` with the real clone URL when the repository is published.

**Prerequisites:** Node.js and npm. Building Android also requires a compatible Android Studio/Android SDK/Gradle setup. Exact version requirements have not yet been documented.

```bash
# Clone after the repository is published
git clone <REPOSITORY_URL>
cd eulerally

npm install
npm run dev
```

```bash
npm run build      # Production Web build
npm run test       # Vitest tests
npm run test:e2e   # Playwright end-to-end tests
```

**Android packaging (once configured):**

```bash
npm run build
npx cap sync android
npx cap open android
```

Generate a debug or signed APK from Android Studio/Gradle. A production APK must use bundled `dist/` resources, not a remote `server.url`. Offline-first-install testing is a release requirement.

## Technology Stack

| Purpose | Planned technology |
| --- | --- |
| Language and UI | TypeScript, React |
| Build and styling | Vite, Tailwind CSS, native CSS |
| Formula rendering | KaTeX with bundled local fonts |
| State | Zustand and a pure TypeScript state machine |
| Local storage | IndexedDB, Dexie; localStorage for small settings |
| Schema validation | Zod |
| Android packaging | Capacitor, Android Studio / Gradle |
| Exact math | `BigInt`, custom rational operations, constrained algorithms |
| Tests | Vitest, fast-check, Playwright |

The `core` module is intended to remain independent of React, DOM, Capacitor, and storage details.

### Proposed Project Layout

```text
eulerally/
├── src/
│   ├── core/
│   │   ├── math/              # Exact mathematical utilities
│   │   ├── questions/
│   │   │   └── templates/     # Versioned question templates
│   │   ├── rng/               # Reproducible random generator
│   │   └── game/              # Rules and state machine
│   ├── ui/                    # React screens and KaTeX
│   ├── stores/                # Zustand integration
│   ├── storage/               # Dexie repositories/migrations
│   ├── platform/              # Web and Android adapters
│   ├── styles/
│   └── App.tsx
├── public/                    # Bundled fonts/icons/sounds
├── tests/
├── android/                   # Generated by Capacitor
├── docs/
│   └── README_CN.md
├── capacitor.config.ts
├── vite.config.ts
└── package.json
```

This is the **planned** structure; it does not assert that these paths already exist.

## Roadmap

Each stage must be playable/testable and include an acceptance record (`STAGE_N_TEST.md`). **No stage is marked complete without implementation and test evidence.**

| Stage | Milestone | Deliverable |
| --- | --- | --- |
| **0** | Minimal smoke test | Two fixed four-choice questions and answer feedback on Web |
| **1** | Input and formulas | KaTeX, keyboard/touch input, double-submit protection |
| **2** | Three playable modes | Complete Time Attack, Survival, and Zen loops |
| **3** | Local math engine | At least 20 verified templates in four initial subjects |
| **4** | Training records | Local history, mistakes, topic filters, skill statistics |
| **5** | First Android APK | Install and play offline from first launch |
| **6** | Native-like Android behavior | Touch behavior, lifecycle, return key, pause/resume |
| **7** | Cross-platform launch | Public Web URL and Android regression checks |
| **8** | MVP readiness | 50–60 templates, performance and release validation |

**Possible post-MVP features:** Daily Sprint, accounts, cloud sync, online leaderboards, sharing, and adaptive Zen practice. These are **future ideas**, not MVP promises.

## Contributing

Contributions to mathematical templates, correctness tests, accessibility, UI, and cross-platform behavior may be valuable as the project opens up. **Contribution policy and review instructions have not yet been published.** Please do not treat this section as an existing submission process.

## License

**To be determined.** A license file and clear reuse terms should be added before public code distribution. Until then, do not assume that the repository is licensed for reuse.

---

<div align="center">

**EULERALLY — Train Your Math Intuition.**

[阅读中文版](docs/README_CN.md)

</div>

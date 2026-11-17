# Graph Report - hutan (2026-11-17)

## Corpus Check

- 29 files · ~14,315 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 4, .example 1, .css 1)

## Summary

- 231 nodes · 428 edges · 11 communities (10 shown, 1 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness

- Built from commit: `d8e8b168`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)

- package.json
- App.tsx
- AboutPage.tsx
- dependencies
- quizService.ts
- compilerOptions
- compilerOptions
- Navbar.tsx
- scripts
- tsconfig.json
- React + TypeScript + Vite

## God Nodes (most connected - your core abstractions)

1. `compilerOptions` - 19 edges
2. `ScrollReveal()` - 18 edges
3. `AnimatedContent()` - 16 edges
4. `react` - 15 edges
5. `compilerOptions` - 15 edges
6. `react-router` - 14 edges
7. `App()` - 12 edges
8. `@phosphor-icons/react` - 10 edges
9. `AboutPage()` - 8 edges
10. `cn()` - 8 edges

## Surprising Connections (you probably didn't know these)

- `App()` --calls--> `Navbar()` [EXTRACTED]
  src/App.tsx → src/components/Navbar.tsx
- `App()` --calls--> `AboutPage()` [EXTRACTED]
  src/App.tsx → src/pages/AboutPage.tsx
- `AboutPage()` --calls--> `AnimatedContent()` [EXTRACTED]
  src/pages/AboutPage.tsx → src/components/AnimatedContent.tsx
- `KnowledgeChangeSection()` --calls--> `AnimatedContent()` [EXTRACTED]
  src/pages/AboutPage.tsx → src/components/AnimatedContent.tsx
- `AboutPage()` --calls--> `ScrollReveal()` [EXTRACTED]
  src/pages/AboutPage.tsx → src/components/ScrollReveal.tsx

## Import Cycles

- None detected.

## Communities (11 total, 1 thin omitted)

### Community 0 - "package.json"

Cohesion: 0.06
Nodes (45): @tailwindcss/vite@^4.3.5, devDependencies, @babel/core@^7.29.7, babel-plugin-react-compiler@^1.0.0, eslint@^10.14.0, @eslint/js@^10.0.1, eslint-plugin-react-hooks@^7.1.1, eslint-plugin-react-refresh@^0.5.7 (+37 more)

### Community 1 - "App.tsx"

Cohesion: 0.12
Nodes (31): @phosphor-icons/react, react, react-router, App(), AnimatedContent(), Footer(), FOOTER_COLUMNS, FooterColumn (+23 more)

### Community 2 - "AboutPage.tsx"

Cohesion: 0.08
Nodes (25): gsap@^3.15.1, @gsap/react@^2.1.2, gsap, @gsap/react, AnimatedContentProps, ParallaxBandItem, ParallaxPillarBand(), ParallaxPillarBandProps (+17 more)

### Community 3 - "dependencies"

Cohesion: 0.10
Nodes (20): dependencies, @fontsource-variable/fraunces@^5.3.0, @fontsource-variable/jetbrains-mono@^5.3.0, @fontsource-variable/plus-jakarta-sans@^5.3.0, lenis@^1.3.27, @phosphor-icons/react@^2.1.10, react@^19.3.1, react-dom@^19.3.1 (+12 more)

### Community 4 - "quizService.ts"

Cohesion: 0.20
Nodes (16): QUIZ_QUESTIONS, QuizQuestion, getErrorMessage(), SubmitState, useQuiz(), fetchQuizQuestions(), fetchQuizSubmissions(), mapRowToQuestion() (+8 more)

### Community 5 - "compilerOptions"

Cohesion: 0.10
Nodes (20): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+12 more)

### Community 6 - "compilerOptions"

Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 7 - "Navbar.tsx"

Cohesion: 0.23
Nodes (10): clsx@^2.1.1, tailwind-merge@^3.7.0, clsx, tailwind-merge, NAV_ITEMS, Navbar(), NavChild, NavItem (+2 more)

### Community 8 - "scripts"

Cohesion: 0.29
Nodes (7): scripts, build, dev, format, format:check, lint, preview

### Community 10 - "React + TypeScript + Vite"

Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + TypeScript + Vite

## Knowledge Gaps

- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `package.json`, `AboutPage.tsx`, `dependencies`, `quizService.ts`, `Navbar.tsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.061224489795918366 - nodes in this community are weakly interconnected._
- **Why does `react-router` connect `App.tsx` to `package.json`, `AboutPage.tsx`, `dependencies`, `Navbar.tsx`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11962833914053426 - nodes in this community are weakly interconnected._
- **Should `AboutPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08377896613190731 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._

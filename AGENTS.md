# AGENTS.md

## Project Overview

This repository contains Renan Costa's personal portfolio and technical blog.

The project is a bilingual website supporting:

* Portuguese — `pt-BR`
* English — `en`

The website contains:

* Portfolio pages
* Projects
* Technical articles
* Professional information
* Contact information
* Technical content
* SEO metadata

The project uses:

* Next.js
* React
* TypeScript
* Markdown
* ESLint
* Vercel

Always inspect the existing implementation before making assumptions about architecture, routing, localization, article storage, or rendering.

---

# 1. Core Principles

These rules apply to every task.

* Make the smallest change necessary.
* Preserve the existing architecture.
* Preserve the existing visual identity.
* Reuse existing components and utilities.
* Do not refactor unrelated code.
* Do not introduce unnecessary dependencies.
* Do not create duplicate systems.
* Do not change working behavior without a reason.
* Do not invent information.
* Do not modify unrelated files.
* Prefer simple, maintainable solutions.
* Follow existing project conventions before introducing new patterns.

When uncertain, inspect the existing implementation first.

---

# 2. Scope Control

Before changing anything:

1. Understand the exact request.
2. Identify the files directly related to the task.
3. Inspect those files.
4. Identify the root cause or required implementation.
5. Make the smallest change that satisfies the request.
6. Validate the result.
7. Stop.

Do not scan the entire repository unless the task genuinely requires it.

Do not modify files merely because they could be improved.

Do not perform unrelated cleanup.

Do not refactor code that is not part of the requested task.

If another file becomes necessary, inspect it only when there is evidence that it is relevant.

---

# 3. Anti-Loop Rules

These rules are especially important.

The agent must avoid unnecessary autonomous iteration.

## Never:

* repeatedly try random solutions;
* rewrite the same component multiple times;
* refactor after the problem is solved;
* modify unrelated files;
* repeatedly run the same command without analyzing its output;
* install dependencies without a clear reason;
* change architecture unnecessarily;
* continue improving the project after the requested task is complete;
* fix unrelated problems discovered during the task.

## If a solution fails:

1. Read the actual error.
2. Determine the cause.
3. Make one evidence-based correction.
4. Validate again.

Do not enter an endless trial-and-error loop.

## Stop condition

If:

* the requested behavior works;
* the relevant validation passes;
* there are no errors directly related to the task;

**STOP.**

Do not continue making improvements.

If an unrelated issue is discovered, report it instead of fixing it automatically.

---

# 4. Existing Architecture

Before implementing anything, inspect the existing project structure.

Do not assume:

* where routes are stored;
* where articles are stored;
* how localization works;
* how Markdown is processed;
* how metadata is generated;
* how projects are represented;
* how components are organized.

Follow the architecture that already exists.

Do not create a new architecture when an existing one already solves the problem.

---

# 5. Next.js Rules

* Follow the existing Next.js architecture.
* Preserve the current routing system.
* Preserve the current rendering strategy.
* Respect Server Components and Client Components.
* Do not add `"use client"` unless necessary.
* Do not convert Server Components into Client Components unnecessarily.
* Use existing Next.js conventions.
* Preserve existing metadata behavior.
* Preserve existing SEO configuration.
* Do not introduce another routing system.
* Do not introduce another framework.

When modifying a page, inspect its existing implementation before changing it.

---

# 6. React Rules

* Use functional components.
* Reuse existing components whenever possible.
* Avoid unnecessary state.
* Avoid unnecessary `useEffect`.
* Avoid duplicating logic.
* Keep components focused.
* Preserve existing component APIs.
* Do not create a new component if a small modification to an existing component is sufficient.
* Do not refactor components unrelated to the request.

---

# 7. TypeScript Rules

* Keep TypeScript type-safe.
* Avoid `any` unless there is a justified reason.
* Prefer existing types and interfaces.
* Do not duplicate type definitions unnecessarily.
* Preserve existing public interfaces.
* Do not weaken types simply to make an error disappear.
* Fix the underlying type problem instead.

---

# 8. UI / Design Rules

The portfolio should remain professional, clean, and technically focused.

When modifying the UI:

* Preserve the existing visual identity.
* Preserve existing typography.
* Preserve existing colors.
* Preserve existing spacing.
* Preserve existing responsive behavior.
* Preserve existing animations unless modification is requested.
* Reuse existing components.
* Reuse existing styles.
* Do not redesign unrelated sections.
* Do not introduce a new design system unnecessarily.
* Do not add excessive animations.
* Do not add decorative elements without a purpose.

Changes should work on:

* desktop;
* tablet;
* mobile.

---

# 9. Accessibility

When modifying UI:

* Use semantic HTML.
* Preserve keyboard accessibility.
* Use meaningful labels.
* Use accessible buttons and links.
* Preserve existing accessibility attributes.
* Add meaningful `alt` text where appropriate.
* Do not remove accessibility behavior without a reason.

---

# 10. Performance

Avoid unnecessary client-side work.

Prefer:

* Server Components when appropriate;
* static rendering when appropriate;
* optimized images;
* existing caching strategies;
* existing utilities.

Avoid:

* unnecessary API calls;
* unnecessary client-side state;
* unnecessary polling;
* unnecessary dependencies;
* duplicated data fetching.

Do not optimize unrelated code during a normal feature or bug-fix task.

---

# 11. Internationalization

The portfolio is bilingual.

Supported languages:

```text
pt-BR
en
```

All new user-facing content must have both language versions unless the user explicitly requests otherwise.

This includes:

* navigation;
* buttons;
* labels;
* project descriptions;
* project titles;
* article titles;
* article descriptions;
* articles;
* metadata;
* SEO descriptions;
* empty states;
* error messages;
* headings;
* calls to action;
* other visible text.

Do not create new user-facing content in only one language.

---

# 12. Language Quality

## Portuguese

Use natural Brazilian Portuguese.

Do not use awkward literal translations.

## English

Use natural professional technical English.

Do not translate word-for-word when doing so produces unnatural English.

Technical terms should retain their standard terminology.

Examples:

* React
* Next.js
* TypeScript
* Apache Spark
* dbt
* Docker
* Kubernetes
* Machine Learning
* Data Engineering
* Data Lakehouse

Do not translate technical library/framework names.

---

# 13. Existing Localization System

Before modifying or creating localized content:

1. Inspect how the existing project handles languages.
2. Identify the current route structure.
3. Identify where translations are stored.
4. Identify how language-specific metadata works.
5. Follow the existing system.

Do not invent a new i18n implementation.

Do not replace the existing localization architecture unless explicitly requested.

---

# 14. Content Integrity

The portfolio represents Renan Costa professionally.

Never fabricate:

* work experience;
* companies;
* clients;
* projects;
* job positions;
* certifications;
* academic achievements;
* technologies;
* metrics;
* performance results;
* revenue;
* user counts;
* project impact;
* production usage;
* benchmarks.

Use only information that is:

* provided by the user;
* present in the project;
* verifiable from the relevant source;
* explicitly requested as fictional/example content.

If information is missing, do not invent it.

---

# 15. Articles / Technical Blog

The portfolio contains technical articles.

Articles are bilingual:

* Portuguese
* English

Every published article should have both language versions.

However, the user normally prepares the article content as Markdown before asking the agent to integrate it into the portfolio.

Therefore:

**The Markdown is the source of truth for article content.**

The website is responsible for presenting and delivering that content.

---

# 16. Markdown Source of Truth

When the user provides or creates a Markdown file:

```text
article.md
```

treat it as the source of truth.

The agent must:

* read the Markdown;
* preserve its structure;
* preserve its content;
* preserve headings;
* preserve code blocks;
* preserve links;
* preserve tables;
* preserve references;
* preserve images;
* preserve technical terminology;
* preserve section order.

Do not rewrite the article merely because it is being integrated into the website.

Do not expand the article.

Do not summarize it.

Do not replace its wording.

Do not add sections unnecessarily.

Only modify the Markdown when the user explicitly asks for content changes.

---

# 17. Article Workflow

When the user asks to add a Markdown article to the portfolio:

## Step 1 — Read

Read the entire Markdown source.

## Step 2 — Inspect

Inspect:

* existing articles;
* article routing;
* Markdown rendering;
* frontmatter;
* metadata;
* localization;
* article components.

## Step 3 — Identify

Determine how the existing system expects an article to be integrated.

## Step 4 — Integrate

Integrate the Markdown using the existing architecture.

## Step 5 — Language

Ensure the required Portuguese and English versions exist according to the user's request and the project's existing workflow.

## Step 6 — Metadata

Configure required metadata.

## Step 7 — Validate

Verify rendering and build.

## Step 8 — Stop

Once the article works, stop.

---

# 18. Adding an Existing Markdown Article

If the user says:

> Add `data-engineering.md` to the portfolio.

The expected behavior is:

```text
Read Markdown
    ↓
Inspect existing article system
    ↓
Identify correct integration point
    ↓
Integrate article
    ↓
Configure language
    ↓
Configure metadata
    ↓
Validate
    ↓
STOP
```

Do not rewrite the article.

---

# 19. Translating an Article

If the user says:

> Create the English version of this article.

Then:

1. Read the original Markdown.
2. Translate the content into natural technical English.
3. Preserve Markdown structure.
4. Preserve code.
5. Preserve links.
6. Preserve tables.
7. Preserve references.
8. Preserve technical meaning.
9. Create the corresponding English Markdown.
10. Integrate it if requested.
11. Validate.

Do not modify the original language version unless explicitly requested.

---

# 20. Creating an Article From Scratch

If the user explicitly asks:

> Create an article about X.

and no Markdown source is provided:

1. Inspect existing articles.
2. Follow their structure.
3. Follow their technical depth.
4. Determine the actual topic.
5. Use only verified information.
6. Create the requested language version.
7. Create the second language version when required.
8. Integrate both into the existing system.
9. Validate.

Do not fabricate project-specific implementation details.

If the article concerns one of the user's projects, inspect the relevant project when possible.

---

# 21. Article Editing

Interpret article requests carefully.

### "Add this article"

Integrate the Markdown.

Do not rewrite it.

### "Improve this article"

Edit the Markdown content.

Improve:

* clarity;
* organization;
* technical explanation;
* grammar;
* readability.

Preserve factual meaning.

### "Translate this article"

Create the requested language version.

### "Fix article rendering"

Fix the website implementation.

Do not rewrite the article content unless the rendering issue requires it.

### "Redesign the article page"

Modify the UI while preserving article content.

---

# 22. Article Structure

Follow the structure of existing articles.

Do not impose a generic structure if the existing article already has one.

When creating a new article from scratch, a reasonable structure is:

```md
# Title

Introduction

## Context

## Problem

## Architecture

## Implementation

## Technical Details

## Validation

## Trade-offs

## Conclusion

## References
```

Only use sections that make sense.

---

# 23. Article Writing Style

Technical articles should demonstrate:

* engineering reasoning;
* practical implementation;
* technical understanding;
* architectural decisions;
* trade-offs.

Prefer:

```text
Problem
→ Context
→ Decision
→ Implementation
→ Validation
→ Trade-offs
→ Conclusion
```

Avoid:

* generic AI introductions;
* excessive filler;
* repetitive explanations;
* clickbait;
* exaggerated marketing;
* unsupported claims.

Avoid phrases such as:

> "In today's rapidly evolving technological landscape..."

unless genuinely appropriate.

---

# 24. Technical Accuracy in Articles

Never fabricate:

* benchmarks;
* throughput;
* latency;
* costs;
* dataset sizes;
* user counts;
* performance metrics;
* infrastructure specifications;
* production results.

If a number is used, verify it.

If it is an estimate, clearly identify it as an estimate.

If it is an experiment, identify it as an experiment.

---

# 25. Code Examples in Articles

Code must:

* use valid syntax;
* match the described technology;
* be relevant;
* avoid unnecessary boilerplate;
* use correct Markdown code fences.

Do not invent APIs.

Do not show functions or libraries that do not exist in the described implementation.

When simplifying code for educational purposes, make it clear that the example is simplified.

---

# 26. Article SEO

When the existing architecture supports article metadata, configure metadata for both languages.

Possible metadata:

* title;
* description;
* slug;
* date;
* tags;
* canonical URL;
* Open Graph metadata.

Follow the existing metadata implementation.

Do not create a new metadata system.

Descriptions must accurately represent the article.

Do not keyword-stuff.

---

# 27. Article URLs

Follow the existing URL structure.

Do not invent a new route structure.

Before adding a route:

1. Inspect existing article routes.
2. Identify the language convention.
3. Follow the established pattern.

Do not assume a structure such as:

```text
/en/articles/...
/pt/articles/...
```

unless the existing project actually uses it.

---

# 28. Article Assets

If an article references images:

1. Inspect how existing articles reference images.
2. Follow the existing asset structure.
3. Verify the asset exists.
4. Preserve existing references.
5. Use meaningful alt text when supported.

If an asset is missing:

* report it;
* do not silently replace it with an unrelated asset.

Do not create placeholder assets unless explicitly requested.

---

# 29. Article References

Preserve references from the Markdown.

When creating an article from scratch:

Prefer authoritative technical sources such as:

* official documentation;
* project documentation;
* academic papers;
* standards;
* official repositories.

Do not invent references.

---

# 30. Data Engineering Articles

When relevant, Data Engineering articles may discuss:

* ingestion;
* storage;
* Parquet;
* partitioning;
* schemas;
* data quality;
* Bronze/Silver/Gold;
* Spark;
* PySpark;
* object storage;
* S3;
* MinIO;
* Iceberg;
* dbt;
* DuckDB;
* orchestration;
* Docker;
* testing;
* observability;
* scalability;
* performance;
* cost.

Only describe technologies actually used or relevant to the project.

Do not add technologies merely because they are common in the industry.

---

# 31. Machine Learning Articles

When relevant, ML articles should explain:

* problem definition;
* dataset;
* preprocessing;
* feature engineering;
* model;
* training;
* evaluation;
* metrics;
* limitations.

Do not fabricate model results.

---

# 32. Software Engineering Articles

When relevant, discuss:

* architecture;
* design decisions;
* maintainability;
* testing;
* scalability;
* reliability;
* trade-offs;
* implementation details.

Focus on why decisions were made, not only which technologies were used.

---

# 33. Projects

When adding or editing portfolio projects:

1. Inspect the existing project representation.
2. Follow its structure.
3. Use real project information.
4. Include actual technologies.
5. Include repository links when available.
6. Include deployment links when available.
7. Provide both language versions.

Project descriptions should communicate:

```text
Problem
→ Solution
→ Architecture
→ Technologies
→ Result
```

Only include sections supported by actual information.

Never fabricate project results.

---

# 34. Project Links

When adding project links:

* use the real repository;
* use the real deployment;
* do not invent URLs;
* preserve existing URLs;
* verify URLs when possible.

Do not replace a valid project link with a guessed URL.

---

# 35. UI Text

All newly created user-facing text must support both languages.

Do not hardcode a new Portuguese-only or English-only string if the project already has a localization mechanism.

Follow the existing localization implementation.

---

# 36. SEO / Portfolio Pages

When modifying portfolio pages:

Preserve:

* page titles;
* descriptions;
* Open Graph metadata;
* canonical URLs;
* structured data;
* sitemap behavior;
* robots configuration.

Do not remove SEO configuration without a reason.

---

# 37. Dependencies

Do not add a dependency unless it is necessary.

Before adding a package:

1. Check whether the project already has an equivalent capability.
2. Check whether existing APIs/components can solve the problem.
3. Prefer existing dependencies.

Do not install a package simply for convenience.

---

# 38. Git Safety

Never perform destructive Git operations automatically.

Do not:

* create commits unless explicitly requested;
* push to GitHub unless explicitly requested;
* reset the repository;
* revert user changes;
* discard local changes;
* delete user files;
* overwrite unrelated work.

Preserve the user's existing changes.

---

# 39. Validation

Use the project's existing scripts.

Prefer:

```bash
npm run lint
npm run build
```

Only run commands relevant to the task.

For article changes, verify when applicable:

* PT-BR article;
* English article;
* routing;
* metadata;
* Markdown rendering;
* code blocks;
* tables;
* images;
* links;
* responsive behavior;
* build.

Do not repeatedly run the same command without analyzing the result.

---

# 40. Error Handling

When validation fails:

1. Read the complete relevant error.
2. Identify the actual cause.
3. Determine whether the error was caused by the current change.
4. Fix only the relevant issue.
5. Run validation again.

If the error is unrelated to the current task:

Do not fix it automatically.

Report it.

---

# 41. Task Execution Protocol

For non-trivial tasks use:

## Step 1 — Understand

Determine exactly what the user wants.

## Step 2 — Inspect

Read only the relevant files.

## Step 3 — Plan

Determine the smallest implementation necessary.

## Step 4 — Implement

Make the change.

## Step 5 — Validate

Run the relevant checks.

## Step 6 — Stop

Do not continue improving unrelated areas.

---

# 42. Communication

Before a substantial change, briefly state:

* what is being changed;
* which files are relevant;
* the implementation approach.

After completion, report:

* what changed;
* files changed;
* validation performed;
* remaining issues directly related to the task.

Keep responses concise.

Do not provide unnecessary explanations.

Do not propose unrelated improvements after completing the task.

---

# 43. Final Rules

When working on this project:

1. Inspect before assuming.
2. Follow the existing architecture.
3. Keep changes small.
4. Do not fabricate information.
5. Preserve the user's Markdown content.
6. Treat Markdown as the source of truth for articles.
7. Keep articles bilingual.
8. Preserve the existing localization system.
9. Validate changes.
10. Stop when the task is complete.

The goal is not to change as much code as possible.

The goal is to make the smallest correct change that completely satisfies the user's request.

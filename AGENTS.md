# AGENTS.md

## Project

Personal portfolio and technical blog of Renan Costa.

The website is bilingual:

* Portuguese (pt-BR)
* English (en)

**All user-facing portfolio content must have both language versions.**

This includes:

* Portfolio pages
* Projects
* Project descriptions
* Articles
* Article metadata
* Navigation
* Buttons
* Labels
* SEO metadata
* Titles
* Descriptions
* Empty states
* Error messages
* Other user-facing text

Never create new user-facing content in only one language.

---

# Technology

The project uses:

* Next.js
* React
* TypeScript
* Markdown
* ESLint
* Vercel

Follow the existing project architecture.

Do not introduce a new framework, routing system, or internationalization architecture unless explicitly requested.

---

# IMPORTANT — Before Changing Anything

Before modifying the project:

1. Inspect the existing implementation.
2. Identify how routing and localization currently work.
3. Identify where Portuguese and English content are stored.
4. Inspect existing articles and their rendering logic.
5. Follow the existing conventions.
6. Only then implement the requested change.

Do not assume the project structure.

---

# Language / Internationalization

## Supported Languages

The portfolio supports:

```text
pt-BR
en
```

Portuguese is the Brazilian Portuguese version.

English should use natural professional English suitable for an international software engineering portfolio.

Do not perform literal word-for-word translations when they produce unnatural English.

Technical terms such as:

* React
* Next.js
* Apache Spark
* dbt
* Apache Iceberg
* Docker
* Kubernetes
* Machine Learning
* Data Engineering

must remain in their standard technical form.

---

# Bilingual Content Rule

Whenever new content is created:

### Portuguese version

Create the complete pt-BR version.

### English version

Create the complete English equivalent.

Both versions must contain the same:

* information;
* technical meaning;
* sections;
* code examples;
* links;
* references;
* images;
* project information.

The language may be adapted naturally, but technical meaning must remain equivalent.

Do not create:

```text
Portuguese article only
```

or:

```text
English article only
```

unless the user explicitly requests a single-language artifact.

---

# Articles

The repository contains technical articles.

Existing examples include:

* `artigo.md`
* `data-engineering.md`

Before creating an article:

1. Inspect the existing article structure.
2. Inspect how articles are routed/rendered.
3. Inspect how language selection is implemented.
4. Determine where the pt-BR and English versions belong.
5. Follow the existing implementation.
6. Create both language versions.

Do not invent a new article architecture if the project already has one.

---

# Creating a New Article

When the user asks:

> Create an article about X

The agent must:

### Step 1 — Understand the topic

Determine:

* subject;
* target audience;
* technical depth;
* project being discussed;
* technologies involved.

### Step 2 — Inspect the project

If the article describes one of Renan's projects:

* inspect the relevant repository when available;
* inspect the actual implementation;
* verify technologies;
* verify architecture;
* verify commands;
* verify configuration;
* verify metrics.

Never invent implementation details.

### Step 3 — Inspect existing articles

Use existing articles as the style and structural reference.

Do not blindly copy their content.

### Step 4 — Write Portuguese

Create the complete pt-BR article.

### Step 5 — Write English

Create the complete English article.

The English version should be a technically faithful adaptation, not a literal machine translation.

### Step 6 — Integrate

Connect both versions to the existing article system.

### Step 7 — Validate

Verify:

* both languages load;
* links work;
* code blocks render;
* Markdown renders correctly;
* metadata is correct;
* article navigation works;
* the build passes.

---

# Article Structure

Follow the structure of existing articles.

When appropriate, an article should contain:

```md
# Title

Short introduction.

## Introduction / Context

Explain the problem.

## Architecture

Explain the architecture.

## Implementation

Explain the implementation.

## Technical Details

Explain important engineering decisions.

## Validation

Explain testing or validation.

## Trade-offs

Explain limitations and alternatives.

## Conclusion

Summarize the main lessons.

## References

Official documentation and relevant references.
```

Do not force every section when it does not make sense.

The existing article structure always takes precedence.

---

# Article Writing Style

Articles are technical portfolio content.

They should demonstrate:

* engineering reasoning;
* understanding of architecture;
* practical implementation;
* technical decision-making;
* awareness of trade-offs.

Prefer:

> Problem → Context → Decision → Implementation → Result → Trade-offs

Avoid generic AI-generated introductions such as:

> "In today's rapidly evolving technological landscape..."

Avoid excessive marketing language.

Avoid clickbait.

Avoid exaggerated claims.

Do not claim something is:

* production-ready;
* scalable;
* enterprise-grade;
* highly performant;
* fault tolerant;

unless the implementation actually supports that claim.

---

# Technical Accuracy

Never fabricate:

* benchmarks;
* performance numbers;
* cloud costs;
* throughput;
* latency;
* dataset sizes;
* user counts;
* infrastructure specifications;
* production usage;
* business results.

If a number exists in the actual project, verify it before using it.

If something is an assumption, clearly identify it as an assumption.

---

# Code Examples in Articles

Code examples must:

* match the actual technology;
* use valid syntax;
* be relevant to the explanation;
* avoid unnecessary boilerplate;
* use correct language identifiers.

Example:

```ts
const result = await processData(input);
```

Do not invent APIs or functions that do not exist in the described implementation.

When simplifying code for educational purposes, make it clear that the example is simplified.

---

# Data Engineering Articles

When writing Data Engineering articles, explain engineering decisions around:

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
* Airflow;
* Docker;
* testing;
* observability;
* scalability;
* performance.

Do not automatically include every technology.

Only describe technologies actually relevant to the project.

---

# Machine Learning Articles

When writing ML articles, explain:

* problem definition;
* dataset;
* preprocessing;
* feature engineering;
* model;
* training;
* evaluation;
* metrics;
* limitations.

Do not fabricate evaluation results.

---

# Software Engineering Articles

When writing software engineering articles, emphasize:

* architecture;
* design decisions;
* maintainability;
* testing;
* trade-offs;
* scalability;
* reliability;
* implementation details.

Explain why a particular approach was chosen instead of simply listing technologies.

---

# SEO

Every article must have appropriate metadata in both languages when the existing architecture supports it.

For each language, provide:

* title;
* description;
* slug;
* relevant tags;
* canonical URL when supported;
* Open Graph metadata when supported.

The English and Portuguese versions should have language-appropriate:

* titles;
* descriptions;
* metadata.

Do not keyword-stuff.

SEO content must accurately describe the article.

---

# Article URLs

Follow the existing routing implementation.

Do not invent a new URL structure.

If the project supports localized routes, preserve the established convention.

For example, if the existing project uses:

```text
/pt/articles/...
/en/articles/...
```

continue using that structure.

If the project uses another structure, follow the existing implementation instead.

---

# Projects

When adding or editing a portfolio project:

* inspect the existing project data structure;
* use real project information;
* include the actual technologies;
* include repository links when available;
* include deployment links when available;
* provide both pt-BR and English content.

Project descriptions must be equivalent between languages.

Do not fabricate:

* project results;
* clients;
* users;
* revenue;
* performance;
* business impact.

---

# UI Text

All new UI text must be bilingual.

Examples:

```text
PT-BR:
Leia o artigo

EN:
Read article
```

Do not hardcode only one language into a reusable component if the application already has an i18n mechanism.

Follow the existing localization system.

---

# Images

When adding images to articles:

1. Inspect how existing articles load images.
2. Follow the existing asset structure.
3. Use descriptive filenames.
4. Add meaningful alt text in both languages when the architecture supports localized alt text.
5. Do not add decorative images unnecessarily.

Use diagrams when they improve technical understanding.

Useful examples:

* architecture diagrams;
* data pipelines;
* system flows;
* database schemas;
* infrastructure diagrams.

---

# Existing Content

Do not modify existing articles unless explicitly requested.

When creating a new article:

* do not rewrite `artigo.md`;
* do not rewrite `data-engineering.md`;
* do not change existing article URLs;
* do not change existing article content;
* do not migrate the article system;

unless the task explicitly requires it.

---

# Code Changes

## Scope

Only modify files necessary for the requested task.

Do not:

* refactor unrelated components;
* rename unrelated files;
* change the architecture;
* replace working libraries;
* install unnecessary dependencies.

---

# Anti-Loop Rules

IMPORTANT.

The agent must stop when the task is complete.

Never:

* repeatedly try random fixes;
* rewrite the same component multiple times;
* refactor after a successful solution;
* modify unrelated files;
* repeatedly run the same command;
* install dependencies without necessity;
* continue "improving" the project after the requested task is solved.

If the requested behavior works and validation passes:

**STOP.**

If an unrelated problem is discovered:

**REPORT IT.**

Do not fix it automatically.

If a solution fails:

1. inspect the actual error;
2. identify the cause;
3. make one evidence-based correction;
4. validate again.

Do not enter an endless trial-and-error loop.

---

# Validation

Use the existing project scripts.

Prefer:

```bash
npm run lint
npm run build
```

For article changes, additionally verify:

* Portuguese article;
* English article;
* routing;
* metadata;
* Markdown rendering;
* images;
* links.

Only run relevant validation commands.

---

# Git Safety

Never:

* commit without explicit permission;
* push without explicit permission;
* reset the repository;
* revert user changes;
* delete user work;
* overwrite unrelated changes.

---

# Task Completion

When the task is complete, report:

1. Files changed.
2. What was implemented.
3. Portuguese version status.
4. English version status.
5. Validation performed.
6. Any remaining issue.

Keep the response concise.

Do not propose unrelated improvements.

---

# Final Rule

When in doubt:

**Inspect the existing implementation first.**

**Follow the existing architecture.**

**Create both pt-BR and English versions for all new user-facing content.**

**Make the smallest change possible.**

**Validate.**

**Stop.**

---
name: sync-mori-docs
description: Sync documentation from the mori source repository to this mori-docs Fumadocs site, reconciling docs/user, embedded CLI help, schema changes, and public MDX pages.
---

# Sync Mori Documentation

Use this skill when updating `mori-docs` from the `mori` source repository.

## Repositories

Source repository:

```text
/Users/shinzui/Keikaku/bokuno/mori-project/mori
```

Documentation site:

```text
/Users/shinzui/Keikaku/bokuno/mori-project/mori-docs
```

## Source Of Truth

Use the source repo in this order:

1. `docs/user/` - curated public user docs and the primary source for most site pages.
2. `mori-cli/help/` - exact embedded help topics shown by `mori help <topic>`.
3. `mori-cli/src/Mori/Cli.hs` and `mori-cli/src/Mori/Command/` - command surface and flags when docs disagree or are missing.
4. `schema/` and `schema/extensions/` - Dhall schema types, defaults, migrations, and extension schemas.
5. `CHANGELOG.md` and implementation docs under `docs/` - recent feature context, but do not copy internal plans directly into public docs.

Mori help topics should have user-guide coverage. Prefer a focused guide page for each help topic when the topic is substantial. When several small or closely related help topics are better served by one guide, document that consolidation in the guide and keep the relevant command reference in sync.

## Documentation Site Structure

Public MDX pages live under:

```text
content/docs/
```

Current structure:

- `content/docs/commands/` - command reference pages.
- `content/docs/concepts/` - conceptual architecture and mental models.
- `content/docs/guides/` - task-oriented user guides.
- `content/docs/architecture/` - implementation architecture that is still suitable for public docs.
- `content/docs/index.mdx`, `getting-started.mdx`, `schema-guide.mdx`, `roadmap.mdx`, `changelog.mdx` - top-level pages.

When adding or renaming pages, update the nearest `meta.json`.

## Sync Workflow

### 1. Find The Last Reviewed Source Commit

Start with the source repo user-doc changelog:

```bash
sed -n '1,80p' /Users/shinzui/Keikaku/bokuno/mori-project/mori/docs/user/CHANGELOG.md
```

Use the latest baseline SHA recorded there. If no usable SHA exists, compare against recent commits and inspect current source docs directly.

### 2. Review User-Facing Changes

From the source repo:

```bash
cd /Users/shinzui/Keikaku/bokuno/mori-project/mori
git log --oneline <baseline>..HEAD -- docs/user mori-cli/help mori-cli/src/Mori/Cli.hs mori-cli/src/Mori/Command schema CHANGELOG.md
git diff --name-only <baseline>..HEAD -- docs/user mori-cli/help mori-cli/src/Mori/Cli.hs mori-cli/src/Mori/Command schema CHANGELOG.md
```

For each changed file, decide whether it affects public docs, command syntax, flags, schema fields, setup, automation, registry behavior, or examples.

### 3. Check Current Source Coverage

List current source docs and help topics:

```bash
find /Users/shinzui/Keikaku/bokuno/mori-project/mori/docs/user -maxdepth 1 -type f -name '*.md' -exec basename {} .md \; | sort
find /Users/shinzui/Keikaku/bokuno/mori-project/mori/mori-cli/help -maxdepth 1 -type f -name '*.md' -exec basename {} .md \; | sort
```

Then compare with site pages:

```bash
find /Users/shinzui/Keikaku/bokuno/mori-project/mori-docs/content/docs -maxdepth 2 -type f -name '*.mdx' | sort
```

Every `mori-cli/help/*.md` topic should be covered by either:

1. A matching guide in `content/docs/guides/`, preferably with the same slug.
2. A clearly relevant guide section when the topic is intentionally consolidated with related material.

Command reference pages are not enough by themselves for help-topic coverage. They should contain exact syntax and flags, while guides should explain workflows, context, examples, and tradeoffs.

Missing a `docs/user/*.md` page usually means the site needs a page or an existing page needs to absorb that content.

### 4. Map Source Docs To Site Pages

Primary mappings from `docs/user/`:

| Source | Target |
|---|---|
| `README.md` | `content/docs/index.mdx` and section index pages as needed |
| `getting-started.md` | `content/docs/getting-started.mdx` |
| `schema-guide.md` | `content/docs/schema-guide.mdx` |
| `schema-reference.md` | `content/docs/guides/schema-reference.mdx` |
| `schema-migrations.md` | `content/docs/guides/schema-migrations.mdx` |
| `local-registry.md` | `content/docs/concepts/local-registry.mdx` |
| `mori-refs.md` | `content/docs/concepts/canonical-refs.mdx` |
| `automation.md` | `content/docs/guides/automation.mdx` |
| `automation-test-repos.md` | `content/docs/guides/automation-test-repos.mdx` |
| `cross-repo-workflows.md` | `content/docs/guides/cross-repo-workflows.mdx` |
| `reaction-history.md` | `content/docs/guides/reaction-history.mdx` |
| `apps.md` | `content/docs/guides/apps.mdx` |
| `agent-context.md` | `content/docs/concepts/agent-context.mdx` |
| `agent-sessions.md` | `content/docs/guides/agent-sessions.mdx` |
| `extensions.md` | `content/docs/guides/extensions.mdx` |
| `kit.md` | `content/docs/guides/kit.mdx` |
| `aliases.md` | `content/docs/guides/aliases.mdx` and `content/docs/commands/alias.mdx` |
| `completions.md` | `content/docs/guides/shell-integration.mdx` or `content/docs/commands/completions.mdx` |
| `dependencies.md` | `content/docs/commands/deps.mdx` |
| `navigation.md` | `content/docs/guides/navigation.mdx` plus `commands/cd.mdx`, `commands/path.mdx`, `commands/browse.mdx` |
| `registry-domains.md` | `content/docs/commands/registry.mdx` and registry-related guide sections |
| `registry-exec.md` | `content/docs/commands/registry.mdx` |
| `registry-groups.md` | `content/docs/commands/registry.mdx` |
| `registry-templates.md` | `content/docs/commands/registry.mdx` |
| `status.md` | `content/docs/commands/doctor.mdx` or a new command page if the command exists in the site nav |
| `CHANGELOG.md` | sync ledger only; do not copy directly to public changelog |

Command reference pages are curated from command behavior and may combine several source files or help topics. Current command pages:

```text
agent alias app automate browse cd completions cookbook deps doctor extension
help init kit path reaction register registry schema show tech-radar validate workflow
```

If a new top-level command is added, create `content/docs/commands/<command>.mdx`, add frontmatter, and add the page to `content/docs/commands/meta.json`.

### 5. Map Help Topics To Guides

Use these current mappings as the baseline. If the target does not exist, create it and add it to `content/docs/guides/meta.json`.

| Help Topic | Likely Target |
|---|---|
| `agent-ask.md` | `guides/agent-ask.mdx` or `guides/agent-sessions.mdx` with an explicit `agent ask` section |
| `aliases.md` | `guides/aliases.mdx` |
| `apps.md` | `guides/apps.mdx` |
| `automation-config.md` | `guides/automation.mdx` |
| `automation-daemon.md` | `guides/automation-daemon.mdx` |
| `checklist.md` | `guides/checklist.mdx` |
| `cookbook.md` | `guides/cookbook.mdx` |
| `corpus-learning.md` | `guides/corpus-learning.mdx` |
| `cross-repo-automation.md` | `guides/cross-repo-workflows.mdx` |
| `extensions.md` | `guides/extensions.mdx` |
| `kit.md` | `guides/kit.mdx` |
| `mori-refs.md` | `guides/mori-refs.mdx` or `concepts/canonical-refs.mdx` plus a guide-facing entry |
| `project-config.md` | `guides/project-config.mdx` or `schema-guide.mdx` plus `guides/schema-reference.mdx` |
| `reaction-history.md` | `guides/reaction-history.mdx` |
| `registry-domains.md` | `guides/registry-domains.mdx` |
| `registry-exec.md` | `guides/registry-exec.mdx` |
| `registry-groups.md` | `guides/registry-groups.mdx` |
| `registry-templates.md` | `guides/registry-templates.mdx` |
| `schema-modification.md` | `guides/schema-migrations.mdx` |
| `schema-records.md` | `guides/schema-guide.mdx` or `schema-guide.mdx` |
| `schema-types.md` | `guides/schema-reference.mdx` |
| `seihou-templates.md` | `guides/seihou-templates.mdx` |
| `status.md` | `guides/status.mdx` |
| `tech-radar.md` | `guides/tech-radar.mdx` |
| `trailer-matching.md` | `guides/trailer-matching.mdx` |
| `upstream-issues.md` | `guides/upstream-issues.mdx` |

For new help topics, create a guide by default. Consolidate only when a standalone page would duplicate an existing guide; in that case, add a clearly named section and keep the mapping table current.

### 6. Convert Markdown To MDX

MDX pages should use this frontmatter shape:

```mdx
---
title: mori registry
description: Query and manage the local registry
icon: Database
---
```

Rules:

- Preserve existing MDX frontmatter, imports, links, and Fumadocs conventions.
- Convert shell code blocks to `bash` when editing nearby content.
- Prefer root-relative docs links such as `/docs/concepts/canonical-refs`.
- Keep public docs task-focused; avoid copying internal implementation plans, issue notes, or old migration logs unless they help users.
- Keep command syntax exact. Verify flags against source code or `mori <command> --help` when in doubt.

### 7. Update Changelogs

The source repo's `docs/user/CHANGELOG.md` tracks source-doc audit baselines. Do not edit it from `mori-docs` unless the user explicitly asks to update the source repo too.

After a docs-site sync, update:

```text
content/docs/changelog.mdx
```

Use user-facing entries with dates, features, commands, flags, schema changes, and links to updated pages. Avoid raw git bookkeeping in the public changelog.

If the docs repo gains a root `CHANGELOG.md` later, use it for sync bookkeeping only: baseline SHA, commits reviewed, and files updated.

## Useful Commands

```bash
# Source repo status and latest commit
cd /Users/shinzui/Keikaku/bokuno/mori-project/mori
git status --short
git rev-parse HEAD

# Docs repo status
cd /Users/shinzui/Keikaku/bokuno/mori-project/mori-docs
git status --short

# Validate docs site after edits
pnpm types:check
pnpm build
```

## Icon Mapping

Use Lucide icon names already available through `lucide-react`.

Current command/page conventions:

- `agent`: `Bot`
- `alias`: `Terminal`
- `app`: `Webhook`
- `automate`: `Zap`
- `browse`: `ExternalLink`
- `cd`: `FolderOpen`
- `changelog`: `ScrollText`
- `completions`: `Shell`
- `cookbook`: `BookOpen`
- `deps`: `GitBranch`
- `doctor`: `Stethoscope`
- `extension`: `Puzzle`
- `help`: `CircleQuestionMark`
- `init`: `Sparkles`
- `kit`: `Package`
- `path`: `MapPin`
- `reaction`: `Activity`
- `register`: `ClipboardCheck`
- `registry`: `Database`
- `schema`: `FileCode`
- `show`: `Eye`
- `tech-radar`: `Radar`
- `validate`: `CheckCircle2`
- `workflow`: `Network`

To inspect valid icons:

```bash
node -e "console.log(Object.keys(require('lucide-react').icons).join('\n'))"
```

## Final Checklist

- Public behavior and examples match source docs/help/code.
- Every `mori-cli/help/*.md` topic has guide coverage, with consolidated topics called out intentionally.
- New or renamed pages are listed in the relevant `meta.json`.
- Internal-only source docs were not copied into public pages.
- `content/docs/changelog.mdx` has a user-facing entry when the sync changes visible docs.
- `pnpm types:check` and, for broader edits, `pnpm build` pass or failures are reported.

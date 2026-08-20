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

The baseline lives in the source repo's docs-sync ledger, under the `mori-docs`
surface:

```bash
cat /Users/shinzui/Keikaku/bokuno/mori-project/mori/docs/docs-sync.json
```

Use `surfaces["mori-docs"].sourceBaseline`. A `null` baseline, or a `coverage`
of `partial`, means the range is wider than the last recorded sync — read
`notes` for what that sync did and did not cover.

`docs/user/CHANGELOG.md` predates the ledger and only ever tracked `docs/user`.
Read it for narrative context, never for the baseline.

After the sync, update **both** `surfaces["mori-docs"].sourceBaseline` (the mori
SHA audited) and `targetBaseline` (this repo's HEAD), and set `coverage`
honestly.

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
| `ddd.md` | `content/docs/commands/ddd.mdx` and `content/docs/guides/ddd.mdx` |
| `okf.md` | `content/docs/guides/okf.mdx` |
| `operations.md` | `content/docs/commands/ops.mdx` |
| `plan-dependencies.md` | `content/docs/commands/plans.mdx` |
| `api.md` | `content/docs/commands/serve.mdx` (endpoint reference is an open gap) |
| `navigation.md` | `content/docs/guides/navigation.mdx` plus `commands/cd.mdx`, `commands/path.mdx`, `commands/browse.mdx` |
| `registry-domains.md` | `content/docs/commands/registry.mdx` and registry-related guide sections |
| `registry-exec.md` | `content/docs/commands/registry.mdx` |
| `registry-groups.md` | `content/docs/commands/registry.mdx` |
| `registry-templates.md` | `content/docs/commands/registry.mdx` |
| `status.md` | `content/docs/commands/status.mdx` and `content/docs/guides/status.mdx` |
| `CHANGELOG.md` | narrative context only; the machine baseline is `docs/docs-sync.json`. Do not copy either into the public changelog |

Command reference pages are curated from command behavior and may combine several source files or help topics. Current command pages:

```text
agent alias app automate backfill browse cd checklist completions cookbook ddd
deps diagram doctor extension help identity improvement-requests init kit observe
ops path plans project reaction register registry schema serve show signal status
tech-radar upstream-issues validate workflow
```

Do not hand-maintain this list against memory. Enumerate the real surface and
diff it:

```bash
mori --help          # every top-level command
ls content/docs/commands/*.mdx
```

`agents/skills/docs-sync/scripts/drift-check.sh` in the mori repo does exactly
this comparison (section 7) and reports both a command with no page and a page
whose command no longer exists.

If a new top-level command is added, create `content/docs/commands/<command>.mdx`, add frontmatter, and add the page to `content/docs/commands/meta.json`. When a command is *removed*, delete its page, drop it from `meta.json`, and repoint every inbound link — including historical `changelog.mdx` entries, where the prose stays but the link must go.

### 5. Map Help Topics To Guides

Twenty-six topics have a same-slug guide today. Treat same-slug as the default
and verify it rather than trusting this table:

```bash
for t in /Users/shinzui/Keikaku/bokuno/mori-project/mori/mori-cli/help/*.md; do
  n=$(basename "$t" .md)
  [ -f "content/docs/guides/$n.mdx" ] || echo "no same-slug guide: $n"
done
```

Same-slug guides currently exist for: `agent-ask`, `agent-plans`, `aliases`,
`apps`, `automation-daemon`, `bootstrap-extensions`, `checklist`, `cookbook`,
`corpus-learning`, `ddd`, `extensions`, `improvement-requests`, `kit`,
`mori-refs`, `okf`, `project-config`, `reaction-history`, `registry-domains`,
`registry-exec`, `registry-groups`, `registry-templates`, `seihou-templates`,
`status`, `tech-radar`, `trailer-matching`, `upstream-issues`.

Topics deliberately consolidated elsewhere:

| Help Topic | Covered by |
|---|---|
| `automation-config` | `guides/automation.mdx` |
| `cross-repo-automation` | `guides/cross-repo-workflows.mdx` |
| `schema-modification` | `guides/schema-migrations.mdx` |
| `schema-records` | `schema-guide.mdx` |
| `schema-types` | `guides/schema-reference.mdx` |

Topics with **no** guide coverage at all — each is an open gap, not a
consolidation:

| Help Topic | Gap |
|---|---|
| `api` | The HTTP read surface. `commands/serve.mdx` covers the command, not the endpoints or their contracts |
| `operations` | Now partly covered by `commands/ops.mdx`; the daemon lock, metrics endpoints, and checkpoint policies still have no guide |
| `signal-deliveries` | `commands/signal.mdx` covers the command; delivery states, redrive, and consent have no guide |
| `debug-automation` | No page |
| `extensions-declarative` | No page; `guides/extensions.mdx` covers the typed extension system only |
| `project-identity` | Now covered by `commands/identity.mdx`; no conceptual guide |
| `registry-upgrade` | No page |

For new help topics, create a guide by default. Consolidate only when a standalone page would duplicate an existing guide; in that case, add a clearly named section and keep this table current.

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

Current command-page assignments, read off the pages themselves:

- `agent`: `Bot`
- `alias`: `CornerDownRight`
- `app`: `Webhook`
- `automate`: `Zap`
- `backfill`: `DatabaseZap`
- `browse`: `Globe`
- `cd`: `FolderOpen`
- `changelog`: `ScrollText`
- `checklist`: `ListChecks`
- `completions`: `SquareTerminal`
- `cookbook`: `BookText`
- `ddd`: `Network`
- `deps`: `GitFork`
- `diagram`: `GitGraph`
- `doctor`: `Stethoscope`
- `extension`: `Puzzle`
- `help`: `CircleQuestionMark`
- `identity`: `IdCard`
- `improvement-requests`: `Lightbulb`
- `init`: `FolderPlus`
- `kit`: `Package`
- `observe`: `Eye`
- `ops`: `Wrench`
- `path`: `MapPin`
- `plans`: `ClipboardList`
- `project`: `Boxes`
- `reaction`: `Activity`
- `register`: `Upload`
- `registry`: `Database`
- `schema`: `FileCode`
- `serve`: `Server`
- `show`: `Eye`
- `signal`: `Radio`
- `status`: `Activity`
- `tech-radar`: `Radar`
- `upstream-issues`: `CircleAlert`
- `validate`: `CircleCheck`
- `workflow`: `GitPullRequest`

Regenerate rather than trusting the list:

```bash
for f in content/docs/commands/*.mdx; do
  printf '%s: %s\n' "$(basename "$f" .mdx)" "$(grep -m1 '^icon:' "$f")"
done
```

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

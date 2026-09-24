// Regenerate the public use-case diagrams with `node scripts/generate-use-case-diagrams.mjs`.
// Source concepts: mori://shinzui/mori/okf/use-cases
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(
	new URL("../public/diagrams/use-cases/", import.meta.url),
);
mkdirSync(out, { recursive: true });

const color = {
	bg: "#f4f8f5",
	paper: "#ffffff",
	ink: "#18352a",
	body: "#3f5b4b",
	muted: "#526b5c",
	line: "#cbded0",
	green: "#166534",
	greenTint: "#e8f5ec",
	amber: "#9a5a07",
	amberTint: "#fff5e5",
	slate: "#566575",
	slateTint: "#eef2f5",
};

const states = {
	delivered: {
		label: "exists today",
		accent: color.green,
		tint: color.greenTint,
		dash: "",
	},
	planned: {
		label: "planned",
		accent: color.amber,
		tint: color.amberTint,
		dash: ' stroke-dasharray="6 4"',
	},
	discovered: {
		label: "discovered",
		accent: color.slate,
		tint: color.slateTint,
		dash: ' stroke-dasharray="6 4"',
	},
	blocked: {
		label: "blocked",
		accent: color.amber,
		tint: color.amberTint,
		dash: ' stroke-dasharray="6 4"',
	},
};

// Wording is intentionally short enough to read at the width of a docs page. The
// linked MDX pages explain the qualifications and source-owned delivery status.
const cases = [
	{
		id: "UC-1",
		slug: "architect-a-multi-service-system-from-a-meta-repo",
		title: "Architect a 30-service system",
		theme: "Architecture governance",
		status: "delivered",
		trigger:
			"An architect needs a current view across many changing service models.",
		steps: [
			[
				"Service repositories",
				"Declare bounded contexts, flows, and terms in DDD models.",
				"delivered",
			],
			[
				"Mori registry",
				"Group the fleet and query its context models with canonical sources.",
				"delivered",
			],
			[
				"Meta repository",
				"Compare the target context map with the services' current models.",
				"delivered",
			],
			[
				"Mori automation",
				"Validate decision references and refresh reports after model changes.",
				"delivered",
			],
		],
		outcome:
			"Architecture decisions and migrations stay grounded in a queryable system view.",
		gaps: [],
	},
	{
		id: "UC-2",
		slug: "upgrade-a-dependency-tree-in-dependency-order",
		title: "Upgrade a dependency tree in order",
		theme: "Fleet maintenance",
		status: "draft",
		trigger:
			"Project A records a major release; B depends on A, and C depends on both.",
		steps: [
			[
				"Registry release",
				"Record a durable release fact and find its dependents.",
				"delivered",
			],
			[
				"Dependency graph",
				"Preflight a bounded reverse graph in topological waves.",
				"delivered",
			],
			[
				"Signal cascade",
				"Checkpoint the graph; advance a target after its upstream steps succeed.",
				"delivered",
			],
			[
				"Workflow trace",
				"Show completed, blocked, and independent branches under one workflow.",
				"delivered",
			],
		],
		outcome:
			"B upgrades before C, while failures block only their descendants.",
		gaps: [
			"Constraint-aware release classification · planned",
			"Agent-driven upgrade repair · planned",
		],
	},
	{
		id: "UC-3",
		slug: "regenerate-a-downstream-artifact-when-its-contract-changes",
		title: "Regenerate after a contract change",
		theme: "Fleet maintenance",
		status: "draft",
		trigger: "A producer changes an OpenAPI, protobuf, Dhall, or DDL contract.",
		steps: [
			[
				"Producer selector",
				"Match changed contract paths and emit a structured signal.",
				"delivered",
			],
			[
				"Mori registry",
				"Resolve direct consumers from declared dependencies.",
				"delivered",
			],
			[
				"Consumer reaction",
				"Check target consent, then run its bounded regeneration command.",
				"delivered",
			],
			[
				"Workflow trace",
				"Coalesce repeat changes and show each consumer's delivery state.",
				"delivered",
			],
		],
		outcome: "Each consenting consumer regenerates its own derived artifacts.",
		gaps: ["Agent-driven regeneration and call-site repair · planned"],
	},
	{
		id: "UC-4",
		slug: "trust-automation-running-on-your-repositories",
		title: "Trust repository automation",
		theme: "Automation trust",
		status: "draft",
		trigger: "A maintainer leaves repository reactions running unattended.",
		steps: [
			[
				"Declared policy",
				"Keep project identity separate from automation configuration.",
				"delivered",
			],
			[
				"Consent and bounds",
				"Check target consent and enforce delivery reach limits.",
				"delivered",
			],
			[
				"Explanation",
				"Inspect why a selector matched and trace what each reaction did.",
				"delivered",
			],
			[
				"Event history",
				"Rebuild projections and audit durable provenance after logs are gone.",
				"delivered",
			],
		],
		outcome:
			"A maintainer can explain reach, cause, execution, and recorded history.",
		gaps: [
			"ExecutionPolicy enforcement · discovered",
			"Selective event compaction · blocked",
		],
	},
	{
		id: "UC-5",
		slug: "ground-a-coding-agent-in-declared-project-knowledge",
		title: "Ground a coding agent",
		theme: "Knowledge access",
		status: "draft",
		trigger: "An agent or engineer opens an unfamiliar repository.",
		steps: [
			[
				"Project manifest",
				"Read project identity, dependencies, standards, and agent hints.",
				"delivered",
			],
			[
				"Local registry",
				"Resolve dependency source and curated docs by project name.",
				"delivered",
			],
			[
				"Knowledge catalogs",
				"Search concepts and worked examples with provenance.",
				"delivered",
			],
			[
				"Agent context",
				"Assemble role context and cite facts with resolvable mori:// URIs.",
				"delivered",
			],
		],
		outcome: "The task starts from declared, inspectable project knowledge.",
		gaps: [
			"Protocol-neutral agent access · discovered",
			"Curated reference freshness · discovered",
		],
	},
	{
		id: "UC-6",
		slug: "carry-dependency-knowledge-to-a-new-machine-and-the-next-person",
		title: "Carry dependency knowledge forward",
		theme: "Knowledge access",
		status: "draft",
		trigger: "A teammate needs a hard-won dependency answer on a new machine.",
		steps: [
			[
				"Wrapper project",
				"Keep upstream source and curated findings under one identity.",
				"delivered",
			],
			[
				"Mori registry",
				"Resolve the wrapper by name, independent of checkout layout.",
				"delivered",
			],
			[
				"Knowledge catalogs",
				"Search docs and typed findings across registered projects.",
				"delivered",
			],
			[
				"New machine",
				"Acquire a fleet index before visiting every checkout.",
				"discovered",
			],
		],
		outcome:
			"Findings stay with the dependency; fresh-machine lookup awaits registry sync.",
		gaps: [
			"Registry sync between machines · discovered",
			"Low-friction read tier · discovered",
		],
	},
	{
		id: "UC-7",
		slug: "keep-automation-working-when-the-vcs-changes",
		title: "Keep automation working through VCS change",
		theme: "Automation trust",
		status: "draft",
		trigger: "A repository rewrites Git history or adopts a different VCS.",
		steps: [
			[
				"VCS observation",
				"Normalize Git changesets and refs into recorded facts.",
				"delivered",
			],
			[
				"Content identity",
				"Deduplicate observed work by content across rewritten SHAs.",
				"delivered",
			],
			[
				"Rewrite recovery",
				"Detect orphaned cursors and safely resume exact replays.",
				"delivered",
			],
			[
				"Adapter selection",
				"Observe a declared Jujutsu repository through its own adapter.",
				"discovered",
			],
		],
		outcome:
			"Git rewrites replay safely; another VCS still needs a selected adapter.",
		gaps: [
			"Jujutsu adapter and selection · discovered",
			"Durable rewrite lineage · discovered",
		],
	},
];

function esc(value) {
	return String(value)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

function txt(
	x,
	y,
	value,
	size = 15,
	weight = 400,
	fill = color.ink,
	extra = "",
) {
	return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${esc(value)}</text>`;
}

function wrap(value, maxChars) {
	const lines = [];
	let line = "";
	for (const word of value.split(/\s+/)) {
		if (line && `${line} ${word}`.length > maxChars) {
			lines.push(line);
			line = word;
		} else line = line ? `${line} ${word}` : word;
	}
	if (line) lines.push(line);
	return lines;
}

function textBlock(
	x,
	y,
	value,
	maxChars,
	size = 15,
	weight = 400,
	fill = color.ink,
	lineHeight = 21,
) {
	return wrap(value, maxChars)
		.map((line, i) => txt(x, y + i * lineHeight, line, size, weight, fill))
		.join("\n");
}

function svg(content, title, description, width, height) {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
<title id="title">${esc(title)}</title><desc id="desc">${esc(description)}</desc>
<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="${color.green}"/></marker></defs>
<rect width="${width}" height="${height}" rx="20" fill="${color.bg}"/>
<g font-family="Inter, system-ui, sans-serif">${content}</g></svg>\n`;
}

function card(x, y, w, h, label, body, state = "delivered") {
	const s = states[state];
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="${color.paper}" stroke="${s.accent}" stroke-width="1.5"${s.dash}/>
<rect x="${x}" y="${y}" width="6" height="${h}" rx="3" fill="${s.accent}"/>
${txt(x + 22, y + 29, label, 14, 700, color.ink)}
<rect x="${x + w - 116}" y="${y + 12}" width="100" height="23" rx="11" fill="${s.tint}"/>
${txt(x + w - 66, y + 28, s.label, 10.5, 700, s.accent, 'text-anchor="middle"')}
${textBlock(x + 22, y + 57, body, 53, 14, 400, color.body, 20)}`;
}

function glance(item) {
	const W = 1040,
		H = item.gaps.length ? 875 : 767;
	const parts = [
		txt(
			40,
			42,
			`${item.id} · AT A GLANCE`,
			12,
			700,
			color.green,
			'letter-spacing="2"',
		),
		txt(40, 82, item.title, 29, 700),
		txt(
			40,
			116,
			item.theme.toUpperCase(),
			11,
			700,
			color.muted,
			'letter-spacing="1.5"',
		),
		txt(
			870,
			116,
			item.status.toUpperCase(),
			11,
			700,
			item.status === "delivered" ? color.green : color.slate,
			'letter-spacing="1.5"',
		),
		txt(
			40,
			157,
			"WHAT STARTS IT",
			11,
			700,
			color.muted,
			'letter-spacing="1.5"',
		),
		txt(
			304,
			157,
			"WHAT MORI DOES",
			11,
			700,
			color.muted,
			'letter-spacing="1.5"',
		),
		`<rect x="40" y="174" width="226" height="156" rx="13" fill="${color.greenTint}" stroke="${color.green}"/>`,
		txt(58, 203, "TRIGGER", 11, 700, color.green, 'letter-spacing="1"'),
		textBlock(58, 232, item.trigger, 25, 15, 500, color.ink, 22),
		`<path d="M266 250 H295" fill="none" stroke="${color.green}" stroke-width="2" marker-end="url(#arrow)"/>`,
	];
	item.steps.forEach(([label, body, state], i) => {
		const y = 174 + i * 132;
		parts.push(card(304, y, 448, 108, `${i + 1}. ${label}`, body, state));
		if (i < 3)
			parts.push(
				`<path d="M528 ${y + 110} V${y + 129}" fill="none" stroke="${color.green}" stroke-width="2" marker-end="url(#arrow)"/>`,
			);
	});
	parts.push(
		`<path d="M752 624 H782" fill="none" stroke="${color.green}" stroke-width="2" marker-end="url(#arrow)"/>`,
	);
	parts.push(
		`<rect x="793" y="536" width="207" height="190" rx="13" fill="${color.greenTint}" stroke="${color.green}"/>`,
	);
	parts.push(
		txt(811, 565, "OUTCOME", 11, 700, color.green, 'letter-spacing="1"'),
	);
	parts.push(textBlock(811, 594, item.outcome, 22, 14, 500, color.ink, 20));
	if (item.gaps.length) {
		parts.push(
			txt(
				40,
				751,
				"STILL TO BUILD",
				11,
				700,
				color.muted,
				'letter-spacing="1.5"',
			),
		);
		item.gaps.forEach((gap, i) => {
			const x = 40 + i * (item.gaps.length === 1 ? 0 : 488);
			const w = item.gaps.length === 1 ? 960 : 472;
			const accent =
				gap.endsWith("planned") || gap.endsWith("blocked")
					? color.amber
					: color.slate;
			parts.push(
				`<rect x="${x}" y="768" width="${w}" height="65" rx="11" fill="${color.paper}" stroke="${accent}" stroke-dasharray="5 4"/>`,
			);
			parts.push(
				textBlock(
					x + 17,
					796,
					gap,
					item.gaps.length === 1 ? 94 : 43,
					14,
					600,
					color.ink,
					20,
				),
			);
		});
	}
	const description = `${item.id}: ${item.trigger} ${item.steps.map((s) => s[1]).join(" ")} ${item.outcome} ${item.gaps.join("; ")}`;
	return svg(parts.join("\n"), `${item.id}: ${item.title}`, description, W, H);
}

function catalog() {
	const W = 1040,
		H = 755;
	const parts = [
		txt(40, 42, "MORI · USE CASES", 12, 700, color.green, 'letter-spacing="2"'),
		txt(40, 82, "Seven outcomes, one connected system", 28, 700),
		txt(
			40,
			113,
			"Open a case to see its trigger, flow, outcome, and remaining work.",
			15,
			400,
			color.body,
		),
	];
	cases.forEach((item, i) => {
		const y = 143 + i * 82;
		const st =
			item.status === "delivered" ? states.delivered : states.discovered;
		parts.push(`<a href="/docs/use-cases/${item.slug}">`);
		parts.push(
			`<rect x="40" y="${y}" width="960" height="68" rx="11" fill="${color.paper}" stroke="${color.line}"/>`,
		);
		parts.push(
			`<rect x="40" y="${y}" width="6" height="68" rx="3" fill="${st.accent}"/>`,
		);
		parts.push(txt(60, y + 26, item.id, 12, 700, color.green));
		parts.push(txt(119, y + 26, item.title, 17, 700));
		parts.push(
			txt(
				119,
				y + 49,
				`${item.theme} · ${item.gaps.length ? `${item.gaps.length} remaining gap${item.gaps.length > 1 ? "s" : ""}` : "all recorded features delivered"}`,
				12,
				400,
				color.muted,
			),
		);
		parts.push(
			`<rect x="878" y="${y + 20}" width="100" height="26" rx="13" fill="${st.tint}"/>`,
		);
		parts.push(
			txt(928, y + 38, item.status, 11, 700, st.accent, 'text-anchor="middle"'),
		);
		parts.push("</a>");
	});
	return svg(
		parts.join("\n"),
		"Mori use-case catalog",
		"Seven Mori use cases with source status and remaining gaps. Each row links to its page.",
		W,
		H,
	);
}

for (const item of cases)
	writeFileSync(join(out, `${item.slug}.svg`), glance(item));
writeFileSync(join(out, "catalog.svg"), catalog());
console.log(`Generated ${cases.length + 1} use-case diagrams.`);

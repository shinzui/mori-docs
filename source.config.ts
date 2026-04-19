import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import dhallGrammar from "./src/lib/grammars/dhall.tmLanguage.json";

export const docs = defineDocs({
	dir: "content/docs",
});

const dhall = {
	...dhallGrammar,
	name: "dhall",
	aliases: ["Dhall"],
};

export default defineConfig({
	mdxOptions: {
		rehypeCodeOptions: {
			...rehypeCodeDefaultOptions,
			lazy: false,
			langs: [
				dhall,
				"bash",
				"fish",
				"haskell",
				"json",
				"nix",
				"sql",
				"zsh",
			] as never,
		},
	},
});

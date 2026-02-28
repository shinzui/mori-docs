import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: "森 mori",
		},
		links: [
			{
				text: "Documentation",
				url: "/docs",
				active: "nested-url",
			},
		],
	};
}

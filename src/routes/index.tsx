import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<HomeLayout {...baseOptions()}>
			<div className="flex flex-col flex-1 justify-center px-4 py-16 text-center">
				<img
					src="/mori-logo.png"
					alt="mori logo"
					className="size-20 mx-auto mb-6"
				/>
				<h1 className="font-bold text-4xl mb-4">mori</h1>
				<p className="text-fd-muted-foreground text-lg mb-2">
					Project Identity & Automation
				</p>
				<p className="text-fd-muted-foreground max-w-md mx-auto mb-8">
					Make your projects self-describing and queryable — so humans, agents,
					and automation all share the same structured understanding of what
					each project is, what it depends on, and how it connects to everything
					else.
				</p>
				<Link
					to="/docs/$"
					params={{
						_splat: "",
					}}
					className="px-4 py-2.5 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm mx-auto hover:opacity-90 transition-opacity"
				>
					Get Started
				</Link>
			</div>
		</HomeLayout>
	);
}

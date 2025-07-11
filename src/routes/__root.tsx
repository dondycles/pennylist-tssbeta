import type { QueryClient } from "@tanstack/react-query"
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	ScriptOnce,
	Scripts,
} from "@tanstack/react-router"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import { Toaster } from "@/components/ui/sonner"
import { userQueryOptions } from "@/lib/queries/user"
import { useEffect } from "react"
import { getSerwist } from "virtual:serwist"
import appCss from "@/app.css?url"
import type { getUser } from "@/lib/server/fn/user"

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient
	user: Awaited<ReturnType<typeof getUser>>
}>()({
	beforeLoad: async ({ context }) => {
		const user = await context.queryClient.fetchQuery(userQueryOptions())
		return { user }
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "pennylist. | List and Track Every Penny",
			},
			{
				name: "description",
				content: "List and Track Every Penny",
			},
			{ name: "theme-color", content: "#000000" },
			{ name: "background-color", content: "#000000" },
			{ name: "display", content: "standalone" },
			{ name: "mobile-web-app-capable", content: "yes" },
			{ name: "og:title", content: "pennylist." },
			{ name: "og:description", content: "List and track every penny." },
			{ name: "og:site_name", content: "pennylist." },
			{ name: "og:image", content: "https://pennylist.app/summary.png" },
			{ name: "og:url", content: "https://pennylist.app" },
			{ name: "twitter:image", content: "https://pennylist.app/summary.png" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "pennylist." },
			{ name: "twitter:description", content: "List and track every penny." },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "apple-touch-icon", href: "/icon-256.png", sizes: "256x256" },
			{ rel: "mask-icon", href: "/icon-512.png" },
			{ rel: "manifest", href: "/manifest.json" },
		],
	}),
	component: RootComponent,
})

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function RootDocument({ children }: { readonly children: React.ReactNode }) {
	useEffect(() => {
		let serwist: Awaited<ReturnType<typeof getSerwist>> | undefined
		const onInstalled = () => {
			console.log("Serwist installed!")
		}

		const loadSerwist = async () => {
			if ("serviceWorker" in navigator) {
				serwist = await getSerwist()

				serwist?.addEventListener("installed", onInstalled)

				void serwist?.register()
			}
		}

		loadSerwist()

		return () => {
			serwist?.removeEventListener("installed", onInstalled)
		}
	}, [])
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="lexend h-dvh bg-background text-foreground antialiased">
				<ScriptOnce>
					{`document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )`}
				</ScriptOnce>
				{children}
				<Toaster richColors />
				<ReactQueryDevtools buttonPosition="bottom-left" />
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
			</body>
		</html>
	)
}

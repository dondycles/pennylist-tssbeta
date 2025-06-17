// src/router.tsx
import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { QueryClient } from "@tanstack/react-query"
import { routerWithQueryClient } from "@tanstack/react-router-with-query"
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary"
import { NotFound } from "./components/NotFound"
export function createRouter() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				staleTime: Number.POSITIVE_INFINITY,
				retry: 0,
			},
		},
	})

	const router = routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			context: { queryClient, user: null },
			defaultPreload: "intent",
			defaultPreloadStaleTime: Number.POSITIVE_INFINITY,
			defaultErrorComponent: DefaultCatchBoundary,
			defaultNotFoundComponent: NotFound,
			scrollRestoration: true,
			defaultStructuralSharing: true,
			defaultStaleTime: Number.POSITIVE_INFINITY,
		}),
		queryClient
	)

	return router
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>
	}
}

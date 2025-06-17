import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/(auth)")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		if (context.user) {
			throw redirect({
				to: "/list",
			})
		}
	},
})

function RouteComponent() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
			<div className="w-full max-w-sm space-y-4">
				<Link to="/" className="flex flex-col items-center gap-2 font-medium">
					<img
						src="skeleton.png"
						alt="Logo"
						className="mb-4 size-16 not-dark:invert"
					/>
					<span className="sr-only">pennylist.</span>
				</Link>
				<Outlet />
			</div>
		</div>
	)
}

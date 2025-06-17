import PageStatusSetter from "@/components/PageStatusSetter"
import Scrollable from "@/components/Scrollable"
import { createFileRoute } from "@tanstack/react-router"
import { Activity, RefreshCw } from "lucide-react"

export const Route = createFileRoute("/(user)/analytics/")({
	component: RouteComponent,
})

import { MoneyBreakdownBarChart } from "@/components/MoneyBreakdownBarChart"
import { MoneyFlowCharts } from "@/components/MoneyFlowCharts"
import { Skeleton } from "@/components/ui/skeleton"
import { analyticsQueryOptions } from "@/lib/queries/analytics"
import type { GetUser } from "@/lib/server/fn/user"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense } from "react"

function RouteComponent() {
	const { user } = Route.useRouteContext()
	return (
		<Scrollable hideTotalMoney={true}>
			<div className="flex items-center justify-between gap-4 border-b p-4 text-muted-foreground">
				<div className="flex items-center gap-2">
					<Activity />
					<p>Analytics</p>
				</div>
				<button onClick={() => location.reload()} type="button">
					<RefreshCw className="size-4" />
				</button>
			</div>
			<Suspense
				fallback={
					<div className="w-full space-y-4 px-4">
						<Skeleton className="h-12 w-full rounded-full" />
						<Skeleton className="h-52 w-full rounded-2xl" />
						<Skeleton className="h-52 w-full rounded-2xl" />
						<Skeleton className="h-52 w-full rounded-2xl" />
					</div>
				}
			>
				<Analytics user={user} />
			</Suspense>
			<PageStatusSetter
				state={{
					showAddMoneyBtn: false,
					showSettingsBtn: true,
					showLogsPageBtn: true,
					showAnalyticsPageBtn: false,
				}}
			/>
		</Scrollable>
	)
}

function Analytics({ user }: { user: GetUser }) {
	const analytics = useSuspenseQuery({
		...analyticsQueryOptions(user?.id),
		staleTime: 0,
	})

	return (
		<>
			<MoneyFlowCharts
				data={analytics.data}
				dateJoined={new Date(user?.createdAt ?? new Date())}
			/>
			<MoneyBreakdownBarChart data={analytics.data} />
		</>
	)
}

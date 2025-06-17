import LogsMapper from "@/components/LogsMapper"
import MoneyCard from "@/components/MoneyCard"
import MoneySkeleton from "@/components/MoneySkeleton"
import { Skeleton } from "@/components/ui/skeleton"
import { moneyQueryOptions } from "@/lib/queries/money"
import { useMoneyState } from "@/lib/stores/money-state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"

export const Route = createFileRoute("/(user)/list/$id/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<Suspense fallback={<MoneySkeleton />}>
				<Money />
			</Suspense>
			<Suspense
				fallback={
					<div className="w-full 896:space-y-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={`skeleton-${i + 1}`}
								className="space-y-4 896:rounded-2xl bg-muted/25 p-4"
							>
								<Skeleton className="h-12 w-full rounded-full" />
								<div className="grid gap-4 sm:grid-cols-2">
									<Skeleton className="h-40 w-full rounded-2xl" />
									<Skeleton className="h-40 w-full rounded-2xl" />
								</div>
							</div>
						))}
					</div>
				}
			>
				<Logs />
			</Suspense>
		</>
	)
}

function Money() {
	const { id } = Route.useParams()
	const { queryClient, user } = Route.useRouteContext()
	const { total } = useMoneyState()
	const m = useSuspenseQuery(moneyQueryOptions(id))
	return (
		<MoneyCard
			queryClient={queryClient}
			user={user}
			moneysQty={1}
			deepView={true}
			m={m.data}
			totalMoney={total}
		/>
	)
}

function Logs() {
	const { user } = Route.useRouteContext()
	const { id: moneyId } = Route.useParams()

	return <LogsMapper search={{ money: moneyId }} user={user} />
}

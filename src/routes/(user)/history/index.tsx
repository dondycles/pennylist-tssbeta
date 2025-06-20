import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/animate-ui/radix/dialog"
import LogsMapper from "@/components/LogsMapper"
import PageStatusSetter from "@/components/PageStatusSetter"
import Scrollable from "@/components/Scrollable"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { moneyIdsQueryOptions } from "@/lib/queries/money"
import { debounce } from "@tanstack/pacer"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { FileClock, Filter, RefreshCw, X } from "lucide-react"
import { Suspense } from "react"
export const Route = createFileRoute("/(user)/history/")({
	component: RouteComponent,
	validateSearch: (search: {
		flow?: "asc" | "desc"
		type?: "add" | "edit" | "delete" | "transfer"
		q?: string
		money?: string
	}) => search,
	beforeLoad: async ({ search }) => {
		return { search }
	},
})

function RouteComponent() {
	return (
		<Scrollable hideTotalMoney={true}>
			<div className="flex items-center justify-between gap-4 border-b p-4 text-muted-foreground">
				<div className="flex items-center gap-2">
					<FileClock />
					<p>History </p>
				</div>
				<button onClick={() => location.reload()} type="button">
					<RefreshCw className="size-4" />
				</button>
			</div>
			<SearchInput />
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
			<PageStatusSetter
				state={{
					showAddMoneyBtn: false,
					showSettingsBtn: true,
					showLogsPageBtn: false,
					showAnalyticsPageBtn: true,
				}}
			/>
		</Scrollable>
	)
}

function SearchInput() {
	const navigate = Route.useNavigate()

	const {
		user,
		queryClient,
		search: { q, flow, type, money },
	} = Route.useRouteContext()
	const debouncedSearch = debounce(
		async (searchTerm: string) => {
			await navigate({
				to: "/history",
				search: { q: searchTerm, flow, money, type },
			})
			await queryClient.invalidateQueries({
				queryKey: ["logs", user?.id, flow, type, money, q],
			})
		},
		{
			wait: 500,
		}
	)
	return (
		<div className="flex px-4">
			<Input
				id="searchLog"
				className="-me-px rounded-e-none shadow-none focus-visible:z-10"
				placeholder="Search for `reason`"
				type="text"
				onChange={e => debouncedSearch(e.currentTarget.value)}
			/>
			<Dialog>
				<DialogTrigger className="flex items-center gap-2 rounded-s-none rounded-e-full border border-l-transparent pr-4 pl-3 text-muted-foreground text-sm">
					<Filter className="size-4" />
					<span>Filter</span>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Filter Logs</DialogTitle>
						<DialogDescription>
							Use the filters to narrow down your log search results. You can
							filter by type, money, and more.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div className="space-y-2">
							<p className="text-muted-foreground text-sm">Moneys:</p>
							<Suspense
								fallback={
									<p className="text-center text-muted-foreground text-sm">
										Getting moneys...
									</p>
								}
							>
								<MoneyIds />
							</Suspense>
						</div>
						<div className="space-y-2">
							<p className="text-muted-foreground text-sm">Type:</p>
							<div className="flex flex-wrap gap-2">
								{["add", "edit", "delete", "transfer"].map(_type => (
									<Badge
										asChild
										className="rounded-full text-sm"
										variant={"outline"}
										key={_type}
									>
										<Link
											to="/history"
											search={{
												type:
													type === _type
														? undefined
														: (_type as "add" | "edit" | "delete" | "transfer"),
												flow,
												money,
												q,
											}}
										>
											{_type}
											{type === _type ? <X /> : null}
										</Link>
									</Badge>
								))}
							</div>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

function MoneyIds() {
	const { search, user } = Route.useRouteContext()
	const moneyIds = useSuspenseQuery(moneyIdsQueryOptions(user?.id))
	return (
		<div className="flex flex-wrap gap-2">
			{moneyIds.data.map(money => (
				<Link
					key={money.id}
					to="/history"
					search={{
						...search,
						money: money.id === search.money ? undefined : money.id,
					}}
				>
					<Badge
						style={{
							color: money.color ?? "var(--foreground)",
							borderColor:
								money.color === "var(--foreground)"
									? "var(--muted)"
									: money.color || "var(--muted)",
						}}
						variant={search.money === money.id ? "secondary" : "outline"}
						className="min-w-16 rounded-3xl text-sm"
					>
						{money.name}
						{money.id === search.money ? <X /> : null}
					</Badge>
				</Link>
			))}
		</div>
	)
}

function Logs() {
	const { search, user } = Route.useRouteContext()

	return (
		<div className="pb-32">
			{search.q ? (
				<p className="mb-4 text-center text-muted-foreground">
					Results for "{search.q}"
				</p>
			) : null}
			<LogsMapper search={search} user={user} />
		</div>
	)
}

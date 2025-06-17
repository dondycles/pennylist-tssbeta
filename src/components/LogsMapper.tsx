import useAutoLoadNextPage from "@/lib/hooks/use-auto-reload-infinite-q"
import { logsQueryOptions } from "@/lib/queries/logs"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import React from "react"
import { Button } from "./ui/button"
import LogCard from "./LogCard"

export default function LogsMapper({
	search,
	user,
}: {
	search: {
		flow?: "asc" | "desc" | undefined
		type?: "add" | "edit" | "delete" | "transfer" | undefined
		q?: string | undefined
		money?: string | undefined
	}
	user: {
		email: string | undefined
		id: string
		createdAt: string
	} | null
}) {
	const logs = useSuspenseInfiniteQuery(
		logsQueryOptions({
			userId: user?.id,
			flow: search.flow,
			type: search.type,
			moneyId: search.money,
			q: search.q,
		})
	)
	const _logs = logs.data.pages.flat()

	const { ref, loaderRef } = useAutoLoadNextPage({
		fetchNextPage: () => logs.fetchNextPage(),
	})
	return (
		<>
			{_logs.map((log, i) => {
				if (i === _logs.length - 1)
					return (
						<React.Fragment key={log.id}>
							<div ref={ref} className="flex-1" />
							<LogCard log={log} />
						</React.Fragment>
					)
				return <LogCard log={log} key={log.id} />
			})}
			<Button
				className="w-full text-center font-light text-muted-foreground text-sm"
				hidden={!logs.hasNextPage}
				ref={loaderRef}
				variant={"ghost"}
				onClick={() => {
					logs.fetchNextPage()
				}}
			>
				{logs.isFetchingNextPage ? "Loading..." : "Fetch more posts"}
			</Button>
		</>
	)
}

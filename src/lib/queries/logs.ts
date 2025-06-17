import { infiniteQueryOptions } from "@tanstack/react-query"
import { getLogs } from "../server/fn/logs"

export const logsQueryOptions = ({
	userId,
	flow,
	type,
	q,
	moneyId,
}: {
	userId: string | undefined
	flow?: "asc" | "desc"
	type?: "add" | "edit" | "delete" | "transfer"
	q?: string
	moneyId?: string
}) =>
	infiniteQueryOptions({
		queryKey: ["logs", userId ?? "no-user", flow, type, moneyId, q],
		queryFn: async ({ signal, pageParam }) =>
			await getLogs({ signal, data: { flow, type, moneyId, q, pageParam } }),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined
			}
			return lastPageParam + 1
		},
	})

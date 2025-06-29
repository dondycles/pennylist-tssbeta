import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import type { Changes, Database } from "@/lib/server/supabase/types"
import { Link } from "@tanstack/react-router"
import _ from "lodash"
import { ArrowDownIcon, ArrowUpIcon, Banknote, Clock } from "lucide-react"
import Amount from "./Amount"
import TimeInfo from "./TimeInfo"
import { Separator } from "./ui/separator"
export default function LogCard({
	log,
}: {
	log: Database["public"]["Tables"]["log"]["Row"] & {
		money: Database["public"]["Tables"]["money"]["Row"] | null
	}
}) {
	const isReceiver =
		log.transferDetails?.receivers.some(r => log.moneyId === r.id) ?? false
	const getDiff = (key: "amount" | "totalMoney") => {
		const prev = log.changes.prev[key] ?? 0
		const curr = log.changes.current[key] ?? 0
		const isIncrease = prev < curr
		const hasDifference = prev !== curr
		const difference = curr - prev
		const percentChange =
			hasDifference && prev !== 0
				? Math.abs(Math.round((difference / (prev || 1)) * 100))
				: 0
		return { isIncrease, hasDifference, difference, percentChange }
	}

	const {
		isIncrease: moneyIsIncrease,
		hasDifference: moneyHasDifference,
		difference: moneyDifference,
		percentChange: moneyPercentChange,
	} = getDiff("amount")
	const {
		isIncrease: totalMoneyIsIncrease,
		hasDifference: totalMoneyHasDifference,
		difference: totalMoneyDifference,
		percentChange: totalMoneyPercentChange,
	} = getDiff("totalMoney")

	return (
		<div className="896:mb-4 w-full 896:rounded-3xl 896:border border-b bg-muted/25 p-4">
			<div className="mt-1 flex items-center gap-1 text-muted-foreground text-sm">
				<Link
					style={{
						color: !log.money
							? "var(--destructive)"
							: (log.changes.current.color ?? "var(--foreground)"),
					}}
					disabled={!log.money}
					to="/list/$id"
					params={{ id: log.moneyId as string }}
				>
					<Banknote className="inline size-4" />
					<span className="ml-1 inline text-sm">
						{log.money?.name ?? "Deleted"}
					</span>
				</Link>
				|
				<Clock className="size-4" />
				<TimeInfo createdAt={log.created_at} />
			</div>
			<p className="text-muted-foreground capitalize">
				{(log.reason ?? log.type === "transfer")
					? !isReceiver
						? log.reason
						: `Transfer from ${log.transferDetails?.sender.name}`
					: log.type}
			</p>
			<div className="mt-4 grid grid-rows-[1fr_1fr] gap-4 sm:grid-cols-[1fr_1fr] sm:grid-rows-1">
				<Data title="Previous" data={log.changes.prev} />
				<Data
					title="Current"
					data={log.changes.current}
					moneyDiffComponent={
						moneyHasDifference ? (
							<Difference
								difference={moneyDifference}
								isIncrease={moneyIsIncrease}
								percentChange={moneyPercentChange}
							/>
						) : null
					}
					totalMoneyDiffComponent={
						totalMoneyHasDifference ? (
							<Difference
								difference={totalMoneyDifference}
								isIncrease={totalMoneyIsIncrease}
								percentChange={totalMoneyPercentChange}
							/>
						) : null
					}
				/>
			</div>
			{!isReceiver && log.transferDetails ? (
				<div className="mt-4 rounded-2xl bg-muted/50 p-4">
					<p className="text-muted-foreground text-sm">Receivers</p>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Money</TableHead>
								<TableHead>Cash In</TableHead>
								<TableHead>Fee</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{log.transferDetails.receivers.map(r => (
								<TableRow
									style={{ color: r.color ?? "var(--foreground)" }}
									key={`receiver-${r.id}`}
								>
									<TableCell className="font-medium">
										<Link to="/list/$id" params={{ id: r.id as string }}>
											{r.name}
										</Link>
									</TableCell>
									<TableCell>
										{" "}
										<Amount
											className="font-light text-sm"
											amount={r.cashIn ?? 0}
											settings={{ sign: true }}
										/>
									</TableCell>
									<TableCell>
										<Amount
											className="font-light text-sm"
											amount={r.fee ?? 0}
											settings={{ sign: true }}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={2}>Total Damage</TableCell>
								<TableCell>
									<Amount
										className="font-medium text-sm"
										amount={_.sum(
											log.transferDetails.receivers.map(r => r.fee ?? 0)
										)}
										settings={{ sign: true }}
									/>
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			) : null}
		</div>
	)
}

function Data({
	data,
	moneyDiffComponent,
	totalMoneyDiffComponent,
	title,
}: {
	data: Changes["prev"]
	moneyDiffComponent?: React.ReactNode
	totalMoneyDiffComponent?: React.ReactNode
	title: string
}) {
	return (
		<div
			style={{ color: data.color ?? "var(--foreground)" }}
			className="truncate rounded-2xl bg-muted/50 p-4"
		>
			<p className="text-muted-foreground text-sm">{title}</p>
			<p className="font-bold">{data.name}</p>
			<Amount
				className="truncate text-base"
				amount={data.amount}
				settings={{ sign: true }}
			/>
			{moneyDiffComponent ? moneyDiffComponent : null}
			<Separator className="my-2" />
			<p className="text-muted-foreground text-sm">Overall Money</p>
			<Amount
				className="truncate text-base"
				amount={data.totalMoney ?? 0}
				settings={{ sign: true }}
			/>
			{totalMoneyDiffComponent ? totalMoneyDiffComponent : null}
		</div>
	)
}

function Difference({
	isIncrease,
	difference,
	percentChange,
}: {
	isIncrease: boolean
	difference: number
	percentChange: number
}) {
	return (
		<>
			{" "}
			(
			<span
				className={`inline ${isIncrease ? "text-green-500" : "text-destructive"} `}
			>
				{isIncrease ? "+" : "-"}
			</span>
			<Amount
				className={`inline ${isIncrease ? "text-green-500" : "text-destructive"} text-base`}
				amount={Math.abs(difference)}
				settings={{ sign: true }}
			/>{" "}
			{isIncrease ? (
				<ArrowUpIcon className="inline size-4 align-text-bottom text-green-500" />
			) : (
				<ArrowDownIcon className="inline size-4 align-text-bottom text-destructive" />
			)}
			<span
				className={`inline font-bold ${isIncrease ? "text-green-500" : "text-destructive"}`}
			>
				{percentChange}%
			</span>
			)
		</>
	)
}

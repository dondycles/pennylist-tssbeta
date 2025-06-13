"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Analytics } from "@/lib/server/fn/analytics";
import { differenceInCalendarDays } from "date-fns";
import { Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./animate-ui/radix/dropdown-menu";
import { Button } from "./ui/button";

const chartConfig = {
  totalMoney: {
    label: "Total",
  },
  totalAdditions: {
    label: "Incomings",
  },
  totalDeductions: {
    label: "Outgoings",
  },
} satisfies ChartConfig;
type FilterState =
  | { type: "monthly"; freq?: "sincejoined" }
  | { type: "daily"; freq: "7" | "30" | "sincejoined" };
export function TotalMoneyChart({
  data,
  dateJoined,
}: {
  data: Analytics;
  dateJoined: Date;
}) {
  return (
    <div className="896:space-y-4 -my-4 896:my-0">
      <FlowChartCard
        key="totalMoney"
        data={data}
        dateJoined={dateJoined}
        dataKey="totalMoney"
      />
      <FlowChartCard
        key="totalAdditions"
        data={data}
        dateJoined={dateJoined}
        dataKey="totalAdditions"
      />
      <FlowChartCard
        key="totalDeductions"
        data={data}
        dateJoined={dateJoined}
        dataKey="totalDeductions"
      />
    </div>
  );
}

function FlowChartCard({
  data,
  dateJoined,
  dataKey,
}: {
  data: Analytics;
  dateJoined: Date;
  dataKey: string;
}) {
  const id = React.useId();
  const [filter, setFilter] = React.useState<FilterState>({
    type: "daily",
    freq: "7",
  });
  const filteredData =
    filter.type === "monthly"
      ? data.groupLogsByMonth
      : data.groupLogsByDate?.filter((item) => {
          const date = new Date(item.date);
          const referenceDate = new Date();
          let daysToSubtract = differenceInCalendarDays(new Date(), dateJoined);
          if (filter.freq === "30") {
            daysToSubtract = 30 < daysToSubtract ? 30 : daysToSubtract;
          } else if (filter.freq === "7") {
            daysToSubtract = 7 < daysToSubtract ? 7 : daysToSubtract;
          }
          const startDate = new Date(referenceDate);
          startDate.setDate(startDate.getDate() - daysToSubtract);
          return date >= startDate;
        });
  return (
    <Card
      style={{ backgroundColor: `var(--chart-${dataKey}-trans)` }}
      className={`896:rounded-3xl border-b 896:border`}
    >
      <CardHeader className="flex items-start gap-2 space-y-0 px-4 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Total Money Flow</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="capitalize" asChild>
            <Button variant={"outline"}>{filter.type}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setFilter({ type: "daily", freq: "7" })}
              >
                <p className="flex-1 text-left">Daily</p>
                {filter.type === "daily" ? <Check /> : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setFilter({ type: "monthly", freq: "sincejoined" })
                }
              >
                <p className="flex-1 text-left"> Monthly</p>
                {filter.type === "monthly" ? <Check /> : null}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => setFilter({ freq: "7", type: "daily" })}
                hidden={filter.type === "monthly"}
              >
                <p className="flex-1 text-left">7</p>
                {filter.type === "daily" && filter.freq === "7" ? (
                  <Check />
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilter({ freq: "30", type: "daily" })}
                hidden={filter.type === "monthly"}
              >
                <p className="flex-1 text-left">30</p>
                {filter.type === "daily" && filter.freq === "30" ? (
                  <Check />
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setFilter({ freq: "sincejoined", type: filter.type })
                }
              >
                <p className="flex-1 text-left">Since Joined</p>
                {filter.freq === "sincejoined" ? <Check /> : null}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {!filteredData?.length ? (
          <p className="text-muted-foreground text-center text-sm">
            No data to show as of now
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-52 w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={`var(--chart-${dataKey})`}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={`var(--chart-${dataKey})`}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                hide
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: filter.type === "monthly" ? undefined : "numeric",
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                minTickGap={32}
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => {
                  const newValue = Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PHP",
                    maximumFractionDigits: 0,
                  }).format(value);
                  return newValue;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: filter.type === "monthly" ? undefined : "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey={dataKey}
                stroke={`var(--chart-${dataKey})`}
                fill={`url(#${id})`}
                stackId="a"
                isAnimationActive={false}
                type="bump"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

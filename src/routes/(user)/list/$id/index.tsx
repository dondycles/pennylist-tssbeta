import LogCard from "@/components/LogCard";
import LogsMapper from "@/components/LogsMapper";
import MoneyCard from "@/components/MoneyCard";
import MoneySkeleton from "@/components/MoneySkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useAutoLoadNextPage from "@/lib/hooks/use-auto-reload-infinite-q";
import { logsQueryOptions } from "@/lib/queries/logs";
import { moneyQueryOptions } from "@/lib/queries/money";
import { Database } from "@/lib/server/supabase/types";
import { useMoneyState } from "@/lib/stores/money-state";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import React, { Suspense } from "react";

export const Route = createFileRoute("/(user)/list/$id/")({
  component: RouteComponent,
});

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
                key={`skeleton-${i}`}
                className={`space-y-4 p-4  bg-muted/25 896:rounded-2xl`}
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
  );
}

function Money() {
  const { id } = Route.useParams();
  const { queryClient, user } = Route.useRouteContext();
  const { total } = useMoneyState();
  const m = useSuspenseQuery(moneyQueryOptions(id));
  return (
    <MoneyCard
      queryClient={queryClient}
      user={user}
      moneysQty={1}
      deepView={true}
      m={m.data}
      totalMoney={total}
    />
  );
}

function Logs() {
  const { user } = Route.useRouteContext();
  const { id: moneyId } = Route.useParams();

  return <LogsMapper search={{ money: moneyId }} user={user} />;
}

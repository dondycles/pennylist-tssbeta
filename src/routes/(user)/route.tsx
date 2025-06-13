import FloatingNav from "@/components/FloatingNav";
import Locker from "@/components/Locker";
import { userPINQueryOptions } from "@/lib/queries/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(user)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const REDIRECT_URL = "/login";
    if (!context.user) {
      throw redirect({
        to: REDIRECT_URL,
      });
    }
    const PIN = await context.queryClient.fetchQuery(userPINQueryOptions());
    return {
      redirectUrl: REDIRECT_URL,
      PIN,
    };
  },
});

function RouteComponent() {
  const { PIN } = Route.useRouteContext();
  const [unLocked, setUnlocked] = useState(PIN === null);

  return (
    <div className="flex h-full w-full justify-center overflow-hidden">
      <Locker PIN={PIN} unLocked={unLocked} setUnlocked={setUnlocked} />
      {unLocked ? (
        <>
          <Outlet />
          <FloatingNav />
        </>
      ) : null}
    </div>
  );
}

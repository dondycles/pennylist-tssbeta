import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/list",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm space-y-4">
        <a href="#" className="flex flex-col items-center gap-2 font-medium">
          <img src="skeleton.png" className="size-16 not-dark:invert mb-4" />
          <span className="sr-only">pennylist.</span>
        </a>
        <Outlet />
      </div>
    </div>
  );
}

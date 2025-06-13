import { jsx, jsxs } from 'react/jsx-runtime';
import { c as createServerRpc, a as createServerFn, g as getSupabaseServerClient } from './ssr.mjs';
import { createFileRoute, redirect, useRouter } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
import 'next-themes';
import 'sonner';
import '@tanstack/react-query';
import '@supabase/ssr';
import 'node:async_hooks';
import 'tiny-invariant';
import 'tiny-warning';
import '@tanstack/router-core';
import 'zustand';
import 'zustand/middleware';
import 'idb-keyval';
import 'motion/react';
import 'clsx';
import 'tailwind-merge';
import 'radix-ui';
import 'lodash';
import 'zod';
import '@hookform/resolvers/zod';
import 'react-hook-form';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@radix-ui/react-label';
import '@radix-ui/react-dialog';
import '@radix-ui/react-scroll-area';
import 'date-fns';
import '@radix-ui/react-separator';
import '@radix-ui/react-switch';
import 'input-otp';
import '@mantine/hooks';
import '@tanstack/pacer';
import 'recharts';
import '@tanstack/react-router-with-query';
import '@tanstack/history';
import 'jsesc';
import 'node:stream';
import 'isbot';
import 'react-dom/server';
import 'node:stream/web';
import '@babel/runtime/helpers/objectDestructuringEmpty';
import '@babel/runtime/helpers/extends';
import '@babel/runtime/helpers/objectWithoutPropertiesLoose';

const logoutFn_createServerFn_handler = createServerRpc("src_routes_logout_tsx--logoutFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return logoutFn.__executeServer(opts, signal);
});
const logoutFn = createServerFn({
  method: "POST"
}).handler(logoutFn_createServerFn_handler, async () => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
});
const Route = createFileRoute("/logout")({
  beforeLoad: async ({
    context
  }) => {
    if (!context.user) {
      throw redirect({
        to: "/login"
      });
    }
  },
  component: RouteComponent
});
function RouteComponent() {
  const {
    queryClient
  } = Route.useRouteContext();
  const router = useRouter();
  useEffect(() => {
    const logOut = async () => {
      await logoutFn();
      await queryClient.invalidateQueries({
        queryKey: ["user"]
      });
      await router.invalidate();
    };
    const timeOut = setTimeout(() => logOut(), 1e3);
    return () => clearTimeout(timeOut);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "flex h-dvh w-full items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground flex flex-col items-center gap-2 text-sm", children: [
    /* @__PURE__ */ jsx(Loader2, { className: "size-16 animate-spin" }),
    /* @__PURE__ */ jsx("p", { children: "Logging out..." })
  ] }) });
}

export { logoutFn_createServerFn_handler };
//# sourceMappingURL=logout-BjhjeQOl.mjs.map

import { c as createServerRpc, a as createServerFn, g as getSupabaseServerClient } from './ssr.mjs';
import '@tanstack/react-router';
import 'react/jsx-runtime';
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
import 'react';
import 'lucide-react';
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

const signupFn_createServerFn_handler = createServerRpc("src_routes_auth_signup_tsx--signupFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return signupFn.__executeServer(opts, signal);
});
const signupFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(signupFn_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.auth.signUp({
    email: data.email,
    password: data.password
  });
  if (error) {
    console.error(error);
    return {
      error: true,
      message: error.message
    };
  }
});

export { signupFn_createServerFn_handler };
//# sourceMappingURL=signup-B7AvGbFb.mjs.map

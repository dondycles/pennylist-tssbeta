import { c as createServerRpc, a as createServerFn, b as authMiddleware, g as getSupabaseServerClient } from './ssr.mjs';
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

const getUser_createServerFn_handler = createServerRpc("src_lib_server_fn_user_ts--getUser_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getUser.__executeServer(opts, signal);
});
const getUserSettings_createServerFn_handler = createServerRpc("src_lib_server_fn_user_ts--getUserSettings_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getUserSettings.__executeServer(opts, signal);
});
const updateUserSettings_createServerFn_handler = createServerRpc("src_lib_server_fn_user_ts--updateUserSettings_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return updateUserSettings.__executeServer(opts, signal);
});
const initiateUserSettings_createServerFn_handler = createServerRpc("src_lib_server_fn_user_ts--initiateUserSettings_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return initiateUserSettings.__executeServer(opts, signal);
});
const getUserPIN_createServerFn_handler = createServerRpc("src_lib_server_fn_user_ts--getUserPIN_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getUserPIN.__executeServer(opts, signal);
});
const getUser = createServerFn({
  method: "GET"
}).handler(getUser_createServerFn_handler, async () => {
  const supabase = getSupabaseServerClient();
  const {
    data: {
      user
    }
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  return {
    email: user.email,
    id: user.id,
    createdAt: user.created_at
  };
});
const getUserSettings = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).handler(getUserSettings_createServerFn_handler, async ({
  context: {
    user: {
      id
    }
  }
}) => {
  const supabase = getSupabaseServerClient();
  const {
    data,
    error
  } = await supabase.from("setting").select().eq("userId", id);
  if (error) throw new Error(JSON.stringify(error, null, 2));
  if (!data[0]) {
    const {
      error: error2,
      data: data2
    } = await supabase.from("setting").insert({
      asterisk: false,
      flow: "desc",
      sortBy: "date",
      theme: "dark",
      updated_at: (/* @__PURE__ */ new Date()).toISOString(),
      userId: id
    }).select();
    if (error2) throw new Error(JSON.stringify(error2, null, 2));
    return data2[0];
  } else return data[0];
});
const updateUserSettings = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).validator((data) => data).handler(updateUserSettings_createServerFn_handler, async ({
  context: {
    user: {
      id
    }
  },
  data
}) => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.from("setting").update({
    asterisk: data.asterisk,
    flow: data.flow,
    sortBy: data.sortBy,
    theme: data.theme,
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    PIN: data.PIN
  }).eq("userId", id);
  if (error) throw new Error(error.message);
});
const initiateUserSettings = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).handler(initiateUserSettings_createServerFn_handler, async ({
  context: {
    user
  }
}) => {
  const supabase = getSupabaseServerClient();
  const existing = await supabase.from("setting").select("id").eq("userId", user.id).single();
  if (existing.data) return;
  const {
    error
  } = await supabase.from("setting").insert({
    asterisk: false,
    flow: "desc",
    sortBy: "date",
    theme: "dark",
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    userId: user.id
  });
  if (error) throw new Error(error.message);
});
const getUserPIN = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).handler(getUserPIN_createServerFn_handler, async ({
  context: {
    user: {
      id
    }
  }
}) => {
  var _a;
  const supabase = getSupabaseServerClient();
  const {
    data
  } = await supabase.from("setting").select("PIN").eq("userId", id).single();
  return (_a = data == null ? void 0 : data.PIN) != null ? _a : null;
});

export { getUserPIN_createServerFn_handler, getUserSettings_createServerFn_handler, getUser_createServerFn_handler, initiateUserSettings_createServerFn_handler, updateUserSettings_createServerFn_handler };
//# sourceMappingURL=user-CzpRiN9Z.mjs.map

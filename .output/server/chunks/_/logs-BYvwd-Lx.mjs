import { c as createServerRpc, a as createServerFn, b as authMiddleware, g as getSupabaseServerClient } from './ssr.mjs';
import { z } from 'zod';
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

const baseMoneySchema = z.object({
  name: z.string(),
  amount: z.coerce.number().nonnegative(),
  color: z.string().optional().nullable()
});
const moneyWithTotalSchema = baseMoneySchema.extend({
  totalMoney: z.coerce.number().nonnegative().default(0)
});
const senderSchema = baseMoneySchema.extend({
  id: z.string()
});
const receiverSchema = baseMoneySchema.extend({
  fee: z.coerce.number().nonnegative().optional().nullable(),
  cashIn: z.coerce.number().nonnegative().optional().nullable(),
  id: z.string()
});
const addLog_createServerFn_handler = createServerRpc("src_lib_server_fn_logs_ts--addLog_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return addLog.__executeServer(opts, signal);
});
const getLogs_createServerFn_handler = createServerRpc("src_lib_server_fn_logs_ts--getLogs_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getLogs.__executeServer(opts, signal);
});
const logSchema = z.object({
  moneyId: z.string().nullable(),
  type: z.enum(["edit", "transfer", "delete", "add"]),
  changes: z.object({
    prev: moneyWithTotalSchema,
    current: moneyWithTotalSchema
  }),
  reason: z.string().optional(),
  transferDetails: z.object({
    sender: senderSchema,
    receivers: z.array(receiverSchema)
  }).optional().nullable()
});
const addLog = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).validator(logSchema).handler(addLog_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.from("log").insert(data);
  if (error) throw new Error(error.message);
});
const getLogs = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).validator((data) => data).handler(getLogs_createServerFn_handler, async ({
  context: {
    user
  },
  data: {
    flow,
    type,
    money,
    q,
    pageParam
  }
}) => {
  const supabase = getSupabaseServerClient();
  const page = typeof pageParam === "number" ? pageParam : 0;
  let query = supabase.from("log").select("*, money(*)").eq("userId", user.id).order("created_at", {
    ascending: flow === "asc" ? true : false
  }).range(page * 4, page * 4 + 3);
  if (q) {
    query = query.ilike("reason", `%${q}%`);
  }
  if (type) {
    query = query.ilike("type", `%${type}%`);
  }
  if (money) {
    query = query.eq("moneyId", money);
  }
  const {
    data,
    error
  } = await query;
  if (error) throw new Error(JSON.stringify(error, null, 2));
  return data;
});

export { addLog_createServerFn_handler, getLogs_createServerFn_handler };
//# sourceMappingURL=logs-BYvwd-Lx.mjs.map

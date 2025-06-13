import { c as createServerRpc, a as createServerFn, b as authMiddleware, g as getSupabaseServerClient, d as addLog, s as settingMiddleware } from './ssr.mjs';
import _ from 'lodash';
import z$1 from 'zod';
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

const getMoneys_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--getMoneys_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getMoneys.__executeServer(opts, signal);
});
const getMoney_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--getMoney_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getMoney.__executeServer(opts, signal);
});
const getMoneyIds_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--getMoneyIds_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getMoneyIds.__executeServer(opts, signal);
});
const addMoney_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--addMoney_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return addMoney.__executeServer(opts, signal);
});
const editMoney_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--editMoney_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return editMoney.__executeServer(opts, signal);
});
const deleteMoney_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--deleteMoney_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return deleteMoney.__executeServer(opts, signal);
});
const transferMoneys_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--transferMoneys_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return transferMoneys.__executeServer(opts, signal);
});
const moneySchema = z$1.object({
  name: z$1.string().min(1),
  amount: z$1.coerce.number().nonnegative(),
  color: z$1.string().regex(/^#?([0-9a-fA-F]{6})$/, {
    message: "Color must be a 6-digit HEX (with #)"
  }).optional().nullable(),
  reason: z$1.string().optional().nullable()
});
const moneyWithIdSchema = moneySchema.extend({
  id: z$1.string()
});
const moneyWithTransferDetailsSchema = moneySchema.extend({
  id: z$1.string(),
  cashIn: z$1.coerce.number().nonnegative().optional(),
  fee: z$1.number().optional()
});
const transferSchema = z$1.object({
  sender: moneyWithTransferDetailsSchema,
  receivers: z$1.array(moneyWithTransferDetailsSchema)
});
const editMoneySchema = z$1.object({
  prev: moneyWithIdSchema.omit({
    reason: true
  }),
  current: moneyWithIdSchema.omit({
    reason: true
  }),
  reason: z$1.string().optional().nullable()
});
const getMoneys = createServerFn({
  method: "GET"
}).middleware([authMiddleware, settingMiddleware]).handler(getMoneys_createServerFn_handler, async ({
  context: {
    user: {
      id
    },
    setting
  }
}) => {
  const supabase = getSupabaseServerClient();
  let query = supabase.from("money").select().eq("userId", id);
  if (!setting) {
    query = query.order("created_at", {
      ascending: false
    });
  } else {
    if (setting.sortBy === "amount") {
      query = query.order("amount", {
        ascending: setting.flow === "asc" ? true : false
      });
    } else {
      query = query.order("created_at", {
        ascending: setting.flow === "asc" ? true : false
      });
    }
  }
  const {
    data,
    error
  } = await query;
  if (error) throw new Error(JSON.stringify(error, null, 2));
  return data;
});
const getMoney = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).validator((id) => id).handler(getMoney_createServerFn_handler, async ({
  context: {
    user: {
      id: userId
    }
  },
  data: id
}) => {
  const supabase = getSupabaseServerClient();
  const {
    data,
    error
  } = await supabase.from("money").select("*, log(*)").eq("userId", userId).eq("id", id).order("created_at", {
    referencedTable: "log",
    ascending: false
  }).single();
  if (error) throw new Error(JSON.stringify(error, null, 2));
  return data;
});
const getMoneyIds = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).handler(getMoneyIds_createServerFn_handler, async ({
  context: {
    user: {
      id: userId
    }
  }
}) => {
  const supabase = getSupabaseServerClient();
  const {
    data,
    error
  } = await supabase.from("money").select().eq("userId", userId);
  if (error) throw new Error(JSON.stringify(error, null, 2));
  return data;
});
const addMoney = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).validator(moneySchema.extend({
  totalMoney: z$1.coerce.number().nonnegative()
})).handler(addMoney_createServerFn_handler, async ({
  data: moneyData
}) => {
  const supabase = getSupabaseServerClient();
  const {
    data: insteredMoneyData,
    error
  } = await supabase.from("money").insert({
    name: moneyData.name,
    amount: moneyData.amount,
    color: moneyData.color
  }).select().single();
  if (error) throw new Error(error.message);
  if (insteredMoneyData) await addLog({
    data: {
      changes: {
        current: {
          ...insteredMoneyData,
          totalMoney: moneyData.totalMoney + moneyData.amount
        },
        prev: {
          ...insteredMoneyData,
          totalMoney: moneyData.totalMoney
        }
      },
      moneyId: insteredMoneyData.id,
      type: "add",
      reason: "Add"
    }
  });
});
const editMoney = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).validator(editMoneySchema.extend({
  totalMoney: z$1.coerce.number().nonnegative()
})).handler(editMoney_createServerFn_handler, async ({
  data: {
    current,
    prev,
    totalMoney,
    reason
  },
  context: {
    user
  }
}) => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.from("money").update({
    ...current,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", current.id).eq("userId", user.id);
  if (error) throw new Error(error.message);
  await addLog({
    data: {
      changes: {
        current: {
          ...current,
          totalMoney: totalMoney + (current.amount - prev.amount)
        },
        prev: {
          ...prev,
          totalMoney
        }
      },
      moneyId: current.id,
      type: "edit",
      reason: reason != null ? reason : void 0
    }
  });
});
const deleteMoney = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).validator(moneyWithIdSchema.extend({
  totalMoney: z$1.coerce.number().nonnegative()
})).handler(deleteMoney_createServerFn_handler, async ({
  data: moneyData,
  context: {
    user
  }
}) => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.from("money").delete().eq("id", moneyData.id).eq("userId", user.id);
  if (error) throw new Error(error.message);
  await addLog({
    data: {
      changes: {
        current: {
          amount: 0,
          name: "",
          color: "",
          totalMoney: moneyData.totalMoney - moneyData.amount
        },
        prev: {
          amount: moneyData.amount,
          name: moneyData.name,
          color: moneyData.color,
          totalMoney: moneyData.totalMoney
        }
      },
      moneyId: null,
      type: "delete",
      reason: "Deletion"
    }
  });
});
const transferMoneys = createServerFn({
  method: "POST"
}).middleware([authMiddleware]).validator(transferSchema.extend({
  totalMoney: z$1.coerce.number().nonnegative()
})).handler(transferMoneys_createServerFn_handler, async ({
  data: {
    receivers,
    sender,
    totalMoney
  },
  context: {
    user
  }
}) => {
  var _a, _b, _c, _d;
  const fees = _.sum(receivers.map((r) => {
    var _a2;
    return (_a2 = r.fee) != null ? _a2 : 0;
  }));
  const cashIns = _.sum(receivers.map((r) => {
    var _a2;
    return (_a2 = r.cashIn) != null ? _a2 : 0;
  }));
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.from("money").update({
    amount: sender.amount - fees - cashIns,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", sender.id).eq("userId", user.id);
  if (error) throw new Error(error.message);
  await addLog({
    data: {
      changes: {
        current: {
          ...sender,
          amount: sender.amount - fees - cashIns,
          totalMoney: totalMoney - fees
        },
        prev: {
          ...sender,
          totalMoney
        }
      },
      moneyId: sender.id,
      type: "transfer",
      reason: (_a = sender.reason) != null ? _a : void 0,
      transferDetails: {
        receivers,
        sender
      }
    }
  });
  for (const receiver of receivers) {
    const {
      error: error2
    } = await supabase.from("money").update({
      amount: receiver.amount + ((_b = receiver.cashIn) != null ? _b : 0),
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", receiver.id).eq("userId", user.id);
    if (error2) throw new Error(error2.message);
    await addLog({
      data: {
        changes: {
          current: {
            ...receiver,
            amount: receiver.amount + ((_c = receiver.cashIn) != null ? _c : 0),
            totalMoney: totalMoney - fees
          },
          prev: {
            ...receiver,
            totalMoney
          }
        },
        moneyId: receiver.id,
        type: "transfer",
        reason: (_d = receiver.reason) != null ? _d : void 0,
        transferDetails: {
          receivers,
          sender
        }
      }
    });
  }
});

export { addMoney_createServerFn_handler, deleteMoney_createServerFn_handler, editMoney_createServerFn_handler, getMoneyIds_createServerFn_handler, getMoney_createServerFn_handler, getMoneys_createServerFn_handler, transferMoneys_createServerFn_handler };
//# sourceMappingURL=money-Ce1ef7TL.mjs.map

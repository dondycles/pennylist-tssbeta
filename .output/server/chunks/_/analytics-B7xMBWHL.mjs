import { c as createServerRpc, a as createServerFn, b as authMiddleware, g as getSupabaseServerClient } from './ssr.mjs';
import { differenceInCalendarDays, differenceInMonths, getMonth, getYear, setDate } from 'date-fns';
import _ from 'lodash';
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
import 'zod';
import '@hookform/resolvers/zod';
import 'react-hook-form';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import '@radix-ui/react-label';
import '@radix-ui/react-dialog';
import '@radix-ui/react-scroll-area';
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

const getAnalytics_createServerFn_handler = createServerRpc("src_lib_server_fn_analytics_ts--getAnalytics_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getAnalytics.__executeServer(opts, signal);
});
const getAnalytics = createServerFn({
  method: "GET"
}).middleware([authMiddleware]).handler(getAnalytics_createServerFn_handler, async ({
  context: {
    user
  }
}) => {
  const supabase = getSupabaseServerClient();
  const {
    data,
    error
  } = await supabase.from("log").select("*, money(*)").eq("userId", user.id).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(JSON.stringify(error, null, 2));
  const daysSinceJoined = differenceInCalendarDays(/* @__PURE__ */ new Date(), user.created_at);
  const monthsSinceJoined = differenceInMonths(/* @__PURE__ */ new Date(), user.created_at);
  function groupLogsByDate() {
    if (!(data == null ? void 0 : data.length)) return null;
    const groupedByDate = {};
    data.forEach((log2) => {
      const day = new Date(log2.created_at).toLocaleDateString();
      if (!groupedByDate[day]) return groupedByDate[day] = [log2];
      groupedByDate[day] = [...groupedByDate[day], log2];
    });
    const dateJoined = new Date(user.created_at);
    const dataWithFilledDays = [];
    let log = {
      date: "",
      logs: []
    };
    for (let i = 0; i <= daysSinceJoined; i++) {
      const day = dateJoined.toLocaleDateString();
      if (groupedByDate[day] !== void 0) {
        log = {
          date: day,
          logs: groupedByDate[day]
        };
      } else {
        const veryLastLog = log.logs.sort((a, b) => new Date(b.created_at).getDate() - new Date(a.created_at).getDate())[0];
        log.date = day;
        log.logs = [{
          ...veryLastLog,
          changes: {
            current: {
              amount: 0,
              name: "",
              totalMoney: log.logs[0].changes.current.totalMoney
            },
            prev: {
              amount: 0,
              name: "",
              totalMoney: 0
            }
          }
        }];
      }
      dataWithFilledDays.push({
        ...log
      });
      dateJoined.setDate(dateJoined.getDate() + 1);
    }
    const summary = [];
    dataWithFilledDays.forEach((data2) => {
      const totalMoney = data2.logs.sort((a, b) => new Date(b.created_at).getDate() - new Date(a.created_at).getDate())[0].changes.current.totalMoney;
      let totalAdditions = 0;
      let totalDeductions = 0;
      data2.logs.forEach((log2) => {
        if (log2.changes.current.amount < log2.changes.prev.amount) {
          totalDeductions = totalDeductions + (log2.changes.prev.amount - log2.changes.current.amount);
        } else {
          totalAdditions = totalAdditions + (log2.changes.current.amount - log2.changes.prev.amount);
        }
      });
      summary.push({
        date: data2.date,
        totalMoney,
        totalAdditions,
        totalDeductions
      });
    });
    return summary;
  }
  function groupLogsByMonth() {
    const groupedByMonth = {};
    const logsByDate = groupLogsByDate();
    if (!logsByDate) return null;
    logsByDate.forEach((data2) => {
      if (!groupedByMonth[`${getMonth(data2.date)}${getYear(data2.date)}`]) {
        groupedByMonth[`${getMonth(data2.date)}${getYear(data2.date)}`] = [data2];
      } else groupedByMonth[`${getMonth(data2.date)}${getYear(data2.date)}`] = [...groupedByMonth[`${getMonth(data2.date)}${getYear(data2.date)}`], data2];
    });
    const dateJoined = new Date(user.created_at);
    const groupedByMonthArray = [];
    for (let i = 0; i <= monthsSinceJoined; i++) {
      const key = `${getMonth(dateJoined)}${getYear(dateJoined)}`;
      groupedByMonthArray.push({
        date: setDate(dateJoined, 1).toLocaleDateString(),
        totalMoney: groupedByMonth[key].sort((a, b) => new Date(b.date).getDate() - new Date(a.date).getDate())[0].totalMoney,
        totalAdditions: _.sum(groupedByMonth[key].map((data2) => data2.totalAdditions)),
        totalDeductions: _.sum(groupedByMonth[key].map((data2) => data2.totalDeductions))
      });
      dateJoined.setDate(dateJoined.getMonth() + 1);
    }
    return groupedByMonthArray;
  }
  function groupsLogsByMoney() {
    if (!(data == null ? void 0 : data.length)) return null;
    const groupedByMoney = {};
    data.forEach((log) => {
      if (log.moneyId === null) return;
      if (!groupedByMoney[log.moneyId]) {
        groupedByMoney[log.moneyId] = [log];
      } else {
        groupedByMoney[log.moneyId].push(log);
      }
    });
    return Object.entries(groupedByMoney).map(([moneyId, logs]) => {
      var _a;
      return {
        moneyId,
        logs: logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
        totalAdditions: Math.abs(_.sum(logs.map((log) => log.changes.current.amount < log.changes.prev.amount ? 0 : log.changes.current.amount - log.changes.prev.amount))),
        totalDeductions: Math.abs(_.sum(logs.map((log) => log.changes.current.amount < log.changes.prev.amount ? log.changes.prev.amount - log.changes.current.amount : 0))),
        currentData: logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0].changes.current,
        fill: (_a = logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0].changes.current.color) != null ? _a : "var(--foreground)"
      };
    });
  }
  return {
    groupLogsByMonth: groupLogsByMonth(),
    groupLogsByDate: groupLogsByDate(),
    groupsLogsByMoney: groupsLogsByMoney()
  };
});

export { getAnalytics_createServerFn_handler };
//# sourceMappingURL=analytics-B7xMBWHL.mjs.map

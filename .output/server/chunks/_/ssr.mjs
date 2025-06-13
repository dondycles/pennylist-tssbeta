import { createRootRouteWithContext, Outlet, HeadContent, ScriptOnce, Scripts, createFileRoute, redirect, useRouter, Link, useRouteContext, useNavigate, useRouterState, RouterProvider, createRouter as createRouter$1, useMatch, rootRouteId as rootRouteId$1 } from '@tanstack/react-router';
import { jsxs, jsx, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useTheme } from 'next-themes';
import { toast, Toaster as Toaster$1 } from 'sonner';
import { queryOptions, useSuspenseQuery, useMutation, useSuspenseInfiniteQuery, infiniteQueryOptions, QueryClient } from '@tanstack/react-query';
import { createServerClient } from '@supabase/ssr';
import { AsyncLocalStorage } from 'node:async_hooks';
import invariant from 'tiny-invariant';
import warning from 'tiny-warning';
import { isPlainObject, isRedirect, isNotFound, joinPaths, trimPath, isResolvedRedirect, rootRouteId, processRouteTree, getMatchedRoutes, createControlledPromise, pick, TSR_DEFERRED_PROMISE, isPlainArray, defer } from '@tanstack/router-core';
import * as React from 'react';
import React__default, { Fragment, useRef, useCallback, useEffect, useState, Suspense, useId } from 'react';
import { Loader2, LoaderCircle, Settings, User2, ClockPlus, History, EyeClosed, Eye, SunIcon, MoonIcon, ArrowUp, ArrowDown, DollarSign, Calendar, ChevronDownIcon, FileClock, RefreshCw, Filter, X, Activity, Plus, List, Circle, Banknote, Clock, ExternalLink, Pencil, PlaneLanding, Send, Trash2, Check, RotateCw, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { del, set, get } from 'idb-keyval';
import { AnimatePresence, motion } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Dialog as Dialog$1, DropdownMenu as DropdownMenu$1 } from 'radix-ui';
import _ from 'lodash';
import z$1, { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, Controller, useFormContext, useFormState } from 'react-hook-form';
import { Slot as Slot$1 } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { differenceInCalendarDays, differenceInMonths, differenceInMinutes, differenceInHours, getMonth, getYear, setDate } from 'date-fns';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { OTPInput } from 'input-otp';
import { useIntersection } from '@mantine/hooks';
import { debounce } from '@tanstack/pacer';
import * as RechartsPrimitive from 'recharts';
import { AreaChart, CartesianGrid, XAxis, YAxis, Area, BarChart, Bar } from 'recharts';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';
import { createMemoryHistory } from '@tanstack/history';
import jsesc from 'jsesc';
import { PassThrough, Readable } from 'node:stream';
import { isbot } from 'isbot';
import ReactDOMServer from 'react-dom/server';
import { ReadableStream as ReadableStream$1 } from 'node:stream/web';
import _objectDestructuringEmpty from '@babel/runtime/helpers/objectDestructuringEmpty';
import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/objectWithoutPropertiesLoose';

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (void 0 !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

function splitSetCookieString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitSetCookieString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}

const defaults = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: void 0,
  excludeValues: void 0,
  replacer: void 0
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults, ...options };
  } else {
    options = defaults;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === void 0) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === void 0 ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Error extends Error {
  constructor(message, opts = {}) {
    super(message, opts);
    __publicField$2(this, "statusCode", 500);
    __publicField$2(this, "fatal", false);
    __publicField$2(this, "unhandled", false);
    __publicField$2(this, "statusMessage");
    __publicField$2(this, "data");
    __publicField$2(this, "cause");
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
__publicField$2(H3Error, "__h3_error__", true);
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function toWebRequest(event) {
  return event.web?.request || new Request(getRequestURL(event), {
    // @ts-ignore Undici option
    duplex: "half",
    method: event.method,
    headers: event.headers,
    body: getRequestWebStream(event)
  });
}

const RawBodySymbol = Symbol.for("h3RawBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies$1(event) {
  return parse(event.node.req.headers.cookie || "");
}
function setCookie$1(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function setResponseStatus$1(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus$1(event) {
  return event.node.res.statusCode;
}
function getResponseHeaders$1(event) {
  return event.node.res.getHeaders();
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class H3Event {
  constructor(req, res) {
    __publicField(this, "__is_event__", true);
    // Context
    __publicField(this, "node");
    // Node
    __publicField(this, "web");
    // Web
    __publicField(this, "context", {});
    // Shared
    // Request
    __publicField(this, "_method");
    __publicField(this, "_path");
    __publicField(this, "_headers");
    __publicField(this, "_requestBody");
    // Response
    __publicField(this, "_handled", false);
    // Hooks
    __publicField(this, "_onBeforeResponseCalled");
    __publicField(this, "_onAfterResponseCalled");
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler$1(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}

var RGB_MAX = 255;
var SV_MAX = 100;
/**
 * ```js
 * rgbaToHsva({ r: 255, g: 255, b: 255, a: 1 }) //=> { h: 0, s: 0, v: 100, a: 1 }
 * ```
 */
var rgbaToHsva = _ref => {
  var {
    r,
    g,
    b,
    a
  } = _ref;
  var max = Math.max(r, g, b);
  var delta = max - Math.min(r, g, b);

  // prettier-ignore
  var hh = delta ? max === r ? (g - b) / delta : max === g ? 2 + (b - r) / delta : 4 + (r - g) / delta : 0;
  return {
    h: 60 * (hh < 0 ? hh + 6 : hh),
    s: max ? delta / max * SV_MAX : 0,
    v: max / RGB_MAX * SV_MAX,
    a
  };
};
var hsvaToHsla = _ref5 => {
  var {
    h,
    s,
    v,
    a
  } = _ref5;
  var hh = (200 - s) * v / SV_MAX;
  return {
    h,
    s: hh > 0 && hh < 200 ? s * v / SV_MAX / (hh <= SV_MAX ? hh : 200 - hh) * SV_MAX : 0,
    l: hh / 2,
    a
  };
};
var rgbToHex = _ref7 => {
  var {
    r,
    g,
    b
  } = _ref7;
  var bin = r << 16 | g << 8 | b;
  return "#" + (h => new Array(7 - h.length).join('0') + h)(bin.toString(16));
};
var rgbaToHexa = _ref8 => {
  var {
    r,
    g,
    b,
    a
  } = _ref8;
  var alpha = typeof a === 'number' && (a * 255 | 1 << 8).toString(16).slice(1);
  return "" + rgbToHex({
    r,
    g,
    b
  }) + (alpha ? alpha : '');
};
var hexToHsva = hex => rgbaToHsva(hexToRgba(hex));
var hexToRgba = hex => {
  var htemp = hex.replace('#', '');
  if (/^#?/.test(hex) && htemp.length === 3) {
    hex = "#" + htemp.charAt(0) + htemp.charAt(0) + htemp.charAt(1) + htemp.charAt(1) + htemp.charAt(2) + htemp.charAt(2);
  }
  var reg = new RegExp("[A-Za-z0-9]{2}", 'g');
  var [r, g, b = 0, a] = hex.match(reg).map(v => parseInt(v, 16));
  return {
    r,
    g,
    b,
    a: (a != null ? a : 255) / RGB_MAX
  };
};

/**
 * Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 * @param color HSVA color as an array [0-360, 0-1, 0-1, 0-1]
 */
var hsvaToRgba = _ref9 => {
  var {
    h,
    s,
    v,
    a
  } = _ref9;
  var _h = h / 60,
    _s = s / SV_MAX,
    _v = v / SV_MAX,
    hi = Math.floor(_h) % 6;
  var f = _h - Math.floor(_h),
    _p = RGB_MAX * _v * (1 - _s),
    _q = RGB_MAX * _v * (1 - _s * f),
    _t = RGB_MAX * _v * (1 - _s * (1 - f));
  _v *= RGB_MAX;
  var rgba = {};
  switch (hi) {
    case 0:
      rgba.r = _v;
      rgba.g = _t;
      rgba.b = _p;
      break;
    case 1:
      rgba.r = _q;
      rgba.g = _v;
      rgba.b = _p;
      break;
    case 2:
      rgba.r = _p;
      rgba.g = _v;
      rgba.b = _t;
      break;
    case 3:
      rgba.r = _p;
      rgba.g = _q;
      rgba.b = _v;
      break;
    case 4:
      rgba.r = _t;
      rgba.g = _p;
      rgba.b = _v;
      break;
    case 5:
      rgba.r = _v;
      rgba.g = _p;
      rgba.b = _q;
      break;
  }
  rgba.r = Math.round(rgba.r);
  rgba.g = Math.round(rgba.g);
  rgba.b = Math.round(rgba.b);
  return _extends({}, rgba, {
    a
  });
};
var rgbaToRgb = _ref0 => {
  var {
    r,
    g,
    b
  } = _ref0;
  return {
    r,
    g,
    b
  };
};
var hslaToHsl = _ref1 => {
  var {
    h,
    s,
    l
  } = _ref1;
  return {
    h,
    s,
    l
  };
};
var hsvaToHex = hsva => rgbToHex(hsvaToRgba(hsva));
var hsvaToHsv = _ref10 => {
  var {
    h,
    s,
    v
  } = _ref10;
  return {
    h,
    s,
    v
  };
};

/**
 * Converts RGB to XY. Based on formula from https://developers.meethue.com/develop/application-design-guidance/color-conversion-formulas-rgb-to-xy-and-back/
 * @param color RGB color as an array [0-255, 0-255, 0-255]
 */
var rgbToXY = _ref12 => {
  var {
    r,
    g,
    b
  } = _ref12;
  var translateColor = function translateColor(color) {
    return color <= 0.04045 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4);
  };
  var red = translateColor(r / 255);
  var green = translateColor(g / 255);
  var blue = translateColor(b / 255);
  var xyz = {};
  xyz.x = red * 0.4124 + green * 0.3576 + blue * 0.1805;
  xyz.y = red * 0.2126 + green * 0.7152 + blue * 0.0722;
  xyz.bri = red * 0.0193 + green * 0.1192 + blue * 0.9505;
  return xyz;
};
var color = str => {
  var rgb;
  var hsl;
  var hsv;
  var rgba;
  var hsla;
  var hsva;
  var xy;
  var hex;
  var hexa;
  if (typeof str === 'string' && validHex(str)) {
    hsva = hexToHsva(str);
    hex = str;
  } else if (typeof str !== 'string') {
    hsva = str;
  }
  if (hsva) {
    hsv = hsvaToHsv(hsva);
    hsla = hsvaToHsla(hsva);
    rgba = hsvaToRgba(hsva);
    hexa = rgbaToHexa(rgba);
    hex = hsvaToHex(hsva);
    hsl = hslaToHsl(hsla);
    rgb = rgbaToRgb(rgba);
    xy = rgbToXY(rgb);
  }
  return {
    rgb,
    hsl,
    hsv,
    rgba,
    hsla,
    hsva,
    hex,
    hexa,
    xy
  };
};
var validHex = hex => /^#?([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

var _excluded$1 = ["prefixCls", "className", "color", "colors", "style", "rectProps", "onChange", "addonAfter", "addonBefore", "rectRender"];
var Swatch = /*#__PURE__*/React__default.forwardRef((props, ref) => {
  var {
      prefixCls = 'w-color-swatch',
      className,
      color: color$1,
      colors = [],
      style,
      rectProps = {},
      onChange,
      addonAfter,
      addonBefore,
      rectRender
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded$1);
  var rectStyle = _extends({
    '--swatch-background-color': 'rgb(144, 19, 254)',
    background: 'var(--swatch-background-color)',
    height: 15,
    width: 15,
    marginRight: 5,
    marginBottom: 5,
    cursor: 'pointer',
    position: 'relative',
    outline: 'none',
    borderRadius: 2
  }, rectProps.style);
  var handleClick = (hex, evn) => {
    onChange && onChange(hexToHsva(hex), color(hexToHsva(hex)), evn);
  };
  return /*#__PURE__*/jsxs("div", _extends({
    ref: ref
  }, other, {
    className: [prefixCls, className || ''].filter(Boolean).join(' '),
    style: _extends({
      display: 'flex',
      flexWrap: 'wrap',
      position: 'relative'
    }, style),
    children: [addonBefore && /*#__PURE__*/React__default.isValidElement(addonBefore) && addonBefore, colors && Array.isArray(colors) && colors.map((item, idx) => {
      var title = '';
      var background = '';
      if (typeof item === 'string') {
        title = item;
        background = item;
      }
      if (typeof item === 'object' && item.color) {
        title = item.title || item.color;
        background = item.color;
      }
      var checked = color$1 && color$1.toLocaleLowerCase() === background.toLocaleLowerCase();
      var render = rectRender && rectRender({
        title,
        color: background,
        checked: !!checked,
        style: _extends({}, rectStyle, {
          background
        }),
        onClick: evn => handleClick(background, evn)
      });
      if (render) {
        return /*#__PURE__*/jsx(Fragment, {
          children: render
        }, idx);
      }
      var child = rectProps.children && /*#__PURE__*/React__default.isValidElement(rectProps.children) ? /*#__PURE__*/React__default.cloneElement(rectProps.children, {
        color: background,
        checked
      }) : null;
      return /*#__PURE__*/jsx("div", _extends({
        tabIndex: 0,
        title: title,
        onClick: evn => handleClick(background, evn)
      }, rectProps, {
        children: child,
        style: _extends({}, rectStyle, {
          background
        })
      }), idx);
    }), addonAfter && /*#__PURE__*/React__default.isValidElement(addonAfter) && addonAfter]
  }));
});
Swatch.displayName = 'Swatch';

var defalutStyle = {
  marginRight: 0,
  marginBottom: 0,
  borderRadius: 0,
  boxSizing: 'border-box',
  height: 25,
  width: 25
};
function Point(_ref) {
  var {
    style,
    title,
    checked,
    color,
    onClick,
    rectProps
  } = _ref;
  var btn = useRef(null);
  var handleMouseEnter = useCallback(() => {
    btn.current.style['zIndex'] = '2';
    btn.current.style['outline'] = '#fff solid 2px';
    btn.current.style['boxShadow'] = 'rgb(0 0 0 / 25%) 0 0 5px 2px';
  }, []);
  var handleMouseLeave = useCallback(() => {
    if (!checked) {
      btn.current.style['zIndex'] = '0';
      btn.current.style['outline'] = 'initial';
      btn.current.style['boxShadow'] = 'initial';
    }
  }, [checked]);
  var rectStyle = checked ? {
    zIndex: 1,
    outline: '#fff solid 2px',
    boxShadow: 'rgb(0 0 0 / 25%) 0 0 5px 2px'
  } : {
    zIndex: 0
  };
  return /*#__PURE__*/jsx("div", _extends({
    ref: btn,
    title: title
  }, rectProps, {
    onClick: onClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: _extends({}, style, {
      marginRight: 0,
      marginBottom: 0,
      borderRadius: 0,
      boxSizing: 'border-box',
      height: 25,
      width: 25
    }, defalutStyle, rectStyle, rectProps == null ? void 0 : rectProps.style)
  }));
}

var _excluded = ["prefixCls", "placement", "className", "style", "color", "colors", "showTriangle", "rectProps", "onChange", "rectRender"];
var CORLER_HEX = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'];
var GithubPlacement = /*#__PURE__*/function (GithubPlacement) {
  GithubPlacement["Left"] = "L";
  GithubPlacement["LeftTop"] = "LT";
  GithubPlacement["LeftBottom"] = "LB";
  GithubPlacement["Right"] = "R";
  GithubPlacement["RightTop"] = "RT";
  GithubPlacement["RightBottom"] = "RB";
  GithubPlacement["Top"] = "T";
  GithubPlacement["TopRight"] = "TR";
  GithubPlacement["TopLeft"] = "TL";
  GithubPlacement["Bottom"] = "B";
  GithubPlacement["BottomLeft"] = "BL";
  GithubPlacement["BottomRight"] = "BR";
  return GithubPlacement;
}({});
var Github = /*#__PURE__*/React__default.forwardRef((props, ref) => {
  var {
      prefixCls = 'w-color-github',
      placement = GithubPlacement.TopRight,
      className,
      style,
      color: color$1,
      colors = CORLER_HEX,
      showTriangle = true,
      rectProps = {},
      onChange,
      rectRender
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  var hsva = typeof color$1 === 'string' && validHex(color$1) ? hexToHsva(color$1) : color$1;
  var hex = color$1 ? hsvaToHex(hsva) : '';
  var handleChange = hsv => onChange && onChange(color(hsv));
  var styleWrapper = _extends({
    '--github-border': '1px solid rgba(0, 0, 0, 0.2)',
    '--github-background-color': '#fff',
    '--github-box-shadow': 'rgb(0 0 0 / 15%) 0px 3px 12px',
    '--github-arrow-border-color': 'rgba(0, 0, 0, 0.15)',
    width: 200,
    borderRadius: 4,
    background: 'var(--github-background-color)',
    boxShadow: 'var(--github-box-shadow)',
    border: 'var(--github-border)',
    position: 'relative',
    padding: 5
  }, style);
  var rStyle = {
    borderStyle: 'solid',
    position: 'absolute'
  };
  var arrBrStyl = _extends({}, rStyle);
  var arrStyl = _extends({}, rStyle);
  if (/^T/.test(placement)) {
    arrBrStyl.borderWidth = '0 8px 8px';
    arrBrStyl.borderColor = 'transparent transparent var(--github-arrow-border-color)';
    arrStyl.borderWidth = '0 7px 7px';
    arrStyl.borderColor = 'transparent transparent var(--github-background-color)';
  }
  if (placement === GithubPlacement.TopRight) {
    arrBrStyl.top = -8;
    arrStyl.top = -7;
  }
  if (placement === GithubPlacement.Top) {
    arrBrStyl.top = -8;
    arrStyl.top = -7;
  }
  if (placement === GithubPlacement.TopLeft) {
    arrBrStyl.top = -8;
    arrStyl.top = -7;
  }
  if (/^B/.test(placement)) {
    arrBrStyl.borderWidth = '8px 8px 0';
    arrBrStyl.borderColor = 'var(--github-arrow-border-color) transparent transparent';
    arrStyl.borderWidth = '7px 7px 0';
    arrStyl.borderColor = 'var(--github-background-color) transparent transparent';
    if (placement === GithubPlacement.BottomRight) {
      arrBrStyl.top = '100%';
      arrStyl.top = '100%';
    }
    if (placement === GithubPlacement.Bottom) {
      arrBrStyl.top = '100%';
      arrStyl.top = '100%';
    }
    if (placement === GithubPlacement.BottomLeft) {
      arrBrStyl.top = '100%';
      arrStyl.top = '100%';
    }
  }
  if (/^(B|T)/.test(placement)) {
    if (placement === GithubPlacement.Top || placement === GithubPlacement.Bottom) {
      arrBrStyl.left = '50%';
      arrBrStyl.marginLeft = -8;
      arrStyl.left = '50%';
      arrStyl.marginLeft = -7;
    }
    if (placement === GithubPlacement.TopRight || placement === GithubPlacement.BottomRight) {
      arrBrStyl.right = 10;
      arrStyl.right = 11;
    }
    if (placement === GithubPlacement.TopLeft || placement === GithubPlacement.BottomLeft) {
      arrBrStyl.left = 7;
      arrStyl.left = 8;
    }
  }
  if (/^L/.test(placement)) {
    arrBrStyl.borderWidth = '8px 8px 8px 0';
    arrBrStyl.borderColor = 'transparent var(--github-arrow-border-color) transparent transparent';
    arrStyl.borderWidth = '7px 7px 7px 0';
    arrStyl.borderColor = 'transparent var(--github-background-color) transparent transparent';
    arrBrStyl.left = -8;
    arrStyl.left = -7;
  }
  if (/^R/.test(placement)) {
    arrBrStyl.borderWidth = '8px 0 8px 8px';
    arrBrStyl.borderColor = 'transparent transparent transparent var(--github-arrow-border-color)';
    arrStyl.borderWidth = '7px 0 7px 7px';
    arrStyl.borderColor = 'transparent transparent transparent var(--github-background-color)';
    arrBrStyl.right = -8;
    arrStyl.right = -7;
  }
  if (/^(L|R)/.test(placement)) {
    if (placement === GithubPlacement.RightTop || placement === GithubPlacement.LeftTop) {
      arrBrStyl.top = 5;
      arrStyl.top = 6;
    }
    if (placement === GithubPlacement.Left || placement === GithubPlacement.Right) {
      arrBrStyl.top = '50%';
      arrStyl.top = '50%';
      arrBrStyl.marginTop = -8;
      arrStyl.marginTop = -7;
    }
    if (placement === GithubPlacement.LeftBottom || placement === GithubPlacement.RightBottom) {
      arrBrStyl.top = '100%';
      arrStyl.top = '100%';
      arrBrStyl.marginTop = -21;
      arrStyl.marginTop = -20;
    }
  }
  var render = _ref => {
    var props = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
    var handle = rectRender && rectRender(_extends({}, props));
    if (handle) return handle;
    return /*#__PURE__*/jsx(Point, _extends({}, props, {
      rectProps: rectProps
    }));
  };
  return /*#__PURE__*/jsx(Swatch, _extends({
    ref: ref,
    className: [prefixCls, className].filter(Boolean).join(' '),
    colors: colors,
    color: hex,
    rectRender: render
  }, other, {
    onChange: handleChange,
    style: styleWrapper,
    rectProps: {
      style: {
        marginRight: 0,
        marginBottom: 0,
        borderRadius: 0,
        height: 25,
        width: 25
      }
    },
    addonBefore: /*#__PURE__*/jsx(Fragment, {
      children: showTriangle && /*#__PURE__*/jsxs(Fragment, {
        children: [/*#__PURE__*/jsx("div", {
          style: arrBrStyl
        }), /*#__PURE__*/jsx("div", {
          style: arrStyl
        })]
      })
    })
  }));
});
Github.displayName = 'Github';

function StartServer(props) {
  return /* @__PURE__ */ jsx(RouterProvider, { router: props.router });
}
function transformReadableStreamWithRouter(router, routerStream) {
  return transformStreamWithRouter(router, routerStream);
}
function transformPipeableStreamWithRouter(router, routerStream) {
  return Readable.fromWeb(
    transformStreamWithRouter(router, Readable.toWeb(routerStream))
  );
}
const patternBodyStart = /(<body)/;
const patternBodyEnd = /(<\/body>)/;
const patternHtmlEnd = /(<\/html>)/;
const patternHeadStart = /(<head.*?>)/;
const patternClosingTag = /(<\/[a-zA-Z][\w:.-]*?>)/g;
const textDecoder = new TextDecoder();
function createPassthrough() {
  let controller;
  const encoder = new TextEncoder();
  const stream = new ReadableStream$1({
    start(c) {
      controller = c;
    }
  });
  const res = {
    stream,
    write: (chunk) => {
      controller.enqueue(encoder.encode(chunk));
    },
    end: (chunk) => {
      if (chunk) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
      res.destroyed = true;
    },
    destroy: (error) => {
      controller.error(error);
    },
    destroyed: false
  };
  return res;
}
async function readStream(stream, opts) {
  var _a, _b, _c;
  try {
    const reader = stream.getReader();
    let chunk;
    while (!(chunk = await reader.read()).done) {
      (_a = opts.onData) == null ? void 0 : _a.call(opts, chunk);
    }
    (_b = opts.onEnd) == null ? void 0 : _b.call(opts);
  } catch (error) {
    (_c = opts.onError) == null ? void 0 : _c.call(opts, error);
  }
}
function transformStreamWithRouter(router, appStream) {
  const finalPassThrough = createPassthrough();
  let isAppRendering = true;
  let routerStreamBuffer = "";
  let pendingClosingTags = "";
  let bodyStarted = false;
  let headStarted = false;
  let leftover = "";
  let leftoverHtml = "";
  function getBufferedRouterStream() {
    const html = routerStreamBuffer;
    routerStreamBuffer = "";
    return html;
  }
  function decodeChunk(chunk) {
    if (chunk instanceof Uint8Array) {
      return textDecoder.decode(chunk);
    }
    return String(chunk);
  }
  const injectedHtmlDonePromise = createControlledPromise();
  let processingCount = 0;
  router.serverSsr.injectedHtml.forEach((promise) => {
    handleInjectedHtml(promise);
  });
  const stopListeningToInjectedHtml = router.subscribe(
    "onInjectedHtml",
    (e) => {
      handleInjectedHtml(e.promise);
    }
  );
  function handleInjectedHtml(promise) {
    processingCount++;
    promise.then((html) => {
      if (!bodyStarted) {
        routerStreamBuffer += html;
      } else {
        finalPassThrough.write(html);
      }
    }).catch(injectedHtmlDonePromise.reject).finally(() => {
      processingCount--;
      if (!isAppRendering && processingCount === 0) {
        stopListeningToInjectedHtml();
        injectedHtmlDonePromise.resolve();
      }
    });
  }
  injectedHtmlDonePromise.then(() => {
    const finalHtml = leftoverHtml + getBufferedRouterStream() + pendingClosingTags;
    finalPassThrough.end(finalHtml);
  }).catch((err) => {
    console.error("Error reading routerStream:", err);
    finalPassThrough.destroy(err);
  });
  readStream(appStream, {
    onData: (chunk) => {
      const text = decodeChunk(chunk.value);
      let chunkString = leftover + text;
      const bodyEndMatch = chunkString.match(patternBodyEnd);
      const htmlEndMatch = chunkString.match(patternHtmlEnd);
      if (!bodyStarted) {
        const bodyStartMatch = chunkString.match(patternBodyStart);
        if (bodyStartMatch) {
          bodyStarted = true;
        }
      }
      if (!headStarted) {
        const headStartMatch = chunkString.match(patternHeadStart);
        if (headStartMatch) {
          headStarted = true;
          const index = headStartMatch.index;
          const headTag = headStartMatch[0];
          const remaining = chunkString.slice(index + headTag.length);
          finalPassThrough.write(
            chunkString.slice(0, index) + headTag + getBufferedRouterStream()
          );
          chunkString = remaining;
        }
      }
      if (!bodyStarted) {
        finalPassThrough.write(chunkString);
        leftover = "";
        return;
      }
      if (bodyEndMatch && htmlEndMatch && bodyEndMatch.index < htmlEndMatch.index) {
        const bodyEndIndex = bodyEndMatch.index;
        pendingClosingTags = chunkString.slice(bodyEndIndex);
        finalPassThrough.write(
          chunkString.slice(0, bodyEndIndex) + getBufferedRouterStream()
        );
        leftover = "";
        return;
      }
      let result;
      let lastIndex = 0;
      while ((result = patternClosingTag.exec(chunkString)) !== null) {
        lastIndex = result.index + result[0].length;
      }
      if (lastIndex > 0) {
        const processed = chunkString.slice(0, lastIndex) + getBufferedRouterStream() + leftoverHtml;
        finalPassThrough.write(processed);
        leftover = chunkString.slice(lastIndex);
      } else {
        leftover = chunkString;
        leftoverHtml += getBufferedRouterStream();
      }
    },
    onEnd: () => {
      isAppRendering = false;
      if (processingCount === 0) {
        injectedHtmlDonePromise.resolve();
      }
    },
    onError: (error) => {
      console.error("Error reading appStream:", error);
      finalPassThrough.destroy(error);
    }
  });
  return finalPassThrough.stream;
}
function toHeadersInstance(init) {
  if (init instanceof Headers) {
    return new Headers(init);
  } else if (Array.isArray(init)) {
    return new Headers(init);
  } else if (typeof init === "object") {
    return new Headers(init);
  } else {
    return new Headers();
  }
}
function mergeHeaders(...headers) {
  return headers.reduce((acc, header) => {
    const headersInstance = toHeadersInstance(header);
    for (const [key, value] of headersInstance.entries()) {
      if (key === "set-cookie") {
        const splitCookies = splitSetCookieString(value);
        splitCookies.forEach((cookie) => acc.append("set-cookie", cookie));
      } else {
        acc.set(key, value);
      }
    }
    return acc;
  }, new Headers());
}
const startSerializer = {
  stringify: (value) => JSON.stringify(value, function replacer(key, val) {
    const ogVal = this[key];
    const serializer = serializers.find((t) => t.stringifyCondition(ogVal));
    if (serializer) {
      return serializer.stringify(ogVal);
    }
    return val;
  }),
  parse: (value) => JSON.parse(value, function parser(key, val) {
    const ogVal = this[key];
    if (isPlainObject(ogVal)) {
      const serializer = serializers.find((t) => t.parseCondition(ogVal));
      if (serializer) {
        return serializer.parse(ogVal);
      }
    }
    return val;
  }),
  encode: (value) => {
    if (Array.isArray(value)) {
      return value.map((v) => startSerializer.encode(v));
    }
    if (isPlainObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([key, v]) => [
          key,
          startSerializer.encode(v)
        ])
      );
    }
    const serializer = serializers.find((t) => t.stringifyCondition(value));
    if (serializer) {
      return serializer.stringify(value);
    }
    return value;
  },
  decode: (value) => {
    if (isPlainObject(value)) {
      const serializer = serializers.find((t) => t.parseCondition(value));
      if (serializer) {
        return serializer.parse(value);
      }
    }
    if (Array.isArray(value)) {
      return value.map((v) => startSerializer.decode(v));
    }
    if (isPlainObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([key, v]) => [
          key,
          startSerializer.decode(v)
        ])
      );
    }
    return value;
  }
};
const createSerializer = (key, check, toValue, fromValue) => ({
  key,
  stringifyCondition: check,
  stringify: (value) => ({ [`$${key}`]: toValue(value) }),
  parseCondition: (value) => Object.hasOwn(value, `$${key}`),
  parse: (value) => fromValue(value[`$${key}`])
});
const serializers = [
  createSerializer(
    // Key
    "undefined",
    // Check
    (v) => v === void 0,
    // To
    () => 0,
    // From
    () => void 0
  ),
  createSerializer(
    // Key
    "date",
    // Check
    (v) => v instanceof Date,
    // To
    (v) => v.toISOString(),
    // From
    (v) => new Date(v)
  ),
  createSerializer(
    // Key
    "error",
    // Check
    (v) => v instanceof Error,
    // To
    (v) => ({
      ...v,
      message: v.message,
      stack: void 0,
      cause: v.cause
    }),
    // From
    (v) => Object.assign(new Error(v.message), v)
  ),
  createSerializer(
    // Key
    "formData",
    // Check
    (v) => v instanceof FormData,
    // To
    (v) => {
      const entries = {};
      v.forEach((value, key) => {
        const entry = entries[key];
        if (entry !== void 0) {
          if (Array.isArray(entry)) {
            entry.push(value);
          } else {
            entries[key] = [entry, value];
          }
        } else {
          entries[key] = value;
        }
      });
      return entries;
    },
    // From
    (v) => {
      const formData = new FormData();
      Object.entries(v).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => formData.append(key, val));
        } else {
          formData.append(key, value);
        }
      });
      return formData;
    }
  ),
  createSerializer(
    // Key
    "bigint",
    // Check
    (v) => typeof v === "bigint",
    // To
    (v) => v.toString(),
    // From
    (v) => BigInt(v)
  )
];
const globalMiddleware = [];
function createServerFn(options, __opts) {
  const resolvedOptions = __opts || options || {};
  if (typeof resolvedOptions.method === "undefined") {
    resolvedOptions.method = "GET";
  }
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createServerFn(void 0, Object.assign(resolvedOptions, {
        middleware
      }));
    },
    validator: (validator) => {
      return createServerFn(void 0, Object.assign(resolvedOptions, {
        validator
      }));
    },
    type: (type) => {
      return createServerFn(void 0, Object.assign(resolvedOptions, {
        type
      }));
    },
    handler: (...args) => {
      const [extractedFn, serverFn] = args;
      Object.assign(resolvedOptions, {
        ...extractedFn,
        extractedFn,
        serverFn
      });
      const resolvedMiddleware = [...resolvedOptions.middleware || [], serverFnBaseToMiddleware(resolvedOptions)];
      return Object.assign(async (opts) => {
        return executeMiddleware$1(resolvedMiddleware, "client", {
          ...extractedFn,
          ...resolvedOptions,
          data: opts == null ? void 0 : opts.data,
          headers: opts == null ? void 0 : opts.headers,
          signal: opts == null ? void 0 : opts.signal,
          context: {}
        }).then((d) => {
          if (resolvedOptions.response === "full") {
            return d;
          }
          if (d.error) throw d.error;
          return d.result;
        });
      }, {
        // This copies over the URL, function ID
        ...extractedFn,
        // The extracted function on the server-side calls
        // this function
        __executeServer: async (opts_, signal) => {
          const opts = opts_ instanceof FormData ? extractFormDataContext(opts_) : opts_;
          opts.type = typeof resolvedOptions.type === "function" ? resolvedOptions.type(opts) : resolvedOptions.type;
          const ctx = {
            ...extractedFn,
            ...opts,
            signal
          };
          const run = () => executeMiddleware$1(resolvedMiddleware, "server", ctx).then((d) => ({
            // Only send the result and sendContext back to the client
            result: d.result,
            error: d.error,
            context: d.sendContext
          }));
          if (ctx.type === "static") {
            let response;
            if (serverFnStaticCache == null ? void 0 : serverFnStaticCache.getItem) {
              response = await serverFnStaticCache.getItem(ctx);
            }
            if (!response) {
              response = await run().then((d) => {
                return {
                  ctx: d,
                  error: null
                };
              }).catch((e) => {
                return {
                  ctx: void 0,
                  error: e
                };
              });
              if (serverFnStaticCache == null ? void 0 : serverFnStaticCache.setItem) {
                await serverFnStaticCache.setItem(ctx, response);
              }
            }
            invariant(response, "No response from both server and static cache!");
            if (response.error) {
              throw response.error;
            }
            return response.ctx;
          }
          return run();
        }
      });
    }
  };
}
async function executeMiddleware$1(middlewares, env, opts) {
  const flattenedMiddlewares = flattenMiddlewares([...globalMiddleware, ...middlewares]);
  const next = async (ctx) => {
    const nextMiddleware = flattenedMiddlewares.shift();
    if (!nextMiddleware) {
      return ctx;
    }
    if (nextMiddleware.options.validator && (env === "client" ? nextMiddleware.options.validateClient : true)) {
      ctx.data = await execValidator(nextMiddleware.options.validator, ctx.data);
    }
    const middlewareFn = env === "client" ? nextMiddleware.options.client : nextMiddleware.options.server;
    if (middlewareFn) {
      return applyMiddleware(middlewareFn, ctx, async (newCtx) => {
        return next(newCtx).catch((error) => {
          if (isRedirect(error) || isNotFound(error)) {
            return {
              ...newCtx,
              error
            };
          }
          throw error;
        });
      });
    }
    return next(ctx);
  };
  return next({
    ...opts,
    headers: opts.headers || {},
    sendContext: opts.sendContext || {},
    context: opts.context || {}
  });
}
let serverFnStaticCache;
function setServerFnStaticCache(cache) {
  const previousCache = serverFnStaticCache;
  serverFnStaticCache = typeof cache === "function" ? cache() : cache;
  return () => {
    serverFnStaticCache = previousCache;
  };
}
function createServerFnStaticCache(serverFnStaticCache2) {
  return serverFnStaticCache2;
}
async function sha1Hash(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
setServerFnStaticCache(() => {
  const getStaticCacheUrl = async (options, hash) => {
    const filename = await sha1Hash(`${options.functionId}__${hash}`);
    return `/__tsr/staticServerFnCache/${filename}.json`;
  };
  const jsonToFilenameSafeString = (json2) => {
    const sortedKeysReplacer = (key, value) => value && typeof value === "object" && !Array.isArray(value) ? Object.keys(value).sort().reduce((acc, curr) => {
      acc[curr] = value[curr];
      return acc;
    }, {}) : value;
    const jsonString = JSON.stringify(json2 ?? "", sortedKeysReplacer);
    return jsonString.replace(/[/\\?%*:|"<>]/g, "-").replace(/\s+/g, "_");
  };
  const staticClientCache = typeof document !== "undefined" ? /* @__PURE__ */ new Map() : null;
  return createServerFnStaticCache({
    getItem: async (ctx) => {
      if (typeof document === "undefined") {
        const hash = jsonToFilenameSafeString(ctx.data);
        const url = await getStaticCacheUrl(ctx, hash);
        const publicUrl = "D:/dev/pennylist-tssbeta/.output/public";
        const {
          promises: fs
        } = await import('node:fs');
        const path = await import('node:path');
        const filePath = path.join(publicUrl, url);
        const [cachedResult, readError] = await fs.readFile(filePath, "utf-8").then((c) => [startSerializer.parse(c), null]).catch((e) => [null, e]);
        if (readError && readError.code !== "ENOENT") {
          throw readError;
        }
        return cachedResult;
      }
      return void 0;
    },
    setItem: async (ctx, response) => {
      const {
        promises: fs
      } = await import('node:fs');
      const path = await import('node:path');
      const hash = jsonToFilenameSafeString(ctx.data);
      const url = await getStaticCacheUrl(ctx, hash);
      const publicUrl = "D:/dev/pennylist-tssbeta/.output/public";
      const filePath = path.join(publicUrl, url);
      await fs.mkdir(path.dirname(filePath), {
        recursive: true
      });
      await fs.writeFile(filePath, startSerializer.stringify(response));
    },
    fetchItem: async (ctx) => {
      const hash = jsonToFilenameSafeString(ctx.data);
      const url = await getStaticCacheUrl(ctx, hash);
      let result = staticClientCache == null ? void 0 : staticClientCache.get(url);
      if (!result) {
        result = await fetch(url, {
          method: "GET"
        }).then((r) => r.text()).then((d) => startSerializer.parse(d));
        staticClientCache == null ? void 0 : staticClientCache.set(url, result);
      }
      return result;
    }
  });
});
function extractFormDataContext(formData) {
  const serializedContext = formData.get("__TSR_CONTEXT");
  formData.delete("__TSR_CONTEXT");
  if (typeof serializedContext !== "string") {
    return {
      context: {},
      data: formData
    };
  }
  try {
    const context = startSerializer.parse(serializedContext);
    return {
      context,
      data: formData
    };
  } catch {
    return {
      data: formData
    };
  }
}
function flattenMiddlewares(middlewares) {
  const seen = /* @__PURE__ */ new Set();
  const flattened = [];
  const recurse = (middleware) => {
    middleware.forEach((m) => {
      if (m.options.middleware) {
        recurse(m.options.middleware);
      }
      if (!seen.has(m)) {
        seen.add(m);
        flattened.push(m);
      }
    });
  };
  recurse(middlewares);
  return flattened;
}
const applyMiddleware = async (middlewareFn, ctx, nextFn) => {
  return middlewareFn({
    ...ctx,
    next: async (userCtx = {}) => {
      return nextFn({
        ...ctx,
        ...userCtx,
        context: {
          ...ctx.context,
          ...userCtx.context
        },
        sendContext: {
          ...ctx.sendContext,
          ...userCtx.sendContext ?? {}
        },
        headers: mergeHeaders(ctx.headers, userCtx.headers),
        result: userCtx.result !== void 0 ? userCtx.result : ctx.response === "raw" ? userCtx : ctx.result,
        error: userCtx.error ?? ctx.error
      });
    }
  });
};
function execValidator(validator, input) {
  if (validator == null) return {};
  if ("~standard" in validator) {
    const result = validator["~standard"].validate(input);
    if (result instanceof Promise) throw new Error("Async validation not supported");
    if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2));
    return result.value;
  }
  if ("parse" in validator) {
    return validator.parse(input);
  }
  if (typeof validator === "function") {
    return validator(input);
  }
  throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
  return {
    _types: void 0,
    options: {
      validator: options.validator,
      validateClient: options.validateClient,
      client: async ({
        next,
        sendContext,
        ...ctx
      }) => {
        var _a;
        const payload = {
          ...ctx,
          // switch the sendContext over to context
          context: sendContext,
          type: typeof ctx.type === "function" ? ctx.type(ctx) : ctx.type
        };
        if (ctx.type === "static" && "production" === "production" && typeof document !== "undefined") {
          invariant(serverFnStaticCache, "serverFnStaticCache.fetchItem is not available!");
          const result = await serverFnStaticCache.fetchItem(payload);
          if (result) {
            if (result.error) {
              throw result.error;
            }
            return next(result.ctx);
          }
          warning(result, `No static cache item found for ${payload.functionId}__${JSON.stringify(payload.data)}, falling back to server function...`);
        }
        const res = await ((_a = options.extractedFn) == null ? void 0 : _a.call(options, payload));
        return next(res);
      },
      server: async ({
        next,
        ...ctx
      }) => {
        var _a;
        const result = await ((_a = options.serverFn) == null ? void 0 : _a.call(options, ctx));
        return next({
          ...ctx,
          result
        });
      }
    }
  };
}
function json(payload, init) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: mergeHeaders(
      { "content-type": "application/json" },
      init == null ? void 0 : init.headers
    )
  });
}
function createMiddleware(options, __opts) {
  const resolvedOptions = {
    type: "function",
    ...__opts || options
  };
  return {
    options: resolvedOptions,
    middleware: (middleware) => {
      return createMiddleware({}, Object.assign(resolvedOptions, {
        middleware
      }));
    },
    validator: (validator) => {
      return createMiddleware({}, Object.assign(resolvedOptions, {
        validator
      }));
    },
    client: (client) => {
      return createMiddleware({}, Object.assign(resolvedOptions, {
        client
      }));
    },
    server: (server) => {
      return createMiddleware({}, Object.assign(resolvedOptions, {
        server
      }));
    }
  };
}
const eventStorage = new AsyncLocalStorage();
function defineEventHandler(handler) {
  return defineEventHandler$1((event) => {
    return runWithEvent(event, () => handler(event));
  });
}
async function runWithEvent(event, fn) {
  return eventStorage.run(event, fn);
}
function getEvent() {
  const event = eventStorage.getStore();
  if (!event) {
    throw new Error(
      `No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`
    );
  }
  return event;
}
const HTTPEventSymbol = Symbol("$HTTPEvent");
function isEvent(obj) {
  return typeof obj === "object" && (obj instanceof H3Event || (obj == null ? void 0 : obj[HTTPEventSymbol]) instanceof H3Event || (obj == null ? void 0 : obj.__is_event__) === true);
}
function createWrapperFunction(h3Function) {
  return function(...args) {
    const event = args[0];
    if (!isEvent(event)) {
      args.unshift(getEvent());
    } else {
      args[0] = event instanceof H3Event || event.__is_event__ ? event : event[HTTPEventSymbol];
    }
    return h3Function(...args);
  };
}
const setResponseStatus = createWrapperFunction(setResponseStatus$1);
const getResponseStatus = createWrapperFunction(getResponseStatus$1);
const getResponseHeaders = createWrapperFunction(getResponseHeaders$1);
const parseCookies = createWrapperFunction(parseCookies$1);
const setCookie = createWrapperFunction(setCookie$1);
function requestHandler(handler) {
  return handler;
}
const minifiedTsrBootStrapScript = 'const __TSR_SSR__={matches:[],streamedValues:{},initMatch:o=>(__TSR_SSR__.matches.push(o),o.extracted?.forEach(l=>{if(l.type==="stream"){let r;l.value=new ReadableStream({start(e){r={enqueue:t=>{try{e.enqueue(t)}catch{}},close:()=>{try{e.close()}catch{}}}}}),l.value.controller=r}else{let r,e;l.value=new Promise((t,a)=>{e=a,r=t}),l.value.reject=e,l.value.resolve=r}}),!0),resolvePromise:({matchId:o,id:l,promiseState:r})=>{const e=__TSR_SSR__.matches.find(t=>t.id===o);if(e){const t=e.extracted?.[l];if(t&&t.type==="promise"&&t.value&&r.status==="success")return t.value.resolve(r.data),!0}return!1},injectChunk:({matchId:o,id:l,chunk:r})=>{const e=__TSR_SSR__.matches.find(t=>t.id===o);if(e){const t=e.extracted?.[l];if(t&&t.type==="stream"&&t.value?.controller)return t.value.controller.enqueue(new TextEncoder().encode(r.toString())),!0}return!1},closeStream:({matchId:o,id:l})=>{const r=__TSR_SSR__.matches.find(e=>e.id===o);if(r){const e=r.extracted?.[l];if(e&&e.type==="stream"&&e.value?.controller)return e.value.controller.close(),!0}return!1},cleanScripts:()=>{document.querySelectorAll(".tsr-once").forEach(o=>{o.remove()})}};window.__TSR_SSR__=__TSR_SSR__;\n';
function attachRouterServerSsrUtils(router, manifest) {
  router.ssr = {
    manifest,
    serializer: startSerializer
  };
  router.serverSsr = {
    injectedHtml: [],
    streamedKeys: /* @__PURE__ */ new Set(),
    injectHtml: (getHtml) => {
      const promise = Promise.resolve().then(getHtml);
      router.serverSsr.injectedHtml.push(promise);
      router.emit({
        type: "onInjectedHtml",
        promise
      });
      return promise.then(() => {
      });
    },
    injectScript: (getScript, opts) => {
      return router.serverSsr.injectHtml(async () => {
        const script = await getScript();
        return `<script class='tsr-once'>${script}${""}; if (typeof __TSR_SSR__ !== 'undefined') __TSR_SSR__.cleanScripts()<\/script>`;
      });
    },
    streamValue: (key, value) => {
      warning(
        !router.serverSsr.streamedKeys.has(key),
        "Key has already been streamed: " + key
      );
      router.serverSsr.streamedKeys.add(key);
      router.serverSsr.injectScript(
        () => `__TSR_SSR__.streamedValues['${key}'] = { value: ${jsesc(
          router.ssr.serializer.stringify(value),
          {
            isScriptContext: true,
            wrap: true,
            json: true
          }
        )}}`
      );
    },
    onMatchSettled
  };
  router.serverSsr.injectScript(() => minifiedTsrBootStrapScript, {
    logScript: false
  });
}
function dehydrateRouter(router) {
  var _a, _b, _c;
  const dehydratedRouter = {
    manifest: router.ssr.manifest,
    dehydratedData: (_b = (_a = router.options).dehydrate) == null ? void 0 : _b.call(_a),
    lastMatchId: ((_c = router.state.matches[router.state.matches.length - 1]) == null ? void 0 : _c.id) || ""
  };
  router.serverSsr.injectScript(
    () => `__TSR_SSR__.dehydrated = ${jsesc(
      router.ssr.serializer.stringify(dehydratedRouter),
      {
        isScriptContext: true,
        wrap: true,
        json: true
      }
    )}`
  );
}
function extractAsyncLoaderData(loaderData, ctx) {
  const extracted = [];
  const replaced = replaceBy(loaderData, (value, path) => {
    if (value instanceof ReadableStream) {
      const [copy1, copy2] = value.tee();
      const entry = {
        type: "stream",
        path,
        id: extracted.length,
        matchIndex: ctx.match.index,
        stream: copy2
      };
      extracted.push(entry);
      return copy1;
    } else if (value instanceof Promise) {
      const deferredPromise = defer(value);
      const entry = {
        type: "promise",
        path,
        id: extracted.length,
        matchIndex: ctx.match.index,
        promise: deferredPromise
      };
      extracted.push(entry);
    }
    return value;
  });
  return { replaced, extracted };
}
function onMatchSettled(opts) {
  const { router, match } = opts;
  let extracted = void 0;
  let serializedLoaderData = void 0;
  if (match.loaderData !== void 0) {
    const result = extractAsyncLoaderData(match.loaderData, {
      match
    });
    match.loaderData = result.replaced;
    extracted = result.extracted;
    serializedLoaderData = extracted.reduce(
      (acc, entry) => {
        return deepImmutableSetByPath(acc, ["temp", ...entry.path], void 0);
      },
      { temp: result.replaced }
    ).temp;
  }
  const initCode = `__TSR_SSR__.initMatch(${jsesc(
    {
      id: match.id,
      __beforeLoadContext: router.ssr.serializer.stringify(
        match.__beforeLoadContext
      ),
      loaderData: router.ssr.serializer.stringify(serializedLoaderData),
      error: router.ssr.serializer.stringify(match.error),
      extracted: extracted == null ? void 0 : extracted.map((entry) => pick(entry, ["type", "path"])),
      updatedAt: match.updatedAt,
      status: match.status
    },
    {
      isScriptContext: true,
      wrap: true,
      json: true
    }
  )})`;
  router.serverSsr.injectScript(() => initCode);
  if (extracted) {
    extracted.forEach((entry) => {
      if (entry.type === "promise") return injectPromise(entry);
      return injectStream(entry);
    });
  }
  function injectPromise(entry) {
    router.serverSsr.injectScript(async () => {
      await entry.promise;
      return `__TSR_SSR__.resolvePromise(${jsesc(
        {
          matchId: match.id,
          id: entry.id,
          promiseState: entry.promise[TSR_DEFERRED_PROMISE]
        },
        {
          isScriptContext: true,
          wrap: true,
          json: true
        }
      )})`;
    });
  }
  function injectStream(entry) {
    router.serverSsr.injectHtml(async () => {
      try {
        const reader = entry.stream.getReader();
        let chunk = null;
        while (!(chunk = await reader.read()).done) {
          if (chunk.value) {
            const code = `__TSR_SSR__.injectChunk(${jsesc(
              {
                matchId: match.id,
                id: entry.id,
                chunk: chunk.value
              },
              {
                isScriptContext: true,
                wrap: true,
                json: true
              }
            )})`;
            router.serverSsr.injectScript(() => code);
          }
        }
        router.serverSsr.injectScript(
          () => `__TSR_SSR__.closeStream(${jsesc(
            {
              matchId: match.id,
              id: entry.id
            },
            {
              isScriptContext: true,
              wrap: true,
              json: true
            }
          )})`
        );
      } catch (err) {
        console.error("stream read error", err);
      }
      return "";
    });
  }
}
function deepImmutableSetByPath(obj, path, value) {
  if (path.length === 0) {
    return value;
  }
  const [key, ...rest] = path;
  if (Array.isArray(obj)) {
    return obj.map((item, i) => {
      if (i === Number(key)) {
        return deepImmutableSetByPath(item, rest, value);
      }
      return item;
    });
  }
  if (isPlainObject(obj)) {
    return {
      ...obj,
      [key]: deepImmutableSetByPath(obj[key], rest, value)
    };
  }
  return obj;
}
function replaceBy(obj, cb, path = []) {
  if (isPlainArray(obj)) {
    return obj.map((value, i) => replaceBy(value, cb, [...path, `${i}`]));
  }
  if (isPlainObject(obj)) {
    const newObj2 = {};
    for (const key in obj) {
      newObj2[key] = replaceBy(obj[key], cb, [...path, key]);
    }
    return newObj2;
  }
  const newObj = cb(obj, path);
  if (newObj !== obj) {
    return newObj;
  }
  return obj;
}
const VIRTUAL_MODULES = {
  routeTree: "tanstack-start-route-tree:v",
  startManifest: "tanstack-start-manifest:v",
  serverFnManifest: "tanstack-start-server-fn-manifest:v"
};
async function loadVirtualModule(id) {
  switch (id) {
    case VIRTUAL_MODULES.routeTree:
      return await Promise.resolve().then(() => routeTree_gen);
    case VIRTUAL_MODULES.startManifest:
      return await import('./_tanstack-start-manifest_v-DNj3GU0t.mjs');
    case VIRTUAL_MODULES.serverFnManifest:
      return await import('./_tanstack-start-server-fn-manifest_v-BubAOOxl.mjs');
    default:
      throw new Error(`Unknown virtual module: ${id}`);
  }
}
async function getStartManifest(opts) {
  const { tsrStartManifest } = await loadVirtualModule(
    VIRTUAL_MODULES.startManifest
  );
  const startManifest = tsrStartManifest();
  const rootRoute = startManifest.routes[rootRouteId] = startManifest.routes[rootRouteId] || {};
  rootRoute.assets = rootRoute.assets || [];
  const manifest = {
    ...startManifest,
    routes: Object.fromEntries(
      Object.entries(startManifest.routes).map(([k, v]) => {
        const { preloads, assets } = v;
        return [
          k,
          {
            preloads,
            assets
          }
        ];
      })
    )
  };
  return manifest;
}
function sanitizeBase$1(base) {
  return base.replace(/^\/|\/$/g, "");
}
const handleServerAction = async ({
  request
}) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const abort = () => controller.abort();
  request.signal.addEventListener("abort", abort);
  const method = request.method;
  const url = new URL(request.url, "http://localhost:3000");
  const regex = new RegExp(`${sanitizeBase$1("/_serverFn")}/([^/?#]+)`);
  const match = url.pathname.match(regex);
  const serverFnId = match ? match[1] : null;
  const search = Object.fromEntries(url.searchParams.entries());
  const isCreateServerFn = "createServerFn" in search;
  const isRaw = "raw" in search;
  if (typeof serverFnId !== "string") {
    throw new Error("Invalid server action param for serverFnId: " + serverFnId);
  }
  const {
    default: serverFnManifest
  } = await loadVirtualModule(VIRTUAL_MODULES.serverFnManifest);
  const serverFnInfo = serverFnManifest[serverFnId];
  if (!serverFnInfo) {
    console.info("serverFnManifest", serverFnManifest);
    throw new Error("Server function info not found for " + serverFnId);
  }
  const fnModule = await serverFnInfo.importer();
  if (!fnModule) {
    console.info("serverFnInfo", serverFnInfo);
    throw new Error("Server function module not resolved for " + serverFnId);
  }
  const action = fnModule[serverFnInfo.functionName];
  if (!action) {
    console.info("serverFnInfo", serverFnInfo);
    console.info("fnModule", fnModule);
    throw new Error(`Server function module export not resolved for serverFn ID: ${serverFnId}`);
  }
  const formDataContentTypes = ["multipart/form-data", "application/x-www-form-urlencoded"];
  const response = await (async () => {
    try {
      let result = await (async () => {
        if (request.headers.get("Content-Type") && formDataContentTypes.some((type) => {
          var _a;
          return (_a = request.headers.get("Content-Type")) == null ? void 0 : _a.includes(type);
        })) {
          invariant(method.toLowerCase() !== "get", "GET requests with FormData payloads are not supported");
          return await action(await request.formData(), signal);
        }
        if (method.toLowerCase() === "get") {
          let payload2 = search;
          if (isCreateServerFn) {
            payload2 = search.payload;
          }
          payload2 = payload2 ? startSerializer.parse(payload2) : payload2;
          return await action(payload2, signal);
        }
        const jsonPayloadAsString = await request.text();
        const payload = startSerializer.parse(jsonPayloadAsString);
        if (isCreateServerFn) {
          return await action(payload, signal);
        }
        return await action(...payload, signal);
      })();
      if (result.result instanceof Response) {
        return result.result;
      }
      if (!isCreateServerFn) {
        result = result.result;
        if (result instanceof Response) {
          return result;
        }
      }
      if (isNotFound(result)) {
        return isNotFoundResponse(result);
      }
      return new Response(result !== void 0 ? startSerializer.stringify(result) : void 0, {
        status: getResponseStatus(getEvent()),
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      if (error instanceof Response) {
        return error;
      }
      if (isNotFound(error)) {
        return isNotFoundResponse(error);
      }
      console.info();
      console.info("Server Fn Error!");
      console.info();
      console.error(error);
      console.info();
      return new Response(startSerializer.stringify(error), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  })();
  request.signal.removeEventListener("abort", abort);
  if (isRaw) {
    return response;
  }
  return response;
};
function isNotFoundResponse(error) {
  const {
    headers,
    ...rest
  } = error;
  return new Response(JSON.stringify(rest), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      ...headers || {}
    }
  });
}
function getStartResponseHeaders(opts) {
  let headers = mergeHeaders(
    getResponseHeaders(),
    {
      "Content-Type": "text/html; charset=UTF-8"
    },
    ...opts.router.state.matches.map((match) => {
      return match.headers;
    })
  );
  const { redirect: redirect2 } = opts.router.state;
  if (redirect2) {
    headers = mergeHeaders(headers, redirect2.headers);
  }
  return headers;
}
function createStartHandler({
  createRouter: createRouter2
}) {
  let serverRouteTree = null;
  return (cb) => {
    const originalFetch = globalThis.fetch;
    const startRequestResolver = async ({ request }) => {
      globalThis.fetch = async function(input, init) {
        function resolve(url2, requestOptions) {
          const fetchRequest = new Request(url2, requestOptions);
          return startRequestResolver({ request: fetchRequest });
        }
        function getOrigin() {
          return request.headers.get("Origin") || request.headers.get("Referer") || "http://localhost";
        }
        if (typeof input === "string" && input.startsWith("/")) {
          const url2 = new URL(input, getOrigin());
          return resolve(url2, init);
        } else if (typeof input === "object" && "url" in input && typeof input.url === "string" && input.url.startsWith("/")) {
          const url2 = new URL(input.url, getOrigin());
          return resolve(url2, init);
        }
        return originalFetch(input, init);
      };
      const url = new URL(request.url);
      const href = url.href.replace(url.origin, "");
      const history = createMemoryHistory({
        initialEntries: [href]
      });
      const APP_BASE = "/";
      const router = createRouter2();
      const startRoutesManifest = await getStartManifest();
      attachRouterServerSsrUtils(router, startRoutesManifest);
      router.update({
        history
      });
      const response = await (async () => {
        try {
          if (false) ;
          const serverFnBase = joinPaths([
            APP_BASE,
            trimPath("/_serverFn"),
            "/"
          ]);
          if (href.startsWith(serverFnBase)) {
            return await handleServerAction({ request });
          }
          if (serverRouteTree === null) {
            try {
              serverRouteTree = (await loadVirtualModule(VIRTUAL_MODULES.routeTree)).serverRouteTree;
            } catch (e) {
              console.log(e);
            }
          }
          if (serverRouteTree) {
            const [_matchedRoutes, response3] = await handleServerRoutes({
              routeTree: serverRouteTree,
              request,
              basePath: APP_BASE
            });
            if (response3) return response3;
          }
          const requestAcceptHeader = request.headers.get("Accept") || "*/*";
          const splitRequestAcceptHeader = requestAcceptHeader.split(",");
          const supportedMimeTypes = ["*/*", "text/html"];
          const isRouterAcceptSupported = supportedMimeTypes.some(
            (mimeType) => splitRequestAcceptHeader.some(
              (acceptedMimeType) => acceptedMimeType.trim().startsWith(mimeType)
            )
          );
          if (!isRouterAcceptSupported) {
            return json(
              {
                error: "Only HTML requests are supported here"
              },
              {
                status: 500
              }
            );
          }
          await router.load();
          if (router.state.redirect) return router.state.redirect;
          dehydrateRouter(router);
          const responseHeaders = getStartResponseHeaders({ router });
          const response2 = await cb({
            request,
            router,
            responseHeaders
          });
          return response2;
        } catch (err) {
          if (err instanceof Response) {
            return err;
          }
          throw err;
        }
      })();
      if (isRedirect(response)) {
        if (isResolvedRedirect(response)) {
          if (request.headers.get("x-tsr-redirect") === "manual") {
            return json(
              {
                ...response.options,
                isSerializedRedirect: true
              },
              {
                headers: response.headers
              }
            );
          }
          return response;
        }
        if (response.options.to && typeof response.options.to === "string" && !response.options.to.startsWith("/")) {
          throw new Error(
            `Server side redirects must use absolute paths via the 'href' or 'to' options. Received: ${JSON.stringify(response.options)}`
          );
        }
        if (["params", "search", "hash"].some(
          (d) => typeof response.options[d] === "function"
        )) {
          throw new Error(
            `Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(
              response.options
            ).filter((d) => typeof response.options[d] === "function").map((d) => `"${d}"`).join(", ")}`
          );
        }
        const redirect2 = router.resolveRedirect(response);
        if (request.headers.get("x-tsr-redirect") === "manual") {
          return json(
            {
              ...response.options,
              isSerializedRedirect: true
            },
            {
              headers: response.headers
            }
          );
        }
        return redirect2;
      }
      return response;
    };
    return requestHandler(startRequestResolver);
  };
}
async function handleServerRoutes({
  routeTree: routeTree2,
  request,
  basePath
}) {
  const { flatRoutes, routesById, routesByPath } = processRouteTree({
    routeTree: routeTree2,
    initRoute: (route, i) => {
      route.init({
        originalIndex: i
      });
    }
  });
  const url = new URL(request.url);
  const pathname = url.pathname;
  const history = createMemoryHistory({
    initialEntries: [pathname]
  });
  const { matchedRoutes, foundRoute, routeParams } = getMatchedRoutes({
    pathname: history.location.pathname,
    basepath: basePath,
    caseSensitive: true,
    routesByPath,
    routesById,
    flatRoutes
  });
  let response;
  if (foundRoute && foundRoute.id !== rootRouteId) {
    const method = Object.keys(foundRoute.options.methods).find(
      (method2) => method2.toLowerCase() === request.method.toLowerCase()
    );
    if (method) {
      const handler = foundRoute.options.methods[method];
      if (handler) {
        const middlewares = flattenMiddlewares(
          matchedRoutes.flatMap((r) => r.options.middleware).filter(Boolean)
        ).map((d) => d.options.server);
        middlewares.push(handlerToMiddleware(handler));
        const ctx = await executeMiddleware(middlewares, {
          request,
          context: {},
          params: routeParams,
          pathname: history.location.pathname
        });
        response = ctx.response;
      }
    }
  }
  return [matchedRoutes, response];
}
function handlerToMiddleware(handler) {
  return async ({ next: _next, ...rest }) => ({
    response: await handler(rest)
  });
}
function executeMiddleware(middlewares, ctx) {
  let index = -1;
  const next = async (ctx2) => {
    index++;
    const middleware = middlewares[index];
    if (!middleware) return ctx2;
    const result = await middleware({
      ...ctx2,
      // Allow the middleware to call the next middleware in the chain
      next: async (nextCtx) => {
        const nextResult = await next({ ...ctx2, ...nextCtx });
        return Object.assign(ctx2, handleCtxResult(nextResult));
      }
      // Allow the middleware result to extend the return context
    }).catch((err) => {
      if (isSpecialResponse(err)) {
        return {
          response: err
        };
      }
      throw err;
    });
    return Object.assign(ctx2, handleCtxResult(result));
  };
  return handleCtxResult(next(ctx));
}
function handleCtxResult(result) {
  if (isSpecialResponse(result)) {
    return {
      response: result
    };
  }
  return result;
}
function isSpecialResponse(err) {
  return isResponse(err) || isRedirect(err);
}
function isResponse(response) {
  return response instanceof Response;
}
function defineHandlerCallback(handler) {
  return handler;
}
const defaultStreamHandler = defineHandlerCallback(
  async ({ request, router, responseHeaders }) => {
    if (typeof ReactDOMServer.renderToReadableStream === "function") {
      const stream = await ReactDOMServer.renderToReadableStream(
        /* @__PURE__ */ jsx(StartServer, { router }),
        {
          signal: request.signal
        }
      );
      if (isbot(request.headers.get("User-Agent"))) {
        await stream.allReady;
      }
      const responseStream = transformReadableStreamWithRouter(
        router,
        stream
      );
      return new Response(responseStream, {
        status: router.state.statusCode,
        headers: responseHeaders
      });
    }
    if (typeof ReactDOMServer.renderToPipeableStream === "function") {
      const reactAppPassthrough = new PassThrough();
      try {
        const pipeable = ReactDOMServer.renderToPipeableStream(
          /* @__PURE__ */ jsx(StartServer, { router }),
          {
            ...isbot(request.headers.get("User-Agent")) ? {
              onAllReady() {
                pipeable.pipe(reactAppPassthrough);
              }
            } : {
              onShellReady() {
                pipeable.pipe(reactAppPassthrough);
              }
            },
            onError: (error, info) => {
              if (error instanceof Error && error.message === "ShellBoundaryError")
                return;
              console.error("Error in renderToPipeableStream:", error, info);
            }
          }
        );
      } catch (e) {
        console.error("Error in renderToPipeableStream:", e);
      }
      const responseStream = transformPipeableStreamWithRouter(
        router,
        reactAppPassthrough
      );
      return new Response(responseStream, {
        status: router.state.statusCode,
        headers: responseHeaders
      });
    }
    throw new Error(
      "No renderToReadableStream or renderToPipeableStream found in react-dom/server. Ensure you are using a version of react-dom that supports streaming."
    );
  }
);
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...props
    }
  );
};
function sanitizeBase(base) {
  return base.replace(/^\/|\/$/g, "");
}
const createServerRpc = (functionId, serverBase, splitImportFn) => {
  invariant(
    splitImportFn,
    "🚨splitImportFn required for the server functions server runtime, but was not provided."
  );
  const url = `/${sanitizeBase(serverBase)}/${functionId}`;
  return Object.assign(splitImportFn, {
    url,
    functionId
  });
};
function getSupabaseServerClient() {
  return createServerClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return Object.entries(parseCookies()).map(([name, value]) => ({
            name,
            value
          }));
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            setCookie(cookie.name, cookie.value, { maxAge: 60 * 60 * 24 * 2 });
          });
        }
      }
    }
  );
}
const authMiddleware = createMiddleware().server(async ({
  next
}) => {
  const supabase = getSupabaseServerClient();
  const {
    data: {
      user
    }
  } = await supabase.auth.getUser();
  if (!user) {
    setResponseStatus(401);
    throw new Error("Unauthorized");
  }
  return next({
    context: {
      user
    }
  });
});
const getUser_createServerFn_handler = createServerRpc("src_lib_server_fn_user_ts--getUser_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getUser.__executeServer(opts, signal);
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
const getUserSettings_createServerFn_handler = createServerRpc("src_lib_server_fn_user_ts--getUserSettings_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getUserSettings.__executeServer(opts, signal);
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
const updateUserSettings_createServerFn_handler = createServerRpc("src_lib_server_fn_user_ts--updateUserSettings_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return updateUserSettings.__executeServer(opts, signal);
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
const initiateUserSettings_createServerFn_handler = createServerRpc("src_lib_server_fn_user_ts--initiateUserSettings_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return initiateUserSettings.__executeServer(opts, signal);
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
const getUserPIN_createServerFn_handler = createServerRpc("src_lib_server_fn_user_ts--getUserPIN_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getUserPIN.__executeServer(opts, signal);
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
  const supabase = getSupabaseServerClient();
  const {
    data
  } = await supabase.from("setting").select("PIN").eq("userId", id).single();
  return (data == null ? void 0 : data.PIN) ?? null;
});
const userQueryOptions = () => queryOptions({
  queryKey: ["user"],
  queryFn: ({ signal }) => getUser({ signal })
});
const userSettingsQueryOptions = () => queryOptions({
  queryKey: ["user-settings"],
  queryFn: async ({ signal }) => await getUserSettings({ signal })
});
const swUrl = "/sw.js";
const swScope = "/";
const swType = "classic";
const getSerwist = async () => {
  if ("serviceWorker" in navigator) {
    return new (await import('@serwist/window')).Serwist(swUrl, { scope: swScope, type: swType });
  }
  return void 0;
};
const Route$d = createRootRouteWithContext()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery(userQueryOptions());
    return { user };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "pennylist."
      },
      {
        name: "description",
        content: "Avoid becoming penniless, start using pennylist."
      },
      { name: "theme-color", content: "#000000" },
      { name: "background-color", content: "#000000" },
      { name: "display", content: "standalone" },
      { name: "mobile-web-app-capable", content: "yes" }
    ],
    links: [
      { rel: "stylesheet", href: "/src/app.css" },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/icon-256.png", sizes: "256x256" },
      { rel: "mask-icon", href: "/icon-512.png" },
      { rel: "manifest", href: "/manifest.json" }
    ]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({ children }) {
  useEffect(() => {
    let serwist;
    const onInstalled = () => {
      console.log("Serwist installed!");
    };
    const loadSerwist = async () => {
      if ("serviceWorker" in navigator) {
        serwist = await getSerwist();
        serwist == null ? void 0 : serwist.addEventListener("installed", onInstalled);
        void (serwist == null ? void 0 : serwist.register());
      }
    };
    loadSerwist();
    return () => {
      serwist == null ? void 0 : serwist.removeEventListener("installed", onInstalled);
    };
  }, []);
  return /* @__PURE__ */ jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "bg-background text-foreground lexend h-dvh antialiased", children: [
      /* @__PURE__ */ jsx(ScriptOnce, { children: `document.documentElement.classList.toggle(
            'dark',
            localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )` }),
      children,
      /* @__PURE__ */ jsx(Toaster, { richColors: true }),
      /* @__PURE__ */ jsx(ReactQueryDevtools, { buttonPosition: "bottom-left" }),
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
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
const Route$c = createFileRoute("/logout")({
  beforeLoad: async ({
    context
  }) => {
    if (!context.user) {
      throw redirect({
        to: "/login"
      });
    }
  },
  component: RouteComponent$9
});
function RouteComponent$9() {
  const {
    queryClient
  } = Route$c.useRouteContext();
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
const storage = {
  getItem: async (name) => {
    return await get(name) || null;
  },
  setItem: async (name, value) => {
    await set(name, value);
  },
  removeItem: async (name) => {
    await del(name);
  }
};
const useFloatingNavState = create()(
  persist(
    (set2) => ({
      showAddMoneyBtn: false,
      showSettingsBtn: false,
      showLogsPageBtn: false,
      showAnalyticsPageBtn: false,
      setState: (state) => set2(() => state)
    }),
    {
      name: "floating-nav-state",
      storage: createJSONStorage(() => storage)
    }
  )
);
const useTransferState = create()((set2) => ({
  sender: null,
  receivers: null,
  selectForTransfer: (money) => set2((state) => {
    if (!state.sender) {
      return { sender: money };
    }
    if (money.id === state.sender.id) {
      return { sender: null, receivers: null };
    }
    if (!state.receivers || state.receivers.length === 0) {
      return { receivers: [money] };
    }
    const isExisting = state.receivers.some((r) => r.id === money.id);
    if (isExisting) {
      const updatedReceivers = state.receivers.filter((r) => r.id !== money.id);
      return { receivers: updatedReceivers.length ? updatedReceivers : null };
    } else {
      return { receivers: [...state.receivers, money] };
    }
  }),
  setReceiverData: (money) => set2((state) => {
    if (state.receivers && state.receivers.find((r) => r.id === money.id)) {
      return {
        receivers: state.receivers.map(
          (r) => r.id === money.id ? { ...r, ...money } : r
        )
      };
    }
    return {};
  }),
  cancel: () => set2(() => ({ receivers: null, sender: null })),
  reset: () => set2(({ receivers }) => {
    return {
      receivers: receivers == null ? void 0 : receivers.map((r) => ({ ...r, cashIn: 0, fee: 0 }))
    };
  })
}));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const MotionHighlightContext = React.createContext(void 0);
function useMotionHighlight() {
  const context = React.useContext(MotionHighlightContext);
  if (!context) {
    throw new Error(
      "useMotionHighlight must be used within a MotionHighlightProvider"
    );
  }
  return context;
}
function MotionHighlight({
  ref,
  ...props
}) {
  const {
    children,
    value,
    defaultValue,
    onValueChange,
    className,
    transition = { type: "spring", stiffness: 350, damping: 35 },
    hover = false,
    enabled = true,
    controlledItems,
    disabled = false,
    exitDelay = 0.2,
    mode = "children"
  } = props;
  const localRef = React.useRef(null);
  React.useImperativeHandle(ref, () => localRef.current);
  const [activeValue, setActiveValue] = React.useState(
    value ?? defaultValue ?? null
  );
  const [boundsState, setBoundsState] = React.useState(null);
  const [activeClassNameState, setActiveClassNameState] = React.useState("");
  const safeSetActiveValue = React.useCallback(
    (id2) => {
      setActiveValue((prev) => prev === id2 ? prev : id2);
      if (id2 !== activeValue) onValueChange == null ? void 0 : onValueChange(id2);
    },
    [activeValue, onValueChange]
  );
  const safeSetBounds = React.useCallback(
    (bounds) => {
      if (!localRef.current) return;
      const boundsOffset = (props == null ? void 0 : props.boundsOffset) ?? {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      };
      const containerRect = localRef.current.getBoundingClientRect();
      const newBounds = {
        top: bounds.top - containerRect.top + (boundsOffset.top ?? 0),
        left: bounds.left - containerRect.left + (boundsOffset.left ?? 0),
        width: bounds.width + (boundsOffset.width ?? 0),
        height: bounds.height + (boundsOffset.height ?? 0)
      };
      setBoundsState((prev) => {
        if (prev && prev.top === newBounds.top && prev.left === newBounds.left && prev.width === newBounds.width && prev.height === newBounds.height) {
          return prev;
        }
        return newBounds;
      });
    },
    [props]
  );
  const clearBounds = React.useCallback(() => {
    setBoundsState((prev) => prev === null ? prev : null);
  }, []);
  React.useEffect(() => {
    if (value !== void 0) setActiveValue(value);
    else if (defaultValue !== void 0) setActiveValue(defaultValue);
  }, [value, defaultValue]);
  const id = React.useId();
  React.useEffect(() => {
    if (mode !== "parent") return;
    const container = localRef.current;
    if (!container) return;
    const onScroll = () => {
      if (!activeValue) return;
      const activeEl = container.querySelector(
        `[data-value="${activeValue}"][data-highlight="true"]`
      );
      if (activeEl) safeSetBounds(activeEl.getBoundingClientRect());
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [mode, activeValue, safeSetBounds]);
  const render = React.useCallback(
    (children2) => {
      if (mode === "parent") {
        return /* @__PURE__ */ jsxs(
          "div",
          {
            ref: localRef,
            "data-slot": "motion-highlight-container",
            className: cn(
              "relative",
              props == null ? void 0 : props.containerClassName
            ),
            children: [
              /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: boundsState && /* @__PURE__ */ jsx(
                motion.div,
                {
                  "data-slot": "motion-highlight",
                  animate: {
                    top: boundsState.top,
                    left: boundsState.left,
                    width: boundsState.width,
                    height: boundsState.height,
                    opacity: 1
                  },
                  initial: {
                    top: boundsState.top,
                    left: boundsState.left,
                    width: boundsState.width,
                    height: boundsState.height,
                    opacity: 0
                  },
                  exit: {
                    opacity: 0,
                    transition: {
                      ...transition,
                      delay: ((transition == null ? void 0 : transition.delay) ?? 0) + (exitDelay ?? 0)
                    }
                  },
                  transition,
                  className: cn(
                    "absolute bg-muted z-0",
                    className,
                    activeClassNameState
                  )
                }
              ) }),
              children2
            ]
          }
        );
      }
      return children2;
    },
    [
      mode,
      props,
      boundsState,
      transition,
      exitDelay,
      className,
      activeClassNameState
    ]
  );
  return /* @__PURE__ */ jsx(
    MotionHighlightContext.Provider,
    {
      value: {
        mode,
        activeValue,
        setActiveValue: safeSetActiveValue,
        id,
        hover,
        className,
        transition,
        disabled,
        enabled,
        exitDelay,
        setBounds: safeSetBounds,
        clearBounds,
        activeClassName: activeClassNameState,
        setActiveClassName: setActiveClassNameState,
        forceUpdateBounds: props == null ? void 0 : props.forceUpdateBounds
      },
      children: enabled ? controlledItems ? render(children) : render(
        React.Children.map(children, (child, index) => /* @__PURE__ */ jsx(
          MotionHighlightItem,
          {
            className: props == null ? void 0 : props.itemsClassName,
            children: child
          },
          index
        ))
      ) : children
    }
  );
}
function getNonOverridingDataAttributes(element, dataAttributes) {
  return Object.keys(dataAttributes).reduce(
    (acc, key) => {
      if (element.props[key] === void 0) {
        acc[key] = dataAttributes[key];
      }
      return acc;
    },
    {}
  );
}
function MotionHighlightItem({
  ref,
  children,
  id,
  value,
  className,
  transition,
  disabled = false,
  activeClassName,
  exitDelay,
  asChild = false,
  forceUpdateBounds,
  ...props
}) {
  var _a, _b;
  const itemId = React.useId();
  const {
    activeValue,
    setActiveValue,
    mode,
    setBounds,
    clearBounds,
    hover,
    enabled,
    className: contextClassName,
    transition: contextTransition,
    id: contextId,
    disabled: contextDisabled,
    exitDelay: contextExitDelay,
    forceUpdateBounds: contextForceUpdateBounds,
    setActiveClassName
  } = useMotionHighlight();
  const element = children;
  const childValue = id ?? value ?? ((_a = element.props) == null ? void 0 : _a["data-value"]) ?? ((_b = element.props) == null ? void 0 : _b.id) ?? itemId;
  const isActive = activeValue === childValue;
  const isDisabled = disabled === void 0 ? contextDisabled : disabled;
  const itemTransition = transition ?? contextTransition;
  const localRef = React.useRef(null);
  React.useImperativeHandle(ref, () => localRef.current);
  React.useEffect(() => {
    if (mode !== "parent") return;
    let rafId;
    let previousBounds = null;
    const shouldUpdateBounds = forceUpdateBounds === true || contextForceUpdateBounds && forceUpdateBounds !== false;
    const updateBounds = () => {
      if (!localRef.current) return;
      const bounds = localRef.current.getBoundingClientRect();
      if (shouldUpdateBounds) {
        if (previousBounds && previousBounds.top === bounds.top && previousBounds.left === bounds.left && previousBounds.width === bounds.width && previousBounds.height === bounds.height) {
          rafId = requestAnimationFrame(updateBounds);
          return;
        }
        previousBounds = bounds;
        rafId = requestAnimationFrame(updateBounds);
      }
      setBounds(bounds);
    };
    if (isActive) {
      updateBounds();
      setActiveClassName(activeClassName ?? "");
    } else if (!activeValue) clearBounds();
    if (shouldUpdateBounds) return () => cancelAnimationFrame(rafId);
  }, [
    mode,
    isActive,
    activeValue,
    setBounds,
    clearBounds,
    activeClassName,
    setActiveClassName,
    forceUpdateBounds,
    contextForceUpdateBounds
  ]);
  if (!React.isValidElement(children)) return children;
  const dataAttributes = {
    "data-active": isActive ? "true" : "false",
    "aria-selected": isActive,
    "data-disabled": isDisabled,
    "data-value": childValue,
    "data-highlight": true
  };
  const commonHandlers = hover ? {
    onMouseEnter: (e) => {
      var _a2, _b2;
      setActiveValue(childValue);
      (_b2 = (_a2 = element.props).onMouseEnter) == null ? void 0 : _b2.call(_a2, e);
    },
    onMouseLeave: (e) => {
      var _a2, _b2;
      setActiveValue(null);
      (_b2 = (_a2 = element.props).onMouseLeave) == null ? void 0 : _b2.call(_a2, e);
    }
  } : {
    onClick: (e) => {
      var _a2, _b2;
      setActiveValue(childValue);
      (_b2 = (_a2 = element.props).onClick) == null ? void 0 : _b2.call(_a2, e);
    }
  };
  if (asChild) {
    if (mode === "children") {
      return React.cloneElement(
        element,
        {
          key: childValue,
          ref: localRef,
          className: cn("relative", element.props.className),
          ...getNonOverridingDataAttributes(element, {
            ...dataAttributes,
            "data-slot": "motion-highlight-item-container"
          }),
          ...commonHandlers,
          ...props
        },
        /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isActive && !isDisabled && /* @__PURE__ */ jsx(
            motion.div,
            {
              layoutId: `transition-background-${contextId}`,
              "data-slot": "motion-highlight",
              className: cn(
                "absolute inset-0 bg-muted z-0",
                contextClassName,
                activeClassName
              ),
              transition: itemTransition,
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: {
                opacity: 0,
                transition: {
                  ...itemTransition,
                  delay: ((itemTransition == null ? void 0 : itemTransition.delay) ?? 0) + (exitDelay ?? contextExitDelay ?? 0)
                }
              },
              ...dataAttributes
            }
          ) }),
          /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "motion-highlight-item",
              className: cn("relative z-[1]", className),
              ...dataAttributes,
              children
            }
          )
        ] })
      );
    }
    return React.cloneElement(element, {
      ref: localRef,
      ...getNonOverridingDataAttributes(element, {
        ...dataAttributes,
        "data-slot": "motion-highlight-item"
      }),
      ...commonHandlers
    });
  }
  return enabled ? /* @__PURE__ */ jsxs(
    "div",
    {
      ref: localRef,
      "data-slot": "motion-highlight-item-container",
      className: cn(mode === "children" && "relative", className),
      ...dataAttributes,
      ...props,
      ...commonHandlers,
      children: [
        mode === "children" && /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: isActive && !isDisabled && /* @__PURE__ */ jsx(
          motion.div,
          {
            layoutId: `transition-background-${contextId}`,
            "data-slot": "motion-highlight",
            className: cn(
              "absolute inset-0 bg-muted z-0",
              contextClassName,
              activeClassName
            ),
            transition: itemTransition,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: {
              opacity: 0,
              transition: {
                ...itemTransition,
                delay: ((itemTransition == null ? void 0 : itemTransition.delay) ?? 0) + (exitDelay ?? contextExitDelay ?? 0)
              }
            },
            ...dataAttributes
          }
        ) }),
        React.cloneElement(element, {
          className: cn("relative z-[1]", element.props.className),
          ...getNonOverridingDataAttributes(element, {
            ...dataAttributes,
            "data-slot": "motion-highlight-item"
          })
        })
      ]
    },
    childValue
  ) : children;
}
const DialogContext = React.createContext(void 0);
const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a Dialog");
  }
  return context;
};
function Dialog({ children, ...props }) {
  const [isOpen, setIsOpen] = React.useState((props == null ? void 0 : props.open) ?? (props == null ? void 0 : props.defaultOpen) ?? false);
  React.useEffect(() => {
    if ((props == null ? void 0 : props.open) !== void 0) setIsOpen(props.open);
  }, [props == null ? void 0 : props.open]);
  const handleOpenChange = React.useCallback(
    (open) => {
      var _a;
      setIsOpen(open);
      (_a = props.onOpenChange) == null ? void 0 : _a.call(props, open);
    },
    [props]
  );
  return /* @__PURE__ */ jsx(DialogContext.Provider, { value: { isOpen }, children: /* @__PURE__ */ jsx(Dialog$1.Root, { "data-slot": "dialog", ...props, onOpenChange: handleOpenChange, children }) });
}
function DialogTrigger(props) {
  return /* @__PURE__ */ jsx(Dialog$1.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal(props) {
  return /* @__PURE__ */ jsx(Dialog$1.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose$1(props) {
  return /* @__PURE__ */ jsx(Dialog$1.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  showX = true,
  className,
  children,
  from = "top",
  transition = { type: "spring", stiffness: 250, damping: 25 },
  overlayClassName,
  ...props
}) {
  const { isOpen } = useDialog();
  const initialRotation = from === "top" || from === "left" ? "20deg" : "-20deg";
  const isVertical = from === "top" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(DialogPortal, { forceMount: true, "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, { className: overlayClassName, asChild: true, forceMount: true, children: /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, filter: "blur(4px)" },
        animate: { opacity: 1, filter: "blur(0px)" },
        exit: { opacity: 0, filter: "blur(4px)" },
        transition: { duration: 0.2, ease: "easeInOut" }
      },
      "dialog-overlay"
    ) }),
    /* @__PURE__ */ jsx(
      Dialog$1.Content,
      {
        onOpenAutoFocus: (e) => e.preventDefault(),
        asChild: true,
        forceMount: true,
        ...props,
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            "data-slot": "dialog-content",
            initial: {
              opacity: 0,
              filter: "blur(4px)",
              transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
            },
            animate: {
              opacity: 1,
              filter: "blur(0px)",
              transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`
            },
            exit: {
              opacity: 0,
              filter: "blur(4px)",
              transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`
            },
            transition,
            className: cn(
              "bg-background fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border p-4 shadow-lg",
              className
            ),
            ...props,
            children: [
              children,
              showX ? /* @__PURE__ */ jsxs(Dialog$1.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none", children: [
                /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ] }) : null
            ]
          },
          "dialog-content"
        )
      }
    )
  ] }) });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold tracking-tight", className),
      ...props
    }
  );
}
function DialogDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const settingMiddleware = createMiddleware().middleware([authMiddleware]).server(async ({
  next,
  context: {
    user
  }
}) => {
  const supabase = getSupabaseServerClient();
  const {
    data: setting
  } = await supabase.from("setting").select().eq("userId", user.id).single();
  return next({
    context: {
      setting
    }
  });
});
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
const addLog_createServerFn_handler = createServerRpc("src_lib_server_fn_logs_ts--addLog_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return addLog.__executeServer(opts, signal);
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
const getLogs_createServerFn_handler = createServerRpc("src_lib_server_fn_logs_ts--getLogs_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getLogs.__executeServer(opts, signal);
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
const getMoneys_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--getMoneys_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getMoneys.__executeServer(opts, signal);
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
const getMoney_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--getMoney_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getMoney.__executeServer(opts, signal);
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
const getMoneyIds_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--getMoneyIds_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return getMoneyIds.__executeServer(opts, signal);
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
const addMoney_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--addMoney_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return addMoney.__executeServer(opts, signal);
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
const editMoney_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--editMoney_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return editMoney.__executeServer(opts, signal);
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
      reason: reason ?? void 0
    }
  });
});
const deleteMoney_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--deleteMoney_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return deleteMoney.__executeServer(opts, signal);
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
const transferMoneys_createServerFn_handler = createServerRpc("src_lib_server_fn_money_ts--transferMoneys_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return transferMoneys.__executeServer(opts, signal);
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
  const fees = _.sum(receivers.map((r) => r.fee ?? 0));
  const cashIns = _.sum(receivers.map((r) => r.cashIn ?? 0));
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
      reason: sender.reason ?? void 0,
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
      amount: receiver.amount + (receiver.cashIn ?? 0),
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", receiver.id).eq("userId", user.id);
    if (error2) throw new Error(error2.message);
    await addLog({
      data: {
        changes: {
          current: {
            ...receiver,
            amount: receiver.amount + (receiver.cashIn ?? 0),
            totalMoney: totalMoney - fees
          },
          prev: {
            ...receiver,
            totalMoney
          }
        },
        moneyId: receiver.id,
        type: "transfer",
        reason: receiver.reason ?? void 0,
        transferDetails: {
          receivers,
          sender
        }
      }
    });
  }
});
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot$1 : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
function FormItem({ className, ...props }) {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props
    }
  ) });
}
function FormLabel({
  className,
  ...props
}) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      "data-slot": "form-label",
      "data-error": !!error,
      className: cn("data-[error=true]:text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot$1,
    {
      "data-slot": "form-control",
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
}
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String((error == null ? void 0 : error.message) ?? "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "form-message",
      id: formMessageId,
      className: cn("text-destructive text-sm", className),
      ...props,
      children: body
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-full border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const useMoneyState = create()(
  persist(
    (set2) => ({
      asterisk: false,
      setAsterisk: (asterisk) => set2(() => ({ asterisk })),
      total: 0,
      setTotal: (total) => set2(() => ({ total }))
    }),
    {
      name: "money-state",
      storage: createJSONStorage(() => storage)
    }
  )
);
function ActionConfirmDialog({
  children,
  title,
  desc,
  confirm
}) {
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: title }),
        /* @__PURE__ */ jsx(DialogDescription, { children: desc })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { className: "flex w-full flex-row", children: [
        /* @__PURE__ */ jsx(DialogClose$1, { className: "flex-1", children: /* @__PURE__ */ jsx(Button, { className: "w-full", variant: "secondary", children: "Cancel" }) }),
        /* @__PURE__ */ jsx(DialogClose$1, { className: "flex-1", children: /* @__PURE__ */ jsx(Button, { variant: "destructive", className: "w-full", onClick: () => confirm(), children: "Confirm" }) })
      ] })
    ] })
  ] });
}
function Amount({
  className,
  amount,
  settings,
  color
}) {
  const moneyState = useMoneyState();
  const stringedAmount = amount.toString();
  const asteriskedAmount = "*".repeat(stringedAmount.length);
  const withSign = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: (settings == null ? void 0 : settings.decimals) ?? 2
  });
  const withoutSign = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: (settings == null ? void 0 : settings.decimals) ?? 2
  });
  return /* @__PURE__ */ jsx("span", { style: { color: color ?? "" }, className: cn("text-2xl font-black", className), children: moneyState.asterisk ? asteriskedAmount : (settings == null ? void 0 : settings.sign) ? withSign.format(amount) : withoutSign.format(amount) });
}
function ColorPickerDialog({
  setColor,
  color
}) {
  return /* @__PURE__ */ jsx(
    Github,
    {
      style: {
        boxShadow: "rgb(0 0 0 / 0%) 0px 0px 0px 0px",
        width: "100%",
        margin: "0",
        display: "flex",
        gap: "0",
        padding: "0",
        backgroundColor: "var(--background)",
        border: "none",
        justifyContent: "center"
      },
      color,
      colors: [
        "#f97316",
        "#f59e0b",
        "#eab308",
        "#84cc16",
        "#22c55e",
        "#10b981",
        "#14b8a6",
        "#06b6d4",
        "#0ea5e9",
        "#3b82f6",
        "#6366f1",
        "#8b5cf6",
        "#a855f7",
        "#d946ef",
        "#ec4899",
        "#f43f5e",
        "#ef4444"
      ],
      onChange: (color2) => {
        setColor(color2.hex);
      },
      showTriangle: false
    }
  );
}
function MoneyInput({
  className,
  type,
  ...props
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsx(Input, { className: "peer ps-6 pe-12", placeholder: "0.00", type, ...props }),
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50", children: "₱" }),
    /* @__PURE__ */ jsx("span", { className: "text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50", children: "PHP" })
  ] });
}
function DialogClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function MoneyForm({
  close,
  initialData,
  deepView
}) {
  const { queryClient, user } = useRouteContext({ from: "__root__" });
  const { total: totalMoney } = useMoneyState();
  const add = useRef(null);
  const deduct = useRef(null);
  const moneyForm = useForm({
    resolver: zodResolver(moneySchema),
    defaultValues: {
      amount: initialData ? initialData.amount : void 0,
      name: initialData ? initialData.name : void 0,
      color: initialData ? initialData.color : void 0,
      reason: void 0
    }
  });
  const handleMoney = useMutation({
    mutationFn: async (money) => {
      if (initialData) {
        if (moneyForm.getValues("amount") === initialData.amount && moneyForm.getValues("color") === initialData.color && moneyForm.getValues("name") === initialData.name)
          throw new Error("No changes made");
        return await editMoney({
          data: {
            current: { ...initialData, ...money },
            prev: initialData,
            totalMoney,
            reason: money.reason
          }
        });
      }
      return await addMoney({ data: { ...money, totalMoney } });
    },
    onSuccess: () => {
      toast.success(initialData ? "Edit Succesful" : "Money Added");
      if (deepView) {
        if (initialData)
          queryClient.invalidateQueries({ queryKey: ["money", initialData.id] });
      } else {
        if (user) queryClient.invalidateQueries({ queryKey: ["moneys", user.id] });
      }
      close();
    },
    onError: (e) => {
      toast.error(e.message);
    }
  });
  const pending = handleMoney.isPending || moneyForm.formState.isSubmitting;
  return /* @__PURE__ */ jsx(Form, { ...moneyForm, children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: moneyForm.handleSubmit((money) => handleMoney.mutate(money)),
      className: "space-y-2",
      children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: moneyForm.control,
            name: "name",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Name" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  style: { color: moneyForm.watch("color") ?? "var(--foreground)" },
                  placeholder: "Name",
                  ...field
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: moneyForm.control,
            name: "amount",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Amount" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  MoneyInput,
                  {
                    style: { color: moneyForm.watch("color") ?? "var(--foreground)" },
                    className: "w-full",
                    type: "number",
                    placeholder: "Amount",
                    ...field
                  }
                ),
                initialData ? /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-2 text-sm", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                      /* @__PURE__ */ jsx(FormLabel, { htmlFor: "add", children: "Add" }),
                      /* @__PURE__ */ jsx(
                        MoneyInput,
                        {
                          id: "add",
                          ref: add,
                          style: {
                            color: moneyForm.watch("color") ?? "var(--foreground)"
                          },
                          className: "w-full",
                          type: "number",
                          placeholder: "Amount",
                          onChange: (e) => {
                            if (deduct.current) deduct.current.value = "";
                            moneyForm.setValue(
                              "amount",
                              Number(e.currentTarget.value) + initialData.amount
                            );
                            moneyForm.trigger("amount");
                          }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
                      /* @__PURE__ */ jsx(FormLabel, { htmlFor: "deduct", children: "Deduct" }),
                      /* @__PURE__ */ jsx(
                        MoneyInput,
                        {
                          id: "deduct",
                          ref: deduct,
                          style: {
                            color: moneyForm.watch("color") ?? "var(--foreground)"
                          },
                          className: "w-full",
                          type: "number",
                          placeholder: "Amount",
                          onChange: (e) => {
                            if (add.current) add.current.value = "";
                            moneyForm.setValue(
                              "amount",
                              initialData.amount - Number(e.currentTarget.value)
                            );
                          }
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Difference:" }),
                  /* @__PURE__ */ jsx(
                    Amount,
                    {
                      className: `ml-1 text-sm font-normal ${field.value - initialData.amount === 0 ? "" : field.value - initialData.amount > 0 ? "text-green-500" : "text-destructive"}`,
                      amount: field.value - initialData.amount,
                      settings: { sign: true }
                    }
                  )
                ] }) : null
              ] }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: moneyForm.control,
            name: "color",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Color" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsx(ColorPickerDialog, { color: field.value ?? "", setColor: field.onChange }),
                /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      style: { color: field.value ?? "var(--foreground)" },
                      className: "flex-1",
                      placeholder: "Color",
                      ...field,
                      value: field.value ?? ""
                    }
                  ),
                  !initialData && field.value ? /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "icon",
                      className: "text-muted-foreground",
                      onClick: () => moneyForm.setValue("color", ""),
                      children: /* @__PURE__ */ jsx(RotateCw, {})
                    }
                  ) : null
                ] })
              ] }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: moneyForm.control,
            name: "reason",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                Textarea,
                {
                  hidden: !initialData,
                  placeholder: "Reason (Optional)",
                  ...field,
                  value: field.value ?? ""
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-2", children: [
          initialData ? /* @__PURE__ */ jsx(
            ActionConfirmDialog,
            {
              confirm: moneyForm.handleSubmit((money) => handleMoney.mutate(money)),
              desc: "Are you sure to make these changes?",
              title: "Edit",
              children: /* @__PURE__ */ jsx(Button, { disabled: pending, type: "button", className: "flex-1", children: pending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Update" })
            }
          ) : /* @__PURE__ */ jsx(Button, { disabled: pending, type: "submit", className: "flex-1", children: pending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Add" }),
          /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              className: "text-destructive hover:text-destructive-foreground",
              disabled: pending,
              type: "button",
              children: "Cancel"
            }
          ) })
        ] })
      ]
    }
  ) });
}
function MoneyFormDialog({
  title,
  desc,
  children,
  initialData,
  deepView
}) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: title }),
        /* @__PURE__ */ jsx(DialogDescription, { children: desc })
      ] }),
      /* @__PURE__ */ jsx(
        MoneyForm,
        {
          initialData,
          close: () => {
            setOpen(false);
          },
          deepView
        }
      )
    ] })
  ] });
}
function FloatingNav() {
  const floatingNavState = useFloatingNavState();
  const route = useRouterState();
  const transferState = useTransferState();
  if (!transferState.sender)
    return /* @__PURE__ */ jsx("nav", { className: "bg-muted/25 fixed bottom-4 left-1/2 z-50 flex max-h-11 w-fit max-w-4xl -translate-x-1/2 items-center justify-center gap-1 rounded-full border p-1 drop-shadow-xl backdrop-blur-3xl", children: /* @__PURE__ */ jsxs(
      MotionHighlight,
      {
        defaultValue: route.location.pathname,
        className: "bg-foreground/10 rounded-full",
        children: [
          /* @__PURE__ */ jsxs("div", { "data-value": "/list", children: [
            /* @__PURE__ */ jsx(
              MoneyFormDialog,
              {
                deepView: false,
                desc: "It's always nice to have new money.",
                title: "Add Money",
                children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    hidden: !floatingNavState.showAddMoneyBtn,
                    type: "button",
                    size: "icon",
                    className: "-ml-2 size-12",
                    children: /* @__PURE__ */ jsx(Plus, { className: "size-5" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                asChild: true,
                hidden: floatingNavState.showAddMoneyBtn,
                type: "button",
                size: "icon",
                variant: "ghost",
                className: "hover:bg-transparent",
                children: /* @__PURE__ */ jsx(Link, { to: "/list", children: /* @__PURE__ */ jsx(List, { className: "size-5" }) })
              }
            )
          ] }, "/list"),
          /* @__PURE__ */ jsx("div", { "data-value": "/logs", children: /* @__PURE__ */ jsx(
            Button,
            {
              className: "hover:bg-transparent",
              asChild: true,
              type: "button",
              size: "icon",
              variant: "ghost",
              children: /* @__PURE__ */ jsx(Link, { to: "/logs", search: { flow: "desc" }, children: /* @__PURE__ */ jsx(FileClock, { className: "size-5" }) })
            }
          ) }, "/logs"),
          /* @__PURE__ */ jsx("div", { "data-value": "/analytics", children: /* @__PURE__ */ jsx(
            Button,
            {
              className: "hover:bg-transparent",
              asChild: true,
              type: "button",
              size: "icon",
              variant: "ghost",
              children: /* @__PURE__ */ jsx(Link, { to: "/analytics", children: /* @__PURE__ */ jsx(Activity, { className: "size-5" }) })
            }
          ) }, "/analytics"),
          /* @__PURE__ */ jsx("div", { "data-value": "/settings", children: /* @__PURE__ */ jsx(
            Button,
            {
              className: "hover:bg-transparent",
              asChild: true,
              size: "icon",
              variant: "ghost",
              children: /* @__PURE__ */ jsx(Link, { to: "/settings", children: /* @__PURE__ */ jsx(Settings, { className: "size-5" }) })
            }
          ) }, "/settings")
        ]
      }
    ) });
}
const Route$b = createFileRoute("/(user)")({
  component: RouteComponent$8,
  beforeLoad: async ({ context }) => {
    const REDIRECT_URL = "/login";
    if (!context.user) {
      throw redirect({
        to: REDIRECT_URL
      });
    }
    return {
      redirectUrl: REDIRECT_URL
    };
  }
});
function RouteComponent$8() {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(FloatingNav, {})
  ] });
}
const Route$a = createFileRoute("/(auth)")({
  component: RouteComponent$7,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/list"
      });
    }
  }
});
function RouteComponent$7() {
  return /* @__PURE__ */ jsx("div", { className: "bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm space-y-4", children: [
    /* @__PURE__ */ jsxs("a", { href: "#", className: "flex flex-col items-center gap-2 font-medium", children: [
      /* @__PURE__ */ jsx("img", { src: "favicon.ico", className: "size-24 rounded-full" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "pennylist." })
    ] }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] }) });
}
const Route$9 = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  }
});
function Home() {
  const { user } = Route$9.useLoaderData();
  const features = [
    {
      title: "Like A Social Media",
      desc: "List your moneys like posting on your social medias."
    },
    {
      title: "Customizable",
      desc: "Make them moneys colorful and inspiring."
    },
    {
      title: "Analytics",
      desc: "Dive into your progress with insightful charts and tables."
    },
    {
      title: "Safe",
      desc: "Your data is encrypted and guaranteed safe with us."
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "flex w-full flex-col gap-16 p-4 pt-[8dvh]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex w-full max-w-4xl flex-col items-center gap-4 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold sm:text-6xl", children: "Avoid becoming penniless, start using pennylist." }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Designed to be your private financial manager." }),
    user ? /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", asChild: true, className: "mb-2 w-fit", children: /* @__PURE__ */ jsx(Link, { to: "/list", children: "Go to List" }) }),
      /* @__PURE__ */ jsx(Button, { asChild: true, type: "button", className: "w-fit", variant: "destructive", children: /* @__PURE__ */ jsx(Link, { to: "/logout", children: "Sign out" }) })
    ] }) : /* @__PURE__ */ jsx(Button, { type: "button", asChild: true, className: "w-fit", children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Log in" }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 space-y-4 text-left", children: features.map((f, i) => /* @__PURE__ */ jsxs("div", { className: "w-full max-w-lg rounded-3xl border p-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xl font-bold", children: f.title }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: f.desc })
    ] }, `${i}-f.title`)) })
  ] }) });
}
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
const Route$8 = createFileRoute("/(auth)/signup")({
  component: SignupForm
});
function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");
    if (!email || !password || !confirmPassword) return;
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    const data = await signupFn({
      data: {
        email,
        password
      }
    });
    if (!data) {
      router.invalidate();
      window.location.reload();
      return;
    }
    setIsLoading(false);
    setErrorMessage(data.message);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-center text-xl font-bold", children: "Sign up for pennylist." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email", placeholder: "hello@example.com", readOnly: isLoading, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(Input, { id: "password", name: "password", type: "password", placeholder: "Password", readOnly: isLoading, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "confirm_password", children: "Confirm Password" }),
          /* @__PURE__ */ jsx(Input, { id: "confirm_password", name: "confirm_password", type: "password", placeholder: "Confirm Password", readOnly: isLoading, required: true })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-2 w-full", disabled: isLoading, children: [
          isLoading && /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
          isLoading ? "Signing up..." : "Sign up"
        ] })
      ] }),
      errorMessage && /* @__PURE__ */ jsx("span", { className: "text-destructive text-center text-sm", children: errorMessage })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "text-center text-sm", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/login", className: "underline underline-offset-4", children: "Login" })
    ] })
  ] });
}
const Route$7 = createFileRoute("/(auth)/login")({
  component: LoginForm
});
const loginFn_createServerFn_handler = createServerRpc("src_routes_auth_login_tsx--loginFn_createServerFn_handler", "/_serverFn", (opts, signal) => {
  return loginFn.__executeServer(opts, signal);
});
const loginFn = createServerFn({
  method: "POST"
}).validator((d) => d).handler(loginFn_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServerClient();
  const {
    error
  } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password
  });
  if (error) {
    return {
      error: true,
      message: error.message
    };
  }
});
function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) return;
    setIsLoading(true);
    setErrorMessage("");
    const data = await loginFn({
      data: {
        email,
        password
      }
    });
    if (!data) {
      router.invalidate();
      window.location.reload();
      return;
    }
    setIsLoading(false);
    setErrorMessage(data.message);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-center text-xl font-bold", children: "Welcome to pennylist." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(Input, { id: "email", name: "email", type: "email", placeholder: "hello@example.com", readOnly: isLoading, required: true })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(Input, { id: "password", name: "password", type: "password", placeholder: "Enter password here", readOnly: isLoading, required: true })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-2 w-full", disabled: isLoading, children: [
          isLoading && /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }),
          isLoading ? "Logging in..." : "Login"
        ] })
      ] }),
      errorMessage && /* @__PURE__ */ jsx("span", { className: "text-destructive text-center text-sm", children: errorMessage })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "text-center text-sm", children: [
      "Don't have an account?",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/signup", className: "underline underline-offset-4", children: "Sign up" })
    ] })
  ] });
}
function MoneyTransferCard({
  receiver,
  sender,
  action,
  totalFees,
  totalCashins,
  invalid
}) {
  const { setReceiverData } = useTransferState();
  if (sender) {
    return /* @__PURE__ */ jsxs("div", { style: { color: sender.color ?? "var(--foreground)" }, className: "space-y-1", children: [
      invalid ? /* @__PURE__ */ jsx("p", { className: "text-destructive", children: "Sender cannot be below zero." }) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Sender" }),
      /* @__PURE__ */ jsx("p", { className: "truncate font-bold", children: sender.name }),
      /* @__PURE__ */ jsx(
        Amount,
        {
          className: `truncate font-bold ${invalid && "text-destructive"}`,
          amount: sender.amount - totalFees - totalCashins,
          settings: { sign: true }
        }
      )
    ] });
  }
  if (receiver) {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: { color: receiver.color ?? "var(--foreground)" },
        className: "w-full text-left not-first:border-t not-first:pt-4",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-row items-start justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid", children: [
              /* @__PURE__ */ jsx("p", { className: "truncate font-bold", children: receiver.name }),
              /* @__PURE__ */ jsx(
                Amount,
                {
                  className: "truncate text-base font-bold",
                  amount: receiver.amount + (receiver.cashIn ?? 0),
                  settings: { sign: true }
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "icon",
                onClick: action,
                className: "text-destructive hover:text-destructive",
                variant: "ghost",
                children: /* @__PURE__ */ jsx(X, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 grid grid-cols-[minmax(128px,1fr)_16px_minmax(64px,_128px)] gap-2", children: [
            /* @__PURE__ */ jsx(
              MoneyInput,
              {
                "aria-invalid": invalid,
                value: receiver.cashIn,
                onChange: (e) => {
                  setReceiverData({
                    ...receiver,
                    cashIn: Number(e.currentTarget.value)
                  });
                },
                className: "w-full",
                placeholder: "Incoming transfer amount"
              }
            ),
            /* @__PURE__ */ jsx(Plus, { className: "m-auto size-4" }),
            /* @__PURE__ */ jsx(
              MoneyInput,
              {
                "aria-invalid": invalid,
                value: receiver.fee,
                onChange: (e) => {
                  setReceiverData({
                    ...receiver,
                    fee: Number(e.currentTarget.value)
                  });
                },
                className: "w-full",
                placeholder: "Fee"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              value: receiver.reason ?? "",
              onChange: (e) => {
                setReceiverData({ ...receiver, reason: e.currentTarget.value });
              },
              placeholder: "reason (optional)",
              className: "mt-2"
            }
          )
        ]
      }
    );
  }
}
function TotalMoneyBar() {
  const { queryClient, user } = useRouteContext({ from: "__root__" });
  const { total } = useMoneyState();
  const { sender, receivers, selectForTransfer, reset, cancel } = useTransferState();
  const fees = _.sum(receivers == null ? void 0 : receivers.map((r) => r.fee ?? 0));
  const cashIns = _.sum(receivers == null ? void 0 : receivers.map((r) => r.cashIn ?? 0));
  const invalid = ((sender == null ? void 0 : sender.amount) ?? 0) - fees - cashIns < 0;
  const handleTransfer = useMutation({
    mutationKey: ["transfer-moneys", (user == null ? void 0 : user.id) ?? "no-user"],
    mutationFn: async () => {
      if (!sender) {
        throw new Error("No sender");
      }
      if (!receivers) {
        throw new Error("No receivers");
      }
      if (!receivers.some((r) => r.cashIn > 0)) {
        throw new Error("No receivers with cashIn amount greater than 0");
      }
      return transferMoneys({
        data: {
          receivers,
          sender: {
            ...sender,
            reason: `Transfered funds to: [${receivers.map((r) => `${r.name}: ${r.cashIn}`).join(", ")}]`
          },
          totalMoney: total
        }
      });
    },
    onSuccess: async () => {
      toast.success("Transferred Succesfully");
      await queryClient.invalidateQueries({
        queryKey: ["moneys", (user == null ? void 0 : user.id) ?? "no-user"]
      });
      cancel();
    },
    onError: (e) => {
      toast.error(e.message);
    }
  });
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `bg-background w-full rounded-b-3xl p-4 text-center shadow-xl dark:bg-neutral-900`,
      children: sender ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
        /* @__PURE__ */ jsx(
          MoneyTransferCard,
          {
            invalid,
            totalCashins: cashIns,
            totalFees: fees,
            action: reset,
            sender
          }
        ),
        !(receivers == null ? void 0 : receivers.length) ? null : /* @__PURE__ */ jsxs(Fragment$1, { children: [
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-4 border-t border-dashed pt-4", children: "Receivers" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col gap-4", children: [
            receivers.map((r) => /* @__PURE__ */ jsx(
              MoneyTransferCard,
              {
                invalid,
                totalCashins: cashIns,
                totalFees: fees,
                receiver: r,
                action: () => selectForTransfer(r)
              },
              r.id
            )),
            /* @__PURE__ */ jsx(
              ActionConfirmDialog,
              {
                confirm: handleTransfer.mutate,
                title: "Transferring",
                desc: "Are you sure to transfer funds?",
                children: /* @__PURE__ */ jsxs(
                  Button,
                  {
                    disabled: invalid || handleTransfer.isPending || !receivers.some((r) => r.cashIn > 0),
                    variant: "ghost",
                    children: [
                      handleTransfer.isPending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : /* @__PURE__ */ jsx(Send, {}),
                      "Transfer"
                    ]
                  }
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-2", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              disabled: invalid || handleTransfer.isPending,
              onClick: cancel,
              variant: "destructive",
              className: "flex-1",
              children: [
                /* @__PURE__ */ jsx(X, {}),
                " Cancel"
              ]
            }
          ),
          cashIns || fees ? /* @__PURE__ */ jsx(Button, { onClick: reset, variant: "ghost", size: "icon", children: /* @__PURE__ */ jsx(RotateCw, {}) }) : null
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Total Money" }),
        /* @__PURE__ */ jsx(
          Amount,
          {
            className: "mx-auto truncate text-4xl font-bold",
            amount: total,
            settings: { sign: true }
          }
        )
      ] })
    }
  );
}
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ScrollAreaPrimitive.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          ScrollAreaPrimitive.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsx(ScrollBar, {}),
        /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollAreaPrimitive.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
function Scrollable({
  children,
  hideTotalMoney = false,
  className
}) {
  return /* @__PURE__ */ jsx("div", { className: cn("w-full flex-1 overflow-x-hidden overflow-y-auto", className), children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-full w-full", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-4xl flex-col gap-4 pb-40", children: [
    !hideTotalMoney ? /* @__PURE__ */ jsx(TotalMoneyBar, {}) : null,
    children
  ] }) }) });
}
const Route$6 = createFileRoute("/(user)/list")({
  component: RouteComponent$6
});
function RouteComponent$6() {
  return /* @__PURE__ */ jsx(Scrollable, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const DropdownMenuContext = React.createContext(
  void 0
);
const useDropdownMenu = () => {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("useDropdownMenu must be used within a DropdownMenu");
  }
  return context;
};
function DropdownMenu({
  children,
  transition = { type: "spring", stiffness: 350, damping: 35 },
  animateOnHover = true,
  ...props
}) {
  const [isOpen, setIsOpen] = React.useState((props == null ? void 0 : props.open) ?? (props == null ? void 0 : props.defaultOpen) ?? false);
  React.useEffect(() => {
    if ((props == null ? void 0 : props.open) !== void 0) setIsOpen(props.open);
  }, [props == null ? void 0 : props.open]);
  const handleOpenChange = React.useCallback(
    (open) => {
      var _a;
      setIsOpen(open);
      (_a = props.onOpenChange) == null ? void 0 : _a.call(props, open);
    },
    [props]
  );
  return /* @__PURE__ */ jsx(
    DropdownMenuContext.Provider,
    {
      value: { isOpen, highlightTransition: transition, animateOnHover },
      children: /* @__PURE__ */ jsx(
        DropdownMenu$1.Root,
        {
          "data-slot": "dropdown-menu",
          ...props,
          onOpenChange: handleOpenChange,
          children
        }
      )
    }
  );
}
function DropdownMenuTrigger(props) {
  return /* @__PURE__ */ jsx(DropdownMenu$1.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
}
function DropdownMenuGroup(props) {
  return /* @__PURE__ */ jsx(DropdownMenu$1.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuRadioGroup(props) {
  return /* @__PURE__ */ jsx(DropdownMenu$1.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...props });
}
function DropdownMenuContent({
  className,
  children,
  sideOffset = 4,
  transition = { duration: 0.2 },
  ...props
}) {
  const { isOpen, highlightTransition, animateOnHover } = useDropdownMenu();
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(DropdownMenu$1.Portal, { forceMount: true, "data-slot": "dropdown-menu-portal", children: /* @__PURE__ */ jsx(DropdownMenu$1.Content, { sideOffset, asChild: true, ...props, children: /* @__PURE__ */ jsx(
    motion.div,
    {
      "data-slot": "dropdown-menu-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-x-hidden overflow-y-auto rounded-2xl border p-1 shadow-md",
        className
      ),
      initial: {
        opacity: 0,
        scale: 0.95
      },
      animate: {
        opacity: 1,
        scale: 1
      },
      exit: {
        opacity: 0,
        scale: 0.95
      },
      transition,
      style: { willChange: "opacity, transform" },
      ...props,
      children: /* @__PURE__ */ jsx(
        MotionHighlight,
        {
          hover: true,
          className: "rounded-3xl",
          controlledItems: true,
          transition: highlightTransition,
          enabled: animateOnHover,
          children
        }
      )
    },
    "dropdown-menu-content"
  ) }) }) });
}
function DropdownMenuItem({
  className,
  children,
  inset,
  disabled,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    MotionHighlightItem,
    {
      activeClassName: variant === "default" ? "bg-accent" : "bg-destructive/10 dark:bg-destructive/20",
      disabled,
      children: /* @__PURE__ */ jsx(DropdownMenu$1.Item, { ...props, disabled, asChild: true, children: /* @__PURE__ */ jsx(
        motion.div,
        {
          "data-slot": "dropdown-menu-item",
          "data-inset": inset,
          "data-variant": variant,
          "data-disabled": disabled,
          whileTap: { scale: 0.95 },
          className: cn(
            "[&:not([data-highlight])]:focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive [&:not([data-highlight])]:data-[variant=destructive]:focus:bg-destructive/10 dark:[&:not([data-highlight])]:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:text-accent-foreground relative z-[1] flex cursor-default items-center gap-2 rounded-3xl px-2 py-1.5 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            inset && "pl-8",
            className
          ),
          children
        }
      ) })
    }
  );
}
function DropdownMenuRadioItem({
  className,
  children,
  disabled,
  ...props
}) {
  return /* @__PURE__ */ jsx(MotionHighlightItem, { disabled, children: /* @__PURE__ */ jsx(DropdownMenu$1.RadioItem, { ...props, disabled, asChild: true, children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-disabled": disabled,
      whileTap: { scale: 0.95 },
      className: cn(
        "[&:not([data-highlight])]:focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-3xl py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenu$1.ItemIndicator, { "data-slot": "dropdown-menu-radio-item-indicator", children: /* @__PURE__ */ jsx(Circle, { className: "size-2 fill-current" }) }) }),
        children
      ]
    }
  ) }) });
}
function DropdownMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    DropdownMenu$1.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function PageStatusSetter({
  state
}) {
  const [mounted, setMounted] = useState(false);
  const floatingNavState = useFloatingNavState();
  useEffect(() => {
    if (mounted) floatingNavState.setState(state);
  }, [mounted]);
  useEffect(() => {
    setMounted(true);
  }, []);
  return null;
}
function Slot(props) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "border-input bg-background text-foreground relative -ms-px flex size-9 items-center justify-center border font-medium shadow-xs transition-[color,box-shadow] first:ms-0 first:rounded-s-3xl last:rounded-e-3xl",
        { "border-ring ring-ring/50 z-10 ring-[3px]": props.isActive }
      ),
      children: props.char !== null && /* @__PURE__ */ jsx("div", { children: props.char })
    }
  );
}
function TimeInfo({ createdAt }) {
  const minsDiff = differenceInMinutes(createdAt, /* @__PURE__ */ new Date());
  const hrsDiff = differenceInHours(createdAt, /* @__PURE__ */ new Date());
  const getDiff = () => {
    if (Math.abs(minsDiff) < 60) {
      return `${Math.abs(minsDiff)}m`;
    }
    if (Math.abs(hrsDiff) < 24) {
      return `${Math.abs(hrsDiff)}h`;
    }
    return new Date(createdAt).toLocaleDateString();
  };
  return /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: getDiff() });
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SwitchPrimitive.Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        SwitchPrimitive.Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const Route$5 = createFileRoute("/(user)/settings/")({
  component: RouteComponent$5
});
function RouteComponent$5() {
  return /* @__PURE__ */ jsxs(Scrollable, { hideTotalMoney: true, children: [
    /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground flex items-center gap-2 border-b p-4", children: [
      /* @__PURE__ */ jsx(Settings, {}),
      /* @__PURE__ */ jsx("p", { children: "Settings" })
    ] }),
    /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: /* @__PURE__ */ jsxs("div", { className: "w-full space-y-4 px-4", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-21 w-full rounded-3xl" }),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-17 w-full rounded-3xl" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-17 w-full rounded-3xl" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-17 w-full rounded-3xl" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-17 w-full rounded-3xl" }),
          /* @__PURE__ */ jsx(Separator, {}),
          /* @__PURE__ */ jsx(Skeleton, { className: "bg-destructive h-9 w-full rounded-full" })
        ] }),
        children: /* @__PURE__ */ jsx(SettingsComponent, {})
      }
    )
  ] });
}
function SettingsComponent() {
  var _a;
  const { user, queryClient } = useRouteContext({ from: "__root__" });
  const navigate = useNavigate();
  const settings = useSuspenseQuery(userSettingsQueryOptions());
  const [theme, setTheme] = useState(
    localStorage.theme
  );
  const [openPINDialog, setOpenPINDialog] = useState(false);
  const { asterisk, setAsterisk } = useMoneyState();
  const handleUpdateUserSettings = useMutation({
    mutationFn: (data) => {
      return updateUserSettings({
        data
      });
    },
    onSuccess: () => {
      toast.success("Settings Updated");
      setOpenPINDialog(false);
      settings.refetch();
      queryClient.invalidateQueries({ queryKey: ["moneys", user == null ? void 0 : user.id] });
    },
    onError: (e) => {
      toast.error(e.message);
    }
  });
  function toggleTheme() {
    if (document.documentElement.classList.contains("dark") || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setTheme("light");
      handleUpdateUserSettings.mutate({ ...settings.data, theme: "light" });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setTheme("dark");
      handleUpdateUserSettings.mutate({ ...settings.data, theme: "dark" });
    }
  }
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[24px_1fr] gap-4 px-4", children: [
      /* @__PURE__ */ jsx(User2, { className: "size-6" }),
      /* @__PURE__ */ jsx("p", { className: "my-auto truncate font-bold", children: user == null ? void 0 : user.email })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground space-y-1 px-4 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { children: "Joined " }),
        /* @__PURE__ */ jsx(TimeInfo, { createdAt: (user == null ? void 0 : user.createdAt) ?? (/* @__PURE__ */ new Date()).toLocaleString() }),
        " ",
        /* @__PURE__ */ jsx(ClockPlus, { className: "inline size-4" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { children: "Last update " }),
        /* @__PURE__ */ jsx(
          TimeInfo,
          {
            createdAt: settings.data.updated_at ?? (/* @__PURE__ */ new Date()).toLocaleString()
          }
        ),
        " ",
        /* @__PURE__ */ jsx(History, { className: "text-gree inline size-4" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 px-4", children: [
      /* @__PURE__ */ jsx(
        SettingBar,
        {
          label: "List Sorting",
          component: (id) => /* @__PURE__ */ jsx(
            ListSorterDropdown,
            {
              pending: handleUpdateUserSettings.isPending,
              listState: {
                flow: settings.data ? settings.data.flow : "desc",
                sortBy: settings.data ? settings.data.sortBy : "date",
                setState: (state) => {
                  handleUpdateUserSettings.mutate({ ...settings.data, ...state });
                }
              },
              id
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(Dialog, { onOpenChange: setOpenPINDialog, open: openPINDialog, children: [
        /* @__PURE__ */ jsx(
          SettingBar,
          {
            label: "Ask PIN On Open",
            component: () => /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: settings.data.PIN === null ? "Set PIN" : "Change/Remove PIN" }) })
          }
        ),
        /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: settings.data.PIN !== null ? "Change/Remove PIN" : "Set PIN" }),
            /* @__PURE__ */ jsxs(DialogDescription, { children: [
              "Current PIN: ",
              settings.data.PIN ?? "Not set"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            PinCard,
            {
              setPin: (PIN) => handleUpdateUserSettings.mutate({ PIN }),
              pending: handleUpdateUserSettings.isPending,
              PIN: (_a = settings.data) == null ? void 0 : _a.PIN
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        SettingBar,
        {
          label: "Money Visibility",
          component: (id) => {
            var _a2;
            return /* @__PURE__ */ jsx(
              SwitcherComponent,
              {
                pending: handleUpdateUserSettings.isPending,
                id,
                checked: ((_a2 = settings.data) == null ? void 0 : _a2.asterisk) ?? asterisk,
                onCheckedChange: (asterisk2) => {
                  setAsterisk(asterisk2);
                  handleUpdateUserSettings.mutate({ ...settings.data, asterisk: asterisk2 });
                },
                checkedIcon: /* @__PURE__ */ jsx(Eye, { size: 16, "aria-hidden": "true" }),
                uncheckedIcon: /* @__PURE__ */ jsx(EyeClosed, { size: 16, "aria-hidden": "true" })
              }
            );
          }
        }
      ),
      /* @__PURE__ */ jsx(
        SettingBar,
        {
          label: "Theme Mode",
          component: (id) => /* @__PURE__ */ jsx(
            SwitcherComponent,
            {
              pending: handleUpdateUserSettings.isPending,
              id,
              checked: settings.data ? settings.data.theme === "light" || theme === "light" : theme === "light",
              onCheckedChange: toggleTheme,
              checkedIcon: /* @__PURE__ */ jsx(MoonIcon, { size: 16, "aria-hidden": "true" }),
              uncheckedIcon: /* @__PURE__ */ jsx(SunIcon, { size: 16, "aria-hidden": "true" })
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 px-4", children: [
      /* @__PURE__ */ jsx(
        ActionConfirmDialog,
        {
          confirm: () => {
          },
          desc: "Are you sure to permanentaly delete your account?",
          title: "Account Deletion",
          children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", children: "Delete Account" })
        }
      ),
      /* @__PURE__ */ jsx(
        ActionConfirmDialog,
        {
          confirm: () => navigate({ to: "/logout" }),
          desc: "Are you sure to log out?",
          title: "Logging out",
          children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", children: "Sign out" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      PageStatusSetter,
      {
        state: {
          showAddMoneyBtn: false,
          showSettingsBtn: false,
          showLogsPageBtn: true,
          showAnalyticsPageBtn: true
        }
      }
    )
  ] });
}
function SettingBar({
  label,
  component,
  card
}) {
  const id = useId();
  if (card)
    return /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 flex w-full flex-col items-center justify-between gap-4 rounded-3xl p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: id, children: label }),
        component ? component(id) : null
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full", children: card })
    ] });
  return /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 grid grid-cols-[12fr_1fr] gap-4 rounded-3xl p-4", children: [
    /* @__PURE__ */ jsx(Label, { className: "place-content-stretch truncate", htmlFor: id, children: label }),
    component ? component(id) : null
  ] });
}
function SwitcherComponent({
  checked,
  onCheckedChange,
  checkedIcon,
  uncheckedIcon,
  pending,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...props,
      className: "relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium",
      children: [
        /* @__PURE__ */ jsx(
          Switch,
          {
            disabled: pending,
            checked,
            onCheckedChange,
            className: "peer data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto cursor-pointer [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full", children: checkedIcon }),
        /* @__PURE__ */ jsx("span", { className: "peer-data-[state=checked]:text-background pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full", children: uncheckedIcon })
      ]
    }
  );
}
function ListSorterDropdown({
  listState: { flow, sortBy, setState },
  pending,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { ...props, variant: "secondary", disabled: pending, children: [
      flow === "asc" ? /* @__PURE__ */ jsx(ArrowUp, {}) : /* @__PURE__ */ jsx(ArrowDown, {}),
      sortBy === "amount" ? /* @__PURE__ */ jsx(DollarSign, {}) : null,
      sortBy === "date" ? /* @__PURE__ */ jsx(Calendar, {}) : null,
      /* @__PURE__ */ jsx("span", { className: "capitalize", children: sortBy }),
      /* @__PURE__ */ jsx(ChevronDownIcon, { className: "-me-1 opacity-60", size: 16, "aria-hidden": "true" })
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
      /* @__PURE__ */ jsxs(
        DropdownMenuRadioGroup,
        {
          value: sortBy,
          onValueChange: (v) => setState({ flow, sortBy: v }),
          children: [
            /* @__PURE__ */ jsx(DropdownMenuRadioItem, { value: "date", children: "Date" }),
            /* @__PURE__ */ jsx(DropdownMenuRadioItem, { value: "amount", children: "Amount" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs(
        DropdownMenuRadioGroup,
        {
          value: flow,
          onValueChange: (v) => setState({ flow: v, sortBy }),
          children: [
            /* @__PURE__ */ jsx(DropdownMenuRadioItem, { value: "asc", children: "Ascending" }),
            /* @__PURE__ */ jsx(DropdownMenuRadioItem, { value: "desc", children: "Descending" })
          ]
        }
      )
    ] })
  ] });
}
function PinCard({
  PIN,
  pending,
  setPin
}) {
  return PIN ? /* @__PURE__ */ jsx(ChangePinForm, { PIN, pending, setPin }) : /* @__PURE__ */ jsx(NewPinForm, { PIN, pending, setPin });
}
function ChangePinForm({
  PIN,
  pending,
  setPin
}) {
  const formSchema = z.object({
    currentPIN: z.string().min(4).max(4),
    newPIN: z.string().min(4).max(4)
  }).refine((data) => data.currentPIN === PIN, {
    message: "Did no match with current PIN",
    path: ["currentPIN"]
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPIN: "",
      newPIN: ""
    }
  });
  function onSubmit(values) {
    setPin(values.newPIN);
  }
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => e.preventDefault(),
      className: "flex flex-col items-center justify-center gap-4",
      children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "currentPIN",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "", children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Current PIN" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                OTPInput,
                {
                  ...field,
                  containerClassName: "flex items-center gap-3 has-disabled:opacity-50",
                  maxLength: 4,
                  render: ({ slots }) => /* @__PURE__ */ jsx("div", { className: "flex", children: slots.map((slot, idx) => /* @__PURE__ */ jsx(Slot, { ...slot }, idx)) })
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "newPIN",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "New PIN" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                OTPInput,
                {
                  ...field,
                  containerClassName: "flex items-center gap-3 has-disabled:opacity-50",
                  maxLength: 4,
                  render: ({ slots }) => /* @__PURE__ */ jsx("div", { className: "flex", children: slots.map((slot, idx) => /* @__PURE__ */ jsx(Slot, { ...slot }, idx)) })
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          ActionConfirmDialog,
          {
            title: "Change PIN",
            desc: "Are you sure to change PIN?",
            confirm: form.handleSubmit(onSubmit),
            children: /* @__PURE__ */ jsx(Button, { disabled: pending, type: "submit", className: "w-full", children: pending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Change PIN" })
          }
        ),
        /* @__PURE__ */ jsx(
          ActionConfirmDialog,
          {
            title: "Remove PIN",
            desc: "Are you sure to remove PIN?",
            confirm: () => setPin(null),
            children: /* @__PURE__ */ jsx(
              Button,
              {
                disabled: pending,
                type: "button",
                className: "w-full",
                variant: "destructive",
                children: pending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Remove PIN"
              }
            )
          }
        )
      ]
    }
  ) });
}
function NewPinForm({
  PIN,
  pending,
  setPin
}) {
  const formSchema = z.object({
    PIN: z.string().min(4).max(4)
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PIN: PIN ?? void 0
    }
  });
  function onSubmit(values) {
    setPin(values.PIN);
  }
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => e.preventDefault(),
      className: "flex flex-col items-center justify-center gap-4",
      children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "PIN",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "PIN" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                OTPInput,
                {
                  ...field,
                  id: "PIN",
                  name: "pin",
                  containerClassName: "flex items-center gap-3 has-disabled:opacity-50",
                  maxLength: 4,
                  render: ({ slots }) => /* @__PURE__ */ jsx("div", { className: "flex", children: slots.map((slot, idx) => /* @__PURE__ */ jsx(Slot, { ...slot }, idx)) })
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          ActionConfirmDialog,
          {
            title: "Set PIN",
            desc: "Are you sure to set PIN?",
            confirm: form.handleSubmit(onSubmit),
            children: /* @__PURE__ */ jsx(Button, { disabled: pending, type: "submit", className: "w-full", children: pending ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : "Set PIN" })
          }
        )
      ]
    }
  ) });
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      ),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function LogCard({
  log
}) {
  var _a, _b, _c;
  const isReceiver = ((_a = log.transferDetails) == null ? void 0 : _a.receivers.some((r) => log.moneyId === r.id)) ?? false;
  const getDiff = (key) => {
    const prev = log.changes.prev[key] ?? 0;
    const curr = log.changes.current[key] ?? 0;
    const isIncrease = prev < curr;
    const hasDifference = prev !== curr;
    const difference = curr - prev;
    const percentChange = hasDifference && prev !== 0 ? Math.abs(Math.round(difference / (prev || 1) * 100)) : 0;
    return { isIncrease, hasDifference, difference, percentChange };
  };
  const {
    isIncrease: moneyIsIncrease,
    hasDifference: moneyHasDifference,
    difference: moneyDifference,
    percentChange: moneyPercentChange
  } = getDiff("amount");
  const {
    isIncrease: totalMoneyIsIncrease,
    hasDifference: totalMoneyHasDifference,
    difference: totalMoneyDifference,
    percentChange: totalMoneyPercentChange
  } = getDiff("totalMoney");
  return /* @__PURE__ */ jsx("div", { className: "w-full pb-4 not-first:pt-4 not-last:border-b", children: /* @__PURE__ */ jsxs("div", { className: "w-full px-4", children: [
    /* @__PURE__ */ jsx("p", { className: "font-bold capitalize", children: log.reason ?? log.type === "transfer" ? !isReceiver ? log.reason : `Transfer from ${(_b = log.transferDetails) == null ? void 0 : _b.sender.name}` : log.type }),
    /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground mt-1 flex items-center gap-1 text-sm", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          className: `${!log.money && "text-destructive"}`,
          disabled: !log.money,
          to: "/list/$id",
          params: { id: log.moneyId },
          children: [
            /* @__PURE__ */ jsx(Banknote, { className: "inline size-4" }),
            /* @__PURE__ */ jsx("span", { className: "ml-1 inline text-sm", children: ((_c = log.money) == null ? void 0 : _c.name) ?? "Deleted" })
          ]
        }
      ),
      "|",
      /* @__PURE__ */ jsx(Clock, { className: "size-4" }),
      /* @__PURE__ */ jsx(TimeInfo, { createdAt: log.created_at })
    ] }),
    !isReceiver && log.transferDetails ? /* @__PURE__ */ jsxs("div", { className: "bg-muted/50 mt-4 rounded-3xl p-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Receivers" }),
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Money" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Cash In" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Fee" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: log.transferDetails.receivers.map((r) => /* @__PURE__ */ jsxs(
          TableRow,
          {
            style: { color: r.color ?? "var(--foreground)" },
            children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: /* @__PURE__ */ jsx(Link, { to: "/list/$id", params: { id: r.id }, children: r.name }) }),
              /* @__PURE__ */ jsxs(TableCell, { children: [
                " ",
                /* @__PURE__ */ jsx(
                  Amount,
                  {
                    className: "text-sm font-light",
                    amount: r.cashIn ?? 0,
                    settings: { sign: true }
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                Amount,
                {
                  className: "text-sm font-light",
                  amount: r.fee ?? 0,
                  settings: { sign: true }
                }
              ) })
            ]
          },
          `receiver-${r.id}`
        )) }),
        /* @__PURE__ */ jsx(TableFooter, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { colSpan: 2, children: "Total Damage" }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Amount,
            {
              className: "text-sm font-medium",
              amount: _.sum(log.transferDetails.receivers.map((r) => r.fee ?? 0)),
              settings: { sign: true }
            }
          ) })
        ] }) })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-rows-[1fr_1fr] gap-4 sm:grid-cols-[1fr_1fr] sm:grid-rows-1", children: [
      /* @__PURE__ */ jsx(Data, { title: "Previous", data: log.changes.prev }),
      /* @__PURE__ */ jsx(
        Data,
        {
          title: "Current",
          data: log.changes.current,
          moneyDiffComponent: moneyHasDifference ? /* @__PURE__ */ jsx(
            Difference,
            {
              difference: moneyDifference,
              isIncrease: moneyIsIncrease,
              percentChange: moneyPercentChange
            }
          ) : null,
          totalMoneyDiffComponent: totalMoneyHasDifference ? /* @__PURE__ */ jsx(
            Difference,
            {
              difference: totalMoneyDifference,
              isIncrease: totalMoneyIsIncrease,
              percentChange: totalMoneyPercentChange
            }
          ) : null
        }
      )
    ] })
  ] }) });
}
function Data({
  data,
  moneyDiffComponent,
  totalMoneyDiffComponent,
  title
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: { color: data.color ?? "var(--foreground)" },
      className: "bg-muted/50 truncate rounded-3xl p-4",
      children: [
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: title }),
        /* @__PURE__ */ jsx("p", { className: "font-bold", children: data.name }),
        /* @__PURE__ */ jsx(
          Amount,
          {
            className: "truncate text-base",
            amount: data.amount,
            settings: { sign: true }
          }
        ),
        moneyDiffComponent ? moneyDiffComponent : null,
        /* @__PURE__ */ jsx(Separator, { className: "my-2" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Overall Money" }),
        /* @__PURE__ */ jsx(
          Amount,
          {
            className: "truncate text-base",
            amount: data.totalMoney ?? 0,
            settings: { sign: true }
          }
        ),
        totalMoneyDiffComponent ? totalMoneyDiffComponent : null
      ]
    }
  );
}
function Difference({
  isIncrease,
  difference,
  percentChange
}) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    " ",
    "(",
    /* @__PURE__ */ jsx("span", { className: `inline ${isIncrease ? "text-green-500" : "text-destructive"} `, children: isIncrease ? "+" : "-" }),
    /* @__PURE__ */ jsx(
      Amount,
      {
        className: `inline ${isIncrease ? "text-green-500" : "text-destructive"} text-base`,
        amount: Math.abs(difference),
        settings: { sign: true }
      }
    ),
    " ",
    isIncrease ? /* @__PURE__ */ jsx(ArrowUpIcon, { className: "inline size-4 align-text-bottom text-green-500" }) : /* @__PURE__ */ jsx(ArrowDownIcon, { className: "text-destructive inline size-4 align-text-bottom" }),
    /* @__PURE__ */ jsxs(
      "span",
      {
        className: `inline font-bold ${isIncrease ? "text-green-500" : "text-destructive"}`,
        children: [
          percentChange,
          "%"
        ]
      }
    ),
    ")"
  ] });
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot$1 : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function useAutoLoadNextPage({
  fetchNextPage
}) {
  const loaderRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1
  });
  useEffect(() => {
    if (entry == null ? void 0 : entry.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);
  useEffect(() => {
    if (loaderRef.current) {
      ref(loaderRef.current);
    }
  }, [ref]);
  return {
    ref,
    loaderRef
  };
}
const logsQueryOptions = ({
  userId,
  flow,
  type,
  q,
  money
}) => infiniteQueryOptions({
  queryKey: ["logs", userId ?? "no-user", flow, type, money, q],
  queryFn: async ({ signal, pageParam }) => await getLogs({ signal, data: { flow, type, money, q, pageParam } }),
  initialPageParam: 0,
  getNextPageParam: (lastPage, allPages, lastPageParam) => {
    if (lastPage.length === 0) {
      return void 0;
    }
    return lastPageParam + 1;
  }
});
const moneysQueryOptions = (userId) => queryOptions({
  // eslint-disable-next-line @tanstack/query/exhaustive-deps
  queryKey: ["moneys", userId ?? "no-user"],
  queryFn: async ({ signal }) => await getMoneys({ signal })
});
const moneyQueryOptions = (id) => queryOptions({
  queryKey: ["money", id],
  queryFn: async ({ signal }) => await getMoney({ data: id, signal })
});
const moneyIdsQueryOptions = (userId) => queryOptions({
  queryKey: ["moneyIds", userId ?? "no-user"],
  queryFn: async ({ signal }) => await getMoneyIds({ signal })
});
const Route$4 = createFileRoute("/(user)/logs/")({
  component: RouteComponent$4,
  validateSearch: (search) => search,
  beforeLoad: async ({ search }) => {
    return { search };
  }
});
function RouteComponent$4() {
  return /* @__PURE__ */ jsxs(Scrollable, { hideTotalMoney: true, children: [
    /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground flex items-center justify-between gap-4 border-b p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(FileClock, {}),
        /* @__PURE__ */ jsx("p", { children: "Logs " })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => location.reload(), type: "button", children: /* @__PURE__ */ jsx(RefreshCw, { className: "size-4" }) })
    ] }),
    /* @__PURE__ */ jsx(SearchInput, {}),
    /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: /* @__PURE__ */ jsx("div", { className: "w-full space-y-4 px-4", children: Array.from({ length: 3 }).map((_2, i) => /* @__PURE__ */ jsxs("div", { className: "space-y-4 border-b pb-4", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-full rounded-full" }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full rounded-3xl" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full rounded-3xl" })
          ] })
        ] }, `skeleton-${i}`)) }),
        children: /* @__PURE__ */ jsx(Logs$1, {})
      }
    ),
    /* @__PURE__ */ jsx(
      PageStatusSetter,
      {
        state: {
          showAddMoneyBtn: false,
          showSettingsBtn: true,
          showLogsPageBtn: false,
          showAnalyticsPageBtn: true
        }
      }
    )
  ] });
}
function SearchInput() {
  const navigate = Route$4.useNavigate();
  const {
    user,
    queryClient,
    search: { q, flow, type, money }
  } = Route$4.useRouteContext();
  const debouncedSearch = debounce(
    async (searchTerm) => {
      await navigate({ to: "/logs", search: { q: searchTerm, flow, money, type } });
      await queryClient.invalidateQueries({
        queryKey: ["logs", user == null ? void 0 : user.id, flow, type, money, q]
      });
    },
    {
      wait: 500
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex px-4", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        id: "searchLog",
        className: "-me-px rounded-e-none shadow-none focus-visible:z-10",
        placeholder: "Search for 'reason'",
        type: "text",
        onChange: (e) => debouncedSearch(e.currentTarget.value)
      }
    ),
    /* @__PURE__ */ jsxs(Dialog, { children: [
      /* @__PURE__ */ jsxs(DialogTrigger, { className: "text-muted-foreground flex items-center gap-2 rounded-s-none rounded-e-full border border-l-transparent pr-4 pl-3 text-sm", children: [
        /* @__PURE__ */ jsx(Filter, { className: "size-4" }),
        /* @__PURE__ */ jsx("span", { children: "Filter" })
      ] }),
      /* @__PURE__ */ jsxs(DialogContent, { children: [
        /* @__PURE__ */ jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: "Filter Logs" }),
          /* @__PURE__ */ jsx(DialogDescription, { children: "Use the filters to narrow down your log search results. You can filter by type, money, and more." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Moneys:" }),
            /* @__PURE__ */ jsx(
              Suspense,
              {
                fallback: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center text-sm", children: "Getting moneys..." }),
                children: /* @__PURE__ */ jsx(MoneyIds, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: "Type:" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["add", "edit", "delete", "transfer"].map((_type) => /* @__PURE__ */ jsx(
              Badge,
              {
                asChild: true,
                className: "rounded-full text-sm",
                variant: "outline",
                children: /* @__PURE__ */ jsxs(
                  Link,
                  {
                    to: "/logs",
                    search: {
                      type: type === _type ? void 0 : _type,
                      flow,
                      money,
                      q
                    },
                    children: [
                      _type,
                      type === _type ? /* @__PURE__ */ jsx(X, {}) : null
                    ]
                  }
                )
              },
              _type
            )) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function MoneyIds() {
  const { search, user } = Route$4.useRouteContext();
  const moneyIds = useSuspenseQuery(moneyIdsQueryOptions(user == null ? void 0 : user.id));
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: moneyIds.data.map((money) => /* @__PURE__ */ jsx(
    Link,
    {
      to: "/logs",
      search: { ...search, money: money.id === search.money ? void 0 : money.id },
      children: /* @__PURE__ */ jsxs(
        Badge,
        {
          style: {
            color: money.color ?? "var(--foreground)",
            borderColor: money.color === "var(--foreground)" ? "var(--muted)" : money.color || "var(--muted)"
          },
          variant: search.money === money.id ? "secondary" : "outline",
          className: "min-w-16 rounded-3xl text-sm",
          children: [
            money.name,
            money.id === search.money ? /* @__PURE__ */ jsx(X, {}) : null
          ]
        }
      )
    },
    money.id
  )) });
}
function Logs$1() {
  const { search, user } = Route$4.useRouteContext();
  const logs = useSuspenseInfiniteQuery(
    logsQueryOptions({
      userId: user == null ? void 0 : user.id,
      flow: search.flow,
      type: search.type,
      money: search.money,
      q: search.q
    })
  );
  const _logs = logs.data.pages.flatMap((page) => page);
  const { ref, loaderRef } = useAutoLoadNextPage({
    fetchNextPage: () => logs.fetchNextPage()
  });
  return /* @__PURE__ */ jsx("div", { className: "pb-32", children: search.q ? !_logs.length ? /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-center", children: [
    "No results for '",
    search.q,
    "'"
  ] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-center", children: [
      "Results for '",
      search.q,
      "'"
    ] }),
    _logs.map((log, i) => {
      if (i === _logs.length - 1)
        return /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
          /* @__PURE__ */ jsx("div", { ref, className: "flex-1" }),
          /* @__PURE__ */ jsx(LogCard, { log })
        ] }, log.id);
      return /* @__PURE__ */ jsx(LogCard, { log }, log.id);
    }),
    /* @__PURE__ */ jsx(
      Button,
      {
        className: "text-muted-foreground w-full text-center text-sm font-light",
        hidden: !logs.hasNextPage,
        ref: loaderRef,
        variant: "ghost",
        onClick: () => {
          logs.fetchNextPage();
        },
        children: logs.isFetchingNextPage ? "Loading..." : "Fetch more posts"
      }
    )
  ] }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
    _logs.map((log, i) => {
      if (i === _logs.length - 1)
        return /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
          /* @__PURE__ */ jsx("div", { ref, className: "flex-1" }),
          /* @__PURE__ */ jsx(LogCard, { log })
        ] }, log.id);
      return /* @__PURE__ */ jsx(LogCard, { log }, log.id);
    }),
    /* @__PURE__ */ jsx(
      Button,
      {
        className: "text-muted-foreground w-full text-center text-sm font-light",
        hidden: !logs.hasNextPage,
        ref: loaderRef,
        variant: "ghost",
        onClick: () => {
          logs.fetchNextPage();
        },
        children: logs.isFetchingNextPage ? "Loading..." : "Fetch more posts"
      }
    )
  ] }) });
}
function MoneyCard({
  m,
  deepView,
  moneysQty,
  user,
  queryClient,
  totalMoney
}) {
  var _a, _b;
  const transferState = useTransferState();
  const transferRole = ((_a = transferState.sender) == null ? void 0 : _a.id) === m.id ? "sender" : ((_b = transferState.receivers) == null ? void 0 : _b.some((r) => r.id === m.id)) ?? false ? "reicever" : "none";
  const handleDeleteMoney = useMutation({
    mutationFn: async () => await deleteMoney({
      data: {
        amount: m.amount,
        id: m.id,
        name: m.name,
        color: m.color,
        totalMoney
      }
    }),
    onSuccess: () => {
      toast.success("Money Deleted");
      if (deepView) {
        location.reload();
      } else {
        if (user)
          queryClient.invalidateQueries({
            queryKey: ["moneys", user.id]
          });
      }
    },
    onError: (e) => {
      toast.error(e.message);
    }
  });
  if (!user) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      hidden: transferRole !== "none",
      style: {
        color: m.color ?? "var(--foreground)"
      },
      className: `p-4 font-bold ${deepView ? "border-b" : "not-last:border-b"} ${handleDeleteMoney.isPending && "animate-pulse"}`,
      children: [
        /* @__PURE__ */ jsx("p", { className: "truncate", children: m.name }),
        /* @__PURE__ */ jsx(
          Amount,
          {
            className: "text-base font-bold",
            amount: m.amount,
            settings: { sign: true }
          }
        ),
        /* @__PURE__ */ jsxs(ScrollArea, { children: [
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex overflow-auto", children: [
            /* @__PURE__ */ jsx(Link, { hidden: deepView, to: "/list/$id", params: { id: m.id }, children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", children: /* @__PURE__ */ jsx(ExternalLink, { className: "size-4" }) }) }),
            /* @__PURE__ */ jsx(
              MoneyFormDialog,
              {
                deepView,
                initialData: m,
                desc: "I hope this is an increase.",
                title: "Edit Money",
                children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", children: /* @__PURE__ */ jsx(Pencil, { className: "size-4" }) })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => transferState.selectForTransfer(m),
                hidden: moneysQty <= 1,
                disabled: moneysQty <= 0,
                size: "icon",
                variant: "ghost",
                children: transferState.sender ? /* @__PURE__ */ jsx(PlaneLanding, { className: "size-4" }) : /* @__PURE__ */ jsx(Send, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              ActionConfirmDialog,
              {
                confirm: handleDeleteMoney.mutate,
                desc: "Are you sure to delete this money?",
                title: "Delete",
                children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ScrollBar, { orientation: "horizontal" })
        ] })
      ]
    }
  );
}
function MoneySkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "w-full rounded-none border-b p-4", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "mt-2 h-4 w-24" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 flex gap-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "size-6" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "size-6" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "size-6" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "size-6" })
    ] })
  ] });
}
function TotalMoneySetter({
  moneys
}) {
  const { setTotal } = useMoneyState();
  useEffect(() => {
    setTotal(_.sum(moneys.map((m) => m.amount)));
  }, [moneys]);
  return null;
}
const Route$3 = createFileRoute("/(user)/list/")({
  component: RouteComponent$3
});
function RouteComponent$3() {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      PageStatusSetter,
      {
        state: {
          showAddMoneyBtn: true,
          showSettingsBtn: true,
          showLogsPageBtn: true,
          showAnalyticsPageBtn: true
        }
      }
    ),
    /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: Array.from({ length: 4 }).map((_2, i) => /* @__PURE__ */ jsx(MoneySkeleton, {}, `skeleton-${i}`)),
        children: /* @__PURE__ */ jsx(Moneys, {})
      }
    )
  ] });
}
function Moneys() {
  const { user, queryClient } = Route$3.useRouteContext();
  const { total } = useMoneyState();
  const moneys = useSuspenseQuery(moneysQueryOptions(user == null ? void 0 : user.id));
  return /* @__PURE__ */ jsxs("div", { children: [
    moneys.data.map((m) => /* @__PURE__ */ jsx(
      MoneyCard,
      {
        queryClient,
        user,
        moneysQty: moneys.data.length,
        deepView: false,
        m,
        totalMoney: total
      },
      m.id
    )),
    /* @__PURE__ */ jsx(TotalMoneySetter, { moneys: moneys.data })
  ] });
}
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 py-6",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-4", className),
      ...props
    }
  );
}
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(RechartsPrimitive.ResponsiveContainer, { children })
      ]
    }
  ) });
}
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            var _a;
            const color = ((_a = itemConfig.theme) == null ? void 0 : _a[theme]) || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = RechartsPrimitive.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React.useMemo(() => {
    var _a;
    if (hideLabel || !(payload == null ? void 0 : payload.length)) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey || (item == null ? void 0 : item.dataKey) || (item == null ? void 0 : item.name) || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? ((_a = config[label]) == null ? void 0 : _a.label) || label : itemConfig == null ? void 0 : itemConfig.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !(payload == null ? void 0 : payload.length)) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              ),
              children: formatter && (item == null ? void 0 : item.value) !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
                (itemConfig == null ? void 0 : itemConfig.icon) ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: (itemConfig == null ? void 0 : itemConfig.label) || item.name })
                      ] }),
                      item.value && /* @__PURE__ */ jsx("span", { className: "text-foreground font-mono font-medium tabular-nums", children: item.value.toLocaleString() })
                    ]
                  }
                )
              ] })
            },
            item.dataKey
          );
        }) })
      ]
    }
  );
}
const ChartLegend = RechartsPrimitive.Legend;
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey
}) {
  const { config } = useChart();
  if (!(payload == null ? void 0 : payload.length)) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      children: payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
            ),
            children: [
              (itemConfig == null ? void 0 : itemConfig.icon) && !hideIcon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: item.color
                  }
                }
              ),
              itemConfig == null ? void 0 : itemConfig.label
            ]
          },
          item.value
        );
      })
    }
  );
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
const chartConfig$1 = {
  "currentData.amount": {
    label: "Amount"
  },
  totalAdditions: {
    label: "Incomings",
    color: "var(--foreground)"
  },
  totalDeductions: {
    label: "Outgoings",
    color: "var(--foreground)"
  }
};
function MoneyBreakdownBarChart({ data }) {
  var _a, _b, _c;
  const [type, setType] = useState("total");
  return /* @__PURE__ */ jsxs(Card, { className: "border-b bg-transparent p-0 pb-4", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex items-center gap-2 space-y-0 p-0 px-4 sm:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid flex-1 gap-1", children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Money Breakdown" }),
        /* @__PURE__ */ jsxs(CardDescription, { children: [
          type === "total" && "Showing the current total of each money",
          type === "incomings" && "Showing the record of total income gained by each money since added",
          type === "outgoings" && "Showing the record of total money spent from each money since added"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { className: "capitalize", asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: type }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => setType("total"), children: [
            /* @__PURE__ */ jsx("p", { className: "flex-1 text-left", children: "Total" }),
            type === "total" ? /* @__PURE__ */ jsx(Check, {}) : null
          ] }),
          /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => setType("incomings"), children: [
            /* @__PURE__ */ jsx("p", { className: "flex-1 text-left", children: "Incomings" }),
            type === "incomings" ? /* @__PURE__ */ jsx(Check, {}) : null
          ] }),
          /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => setType("outgoings"), children: [
            /* @__PURE__ */ jsx("p", { className: "flex-1 text-left", children: "Outgoings" }),
            type === "outgoings" ? /* @__PURE__ */ jsx(Check, {}) : null
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(
      ChartContainer,
      {
        config: chartConfig$1,
        className: "bg-muted/50 aspect-auto h-144 rounded-3xl p-4",
        children: /* @__PURE__ */ jsxs(
          BarChart,
          {
            accessibilityLayer: true,
            data: type === "incomings" && ((_a = data.groupsLogsByMoney) == null ? void 0 : _a.sort(
              (a, b) => b.totalAdditions - a.totalAdditions
            )) || type === "outgoings" && ((_b = data.groupsLogsByMoney) == null ? void 0 : _b.sort(
              (a, b) => b.totalDeductions - a.totalDeductions
            )) || type === "total" && ((_c = data.groupsLogsByMoney) == null ? void 0 : _c.sort(
              (a, b) => b.currentData.amount - a.currentData.amount
            )) || [],
            layout: "vertical",
            margin: {
              left: 24
            },
            children: [
              /* @__PURE__ */ jsx(CartesianGrid, { horizontal: false }),
              /* @__PURE__ */ jsx(
                YAxis,
                {
                  dataKey: "currentData.name",
                  tickLine: false,
                  tickMargin: 10,
                  axisLine: false,
                  type: "category"
                }
              ),
              /* @__PURE__ */ jsx(
                XAxis,
                {
                  tickLine: false,
                  axisLine: false,
                  type: "number",
                  tickFormatter: (value) => Intl.NumberFormat("en-US", { style: "currency", currency: "PHP" }).format(
                    value
                  )
                }
              ),
              /* @__PURE__ */ jsx(ChartTooltip, { cursor: false, content: /* @__PURE__ */ jsx(ChartTooltipContent, { hideLabel: true }) }),
              /* @__PURE__ */ jsx(
                Bar,
                {
                  hide: type !== "incomings",
                  dataKey: "totalAdditions",
                  layout: "vertical",
                  radius: 5,
                  isAnimationActive: false
                }
              ),
              /* @__PURE__ */ jsx(
                Bar,
                {
                  hide: type !== "outgoings",
                  dataKey: "totalDeductions",
                  layout: "vertical",
                  radius: 5,
                  isAnimationActive: false
                }
              ),
              /* @__PURE__ */ jsx(
                Bar,
                {
                  hide: type !== "total",
                  dataKey: "currentData.amount",
                  layout: "vertical",
                  radius: 5,
                  isAnimationActive: false
                }
              )
            ]
          }
        )
      }
    ) })
  ] });
}
const chartConfig = {
  totalMoney: {
    label: "Total"
  },
  totalAdditions: {
    label: "Incomings"
  },
  totalDeductions: {
    label: "Outgoings"
  }
};
function TotalMoneyChart({
  data,
  dateJoined
}) {
  var _a;
  const [filter, setFilter] = React.useState({
    type: "daily",
    freq: "7"
  });
  const filteredData = filter.type === "monthly" ? data.groupLogsByMonth : (_a = data.groupLogsByDate) == null ? void 0 : _a.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = /* @__PURE__ */ new Date();
    let daysToSubtract = differenceInCalendarDays(/* @__PURE__ */ new Date(), dateJoined);
    if (filter.freq === "30") {
      daysToSubtract = 30 < daysToSubtract ? 30 : daysToSubtract;
    } else if (filter.freq === "7") {
      daysToSubtract = 7 < daysToSubtract ? 7 : daysToSubtract;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });
  return /* @__PURE__ */ jsxs(Card, { className: "border-b bg-transparent p-0 pb-4", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex items-center gap-2 space-y-0 p-0 px-4 sm:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid flex-1 gap-1", children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Changes" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Showing the flow of your incoming, outgoing, and total money." })
      ] }),
      /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { className: "capitalize", asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: filter.type }) }),
        /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
          /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
            /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => setFilter({ type: "daily", freq: "7" }), children: [
              /* @__PURE__ */ jsx("p", { className: "flex-1 text-left", children: "Daily" }),
              filter.type === "daily" ? /* @__PURE__ */ jsx(Check, {}) : null
            ] }),
            /* @__PURE__ */ jsxs(
              DropdownMenuItem,
              {
                onClick: () => setFilter({ type: "monthly", freq: "sincejoined" }),
                children: [
                  /* @__PURE__ */ jsx("p", { className: "flex-1 text-left", children: " Monthly" }),
                  filter.type === "monthly" ? /* @__PURE__ */ jsx(Check, {}) : null
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
            /* @__PURE__ */ jsxs(
              DropdownMenuItem,
              {
                onClick: () => setFilter({ freq: "7", type: "daily" }),
                hidden: filter.type === "monthly",
                children: [
                  /* @__PURE__ */ jsx("p", { className: "flex-1 text-left", children: "7" }),
                  filter.type === "daily" && filter.freq === "7" ? /* @__PURE__ */ jsx(Check, {}) : null
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              DropdownMenuItem,
              {
                onClick: () => setFilter({ freq: "30", type: "daily" }),
                hidden: filter.type === "monthly",
                children: [
                  /* @__PURE__ */ jsx("p", { className: "flex-1 text-left", children: "30" }),
                  filter.type === "daily" && filter.freq === "30" ? /* @__PURE__ */ jsx(Check, {}) : null
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              DropdownMenuItem,
              {
                onClick: () => setFilter({ freq: "sincejoined", type: filter.type }),
                children: [
                  /* @__PURE__ */ jsx("p", { className: "flex-1 text-left", children: "Since Joined" }),
                  filter.freq === "sincejoined" ? /* @__PURE__ */ jsx(Check, {}) : null
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "space-y-4", children: !(filteredData == null ? void 0 : filteredData.length) ? /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center text-sm", children: "No data to show as of now" }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(
        ChartContainer,
        {
          config: chartConfig,
          className: "aspect-auto h-52 w-full rounded-3xl bg-[var(--chart-totalMoney)]/5 p-4",
          children: /* @__PURE__ */ jsxs(AreaChart, { data: filteredData, children: [
            /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "totalMoney", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "5%",
                  stopColor: "var(--chart-totalMoney)",
                  stopOpacity: 0.8
                }
              ),
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "95%",
                  stopColor: "var(--chart-totalMoney)",
                  stopOpacity: 0.1
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                hide: true,
                dataKey: "date",
                tickLine: false,
                axisLine: false,
                tickMargin: 8,
                minTickGap: 32,
                tickFormatter: (value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: filter.type === "monthly" ? void 0 : "numeric"
                  });
                }
              }
            ),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                tickLine: false,
                axisLine: false,
                minTickGap: 32,
                tickFormatter: (value) => {
                  const newValue = Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PHP",
                    maximumFractionDigits: 0
                  }).format(value);
                  return newValue;
                }
              }
            ),
            /* @__PURE__ */ jsx(
              ChartTooltip,
              {
                cursor: false,
                content: /* @__PURE__ */ jsx(
                  ChartTooltipContent,
                  {
                    labelFormatter: (value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: filter.type === "monthly" ? void 0 : "numeric"
                      });
                    },
                    indicator: "dot"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                dataKey: "totalMoney",
                stroke: "var(--chart-totalMoney)",
                fill: "url(#totalMoney)",
                stackId: "a",
                isAnimationActive: false,
                type: "bump"
              }
            ),
            /* @__PURE__ */ jsx(ChartLegend, { content: /* @__PURE__ */ jsx(ChartLegendContent, {}) })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        ChartContainer,
        {
          config: chartConfig,
          className: "aspect-auto h-52 w-full rounded-3xl bg-[var(--chart-totalAdditions)]/5 p-4",
          children: /* @__PURE__ */ jsxs(AreaChart, { data: filteredData, children: [
            /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "totalAdditions", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "5%",
                  stopColor: "var(--chart-totalAdditions)",
                  stopOpacity: 0.8
                }
              ),
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "95%",
                  stopColor: "var(--chart-totalAdditions)",
                  stopOpacity: 0.1
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                hide: true,
                dataKey: "date",
                tickLine: false,
                axisLine: false,
                tickMargin: 8,
                minTickGap: 32,
                tickFormatter: (value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: filter.type === "monthly" ? void 0 : "numeric"
                  });
                }
              }
            ),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                tickLine: false,
                axisLine: false,
                minTickGap: 32,
                tickFormatter: (value) => {
                  const newValue = Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PHP",
                    maximumFractionDigits: 0
                  }).format(value);
                  return newValue;
                }
              }
            ),
            /* @__PURE__ */ jsx(
              ChartTooltip,
              {
                cursor: false,
                content: /* @__PURE__ */ jsx(
                  ChartTooltipContent,
                  {
                    labelFormatter: (value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: filter.type === "monthly" ? void 0 : "numeric"
                      });
                    },
                    indicator: "dot"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                dataKey: "totalAdditions",
                stroke: "var(--chart-totalAdditions)",
                fill: "url(#totalAdditions)",
                stackId: "b",
                isAnimationActive: false,
                type: "bump"
              }
            ),
            /* @__PURE__ */ jsx(ChartLegend, { content: /* @__PURE__ */ jsx(ChartLegendContent, {}) })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        ChartContainer,
        {
          config: chartConfig,
          className: "aspect-auto h-52 w-full rounded-3xl bg-[var(--chart-totalDeductions)]/5 p-4",
          children: /* @__PURE__ */ jsxs(AreaChart, { data: filteredData, children: [
            /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "totalDeductions", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "5%",
                  stopColor: "var(--chart-totalDeductions)",
                  stopOpacity: 0.8
                }
              ),
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "95%",
                  stopColor: "var(--chart-totalDeductions)",
                  stopOpacity: 0.1
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(CartesianGrid, { vertical: false }),
            /* @__PURE__ */ jsx(
              XAxis,
              {
                dataKey: "date",
                tickLine: false,
                axisLine: false,
                tickMargin: 8,
                minTickGap: 32,
                tickFormatter: (value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: filter.type === "monthly" ? void 0 : "numeric"
                  });
                }
              }
            ),
            /* @__PURE__ */ jsx(
              ChartTooltip,
              {
                cursor: false,
                content: /* @__PURE__ */ jsx(
                  ChartTooltipContent,
                  {
                    labelFormatter: (value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: filter.type === "monthly" ? void 0 : "numeric"
                      });
                    },
                    indicator: "dot"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              YAxis,
              {
                tickLine: false,
                axisLine: false,
                minTickGap: 32,
                tickFormatter: (value) => {
                  const newValue = Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PHP",
                    maximumFractionDigits: 0
                  }).format(value);
                  return newValue;
                }
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                dataKey: "totalDeductions",
                stroke: "var(--chart-totalDeductions)",
                fill: "url(#totalDeductions)",
                stackId: "c",
                isAnimationActive: false,
                type: "bump"
              }
            ),
            /* @__PURE__ */ jsx(ChartLegend, { content: /* @__PURE__ */ jsx(ChartLegendContent, {}) })
          ] })
        }
      )
    ] }) })
  ] });
}
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
    return Object.entries(groupedByMoney).map(([moneyId, logs]) => ({
      moneyId,
      logs: logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
      totalAdditions: Math.abs(_.sum(logs.map((log) => log.changes.current.amount < log.changes.prev.amount ? 0 : log.changes.current.amount - log.changes.prev.amount))),
      totalDeductions: Math.abs(_.sum(logs.map((log) => log.changes.current.amount < log.changes.prev.amount ? log.changes.prev.amount - log.changes.current.amount : 0))),
      currentData: logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0].changes.current,
      fill: logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0].changes.current.color ?? "var(--foreground)"
    }));
  }
  return {
    groupLogsByMonth: groupLogsByMonth(),
    groupLogsByDate: groupLogsByDate(),
    groupsLogsByMoney: groupsLogsByMoney()
  };
});
const analyticsQueryOptions = (userId) => queryOptions({
  queryKey: ["analytics", userId ?? "no-user"],
  queryFn: getAnalytics
});
const Route$2 = createFileRoute("/(user)/analytics/")({
  component: RouteComponent$2
});
function RouteComponent$2() {
  const { user } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsxs(Scrollable, { hideTotalMoney: true, children: [
    /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground flex items-center justify-between gap-4 border-b p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Activity, {}),
        /* @__PURE__ */ jsx("p", { children: "Analytics" })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => location.reload(), type: "button", children: /* @__PURE__ */ jsx(RefreshCw, { className: "size-4" }) })
    ] }),
    /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: /* @__PURE__ */ jsxs("div", { className: "w-full space-y-4 px-4", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-full rounded-full" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-52 w-full rounded-2xl" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-52 w-full rounded-2xl" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-52 w-full rounded-2xl" })
        ] }),
        children: /* @__PURE__ */ jsx(Analytics, { user })
      }
    ),
    /* @__PURE__ */ jsx(
      PageStatusSetter,
      {
        state: {
          showAddMoneyBtn: false,
          showSettingsBtn: true,
          showLogsPageBtn: true,
          showAnalyticsPageBtn: false
        }
      }
    )
  ] });
}
function Analytics({ user }) {
  const analytics = useSuspenseQuery({
    ...analyticsQueryOptions(user == null ? void 0 : user.id),
    staleTime: 0
  });
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      TotalMoneyChart,
      {
        data: analytics.data,
        dateJoined: new Date((user == null ? void 0 : user.createdAt) ?? /* @__PURE__ */ new Date())
      }
    ),
    /* @__PURE__ */ jsx(MoneyBreakdownBarChart, { data: analytics.data })
  ] });
}
const Route$1 = createFileRoute("/(user)/list/$id")({
  component: RouteComponent$1
});
function RouteComponent$1() {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(
      PageStatusSetter,
      {
        state: {
          showAddMoneyBtn: false,
          showSettingsBtn: true,
          showLogsPageBtn: true,
          showAnalyticsPageBtn: true
        }
      }
    )
  ] });
}
const Route = createFileRoute("/(user)/list/$id/")({
  component: RouteComponent
});
function RouteComponent() {
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(MoneySkeleton, {}), children: /* @__PURE__ */ jsx(Money, {}) });
}
function Money() {
  const { id } = Route.useParams();
  const { queryClient, user } = Route.useRouteContext();
  const { total } = useMoneyState();
  const m = useSuspenseQuery(moneyQueryOptions(id));
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      MoneyCard,
      {
        queryClient,
        user,
        moneysQty: 1,
        deepView: true,
        m: m.data,
        totalMoney: total
      }
    ),
    /* @__PURE__ */ jsx(Logs, { logs: m.data.log.map((log) => ({ ...log, money: m.data })) })
  ] });
}
function Logs({
  logs
}) {
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground px-4 pt-4 text-center", children: "Logs" }),
    logs.map((log) => /* @__PURE__ */ jsx(LogCard, { log }, log.id))
  ] });
}
const LogoutRoute = Route$c.update({
  id: "/logout",
  path: "/logout",
  getParentRoute: () => Route$d
});
const userRouteRoute = Route$b.update({
  id: "/(user)",
  getParentRoute: () => Route$d
});
const authRouteRoute = Route$a.update({
  id: "/(auth)",
  getParentRoute: () => Route$d
});
const IndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$d
});
const authSignupRoute = Route$8.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => authRouteRoute
});
const authLoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => authRouteRoute
});
const userListRouteRoute = Route$6.update({
  id: "/list",
  path: "/list",
  getParentRoute: () => userRouteRoute
});
const userSettingsIndexRoute = Route$5.update({
  id: "/settings/",
  path: "/settings/",
  getParentRoute: () => userRouteRoute
});
const userLogsIndexRoute = Route$4.update({
  id: "/logs/",
  path: "/logs/",
  getParentRoute: () => userRouteRoute
});
const userListIndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => userListRouteRoute
});
const userAnalyticsIndexRoute = Route$2.update({
  id: "/analytics/",
  path: "/analytics/",
  getParentRoute: () => userRouteRoute
});
const userListIdRouteRoute = Route$1.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => userListRouteRoute
});
const userListIdIndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => userListIdRouteRoute
});
const authRouteRouteChildren = {
  authLoginRoute,
  authSignupRoute
};
const authRouteRouteWithChildren = authRouteRoute._addFileChildren(
  authRouteRouteChildren
);
const userListIdRouteRouteChildren = {
  userListIdIndexRoute
};
const userListIdRouteRouteWithChildren = userListIdRouteRoute._addFileChildren(
  userListIdRouteRouteChildren
);
const userListRouteRouteChildren = {
  userListIdRouteRoute: userListIdRouteRouteWithChildren,
  userListIndexRoute
};
const userListRouteRouteWithChildren = userListRouteRoute._addFileChildren(
  userListRouteRouteChildren
);
const userRouteRouteChildren = {
  userListRouteRoute: userListRouteRouteWithChildren,
  userAnalyticsIndexRoute,
  userLogsIndexRoute,
  userSettingsIndexRoute
};
const userRouteRouteWithChildren = userRouteRoute._addFileChildren(
  userRouteRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  authRouteRoute: authRouteRouteWithChildren,
  userRouteRoute: userRouteRouteWithChildren,
  LogoutRoute
};
const routeTree = Route$d._addFileChildren(rootRouteChildren)._addFileTypes();
const routeTree_gen = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routeTree
}, Symbol.toStringTag, { value: "Module" }));
function DefaultCatchBoundary({ error }) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId$1
  });
  return /* @__PURE__ */ jsxs("div", { className: "m-auto flex w-fit flex-1 flex-col items-center justify-center gap-4 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-muted space-y-2 rounded-3xl p-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-destructive text-2xl font-bold", children: error.name }),
      /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap", children: error.message })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          onClick: () => {
            router.invalidate();
          },
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(Button, { asChild: true, variant: "secondary", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }) }) : /* @__PURE__ */ jsx(Button, { asChild: true, variant: "secondary", children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      ) })
    ] })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "m-auto flex h-fit w-fit flex-col items-center justify-center gap-2 p-4", children: [
    /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }),
    /* @__PURE__ */ jsxs("p", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => window.history.back(), children: "Go back" }),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "secondary", children: /* @__PURE__ */ jsx(Link, { to: "/", children: "Home" }) })
    ] })
  ] });
}
function createRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry: 0
      }
    }
  });
  const router = routerWithQueryClient(
    createRouter$1({
      routeTree,
      context: { queryClient, user: null },
      defaultPreload: "intent",
      defaultPreloadStaleTime: Infinity,
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: NotFound,
      scrollRestoration: true,
      defaultStructuralSharing: true,
      defaultStaleTime: Infinity
    }),
    queryClient
  );
  return router;
}
const serverEntry$1 = createStartHandler({
  createRouter
})(defaultStreamHandler);
const serverEntry = defineEventHandler(function(event) {
  const request = toWebRequest(event);
  return serverEntry$1({ request });
});

export { createServerFn as a, authMiddleware as b, createServerRpc as c, addLog as d, serverEntry as default, getSupabaseServerClient as g, settingMiddleware as s };
//# sourceMappingURL=ssr.mjs.map

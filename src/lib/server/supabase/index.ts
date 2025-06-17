import { createServerClient } from "@supabase/ssr"
import { parseCookies, setCookie } from "@tanstack/react-start/server"
import type { Database } from "./types"
export function getSupabaseServerClient() {
	return createServerClient<Database>(
		(() => {
			const key = process.env.SUPABASE_URL
			if (!key)
				throw new Error("SUPABASE_ANON_KEY environment variable is not set")
			return key
		})(),
		(() => {
			const key = process.env.SUPABASE_ANON_KEY
			if (!key)
				throw new Error("SUPABASE_ANON_KEY environment variable is not set")
			return key
		})(),
		{
			cookies: {
				getAll() {
					return Object.entries(parseCookies()).map(([name, value]) => ({
						name,
						value,
					}))
				},
				setAll(cookies) {
					for (const cookie of cookies) {
						setCookie(cookie.name, cookie.value, { maxAge: 60 * 60 * 24 * 2 })
					}
				},
			},
		}
	)
}

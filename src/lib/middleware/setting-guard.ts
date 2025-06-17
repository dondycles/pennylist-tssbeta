import { createMiddleware } from "@tanstack/react-start"
import { getSupabaseServerClient } from "../server/supabase"
import { authMiddleware } from "./auth-guard"

export const settingMiddleware = createMiddleware({ type: "function" })
	.middleware([authMiddleware])
	.server(async ({ next, context: { user } }) => {
		const supabase = getSupabaseServerClient()
		const { data: setting } = await supabase
			.from("setting")
			.select()
			.eq("userId", user.id)
			.single()

		return next({ context: { setting } })
	})

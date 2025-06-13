import { createMiddleware } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { getSupabaseServerClient } from "../server/supabase";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const supabase = getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setResponseStatus(401);
      throw new Error("Unauthorized");
    }

    return next({ context: { user } });
  }
);

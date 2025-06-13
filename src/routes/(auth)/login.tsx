import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseServerClient } from "@/lib/server/supabase";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

export const Route = createFileRoute("/(auth)/login")({
  component: LoginForm,
});

export const loginFn = createServerFn({ method: "POST" })
  .validator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw new Error(error.message);
  });

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const mutateLogin = useMutation({
    mutationFn: async (creds: z.infer<typeof loginSchema>) =>
      await loginFn({ data: creds }),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.invalidate();
      window.location.reload(); // Redirect to the list page after successful login
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((creds) => mutateLogin.mutate(creds))}
        >
          <div className="flex flex-col gap-6">
            <h1 className="text-center text-xl font-bold">
              Welcome to pennylist.
            </h1>
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-2 w-full"
                disabled={mutateLogin.isPending}
              >
                {mutateLogin.isPending && (
                  <LoaderCircle className="animate-spin" />
                )}
                {mutateLogin.isPending ? "Logging in..." : "Login"}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
}

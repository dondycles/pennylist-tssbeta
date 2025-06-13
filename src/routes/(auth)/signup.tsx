import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSupabaseServerClient } from "@/lib/server/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().nonempty("Password is required"),
    confirm_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
  });

export const signupFn = createServerFn({ method: "POST" })
  .validator((d: { email: string; password: string }) => d)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) throw new Error(error.message);
  });

export const Route = createFileRoute("/(auth)/signup")({
  component: SignupForm,
});

function SignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const mutateSignup = useMutation({
    mutationFn: async (creds: z.infer<typeof signupSchema>) =>
      await signupFn({ data: creds }),
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
          onSubmit={form.handleSubmit((creds) => {
            mutateSignup.mutate(creds);
          })}
        >
          <div className="flex flex-col gap-6">
            <h1 className="text-center text-xl font-bold">
              Sign up for pennylist.
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
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
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
                disabled={mutateSignup.isPending}
              >
                {mutateSignup.isPending && (
                  <LoaderCircle className="animate-spin" />
                )}
                {mutateSignup.isPending ? "Signing up..." : "Sign up"}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}

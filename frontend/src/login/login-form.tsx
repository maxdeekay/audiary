import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { loginSchema, type LoginRequest } from "@/lib/schemas";
import { login } from "@/api/auth";
import { ApiError } from "@/api/client";

export default function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginRequest) {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          form.setError("root", {
            message: "Invalid username or password.",
          });
        } else {
          form.setError("root", {
            message: "Something went wrong. Please try again.",
          });
        }
      } else {
        form.setError("root", {
          message: "Unable to connect. Check your connection.",
        });
      }
    }
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  {...field}
                  id="username"
                  aria-invalid={fieldState.invalid}
                  placeholder="Username"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          ></Controller>

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Password"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          ></Controller>
        </FieldGroup>

        {form.formState.errors.root && (
          <p className="text-sm text-red-500 mt-2">
            {form.formState.errors.root.message}
          </p>
        )}

        <Button type="submit" className="w-full mt-10 cursor-pointer">
          Login
        </Button>
      </form>
    </div>
  );
}

"use client";

import styles from "./loginForm.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCurrentMember } from "@/stores/MemberStore";

import type { loginFormFields } from "@/features/members/types";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// ------------------------------------------------------------------

/**
 *
 * Handles the form submission for creating a new product.
 *
 * @param values - The values of the form to be submitted
 * @param reset - The form reset function
 * @param setResultMessage - The setter for the result message state
 */
async function onSubmit(
  values: loginFormFields,
  router: AppRouterInstance,
  login: (email: string, password: string) => Promise<{ message: string }>,
  setResultMessage: (msg: string | null) => void
) {
  // Clear previous result message
  setResultMessage(null);

  // Attempt to log in the member using the store's login function
  login(values.email, values.password).then((res) => {
    setResultMessage(res.message);
    if (res.message === "Login successful.") {
      router.push("/");
    }
  });
}

// ------------------------------------------------------------------

export default function LoginForm() {
  // Hooks
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginFormFields>({ mode: "onTouched" });
  const router = useRouter();

  const { login } = useCurrentMember();

  const [resultMessage, setResultMessage] = useState<string | null>(null);

  return (
    <>
      <form
        onSubmit={handleSubmit((values) =>
          onSubmit(values, router, login, setResultMessage)
        )}
        className={styles.form}
      >
        <label>
          Email:
          <input
            {...register("email", { required: "Email is required" })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <div className={styles.error}>{errors.email.message}</div>
          )}
        </label>

        <label>
          Password:
          <input
            {...register("password", { required: "Password is required" })}
            aria-invalid={errors.password ? "true" : "false"}
            type="password"
          />
          {errors.password && (
            <div className={styles.error}>{errors.password.message}</div>
          )}
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {resultMessage && <div className={styles.result}>{resultMessage}</div>}
    </>
  );
}

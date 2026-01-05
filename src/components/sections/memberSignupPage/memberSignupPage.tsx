"use client";

import styles from "./memberSignupPage.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useCurrentMember } from "@/stores/MemberStore";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// ------------------------------------------------------------------

/**
 * Represents the form fields for a member signup request.
 */
export type signupFormFields = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

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
  values: signupFormFields,
  router: AppRouterInstance,
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ message: string }>,
  setResultMessage: (msg: string | null) => void
) {
  // Clear previous result message
  setResultMessage(null);

  // Attempt to sign up the member using the store's signup function
  signup(values.email, values.password, values.name).then((res) => {
    setResultMessage(res.message);
    if (res.message === "Signup successful.") {
      router.push("/");
    }
  });
}

// ------------------------------------------------------------------

export default function MemberSignupPage() {
  // Hooks
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<signupFormFields>({ mode: "onSubmit" });
  const router = useRouter();

  // Store
  const { signup } = useCurrentMember();

  // Local state
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <h1>Create Account</h1>

      <form
        onSubmit={handleSubmit((values) =>
          onSubmit(values, router, signup, setResultMessage)
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
          Name:
          <input
            {...register("name", { required: "Name is required" })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <div className={styles.error}>{errors.name.message}</div>
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

        <label>
          Confirm Password:
          <input
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            type="password"
          />
          {errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword.message}</div>
          )}
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {resultMessage && <div className={styles.result}>{resultMessage}</div>}
    </div>
  );
}

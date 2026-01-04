"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./productCreatePage.module.css";

// ------------------------------------------------------------------

/**
 * Represents the form fields for creating a new product record.
 */
type ProductFormFields = {
  name: string;
  category: string;
  type: string;
  price: number;
  thumbnail: FileList;
};

// ------------------------------------------------------------------

export default function ProductCreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormFields>({ mode: "onTouched" });

  const [resultMessage, setResultMessage] = useState<string | null>(null);

  async function onSubmit(values: ProductFormFields) {
    setResultMessage(null);

    console.log("Submitting product:", values);
    try {
      const fd = new FormData();
      fd.append("name", values.name);
      fd.append("category", values.category);
      fd.append("type", values.type);
      fd.append("price", String(values.price));
      const file = values.thumbnail?.[0];
      if (file) fd.append("thumbnail", file, file.name);

      const res = await fetch("/api/products", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      setResultMessage("Product created successfully.");
      reset();
    } catch (err) {
      setResultMessage(`Create failed: ${(err as Error).message}`);
    }
  }

  return (
    <div className={styles.container}>
      <h1>Create New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label>
          Name
          <input
            {...register("name", { required: "Name is required" })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && (
            <div className={styles.error}>{errors.name.message}</div>
          )}
        </label>

        <label>
          Category
          <input
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && (
            <div className={styles.error}>{errors.category.message}</div>
          )}
        </label>

        <label>
          Type
          <input {...register("type", { required: "Type is required" })} />
          {errors.type && (
            <div className={styles.error}>{errors.type.message}</div>
          )}
        </label>

        <label>
          Price
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 0, message: "Price must be >= 0" },
            })}
          />
          {errors.price && (
            <div className={styles.error}>{errors.price.message}</div>
          )}
        </label>

        <label>
          Thumbnail URL
          <input type="file" multiple={false} {...register("thumbnail")} />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </form>

      {resultMessage && <div className={styles.result}>{resultMessage}</div>}
    </div>
  );
}

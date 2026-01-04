"use client";

import styles from "./productCreatePage.module.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ProductCategory, ProductType } from "@/types/products";

// ------------------------------------------------------------------

/**
 * Represents the form fields for creating a new product record.
 */
type ProductFormFields = {
  name: string;
  category: ProductCategory;
  type: ProductType;
  price: number;
  thumbnail: FileList;
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
  values: ProductFormFields,
  reset: () => void,
  setResultMessage: (msg: string | null) => void
) {
  setResultMessage(null);

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

// ------------------------------------------------------------------

export default function ProductCreatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormFields>({ mode: "onTouched" });

  const [resultMessage, setResultMessage] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <h1>Create New Product</h1>

      <form
        onSubmit={handleSubmit((values) =>
          onSubmit(values, reset, setResultMessage)
        )}
        className={styles.form}
      >
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
          <select
            {...register("category", { required: "Category is required" })}
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
            <option value="baby">Baby</option>
          </select>
          {errors.category && (
            <div className={styles.error}>{errors.category.message}</div>
          )}
        </label>

        <label>
          Type
          <select
            {...register("type", { required: "Type is required" })}
            defaultValue=""
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="outerwear">Outerwear</option>
            <option value="tops">Tops</option>
            <option value="bottoms">Bottoms</option>
          </select>
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
          <input
            type="file"
            accept="image/*"
            multiple={false}
            {...register("thumbnail")}
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </form>

      {resultMessage && <div className={styles.result}>{resultMessage}</div>}
    </div>
  );
}

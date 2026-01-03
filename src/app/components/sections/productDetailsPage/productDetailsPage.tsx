"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import styles from "./productDetailsPage.module.css";

// ------------------------------------------------------------------

const fetchProductById = async (id: string) => {
  const res = await fetch(`/api/products/${id}`);

  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

// ------------------------------------------------------------------

export default function ProductDetailsPage() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", String(id)],
    queryFn: () => fetchProductById(String(id)),
  });

  if (isLoading) return <div>Loading product...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return <div className={styles.container}>{product?.name}</div>;
}

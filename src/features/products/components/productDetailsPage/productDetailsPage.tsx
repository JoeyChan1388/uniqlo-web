"use client";

import styles from "./productDetailsPage.module.css";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/lib/Products";


// ------------------------------------------------------------------


// TODO: Expand this component to show full product details
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

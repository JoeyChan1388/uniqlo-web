"use client";

import { Icon } from "@iconify/react";
import { getSizeRange } from "@/lib/formats";
import { fetchProducts } from "@/lib/Products";
import { useQuery } from "@tanstack/react-query";
import { useSelectedLocation } from "@/stores/SelectedLocationStore";
import type { Product, ProductType, ProductCategory } from "@/types/products";

import Link from "next/link";
import Image from "next/image";
import styles from "./productsPage.module.css";
import Button from "@/components/common/button/button";
import Skeleton from "@/components/common/skeleton/skeleton";

// ------------------------------------------------------------------

export interface ProductsPageProps {
  title: string;
  productCategory: ProductCategory;
  productType: ProductType;
}

// ------------------------------------------------------------------

export interface ProductsGridViewProps {
  productCategory: ProductCategory;
  productType: ProductType;
}

// ------------------------------------------------------------------

export interface ProductGridItemProps {
  product: Product;
}

// ------------------------------------------------------------------

export default function ProductsPage({
  title,
  productCategory,
  productType,
}: ProductsPageProps) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>

      <StoreSelector />

      <ProductsGridView
        productCategory={productCategory}
        productType={productType}
      />
    </div>
  );
}

// ------------------------------------------------------------------

function StoreSelector() {
  const { selectedLocation } = useSelectedLocation();

  return (
    <div className={styles.storeSelectorRow}>
      <div>
        <Icon
          color="var(--text-primary)"
          icon="mdi:store-marker"
          width={22}
          height={22}
        />
        <p>
          {selectedLocation
            ? `Store: ${selectedLocation.name}`
            : `Select a store to search store stock`}
        </p>
      </div>
      <Button variant="text" size="small" href="/store-locator">
        {selectedLocation ? `Change Store` : `Select Store`}
      </Button>
    </div>
  );
}

// ------------------------------------------------------------------

function ProductCardSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <Skeleton
        width="300px"
        height="400px"
        borderRadius="0"
        className={styles.skeletonCardImageContainer}
      />
      <div className={styles.skeletonCardContent}>
        <Skeleton width="80%" height="16px" />
        <Skeleton width="60%" height="18px" />
        <Skeleton width="40%" height="18px" />
      </div>
    </div>
  );
}

// ------------------------------------------------------------------

function ProductsGridView({
  productCategory,
  productType,
}: ProductsGridViewProps) {
  // Use React Query to fetch products
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [productCategory, productType],
    queryFn: () => fetchProducts(productCategory, productType),
  });

  // Render loading, error, or products grid depending on state
  if (isLoading) {
    return (
      <div className={styles.productsGridViewContainer}>
        <div className={styles.productGrid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className={styles.productsGridViewContainer}>
      <p>Results: {products?.length} items</p>
      <div className={styles.productGrid}>
        {products?.map((product: Product) => (
          <ProductGridItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------

function ProductGridItem({ product }: ProductGridItemProps) {
  return (
    <Link href={`/products/${product.id}`} className={styles.productCard}>
      <div key={product.id} className={styles.productCard}>
        <div className={styles.productCardImageContainer}>
          <Image
            width={300}
            height={400}
            alt={product.name}
            src={product.thumbnailUrl || "/images/placeholder.png"}
          />
        </div>
        <div className={styles.productCardContentContainer}>
          <p className={styles.productCardEyebrow}>
            {product.category.toLocaleUpperCase()}
            {", "}
            {getSizeRange(product.sizesAvailable)}
          </p>
          <p className={styles.productCardTitle}>{product.name}</p>

          {product.salePrice ? (
            <>
              <p className={styles.productCardSalePrice}>
                ${product.salePrice.toFixed(2)}
              </p>
              <p className={styles.productCardSaleLabel}>Sale</p>
            </>
          ) : (
            <p className={styles.productCardOriginalPrice}>
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

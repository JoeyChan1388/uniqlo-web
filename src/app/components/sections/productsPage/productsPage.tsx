"use client";

import type {
  Product,
  ProductSize,
  ProductType,
  ProductCategory,
} from "@/types/products";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/Products";
import { useSelectedLocation } from "@/app/stores/useSelectedLocation";

import Link from "next/link";
import Image from "next/image";
import styles from "./productsPage.module.css";
import Button from "../../common/button/button";

// ------------------------------------------------------------------

interface ProductsPageProps {
  title: string;
  productCategory: ProductCategory;
  productType: ProductType;
}

// ------------------------------------------------------------------

interface ProductsGridViewProps {
  productCategory: ProductCategory;
  productType: ProductType;
}

// ------------------------------------------------------------------

interface ProductGridItemProps {
  product: Product;
}

// ------------------------------------------------------------------

function getSizeRange(sizes: ProductSize[] | undefined) {
  if (!sizes || sizes.length === 0) return "N/A";
  return `${sizes[0]}-${sizes[sizes.length - 1]}`;
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

// TODO: Skeleton loading state
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
  if (isLoading) return <div>Loading products...</div>;
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

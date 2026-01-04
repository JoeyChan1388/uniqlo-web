import styles from "./expandedHeader.module.css";

import React from "react";

import { Icon } from "@iconify/react";
import type { ProductTypeListing } from "@/types/products";

import Link from "next/link";
import TextInput from "@/app/components/common/textInput/textInput";
import IconButton from "@/app/components/common/iconButton/iconButton";
import { useExpandedHeader } from "@/app/stores/useExpandedHeader";

// ------------------------------------------------------------------

interface ExpandedHeaderProps {
  slots?: {
    announcementBarSlot?: React.ReactNode;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    centerSlot?: React.ReactNode;
  };
}

// ------------------------------------------------------------------

const CONST_PRODUCT_TYPE_LISTINGS: ProductTypeListing[] = [
  {
    id: "outerwear",
    displayName: "Outerwear",
    imageUrl: "/product_types/women/outerwear.jpg",
    href: "/women/outerwear",
  },
  {
    id: "tops",
    displayName: "T-Shirts, Fleeces & Sweats",
    imageUrl: "/product_types/women/tops.jpg",
    href: "/women/tops",
  },
  {
    id: "bottoms",
    displayName: "Bottoms",
    imageUrl: "/product_types/women/bottoms.jpg",
    href: "/women/bottoms",
  },
];

// ------------------------------------------------------------------

export default function ExpandedHeader({ slots }: ExpandedHeaderProps) {
  const open = useExpandedHeader((state) => state.openExpandedHeader);

  if (!open) {
    return null;
  }

  return (
    <div className={[styles.expandedHeaderContainer, "notMain "].join(" ")}>
      {slots?.announcementBarSlot}

      {/* Normal Header Content */}
      <div className={styles.expandedHeaderContent}>
        <div className="navContainer">
          <div>{slots?.leftSlot}</div>
          <div>{slots?.centerSlot}</div>
          <div>
            <IconButton
              onClick={() => useExpandedHeader.getState().closeExpandedHeader()}
            >
              <Icon icon="mdi:close" width="24" height="24" />
            </IconButton>
          </div>
        </div>

        <div
          className="navContainer"
          style={{
            marginTop: 16,
            gap: 16,
          }}
        >
          <TextInput
            size="large"
            variant="outlined"
            placeholder="Search by keyword..."
            fullWidth
            rounded
          />
          <IconButton>
            <Icon icon="ci:qr-code" width="32" height="32" />
          </IconButton>
        </div>

        <div className="navContainer">
          <ProductTypesGridView />
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------

function ProductTypesGridView() {
  const productTypes: ProductTypeListing[] = CONST_PRODUCT_TYPE_LISTINGS;

  return (
    <div className={styles.productsTypesGridContainer}>
      <div className={styles.productTypesGrid}>
        {productTypes?.map((product: ProductTypeListing) => (
          <ProductTypeCard key={product.id} productType={product} />
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------

function ProductTypeCard({ productType }: { productType: ProductTypeListing }) {
  return (
    <Link
      href={productType?.href || "#"}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className={styles.productTypeCard}>
        <div
          className={styles.productCardImageContainer}
          style={{
            backgroundImage: `url(${productType?.imageUrl})`,
            backgroundSize: "cover",
          }}
        />
        <p>{productType?.displayName}</p>
      </div>
    </Link>
  );
}

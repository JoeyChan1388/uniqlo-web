import React from "react";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductTypeListing } from "@/types/products";
import { useExpandedHeader } from "@/app/stores/ExpandedHeaderStore";
import { CONST_PRODUCT_TYPE_LISTINGS_WOMEN } from "@/constants/navigation";

import Link from "next/link";
import styles from "./expandedHeader.module.css";
import TextInput from "@/app/components/common/textInput/textInput";
import IconButton from "@/app/components/common/iconButton/iconButton";
import { useCurrentMember } from "@/app/stores/MemberStore";

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

export default function ExpandedHeader({ slots }: ExpandedHeaderProps) {
  const open = useExpandedHeader((state) => state.openExpandedHeader);
  const { currentMember, logout } = useCurrentMember();

  return (
    <motion.div
      initial={{ display: "none", opacity: 0 }}
      animate={
        open
          ? { display: "block", opacity: 1 }
          : { display: "none", opacity: 0 }
      }
      transition={{ duration: 0.3 }}
      className={[styles.expandedHeaderContainer, "notMain "].join(" ")}
    >
      {slots?.announcementBarSlot}

      {/* Expanded Header Content */}
      <div className={styles.expandedHeaderContent}>
        <div className="navContainer">
          <div>{slots?.leftSlot}</div>
          <div>{slots?.centerSlot}</div>

          {/* Right Slot is replaced by close button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            {currentMember && <p onClick={logout}>Welcome, {currentMember.name}!</p>}
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
          <ProductTypesGridView open={open} />
        </div>
      </div>
    </motion.div>
  );
}

// ------------------------------------------------------------------

function ProductTypesGridView({ open }: { open: boolean }) {
  const productTypes: ProductTypeListing[] = CONST_PRODUCT_TYPE_LISTINGS_WOMEN;

  return (
    <AnimatePresence>
      {open && (
        <div className={styles.productsTypesGridContainer}>
          <div className={styles.productTypesGrid}>
            {productTypes?.map((product: ProductTypeListing, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.02,
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <ProductTypeCard key={product.id} productType={product} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
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

import ProductsPage from "@/features/products/components/productsPage/productsPage";

import type { ProductCategory, ProductType } from "@/types/products";
import { CONST_PRODUCT_TYPE_LISTINGS_WOMEN } from "@/constants/product";

// ------------------------------------------------------------------

interface ProductsProps {
  params: {
    category: ProductCategory;
    type: ProductType;
  };
}

// ------------------------------------------------------------------

export default async function Products({ params }: ProductsProps) {
  const { category, type } = await params;
  const categories = CONST_PRODUCT_TYPE_LISTINGS_WOMEN;

  const displayName = categories.find((item) => item.id === type)?.displayName;

  return (
    <ProductsPage
      title={displayName || "Products"}
      productCategory={category}
      productType={type}
    />
  );
}

import Content from "@/components/layout/content/Content";
import ProductsPage from "@/features/products/components/productsPage/productsPage";

import { CONST_PRODUCT_TYPE_LISTINGS_WOMEN } from "@/features/products/constants";

import type { ProductCategory, ProductType } from "@/features/products/types";

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
    <Content>
      <ProductsPage
        title={displayName || "Products"}
        productCategory={category}
        productType={type}
      />
    </Content>
  );
}

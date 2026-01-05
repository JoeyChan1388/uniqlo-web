import styles from "./productCreatePage.module.css";

import ProductCreateForm from "@/features/products/components/productCreateForm/productCreateForm";

// ------------------------------------------------------------------

export default function ProductCreatePage() {
  return (
    <div>
      <h1>Create New Product</h1>

      <ProductCreateForm />
    </div>
  );
}

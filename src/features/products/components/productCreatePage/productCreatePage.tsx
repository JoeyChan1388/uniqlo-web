import styles from "./signupform.module.css";

import ProductCreateForm from "@/features/products/components/productCreateForm/productCreateForm";

// ------------------------------------------------------------------

export default function ProductCreatePage() {
  return (
    <div className={styles.container}>
      <h1>Create New Product</h1>

      <ProductCreateForm />
    </div>
  );
}

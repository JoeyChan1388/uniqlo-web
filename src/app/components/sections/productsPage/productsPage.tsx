import { Icon } from "@iconify/react";
import styles from "./productsPage.module.css";
import Button from "../../common/button/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// ------------------------------------------------------------------

interface ProductsPageProps {
  title: string;
  queryKey?: string;
}

// ------------------------------------------------------------------

export default function ProductsPage({ title, queryKey }: ProductsPageProps) {
  // React Query Client
  const queryClient = useQueryClient();

  return (
    <div className={styles.container}>
      <h1>{title}</h1>

      <StoreSelector />

      <ProductsGridView />
    </div>
  );
}

// ------------------------------------------------------------------

function StoreSelector() {
  return (
    <div className={styles.storeSelectorRow}>
      <div>
        <Icon
          color="var(--text-primary)"
          icon="mdi:store-marker"
          width={22}
          height={22}
        />
        <p>Select a store to search store stock</p>
      </div>
      <Button variant="text" size="small" href="/store-locator">
        Select Store
      </Button>
    </div>
  );
}

// ------------------------------------------------------------------

function ProductsGridView() {
  return <div>Products Grid View</div>;
}

"use client";

import styles from "./storeLocatorPage.module.css";

import { StoreLocationItem } from "../storeLocatorItem/storeLocatorItem";
import { CONST_DEFAULT_LOCATIONS } from "../../constants";

import Button from "@/components/common/button/button";
import TextInput from "@/components/common/textInput/textInput";

// ------------------------------------------------------------------

export default function StoreLocatorPage() {
  const defaultLocations = CONST_DEFAULT_LOCATIONS;

  return (
    <div className={styles.container}>
      <h1>Select a Store</h1>

      <p>
        By selecting a store, you can view its location and stock availability.
      </p>

      <div className={styles.storeLocatorContainer}>
        <TextInput
          placeholder="Enter city, postal code, or store name"
          size="large"
          variant="outlined"
          rounded
          style={{
            width: "600px",
          }}
        />

        <Button variant="text" size="medium">
          Use current location
        </Button>

        <div className={styles.storeList}>
          {defaultLocations.map((location) => (
            <StoreLocationItem key={location.id} location={location} />
          ))}
        </div>
      </div>
    </div>
  );
}

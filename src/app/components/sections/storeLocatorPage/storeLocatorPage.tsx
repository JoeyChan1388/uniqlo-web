"use client";

import styles from "./storeLocatorPage.module.css";

import type { Location } from "@/types/locations";
import { useSelectedLocation } from "@/app/stores/SelectedLocationStore";

import Button from "@/app/components/common/button/button";
import TextInput from "@/app/components/common/textInput/textInput";

// ------------------------------------------------------------------

const CONST_DEFAULT_LOCATIONS: Location[] = [
  {
    id: "1",
    name: "UNIQLO Downtown",
    address: "123 Main St",
    city: "Manhattan",
    postalCode: "12345",
    country: "USA",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: "2",
    name: "UNIQLO Uptown",
    address: "456 Elm St",
    city: "Queens",
    postalCode: "12346",
    country: "USA",
    lat: 40.7831,
    lng: -73.9712,
  },
];

// ------------------------------------------------------------------

export default function StoreLocatorPage() {
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
          {CONST_DEFAULT_LOCATIONS.map((location) => (
            <StoreLocationItem key={location.id} location={location} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------

function StoreLocationItem({ location }: { location: Location }) {
  // Access selected location state from the store
  const { selectedLocation, setSelectedLocation } = useSelectedLocation();

  // Check if this location is currently selected in the store
  const currentlySelected = selectedLocation?.id === location.id;

  return (
    <div key={location.id} className={styles.storeItem}>
      <h3>{location.name}</h3>
      <p>
        {location.address}, {location.city}, {location.postalCode}
      </p>
      <Button
        variant="text"
        size="small"
        disabled={currentlySelected}
        onClick={() => setSelectedLocation(location)}
      >
        {currentlySelected ? "Selected" : "Select Store"}
      </Button>
    </div>
  );
}

import { Location } from "@/types/locations";

// ------------------------------------------------------------------

/**
 * Default list of uniqlo store locations.
 */
export const CONST_DEFAULT_LOCATIONS: Location[] = [
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
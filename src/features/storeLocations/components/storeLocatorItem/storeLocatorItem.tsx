import Button from "@/components/common/button/button";

import { Location } from "@/types/locations";
import { useSelectedLocation } from "@/stores/SelectedLocationStore";

// ------------------------------------------------------------------

export function StoreLocationItem({ location }: { location: Location }) {
  // Access selected location state from the store
  const { selectedLocation, setSelectedLocation } = useSelectedLocation();

  // Check if this location is currently selected in the store
  const currentlySelected = selectedLocation?.id === location.id;

  return (
    <div key={location.id}>
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
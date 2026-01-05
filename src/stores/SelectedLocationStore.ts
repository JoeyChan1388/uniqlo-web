import { create } from "zustand";
import { Location } from "@/types/locations";

// ------------------------------------------------------------------

/**
 * Represents the store for managing the state of the selected uniqlo location.
 */
type SelectedLocationStore = {
  selectedLocation: Location | undefined;
  setSelectedLocation: (selectedLocation: Location) => void;
  emptySelectedLocation: () => void;
};

// ------------------------------------------------------------------

const CONST_DEFAULT_LOCATION: Location | undefined = undefined;

// ------------------------------------------------------------------

/**
 * Zustand store for managing the selected uniqlo store location.
 *
 * - `selectedLocation`: The currently selected uniqlo store location.
 * - `setSelectedLocation`: A function to set the selected uniqlo store location.
 * - `emptySelectedLocation`: A function to reset the selected location to default values.
 */
export const useSelectedLocation = create<SelectedLocationStore>((set) => ({
  selectedLocation: CONST_DEFAULT_LOCATION,
  setSelectedLocation: (selectedLocation: Location) =>
    set({ selectedLocation }),
  emptySelectedLocation: () =>
    set({
      selectedLocation: CONST_DEFAULT_LOCATION,
    }),
}));

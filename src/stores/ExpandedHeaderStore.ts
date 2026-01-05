import { create } from "zustand";

// ------------------------------------------------------------------

/**
 * Represents the store for managing the state of the expanded header.
 */
export type ExpandedHeaderStore = {
  openExpandedHeader: boolean;
  setOpenExpandedHeader: (open: boolean) => void;
  closeExpandedHeader: () => void;
};

// ------------------------------------------------------------------

/**
 * Zustand store for managing the expanded header state.
 * 
 * - `openExpandedHeader`: A boolean indicating whether the expanded header is open.
 * - `setOpenExpandedHeader`: A function to set the open state of the expanded header.
 * - `closeExpandedHeader`: A function specifically to close the expanded header.
 */
export const useExpandedHeader = create<ExpandedHeaderStore>((set) => ({
  openExpandedHeader: false,
  setOpenExpandedHeader: (open: boolean) => set({ openExpandedHeader: open }),
  closeExpandedHeader: () => set({ openExpandedHeader: false }),
}));

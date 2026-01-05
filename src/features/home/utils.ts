import type { VerticalCarouselItemData } from "./types";

// ------------------------------------------------------------------

export const clamp = (n: number, items: Array<VerticalCarouselItemData>) =>
  Math.max(0, Math.min(items.length - 1, n));
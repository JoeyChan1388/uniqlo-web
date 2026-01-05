import styles from "./verticalCarouselItem.module.css";

import type { VerticalCarouselItemData } from "@/features/home/types";

// ------------------------------------------------------------------

export interface VerticalCarouselItemProps {
  item: VerticalCarouselItemData;
}

// ------------------------------------------------------------------

export default function VerticalCarouselItem({
  item,
}: VerticalCarouselItemProps) {
  return (
    <div
      className={styles.verticalCarouselItem}
      style={{
        backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : "none",
      }}
    >
      <div className={styles.verticalCarouselItemContent}>{item.content}</div>
    </div>
  );
}

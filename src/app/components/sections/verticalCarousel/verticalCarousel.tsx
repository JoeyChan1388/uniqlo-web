"use client";

import { motion } from "framer-motion";
import styles from "./verticalCarousel.module.css";
import { useEffect, useRef, useState } from "react";

// ------------------------------------------------------------------

export type VerticalCarouselItem = {
  id: string;
  imageUrl: string;
  content?: React.ReactNode;
};

// ------------------------------------------------------------------

interface VerticalCarouselProps {
  items: Array<VerticalCarouselItem>;
}

// ------------------------------------------------------------------

interface VerticalCarouselItemProps {
  item: VerticalCarouselItem;
}

// ------------------------------------------------------------------

const clamp = (n: number, items: Array<VerticalCarouselItem>) =>
  Math.max(0, Math.min(items.length - 1, n));

// ------------------------------------------------------------------

export default function VerticalCarousel({ items }: VerticalCarouselProps) {
  // Local State
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState(0);

  // Refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animatingRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  // Effect for setting height on mount and resize
  useEffect(() => {
    const setH = () => setHeight(window.innerHeight || 0);
    setH();
    window.addEventListener("resize", setH);
    return () => window.removeEventListener("resize", setH);
  }, []);

  // Handlers
  const jumpTo = (next: number) => {
    if (animatingRef.current) return;
    next = clamp(next, items);

    // No change
    if (next === index) return;

    animatingRef.current = true;
    setIndex(next);

    // Cooldown
    window.setTimeout(() => {
      animatingRef.current = false;
    }, 300);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 20) return;
    if (e.deltaY > 0) jumpTo(index + 1);
    else jumpTo(index - 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0]?.clientY ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current == null) return;
    const endY = e.changedTouches[0]?.clientY ?? 0;
    const delta = touchStartY.current - endY;
    const threshold = 50;
    if (delta > threshold) jumpTo(index + 1);
    else if (delta < -threshold) jumpTo(index - 1);
    touchStartY.current = null;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      jumpTo(index + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      jumpTo(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      jumpTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      jumpTo(items.length - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.verticalCarouselContainer}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="region"
      aria-roledescription="vertical carousel"
    >
      <motion.div
        className={styles.verticalCarouselInner}
        animate={{ y: -(index * (height || 0)) }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
        style={{ willChange: "transform" }}
      >
        {items.map((item) => (
          <VerticalCarouselItem key={item.id} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

// ------------------------------------------------------------------

function VerticalCarouselItem({ item }: VerticalCarouselItemProps) {
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

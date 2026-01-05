"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { useExpandedHeader } from "@/stores/ExpandedHeaderStore";

import type { NavItem } from "@/types/navigation";

// ------------------------------------------------------------------

export function HeaderPrimaryNavItem({ item }: { item: NavItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const { setOpenExpandedHeader } = useExpandedHeader();

  useEffect(() => {
    // After 500ms of hovering, open the expanded header if still hovered
    const hoverTimeout = setTimeout(() => {
      if (isHovered) {
        setOpenExpandedHeader(true);
      }
    }, 500);
    return () => clearTimeout(hoverTimeout);
  }, [isHovered, setOpenExpandedHeader]);

  return (
    <li
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
    >
      <Link href={item.href}>{item.label.toUpperCase()}</Link>
    </li>
  );
}

import Link from "next/link";
import { NavItem } from "@/types/navigation";

// ------------------------------------------------------------------

export function HeaderPrimaryNavItem({ item }: { item: NavItem }) {
  return (
    <li>
      <Link href={item.href}>{item.label.toUpperCase()}</Link>
    </li>
  );
}
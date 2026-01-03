import Link from "next/link";
import Logo from "@/app/components/common/logo";
import IconButton from "@/app/components/common/iconButton/iconButton";

import { Icon } from "@iconify/react";
import { NavItem } from "@/types/navigation";
import { HeaderPrimaryNavItem } from "@/app/components/layout/navItems/headerPrimaryNavItem";

// ------------------------------------------------------------------

export const CONST_PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: "Women", href: "/" },
  { label: "Men", href: "/men" },
  { label: "Kids", href: "/kids" },
  { label: "Baby", href: "/baby" },
];

// ------------------------------------------------------------------

export const CONST_HEADER_ACTIONS = [
  { icon: "mdi:search", href: "/search" },
  { icon: "mdi:heart-outline", href: "/favorites" },
  { icon: "mdi:user-outline", href: "/account" },
  { icon: "mdi:cart-outline", href: "/cart" },
  { icon: "mdi:menu", href: "/menu" },
];

// ------------------------------------------------------------------

export const CONST_HEADER_SLOTS = {
  leftSlot: (
    <div>
      <Link href="/">
        <Logo />
      </Link>
    </div>
  ),
  centerSlot: (
    <nav>
      <ul className="navLinks">
        {CONST_PRIMARY_NAV_ITEMS.map((item) => (
          <HeaderPrimaryNavItem key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  ),
  rightSlot: (
    <div>
      <ul className="headerActions">
        {CONST_HEADER_ACTIONS.map((action) => (
          <IconButton key={action.href}>
            <Icon fontSize={22} icon={action.icon} />
          </IconButton>
        ))}
      </ul>
    </div>
  ),
};

"use client";

import Link from "next/link";
import Logo from "@/components/common/logo";
import IconButton from "@/components/common/iconButton/iconButton";

import { Icon } from "@iconify/react";
import { NavItem } from "@/types/navigation";
import type { ProductTypeListing } from "@/types/products";
import { useExpandedHeader } from "@/stores/ExpandedHeaderStore";
import { HeaderPrimaryNavItem } from "@/components/layout/navItems/headerPrimaryNavItem";

// ------------------------------------------------------------------

export const CONST_PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: "Women", href: "/" },
  { label: "Men", href: "/men" },
  { label: "Kids", href: "/kids" },
  { label: "Baby", href: "/baby" },
];

// ------------------------------------------------------------------

export const CONST_HEADER_ACTIONS = [
  {
    id: "search",
    icon: "mdi:search",
    onClick: () => {
      useExpandedHeader.getState().setOpenExpandedHeader(true);
    },
  },
  { id: "favorites", icon: "mdi:heart-outline", href: "/favorites" },
  { id: "login", icon: "mdi:user-outline", href: "/members/login" },
  { id: "cart", icon: "mdi:cart-outline", href: "/cart" },
  {
    id: "menu",
    icon: "mdi:menu",
    onClick: () => {
      useExpandedHeader.getState().setOpenExpandedHeader(true);
    },
  },
];

// ------------------------------------------------------------------

export const CONST_MAIN_ROUTES = ["/", "/women", "/men", "/kids", "/baby"];

// ------------------------------------------------------------------

export const CONST_HEADER_SLOTS = {
  announcementBarSlot: (
    <div className="announcementBar">
      <div className="announcementBarContent">
        <p>Winter sale is on, while supplies last!</p>
      </div>
    </div>
  ),
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
          <li key={action.id}>
            <IconButton
              key={action.id}
              href={action.href}
              onClick={action.onClick}
            >
              <Icon fontSize={22} icon={action.icon} />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  ),
};

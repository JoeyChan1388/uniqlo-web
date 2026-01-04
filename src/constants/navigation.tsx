"use client";

import Link from "next/link";
import Logo from "@/app/components/common/logo";
import IconButton from "@/app/components/common/iconButton/iconButton";

import { Icon } from "@iconify/react";
import { NavItem } from "@/types/navigation";
import { useExpandedHeader } from "@/app/stores/useExpandedHeader";
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
  {
    icon: "mdi:menu",
    href: "/menu",
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
          <IconButton key={action.href} onClick={action.onClick}>
            <Icon fontSize={22} icon={action.icon} />
          </IconButton>
        ))}
      </ul>
    </div>
  ),
};

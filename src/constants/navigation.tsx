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

// ------------------------------------------------------------------

export const CONST_PRODUCT_TYPE_LISTINGS_WOMEN: ProductTypeListing[] = [
  // Clothing Categories
  {
    id: "outerwear",
    displayName: "Outerwear",
    imageUrl: "/product_types/women/outerwear.jpg",
    href: "/women/outerwear",
  },
  {
    id: "tops",
    displayName: "T-Shirts, Fleece & Sweats",
    imageUrl: "/product_types/women/tops.jpg",
    href: "/women/tops",
  },
  {
    id: "sweaters",
    displayName: "Sweaters & Cardigans",
    imageUrl: "/product_types/women/sweaters.jpg",
    href: "/women/sweaters",
  },
  {
    id: "shirts",
    displayName: "Shirts & Blouses",
    imageUrl: "/product_types/women/shirts.jpg",
    href: "/women/shirts",
  },
  {
    id: "bottoms",
    displayName: "Bottoms",
    imageUrl: "/product_types/women/bottoms.jpg",
    href: "/women/bottoms",
  },
  {
    id: "dresses",
    displayName: "Dresses & Skirts",
    imageUrl: "/product_types/women/dresses.jpg",
    href: "/women/dresses",
  },
  {
    id: "innerwear",
    displayName: "Innerwear & Underwear",
    imageUrl: "/product_types/women/innerwear.jpg",
    href: "/women/innerwear",
  },
  {
    id: "loungewear",
    displayName: "Loungewear & Home",
    imageUrl: "/product_types/women/loungewear.jpg",
    href: "/women/loungewear",
  },
  {
    id: "accessories",
    displayName: "Accessories",
    imageUrl: "/product_types/women/accessories.jpg",
    href: "/women/accessories",
  },
  // Technology Collections
  {
    id: "heattech",
    displayName: "HEATTECH",
    imageUrl: "/branding/heattech-logo.jpg",
    href: "/collections/heattech",
  },
  {
    id: "airism",
    displayName: "AIRism",
    imageUrl: "/branding/airism-logo.jpg",
    href: "/collections/airism",
  },
  {
    id: "sport-utility",
    displayName: "Sport Utility Wear",
    imageUrl: "/branding/suw.jpg",
    href: "/collections/sport-utility",
  },
  {
    id: "uv-protection",
    displayName: "UV Protection",
    imageUrl: "/branding/uv-protection.jpg",
    href: "/collections/uv-protection",
  },
  // Collaborations & Special Collections
  {
    id: "special-collaborations",
    displayName: "Special Collaborations",
    imageUrl: "/branding/collab.jpg",
    href: "/collections/collaborations",
  },
  {
    id: "uniqlo-c",
    displayName: "UNIQLO : C",
    imageUrl: "/product_types/collections/uniqlo-c.jpg",
    href: "/collections/uniqlo-c",
  },
  {
    id: "jw-anderson",
    displayName: "UNIQLO and JW ANDERSON",
    imageUrl: "/product_types/collections/jw-anderson.jpg",
    href: "/collections/jw-anderson",
  },
  {
    id: "ut-graphic",
    displayName: "UT: Graphic Tees",
    imageUrl: "/product_types/collections/ut-graphic.jpg",
    href: "/collections/ut-graphic",
  },
  {
    id: "cashmere",
    displayName: "Cashmere",
    imageUrl: "/product_types/collections/cashmere.jpg",
    href: "/collections/cashmere",
  },
  {
    id: "pufftech",
    displayName: "PUFFTECH",
    imageUrl: "/branding/pufftech.jpg",
    href: "/collections/pufftech",
  },
  {
    id: "limited-time",
    displayName: "Limited-Time Offers",
    imageUrl: "/product_types/collections/limited-time.jpg",
    href: "/collections/limited-time",
  },
  // Shopping Categories
  {
    id: "sale",
    displayName: "Sale",
    imageUrl: "/product_types/shopping/sale.jpg",
    href: "/sale",
  },
  {
    id: "new-arrivals",
    displayName: "New Arrivals",
    imageUrl: "/product_types/shopping/new-arrivals.jpg",
    href: "/new-arrivals",
  },
  {
    id: "coming-soon",
    displayName: "Coming Soon",
    imageUrl: "/product_types/shopping/coming-soon.jpg",
    href: "/coming-soon",
  },
  {
    id: "best-sellers",
    displayName: "Best Sellers",
    imageUrl: "/product_types/shopping/best-sellers.jpg",
    href: "/best-sellers",
  },
  {
    id: "online-exclusives",
    displayName: "Online Exclusives",
    imageUrl: "/product_types/shopping/online-exclusives.jpg",
    href: "/online-exclusives",
  },
  {
    id: "multibuy-offers",
    displayName: "Multibuy Offers",
    imageUrl: "/product_types/shopping/multibuy-offers.jpg",
    href: "/multibuy-offers",
  },
];

// ------------------------------------------------------------------

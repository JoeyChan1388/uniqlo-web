import type { Product } from "@/types/products";

// ------------------------------------------------------------------

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "PUFFTECH Parka",
    price: 89.9,
    category: "women",
    type: "outerwear",
    sizesAvailable: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Women's Ultra Light Down Jacket",
    price: 79.99,
    category: "women",
    type: "outerwear",
    sizesAvailable: ["XS", "S", "M", "L"],
  },
  {
    id: "3",
    name: "Seamless Down Parka",
    price: 179.99,
    salePrice: 129.99,
    category: "women",
    type: "outerwear",
    sizesAvailable: ["XS", "S", "M", "L"],
  },
  {
    id: "4",
    name: "PUFFTECH Compact Jacket",
    price: 89.99,
    salePrice: 69.99,
    category: "women",
    type: "outerwear",
    sizesAvailable: ["M", "L", "XL", "XXL"],
  },
  {
    id: "5",
    name: "PUFFTECH Vest",
    price: 79.99,
    salePrice: 59.99,
    category: "women",
    type: "outerwear",
    sizesAvailable: ["M", "L", "XL", "XXL"],
  },
];

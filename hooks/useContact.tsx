"use client";

import { useEffect, useState } from "react";

import { Product } from "@/types/product";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return products;
}

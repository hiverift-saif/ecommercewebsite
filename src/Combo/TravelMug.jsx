import React, { useEffect, useState } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";

import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";

export default function TravelMug() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { addItem } = useCart();

  // ⭐ TRAVEL MUG PRODUCTS
  const products = [
    {
      id: 501,
      title: "Stainless Steel Travel Mug",
      originalPrice: 1499,
      salePrice: 999,
      discount: "-33%",
      category: "Travel Mug",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/travelmug1_605x.jpg",
        "https://www.earthstore.in/cdn/shop/files/travelmug2_605x.jpg",
      ],
    },
    {
      id: 502,
      title: "Double Wall Coffee Travel Mug",
      originalPrice: 1299,
      salePrice: 799,
      discount: "-38%",
      category: "Travel Mug",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/coffee_travel1_605x.jpg",
        "https://www.earthstore.in/cdn/shop/files/coffee_travel2_605x.jpg",
      ],
    },
    {
      id: 503,
      title: "Premium Hot & Cold Travel Bottle",
      originalPrice: 1699,
      salePrice: 1199,
      discount: "-29%",
      category: "Travel Mug",
      inStock: false,
      images: [
        "https://www.earthstore.in/cdn/shop/files/hotcold1_605x.jpg",
        "https://www.earthstore.in/cdn/shop/files/hotcold2_605x.jpg",
      ],
    },
  ];

  // ⭐ LOAD PRODUCTS INTO FILTER CONTEXT
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
  }, []);

  return (
    <div className="w-full relative">
      {/* SIDEBAR FILTER */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* PAGE HEADER */}
      <FilterHeader total={filteredProducts.length} />

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 my-10">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- PRODUCT CARD ---------------------------- */

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [index, setIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* PRODUCT IMAGE */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[index]}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          alt={product.title}
        />

        {/* DISCOUNT BADGE */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* IMAGE SWITCH DOTS */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === i ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT DETAILS */}
      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>

      <div className="flex gap-2 items-center mt-1">
        <span className="text-xl font-bold">₹{product.salePrice}</span>
        <span className="line-through text-gray-500">₹{product.originalPrice}</span>
      </div>

      {/* ADD TO CART BUTTON */}
      <button
        onClick={() =>
          addItem({
            id: product.id,
            title: product.title,
            price: product.salePrice,
            image: product.images[0],
          })
        }
        className="mt-3 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600"
      >
        Add to Cart
      </button>
    </div>
  );
}

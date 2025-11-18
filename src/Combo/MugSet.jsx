// src/Combo/MugSet.jsx
import React, { useState, useEffect } from "react";
import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";

import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";

export default function MugSet() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();

  const { addItem } = useCart();

  // ⭐ PRODUCT LIST
  const products = [
    {
      id: 701,
      title: "Premium Coffee Mug Set (Pack of 6)",
      category: "mug set",
      originalPrice: 1999,
      salePrice: 1299,
      discount: "-35%",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Solid_Multicolor_Coffee_Mug_Set_of_6_-_The_Earth_Store_-_-_-2304533_605x.progressive.jpg?v=1723312614",
        "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302729_605x.jpg?v=1723307155",
      ],
    },
    {
      id: 702,
      title: "Matte Ceramic Mug Set of 4",
      category: "mug set",
      originalPrice: 1499,
      salePrice: 899,
      discount: "-40%",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 703,
      title: "Designer Mug Set (Pack of 2)",
      category: "mug set",
      originalPrice: 999,
      salePrice: 599,
      discount: "-45%",
      inStock: false,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302726_605x.progressive.jpg?v=1723307155",
        "https://www.earthstore.in/cdn/shop/files/Solid_Multicolor_Coffee_Mug_Set_of_6_-_The_Earth_Store_-_-_-2304533_605x.progressive.jpg?v=1723312614",
      ],
    },
  ];

  // ⭐ Load products into FilterContext
  useEffect(() => {
    setAllProducts(products);
    setFilteredProducts(products);
  }, []);

  // ⭐ IMAGE SLIDER INDEX
  const [imageIndex, setImageIndex] = useState(products.map(() => 0));

  const prevImage = (i, product) => {
    setImageIndex((old) => {
      const copy = [...old];
      copy[i] =
        copy[i] === 0 ? product.images.length - 1 : copy[i] - 1;
      return copy;
    });
  };

  const nextImage = (i, product) => {
    setImageIndex((old) => {
      const copy = [...old];
      copy[i] =
        copy[i] === product.images.length - 1 ? 0 : copy[i] + 1;
      return copy;
    });
  };

  // ⭐ Add to Cart
  const addToCart = (product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.salePrice,
      image: product.images[0],
      quantity: 1,
    });
  };

  return (
    <div className="px-4 py-6 md:px-0 md:py-0">

      {/* FILTER SIDEBAR */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <div className="flex-1">
        {/* HEADER */}
        <FilterHeader total={filteredProducts.length} />

        {/* GRID */}
        <div className="mt-10 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, i) => (
            <div
              key={product.id}
              className="group bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-2xl"
            >
              {/* IMAGE SECTION */}
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={product.images[imageIndex[i]]}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Discount */}
                <div className="absolute top-3 left-3">
                  <span className="bg-red-600 text-white text-xs px-3 py-1 rounded">
                    {product.discount}
                  </span>
                </div>

                {/* Slider Buttons */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 inset-x-0 flex justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="flex gap-3 bg-white/90 p-2 rounded-full shadow">
                      <button
                        onClick={() => prevImage(i, product)}
                        className="px-2 py-1 rounded-full hover:bg-gray-200"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => nextImage(i, product)}
                        className="px-2 py-1 rounded-full hover:bg-gray-200"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="p-5">
                <h3 className="text-lg font-medium line-clamp-2 mb-3">
                  {product.title}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm line-through text-gray-500">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-2xl font-bold">
                    ₹{product.salePrice}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-teal-500 text-white py-3.5 rounded-lg hover:bg-teal-600"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

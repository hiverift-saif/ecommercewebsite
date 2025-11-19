// src/TableDecor/TableDecor.jsx
import { useFilter } from "../context/FilterContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import ResponsiveImage from "../TableDecorcontent/ResponsiveImage";
import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";

import { useCart } from "../context/CartContext";

export default function TableDecor() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = useFilter();
const { setAllWebsiteProducts } = useSearch();



  const { addItem } = useCart();

  // ⭐ ALL ORIGINAL PRODUCTS
  const products = [
    {
      id: 1,
      title: "Modern Ceramic Vase",
      category: "decor",
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
      id: 2,
      title: "Classic Glass Cup",
      category: "glass",
      originalPrice: 599,
      salePrice: 349,
      discount: "-42%",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 3,
      title: "Minimal Coffee Mug",
      category: "mug",
      originalPrice: 799,
      salePrice: 499,
      discount: "-38%",
      inStock: false,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
  ];

  // ⭐ LOAD PRODUCTS INTO FILTER CONTEXT
  useEffect(() => {
    setAllProducts(products);        // filter ke liye actual products
    setFilteredProducts(products);
     setAllWebsiteProducts(products);    // load hone par dikh jaye
  }, []);







  // 🖼️ tracking image index for each product
  const [imageIndex, setImageIndex] = useState(products.map(() => 0));

  const prevImage = (i, product) => {
    setImageIndex((old) => {
      const copy = [...old];
      copy[i] = copy[i] === 0 ? product.images.length - 1 : copy[i] - 1;
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
      {/* TOP BANNER */}
      <ResponsiveImage />

      {/* FILTER SIDEBAR */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      <div className="flex-1 min-h-screen">
        {/* HEADER */}
        <FilterHeader total={filteredProducts.length} />

        {/* PRODUCT GRID */}
        <div className="mt-10 px-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, i) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* IMAGE SECTION */}
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={product.images[imageIndex[i]]}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  alt={product.title}
                />

                {/* DISCOUNT LABEL */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded">
                    {product.discount}
                  </span>
                </div>

                {/* IMAGE SWITCH BUTTONS */}
                {product.images.length > 1 && (
                  <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3 bg-white/90 p-2 rounded-full shadow-xl">
                      <button
                        onClick={() => prevImage(i, product)}
                        className="p-2 hover:bg-gray-200 rounded-full"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => nextImage(i, product)}
                        className="p-2 hover:bg-gray-200 rounded-full"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-3">
                  {product.title}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.originalPrice}.00
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.salePrice}.00
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3.5 rounded-lg flex justify-center gap-2"
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

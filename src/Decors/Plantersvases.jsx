import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useState, useEffect } from "react";

export default function Plantersvases() {
  const {      isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts, } = useFilter();
  const { addItem } = useCart();

  // PLANETERS & VASES PRODUCTS
  const products = [
    {
      id: 201,
      title: "Classic Ceramic Planter",
      originalPrice: 1299,
      salePrice: 899,
      discount: "-31%",
      category: "Planter",
      images: [
         "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 202,
      title: "Designer Flower Vase",
      originalPrice: 1599,
      salePrice: 1099,
      discount: "-31%",
      category: "Vase",
      images: [
         "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 203,
      title: "Wooden Indoor Planter",
      originalPrice: 1999,
      salePrice: 1499,
      discount: "-25%",
      category: "Wooden Planter",
      images: [
         "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
  ];

  // LOAD INIT PRODUCTS
useEffect(() => {
  setAllProducts(products);        // ⭐ VERY IMPORTANT
  setFilteredProducts(products);   // ⭐ show on load
}, []);


  return (
    <div className="w-full px-4 py-6 relative">

      {/* Desktop Banner */}
      {/* <div className="hidden sm:block">
        <img
          src="https://www.earthstore.in/cdn/shop/files/Planters_vases_1900x.progressive.jpg"
          className="w-full h-auto object-cover"
          alt="Planters Banner"
        />
      </div> */}

      {/* Mobile Banner */}
      {/* <div className="block sm:hidden">
        <img
          src="https://www.earthstore.in/cdn/shop/files/Planters_vases_550x.progressive.jpg"
          className="w-full h-auto object-cover"
          alt="Planters Mobile Banner"
        />
      </div> */}

      {/* SIDEBAR FILTER */}
      <SidebarFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* FILTER HEADER */}
      <FilterHeader total={filteredProducts.length} />

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}


/* ---------------- PRODUCT CARD ---------------- */
function ProductCard({ product }) {
  const { addItem } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition p-3 overflow-hidden">

      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[currentIndex]}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          alt={product.title}
        />

        <div className="absolute top-3 left-3">
          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>

        {/* Image indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
      <div className="flex gap-2 items-center mt-1">
        <span className="text-xl font-bold">₹{product.salePrice}</span>
        <span className="line-through text-gray-500">₹{product.originalPrice}</span>
      </div>

      {/* ADD TO CART */}
      <button
        onClick={() =>
          addItem({
            id: product.id,
            title: product.title,
            price: product.salePrice,
            image: product.images[0],
          })
        }
        className="mt-3 w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600 flex items-center justify-center gap-2"
      >
        Add to Cart
      </button>
    </div>
  );
}

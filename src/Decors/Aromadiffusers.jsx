import { useFilter } from "../context/FilterContext";
import { useCart } from "../context/CartContext";
import SidebarFilter from "../components/Filters/SidebarFilter";
import FilterHeader from "../components/Filters/FilterHeader";
import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";


export default function Aromadiffusers() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    setAllProducts,
    filteredProducts,
    setFilteredProducts
  } = useFilter();
  const { setAllWebsiteProducts } = useSearch();

  const { addItem } = useCart();

  // PRODUCTS LIST
  const products = [
    {
      id: 101,
      title: "Premium Aroma Diffuser",
      originalPrice: 1999,
      salePrice: 1299,
      discount: "-35%",
      category: "aroma diffuser",
      subcategory: "diffuser",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 102,
      title: "Ceramic Aroma Lamp",
      originalPrice: 1499,
      salePrice: 899,
      discount: "-40%",
      category: "ceramic",
      subcategory: "lamp",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
    {
      id: 103,
      title: "Essential Oil Burner",
      originalPrice: 999,
      salePrice: 599,
      discount: "-38%",
      category: "oil burner",
      subcategory: "burner",
      inStock: true,
      images: [
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      ],
    },
  ];

  // ⭐ LOAD PRODUCTS INTO FILTER CONTEXT
  useEffect(() => {
    setAllProducts(products);        // master data
    setFilteredProducts(products);   // default show all
     setAllWebsiteProducts(products); 
  }, []);

  return (
    <div className="w-full relative">
      
      {/* Banner */}
      <div className="hidden sm:block">
        <img
          src="https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Aroma_diffusers_1905x.progressive.png.jpg?v=1736142322"
          className="w-full h-auto object-cover"
          alt="Aroma Banner"
        />
      </div>
      <div className="block sm:hidden">
        <img
          src="https://www.earthstore.in/cdn/shop/files/The_Earth_Store_Aroma_diffusers_550x.progressive.png.jpg?v=1736142322"
          className="w-full h-auto object-cover"
          alt="Aroma Mobile"
        />
      </div>

      {/* Sidebar */}
      <SidebarFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

      {/* Filter Header */}
      <FilterHeader total={filteredProducts.length} />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-8 mb-10 mt-10">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </div>
  );
}

/* --------- PRODUCT CARD ----------- */
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

        {/* image dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
      <div className="flex gap-2 items-center mt-1">
        <span className="text-xl font-bold">₹{product.salePrice}</span>
        <span className="line-through text-gray-500">₹{product.originalPrice}</span>
      </div>

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
        Add To Cart
      </button>

    </div>
  );
}

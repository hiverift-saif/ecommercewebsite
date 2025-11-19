import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { allWebsiteProducts } = useSearch();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (allWebsiteProducts.length > 0) {
      const found = allWebsiteProducts.find(
        (item) => item.id === parseInt(id)
      );
      setProduct(found);
    }
  }, [allWebsiteProducts, id]);

  if (!product) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading product...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* LEFT – IMAGE SECTION */}
      <div>
        <img
          src={product.images[activeImg]}
          className="w-full rounded-xl shadow"
          alt={product.title}
        />

        {/* Thumbnail images */}
        <div className="flex gap-3 mt-5">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setActiveImg(i)}
              className={`w-24 h-24 rounded-lg cursor-pointer border ${
                activeImg === i
                  ? "border-teal-500"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT – DETAILS */}
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>

        <div className="flex items-center gap-4 mt-3">
          <p className="text-2xl font-bold text-teal-600">
            ₹{product.salePrice}
          </p>
          <p className="line-through text-gray-500 text-lg">
            ₹{product.originalPrice}
          </p>
        </div>

        <p className="mt-4 text-gray-600 leading-relaxed">
          This is a premium product with high-quality material and
          modern design. Perfect for home decor & gifting.
        </p>

        <button
          onClick={() =>
            addItem({
              id: product.id,
              title: product.title,
              price: product.salePrice,
              image: product.images[0],
              quantity: 1,
            })
          }
          className="mt-6 bg-teal-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-teal-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

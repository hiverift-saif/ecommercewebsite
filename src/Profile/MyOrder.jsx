import React from "react";

export default function MyOrder() {
  // Example dummy orders (API aayega tab replace kar dena)
  const orders = [
    {
      id: "ORD123456",
      date: "12 Jan 2025",
      status: "Delivered",
      total: 1299,
      image:
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
      title: "Premium Aroma Diffuser",
    },
    {
      id: "ORD123987",
      date: "08 Jan 2025",
      status: "Out for Delivery",
      total: 999,
      image:
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300468_605x.jpg?v=1724153805",
      title: "Ceramic Aroma Lamp",
    },
    {
      id: "ORD123321",
      date: "03 Jan 2025",
      status: "Shipped",
      total: 1499,
      image:
        "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_605x.progressive.jpg?v=1724153805",
      title: "Designer Mug Set",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      <div className="max-w-5xl mx-auto space-y-6">
        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-4">
              Looks like you haven't placed any orders.
            </p>
            <a
              href="/"
              className="bg-black text-white px-5 py-2 rounded-lg text-sm"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-3 mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Order ID: {order.id}
                  </h3>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full mt-2 md:mt-0
                  ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-amber-100 text-amber-700"
                  }
                `}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Content */}
              <div className="flex gap-4">
                <img
                  src={order.image}
                  className="w-20 h-20 rounded-lg object-cover"
                  alt={order.title}
                />

                <div className="flex-1">
                  <h4 className="font-semibold">{order.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Total Amount: ₹{order.total}
                  </p>

                  <div className="flex gap-3 mt-3">
                    <button className="px-4 py-2 text-xs border rounded-lg hover:bg-gray-100 transition">
                      View Details
                    </button>

                    <button className="px-4 py-2 text-xs border rounded-lg hover:bg-gray-100 transition">
                      Download Invoice
                    </button>

                    {order.status === "Delivered" && (
                      <button className="px-4 py-2 text-xs border rounded-lg hover:bg-gray-100 transition">
                        Return / Replace
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

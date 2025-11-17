// src/admin/pages/OrderDetails.jsx
import { ArrowLeft, Package, MapPin, User, CreditCard } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // DEMO ORDER
  const order = {
    id,
    customer: "John Smith",
    email: "john@example.com",
    phone: "+1 234 567 8900",

    shipping: {
      address1: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },

    items: [
      {
        id: 1,
        name: "Classic White Dinner Plates Set",
        sku: "CRK-DIN-001",
        qty: 2,
        price: 79.98,
        img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=100&h=100&fit=crop",
      },
      {
        id: 2,
        name: "Ceramic Bowl Set (6 Pieces)",
        sku: "CRK-BWL-002",
        qty: 1,
        price: 32.5,
        img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=100&h=100&fit=crop",
      },
    ],
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">

        {/* Back + Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div>
            <h1 className="text-lg font-semibold">Order Details</h1>
            <p className="text-gray-600">{id}</p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* ORDER ITEMS */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 pt-6 pb-4 border-b">
                <h4 className="flex items-center gap-2 text-lg font-medium">
                  <Package className="w-5 h-5" /> Order Items
                </h4>
              </div>

              <div className="px-6 pb-6 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 pb-4 border-b last:border-b-0"
                  >
                    <img
                      src={item.img}
                      className="w-16 h-16 rounded object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-sm">{item.name}</h3>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>

                    <div className="text-right">${item.price}</div>
                  </div>
                ))}

                {/* Total */}
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>$112.48</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>$10.00</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>$12.25</span>
                  </div>

                  <div className="flex justify-between border-t pt-2 font-medium">
                    <span>Total</span>
                    <span>$134.73</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SHIPPING */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 pt-6 pb-4 border-b">
                <h4 className="flex items-center gap-2 text-lg font-medium">
                  <MapPin className="w-5 h-5" /> Shipping Address
                </h4>
              </div>

              <div className="px-6 pb-6 space-y-1">
                <p>{order.shipping.address1}</p>
                <p>
                  {order.shipping.city}, {order.shipping.state}{" "}
                  {order.shipping.zip}
                </p>
                <p>{order.shipping.country}</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* CUSTOMER */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 pt-6 pb-4 border-b">
                <h4 className="flex items-center gap-2 text-lg font-medium">
                  <User className="w-5 h-5" /> Customer Info
                </h4>
              </div>

              <div className="px-6 pb-6 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p>{order.customer}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p>{order.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p>{order.phone}</p>
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 pt-6 pb-4 border-b">
                <h4 className="flex items-center gap-2 text-lg font-medium">
                  <CreditCard className="w-5 h-5" /> Payment Info
                </h4>
              </div>

              <div className="px-6 pb-6 space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Method</p>
                  <p>Credit Card</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Paid
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Transaction</p>
                  <p>TXN-2024-5678</p>
                </div>
              </div>
            </div>

            {/* UPDATE STATUS */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h4 className="text-lg font-medium">Update Order Status</h4>

              <div className="space-y-2">
                <label className="text-sm">Current Status</label>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Processing
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-sm">New Status</label>
                <select className="border rounded-md px-3 py-2 w-full">
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <button className="w-full bg-black text-white rounded-md py-2 text-sm">
                Update Status
              </button>
            </div>

            {/* TRACKING */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <h4 className="text-lg font-medium">Add Tracking Number</h4>

              <div>
                <label className="text-sm">Tracking Number</label>
                <input
                  className="border rounded-md w-full px-3 py-2 mt-1"
                  placeholder="Enter tracking number"
                />
              </div>

              <button className="w-full bg-black text-white rounded-md py-2 text-sm">
                Add Tracking
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

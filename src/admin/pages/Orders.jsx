// src/admin/pages/Orders.jsx
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();

  const orders = [
    {
      id: "ORD-2024-1234",
      customer: "John Smith",
      email: "john@example.com",
      items: 3,
      amount: "$145.00",
      payment: "Credit Card",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      date: "2024-11-15",
    },
    {
      id: "ORD-2024-1233",
      customer: "Sarah Johnson",
      email: "sarah@example.com",
      items: 1,
      amount: "$42.00",
      payment: "PayPal",
      status: "Processing",
      statusColor: "bg-blue-100 text-blue-800",
      date: "2024-11-15",
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Orders</h2>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-gray-600">Order ID</th>
                <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-gray-600">Products</th>
                <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-gray-600">Payment</th>
                <th className="text-left py-3 px-4 text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{o.id}</td>

                  <td className="py-3 px-4">
                    <div>
                      <div>{o.customer}</div>
                      <div className="text-sm text-gray-500">{o.email}</div>
                    </div>
                  </td>

                  <td className="py-3 px-4">{o.items} items</td>
                  <td className="py-3 px-4">{o.amount}</td>
                  <td className="py-3 px-4">{o.payment}</td>

                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${o.statusColor}`}>
                      {o.status}
                    </span>
                  </td>

                  <td className="py-3 px-4">{o.date}</td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => navigate(`/admin/orders/${o.id}`)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

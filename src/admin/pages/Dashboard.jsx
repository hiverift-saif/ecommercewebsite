export default function Dashboard() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="space-y-6">

        {/* TOP HEADING */}
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {/* 4 MAIN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* TOTAL PRODUCTS */}
          <div className="bg-white flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Products</p>
                  <p className="mt-2 text-xl font-semibold">248</p>
                  <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                </div>
                <div className="bg-blue-500 p-3 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    viewBox="0 0 24 24">
                    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                    <path d="M12 22V12"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <path d="m7.5 4.27 9 5.15"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* TOTAL ORDERS */}
          <div className="bg-white flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="mt-2 text-xl font-semibold">1,429</p>
                  <p className="text-sm text-green-600 mt-1">+8% from last month</p>
                </div>
                <div className="bg-green-500 p-3 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    viewBox="0 0 24 24">
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* TODAY SALES */}
          <div className="bg-white flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Sales</p>
                  <p className="mt-2 text-xl font-semibold">$12,426</p>
                  <p className="text-sm text-green-600 mt-1">+23% from last month</p>
                </div>
                <div className="bg-purple-500 p-3 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    viewBox="0 0 24 24">
                    <line x1="12" x2="12" y1="2" y2="22"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* LOW STOCK */}
          <div className="bg-white flex flex-col gap-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Low Stock Alerts</p>
                  <p className="mt-2 text-xl font-semibold">18</p>
                  <p className="text-sm text-green-600 mt-1">-5% from last month</p>
                </div>
                <div className="bg-orange-500 p-3 rounded-full">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    viewBox="0 0 24 24">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RECENT STATUS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              viewBox="0 0 24 24">
              <path d="M12 6v6l4 2"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="mt-1 font-medium">34</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              viewBox="0 0 24 24">
              <path d="M16 7h6v6"></path>
              <path d="m22 7-8.5 8.5-5-5L2 17"></path>
            </svg>
            <div>
              <p className="text-sm text-gray-600">Processing</p>
              <p className="mt-1 font-medium">56</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              viewBox="0 0 24 24">
              <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
              <path d="m9 11 3 3L22 4"></path>
            </svg>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="mt-1 font-medium">1,289</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              viewBox="0 0 24 24">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            </svg>
            <div>
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="mt-1 font-medium">842</p>
            </div>
          </div>

        </div>

        {/* RECENT ORDERS TABLE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 pt-6 border-b border-gray-200">
            <h4 className="text-lg font-semibold">Recent Orders</h4>
          </div>

          <div className="px-6 py-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 text-gray-600">Product</th>
                  <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-gray-600">Date</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">#ORD-2024-1234</td>
                  <td className="py-3 px-4">John Smith</td>
                  <td className="py-3 px-4">Dinner Set (24 Pieces)</td>
                  <td className="py-3 px-4">$145.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">Pending</span>
                  </td>
                  <td className="py-3 px-4">2024-11-15</td>
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">#ORD-2024-1233</td>
                  <td className="py-3 px-4">Sarah Johnson</td>
                  <td className="py-3 px-4">Coffee Mugs Set</td>
                  <td className="py-3 px-4">$42.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Processing</span>
                  </td>
                  <td className="py-3 px-4">2024-11-15</td>
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">#ORD-2024-1232</td>
                  <td className="py-3 px-4">Michael Brown</td>
                  <td className="py-3 px-4">Ceramic Bowl Set</td>
                  <td className="py-3 px-4">$78.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">Shipped</span>
                  </td>
                  <td className="py-3 px-4">2024-11-14</td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">#ORD-2024-1231</td>
                  <td className="py-3 px-4">Emily Davis</td>
                  <td className="py-3 px-4">Glass Dinner Plates</td>
                  <td className="py-3 px-4">$95.00</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Delivered</span>
                  </td>
                  <td className="py-3 px-4">2024-11-14</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}

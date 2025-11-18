import React, { useState } from "react";

export default function UserProfile() {
  const userEmail = localStorage.getItem("userEmail") || "guest@example.com";

  // ⭐ Which tab is active
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT SIDEBAR */}
          <div className="bg-white shadow p-5 rounded-xl h-fit">
            <h2 className="text-xl font-semibold mb-4">Account</h2>

            <ul className="space-y-3 text-gray-700">
              <li
                className={`cursor-pointer hover:text-black ${
                  activeTab === "info" && "font-semibold text-black"
                }`}
                onClick={() => setActiveTab("info")}
              >
                Personal Info
              </li>

              <li
                className={`cursor-pointer hover:text-black ${
                  activeTab === "address" && "font-semibold text-black"
                }`}
                onClick={() => setActiveTab("address")}
              >
                Address Book
              </li>

              <li
                className={`cursor-pointer hover:text-black ${
                  activeTab === "orders" && "font-semibold text-black"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                My Orders
              </li>

              <li
                className={`cursor-pointer hover:text-black ${
                  activeTab === "wishlist" && "font-semibold text-black"
                }`}
                onClick={() => setActiveTab("wishlist")}
              >
                Wishlist
              </li>

              <li
                className={`cursor-pointer hover:text-black ${
                  activeTab === "security" && "font-semibold text-black"
                }`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </li>

              <li
                className="cursor-pointer text-red-600"
                onClick={() => {
                  localStorage.removeItem("userLogged");
                  localStorage.removeItem("userEmail");
                  window.location.href = "/";
                }}
              >
                Logout
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="md:col-span-2 space-y-6">

            {/* PERSONAL INFO */}
            {activeTab === "info" && (
              <div className="bg-white shadow p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-3">Personal Information</h2>

                <div className="text-gray-700 space-y-2">
                  <p><strong>Email:</strong> {userEmail}</p>
                  <p><strong>Name:</strong> Not added</p>
                  <p><strong>Phone:</strong> Not added</p>
                </div>

                <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                  Edit Profile
                </button>
              </div>
            )}

            {/* ADDRESS BOOK */}
            {activeTab === "address" && (
              <div className="bg-white shadow p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-3">Address Book</h2>

                <p className="text-gray-600">No addresses saved yet.</p>

                <button className="mt-3 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                  Add New Address
                </button>
              </div>
            )}

            {/* MY ORDERS */}
            {activeTab === "orders" && (
              <div className="bg-white shadow p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-3">My Orders</h2>
                <p className="text-gray-600">No orders found.</p>

                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Start Shopping
                </button>
              </div>
            )}

            {/* WISHLIST */}
            {activeTab === "wishlist" && (
              <div className="bg-white shadow p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-3">Wishlist</h2>
                <p className="text-gray-600">Your wishlist is empty.</p>
              </div>
            )}

            {/* SECURITY */}
            {activeTab === "security" && (
              <div className="bg-white shadow p-6 rounded-xl">
                <h2 className="text-xl font-semibold mb-3">Security</h2>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                  Change Password
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

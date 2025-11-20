import React, { useState } from "react";
import { Info, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [form, setForm] = useState({
    email: "",
    country: "India",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Delhi",
    pin: "",
    phone: "",
    saveInfo: false,
    paymentMethod: "razorpay",
    billingAddress: "same",
  });

  const [discountCode, setDiscountCode] = useState("");

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side - Form */}
        <div className="px-6 py-8 lg:px-16 lg:py-12 border-r border-gray-200">
          
          {/* Contact Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
<Link
  to="/signup"
  className="text-sm text-blue-600 hover:underline"
>
  Sign in
</Link>

            </div>
            
            <input
              type="text"
              name="email"
              placeholder="Email or mobile phone number"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <label className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                name="emailOffers"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Email me with news and offers</span>
            </label>
          </div>

          {/* Delivery Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Delivery</h2>
            
            <div className="mb-4 relative">
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              <span className="absolute left-3 -top-2 bg-white px-1 text-xs text-gray-500">Country/Region</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 relative">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <input
              type="text"
              name="apartment"
              placeholder="Apartment, suite, etc. (optional)"
              value={form.apartment}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="relative">
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>UP</option>
                  <option>Bihar</option>
                  <option>Goa</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                <span className="absolute left-3 -top-2 bg-white px-1 text-xs text-gray-500">State</span>
              </div>

              <input
                type="text"
                name="pin"
                placeholder="PIN code"
                value={form.pin}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Info className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="saveInfo"
                checked={form.saveInfo}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Save this information for next time</span>
            </label>
          </div>

          {/* Shipping Method */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Shipping method</h2>
            <div className="bg-gray-50 border border-gray-300 rounded px-4 py-3 text-sm text-gray-600">
              Enter your shipping address to view available shipping methods.
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Payment</h2>
            <p className="text-xs text-gray-500 mb-4">All transactions are secure and encrypted.</p>

            <div className="border border-gray-300 rounded-lg overflow-hidden mb-3">
              <label className="flex items-center justify-between px-4 py-3 bg-blue-50 border-b border-gray-300 cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={form.paymentMethod === "razorpay"}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium">Razorpay Secure (UPI, Cards, Int'l Cards, Wallets)</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src="https://cdn.razorpay.com/static/assets/logo/payment.svg" alt="UPI" className="h-4" />
                  <span className="text-xs text-gray-500">+18</span>
                </div>
              </label>

              {form.paymentMethod === "razorpay" && (
                <div className="bg-gray-50 px-4 py-8">
                  <div className="flex justify-center mb-4">
                    <div className="border-2 border-gray-300 rounded-lg w-32 h-20 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2"/>
                        <path d="M3 10h18" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-600">
                    After clicking "Pay now", you will be redirected to Razorpay Secure (UPI, Cards, Int'l Cards, Wallets) to complete your purchase securely.
                  </p>
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={form.paymentMethod === "cod"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium">Cash on Delivery (COD)</span>
            </label>
          </div>

          {/* Billing Address */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Billing address</h2>
            
            <label className="flex items-center gap-2 px-4 py-3 mb-2 border border-gray-300 rounded-lg cursor-pointer bg-blue-50">
              <input
                type="radio"
                name="billingAddress"
                value="same"
                checked={form.billingAddress === "same"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium">Same as shipping address</span>
            </label>

            <label className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="billingAddress"
                value="different"
                checked={form.billingAddress === "different"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-sm font-medium">Use a different billing address</span>
            </label>
          </div>

          {/* Pay Now Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg text-base mb-4 transition-colors"
          >
            Pay now
          </button>

          {/* Footer Links */}
          <div className="flex justify-center gap-4 text-xs text-blue-600">
            <a href="#" className="hover:underline">Refund policy</a>
            <a href="#" className="hover:underline">Shipping</a>
            <a href="#" className="hover:underline">Privacy policy</a>
            <a href="#" className="hover:underline">Terms of service</a>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="px-6 py-8 lg:px-12 lg:py-12 bg-gray-50">
          
          {/* Product Item */}
          <div className="flex gap-4 mb-6">
            <div className="relative">
              <img
                src="https://cdn.shopify.com/s/files/1/0260/5937/4685/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_64x64.jpg?v=1724153805"
                alt="Gold Harvester Farmer Statue"
                className="w-16 h-16 rounded-lg border border-gray-300"
              />
              <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                1
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">Gold Harvester Farmer Statue 3</h3>
            </div>
            <div className="text-sm font-medium text-gray-900">₹649.00</div>
          </div>

          {/* Discount Code */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300 transition-colors">
                Apply
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-900">₹649.00</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-700">Shipping</span>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-gray-500 text-xs">Enter shipping address</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-xs text-gray-500 mr-2">INR</span>
                <span className="text-2xl font-bold text-gray-900">₹649.00</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-right">Including ₹30.90 in taxes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
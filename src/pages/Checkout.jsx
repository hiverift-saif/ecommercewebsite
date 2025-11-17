// src/pages/Checkout.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const totalMRP = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 1406; // Example discount
  const platformFee = 23;
  const finalTotal = totalMRP - discount + platformFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">Checkout</h1>

      {/* Shipping Address */}
      <div className="border p-4 rounded-lg shadow-sm space-y-4">
        <h2 className="font-semibold text-xl">Shipping Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* Payment Options */}
      <div className="border p-4 rounded-lg shadow-sm space-y-4">
        <h2 className="font-semibold text-xl">Payment Method</h2>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Credit/Debit Card
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            UPI / Wallet
          </label>
        </div>
      </div>

      {/* Price Summary */}
      <div className="border p-4 rounded-lg shadow-sm space-y-4">
        <h2 className="font-semibold text-xl">Price Details</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Total MRP:</span>
            <span>₹{totalMRP}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount on MRP:</span>
            <span>-₹{discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Coupon Discount:</span>
            <button className="text-blue-600 hover:underline">Apply Coupon</button>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee:</span>
            <span>₹{platformFee}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total Amount:</span>
            <span>₹{finalTotal}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-900 transition"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

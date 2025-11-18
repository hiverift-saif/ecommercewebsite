import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto hide toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

const handleSubmit = (e) => {
  e.preventDefault();

  // Validation
  if (!email) {
    setError("Email is required");
    setToast({ type: "error", message: "Please enter your email" });
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    setError("Enter a valid email");
    setToast({ type: "error", message: "Invalid email address" });
    return;
  }

  setError("");
  setLoading(true);

  // 👉 Save login status
  setTimeout(() => {
    localStorage.setItem("userLogged", "true");
    localStorage.setItem("userEmail", email);

    setLoading(false);
    setToast({
      type: "success",
      message: "Login Successful!",
    });

    // 👉 Page reload so Navbar updates
    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  }, 800);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">

      {/* TOAST */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded-lg text-white shadow-lg z-50
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Login</h2>
        <p className="text-sm text-gray-600 text-center mt-1 mb-6">
          Enter your email to continue
        </p>

        <form onSubmit={handleSubmit}>

          {/* EMAIL INPUT */}
          <div className="mb-4">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`w-full px-3 py-2 border rounded-md text-sm
                ${
                  error
                    ? "border-red-400 ring-1 ring-red-200"
                    : "border-gray-300 focus:ring-2 focus:ring-amber-300"
                }`}
              placeholder="you@example.com"
            />
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-medium mt-2 transition
              ${
                loading
                  ? "bg-amber-300 cursor-not-allowed"
                  : "bg-amber-500 hover:bg-amber-600"
              }`}
          >
            {loading ? "Logging in..." : "Continue"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-amber-600 underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

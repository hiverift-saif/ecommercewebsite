import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import BASE from "../config"; // ← Tumhara wahi import

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message: '' }

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(id);
  }, [toast]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{7,15}$/;

  function validate(values) {
    const e = {};
    if (!values.name.trim()) e.name = "Name required";
    if (!values.email.trim()) e.email = "Email required";
    else if (!emailRegex.test(values.email)) e.email = "Invalid email";
    if (values.phone && !phoneRegex.test(values.phone)) e.phone = "Phone must be digits (7-15)";
    if (!values.password) e.password = "Password required";
    else if (values.password.length < 6) e.password = "Minimum 6 characters";
    if (!values.confirm) e.confirm = "Confirm password required";
    else if (values.confirm !== values.password) e.confirm = "Passwords do not match";
    if (!values.acceptTerms) e.acceptTerms = "You must accept terms";
    return e;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setToast({ type: "error", message: "Please fix the highlighted fields" });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${BASE.BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: form.email.trim(),
          userPassword: form.password,
          // agar backend mein name/phone bhi accept karta hai to bhej do
          // name: form.name,
          // phone: form.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setToast({ type: "success", message: "Account created successfully!" });
        
        // Form reset
        setForm({
          name: "", email: "", phone: "", password: "", confirm: "", acceptTerms: false
        });

        // Redirect to login
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setToast({ type: "error", message: data.message || "Registration failed" });
      }
    } catch (err) {
      setToast({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
      {/* Toast - Same as before */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 min-w-[220px] max-w-sm rounded-lg shadow-lg px-4 py-3
            ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
          role="alert"
        >
          {toast.message}
        </div>
      )}

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - SAME DESIGN */}
        <div className="hidden lg:flex flex-col justify-center items-start p-10 bg-gradient-to-b from-amber-50 to-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-sm text-gray-600 mb-6">
            Fast, secure signup — get access to cart, orders and checkout.
          </p>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>Save addresses & payment methods</li>
            <li>Track orders</li>
            <li>Exclusive offers</li>
          </ul>
        </div>

        {/* Right Side Form - 100% SAME */}
        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Sign up</h3>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${errors.name ? "border-red-400 ring-red-200" : "border-gray-200 focus:ring-amber-300"}`}
                placeholder="John Doe"
                autoComplete="name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${errors.email ? "border-red-400 ring-red-200" : "border-gray-200 focus:ring-amber-300"}`}
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Phone (Optional) */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone (optional)</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${errors.phone ? "border-red-400 ring-red-200" : "border-gray-200 focus:ring-amber-300"}`}
                placeholder="9876543210"
                inputMode="numeric"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type={showPass ? "text" : "password"}
                className={`w-full rounded-md border px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2
                  ${errors.password ? "border-red-400 ring-red-200" : "border-gray-200 focus:ring-amber-300"}`}
                placeholder="At least 6 characters"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-[38px] text-gray-500"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                type={showConfirm ? "text" : "password"}
                className={`w-full rounded-md border px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2
                  ${errors.confirm ? "border-red-400 ring-red-200" : "border-gray-200 focus:ring-amber-300"}`}
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-[38px] text-gray-500"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              {errors.confirm && <p className="mt-1 text-xs text-red-600">{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div className="mb-4 flex items-start gap-3">
              <input
                id="terms"
                name="acceptTerms"
                type="checkbox"
                checked={form.acceptTerms}
                onChange={handleChange}
                className={`mt-1 h-4 w-4 rounded border-gray-300 ${errors.acceptTerms ? "ring-1 ring-red-200" : ""}`}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{" "}
                <Link to="/terms" className="text-amber-600 underline">
                  Terms & Conditions
                </Link>
              </label>
            </div>
            {errors.acceptTerms && <p className="mt-1 mb-2 text-xs text-red-600">{errors.acceptTerms}</p>}

            {/* Submit Button */}
            <div className="mb-4">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-2 rounded-md text-white font-medium transition
                  ${submitting ? "bg-amber-300 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600"}`}
              >
                {submitting ? "Creating account..." : "Create account"}
              </button>
            </div>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-600 underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
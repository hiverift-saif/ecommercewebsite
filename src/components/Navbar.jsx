import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";

import logo from "../assets/logo3.png";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const navItems = [
  {
    label: "Decor",
    parentLink: "/HomeDecore",
    children: [
      { label: "Table Decor", link: "/TableDecor" },
      { label: "Aroma Diffusers", link: "/Aromadiffusers" },
      { label: "Vases & Planters", link: "/Plantersvases" },
    ],
  },
  {
    label: "Drinkware",
    parentLink: "/Drinkware",
    children: [
      { label: "Glassware", link: "/Glassware" },
      { label: "Cup Sets", link: "/CupSets" },
      { label: "Mugs", link: "/Mugs" },
    ],
  },
  {
    label: "Tableware",
    parentLink: "/Tableware",
    children: [
      { label: "Serving Trays", link: "/Tray" },
      { label: "Bowls & Soup Sets", link: "/Bowl" },
      { label: "Dinnerware", link: "/Dinnerware" },
      { label: "Jars", link: "/Jars" },
      { label: "Platters & Dips", link: "/DipsPlate" },
    ],
  },
  {
    label: "Home Essentials",
    parentLink: "/Homeessentials",
    children: [
      { label: "Cookware", link: "/Cookware" },
      { label: "Kitchen", link: "/KitchenEssentials" },
      { label: "Storage & Organisers", link: "/Organizer" },
    ],
  },
  { label: "Sales", link: "/Sales" },
  {
    label: "Combo",
    parentLink: "/Combooffers",
    children: [{ label: "Mug Set", link: "/MugSet" }],
  },
  {
    label: "Women Accessories",
    parentLink: "/Womenaccessories",
    children: [
      { label: "Pendant", link: "/Pendants" },
      { label: "Earrings", link: "/Earrings" },
      { label: "Bracelet", link: "/Bracelet" },
    ],
  },
];

const Navbar = ({ onCartOpen }) => {
  const navigate = useNavigate();
  const { totalQuantity } = useCart();
  const { searchQuery, searchResults, searchProducts } = useSearch();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Auth States
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("User");

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    const email = localStorage.getItem("userEmail");

    if (token && email) {
      setLoggedIn(true);
      setUserEmail(email);

      const namePart = email.split("@")[0].replace(/[0-9]/g, "");
      const cleanName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      setUserName(cleanName || "User");
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
    setLoginDropdown(false);
    navigate("/");
  };

  // Close Login Dropdown on Outside Click
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".user-dropdown")) {
        setLoginDropdown(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const toggleDropdown = (idx) => {
    setOpenDropdown(openDropdown === idx ? null : idx);
  };

  const goToParent = (link) => {
    if (link) navigate(link);
  };

  return (
    <>
      <header className="w-full bg-[#f7f4ed] shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-[1440px] px-4 py-4 flex items-center justify-between">

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden">
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-20 h-20 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <div key={idx} className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(idx)}
                onMouseLeave={() => item.children && setOpenDropdown(null)}
              >
                {item.children ? (
                  <button
                    onClick={() => goToParent(item.parentLink)}
                    className="flex items-center gap-1 text-[15px] font-medium text-[#9c7d50] hover:text-black"
                  >
                    {item.label}
                    <ChevronDown size={16} />
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    className="text-[15px] font-medium text-[#9c7d50] hover:text-black"
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && openDropdown === idx && (
                  <div className="absolute left-0 top-full bg-white w-48 shadow-lg rounded-md z-50">
                    <ul className="py-2">
                      {item.children.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link
                            to={sub.link}
                            className="block px-4 py-2 text-sm text-[#9c7d50] hover:bg-gray-100 hover:text-black"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5">

            {/* Search */}
            <Search size={22} className="cursor-pointer text-[#9c7d50]" onClick={() => setSearchOpen(true)} />

            {/* USER ICON + CLICK DROPDOWN */}
            <div className="relative user-dropdown">
              <button onClick={() => setLoginDropdown(!loginDropdown)}>
                <User size={24} className="cursor-pointer text-[#9c7d50]" />
              </button>

              {loginDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white w-64 rounded-lg shadow-2xl border border-gray-200 z-[9999] overflow-hidden">

                  {loggedIn ? (
                    <>
                      <div className="px-4 py-3 bg-amber-50 border-b">
                        <p className="text-xs text-gray-600">Welcome back!</p>
                        <p className="font-bold text-amber-900">Hi, {userName}</p>
                        <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                      </div>

                      <Link to="/UserProfile" className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                        onClick={() => setLoginDropdown(false)}>
                        My Profile
                      </Link>

                      <Link to="/MyOrder" className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                        onClick={() => setLoginDropdown(false)}>
                        My Orders
                      </Link>

                      <button onClick={logoutUser}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium">
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="p-4 text-center">
                      <Link to="/login"
                        className="block w-full py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 mb-2"
                        onClick={() => setLoginDropdown(false)}>
                        Login
                      </Link>

                      <Link to="/signup"
                        className="block w-full py-2 border border-amber-500 text-amber-600 rounded-lg font-medium hover:bg-amber-50"
                        onClick={() => setLoginDropdown(false)}>
                        Create Account
                      </Link>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer" onClick={onCartOpen}>
              <ShoppingBag size={25} className="text-[#9c7d50]" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t shadow-sm py-3">
            <ul className="flex flex-col">
              {navItems.map((item, idx) => (
                <li key={idx} className="border-b">
                  <button className="w-full px-4 py-3 flex justify-between" onClick={() => toggleDropdown(idx)}>
                    {item.label}
                    {item.children && <ChevronDown />}
                  </button>

                  {item.children && openDropdown === idx && (
                    <ul className="bg-gray-50">
                      {item.children.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link to={sub.link} className="block px-6 py-2 text-sm border-b"
                            onClick={() => setMobileOpen(false)}>
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Search Popup */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-full max-w-lg p-5 rounded-xl shadow-lg">
            <div className="flex items-center gap-2 border p-2 rounded-lg">
              <Search size={20} className="text-gray-600" />
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                className="w-full outline-none"
                value={searchQuery}
                onChange={(e) => searchProducts(e.target.value)}
              />
              <X size={22} className="cursor-pointer" onClick={() => setSearchOpen(false)} />
            </div>

            <div className="mt-4 max-h-80 overflow-y-auto">
              {searchResults.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No products found</p>
              ) : (
                searchResults.map((p) => (
                  <div key={p.id}
                    className="flex items-center gap-3 p-2 border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      navigate(`/product/${p.id}`);
                      setSearchOpen(false);
                    }}
                  >
                    <img src={p.images[0]} className="w-14 h-14 rounded-lg" alt={p.title} />
                    <div>
                      <p className="font-medium">{p.title}</p>
                      <p className="text-sm text-gray-600">₹{p.salePrice}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

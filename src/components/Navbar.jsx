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
import { useSearch } from "../context/SearchContext"; // ✅ FIXED

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

  const { searchQuery, setSearchQuery, searchResults, searchProducts } =
    useSearch(); // ⭐ SEARCH WORKING

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const logged = localStorage.getItem("userLogged");
    const email = localStorage.getItem("userEmail");

    if (logged && email) {
      setLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const toggleDropdown = (idx) => {
    setOpenDropdown(openDropdown === idx ? null : idx);
  };

  const logoutUser = () => {
    localStorage.removeItem("userLogged");
    localStorage.removeItem("userEmail");
    setLoggedIn(false);
  };

  const goToParent = (link) => {
    if (link) navigate(link);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full bg-[#f7f4ed] shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-[1440px] px-4 py-4 flex items-center justify-between">

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* LOGO */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-20 h-20 object-contain" />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <div
                key={idx}
                className="relative"
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

                {/* DROPDOWN */}
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

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-5">

            {/* SEARCH */}
            <Search
              size={22}
              className="cursor-pointer text-[#9c7d50]"
              onClick={() => setSearchOpen(true)}
            />

            {/* USER DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setLoginDropdown(true)}
              onMouseLeave={() => setLoginDropdown(false)}
            >
              <User size={24} className="cursor-pointer text-[#9c7d50]" />

              {loginDropdown && (
                <div className="absolute right-0 top-full bg-white w-48 rounded shadow-md py-2">

                  {loggedIn ? (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 border-b">
                        {userEmail}
                      </div>

                      <Link
                        to="/UserProfile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        My Profile
                      </Link>

                      <Link
                        to="/MyOrder"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        My Orders
                      </Link>

                      <button
                        onClick={logoutUser}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-100">
                        Login
                      </Link>

                      <Link to="/signup" className="block px-4 py-2 text-sm hover:bg-gray-100">
                        Signup
                      </Link>
                    </>
                  )}

                </div>
              )}
            </div>

            {/* CART */}
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

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t shadow-sm py-3">
            <ul className="flex flex-col">
              {navItems.map((item, idx) => (
                <li key={idx} className="border-b">
                  <button
                    className="w-full px-4 py-3 flex justify-between"
                    onClick={() => toggleDropdown(idx)}
                  >
                    {item.label}
                    {item.children && <ChevronDown />}
                  </button>

                  {item.children && openDropdown === idx && (
                    <ul className="bg-gray-50">
                      {item.children.map((sub, sIdx) => (
                        <li key={sIdx}>
                          <Link
                            to={sub.link}
                            className="block px-6 py-2 text-sm border-b"
                          >
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

      {/* SEARCH POPUP */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start pt-32 z-[200]">
          <div className="bg-white w-full max-w-xl rounded-lg p-5 shadow-xl">

            {/* CLOSE BUTTON */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium">Search Products</h2>
              <button
                className="text-gray-600"
                onClick={() => setSearchOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            {/* INPUT */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                searchProducts(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded-lg mb-4 outline-none"
            />

            {/* RESULTS */}
            <div className="max-h-80 overflow-y-auto">
              {searchResults.length === 0 ? (
                <p className="text-gray-600 text-center py-5">No results found</p>
              ) : (
                searchResults.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      navigate(`/product/${p.id}`);
                      setSearchOpen(false);
                    }}
                    className="flex items-center gap-4 py-2 px-2 border-b cursor-pointer hover:bg-gray-50"
                  >
                    <img
                      src={p.images?.[0]}
                      className="w-12 h-12 object-cover rounded"
                    />
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

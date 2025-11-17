import React, { useState } from "react";
import { ChevronDown, Menu, X, Search, ShoppingBag } from "lucide-react";
import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const navItems = [
  {
    label: "Decor",
    children: [
      { label: "Table Decor", link: "/TableDecor" },
      { label: "Aroma Diffusers", link: "/Aromadiffusers" },
      { label: "Vases & Planters", link: "/Plantersvases" },
    ],
  },
  {
    label: "Drinkware",
    children: [
      { label: "Glassware", link: "/Glassware" },
      { label: "Cup Sets", link: "/CupSets" },
      { label: "Mugs", link: "/Mugs" },
    ],
  },
  {
    label: "Tableware",
    children: [
      { label: "Serving Trays", link: "/Tray" },
      { label: "Bowls & Soup Sets", link: "/Bowl" },
      { label: "Dinnerware", link: "/Dinnerware" },
      { label: "Jars", link: "/MultipurposeJar" },
      { label: "Platters & Dips", link: "/DipsPlate" },
    ],
  },
  {
    label: "Home Essentials",
    children: [
      { label: "Cookware", link: "/Cookware" },
      { label: "Kitchen", link: "/KitchenEssentials" },
      { label: "Storage & Organisers", link: "/Organizer" },
    ],
  },
  { label: "Sales", link: "/Sales" },

  {
    label: "Combo",
    children: [{ label: "Mug Set", link: "/MugSet" }],
  },

  {
    label: "Women Accessories",
    children: [
      { label: "Pendant", link: "/Pendants" },
      { label: "Earrings", link: "/Earrings" },
      { label: "Bracelet", link: "/Bracelet" },
    ],
  },
];

const Navbar = ({ onCartOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { totalQuantity } = useCart();

  const toggleDropdown = (idx) => {
    setOpenDropdown(openDropdown === idx ? null : idx);
  };

  return (
    <header className="w-full bg-[#f7f4ed] shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-[1440px] px-4 py-4 flex items-center justify-between">

        {/* Mobile Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden">
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <div key={idx} className="relative">

              {/* CLICK BUTTON */}
              <button
                onClick={() => toggleDropdown(idx)}
                className="flex items-center gap-1 text-[15px] font-medium text-[#9c7d50] hover:text-black transition"
              >
                {item.label}
                {item.children && <ChevronDown size={16} />}
              </button>

              {/* CLICK-BASED DROPDOWN */}
              {item.children && openDropdown === idx && (
                <div
                  className="
                    absolute left-0 top-full w-48 bg-white shadow-lg
                    rounded-md transition-all duration-200 z-50
                  "
                >
                  <ul className="py-2">
                    {item.children.map((sub, sIdx) => (
                      <li key={sIdx} className="text-[#9c7d50]">
                        <Link
                          to={sub.link}
                          className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-black transition"
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
          <Search size={22} className="cursor-pointer text-[#9c7d50] hover:text-black transition" />

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={onCartOpen}>
            <ShoppingBag size={25} className="text-[#9c7d50] hover:text-black transition" />

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
        <div className="lg:hidden bg-white border-t shadow-sm">
          <ul className="flex flex-col py-3">
            {navItems.map((item, idx) => (
              <li key={idx} className="border-b">

                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left"
                  onClick={() => toggleDropdown(idx)}
                >
                  {item.label}
                  {item.children && <ChevronDown />}
                </button>

                {item.children && openDropdown === idx && (
                  <ul className="bg-gray-50">
                    {item.children.map((sub, sIdx) => (
                      <li key={sIdx} className="text-[#9c7d50]">
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
  );
};

export default Navbar;

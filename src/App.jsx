// src/App.jsx
import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Home from "./components/Home";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import FooterTape from "./components/FooterTape";

// Admin Panel Imports
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Orders from "./admin/pages/Orders";
import OrderDetails from "./admin/pages/OrderDetails";
import Products from "./admin/pages/Products";
import Customers from "./admin/pages/Customers";
import Coupons from "./admin/pages/Coupons";
import Categories from "./admin/pages/Categories";
import Banners from "./admin/pages/Banners";
import WebsiteSettings from "./admin/pages/WebsiteSettings";
import Profile from "./admin/pages/Profile";

import TableDecor from "./Decors/TableDecor";
import Aromadiffusers from "./Decors/Aromadiffusers";
import Plantersvases from "./Decors/Plantersvases";

import Glassware from "./Drinkware/Glassware";
import CupSets from "./Drinkware/CupSets";
import Mugs from "./Drinkware/Mugs";

import Tray from "./Tableware/Tray";
import Bowl from "./Tableware/Bowl";
import Dinnerware from "./Tableware/Dinnerware";
import MultipurposeJar from "./Tableware/multipurposeJar";
import DipsPlate from "./Tableware/DipsPlate";

import KitchenEssentials from "./HomeEssentials/KitchenEssentials";
import Organizer from "./HomeEssentials/Organizer";

import Sales from "./components/Sales";
import MugSet from "./Combo/MugSet";

import Pendants from "./WomenAccessories/Pendants";
import Earrings from "./WomenAccessories/Earrings";
import Bracelet from "./WomenAccessories/Bracelet";

import Tableware from "./HeroContentLInk/Tableware";
// import Cookware from "./HeroContentLInk/Cookware";
import Drinkware from "./HeroContentLInk/Drinkware";

import Womenaccessories from "./HeroContentLInk/Womenaccessories";
import HomeDecore from "./HeroContentLInk/homeDecore";
import Jars from "./HeroContentLInk/Jars";

// ⭐ FILTER CONTEXT IMPORT
import { FilterProvider } from "./context/FilterContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyOrder from "./Profile/MyOrder";
import UserProfile from "./Profile/UserProfile";
import SubCategories from "./admin/pages/SubCategories";
import Cookware from "./HomeEssentials/Cookware";
import TravelMug from "./Combo/TravelMug";
import Combooffers from "./HeroContentLInk/Combooffers";
import Homeessentials from "./HeroContentLInk/Homeessentials";

// ─────────────────────────────────────────────
// Public Website Layout
// ─────────────────────────────────────────────
function MainLayout({ cartOpen, onCartOpen, onCartClose }) {
  return (
    <>
      <Navbar onCartOpen={onCartOpen} />
      <CartDrawer isOpen={cartOpen} onClose={onCartClose} />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
      <FooterTape />
    </>
  );
}

// ─────────────────────────────────────────────
// Main Routing
// ─────────────────────────────────────────────
export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    // ⭐ ENTIRE WEBSITE IS NOW WRAPPED IN FilterProvider
    <FilterProvider>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          element={
            <MainLayout
              cartOpen={cartOpen}
              onCartOpen={() => setCartOpen(true)}
              onCartClose={() => setCartOpen(false)}
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/TableDecor" element={<TableDecor />} />
          <Route path="/Aromadiffusers" element={<Aromadiffusers />} />
          <Route path="/Plantersvases" element={<Plantersvases />} />
          <Route path="/Glassware" element={<Glassware />} />
          <Route path="/CupSets" element={<CupSets />} />
          <Route path="/Mugs" element={<Mugs />} />
          <Route path="/Tray" element={<Tray />} />
          <Route path="/Bowl" element={<Bowl />} />
          <Route path="/Dinnerware" element={<Dinnerware />} />
          <Route path="/MultipurposeJar" element={<MultipurposeJar />} />
          <Route path="/DipsPlate" element={<DipsPlate />} />
          <Route path="/KitchenEssentials" element={<KitchenEssentials />} />
          <Route path="/Organizer" element={<Organizer />} />
          <Route path="/Sales" element={<Sales />} />
          <Route path="/MugSet" element={<MugSet />} />
          <Route path="/TravelMug" element={<TravelMug />} />
          <Route path="/Pendants" element={<Pendants />} />
          <Route path="/Earrings" element={<Earrings />} />
          <Route path="/Bracelet" element={<Bracelet />} />
          <Route path="/Cookware" element={<Cookware />} />

          {/* Hero content  */}
          <Route path="/Tableware" element={<Tableware />} />
          <Route path="/Cookware" element={<Cookware />} />
          <Route path="/Drinkware" element={<Drinkware />} />
          <Route path="/Bowl" element={<Bowl />} />
          <Route path="/Womenaccessories" element={<Womenaccessories />} />
          <Route path="/Combooffers" element={<Combooffers />} />
          <Route path="/homeDecore" element={<HomeDecore />} />
          <Route path="/Homeessentials" element={<Homeessentials />} />

          <Route path="/Jars" element={<Jars />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/MyOrder" element={< MyOrder />} />
          <Route path="/UserProfile" element={< UserProfile />} />



        </Route>

        {/* ADMIN ROUTES (Nested) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="subcategories" element={<SubCategories />} />
          <Route path="customers" element={<Customers />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="banners" element={<Banners />} />
          <Route path="WebsiteSettings" element={<WebsiteSettings />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Route>

        {/* 404 PAGE */}
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center text-2xl">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </FilterProvider>
  );
}

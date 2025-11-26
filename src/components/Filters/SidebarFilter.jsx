'use client';

import { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  ChevronDownIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { useFilter } from "../../context/FilterContext";

export default function SidebarFilter({ isOpen, onClose }) {
  const [selected, setSelected] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [inStock, setInStock] = useState(false);

  const { allProducts, setFilteredProducts } = useFilter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggle = (val) => {
    setSelected((prev) =>
      prev.includes(val)
        ? prev.filter((v) => v !== val)
        : [...prev, val]
    );
  };

  // ⭐ FIXED FILTER — multiple checkbox → multiple products UI pe ek sath
  const applyFilter = () => {
    let filtered = [...allProducts];

    if (selected.length > 0) {
      filtered = filtered.filter((p) => {
        const cat = (p.category || "").toLowerCase();
        const sub = (p.subcategory || "").toLowerCase();

        return selected.some((label) => {
          const l = label.toLowerCase();
          return cat === l || sub === l;
        });
      });
    }

    filtered = filtered.filter(
      (p) =>
        (p.salePrice || p.price) >= priceRange[0] &&
        (p.salePrice || p.price) <= priceRange[1]
    );

    if (inStock) {
      filtered = filtered.filter((p) => p.inStock === true);
    }

    setFilteredProducts(filtered);
    onClose();
  };

  const resetFilter = () => {
    setSelected([]);
    setPriceRange([0, 4000]);
    setInStock(false);
    setFilteredProducts(allProducts);
  };

  // ⭐ CheckRow — no re-mount, no collapsing
  const CheckRow = ({ label }) => (
    <label className="flex items-center gap-2 text-sm cursor-pointer transition-all">
      <input
        type="checkbox"
        className="sr-only"
        checked={selected.includes(label)}
        onChange={() => toggle(label)}
      />

      <span
        className={`h-5 w-5 border flex items-center justify-center rounded transition-all duration-200 ${
          selected.includes(label)
            ? "border-blue-600 bg-blue-50 scale-110"
            : "border-gray-400"
        }`}
      >
        {selected.includes(label) && (
          <CheckIcon className="h-4 w-4 text-blue-700" />
        )}
      </span>

      {label}
    </label>
  );

  // ⭐ Section — fixed. No closing on checkbox click.
  const Section = ({ title, children }) => (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="border-b pb-4">
          <Disclosure.Button className="flex justify-between w-full font-medium py-2 hover:bg-gray-100 rounded">
            {title}
            <ChevronDownIcon
              className={`h-5 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </Disclosure.Button>

          <Disclosure.Panel className="mt-2 space-y-2">
            {children}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 w-full max-w-xs p-5 
          overflow-y-auto
          transition-all duration-500
          ${
            isOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
      >
        <div className="flex justify-between mb-5">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button className="hover:rotate-90" onClick={onClose}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={resetFilter}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Reset
          </button>

          <button
            onClick={applyFilter}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 active:scale-95"
          >
            Apply
          </button>
        </div>

        {/* FILTER SECTIONS */}
        <Section title="Decor">
          <CheckRow label="Table Decor" />
          <CheckRow label="Aroma Diffusers" />
          <CheckRow label="Vases & Planters" />
        </Section>

        <Section title="Drinkware">
          <CheckRow label="Glassware" />
          <CheckRow label="Cup Sets" />
          <CheckRow label="Mugs" />
        </Section>

        <Section title="Tableware">
          <CheckRow label="Serving Trays" />
          <CheckRow label="Bowls & Soup Sets" />
          <CheckRow label="Dinnerware" />
          <CheckRow label="Jars" />
          <CheckRow label="Platters & Dips" />
        </Section>

        <Section title="Home Essentials">
          <CheckRow label="Cookware" />
          <CheckRow label="Kitchen" />
          <CheckRow label="Storage & Organisers" />
        </Section>

        <Section title="Combo">
          <CheckRow label="Mug Set" />
        </Section>

        <Section title="Women Accessories">
          <CheckRow label="Pendant" />
          <CheckRow label="Earrings" />
          <CheckRow label="Bracelet" />
        </Section>

        {/* PRICE */}
        <Section title="Price">
          <Slider
            range
            min={0}
            max={4000}
            value={priceRange}
            onChange={setPriceRange}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </Section>

        {/* STOCK */}
        <Section title="Availability">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />

            <span
              className={`h-5 w-5 border flex items-center justify-center rounded transition-all ${
                inStock
                  ? "border-blue-600 bg-blue-50 scale-110"
                  : "border-gray-400"
              }`}
            >
              {inStock && (
                <CheckIcon className="h-4 w-4 text-blue-700" />
              )}
            </span>

            In Stock
          </label>
        </Section>
      </aside>
    </>
  );
}

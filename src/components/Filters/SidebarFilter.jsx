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

export default function SidebarFilter({ isOpen, onClose }) {
  const [selectedCollection, setSelectedCollection] = useState("/collections/home-decore");
  const [priceRange, setPriceRange] = useState([0, 2299]);
  const [inStock, setInStock] = useState(false);

  // ⭐ Body scroll lock when sidebar is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // ⭐ Accordion component
  const Accordion = ({ title, children }) => (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div className="border-b border-gray-200 py-4">
          <Disclosure.Button className="flex w-full items-center justify-between font-medium">
            <span>{title}</span>
            <ChevronDownIcon
              className={`${open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="mt-3">{children}</Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );

  // ⭐ Radio button group with submenu
  const RadioGroup = ({ label, value, subItems }) => {
    const hasSub = subItems && subItems.length > 0;
    return (
      <Disclosure defaultOpen={selectedCollection.startsWith(value)}>
        {({ open }) => (
          <div className="mb-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="collection_link"
                  value={value}
                  checked={selectedCollection === value}
                  onChange={() => setSelectedCollection(value)}
                  className="sr-only"
                />
                <span
                  className={`relative mr-2 flex h-5 w-5 items-center justify-center rounded border ${
                    selectedCollection === value
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {selectedCollection === value && (
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                  )}
                </span>
                <span className="text-sm">{label}</span>
              </label>

              {hasSub && (
                <Disclosure.Button>
                  <ChevronDownIcon
                    className={`${open ? "rotate-180" : ""} h-4 w-4 transition-transform`}
                  />
                </Disclosure.Button>
              )}
            </div>

            {hasSub && (
              <Disclosure.Panel className="ml-7 mt-2 space-y-2">
                {subItems.map((s) => (
                  <label key={s.value} className="flex items-center cursor-pointer text-sm">
                    <input
                      type="radio"
                      name="collection_link"
                      value={s.value}
                      checked={selectedCollection === s.value}
                      onChange={() => setSelectedCollection(s.value)}
                      className="sr-only"
                    />
                    <span
                      className={`relative mr-2 flex h-5 w-5 items-center justify-center rounded border ${
                        selectedCollection === s.value
                          ? "border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedCollection === s.value && (
                        <CheckIcon className="h-4 w-4 text-blue-600" />
                      )}
                    </span>
                    {s.label}
                  </label>
                ))}
              </Disclosure.Panel>
            )}
          </div>
        )}
      </Disclosure>
    );
  };

  return (
    <>
      {/* ⭐ Backdrop – all screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* ⭐ Drawer – all screens */}
<aside
  className={`fixed top-0 left-0 z-50 h-full bg-white shadow-xl
  w-full max-w-xs
  md:max-w-sm
  lg:max-w-md
  transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
>


        {/* Close button */}
        <div className="flex justify-end md:hidden p-4">
    <button onClick={onClose} className="text-gray-600">
      <XMarkIcon className="h-6 w-6" />
    </button>
  </div>


        {/* ⭐ FULL CONTENT (reference wala content exactly same) */}
    <div className="h-[calc(100vh-64px)] overflow-y-auto px-5 pb-10 space-y-6">

          {/* COLLECTION */}
          <Accordion title="COLLECTION">
            <div className="space-y-1">

              <RadioGroup label="Decor" value="/collections/home-decore" />

              <RadioGroup
                label="Drinkware"
                value="/collections/new-drinkware"
                subItems={[
                  { label: "Cup Sets", value: "/collections/cup-sets" },
                  { label: "Mugs", value: "/collections/coffee-mugs" },
                ]}
              />

              <RadioGroup
                label="Tableware"
                value="/collections/tableware-collections"
                subItems={[
                  { label: "Bowls & Soup Sets", value: "/collections/bowl" },
                  { label: "Dinnerware", value: "/collections/dinnerware" },
                  { label: "Multipurpose Jars", value: "/collections/multipurpose-jar-containers" },
                  { label: "Platters & Dips", value: "/collections/platters-dips" },
                ]}
              />

              <RadioGroup
                label="Home Essentials"
                value="/collections/home-essentials"
                subItems={[
                  { label: "Kitchen", value: "/collections/kitchen-essentials" },
                  { label: "Storage & Organisers", value: "/collections/organizer" },
                ]}
              />

              <RadioGroup label="Sale" value="/collections/sale" />

              <RadioGroup
                label="Combo"
                value="/collections/combo-offers"
                subItems={[{ label: "Mug Set", value: "/collections/mug-set" }]}
              />

              <RadioGroup
                label="Women Accessories"
                value="/collections/womenaccessories"
                subItems={[
                  { label: "Pendant", value: "/collections/pendants" },
                  { label: "Earrings", value: "/collections/earrings" },
                  { label: "Bracelet", value: "/collections/bracelet" },
                ]}
              />

            </div>
          </Accordion>

          {/* PRICE */}
          <Accordion title="PRICE">
            <Slider
              range
              min={0}
              max={2299}
              value={priceRange}
              onChange={setPriceRange}
            />
            <div className="mt-4 flex justify-between text-sm">
              <span>₹{priceRange[0]}</span>
              <span>—</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </Accordion>

          {/* AVAILABILITY */}
          <Accordion title="AVAILABILITY">
            <label className="flex items-center cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="sr-only"
              />
              <span
                className={`relative mr-2 flex h-5 w-5 items-center justify-center rounded border ${
                  inStock ? "border-blue-600" : "border-gray-300"
                }`}
              >
                {inStock && <CheckIcon className="h-4 w-4 text-blue-600" />}
              </span>
              In stock
            </label>
          </Accordion>

          {/* FEATURED PRODUCTS – same full content */}
          <div className="border-t pt-4">
            <h5 className="mb-4 font-medium">FEATURED PRODUCTS</h5>

            <div className="space-y-6">
              {[
                {
                  img: "https://www.earthstore.in/cdn/shop/files/Solid_Multicolor_Coffee_Mug_Set_of_6_-_The_Earth_Store_-_-_-2304533_100x.progressive.jpg?v=1723312614",
                  title: "Solid Multicolor Coffee Mug (Set of 6)",
                  price: "₹ 999.00",
                  compare: "₹ 1,099.00",
                  sale: "-10%",
                },
                {
                  img: "https://www.earthstore.in/cdn/shop/files/Gold_Harvester_Farmer_3_-_The_Earth_Store_-_-_-2300465_100x.progressive.jpg?v=1724153805",
                  title: "Gold Harvester Farmer Statue 3",
                  price: "₹ 649.00",
                  compare: "₹ 1,299.00",
                  sale: "-51%",
                },
                {
                  img: "https://www.earthstore.in/cdn/shop/files/Peaceful_Buddha_-_The_Earth_Store_-_-_-2302726_100x.progressive.jpg?v=1723307155",
                  title: "Peaceful Buddha",
                  price: "₹ 399.00",
                  compare: "₹ 799.00",
                  sale: "-51%",
                },
              ].map((p, i) => (
                <div key={i} className="flex space-x-3">
                  <div className="aspect-square w-20 overflow-hidden rounded">
                    <img src={p.img} alt={p.title} className="h-full w-full object-cover" />
                  </div>

                  <div className="flex flex-col justify-between">
                    <span className="text-xs font-semibold text-red-600">{p.sale}</span>
                    <h3 className="text-sm font-medium line-clamp-2">{p.title}</h3>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="text-gray-500 line-through">{p.compare}</span>
                      <span className="font-semibold text-green-600">{p.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </aside>
    </>
  );
}

import React from "react";

const items = [
  {
    link: "https://www.earthstore.in/collections/mugs",
    image:
      "https://www.earthstore.in/cdn/shop/files/best_ceramic_mugs_340x.png?v=1736142272",
  },
  {
    link: "https://www.earthstore.in/collections/bowls-soup-sets",
    image:
      "https://www.earthstore.in/cdn/shop/files/5_93ed8b83-8b4c-46c5-b1b0-f9656fb95eb6_340x.png?v=1735294749",
  },
  {
    link: "https://www.earthstore.in/collections/cup-sets",
    image:
      "https://www.earthstore.in/cdn/shop/files/ceramic_tea_sups_340x.png?v=1736142207",
  },
  {
    link: "https://www.earthstore.in/collections/jars",
    image:
      "https://www.earthstore.in/cdn/shop/files/8_c792728e-19cd-47f4-a96a-facf1a5f2b43_340x.png?v=1735294749",
  },
  {
    link: "https://www.earthstore.in/collections/platters-dips",
    image:
      "https://www.earthstore.in/cdn/shop/files/6_d185ab90-006c-436c-835a-d715152aa6af_340x.png?v=1735294750",
  },
  {
    link: "https://www.earthstore.in/collections/glassware",
    image:
      "https://www.earthstore.in/cdn/shop/files/Glassware_-_Glass_Online_Drinking_Glasses_Drinkware_94975709-5c5e-4f5c-a9f8-1f6fac59744a_340x.png?v=1739525967",
  },
  {
    link: "https://www.earthstore.in/collections/dinnerware",
    image:
      "https://www.earthstore.in/cdn/shop/files/11_340x.png?v=1735294749",
  },
  {
    link: "https://www.earthstore.in/collections/cookware",
    image:
      "https://www.earthstore.in/cdn/shop/files/12_340x.png?v=1735294749",
  },
  {
    link: "https://www.earthstore.in/collections/tray",
    image:
      "https://www.earthstore.in/cdn/shop/files/Serving_Trays_340x.png?v=1739525087",
  },
];

const PromoGrid = () => {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-[1440px] px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

          {items.map((item, idx) => (
            <a
              key={idx}
            //   href={item.link}
              className="w-full block overflow-hidden"
            >
              <div className="relative w-full" style={{ paddingTop: "125%" }}>
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </a>
          ))}

        </div>
      </div>
    </div>
  );
};

export default PromoGrid;

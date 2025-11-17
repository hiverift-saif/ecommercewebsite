import React from "react";

const newItems = [
  {
    link: "https://www.earthstore.in/collections/planters-and-vases",
    image:
      "https://www.earthstore.in/cdn/shop/files/1_b10d1b8d-742e-48f4-bf31-ba89e9b0fda9_570x.progressive.png.jpg?v=1735121385",
  },
  {
    link: "https://www.earthstore.in/collections/jars",
    image:
      "https://www.earthstore.in/cdn/shop/files/2_cf4ebcb8-034f-4fc7-b3e7-b10eef24217f_570x.progressive.png.jpg?v=1735121464",
  },
];

const NewOnEarth = () => {
  return (
    <div className="w-full flex justify-center py-12">
      <div className="w-full max-w-[1440px] px-4">
        
        <h2 className="text-2xl font-semibold text-center mb-8">NEW ON EARTH</h2>

        {/* GRID WITH OBJECTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {newItems.map((item, idx) => (
            <a
              key={idx}
            //   href={item.link}
              className="block w-full overflow-hidden"
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

export default NewOnEarth;

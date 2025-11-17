import React from "react";

const BigBanner = () => {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-[1440px] px-4">

        <a href="/collections/cookware" className="block w-full overflow-hidden">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <img
              src="https://www.earthstore.in/cdn/shop/files/m_cookware_1170x.progressive.png.jpg?v=1735123030" 
              alt="cookware banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </a>

      </div>
    </div>
  );
};

export default BigBanner;

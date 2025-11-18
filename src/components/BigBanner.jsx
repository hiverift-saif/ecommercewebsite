import React from "react";
import { useNavigate } from "react-router-dom";

const BigBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-[1440px] px-4">

        <div
          onClick={() => navigate("/Cookware")}
          className="block w-full overflow-hidden cursor-pointer 
                     transition-all duration-300 hover:scale-[1.02] active:scale-95"
        >
          <div className="relative w-full rounded-xl shadow"
               style={{ paddingTop: "56.25%" }}>
               
            <img
              src="https://www.earthstore.in/cdn/shop/files/m_cookware_1170x.progressive.png.jpg?v=1735123030"
              alt="cookware banner"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default BigBanner;

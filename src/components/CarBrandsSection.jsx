import React from "react";
import {
  bmw_logo,
  mercedes_logo,
  gmc_logo,
  tesla_logo,
  hyundai_logo,
} from "../assets";

export default function CarBrandsSection() {
  const carBrands = [
    { name: "TESLA", logo: tesla_logo },
    { name: "Mercedes-Benz", logo: mercedes_logo },
    { name: "GMC", logo: gmc_logo },
    { name: "BMW", logo: bmw_logo },
    { name: "Hyundai", logo: hyundai_logo },
  ];

  return (
    <section
      className="relative w-full max-w-full 
                 h-20 sm:h-24 md:h-26 lg:h-28 
                 flex items-center justify-center
                 px-4 sm:px-6 md:px-8 lg:px-8"
      style={{
        background:
          "linear-gradient(90deg, #000000 0%, #000000 0%, #1a1a1a 60%, #000000 70%, #000000 100%)",
      }}
    >
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-center">
        {/* Mobile Layout - 2 rows */}
        <div className="sm:hidden w-full">
          <div className="flex flex-col items-center justify-center gap-3">
            {/* First row - 3 brands */}
            <div className="flex items-center justify-center gap-8">
              {carBrands.slice(0, 3).map((brand, index) => (
                <div
                  key={brand.name}
                  className="flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <span className="text-gray-300 text-xs font-bold hidden">
                    {brand.name.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
            {/* Second row - 2 brands */}
            <div className="flex items-center justify-center gap-8">
              {carBrands.slice(3, 5).map((brand, index) => (
                <div
                  key={brand.name}
                  className="flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  <span className="text-gray-300 text-xs font-bold hidden">
                    {brand.name.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet Layout - Single row with smaller gaps */}
        <div className="hidden sm:flex md:hidden items-center justify-center w-full">
          <div className="flex items-center gap-12">
            {carBrands.map((brand, index) => (
              <div
                key={brand.name}
                className="flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <span className="text-gray-300 text-sm font-bold hidden">
                  {brand.name.charAt(0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Single row with large gaps */}
        <div className="hidden md:flex items-center justify-center w-full">
          <div className="flex items-center gap-16 lg:gap-24">
            {carBrands.map((brand, index) => (
              <div
                key={brand.name}
                className="flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-10 md:h-11 lg:h-12 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
                <span className="text-gray-300 text-sm font-bold hidden">
                  {brand.name.charAt(0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

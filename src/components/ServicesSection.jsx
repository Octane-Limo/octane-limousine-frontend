import React from "react";
import { services_bg, underline1, underline2 } from "../assets";
import { Link } from "react-router-dom";

export const ServicesSection = ({ data }) => {
  const [hovered, setHovered] = React.useState(null);

  return (
    <section
      className="flex flex-col items-center max-w-[1920px] justify-center w-full min-h-[100vh] p-[40px 1rem]"
      style={{
        backgroundImage: `url(${data?.bgImages[0]?.url || services_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: window.innerWidth >= 768 ? "40px 6rem" : "20px 1rem",
      }}
    >
      <div
        className="flex flex-col items-center justify-center w-full max-w-[1920px] mx-auto text-center px-4 mb-8"
        style={{
          maxHeight: window.innerWidth >= 768 ? "400px" : "auto",
          width: "100%",
          padding: "20px",
        }}
      >
        <h2 className="!text-3xl sm:!text-4xl md:!text-7xl !font-light text-white mb-4 md:mb-6 font-cinzel pt-6 sm:pt-8 md:pt-24">
          {data?.title}
        </h2>
        <img
          src={underline1}
          alt="underline"
          className="block mx-auto w-3/4 sm:w-2/3 md:w-1/2 mb-4 sm:mb-3 md:mb-3"
        />
        <img
          src={underline2}
          alt="underline"
          className="block mx-auto w-1/2 sm:w-1/2 md:w-1/3 mb-4 sm:mb-6 md:mb-10"
        />
        <p
          className="!text-base sm:!text-lg md:!text-2xl text-white !font-light italic leading-relaxed text-center max-w-xl mx-auto px-4 sm:px-0"
          style={{
            lineHeight: "1.5",
          }}
        >
          {data?.description}
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center justify-items-center mx-auto w-full"
        style={{
          minWidth: window.innerWidth >= 768 ? "100%" : "auto",
          width: "100%",
          margin: "0 auto",
          padding: window.innerWidth >= 768 ? "20px" : "10px",
        }}
      >
        {data?.icons?.map((service) => (
          <div
            key={service.public_id}
            className={`relative rounded-xl border border-yellow-400 shadow-lg flex flex-col items-center group overflow-hidden cursor-pointer transition-all duration-500 gap-4 sm:gap-6 md:gap-8 backdrop:blur-lg w-full max-w-[350px] sm:max-w-[400px] md:max-w-none
                ${hovered === service.public_id ? "" : "bg-black/40"}`}
            style={{
              backgroundImage:
                hovered === service.public_id
                  ? `url(${service.carImages[0]?.url || ""})`
                  : "none",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode:
                hovered === service.public_id ? "darken" : "normal",
              transition: "background-image 0.5s ease",
              minWidth: window.innerWidth >= 768 ? "100%" : "280px",
              minHeight: window.innerWidth >= 768 ? "100%" : "250px",
            }}
            onMouseEnter={() => setHovered(service.public_id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={`absolute inset-0 transition-all duration-500 pointer-events-none
      ${
        hovered === service.public_id
          ? "bg-black/50"
          : "bg-black/70 backdrop-blur-md"
      }`}
            />
            <Link to={"/services"}>
              <div
                className={`flex flex-col items-center w-full z-10 transition-all duration-500 gap-2 px-4
      ${
        hovered === service.public_id
          ? "opacity-0 translate-y-4"
          : "opacity-100 translate-y-0"
      }`}
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] mb-2 sm:mb-3 md:mb-4 object-contain"
                  style={{
                    marginTop: window.innerWidth >= 768 ? "20px" : "15px",
                  }}
                />
                <h3 className="text-lg sm:text-xl md:text-2xl text-white font-cinzel mb-1 sm:mb-2 tracking-wide uppercase text-center">
                  {service.title}
                </h3>
              </div>
              {service.description && (
                <p
                  className={`text-white relative mt-auto font-Poppins text-sm sm:text-base md:text-lg font-light text-center italic transition-all duration-500 px-4 pb-4
          ${hovered === service.public_id ? "!opacity-0" : "!opacity-100"}`}
                >
                  {service.description}
                </p>
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

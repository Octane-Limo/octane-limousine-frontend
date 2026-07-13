import React from "react";
import car_image from "../assets/cta-car.webp";
import before_dark from "../assets/before-dark.webp";
import before_light from "../assets/before-light.webp";
import before_yellow from "../assets/before-yellow.webp";

export const CtaSection = ({ data }) => {
  return (
    <section className="radial-gradient w-full px-4 sm:!py-[60px] md:!py-[80px] lg:!py-[136px] !px-0 sm:!px-0">
      <div
        className="bg-linear relative !mx-auto w-full sm:w-[95%] md:w-[90%] lg:w-[90%] 2xl:w-[1600px]
                   h-auto sm:h-[300px] md:h-[360px] lg:h-[422px]
                   rounded-[12px] sm:rounded-[15px] md:rounded-[18px] lg:rounded-[20px]
                   flex flex-col lg:flex-row items-center lg:justify-between"
      >
        {/* Decorative top-right yellow stroke (hidden on small to avoid overflow) */}
        <img
          src={before_yellow}
          className="hidden xl:block absolute sm:w-[400px] sm:h-[110px] md:w-[520px] md:h-[143px] lg:w-[681px] lg:h-[187px]
                     sm:right-[-20px] sm:top-[-80px] md:right-[-30px] md:top-[-120px]
                     lg:right-[-37px] xl:right-[-37px] lg:top-[-88px] 2xl:top-[-160px]"
          alt="before_yellow"
        />

        {/* Copy block */}
        <div className="cta-padding w-full sm:w-auto sm:!px-[15px] md:!px-[30px] lg:!px-[63px] !px-4 pt-6 sm:pt-0">
          <h3
            className="font-cinzel uppercase !font-[300]
                         text-[20px] leading-tight
                         sm:!text-[24px] md:!text-[32px] lg:!text-[50px] sm:leading-tight md:leading-tight"
          >
            {data?.title}
          </h3>
          <h3
            className="font-cinzel uppercase !font-[400]
                         text-[20px] leading-tight
                         sm:!text-[24px] md:!text-[32px] lg:!text-[50px] sm:leading-tight md:leading-tight"
          >
            {data?.subtitle}
          </h3>

          <p
            className="font-cinzel !font-[400]
                        text-[14px] mt-3 mb-4
                        sm:!text-[16px] md:!text-[20px] lg:!text-[29px]
                        sm:!mt-[16px] sm:!mb-[20px] md:!mt-[20px] md:!mb-[24px] lg:!mt-[28px] lg:!mb-[28px]"
          >
            {data?.description}
          </p>

          <a
            href={data?.buttons[0]?.href}
            className="flex items-center gap-[10px]
                       w-full sm:w-[180px] md:w-[200px] lg:w-[260px]
                       font-Poppins italic cta-sec-btn !text-[#FFE1B8]
                       !py-[10px] !px-[12px] sm:!py-[8px] sm:!px-[8px] md:!py-[9px] md:!px-[9px] lg:!py-[10px] lg:!px-[10px]
                       rounded-[8px] justify-center
                       text-[15px] sm:!text-[14px] md:!text-[15px] lg:!text-[16px]"
            aria-label="Call Now"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-phone-icon lucide-phone w-[20px] h-[20px]
                         sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px] lg:w-[24px] lg:h-[24px]"
            >
              <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
            </svg>
            {data?.buttons[0]?.text}
          </a>
        </div>

        {/* Visual block: mobile-first rendering */}
        <div className="w-full px-4 mt-5 sm:mt-0 block lg:hidden">
          <div className="relative max-w-[520px] mx-auto">
            {/* keep car visible on mobile, scaled to container */}
            <img
              src={data?.bgImages[0]?.carImages[0]?.url || car_image}
              alt="cta-car"
              className="w-full h-auto"
            />

            {/* decorative lights repositioned for small screens */}
            <img
              src={before_dark}
              alt="before-dark"
              className="absolute right-[6%] -top-6 w-[120px] h-auto opacity-80"
            />
            <img
              src={before_light}
              alt="before-light"
              className="absolute left-[10%] -top-10 w-[140px] h-auto opacity-90"
            />
          </div>
        </div>

        {/* Original desktop visuals preserved */}
        <div className="relative z-10 sm:!mr-[-30px] md:!mr-[-45px] lg:!mr-[-65px] hidden lg:block">
          <img
            src={data?.bgImages[0]?.carImages[0]?.url || car_image}
            className="sm:!mt-[-80px] md:!mt-[-110px] lg:!mt-[-48px] 2xl:!mt-[-138px] max-w-full h-auto"
            alt="cta-car"
          />
          <div className="relative -z-10">
            <img
              src={before_dark}
              className="absolute sm:right-[25px] sm:top-[-120px] md:right-[50px] md:top-[-200px] lg:right-[73px] lg:top-[-270px] xl:top-[-315px]"
              alt="before-dark"
            />
          </div>
          <div className="relative -z-40">
            <img
              src={before_light}
              alt="before-light"
              className="absolute sm:left:[80px] sm:top-[-180px] md:left-[130px] md:top-[-300px] lg:left-[180px] lg:top-[-425px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

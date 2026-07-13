import React, { useState, useEffect } from "react";

export const TestimonialSection = ({
  // testimonials = defaultTestimonials,
  className = "",
  data,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let slides = [];
  slides =
    Array.isArray(data?.testimonials) && data.testimonials.length
      ? data.testimonials
      : slides;

  // 2) Helper to safely grab the first image object no matter how it's nested
  const pickFirstImage = (carImages) => {
    if (!carImages) return null;

    const dive = (node) => {
      if (!node) return null;

      if (Array.isArray(node)) {
        for (const v of node) {
          const found = dive(v);
          if (found) return found;
        }
        return null;
      }

      if (typeof node === "object") {
        // direct object with a url
        if (typeof node.url === "string") return node;

        // handle weird numeric keys like { "0": { url: ... } }
        for (const v of Object.values(node)) {
          const found = dive(v);
          if (found) return found;
        }
      }

      return null;
    };

    return dive(carImages);
  };

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(id);
  }, [slides?.length]);

  useEffect(() => {
    if (currentIndex >= slides.length) setCurrentIndex(0);
  }, [slides?.length, currentIndex]);

  return (
    <section
      className={`relative w-full h-[750px] overflow-hidden max-md:h-[680px] max-sm:h-[800px] ${className}`}
      aria-label="Client testimonials"
    >
      {slides.map((t, index) => {
        const imgObj = pickFirstImage(t?.carImages);
        const bgImg =
          imgObj?.url ||
          t?.bgImages?.[0]?.url ||
          t?.backgroundImage || // supports your fallback defaultTestimonials
          "/services_bg.webp"; // final fallback

        const altText =
          imgObj?.alt ||
          `${t?.customerName || "Customer"} testimonial background`;

        return (
          <div
            key={`bg-${imgObj?.public_id || t?.customerName || index}`}
            className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={bgImg}
              alt={altText}
              className="w-full h-full object-cover"
              role="presentation"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        );
      })}

      {/* Header */}
      <header
        className="relative z-10 flex w-[663px] max-w-[90%] flex-col items-center gap-4 absolute left-1/2 -translate-x-1/2 top-[94px]
                          max-md:top-[80px] max-md:gap-3
                          max-sm:top-[64px] max-sm:gap-2"
      >
        <p className="text-white font-cinzel text-center text-[29px] font-normal max-md:text-[22px] max-sm:text-lg">
          {data?.title}
        </p>
        <h1
          className="text-center font-cinzel text-transparent bg-linear-gradient(180deg, #FFE1B8 0%, #FBC476 100%) font-normal leading-[71px] uppercase bg-clip-text
                       max-md:text-[44px] max-md:leading-[50px]
                       max-sm:text-[32px] max-sm:leading-[36px] powered-text-gradient"
        >
          {data?.subtitle}
        </h1>
      </header>

      {/* Content with Smooth Transitions */}
      <div
        className="relative z-10 w-[1152px] max-w-[90%] h-[327px] absolute left-1/2 -translate-x-1/2 top-[207px]
                      max-md:top-[230px] max-md:h-[310px]
                      max-sm:top-[150px] max-sm:h-auto"
      >
        {data?.testimonials?.map((testimonial, index) => (
          <article
            key={index}
            className={`absolute inset-0 transition-all duration-800 ease-in-out transform ${
              index === currentIndex
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p
              className="w-full text-white font-Poppins text-center text-[19px] italic font-light absolute h-[87px] left-0 top-0
                          max-md:static max-md:text-[17px] max-md:leading-[24px] max-md:px-4 max-md:h-auto
                          max-sm:text-[15px] max-sm:leading-[22px] max-sm:px-2 max-sm:mt-2"
            >
              {testimonial.feedback}
            </p>

            {/* Reviewer Profile */}
            <figure
              className="w-[276px] h-44 absolute left-1/2 -translate-x-1/2 top-[151px]
                               max-md:relative max-md:mx-auto mx-auto max-md:left-auto max-md:top-auto max-md:translate-x-0 max-md:mt-6
                               max-sm:w-[240px] max-sm:mt-5 max-sm:top-[0]"
            >
              <div
                className="w-[77px] h-[77px] rounded-full bg-white absolute left-[99px] top-0 overflow-hidden
                              max-md:left-1/2 max-md:-translate-x-1/2
                              max-sm:w-[65px] max-sm:h-[65px] max-sm:left-1/2"
              >
                {/* {testimonial.reviewer.avatarUrl ? ( */}
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.profession}'s profile picture`}
                  className="w-full h-[150px] object-cover"
                />
                {/* ) : ( */}
                {/* <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-2xl font-bold">
                    {testimonial.profession.charAt(0)}
                  </span>
                </div> */}
                {/* )} */}
              </div>

              <figcaption
                className="flex w-[276px] flex-col items-center gap-[3px] absolute h-[93px] left-0 max-sm:top-[80px] top-[83px]
                                     max-md:relative max-md:top-auto max-md:h-auto max-md:w-full max-md:mt-[88px]
                                     max-sm:w-[240px] max-sm:gap-1"
              >
                <h3
                  className="text-white text-center font-cinzel text-[32px] font-normal leading-[38px]
                               max-md:text-[26px] max-md:leading-[32px]
                               max-sm:text-[20px] max-sm:leading-[26px]"
                >
                  {testimonial.customerName}
                </h3>
                <p
                  className="text-white text-center text-[19px] italic font-light
                              max-md:text-[17px]
                              max-sm:text-[14px]"
                >
                  {testimonial.profession}
                </p>

                {/* Star Rating */}
                <div
                  className="flex justify-center items-center gap-1 w-[113px] h-5 mx-auto my-0
                             max-sm:w-[100px] max-sm:h-4"
                  role="img"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from(
                    { length: testimonial.rating },
                    (_, starIndex) => (
                      <span
                        key={starIndex}
                        className="text-[#FAB600] text-xl font-black leading-5 w-5 text-center
                                   max-sm:text-base max-sm:w-[16px]"
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    )
                  )}
                </div>
              </figcaption>
            </figure>
          </article>
        ))}
      </div>

      {/* Page Indicator */}
      <div
        className="relative z-10 text-white text-center text-xl font-normal leading-[29.5px] absolute left-1/2 -translate-x-1/2 w-[58px] h-[30px] top-[230px]
                   max-md:top-[260px]
                   max-sm:text-base max-sm:tracking-[2px] max-sm:top-[622px] max-sm:w-[50px] max-sm:h-[26px]"
        aria-label={`Page ${currentIndex + 1} of`}
      >
        {currentIndex + 1} / {data?.testimonials?.length}
      </div>
    </section>
  );
};

export default TestimonialSection;

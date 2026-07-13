import React from "react";

const PoweredBySection = ({ gotoNextSec, data }) => {
  return (
    <div className="overflow-hidden">
      <section className="relative h-screen w-screen">
        <div
          className="bgImage absolute inset-0 z-20 flex flex-col items-center justify-between"
        >
          <div className="bg-before"></div>

          <div className="text-center !px-4 sm:!px-6 lg:!px-8 !mt-8 sm:!mt-12 md:!mt-16 lg:!mt-[146px]">
            <h2
              ref={newTextRef}
              className="uppercase !text-white font-cinzel mt-4 sm:mt-6 md:mt-8 lg:mt-10 powered-text-gradient font-normal
                         !text-xl sm:!text-2xl md:!text-4xl lg:!text-[65px]
                         leading-tight sm:leading-8 md:leading-12 lg:leading-[55px]"
            >
              {data?.title}
            </h2>
            <h2
              ref={newTextRef1}
              className="uppercase !text-white font-cinzel mt-3 sm:mt-4 md:mt-6 lg:mt-10 powered-text-gradient font-normal
                         !text-xl sm:!text-2xl md:!text-4xl lg:!text-[65px]
                         leading-tight"
            >
              {data?.subtitle}
            </h2>
            <p
              className="text-white font-light mt-4 sm:mt-5 md:mt-6 lg:mt-8 mx-auto
                          text-xs sm:text-sm md:text-base lg:text-lg
                          max-w-sm sm:max-w-xl md:max-w-4xl lg:w-[1463px]
                          leading-relaxed px-2 sm:px-0"
            >
              {data?.description}
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-[25px] items-center
                          !mb-6 sm:!mb-8 md:!mb-10 lg:!mb-[45px] !px-4 sm:!px-6 lg:!px-0 w-full sm:w-auto"
          >
            {data?.icons?.map((iconContent, index) => (
              <div
                key={index}
                className="flex items-center justify-center flex-col rounded-lg w-full sm:w-auto
                         !px-6 sm:!px-8 md:!px-10 lg:!px-[45px] !py-4 sm:!py-3 lg:!py-[10px]
                         min-w-0 sm:min-w-[200px] md:min-w-[250px]"
                style={{
                  backgroundColor: "rgb(40, 41, 43)",
                  border: "1px solid #fff",
                }}
              >
                <img
                  src={iconContent?.icon}
                  alt="afford_cost"
                  className="w-6 sm:w-8 md:w-10 lg:w-auto h-6 sm:h-8 md:h-10 lg:h-auto object-contain"
                />
                <p className="powered-text-gradient font-cinzel mt-2 sm:mt-3 lg:mt-[15px] font-normal text-center text-xs sm:text-sm md:text-lg lg:text-[32px] mb-0">
                  {iconContent?.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PoweredBySection;
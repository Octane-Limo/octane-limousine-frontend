import { useState } from "react";
import { car_fleet_bg, clip_bg, fleet_bg, stars, underline } from "../assets";
import { BookingModal } from "./BookingModal";
import { useNavigate } from "react-router-dom";

export const FleetSection = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const navigate = useNavigate();

  const handleBookNow = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };
  const navigateToPage = () => {
    navigate("/our-fleets");
  };
  return (
    <>
      <section
        className="fleet-home-sec flex flex-col items-center justify-center w-full min-h-[908px]"
        style={{
          backgroundImage: `url(${data?.bgImages[0]?.url || fleet_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "30px",
        }}
      >
        {/* <div
          className="absolute inset-0 bg-black opacity-60"
          style={{ zIndex: 10 }}
        ></div> */}

        <div
          className="ourHomeFleet flex flex-col items-center justify-center w-full max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:min-w-[1600px] lg:max-w-[1200px] p-4 sm:p-6 md:p-8 bg-black bg-opacity-40 backdrop-blur-sm rounded-[20px] shadow-lg border-1 border-[#FFCD87] bg-gradient-to-r from-black to-transparent"
          style={{ zIndex: 10 }}
        >
          <h2
            className="!text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl !font-light leading-relaxed text-center text-white font-cinzel"
            style={{
              paddingTop: "10px",
            }}
          >
            {data?.title}
          </h2>

          <img
            src={underline}
            alt="underline"
            className="underline_Image block mx-auto w-1/2 md:w-1/3"
          />

          <p className="text-sm md:text-xl uppercase !mt-[15px] text-white font-light italic leading-relaxed text-center max-w-2xl mx-auto !mb-[50px]">
            {data?.subtitle}
          </p>

          {/* Fleet Images Section */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start justify-items-center mx-auto"
            style={{
              width: "100%",
              margin: "10px auto",
            }}
          >
            {data?.carImages?.map((car, index) => {
              return (
                <div
                  key={index}
                  className="bg-transparent flex flex-col items-center w-full max-w-[320px] sm:max-w-[350px] md:max-w-[380px] lg:w-[420px] min-h-[300px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[350px]"
                >
                  <div
                    className="w-full h-44 sm:h-48 md:h-52 lg:h-56 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center mb-3 sm:mb-4"
                    style={{
                      backgroundImage: `url(${car_fleet_bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <img
                      src={car.url}
                      alt={car.alt}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  <div className="flex items-center justify-between w-full px-2">
                    <h3 className="!text-lg sm:!text-xl md:!text-2xl lg:!text-[32px] font-cinzel text-white">
                      {car.title}
                    </h3>
                    <h3 className="!text-sm sm:!text-base md:!text-lg lg:!text-[20px] font-[300] font-cinzel text-white">
                      {car.subtitle}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between w-full px-2 mt-2">
                    <img
                      src={stars}
                      alt="stars"
                      className="w-16 sm:w-20 md:w-24 h-6 sm:h-7 md:h-8 object-contain"
                    />
                    <button
                      onClick={() => handleBookNow(car)}
                      className={`px-8 py-6 rounded-lg transition-all duration-300 bg-gradient-to-r from-[#ffe1b8] to-[#fbc476] !px-[10px] !py-[8px] w-[100px] !rounded-sm text-black font-normal italic shadow-lg hover:scale-105 transition-transform duration-300`}
                    >
                      {data?.carImages[0]?.buttons[0]?.text}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="flex items-center justify-center mt-8 sm:mt-10 md:mt-12 mb-6 w-full"
          style={{ zIndex: 30, margin: "30px sm:40px md:50px" }}
        >
          <button
            className="text-white border-2 border-[#ffb144] shadow-md px-6 sm:px-7 md:px-8 py-3 mx-auto font-light italic text-base sm:text-lg tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg !rounded-[8px]"
            style={{
              padding: "10px 100px",
            }}
            onClick={navigateToPage}
          >
            {data?.buttons[0]?.text}
          </button>
        </div>
      </section>

      {/* ← Yeh modal component add karna hai */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
      />
    </>
  );
};

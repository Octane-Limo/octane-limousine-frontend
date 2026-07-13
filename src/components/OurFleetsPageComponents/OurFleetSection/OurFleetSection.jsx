import { useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
import underline1 from "../../../assets/underline1.webp";
import underline2 from "../../../assets/underline2.webp";
import BookingModal from "../../BookingModal";
import "./OurFleetSection.css";

const OurFleetSection = ({ gotoNextSec, data }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBookNow = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const cardsRef = useRef(null);

  // Get car images from data
  const carImages = data?.carImages || [];

  // Calculate pagination
  const totalPages = Math.ceil(carImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCars = carImages.slice(startIndex, endIndex);

  // Handle pagination with animation
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !isAnimating) {
      setIsAnimating(true);

      // Add exit animation
      if (cardsRef.current) {
        cardsRef.current.style.opacity = '0';
        cardsRef.current.style.transform = 'translateY(20px)';
      }

      setTimeout(() => {
        setCurrentPage(page);

        // Add enter animation
        if (cardsRef.current) {
          cardsRef.current.style.opacity = '1';
          cardsRef.current.style.transform = 'translateY(0)';
        }

        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 6;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 3; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <>
      <section
        className="our-fleet-cars-sec"
        ref={gotoNextSec}
        style={{ backgroundImage: `url(${data?.bgImages[0]?.url})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="our-fleet-cars-box">
                <div className="our-core-values-content">
                  <h2>{data?.title}</h2>
                  <div className="d-flex align-items-center justify-content-center flex-col gap-2">
                    <img src={underline1} alt="underline1" />
                    <img src={underline2} alt="underline2" />
                  </div>
                  <p className="mt-3">
                    {data?.description}
                  </p>
                </div>

                <div
                  className="row"
                  ref={cardsRef}
                  style={{
                    transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                    opacity: 1,
                    transform: 'translateY(0)'
                  }}
                >
                  {currentCars.map((car, index) => (
                    <div
                      key={car.public_id || index}
                      className="col-lg-4"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <div className="our-core-card">
                        <div className="our-core-card-image">
                          <img
                            src={car.url}
                            alt={car.alt || car.title || `car-${index}`}
                          />
                        </div>
                        <div className="our-core-card-content">
                          <h3>{car.title}</h3>
                          <h4>{car.subtitle}</h4>
                        </div>
                        <div className="our-core-card-content-footer">
                          <div className="our-core-card-content-footer-stars">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                          </div>
                          <div className="our-core-card-content-footer-link">
                            <button
                              onClick={() => handleBookNow(car)}
                              className={`px-8 py-6 rounded-lg transition-all duration-300 bg-gradient-to-r from-[#ffe1b8] to-[#fbc476] !px-[10px] !py-[8px] w-[100px] !rounded-sm text-black font-normal italic shadow-lg hover:scale-105 transition-transform duration-300`}
                            >
                              {data?.carImages[0]?.buttons[0]?.text}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="our-fleet-cars-pagination">
                        {/* Previous Button */}
                        {currentPage > 1 && (
                          <button
                            onClick={handlePrevious}
                            disabled={isAnimating}
                            style={{
                              opacity: isAnimating ? 0.6 : 1,
                              cursor: isAnimating ? 'not-allowed' : 'pointer'
                            }}
                          >
                            Previous
                          </button>
                        )}

                        {/* Page Numbers */}
                        {getPageNumbers().map((pageNum) => (
                          <button
                            key={pageNum}
                            className={currentPage === pageNum ? "active-pagination" : ""}
                            onClick={() => handlePageChange(pageNum)}
                            disabled={isAnimating}
                            style={{
                              opacity: isAnimating ? 0.6 : 1,
                              cursor: isAnimating ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {pageNum.toString().padStart(2, '0')}
                          </button>
                        ))}

                        {/* Next Button */}
                        {currentPage < totalPages && (
                          <button
                            onClick={handleNext}
                            disabled={isAnimating}
                            style={{
                              opacity: isAnimating ? 0.6 : 1,
                              cursor: isAnimating ? 'not-allowed' : 'pointer'
                            }}
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
      />
    </>
  );
};

export default OurFleetSection;
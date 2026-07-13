import { jsPDF } from "jspdf";
import {
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Sparkles,
  Star,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export const BookingModal = ({ isOpen, onClose, selectedCar }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    customerName: "",
    phone: "",
    email: "",
  });
  const [mounted, setMounted] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_BASE =
    import.meta.env.VITE_REACT_APP_API_BASE || "https://octane-limousine-backend-lovat.vercel.app";

  const resetAll = () => {
    setCurrentStep(1);
    setSelectedDate(null);
    setSelectedTimes([]);
    setBookingDetails({ customerName: "", phone: "", email: "" });
    setShowConfirmationPopup(false);
    setIsBookingConfirmed(false);
    setMounted(false);
    setAvailableSlots([]);
    setIsLoadingSlots(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetAll();
    onClose?.();
  };

  useEffect(() => {
    if (isOpen) {
      resetAll();
      setMounted(true);
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  // helper: local YYYY-MM-DD (na ke toISOString())
  const formatLocalYMD = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // replace your fetchAvailableSlots with this:
  const fetchAvailableSlots = async (date) => {
    if (!date) return;

    setIsLoadingSlots(true);
    try {
      const formattedDate = formatLocalYMD(date);
      const response = await fetch(
        `${API_BASE}/api/appointment/slots?date=${formattedDate}`
      );

      if (response.ok) {
        const data = await response.json();
        const raw = data.availableSlots || data || [];

        // Convert UTC ISO strings to local time "HH:mm" format
        const slots = raw
          .map((isoString) => {
            // Parse the UTC ISO string
            const utcDate = new Date(isoString);

            // Convert to local time
            const localDate = new Date(
              utcDate.getUTCFullYear(),
              utcDate.getUTCMonth(),
              utcDate.getUTCDate(),
              utcDate.getUTCHours(),
              utcDate.getUTCMinutes(),
              utcDate.getUTCSeconds()
            );

            return localDate;
          })
          .filter((d) => {
            return (
              d.getFullYear() === date.getFullYear() &&
              d.getMonth() === date.getMonth() &&
              d.getDate() === date.getDate()
            );
          })
          .map((d) => {
            // Convert Date to "HH:mm" format
            return `${String(d.getHours()).padStart(2, "0")}:${String(
              d.getMinutes()
            ).padStart(2, "0")}`;
          })
          .sort();

        setAvailableSlots(slots);

      } else {
        console.error("Failed to fetch slots");
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
      setAvailableSlots([]);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  // Generate calendar dates
  const generateCalendar = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Generate time slots (24 hours)
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, "0");
      slots.push(`${hour}:00`);
    }
    return slots;
  };

  const dates = generateCalendar();
  const timeSlots = generateTimeSlots();

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Check if slot is available based on API response
  const isSlotAvailable = (time) =>
    !isLoadingSlots && availableSlots.includes(time);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimes([]);
    fetchAvailableSlots(date);
  };

  const handleTimeSelect = (time) => {
    if (isSlotAvailable(time)) {
      setSelectedTimes((prev) => {
        if (prev.includes(time)) {
          return prev.filter((t) => t !== time);
        } else {
          return [...prev, time];
        }
      });
    }
  };

  const validateEmail = (email = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const nextStep = () => {
    if (currentStep === 1 && !canProceedToStep2) return;
    if (currentStep === 2 && (!validateEmail(bookingDetails.email) || !canSubmit)) return;

    if (currentStep < 3) setCurrentStep((s) => s + 1);
  };



  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field, value) => {
    setBookingDetails({ ...bookingDetails, [field]: value });
  };

  // Submit booking to API
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Format times to match backend expectation (UTC format)
      const formattedTimes = selectedTimes.map((time) => {
        // If time is a simple time string (e.g., "10:00")
        if (typeof time === "string" && time.length <= 5) {
          // Create a full datetime string in UTC using the selected date
          const dateStr = selectedDate.toISOString().split("T")[0];
          return `${dateStr}T${time}:00.000Z`;
        }
        // If it's already a Date object
        else if (time instanceof Date) {
          return time.toISOString();
        }
        // If it's already in the correct format
        return time;
      });

      const bookingData = {
        appointmentTimes: formattedTimes,
        name: bookingDetails.customerName,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        carName: selectedCar.title,
        carModel: selectedCar.subtitle,
        carImage: selectedCar.url,
      };

      const response = await fetch(`${API_BASE}/api/appointment/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        const result = await response.json();
        setIsBookingConfirmed(true);
        setShowConfirmationPopup(true);
        setCurrentStep(3);
      } else {
        const error = await response.json();
        alert(error.message || "Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred while booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const bookingData = {
      car: selectedCar.title + " - " + selectedCar.subtitle,
      date: selectedDate ? selectedDate.toDateString() : "",
      times: (selectedTimes || []).join(", "),
      customer: bookingDetails.customerName,
      phone: bookingDetails.phone,
      email: bookingDetails.email,
      bookingId: "BK" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      generatedOn: new Date().toLocaleDateString(),
    };

    const lineHeight = 18;
    const left = 40;
    let y = 60;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("CAR BOOKING CONFIRMATION", left, y);
    y += 14;
    doc.setLineWidth(0.5);
    doc.line(left, y, 555, y); // underline
    y += 24;

    // Meta
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Booking ID: ${bookingData.bookingId}`, left, y);
    y += lineHeight;
    doc.text(`Date Generated: ${bookingData.generatedOn}`, left, y);
    y += lineHeight + 6;

    // Vehicle
    doc.setFont("helvetica", "bold");
    doc.text("VEHICLE DETAILS:", left, y);
    y += lineHeight;
    doc.setFont("helvetica", "normal");
    doc.text(`Vehicle: ${bookingData.car}`, left, y);
    y += lineHeight;
    doc.text(`Status: Confirmed`, left, y);
    y += lineHeight + 6;

    // Booking
    doc.setFont("helvetica", "bold");
    doc.text("BOOKING DETAILS:", left, y);
    y += lineHeight;
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${bookingData.date}`, left, y);
    y += lineHeight;
    doc.text(`Time Slots: ${bookingData.times}`, left, y);
    y += lineHeight + 6;

    // Customer
    doc.setFont("helvetica", "bold");
    doc.text("CUSTOMER INFORMATION:", left, y);
    y += lineHeight;
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${bookingData.customer}`, left, y);
    y += lineHeight;
    doc.text(`Phone: ${bookingData.phone}`, left, y);
    y += lineHeight;
    doc.text(`Email: ${bookingData.email}`, left, y);
    y += lineHeight + 6;

    // Save as real PDF
    doc.save(`booking-confirmation-${bookingData.bookingId}.pdf`);

    handleClose();
  };

  const canProceedToStep2 = selectedDate && selectedTimes.length > 0;
  const canSubmit =
    bookingDetails.customerName && bookingDetails.phone && bookingDetails.email;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      </div>

      <div
        className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden border-2 border-gray-300 transform transition-all duration-500 ${mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#fbc476] to-[#fbc476] text-black font-bold p-4 sm:p-6 lg:p-8">
          <div className="relative flex justify-between items-start sm:items-center">
            <div className="flex items-start sm:items-center space-x-3 sm:space-x-6">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Car className="w-5 h-5 sm:w-7 sm:h-7 text-black" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-black animate-spin" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif mb-1 leading-tight">
                  Reserve Your Experience
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <p className="text-base sm:text-lg opacity-80 truncate">
                    {selectedCar?.title}
                  </p>
                  <span className="hidden sm:inline text-sm opacity-60">•</span>
                  <p className="text-sm opacity-80 font-medium">
                    {selectedCar?.subtitle}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-110 flex-shrink-0"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="relative flex justify-center mt-6 sm:mt-8 space-x-4 sm:space-x-6">
            <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-px bg-white/20"></div>
            {[1, 2, 3].map((step) => (
              <div key={step} className="relative flex flex-col items-center">
                <div
                  className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-xs sm:text-sm font-bold backdrop-blur-sm border-2 transition-all duration-500 transform ${currentStep >= step
                    ? "bg-white text-black border-white scale-110 shadow-xl"
                    : "bg-white/20 text-white/60 border-white/20 hover:scale-105"
                    }`}
                >
                  {currentStep > step ? (
                    <Check className="w-4 h-4 sm:w-6 sm:h-6 animate-in zoom-in duration-300" />
                  ) : (
                    <span className="text-sm sm:text-lg">{step}</span>
                  )}
                </div>
                <span className="mt-2 text-xs font-medium opacity-80">
                  {step === 1 ? "DateTime" : step === 2 ? "Details" : "Summary"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[50vh] sm:max-h-[60vh]">
          {/* Step 1: Date & Time Selection */}
          {currentStep === 1 && (
            <div
              className={`space-y-6 sm:space-y-8 transform transition-all duration-700 ${mounted
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
                }`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black font-serif">
                  Select Your Preferred Time
                </h3>
              </div>

              {/* Date Selection */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-lg sm:text-xl text-black font-medium flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  Choose Date
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-4 max-h-48 sm:max-h-64 overflow-y-auto custom-scrollbar">
                  {dates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      className={`relative p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 text-xs sm:text-sm font-medium transform hover:scale-105 ${selectedDate?.toDateString() === date.toDateString()
                        ? "bg-black text-white border-black shadow-lg scale-105"
                        : "bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50"
                        }`}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div
                  className={`space-y-3 sm:space-y-4 transform transition-all duration-500 ${selectedDate
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                    }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <h4 className="text-lg sm:text-xl text-black font-medium flex items-center">
                      <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-black" />
                      Available Time Slots
                      {isLoadingSlots && (
                        <div className="ml-3 w-3 h-3 sm:w-4 sm:h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </h4>
                    {selectedTimes.length > 0 && (
                      <div className="text-xs sm:text-sm text-black flex items-center">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {selectedTimes.length} slot
                        {selectedTimes.length > 1 ? "s" : ""} selected
                      </div>
                    )}
                  </div>

                  {isLoadingSlots ? (
                    <div className="flex justify-center py-8">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 max-h-48 sm:max-h-64 overflow-y-auto custom-scrollbar">
                      {timeSlots.map((time, index) => {
                        const available = isSlotAvailable(time);
                        const isSelected = selectedTimes.includes(time);
                        return (
                          <button
                            key={index}
                            onClick={() => handleTimeSelect(time)}
                            disabled={!available}
                            className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-300 text-xs sm:text-sm font-medium transform ${isSelected
                              ? "bg-black text-white border-black shadow-lg scale-105"
                              : available
                                ? "bg-white text-black border-gray-300 hover:border-black hover:bg-gray-50 hover:scale-105"
                                : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
                              }`}
                          >
                            {time}
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-black rounded-full flex items-center justify-center">
                                <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                              </div>
                            )}
                            {!available && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <X className="w-2 h-2 sm:w-3 sm:h-3 text-gray-400" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Customer Details */}
          {currentStep === 2 && (
            <div
              className={`space-y-6 sm:space-y-8 transform transition-all duration-700 ${currentStep === 2
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
                }`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg sm:rounded-xl flex items-center justify-center">
                  <User className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black font-serif">
                  Customer Details
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="lg:col-span-2 space-y-2 sm:space-y-3">
                  <label className="block text-black text-base sm:text-lg font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={bookingDetails.customerName}
                      onChange={(e) =>
                        handleInputChange("customerName", e.target.value)
                      }
                      className="w-full p-3 sm:p-4 bg-white border-2 border-gray-300 rounded-xl sm:rounded-2xl text-black focus:border-black focus:outline-none transition-all duration-300 pl-4 sm:pl-12"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-black text-base sm:text-lg font-medium flex items-center">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={bookingDetails.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full p-3 sm:p-4 bg-white border-2 border-gray-300 rounded-xl sm:rounded-2xl text-black focus:border-black focus:outline-none transition-all duration-300 pl-4 sm:pl-12"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="block text-black text-base sm:text-lg font-medium flex items-center">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={bookingDetails.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full p-3 sm:p-4 bg-white border-2 border-gray-300 rounded-xl sm:rounded-2xl text-black focus:border-black focus:outline-none transition-all duration-300 pl-4 sm:pl-12"
                      placeholder="Enter email address"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Booking Summary */}
          {currentStep === 3 && (
            <div
              className={`space-y-6 sm:space-y-8 transform transition-all duration-700 ${currentStep === 3
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
                }`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black font-serif">
                  Booking Summary
                </h3>
              </div>

              {/* Complete Summary */}
              <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border-2 border-gray-200 shadow-xl">
                <h4 className="text-black font-bold mb-4 sm:mb-6 text-xl sm:text-2xl flex items-center">
                  <Car className="w-5 h-5 sm:w-7 sm:h-7 text-black mr-2 sm:mr-3" />
                  Complete Booking Details
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-black">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white rounded-lg sm:rounded-xl border">
                      <span className="font-medium text-sm sm:text-base">
                        Car:
                      </span>
                      <span className="font-bold text-sm sm:text-base mt-1 sm:mt-0">
                        {selectedCar?.title} {selectedCar?.model}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white rounded-lg sm:rounded-xl border">
                      <span className="font-medium text-sm sm:text-base">
                        Date:
                      </span>
                      <span className="font-bold text-sm sm:text-base mt-1 sm:mt-0">
                        {selectedDate?.toDateString()}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between p-3 bg-white rounded-lg sm:rounded-xl border">
                      <span className="font-medium text-sm sm:text-base mb-2 sm:mb-0">
                        Times:
                      </span>
                      <div className="flex flex-wrap gap-1 sm:justify-end">
                        {selectedTimes.map((time, index) => (
                          <span
                            key={index}
                            className="font-bold text-white bg-black px-2 py-1 rounded text-xs"
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white rounded-lg sm:rounded-xl border">
                      <span className="font-medium text-sm sm:text-base">
                        Customer:
                      </span>
                      <span className="font-bold text-sm sm:text-base mt-1 sm:mt-0 sm:text-right">
                        {bookingDetails.customerName}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white rounded-lg sm:rounded-xl border">
                      <span className="font-medium text-sm sm:text-base">
                        Phone:
                      </span>
                      <span className="font-bold text-sm sm:text-base mt-1 sm:mt-0 sm:text-right">
                        {bookingDetails.phone}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-white rounded-lg sm:rounded-xl border">
                      <span className="font-medium text-sm sm:text-base">
                        Email:
                      </span>
                      <span className="font-bold text-sm sm:text-base mt-1 sm:mt-0 sm:text-right break-all">
                        {bookingDetails.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* PDF Download Button - Only show after booking is confirmed */}
                {isBookingConfirmed && (
                  <div className="mt-6 sm:mt-8 flex justify-center">
                    <button
                      onClick={generatePDF}
                      className="flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-xl sm:rounded-2xl hover:bg-gray-800 transition-all duration-300 font-bold transform hover:scale-105 shadow-xl text-sm sm:text-base"
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Download PDF Confirmation
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enhanced Footer */}
          <div className="relative p-4 sm:p-6 border-t border-gray-200 mt-6 sm:mt-8">
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center px-4 sm:px-8 py-2 sm:py-3 !bg-gray-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg rounded-xl sm:rounded-2xl text-sm sm:text-base"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !canProceedToStep2) ||
                    (currentStep === 2 && (!validateEmail(bookingDetails.email) || !canSubmit))
                  }
                  className="flex items-center px-4 sm:px-8 py-2 sm:py-3 bg-black text-white rounded sm:rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold transform hover:scale-105 disabled:hover:scale-100 shadow-lg text-sm sm:text-base"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                </button>

              ) : !isBookingConfirmed ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center px-3 sm:px-10 py-2 sm:py-3 !bg-green-800 hover:bg-green-700 text-white rounded sm:rounded-2xl transition-all duration-300 font-bold transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base confirmBookingBTN"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Booking...
                    </>
                  ) : (
                    <>
                      {/* <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> */}
                      Confirm Booking
                    </>
                  )}
                </button>
              ) : (
                <div className="flex items-center text-green-900 font-bold text-sm sm:text-base">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-900" />
                  Booking Confirmed!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation Popup */}
        {showConfirmationPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm sm:max-w-md w-full mx-4 transform animate-in zoom-in duration-300">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">
                  Thank You!
                </h3>
                <p className="text-black mb-4 sm:mb-6 text-sm sm:text-base">
                  Your booking has been confirmed successfully. You can now
                  download your confirmation PDF.
                </p>
                <button
                  onClick={() => setShowConfirmationPopup(false)}
                  className="px-6 py-3 bg-black text-white rounded-xl sm:rounded-2xl hover:bg-gray-800 transition-all duration-300 font-bold text-sm sm:text-base"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        <style>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    @media (min-width: 640px) {
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(0, 0, 0, 0.1);
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(0, 0, 0, 0.5);
                    }
                `}</style>
      </div>
    </div>
  );
};

export default BookingModal;

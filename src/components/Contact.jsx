import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";

export const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const baseURL =
    import.meta.env.VITE_REACT_APP_API_BASE || "https://octane-limousine-backend.vercel.app";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.message
    ) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${baseURL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();

        // Reset form on successful submission
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });

        setSubmitStatus("success");
        toast.success("Message sent successfully!", { duration: 5000 });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      toast.error("Failed to send message. Please try again.", {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center !px-[1rem] max-sm:!px-[0.5rem]"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #353535 100%)",
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="flex justify-end items-start gap-16 w-[1600px] h-[767px] relative px-14 py-[42px] rounded-[40px] border-2 border-[#FFCD87] bg-cover bg-center bg-no-repeat overflow-hidden max-md:flex-col max-md:gap-6 max-md:w-full max-md:max-w-[500px] max-md:h-auto max-md:p-[20px] max-sm:gap-[20px] max-sm:p-[15px] max-sm:rounded-[20px] max-sm:max-w-[350px]"
        style={{
          backgroundImage: `url(${data?.bgImages[0]?.url})`,
          paddingTop: "0px",
        }}
      >
        <section
          className="contactComp_shadow flex flex-col items-start gap-[6px] absolute top-[0px] left-[0px] w-[655px] h-[767px] max-md:relative max-md:top-0 max-md:left-0 max-md:w-full max-md:h-auto !py-[42px] !px-[56px] max-md:!py-[20px] max-md:!px-[20px] max-sm:!py-[15px] max-sm:!px-[15px]"
          style={{
            background:
              "linear-gradient(270deg, rgba(0, 0, 0, 0) 35.64%, #000000 100%)",
          }}
        >
          <header className="flex flex-col items-center gap-[28px] max-md:gap-[20px] max-sm:gap-[15px]">
            <div className="flex flex-col items-center self-stretch">
              <h2 className=" text-white !text-[65px] !font-normal leading-[71px] uppercase max-md:w-full max-md:!text-[36px] max-md:leading-[42px] max-sm:!text-[28px] max-sm:leading-[34px] font-cinzel max-md:text-center">
                {data?.title}
              </h2>
            </div>
            <p className="w-[549px] text-white text-[19px] contactComp-para font-Poppins italic font-light max-md:w-full max-md:text-[16px] max-sm:text-[14px] max-md:text-center">
              {data?.description}
            </p>
          </header>

          <address className="flex flex-col items-start gap-[3px] self-stretch not-italic max-md:gap-[8px]">
            <div className="flex items-center gap-4 !py-[24px] !px-[24px] rounded-2xl max-md:p-[15px] max-sm:gap-3 max-sm:p-[12px] border-2 border-transparent  hover:border-white transition-colors duration-300">
              <Mail className="w-6 h-6 text-white max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4 flex-shrink-0" />
              <a
                href={`mailto:${data?.icons[0]?.title}`}
                className="text-white text-[19px] font-Poppins italic font-light underline overflow-hidden text-ellipsis max-md:text-[16px] max-sm:text-[14px] hover:text-gray-200 transition-colors break-all"
              >
                {data?.icons[0]?.title}
              </a>
            </div>

            <div className="flex items-center gap-4 !py-[24px] !px-[24px] rounded-2xl max-md:p-[15px] max-sm:gap-3 max-sm:p-[12px] border-2 border-transparent  hover:border-white transition-colors duration-300">
              <Phone className="w-6 h-6 text-white max-md:w-5 max-md:h-5 max-sm:w-4 max-sm:h-4 flex-shrink-0" />
              <a
                href={`tel:${data?.icons[1]?.title}`}
                className="text-white text-[19px] font-Poppins italic font-light underline max-md:text-[16px] max-sm:text-[14px] hover:text-gray-200 transition-colors"
              >
                {data?.icons[1]?.title}
              </a>
            </div>

            <div className="flex items-start gap-4 !py-[24px] !px-[24px] rounded-2xl max-md:p-[15px] max-sm:gap-3 max-sm:p-[12px] border-2 border-transparent  hover:border-white transition-colors duration-300">
              <MapPin className="w-6 h-7 text-white max-md:w-5 max-md:h-6 max-sm:w-4 max-sm:h-5 flex-shrink-0 mt-1" />
              <span className="text-white text-[19px] font-Poppins italic font-light underline w-[403px] max-md:w-full max-md:text-[16px] max-sm:text-[14px]">
                {data?.icons[2]?.title}
              </span>
            </div>
          </address>

          <div className="w-[211px] h-16 relative inline-flex items-center gap-[4px] max-md:w-full max-md:justify-center max-sm:gap-3 max-md:mt-4">
            {/* Facebook Icon */}
            <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-transparent cursor-pointer transition-colors group hover:!bg-white max-md:w-[50px] max-md:h-[50px] max-sm:w-[45px] max-sm:h-[45px]">
              <a
                href="https://www.facebook.com/octanelimousine"
                target="_blank"
                className="!text-white group-hover:!text-black transition-colors"
              >
                <FaFacebookF
                  size={22}
                  className="fill-current max-md:w-[18px] max-md:h-[18px] max-sm:w-[16px] max-sm:h-[16px]"
                />
              </a>
            </div>

            {/* Instagram Icon */}
            <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-transparent cursor-pointer transition-colors group hover:!bg-white max-md:w-[50px] max-md:h-[50px] max-sm:w-[45px] max-sm:h-[45px]">
              <a
                href="https://www.instagram.com/octanelimousine/"
                target="_blank"
                className="!text-white group-hover:!text-black transition-colors"
              >
                <FaInstagram
                  size={22}
                  className="fill-current max-md:w-[18px] max-md:h-[18px] max-sm:w-[16px] max-sm:h-[16px]"
                />
              </a>
            </div>

            {/* WhatsApp Icon */}
            <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-transparent cursor-pointer transition-colors group hover:!bg-white max-md:w-[50px] max-md:h-[50px] max-sm:w-[45px] max-sm:h-[45px]">
              <a
                href="#"
                className="!text-white group-hover:!text-black transition-colors"
              >
                <FaWhatsapp
                  size={22}
                  className="fill-current max-md:w-[18px] max-md:h-[18px] max-sm:w-[16px] max-sm:h-[16px]"
                />
              </a>
            </div>
          </div>
        </section>

        <div
          className="contactCompForm flex flex-col items-start gap-[30px] absolute top-[42px] right-[50px] h-[677px] rounded-[20px] !px-[30px] !py-[25px] max-md:relative max-md:top-0 max-md:left-0 w-[100%] lg:w-[700px] 2xl:w-[700px] max-md:h-auto max-md:gap-[20px] max-sm:gap-[18px] max-md:!p-[20px] max-sm:!p-[15px] pt-[25px] pr-[0px] pb-[25px] pl-[30px] !ml-[-42px] max-md:!ml-[0px]"
          style={{
            background: "#00000066",
            backdropFilter: "blur(75px)",
          }}
        >
          <h3 className="font-cinzel !text-[60px] leading-[66px] !font-[400] text-white max-md:!text-[32px] max-md:leading-[38px] max-sm:!text-[24px] max-sm:leading-[30px] max-md:text-center">
            {data?.subtitle}
          </h3>

          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="!mb-[50px] max-md:!mb-[30px] max-sm:!mb-[25px] w-[100%] h-[30px] max-md:h-[35px] border-0 !border-b !border-b-[#FFE1B866] outline-0 !py-[10px] text-white italic bg-transparent placeholder-gray-300 max-md:text-[16px] max-sm:text-[14px] disabled:opacity-50"
            />
            <input
              type="number"
              placeholder="Your Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="!mb-[50px] max-md:!mb-[30px] max-sm:!mb-[25px] w-[100%] h-[30px] max-md:h-[35px] border-0 !border-b !border-b-[#FFE1B866] outline-0 !py-[10px] text-white italic bg-transparent placeholder-gray-300 max-md:text-[16px] max-sm:text-[14px] disabled:opacity-50"
            />
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="!mb-[50px] max-md:!mb-[30px] max-sm:!mb-[25px] w-[100%] h-[30px] max-md:h-[35px] border-0 !border-b !border-b-[#FFE1B866] outline-0 !py-[10px] text-white italic bg-transparent placeholder-gray-300 max-md:text-[16px] max-sm:text-[14px] disabled:opacity-50"
            />
            <textarea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              className="!mb-[30px] max-md:!mb-[25px] max-sm:!mb-[20px] w-[100%] h-[120px] max-md:h-[80px] max-sm:h-[70px] border-0 !border-b !border-b-[#FFE1B866] outline-0 !py-[10px] text-white resize-none italic bg-transparent placeholder-gray-300 max-md:text-[16px] max-sm:text-[14px] disabled:opacity-50"
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="text-black contact-form-btn w-[100%] flex justify-center items-center outline-0 !rounded-[10px] italic font-poppins text-[20px] max-md:text-[18px] max-sm:text-[16px] !py-[13px] max-md:!py-[12px] max-sm:!py-[10px] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: isSubmitting
                  ? "linear-gradient(180deg, #ccc 0%, #999 100%)"
                  : "linear-gradient(180deg, #FFE1B8 0%, #FBC476 100%)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? (
                <>
                  Sending...
                  <div className="ml-2 w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  Contact Now{" "}
                  <GoArrowUpRight
                    color="#000"
                    size={22}
                    className="ml-1 max-md:w-[20px] max-md:h-[20px] max-sm:w-[18px] max-sm:h-[18px]"
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-[-5px] left-0 w-full z-50 flex justify-center">
      <nav
        className="main-header backdrop-blur-[109.5px] bg-black/10 max-w-[1600px] w-full flex items-center justify-between !px-[40px] !py-[12px] shadow-lg mx-auto overflow-visible rounded-xl relative my-2"
        style={{
          padding: "0 12px",
          borderRadius: "12px",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white/50 via-white/20 to-white/50 rounded-t-xl"
          style={{ borderRadius: "12px 12px 0 0" }}
        ></div>

        <div
          className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-white/50 via-white/20 to-transparent"
          style={{ borderRadius: "12px 0 0 12px" }}
        ></div>

        <div
          className="absolute top-0 bottom-0 right-0 w-0.5 bg-gradient-to-b from-white/50 via-white/20 to-transparent"
          style={{ borderRadius: "0 12px 12px 0" }}
        ></div>

        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/30"
          style={{ borderRadius: "0 0 12px 12px" }}
        ></div>

        {/* Desktop Social Icons - exactly same as original */}
        <div className="hidden xl:flex items-center gap-[12px] ml-4">
          <a
            href="#"
            className="w-[34px] h-[34px] flex items-center justify-center rounded-[100%]"
            style={{
              background: "linear-gradient(180deg, #FFE1B8 0%, #FBC476 100%)",
            }}
          >
            <FaInstagram color="#000" size={20} />
          </a>
          <a
            href="#"
            className="w-[34px] h-[34px] flex items-center justify-center rounded-[100%]"
            style={{
              background: "linear-gradient(180deg, #FFE1B8 0%, #FBC476 100%)",
            }}
          >
            <FaLinkedinIn color="#000" size={20} />
          </a>
          <a
            href="#"
            className="w-[34px] h-[34px] flex items-center justify-center rounded-[100%]"
            style={{
              background: "linear-gradient(180deg, #FFE1B8 0%, #FBC476 100%)",
            }}
          >
            <FaFacebookF color="#000" size={20} />
          </a>
        </div>

        {/* Mobile: Logo and Hamburger */}
        <div className="xl:hidden flex items-center justify-between w-full">
          <span className="text-2xl font-bold text-white tracking-wide">
            <Link to={"/"}>
              <img
                src={logo}
                alt="Logo"
                className="inline-block h-8"
                style={{
                  objectFit: "contain",
                  verticalAlign: "middle",
                }}
              />
            </Link>
          </span>
          <button
            onClick={toggleMenu}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Navigation - exactly same as original */}
        <div className="hidden xl:flex text-lg items-center gap-8">
          <Link
            to={"/about-us"}
            className="text-white hover:text-gray-300 transition-colors duration-300 font-light italic"
          >
            About Us
          </Link>
          <Link
            to={"/services"}
            className="text-white hover:text-gray-300 transition-colors duration-300 font-light italic"
          >
            Services
          </Link>
          <span className="mx-4 text-2xl font-bold text-white tracking-wide">
            <Link to={"/"}>
              <img
                src={logo}
                alt="Logo"
                className="inline-block"
                style={{
                  objectFit: "contain",
                  verticalAlign: "middle",
                }}
              />
            </Link>
          </span>
          <Link
            to={"/our-fleets"}
            className="text-white hover:text-gray-300 transition-colors duration-300 font-light italic"
          >
            Our Fleet
          </Link>
          <Link
            to="/testimonials"
            className="text-white hover:text-gray-300 transition-colors duration-300 font-light italic"
          >
            Testimonial
          </Link>
        </div>

        {/* Desktop Contact Button - exactly same as original */}
        <div className="hidden xl:block">
          <Link
            style={{
              background: "linear-gradient(180deg, #FFE1B8 0%, #FBC476 100%)",
            }}
            className="!text-[#000000] font-[400] !py-[10px] !px-[37px] text-[18px] italic rounded-[8px]"
            to="/contact-us"
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Sidebar - Smooth slide animation */}
      <div
        className={`xl:hidden fixed inset-y-0 right-0 z-40 w-70 backdrop-blur-[109.5px] bg-black/30 shadow-xl border-l border-white/10 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="flex flex-col px-6 pb-6 space-y-4 flex-1">
            <Link
              to={"/about-us"}
              className="text-white hover:text-gray-300 transition-colors duration-300 font-light italic text-center py-3 hover:bg-white/5 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to={"/services"}
              className="text-white hover:text-gray-300 transition-colors duration-300 font-light italic text-center py-3 hover:bg-white/5 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to={"/our-fleets"}
              className="text-white hover:text-gray-300 transition-colors duration-300 font-light italic text-center py-3 hover:bg-white/5 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Fleet
            </Link>
            <Link
              to="/testimonials"
              className="text-white hover:text-gray-300 transition-colors duration-300 font-light italic text-center py-3 hover:bg-white/5 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonial
            </Link>

            <div className="flex items-center justify-center gap-3 py-4 border-t border-white/10">
              <a
                href="#"
                className="w-[34px] h-[34px] flex items-center justify-center rounded-[100%]"
                style={{
                  background:
                    "linear-gradient(180deg, #FFE1B8 0%, #FBC476 100%)",
                }}
              >
                <FaInstagram color="#000" size={20} />
              </a>
              <a
                href="#"
                className="w-[34px] h-[34px] flex items-center justify-center rounded-[100%]"
                style={{
                  background:
                    "linear-gradient(180deg, #FFE1B8 0%, #FBC476 100%)",
                }}
              >
                <FaLinkedinIn color="#000" size={20} />
              </a>
              <a
                href="#"
                className="w-[34px] h-[34px] flex items-center justify-center rounded-[100%]"
                style={{
                  background:
                    "linear-gradient(180deg, #FFE1B8 0%, #FBC476 100%)",
                }}
              >
                <FaFacebookF color="#000" size={20} />
              </a>
            </div>

            <Link
              style={{
                background: "linear-gradient(180deg, #FFE1B8 0%, #FBC476 100%)",
              }}
              className="!text-[#000000] font-[400] !py-[10px] !px-[37px] text-[18px] italic rounded-[8px] text-center hover:opacity-90 transition-opacity"
              to="/contact-us"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

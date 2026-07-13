import { Link } from "react-router-dom";

export function Footer({ data }) {
  return (
    <div
      className="w-full font-Poppins"
      style={{
        background: "linear-gradient(360deg, #000000 0%, #353535 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-[50px] py-[40px]">
        <div className="flex flex-col items-center gap-[5px] w-full max-w-[1601px]">
          <div className="!mb-[0] w-full max-w-[1601px]">
            <Link to={"/"}>
              <img src={data?.bgImages[0]?.url} alt="" />
            </Link>
          </div>
          <div className="text-white font-Poppins text-[19px] font-light italic leading-normal text-center max-w-[1400px] px-4">
            <p className="!mb-[0]">
              {data?.description}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-[50px] flex-wrap justify-center max-sm:gap-[25px] max-sm:flex-col max-sm:items-center">
          <div className="font-['Poppins'] text-[19px] font-normal italic cursor-pointer hover:opacity-80 transition-opacity">
            <Link to={"/"} style={{ color: "#FBC476" }}>
              Home
            </Link>
          </div>
          <div className="font-['Poppins'] text-[19px] font-normal italic bg-gradient-to-b from-[#FFE1B8] to-[#FBC476] bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
            <Link to={"/about-us"} style={{ color: "#FBC476" }}>
              About Us
            </Link>
          </div>
          <div className="font-['Poppins'] text-[19px] font-normal italic bg-gradient-to-b from-[#FFE1B8] to-[#FBC476] bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
            <Link to={"/services"} style={{ color: "#FBC476" }}>
              Services
            </Link>
          </div>
          <div className="font-['Poppins'] text-[19px] font-normal italic bg-gradient-to-b from-[#FFE1B8] to-[#FBC476] bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
            <Link to={"/our-fleets"} style={{ color: "#FBC476" }}>
              Our Fleet
            </Link>
          </div>
          <div className="font-['Poppins'] text-[19px] font-normal italic bg-gradient-to-b from-[#FFE1B8] to-[#FBC476] bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
            <Link to={"/contact-us"} style={{ color: "#FBC476" }}>
              Contact Us
            </Link>
          </div>
        </div>
        <div className="!mb-[0] w-full h-[75px] bg-gradient-to-b from-[#FFE1B8] to-[#FBC476] flex items-center justify-center px-4">
          <div className="text-[#000000] font-['Poppins'] text-[19px] italic font-normal text-center max-sm:text-[16px] max-sm:leading-tight">
            <span className="font-normal">Ⓒ All Rights Reserved</span>
            <span className="font-bold"> 2025</span>
            <span className="font-normal">
              {" "}
              - Octane Limousine . Powered by{" "}
            </span>
            <a
              href="https://xynctech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline text-black"
            >
              Xynctech
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

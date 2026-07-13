import React, { useState } from "react";

const Button = ({ text, onClick, isPrimary }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`px-8 py-6 rounded-lg transition-all duration-300 
            ${
              !isPrimary
                ? "bg-gradient-to-r from-[#ffe1b8] to-[#fbc476] !px-[10px] !py-[8px] w-[100px] !rounded-sm text-black font-normal italic shadow-lg hover:scale-105 transition-transform duration-300"
                : "bg-transparent border-2 border-[#ffe1b8] w-[100px] h-[25px] text-white px-2 py-2 !rounded-sm"
            }
            `}
      onCanPlay={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

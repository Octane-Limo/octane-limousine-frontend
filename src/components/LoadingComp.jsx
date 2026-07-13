import React, { useEffect } from "react";
import video from "../assets/loading-screen.mp4";
import "./LoadingComp.css";

const LoadingComp = ({ setIsLoading }) => {
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, []);

  return (
    <>
      <div className="loading-screen">
        <video className="loading-video" autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
};

export default LoadingComp;

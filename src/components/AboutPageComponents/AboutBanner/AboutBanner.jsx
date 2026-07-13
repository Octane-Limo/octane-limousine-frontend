import React from "react";
import "./AboutBanner.css";
import GotoNext from "../../../assets/goto-next.webp";

const AboutBanner = ({ scrollToNextSection, data }) => {

  return (
    <section
      className="about-banner"
      style={{ backgroundImage: `url(${data?.bgImages[0]?.url})` }}
    >
      <div className="about-banner-shade"></div>
      <div className="about-banner-shade1"></div>
      <div className="about-banner-car-right" style={{ backgroundImage: `url(${data?.bgImages[0]?.carImages[0]?.url})` }}></div>
      <div className="about-banner-car-left" style={{ backgroundImage: `url(${data?.bgImages[0]?.carImages[1]?.url})` }}></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="about-banner-content">
              <h3>{data?.title}</h3>
              <h1>{data?.subtitle}</h1>
              <p>{data?.description}</p>
              <div className="goto-next-section" onClick={scrollToNextSection}>
                <img src={GotoNext} alt="GotoNext" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;

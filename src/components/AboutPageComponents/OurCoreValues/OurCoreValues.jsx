import React, { useEffect } from "react";
import "./OurCoreValues.css";
import underline1 from "../../../assets/underline1.webp";
import underline2 from "../../../assets/underline2.webp";
import AOS from "aos";
import "aos/dist/aos.css";

const OurCoreValues = ({ data }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="our-core-values-sec">
      <div className="about-core-shades-left"></div>
      <div className="about-core-shades-right"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="our-core-values-content">
              <h2>{data?.title}</h2>
              <div className="d-flex align-items-center justify-content-center flex-col gap-2">
                <img src={underline1} alt="underline1" />
                <img src={underline2} alt="underline2" />
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-center">
          {data?.icons.map((icon, index) => (
            <div className="col-lg-4" key={index}>
              <div
                className="our-core-values-box"
                data-aos={index % 2 === 0 ? "fade-down" : "fade-up"}
              >
                <h4 className="powered-text-gradient">{icon.title}</h4>
                <p>{icon.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurCoreValues;

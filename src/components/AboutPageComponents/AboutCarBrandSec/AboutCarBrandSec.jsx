import React from "react";
import "./AboutCarBrandSec.css";

const AboutCarBrandSec = ({ data }) => {
  return (
    <section className="about-car-brand-sec">
      <div className="container">
        <div className="row align-items-center">
          {data?.map((logo, index) => {
            return (
              <div className="col-lg-2" key={index}>
                <div className="brand-img-div">
                  <img src={logo?.icon} alt={logo?.customerName} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutCarBrandSec;

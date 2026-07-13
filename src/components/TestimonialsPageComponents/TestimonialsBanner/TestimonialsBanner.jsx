import React from "react";
import "./TestimonialsBanner.css";

const TestimonialsBanner = ({ data }) => {
  return (
    <section className="testi-banner-sec" style={{ backgroundImage: `url(${data?.bgImages[0]?.url})` }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="testi-banner-content">
              <h1>{data?.title}</h1>
              <p>
                {data?.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsBanner;

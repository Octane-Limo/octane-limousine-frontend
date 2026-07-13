import { useState } from "react";
import underline1 from "../../../assets/underline1.webp";
import underline2 from "../../../assets/underline2.webp";
import "./OurServices.css";

const OurServices = ({ gotoNextSec, data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="our-services-sec" ref={gotoNextSec}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="our-services-content">
              <h2>{data?.title}</h2>
              <div className="d-flex align-items-center justify-content-center flex-col gap-2">
                <img src={underline1} alt="underline1" />
                <img src={underline2} alt="underline2" />
              </div>
              <p className="mt-3">
                {data?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {data?.carImages.map(({ title, subtitle, url, alt }, i) => (
            <div className="col-lg-12" key={`${title}-${i}`}>
              <div className={`our-services-box ${i > 0 ? "journey" : ""}`}>
                <div className="row align-items-center">
                  <div className="col-lg-4">
                    <img src={url} alt={alt || title} />
                  </div>
                  <div className="col-lg-8">
                    <div className="our-services-box-content">
                      <h3
                        onClick={() => toggleAccordion(i)}
                        className="accordion-title"
                        style={{ cursor: 'pointer' }}
                      >
                        {title}
                        <span className={`accordion-icon ${openIndex === i ? 'open' : ''}`}>
                          ▼
                        </span>
                      </h3>
                      <div
                        className={`accordion-content ${openIndex === i ? 'open' : ''}`}
                      >
                        <p>{subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
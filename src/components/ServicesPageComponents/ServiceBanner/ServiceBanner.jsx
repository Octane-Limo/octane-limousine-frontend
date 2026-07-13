import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import GotoNext from "../../../assets/goto-next.webp";
import "./ServiceBanner.css";

const ServiceBanner = ({ scrollToNextSection, data }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="service-banner-sec" style={{ backgroundImage: `url(${data?.bgImages[0]?.url})` }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="service-banner-content">
              <h3>{data?.title}</h3>
              <h1>{data?.subtitle}</h1>
              <p>
                {data?.description}
              </p>
              <div className="service-banner-content-image" data-aos="fade-up">
                <img src={data?.carImages[0]?.url} alt="service-banner-image" />
              </div>
              <div className="services-banner-gotoNext">
                <img
                  src={GotoNext}
                  alt="GotoNext"
                  onClick={scrollToNextSection}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;

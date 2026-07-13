import "aos/dist/aos.css";
import GotoNext from "../../../assets/goto-next.webp";
import "./OurFleetsBanner.css";

const OurFleetsBanner = ({ scrollToNextSection, data }) => {
  // useEffect(() => {
  //   AOS.init();
  // }, []);
  return (
    <section className="our-fleet-banner-sec" style={{ backgroundImage: `url(${data?.bgImages[0]?.url})` }}>
      <div className="our-fleet-car-left">
        <img src={data?.bgImages[0]?.carImages[1]?.url} alt="our-fleet-banner-left" />
      </div>
      <div className="our-fleet-car-right">
        <img src={data?.bgImages[0]?.carImages[0]?.url} alt="our-fleet-banner-right" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="our-fleet-banner-content-main">
              <div className="our-fleet-banner-content">
                <h3>{data?.title}</h3>
                <h1>
                  {data?.subtitle?.split(" ").map((word, index) => (
                    <>
                      {word}{" "}
                      {index === 2 && <br />}
                    </>
                  ))}
                </h1>

                <p>
                  {data?.description}
                </p>
              </div>
              <div className="our-fleet-banner-gotoNext">
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

export default OurFleetsBanner;

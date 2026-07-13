import underline1 from "../../../assets/underline1.webp";
import underline2 from "../../../assets/underline2.webp";
import "./AboutMeetSec.css";

const AboutMeetSec = ({ data }) => {
  return (
    <section className="about-meet-sec" style={{ backgroundImage: `url(${data?.bgImages[0]?.url})` }}>
      <div className="about-meet-sec-man">
        <img src={data?.carImages[0]?.url} className="man_image" alt="man_image" />
      </div>
      <div className="about-meet-before-bottom"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="about-meet-sec-content">
              <h2>{data?.title}</h2>
              <div className="d-flex align-items-center justify-content-center flex-col gap-2">
                <img src={underline1} alt="underline1" />
                <img src={underline2} alt="underline2" />
              </div>

              <p>
                {data?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeetSec;

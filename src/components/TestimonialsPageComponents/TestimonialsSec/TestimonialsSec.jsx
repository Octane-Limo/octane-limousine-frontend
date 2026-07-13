import { FaStar } from "react-icons/fa6";
import "./TestimonialsSec.css";

const Stars = ({ rating = 0 }) => {
  const safe = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="testi-box-ratings">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          size={22}
          color={i < safe ? "#FBC476" : "#FFFFFF4D"}
          aria-label={i < safe ? "filled star" : "empty star"}
        />
      ))}
    </div>
  );
};

const TestimonialsSec = ({ data }) => {
 
  return (
    <section className="testi-sec">
      <div className="container">
        <div className="row">
          {data?.testimonials?.map((testi, index) => {
            return (
              <div className="col-lg-4 col-md-6 col-12" key={index}>
                <div className="testi-sec-box">
                  <p>
                    {`"${testi?.feedback}"`}
                  </p>

                  <div className="testi-sec-box-client">
                    <img
                      src={testi?.avatar}
                      alt={testi?.profession}
                    />
                    <div className="testi-sec-box-client-content">
                      <h4>{testi?.customerName}</h4>
                      <span>{testi?.profession}</span>
                    </div>
                  </div>

                  <Stars rating={testi?.rating} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSec;

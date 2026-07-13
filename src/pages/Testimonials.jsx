import React from "react";
import TestimonialsBanner from "../components/TestimonialsPageComponents/TestimonialsBanner/TestimonialsBanner";
import TestimonialsSec from "../components/TestimonialsPageComponents/TestimonialsSec/TestimonialsSec";
import AboutCarBrandSec from "../components/AboutPageComponents/AboutCarBrandSec/AboutCarBrandSec";
import { Contact } from "../components/Contact";

const Testimonials = ({ data, testimonialData }) => {

  return (
    <>
      <TestimonialsBanner data={testimonialData?.sections[0]} />
      <AboutCarBrandSec data={data?.sections[1]?.logos} />
      <TestimonialsSec data={testimonialData?.sections[2]} />
      <Contact data={data?.sections[7]} />
    </>
  );
};

export default Testimonials;

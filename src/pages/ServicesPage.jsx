import React, { useRef } from "react";
import ServiceBanner from "../components/ServicesPageComponents/ServiceBanner/ServiceBanner";
import { Contact } from "../components/Contact";
import OurServices from "../components/ServicesPageComponents/OurServices/OurServices";
import AboutCarBrandSec from "../components/AboutPageComponents/AboutCarBrandSec/AboutCarBrandSec";

const ServicesPage = ({ servicesData, data }) => {
  const gotoNextSec = useRef(null);

  const scrollToNextSection = () => {
    gotoNextSec.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ServiceBanner scrollToNextSection={scrollToNextSection} data={servicesData?.sections[0]} />
      <AboutCarBrandSec data={data?.sections[1]?.logos} />
      <OurServices gotoNextSec={gotoNextSec} data={servicesData?.sections[2]} />
      <Contact data={data?.sections[7]} />
    </>
  );
};

export default ServicesPage;

import React, { useRef } from "react";
import OurFleetsBanner from "../components/OurFleetsPageComponents/OurFleetsBanner/OurFleetsBanner";
import OurFleetSection from "../components/OurFleetsPageComponents/OurFleetSection/OurFleetSection";
import AboutCarBrandSec from "../components/AboutPageComponents/AboutCarBrandSec/AboutCarBrandSec";
import { Contact } from "../components/Contact";

const OurFleets = ({ data, fleetData }) => {
  const gotoNextSec = useRef(null);

  const scrollToNextSection = () => {
    gotoNextSec.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <OurFleetsBanner scrollToNextSection={scrollToNextSection} data={fleetData?.sections[0]} />
      <AboutCarBrandSec data={data?.sections[1]?.logos} />
      <OurFleetSection gotoNextSec={gotoNextSec} data={fleetData?.sections[2]} />
      <Contact data={data?.sections[7]} />
    </>
  );
};

export default OurFleets;

import React, { useRef } from "react";
import AboutBanner from "../components/AboutPageComponents/AboutBanner/AboutBanner";
import AboutCarBrandSec from "../components/AboutPageComponents/AboutCarBrandSec/AboutCarBrandSec";
import PoweredBySection from "../components/PoweredBySection";
import OurCoreValues from "../components/AboutPageComponents/OurCoreValues/OurCoreValues";
import AboutMeetSec from "../components/AboutPageComponents/AboutMeetSec/AboutMeetSec";
import { TestimonialSection } from "../components/TestimonialsSections";
import { Contact } from "../components/Contact";

const AboutPage = ({ aboutData, data }) => {
  const gotoNextSec = useRef(null);

  const scrollToNextSection = () => {
    gotoNextSec.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AboutBanner
        data={aboutData?.sections[0]}
        scrollToNextSection={scrollToNextSection}
      />
      <AboutCarBrandSec data={data?.sections[1]?.logos} />
      <PoweredBySection data={data?.sections[2]} gotoNextSec={gotoNextSec} />
      <OurCoreValues data={aboutData?.sections[3]} />
      <AboutMeetSec data={aboutData?.sections[4]} />
      <TestimonialSection data={data?.sections[6]} />
      <Contact data={data?.sections[7]} />
    </>
  );
};

export default AboutPage;

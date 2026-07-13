import CarCarousel from "../components/CarCarousel";
import PoweredBySection from "../components/PoweredBySection";
import { ServicesSection } from "../components/ServicesSection";
import { FleetSection } from "../components/FleetSection";
import { CtaSection } from "../components/CtaSection";
import { TestimonialSection } from "../components/TestimonialsSections";
import { Contact } from "../components/Contact";
import AboutCarBrandSec from "../components/AboutPageComponents/AboutCarBrandSec/AboutCarBrandSec";

function Home({ data }) {
  return (
    <>
      <div className="w-full max-w-[1920px] overflow-hidden">
        <CarCarousel data={data?.sections[0]} />
        <AboutCarBrandSec data={data?.sections[1]?.logos} />
        <PoweredBySection data={data?.sections[2]} />
        <ServicesSection data={data?.sections[3]} />
        <FleetSection data={data?.sections[4]} />
        <CtaSection data={data?.sections[5]} />
        <TestimonialSection data={data?.sections[6]} />
        <Contact data={data?.sections[7]} />
      </div>
    </>
  );
}

export default Home;

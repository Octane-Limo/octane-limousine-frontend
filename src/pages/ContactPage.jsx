import ContactBanner from "../components/ContactPageComponents/ContactBanner/ContactBanner";
import { TestimonialSection } from "../components/TestimonialsSections";

const ContactPage = ({ contactData, data }) => {

  return (
    <>
      <ContactBanner data={contactData?.sections[0]} />
      <TestimonialSection data={data?.sections[6]} />
    </>
  );
};

export default ContactPage;

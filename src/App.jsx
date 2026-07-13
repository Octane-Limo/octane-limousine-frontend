import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import axiosInstance from "./axiosInstance";
import ScrollToTop from "./components/ScrollToTop";
import PageLayout from "./layout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import OurFleets from "./pages/OurFleets";
import ServicesPage from "./pages/ServicesPage";
import Testimonials from "./pages/Testimonials";
import LoadingComp from "./components/LoadingComp";

function App() {
  const [homePageData, setHomePageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const baseURL =
    import.meta.env.VITE_REACT_APP_API_BASE || "http://localhost:3000";

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const response = await axiosInstance.get(`${baseURL}/api/pages`);

        if (response?.data?.success) {
          setHomePageData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching home page data:", error);
      }
    };

    fetchHomePageData();
  }, []);

  const homeData =
    Array.isArray(homePageData) && homePageData.length > 0
      ? homePageData[3]
      : null;

  const aboutData =
    Array.isArray(homePageData) && homePageData.length > 0
      ? homePageData[0]
      : null;

  const servicesData =
    Array.isArray(homePageData) && homePageData.length > 0
      ? homePageData[4]
      : null;

  const testimonialData =
    Array.isArray(homePageData) && homePageData.length > 0
      ? homePageData[1]
      : null;

  const contactData =
    Array.isArray(homePageData) && homePageData.length > 0
      ? homePageData[2]
      : null;

  const fleetData =
    Array.isArray(homePageData) && homePageData.length > 0
      ? homePageData[5]
      : null;

  return (
    <>
      {isLoading ? (
        <LoadingComp setIsLoading={setIsLoading} />
      ) : (
        <PageLayout data={homeData}>
          <div className="w-full max-w-[1920px] overflow-hidden">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home data={homeData} />} />
              <Route
                path="/about-us"
                element={<AboutPage aboutData={aboutData} data={homeData} />}
              />
              <Route
                path="/our-fleets"
                element={<OurFleets fleetData={fleetData} data={homeData} />}
              />
              <Route
                path="/services"
                element={
                  <ServicesPage servicesData={servicesData} data={homeData} />
                }
              />
              <Route
                path="/testimonials"
                element={
                  <Testimonials
                    testimonialData={testimonialData}
                    data={homeData}
                  />
                }
              />
              <Route
                path="/contact-us"
                element={
                  <ContactPage contactData={contactData} data={homeData} />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </PageLayout>
      )}
    </>
  );
}

export default App;

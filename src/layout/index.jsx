import React from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

const PageLayout = ({ children, data }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer data={data?.sections[8]} />
    </>
  );
};

export default PageLayout;

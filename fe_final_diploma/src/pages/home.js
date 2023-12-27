import React from "react";
import MainForm from "../forms/mainform.js";
import About from "../main/about.js";
import HowItWorks from "../main/howitworks.js";
import FeedBack from "../main/feedback.js";

import { Banner } from "../primitives/banner";
import banner1 from "../img/banner/banner1.png";

const HomePage = () => {
  return (
    <React.Fragment>
	  <Banner className="banner banner-home" banner={banner1}>
	  </Banner>
      <MainForm className="homepage_form" />
      <About />
      <HowItWorks />
      <FeedBack />
    </React.Fragment>
  );
};

export default HomePage;

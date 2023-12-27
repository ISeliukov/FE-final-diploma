import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Main from "../main/main";
import Footer from "../footer/footer";

const Plain = () => {
  return (
    <React.Fragment>
	<Header />
      <Main>
        <Outlet />
      </Main>
	<Footer />
    </React.Fragment>
  );
};
export { Plain };
/**<Outlet /> - место для вложенных роутов> */

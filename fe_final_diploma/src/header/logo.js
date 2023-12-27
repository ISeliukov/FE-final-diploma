import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Logo = () => {
  return (
    <React.Fragment>
      <Link to="/" className="logo-container" id="startLogo"> {/*fe_final_diploma*/}
        Лого
      </Link>
    </React.Fragment>
  );
};

export default Logo;

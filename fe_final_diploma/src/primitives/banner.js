import React from "react";
import { Title } from "../primitives/misc";
import { useLocation } from "react-router-dom";

const Banner = ({ banner, className, children }) => {
  const location = useLocation();
  
  return (
    <React.Fragment>
      <div className={className}>
        {location.pathname === "/" ? (
          <Title
            text="Вся жизнь - "
            strongText={"путешествие!"}
            className={"banner_title"}
          />
        ) : null} {/*"/fe_final_diploma"*/}
        <img src={banner} className="img-banner" alt="train-banner" />
      </div>
    </React.Fragment>
  );
};

export { Banner };

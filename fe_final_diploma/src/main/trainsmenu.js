import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setTrainId,
  setSelectionTrain,
} from "../subroutines/trainscatalog";

import { nanoid } from "nanoid";

const TrainsMenu = ({ currentItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  if (!currentItems) {
    return;
  }

  const clickHandler = (id, item) => {

    dispatch(setTrainId({ id: item._id }));
    dispatch(setSelectionTrain({ data: item }));
    navigate({
      pathname: `/seats/${item._id}`, //`/fe_final_diploma/seats/${item._id}`
      search: location.search,
    });
  };

  return (
    <React.Fragment>
      <div className="card-deck trains-menu-group m-0">
        {currentItems && currentItems.length > 0
          ? currentItems.map((item) => (
		  {/*<trains menu />*/}
            ))
          : null}
      </div>
    </React.Fragment>
  );
};

export default TrainsMenu;

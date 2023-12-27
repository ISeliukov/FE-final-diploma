import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Banner } from "../primitives/banner.js";
import banner3 from "../img/banner/banner3.png";
import MainForm from "../forms/mainform";

import Loader from "../primitives/loader";
import SearchControls from "../main/searchctrl";
import {
  setParameters,
  upDateCatalog,
} from "../subroutines/trainscatalog";
import Info from "../primitives/info";
import { apiSlice } from "../subroutines/getsomequery";
import "../main/selectiontrain.css";

import {
  parsedUrlString,
  getUrlSearch,
  formattedFormData,
} from "../subroutines/trainselsub";

const SelectionTrain = () => {
  const { parameters } = useSelector((state) => {
//	console.log(state);
	return state.trainsCatalog.searchData;}
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  let cardInfo = document.querySelector(".info_card");

  let upData = parsedUrlString(location.search);
  const formData = formattedFormData(upData);

  const {
    data = [],
    isLoading,

    isError,
  } = apiSlice.endpoints.getTrainsList.useQuery( //useGetTrainsList
    upData,
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (!data.length && cardInfo) cardInfo.classList.add("active");

    dispatch(
      upDateCatalog({
        data: {
          formData,
          trainsParameters: upData.parameters,
          parameters: upData.filter,
        },
      })
   
    );
    
  }, [dispatch, location, cardInfo]);

  if (isError) console.log(isError, "error!!!");

  const onClickSorted = (event) => {
    event.preventDefault();
    let type;
    if (event.target.textContent === "времени") type = "date";
    if (event.target.textContent === "стоимости") type = "min_price";
    if (event.target.textContent === "длительности") type = "duration";

    dispatch(setParameters({ sort: { type, text: event.target.textContent } }));
    upData.filter.sort = type;
 
    const urlSearchString = getUrlSearch(
      upData.optionsName,
      upData.formData,
      upData.filter,
      upData.parameters
    );

    navigate({
      search: `${urlSearchString}`,
    });
  };

  const onClickLimit = (event) => {
    event.preventDefault();

    dispatch(
      setParameters({ limit: Number(event.target.textContent), offset: 0 })
    );

    upData.filter.limit = Number(event.target.textContent);

    const urlSearchString = getUrlSearch(
      upData.optionsName,
      upData.formData,
      upData.filter,
      upData.parameters
    );

    navigate({
      search: `${urlSearchString}`,
    });
  };
  const onClickInfo = (type) => {
    if (type === "info") {
      document.querySelector(".info_card").classList.remove("active");
    } else {
      document.querySelector(".error_card").classList.remove("active");
    }
  };

  return (
    <React.Fragment>
      <Banner className="banner banner-tickets" banner={banner3} />
      <div className="selection-train_wrapper">
        <MainForm className="search-tickets_form" />
        <div className="selection-train_content">
          {isLoading && <Loader />}
          {isError && (
            <Info
              type={"error"}
              text={"Что-то пошло не так..."}
              onClick={() => onClickInfo("error")}
            />
          )}

          {/*ProgressBar*/}
		  {/*SideBar*/}
          {!isLoading && !isError && data.items ? (
            <section className="trains-menu-wrap d-flex" id="trains-menu">
              <SearchControls
                amount={data.total_count}
                sort={parameters.sort}
                limit={Number(parameters.limit)}
                onClickSorted={onClickSorted}
                onClickLimit={onClickLimit}
              />
              {data.items.length > 0 && !isLoading ? (
				  {/*<Paginate*/}
              ) : (
                <Info
                  type={"info"}
                  text={"По вашему запросу ничего не найдено"}
                  onClick={() => onClickInfo("info")}
                />
              )}
            </section>
          ) : null}
          {!isLoading && data.error && (
            <div className="error__wrapper">
              <Info
                type={"error"}
                text={data.error}
                onClick={() => onClickInfo("error")}
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SelectionTrain;

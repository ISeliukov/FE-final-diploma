import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { apiSlice } from "../subroutines/getsomequery";

import ControlStat from "../primitives/ctrlstat";
import { LocationOn } from "@mui/icons-material";
import { Title, Button } from "../primitives/misc";
import Info from "../primitives/info";
import FormCalendar from "../primitives/reactcalendar";
import {
  capitalizeFirstLetter,
  getUrlSearch,
} from "../subroutines/trainselect";
import ic_arrow from "../img/ic_arrow.svg";
import { inputValue } from "../subroutines/ticketform";
import { setDataRequest } from "../subroutines/trainscatalog";
import { setParameters } from "../subroutines/trainscatalog";
import { setReverseData } from "../subroutines/ticketform";

const MainForm = ({ className }) => {
  const { name } = useSelector((state) => state.formTickets);
  const { from, to } = useSelector((state) => state.formTickets.formData);

  const { parameters, trainsParameters } = useSelector(
    (state) => state.trainsCatalog.searchData
  );
  
  const dispatch = useDispatch();
  const reverseRef = useRef();
  const formRef = useRef();
  const { data = [], isError /*isLoading */ } = apiSlice.endpoints.getCityesName.useQuery(name);
  const navigate = useNavigate();
  const location = useLocation();

  if (isError) console.log(isError, "error!!!");
  let optionsData = [];
  if (data.length > 0) {
    optionsData = data.map((item) => {
      return { ...item, name: capitalizeFirstLetter(item.name) };
    });
  }

  formRef.current = {
    from_city_id: from.city._id,
    from_city_name: from.city.name,
    to_city_id: to.city._id,
    to_city_name: to.city.name,
    date_start: from.date,
    date_end: to.date,
  };

  const filterData = {
    sort: parameters.sort.type,
    limit: parameters.limit,
    offset: parameters.offset,
  };

  const searchOptions = { value: name };
  
  const urlSearchString = getUrlSearch(
    searchOptions,
    formRef.current,
    filterData,
    trainsParameters
  );

  const clickReverse = () => {
    dispatch(setReverseData());
    //просто меняет местами города
    //для поиска и отправки запроса нужно нажать "Найти билеты"
  };
  
  const clickHandler = () => {
    dispatch(setDataRequest({ data: { from, to } }));
    dispatch(setParameters({ offset: 0 }));
//	console.log('url  ',urlSearchString);
    if (location.pathname !== `/trains/${urlSearchString}`) //`/fe_final_diploma/trains/${urlSearchString}`
      navigate({
        pathname: `/trains/`, ///fe_final_diploma/trains/
        search: `${urlSearchString}`,
      });
  };

  const onChangeInput = (event) => {
    if (event.target.value !== "")
      dispatch(inputValue({ name: event.target.value }));
  };
  
  const onClickInfo = () => {
    document.querySelector(".error_card").classList.remove("active");
  };
 
  return (
    <React.Fragment>
    <div className={className}>
        <div className={className + "_destination"}>
          {" "}
          <Title
            className={className + "_departure_title"}
            text="Направление"
          />{" "}
          <div ref={reverseRef} className="form-group group-city-name">
			  <ControlStat
              popupIcon={
                <LocationOn sx={{ color: "#E5E5E5", width: 35, height: 35 }} />
              }
              type="startCity"
              value={from.city.name}
              onChangeInput={onChangeInput}
              placeholder={"Откуда"}
              options={optionsData}
			  />
            <button
              type="button"
              className=" btn btn-transparent p-0 form_reverse-button"
              onClick={clickReverse}
            >
              <img className="ic_arrow_form" src={ic_arrow} alt="arrow icon" />
            </button>
            <ControlStat
              type="finishCity"
              value={to.city.name}
              popupIcon={
                <LocationOn sx={{ color: "#E5E5E5", width: 35, height: 35 }} />
              }
              onChangeInput={onChangeInput}
              placeholder={"Куда"}
              options={optionsData}
            />
          </div>
        </div>
        <div className={className + "_date-trails"}>
          <Title className={className + "_departure_title"} text="Дата" />
          <div className="form-group group-date-trails">
            <FormCalendar
              className=""
              value={from.date ? new Date(from.date) : null}
              type="startDate"
            />
            <FormCalendar
              className=""
              value={to.date ? new Date(to.date) : null}
              type="finishDate"
            />
          </div>
        </div>
        <div className={className + "_control"}>
          <Button
            text="Найти билеты"
            type="main_form"
            onClick={clickHandler}
            disabled={
              from.city.name === "" || to.city.name === "" || !from.date
                ? true
                : false
            }
          ></Button>
          {isError && location.pathname === "/" && ( ///fe_final_diploma
            <Info
              type={"error"}
              text={"Что-то пошло не так, обновите страницу..."}
              onClick={onClickInfo}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainForm;

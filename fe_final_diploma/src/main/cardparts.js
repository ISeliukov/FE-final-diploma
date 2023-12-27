import React from "react";
import TimingBlock from "../primitives/timeblock";
import { MySvgIcon } from "../primitives/misc";
import TrainInfo from "../primitives/traininfo";
import { capitalizeFirstLetter } from "../subroutines/trainselsub";
import { format} from "date-fns";

import { nanoid } from "nanoid";
import icon_clock from "../img/selectiontrain/icon_clock.svg";
import icon_yellow_train from "../img/selectiontrain/icon_yellow-train.svg";
import icon_yellow_arrow_right from "../img/selectiontrain/icon_yellow-arrow-right.svg";

export const CardTop = ({ className, data, icon, children }) => {

    return (
      <React.Fragment>
        <div key={nanoid()} className={"card-top "+ className}>
        {children?null: <MySvgIcon
            type={className}
            className={className}
            icon={icon? icon:icon_yellow_train}
          />}
		  {children? children:<TrainInfo data={data} className={className}/>}
        </div>
      </React.Fragment>
    );
  };

  export const CardBody = ({ className, data, children }) => {

    return (
      <React.Fragment>
	    <div key={nanoid()} className={"card-body " + className}>
          {children? children:
          <div className={className + "-group d-flex flex-row"}>
            <div className="train-departure-from d-flex flex-column">
              <span
                key={nanoid()}
                className="train-departure data-trains-datetime"
              >
                {format(new Date(data.from.datetime), "HH:mm")}
			</span>
              <span
                key={nanoid()}
                className="train-departure data-trains-city-name"
              >
			  {capitalizeFirstLetter(data.from.name)}
              </span> 
              <span className="train-departure data-trains-railway_station_name">
                {data.from.railway_station_name + " вокзал"}
              </span>
            </div>
            <div className=" d-flex flex-column justify-content-center trails-duration-block ">
              <MySvgIcon  type={className} className={className} icon={icon_yellow_arrow_right} />
            </div>
            <div className="train-departure-to d-flex flex-column">
              <span
                key={nanoid()}
                className="train-departure data-trains-datetime"
              >
                {format(new Date(data.to.datetime), "HH:mm")}
              </span>
              <span
                key={nanoid()}
                className="train-departure data-trains-city-name"
              >
			  {capitalizeFirstLetter(data.to.name)}
              </span>
               <span className="train-departure data-trains-railway_station_name">
                {data.to.railway_station_name + " вокзал"}
              </span>
            </div>
          </div>}
	  </div>
      </React.Fragment>
    );
  };
  
  export const CardBottom = ({ className, data, children }) => { //children
    let chldrn = null;
    return (
      <React.Fragment>
	    {chldrn = children}
		{/*{console.log(className, data, children)} */}
        <div className={"card-bottom " + className + "_bottom"}>
			{/*{console.log('children', chldrn)} */}
			{/*<MySvgIcon  type={className} className={className} icon={icon_clock} />*/}
			{/*<TimingBlock className={className} duration={data} />*/}
			{chldrn ? null:<MySvgIcon  type={className} className={className} icon={icon_clock} />}
			{chldrn ? null:<TimingBlock className={className} duration={data} />}
			{chldrn ? chldrn:null}
        </div>
      </React.Fragment>
    );
  };
  
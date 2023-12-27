import React from "react";
import Card from "../main/card";
import {
  CardTop,
  CardBottom,
  CardBody,
} from "../main/cardparts";
import { Button } from "../primitives/misc";
import icon_info from "../img/howitworks/icon_info.svg";
import icon_error from "../img/loading/icon_error.svg";
import { nanoid } from "nanoid";

const Info = ({ type, text, onClick }) => {
  return (
    <React.Fragment>
      <Card id={nanoid()} className={" active " + type}>
        <CardTop
          className={type + "_card-top"}
          icon={type === "info" ? icon_info : icon_error}
        />
        <CardBody className={type + "_card-body"}>
          <div className={type + "_block-text"}>
            <p className={type + "-text"}>{text}</p>
          </div>
        </CardBody>
        <CardBottom className={type + "_card"}>
          <Button
            type="modal"
            className="modal_control"
            text="Понятно"
            onClick={onClick}
          />
        </CardBottom>
      </Card>
    </React.Fragment>
  );
};

export default Info;

import { format, intervalToDuration } from "date-fns";
import queryString from "query-string";

export const getUrlSearch = (search, form, filter, parameters) => {

  const urlSearchObj = {
    ...search,
    ...form,
    ...filter,
    ...parameters,
  };

  return queryString.stringify(urlSearchObj, {
    skipNull: true,
    skipEmptyString:true,
  });
};

export const parsedUrlString = (searchString) => {
  const parsed = queryString.parse(searchString);
  const formData = {
    date_end: parsed.date_end,
    date_start: parsed.date_start,
    to_city_id: parsed.to_city_id,
    from_city_id: parsed.from_city_id,
    to_city_name: parsed.to_city_name,
    from_city_name: parsed.from_city_name,
  };
  
  const filter = {
    limit: Number(parsed.limit),
    offset: Number(parsed.offset),
    sort: parsed.sort,
  };

  const parameters = {
    end_arrival_hour_from: Number(parsed.end_arrival_hour_from),
    end_arrival_hour_to: Number(parsed.end_arrival_hour_to),
    end_departure_hour_from: Number(parsed.end_departure_hour_from),
    end_departure_hour_to: Number(parsed.end_departure_hour_to),
    have_air_conditioning:
      parsed.have_air_conditioning === "false" ? false : true,
    have_express: parsed.have_express === "false" ? false : true,
    have_first_class: parsed.have_first_class === "false" ? false : true,
    have_fourth_class: parsed.have_fourth_class === "false" ? false : true,
    have_second_class: parsed.have_second_class === "false" ? false : true,
    have_third_class: parsed.have_third_class === "false" ? false : true,
    have_wifi: parsed.have_wifi === "false" ? false : true,
    price_from: Number(parsed.price_from),
    price_to: Number(parsed.price_to),
    start_arrival_hour_from: Number(parsed.start_arrival_hour_from),
    start_arrival_hour_to: Number(parsed.start_arrival_hour_to),
    start_departure_hour_from: Number(parsed.start_departure_hour_from),
    start_departure_hour_to: Number(parsed.start_departure_hour_to),
  };
  const optionsName = { name: parsed.value };
  
  return { optionsName, formData, filter, parameters };
};

export const dateFormatted = (date) => {
  return !date ? null : format(new Date(date), "yyyy-MM-dd");
};

const getPunct = (string) => {
  const arrText = [...string];
  if (arrText.includes(" ")) {
    return " ";
  } else if (arrText.includes("-")) {
    return "-";
  } else if (arrText.includes("(")) {
    return " (";
  } else {
    return false;
  }
};

export const capitalizeFirstLetter = (string) => {
  let punct = getPunct(string);

  const words = string.split(punct);
  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(punct);
};

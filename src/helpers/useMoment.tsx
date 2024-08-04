import moment from "moment/moment";
export const getCurrentTimeStamp = (timeFormat: string | undefined) => {
  return moment().format(timeFormat);
};

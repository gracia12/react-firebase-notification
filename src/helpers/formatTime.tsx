import moment from "moment";
export const formatTime = (timestamp: moment.MomentInput) => {
  return moment(timestamp)
    .startOf("day")
    .fromNow();
};

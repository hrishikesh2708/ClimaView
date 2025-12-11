import { WeatherData } from "../../redux/types";
export const formatDateToCustomString = (isoDateStr: string) => {
    const dateObj = new Date(isoDateStr);
    const weekday = dateObj.toLocaleDateString("en-GB", { weekday: "long" });
    const day = dateObj.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = dateObj.toLocaleDateString("en-GB", { month: "short" });
    const year = dateObj.toLocaleDateString("en-GB", { year: "numeric" });
    return `${weekday}, ${month}. ${day}, ${year}`;
  };

export const format2DateToCustomString = (isoDateStr: string) => {
    const dateObj = new Date(isoDateStr);
    const weekday = dateObj.toLocaleDateString("en-GB", { weekday: "long" });
    const day = dateObj.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = dateObj.toLocaleDateString("en-GB", { month: "short" });
    const year = dateObj.toLocaleDateString("en-GB", { year: "numeric" });
    return `${weekday}, ${day} ${month} ${year}`;
  };

export const formatDailyTempChartData = (data: WeatherData) => {
    data?.intervals.map((interval) => {
        const dateTimestamp = new Date(interval.startTime).getTime();
        const temperatureMin = interval.values.temperatureMin;
        const temperatureMax = interval.values.temperatureMax;
        return [dateTimestamp, temperatureMin, temperatureMax];
      });
}

export const formatTimeToCustomString = (isoDateStr: string) => {
  let date = new Date(isoDateStr);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let newformat = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let min = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${min} ${newformat}`;
};
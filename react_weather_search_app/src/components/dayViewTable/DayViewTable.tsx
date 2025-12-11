import * as React from 'react';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  formatDateToCustomString,
} from "../global/functions";
import { WeatherCode } from "../../redux/types";
import "./style.css"
import { toggleDetailsAndResultsSection } from '../../redux/action';

const DayViewTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const dailyWeatherData = useSelector(
    (state: RootState) => state?.dailyWeatherData
  );
  const weatherCodeToImageMap = useSelector(
    (state: RootState) => state?.weatherCodeToImageMap
  );
  const weatherCodesMapping = useSelector(
    (state: RootState) => state?.weatherCodesMapping
  );

  const handleClick = (index: number) => {
    dispatch( toggleDetailsAndResultsSection(index) )
  };

  return (
    <>
      <table className="table text-start">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">
              Temp. High(<span>&#176;</span>F)
            </th>
            <th scope="col">
              Temp. Low(<span>&#176;</span>F)
            </th>
            <th scope="col">Wind Speed(mph)</th>
          </tr>
        </thead>
        <tbody>
          {dailyWeatherData?.intervals.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td className="date-style" onClick={() => handleClick(index)}>
                {formatDateToCustomString(data?.startTime)}
              </td>
              <td>
                <img
                  src={
                    weatherCodeToImageMap[
                      data?.values?.weatherCode as WeatherCode
                    ]
                  }
                  alt="weather Image"
                  width={30}
                  height={30}
                />
                {" " +
                  weatherCodesMapping[data?.values?.weatherCode as WeatherCode]}
              </td>
              <td>{data?.values?.temperatureMax}</td>
              <td>{data?.values?.temperatureMin}</td>
              <td>{data?.values?.windSpeed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DayViewTable;

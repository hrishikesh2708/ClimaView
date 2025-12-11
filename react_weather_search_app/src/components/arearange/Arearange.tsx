import * as React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// Initialize Highcharts modules
highchartsMore(Highcharts);

const Arearange: React.FC = () => {
  const minMaxtemperatureData = useSelector(
    (state: RootState) => state?.minMaxtemperatureData
  );
  const chartOptions = {
    chart: {
      type: "arearange",
      zooming: {
        type: "x",
      },
      scrollablePlotArea: {
        minWidth: 600,
        scrollPositionX: 1,
      },
    },
    title: {
      text: "Temperature Ranges (Min, Max)",
    },
    xAxis: {
      type: "datetime",
      accessibility: {
        rangeDescription: "Range: Jan 2st 2018 to Dec 31 2019.",
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      valueSuffix: "°C",
      xDateFormat: "%A, %b %e",
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Temperatures",
        type: "arearange",
        data: minMaxtemperatureData,
        color: {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1,
          },
          stops: [
            [0, "#EFAA43"],
            [1, "#58ACF7"],
          ],
        },
        lineWidth: 2,
        marker: {
          fillColor: "#58ACF7", // Data point color
        },
      },
    ],
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default Arearange;

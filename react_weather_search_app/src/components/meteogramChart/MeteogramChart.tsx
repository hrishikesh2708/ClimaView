import * as React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import windbarb from "highcharts/modules/windbarb";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

highchartsMore(Highcharts);
windbarb(Highcharts);

const MeteogramChart: React.FC = () => {
  const metogramWeatherValues = useSelector(
    (state: RootState) => state?.MetogramWeatherValues
  );

  const chartOptions = {
    chart: {
      marginBottom: 70,
      marginRight: 40,
      marginTop: 50,
      plotBorderWidth: 1,
      height: 310,
      alignTicks: false,
      scrollablePlotArea: { minWidth: 767 },
    },
    title: {
      text: "Hourly Weather (For Next 5 Days)",
      align: "center",
      style: { whiteSpace: "nowrap", textOverflow: "ellipsis" },
    },
    tooltip: {
      shared: true,
      useHTML: true,
      headerFormat: "<small>{point.x:%A, %b %e, %H:%M}</small><br>",
    },
    credits: {
      text: "Forecast",
      position: {
        x: -40,
      },
    },
    xAxis: [
      {
        type: "datetime",
        tickInterval: 4 * 36e5, // six hours
        minorTickInterval: 36e5, // one hour
        tickLength: 0,
        gridLineWidth: 1,
        gridLineColor: "rgba(128, 128, 128, 0.1)",
        startOnTick: false,
        endOnTick: false,
        minPadding: 0,
        maxPadding: 0,
        offset: 25,
        showLastLabel: true,
        labels: {
          format: "{value:%H}",
        },
        crosshair: true,
      },
      {
        linkedTo: 0,
        type: "datetime",
        tickInterval: 24 * 3600 * 1000,
        labels: {
          format: "{value:%a, %b %e}",
          align: "left",
          x: 3,
          y: 8,
        },
        opposite: true,
        tickLength: 20,
        gridLineWidth: 1,
      },
    ],
    yAxis: [
      {
        title: { text: null },
        labels: { format: "{value}°", style: { fontSize: "10px" }, x: -3 },
        plotLines: [{ value: 0, color: "#BBBBBB", width: 1, zIndex: 2 }],
        maxPadding: 0.7,
        minRange: 80,
        tickInterval: 1,
        gridLineColor: "rgba(128, 128, 128, 0.1)",
      },
      {
        title: {
          text: null,
        },
        labels: {
          enabled: false,
        },
        gridLineWidth: 0,
        tickLength: 0,
        minRange: 10,
        min: 0,
      },
      {
        allowDecimals: false,
        title: {
          text: "inHg",
          offset: 0,
          align: "high",
          rotation: 0,
          style: {
            fontSize: "10px",
            color: "#F3AD41",
          },
          textAlign: "left",
          x: 3,
        },
        labels: {
          style: {
            fontSize: "10px",
            color: "#F3AD41",
          },
          y: 2,
          x: 3,
        },
        gridLineWidth: 0,
        opposite: true,
        showLastLabel: false,
      },
    ],
    legend: {
      enabled: false,
    },

    plotOptions: {
      series: {
        pointPlacement: "between",
      },
    },
    series: [
      {
        name: "Temperature",
        data: metogramWeatherValues?.temperatures || [],
        type: "spline",
        color: "#EB4940",
        tooltip: {
          pointFormat:
            '<span style="color:{point.color}">\u25CF</span> Temperature: <b>{point.y}°F</b><br/>',
        },
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
        zIndex: 1,
      },
      {
        name: "Humidity",
        data: metogramWeatherValues?.humidity || [],
        type: "column",
        color: "#68CFE8",
        yAxis: 1,
        groupPadding: 0,
        pointPadding: 0,
        grouping: false,
        dataLabels: {
          enabled: true,
          filter: {
            operator: ">",
            property: "y",
            value: 0,
          },
          style: {
            fontSize: "9px",
            fontWeight: "bold", 
            color: "#666",
          },
        },
        tooltip: {
          valueSuffix: " %",
        },
      },
      {
        name: "Air Pressure",
        data: metogramWeatherValues?.pressures || [],
        type: "spline",
        color: "#F2AB3D",
        marker: {
          enabled: false,
        },
        shadow: false,
        tooltip: {
          valueSuffix: " inHg",
        },
        dashStyle: "shortdot",
        yAxis: 2,
      },
      {
        name: "Wind",
        type: "windbarb",
        id: "windbarbs",
        lineWidth: 1.5,
        data: metogramWeatherValues?.winds || [],
        vectorLength: 10,
        yOffset: -10,
        tooltip: {
          valueSuffix: " mph",
        },
        color: "red",
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      containerProps={{ style: { width: "100%", height: "100%" } }}
    />
  );
};

export default MeteogramChart;

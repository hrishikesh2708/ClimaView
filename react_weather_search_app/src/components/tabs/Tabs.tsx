import * as React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
// import { useDispatch, useSelector } from "react-redux";
import MeteogramChart from '../meteogramChart/MeteogramChart';
import Arearange from '../arearange/Arearange';
import DayViewTable from '../dayViewTable/DayViewTable';

const WeatherTabs: React.FC = () => {
  // const dispatch = useDispatch();

  return (
    <div className="tabs-component">
      <Tabs defaultActiveKey="day-view" id="weather-tabs" className="mb-3 justify-content-end">
        <Tab eventKey="day-view" title="Day view">
          <DayViewTable />
        </Tab>
        <Tab eventKey="daily-temp-chart" title="Daily Temp. Chart">
          <Arearange />
        </Tab>
        <Tab eventKey="meteogram" title="Meteogram">
          <MeteogramChart />
        </Tab>
      </Tabs>
    </div>
  );
};

export default WeatherTabs;

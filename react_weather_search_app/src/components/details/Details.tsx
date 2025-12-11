import * as React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import twitterLogo from "../../assets/twitter.svg";
import angleLeftIcon from "../../assets/angleleft.svg";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import {
  formatDateToCustomString,
  formatTimeToCustomString,
} from "../global/functions";
import { toggleDetailsAndResultsSection } from "../../redux/action";

interface DetailsProps {
  index: number;
}

const Details: React.FC<DetailsProps> = ({ index }) => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const center = {
    lat: parseFloat(state?.latLong.split(",")[0]),
    lng: parseFloat(state?.latLong.split(",")[1]),
  };

  const handleClick = () => {
    dispatch(toggleDetailsAndResultsSection(state?.detailsId));
  };
  return (
    <>
      <Container className="text-center py-4 slide-left px-0">
        <Row className="mb-4">
          <Col className="text-start">
            <Button variant="outline-secondary" onClick={handleClick}>
              <img
                src={angleLeftIcon}
                alt="left arrow"
                width={20}
                height={20}
              />
              List
            </Button>
          </Col>
          <Col>
            <p>
              {formatDateToCustomString(
                state?.dailyWeatherData?.intervals[index]?.startTime
              )}
            </p>
          </Col>
          <Col className="text-end">
            <a
              target="blank"
              className="twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `The temperature in ${state?.cityName}, ${state?.stateName
                } on ${formatDateToCustomString(
                  state?.dailyWeatherData?.intervals[index]?.startTime
                )} is ${state?.dailyWeatherData?.intervals[index]?.values
                  ?.temperatureApparent
                }°F. The weather conditions are ${state?.weatherCodesMapping[
                state?.dailyWeatherData?.intervals[index]?.values
                  ?.weatherCode
                ]
                } #CSCI571WeatherSearch`
              )}`}
              data-size="large"
            >
              <Button variant="outline-secondary">
                <img
                  src={twitterLogo}
                  alt="Twitter icon"
                  width={20}
                  height={20}
                />
              </Button>
            </a>
          </Col>
        </Row>

        <Table striped responsive className="text-start">
          <tbody>
            <tr>
              <th className="table-head">Status</th>
              <td>
                {
                  state?.weatherCodesMapping[
                  state?.dailyWeatherData?.intervals[index]?.values
                    ?.weatherCode
                  ]
                }
              </td>
            </tr>
            <tr>
              <th className="table-head">Max Temperature</th>
              <td>
                {
                  state?.dailyWeatherData?.intervals[index]?.values
                    ?.temperatureMax
                }
                <span>&#176;</span>F
              </td>
            </tr>
            <tr>
              <th className="table-head">Min Temperature</th>
              <td>
                {
                  state?.dailyWeatherData?.intervals[index]?.values
                    ?.temperatureMin
                }
                <span>&#176;</span>F
              </td>
            </tr>
            <tr>
              <th className="table-head">Apparent Temperature</th>
              <td>
                {
                  state?.dailyWeatherData?.intervals[index]?.values
                    ?.temperatureApparent
                }
                <span>&#176;</span>F
              </td>
            </tr>
            <tr>
              <th className="table-head">Sun Rise Time</th>
              <td>
                {formatTimeToCustomString(
                  state?.dailyWeatherData?.intervals[index]?.values?.sunriseTime
                )}
              </td>
            </tr>
            <tr>
              <th className="table-head">Sun Set Time</th>
              <td>
                {formatTimeToCustomString(
                  state?.dailyWeatherData?.intervals[index]?.values?.sunsetTime
                )}
              </td>
            </tr>
            <tr>
              <th className="table-head">Humidity</th>
              <td>
                {state?.dailyWeatherData?.intervals[index]?.values?.humidity}%
              </td>
            </tr>
            <tr>
              <th className="table-head">Wind Speed</th>
              <td>
                {state?.dailyWeatherData?.intervals[index]?.values?.windSpeed}
                mph
              </td>
            </tr>
            <tr>
              <th className="table-head">Visibility</th>
              <td>
                {state?.dailyWeatherData?.intervals[index]?.values?.visibility}
                mi
              </td>
            </tr>
            <tr>
              <th className="table-head">Cloud Cover</th>
              <td>
                {state?.dailyWeatherData?.intervals[index]?.values?.cloudCover}%
              </td>
            </tr>
          </tbody>
        </Table>

        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}>
          <Map
            mapId="DEMO_MAP_ID"
            style={{ width: "100%", height: "400px" }}
            defaultCenter={center}
            defaultZoom={12}
          >
            <AdvancedMarker position={center} />
          </Map>
        </APIProvider>
      </Container>
    </>
  );
};

export default Details;

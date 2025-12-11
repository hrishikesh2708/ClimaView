import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchAutocompleteData,
  fetchFavoritesData,
  fetchGeocodeData,
  fetchIpinfoAndWeatherData,
  fetchIpinfoData,
  toggleResultsFavTab,
} from "../../redux/action";
import { RootState, useAppDispatch } from "../../store";
import { Form, ListGroup, Button, Row, Col } from "react-bootstrap";
import { stateOptions } from "../global/constants";
import searchIcon from "../../assets/search.svg";

const WeatherSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const store = useSelector((state: RootState) => state);
  const [isChecked, setIsChecked] = useState(false);
  const [city, setCity] = useState<string>("");
  const [cityError, setCityError] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [streetError, setStreetError] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [isStateInvalid, setIsStateInvalid] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    { key: string; value: string }[]
  >([]);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);
  const [isStateAutocompleteOpen, setIsStateAutocompleteOpen] = useState(false);
  const isSearchEnabled =
    (isChecked && store?.latLong.length > 0) || (street && city && state);

  const handleSearch = async () => {
    try {
      dispatch(toggleResultsFavTab("results"));
      if (isChecked) {
        await dispatch(fetchIpinfoAndWeatherData());
        await dispatch(fetchFavoritesData());
      } else {
        await dispatch(
          fetchGeocodeData({
            input: `${street.replace(/ /g, "+")}+${city}+${state}`,
            cityInput: city,
          })
        );
        await dispatch(fetchFavoritesData());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setCityError("");
    setIsAutocompleteOpen(false);
    if (
      stateOptions.find(
        (option) =>
          option.key ===
          store?.autocomplete?.autocompleteStateSuggestion[
            store?.autocomplete?.autocompleteSuggestion.indexOf(selectedCity)
          ]
      )?.value != undefined
    ) {
      setIsStateInvalid(false);
      setState(
        stateOptions.find(
          (option) =>
            option.key ===
            store?.autocomplete?.autocompleteStateSuggestion[
              store?.autocomplete?.autocompleteSuggestion.indexOf(selectedCity)
            ]
        )?.value!
      );
    } else {
      setIsStateInvalid(true);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setCity(userInput);
    setCityError("");

    if (userInput) {
      setIsAutocompleteOpen(true);
      dispatch(fetchAutocompleteData(userInput));
    } else {
      setIsAutocompleteOpen(false);
    }
  };

  const handleCityBlur = () => {
    if (!city.trim()) {
      setCityError("Please enter a valid city.");
    }
    setTimeout(() => setIsAutocompleteOpen(false), 200);
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setStreet(userInput);
    setStreetError("");
  };

  const handleStreetBlur = () => {
    if (!street.trim()) {
      setStreetError("Please enter a valid street.");
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value.trim();
    setState(userInput);
    setIsStateInvalid(false);

    if (userInput) {
      setFilteredSuggestions(
        stateOptions.filter((suggestion) =>
          suggestion.value.toLowerCase().includes(userInput.toLowerCase())
        )
      );
      setIsStateAutocompleteOpen(true);
    } else {
      setFilteredSuggestions([]);
      setIsStateAutocompleteOpen(false);
    }
  };

  const handleStateBlur = () => {
    if (!state.trim()) {
      setIsStateInvalid(true);
    }
    setTimeout(() => setIsStateAutocompleteOpen(false), 200);
  };

  const handleStateSelect = (selectedState: string) => {
    setState(selectedState);
    setIsStateInvalid(false);
    setIsStateAutocompleteOpen(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setCityError("");
      setStreetError("");
      setIsStateInvalid(false);
      dispatch(fetchIpinfoData());
    }
  };

  const handleClear = () => {
    setCity("");
    setState("");
    setStreet("");
    setCityError("");
    setStreetError("");
    setIsStateInvalid(false);
    setIsChecked(false);
    setIsAutocompleteOpen(false);
    setIsStateAutocompleteOpen(false);
    dispatch(toggleResultsFavTab(""));
  };

  return (
    <div className="weather-search-component pt-3 pb-3 px-3 mt-2">
      <Row className="text-center">
        <p className="h2">Weather Search ⛅️</p>
      </Row>
      <Form className="mt-3">
        <div className="form-div">
          <Row className="mb-1">
            <Col md={2}>
              <Form.Label>
                Street<span className="text-danger">*</span>
              </Form.Label>
            </Col>
            <Col md={10}>
              <Form.Group controlId="street-input">
                <Form.Control
                  type="text"
                  value={street}
                  onChange={handleStreetChange}
                  onBlur={handleStreetBlur}
                  disabled={isChecked}
                  isInvalid={!!streetError}
                />
                <Form.Control.Feedback type="invalid">
                  {streetError}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-1">
            <Col md={2}>
              <Form.Label>
                City<span className="text-danger">*</span>
              </Form.Label>
            </Col>
            <Col md={10}>
              <Form.Group
                controlId="city-search"
                style={{ position: "relative" }}
              >
                <Form.Control
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  onBlur={handleCityBlur}
                  onFocus={() => city && setIsAutocompleteOpen(true)}
                  disabled={isChecked}
                  isInvalid={!!cityError}
                />
                <Form.Control.Feedback type="invalid">
                  {cityError}
                </Form.Control.Feedback>
                {isAutocompleteOpen &&
                  store?.autocomplete?.autocompleteSuggestion.length > 0 && (
                    <ListGroup className="custom-list-group">
                      {store?.autocomplete?.autocompleteSuggestion.map(
                        (suggestion, index) => (
                          <ListGroup.Item
                            key={index}
                            action
                            onClick={() => handleCitySelect(suggestion)}
                            className="custom-list-group-item"
                          >
                            {suggestion}
                          </ListGroup.Item>
                        )
                      )}
                    </ListGroup>
                  )}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-1">
            <Col md={2}>
              <Form.Label>
                State<span className="text-danger">*</span>
              </Form.Label>
            </Col>
            <Col md={5}>
              <Form.Group
                controlId="state-search"
                style={{ position: "relative" }}
              >
                <Form.Control
                  type="text"
                  value={state}
                  placeholder="Select your state"
                  onChange={handleStateChange}
                  onBlur={handleStateBlur}
                  onFocus={() => state && setIsStateAutocompleteOpen(true)}
                  disabled={isChecked}
                  isInvalid={isStateInvalid}
                />
                {isStateAutocompleteOpen && filteredSuggestions.length > 0 && (
                  <ListGroup className="custom-list-group">
                    {filteredSuggestions.map((suggestion) => (
                      <ListGroup.Item
                        key={suggestion.key}
                        action
                        onClick={() => handleStateSelect(suggestion.value)}
                        className="custom-list-group-item"
                      >
                        {suggestion.value}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Form.Group>
            </Col>
          </Row>
        </div>

        <hr className="border-secondary-subtle" />
        <Row className="d-flex justify-content-center">
          <Form.Label className="w-auto px-1">
            Autodetect Location<span className="text-danger">&#42;</span>
          </Form.Label>
          <div className="w-auto px-0">
            <input
              className={`form-check-input ${
                isChecked ? "bg-warning border-0" : ""
              }`}
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
          <Form.Label className="w-auto px-1">Current Location</Form.Label>
        </Row>
        <div className="text-center mt-3">
          <Button
            variant="primary"
            className="mx-2"
            disabled={!isSearchEnabled}
            onClick={handleSearch}
          >
            <img src={searchIcon} alt="search icon" />
            Search
          </Button>
          <Button
            variant="outline-secondary"
            className="mx-2"
            type="reset"
            onClick={handleClear}
          >
            <i className="bi bi-list-nested"></i>
            Clear
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default WeatherSearch;

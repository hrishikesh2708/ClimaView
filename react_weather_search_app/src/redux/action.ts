import { Dispatch } from "redux";
import { DataActionTypes, FavoriteCity } from "./types";
import {
  ADD_FAVORITES_DATA,
  ADD_FAVORITES_DATA_FAILURE,
  ADD_FAVORITES_DATA_SUCCESS,
  DELETE_FAVORITES_DATA,
  DELETE_FAVORITES_DATA_FAILURE,
  DELETE_FAVORITES_DATA_SUCCESS,
  FETCH_AUTOCOMPLETE_DATA,
  FETCH_AUTOCOMPLETE_DATA_FAILURE,
  FETCH_AUTOCOMPLETE_DATA_SUCCESS,
  FETCH_FAVORITES_DATA,
  FETCH_FAVORITES_DATA_FAILURE,
  FETCH_FAVORITES_DATA_SUCCESS,
  FETCH_GEOCODE_DATA,
  FETCH_GEOCODE_DATA_FAILURE,
  FETCH_GEOCODE_DATA_SUCCESS,
  FETCH_IPINFO_DATA,
  FETCH_IPINFO_DATA_FAILURE,
  FETCH_IPINFO_DATA_SUCCESS,
  FETCH_IPINFO_LATLNG_SUCCESS,
  FETCH_WEATHER_DATA,
  FETCH_WEATHER_DATA_FAILURE,
  FETCH_WEATHER_DATA_SUCCESS,
  NO_RECORDS_FOUND,
  PROGRESS_UPDATE,
  RECORDS_FOUND,
  RETURN_RESULTS_TAB,
  TOGGLE_DETAILS_RESULTS_TAB,
  TOGGLE_RESULTS_FAV_TAB,
} from "./actionTypes";

export const fetchIpinfoData = () => {
  return async (dispatch: Dispatch<DataActionTypes>) => {
    let url = `https://ipinfo.io/?token=${import.meta.env.VITE_IPINFO_TOKEN}`;
    try {
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "Accept-Encoding": "gzip",
        },
      });
      const data = await response.json();
      dispatch({ type: FETCH_IPINFO_LATLNG_SUCCESS, payload: data.loc });
    } catch (error) {
      dispatch({
        type: FETCH_IPINFO_DATA_FAILURE,
        error: "Failed to fetch IPinfo data",
      });
    }
  };
};

export const fetchIpinfoAndWeatherData = () => {
  return async (dispatch: Dispatch<DataActionTypes>) => {
    dispatch({ type: FETCH_IPINFO_DATA });
    dispatch({ type: RECORDS_FOUND });
    let url = `https://ipinfo.io/?token=${import.meta.env.VITE_IPINFO_TOKEN}`;
    try {
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "Accept-Encoding": "gzip",
        },
      });
      const data = await response.json();
      dispatch({ type: FETCH_IPINFO_DATA_SUCCESS, payload: data });
      const latLong = data.loc;
      dispatch({ type: PROGRESS_UPDATE, payload: 33 });
      if (latLong === undefined || latLong === "") {
        dispatch({ type: NO_RECORDS_FOUND });
      } else {
        dispatch({ type: FETCH_WEATHER_DATA, input: latLong });
        url = `/dailyWeather?location=${latLong}`;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
              "Accept-Encoding": "gzip",
            },
          });
          const data = await response.json();
          dispatch({
            type: FETCH_WEATHER_DATA_SUCCESS,
            payload: data?.data?.timelines,
          });
          dispatch({ type: PROGRESS_UPDATE, payload: 66 });
        } catch (error) {
          dispatch({
            type: FETCH_WEATHER_DATA_FAILURE,
            error: "Failed to fetch weather data",
          });
        }
      }
      dispatch({ type: RECORDS_FOUND });
    } catch (error) {
      dispatch({
        type: FETCH_IPINFO_DATA_FAILURE,
        error: "Failed to fetch IPinfo data",
      });
    }
  };
};

type inputgeo = {
  input: string;
  cityInput: string;
};

export const fetchGeocodeData = (req: inputgeo) => {
  return async (dispatch: Dispatch<DataActionTypes>) => {
    dispatch({ type: FETCH_GEOCODE_DATA, input: req?.input });
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${req?.input}&key=${import.meta.env.VITE_GOOGLE_PLACES_API_KEY}`;
    try {
      const response = await fetch(url, {
        headers: {
          accept: "application/json",
          "Accept-Encoding": "gzip",
        },
      });
      const data = await response.json();
      if (data?.status === "ZERO_RESULTS") {
        dispatch({ type: NO_RECORDS_FOUND });
      } else {
        dispatch({ type: FETCH_GEOCODE_DATA_SUCCESS, payload: data, cityInput: req.cityInput });
        dispatch({ type: PROGRESS_UPDATE, payload: 33 });
        const latLong = `${data?.results[0]?.geometry?.location?.lat}, ${data?.results[0]?.geometry?.location?.lng}`;
        dispatch({ type: FETCH_WEATHER_DATA, input: latLong });
        url = `/dailyWeather?location=${latLong}`;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              accept: "application/json",
              "Accept-Encoding": "gzip",
            },
          });
          const data = await response.json();
          dispatch({
            type: FETCH_WEATHER_DATA_SUCCESS,
            payload: data?.data?.timelines,
          });
          dispatch({ type: PROGRESS_UPDATE, payload: 66 });

          dispatch({ type: RECORDS_FOUND });
        } catch (error) {
          dispatch({
            type: FETCH_WEATHER_DATA_FAILURE,
            error: "Failed to fetch weather data",
          });
        }
      }
    } catch (error) {
      dispatch({
        type: FETCH_GEOCODE_DATA_FAILURE,
        error: "Failed to fetch geocodde data",
      });
    }
  };
};

export const fetchAutocompleteData = (input: string) => {
  return async (dispatch: Dispatch<DataActionTypes>) => {
    dispatch({ type: FETCH_AUTOCOMPLETE_DATA, input: input });
    try {
      const response = await fetch(
        `/autocomplete?input=${input}`
      );
      const data = await response.json();
      dispatch({ type: FETCH_AUTOCOMPLETE_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_AUTOCOMPLETE_DATA_FAILURE,
        error: "Failed to fetch autocomplete data",
      });
    }
  };
};

export const fetchFavoritesData = () => {
  return async (dispatch: Dispatch<DataActionTypes>) => {
    dispatch({ type: FETCH_FAVORITES_DATA });
    try {
      const response = await fetch(`/favorites`);
      const data = await response.json();
      dispatch({ type: FETCH_FAVORITES_DATA_SUCCESS, payload: data });
      dispatch({ type: PROGRESS_UPDATE, payload: 90 });
    } catch (error) {
      dispatch({
        type: FETCH_FAVORITES_DATA_FAILURE,
        error: "Failed to fetch favorites data",
      });
    }
  };
};

export const deleteFavorite = (id: string) => {
  return async (dispatch: Dispatch<DataActionTypes>) => {
    dispatch({ type: DELETE_FAVORITES_DATA });
    try {
      let response = await fetch(`/favorites/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete favorite");
      }
      response = await fetch(`/favorites`);
      let data = await response.json();
      dispatch({ type: DELETE_FAVORITES_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_FAVORITES_DATA_FAILURE,
        error: "Failed to delete favorite",
      });
    }
  };
};

export const addFavorite = (input: FavoriteCity) => {
  return async (dispatch: Dispatch<DataActionTypes>) => {
    dispatch({ type: ADD_FAVORITES_DATA });
    try {
      let response = await fetch(`/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw new Error("Failed to add favorite");
      }
      response = await fetch(`/favorites`);
      let data = await response.json();
      dispatch({ type: ADD_FAVORITES_DATA_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_FAVORITES_DATA_FAILURE,
        error: "Failed to add favorite",
      });
    }
  };
};

export const toggleDetailsAndResultsSection = (input: number) => {
  return (dispatch: Dispatch<DataActionTypes>) => {
    dispatch({ type: TOGGLE_DETAILS_RESULTS_TAB, input: input });
  };
};

export const returnResultsSection = (input: number) => {
  return (dispatch: Dispatch<DataActionTypes>) => {
    dispatch({ type: RETURN_RESULTS_TAB, input: input });
  };
};

export const toggleResultsFavTab = (input: string) => {
  return (dispatch: Dispatch<DataActionTypes>) => {
    dispatch({ type: TOGGLE_RESULTS_FAV_TAB, input: input });
  };
};

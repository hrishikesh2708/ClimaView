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

export interface WeatherValues {
  cloudCover: number;
  humidity: number;
  moonPhase: number;
  precipitationProbability: number;
  precipitationType: number;
  pressureSeaLevel: number;
  sunriseTime: string;
  sunsetTime: string;
  temperature: number;
  temperatureApparent: number;
  temperatureMax: number;
  temperatureMin: number;
  uvIndex?: number;
  visibility: number;
  weatherCode: WeatherCode;
  windDirection: number;
  windSpeed: number;
}
export interface WeatherInterval {
  startTime: string;
  values: WeatherValues;
}
export interface WeatherData {
  timestep: string;
  endTime: string;
  startTime: string;
  intervals: WeatherInterval[];
}
export interface chartXYMap {
  x: number;
  y: number;
}
export interface chartxValueDirectionMap {
  x: number;
  value: number;
  direction: number;
}
export interface MetogramWeatherValues {
  humidity: chartXYMap[];
  winds: chartxValueDirectionMap[];
  temperatures: chartXYMap[];
  pressures: chartXYMap[];
}

// Define type for possible weather codes
export type WeatherCode =
  | 4201
  | 4001
  | 4200
  | 6201
  | 6001
  | 6200
  | 6000
  | 4000
  | 7101
  | 7000
  | 7102
  | 5101
  | 5000
  | 5100
  | 5001
  | 8000
  | 2100
  | 2000
  | 1001
  | 1102
  | 1101
  | 1100
  | 1000;

export interface Autocomplete {
  autocompleteStatus: boolean;
  autocompletePayload: {
    predictions: Prediction[];
    status: string;
  };
  autocompleteStateSuggestion: any[];
  autocompleteSuggestion: any[];
}

export interface Prediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}

export type MatchedSubstring = {
  length: number;
  offset: number;
};

export type StructuredFormatting = {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
};

export type Term = {
  offset: number;
  value: string;
};

interface IPinfoData {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
interface Viewport {
  northeast: Location;
  southwest: Location;
}
interface Location {
  lat: number;
  lng: number;
}
interface Geometry {
  location: Location;
  location_type: string;
  viewport: Viewport;
}
interface PlusCode {
  compound_code: string;
  global_code: string;
}
interface LocationResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  partial_match?: boolean;
  place_id: string;
  plus_code?: PlusCode;
  types: string[];
}

interface GeocodeData {
  results: LocationResult[];
  status: string;
}

export type FavoriteCity = {
  _id: string;
  city: string;
  state: string;
};

export interface DataState {
  loading: boolean;
  error: string | null;
  weatherCodeToImageMap: Record<WeatherCode, string>;
  weatherCodesMapping: Record<WeatherCode, string>;
  dailyWeatherData: WeatherData;
  hourlyWeatherData: WeatherData;
  minMaxtemperatureData: any[];
  MetogramWeatherValues: MetogramWeatherValues;
  countryName: string;
  stateName: string;
  cityName: string;
  formCityname: string;
  formatedAddress: string;
  autocomplete: Autocomplete;
  detailsId: number;
  detailsResultsSection: boolean;
  toggleResultsFav: string;
  ipinfoData: IPinfoData;
  geocodeData: GeocodeData;
  latLong: string,
  favoritesData: FavoriteCity[];
  isFavoritesEmpty: boolean;
  noRecodeFound: boolean;
  progress: number;
}

interface FetchAutocompleteDataRequestAction {
  type: typeof FETCH_AUTOCOMPLETE_DATA;
  input: string;
}

interface FetchAutocompleteDataSuccessAction {
  type: typeof FETCH_AUTOCOMPLETE_DATA_SUCCESS;
  payload: {
    predictions: Prediction[];
    status: string;
  };
}

interface FetchAutocompleteDataFailureAction {
  type: typeof FETCH_AUTOCOMPLETE_DATA_FAILURE;
  error: string;
}

interface toggleDetailsResultsTabAction {
  type: typeof TOGGLE_DETAILS_RESULTS_TAB;
  input: number;
}
interface returnResultsTabAction {
  type: typeof RETURN_RESULTS_TAB;
  input: number;
}

interface toggleResultsFavTabAction {
  type: typeof TOGGLE_RESULTS_FAV_TAB;
  input: string;
}

interface FetchGeocodeDataRequestAction {
  type: typeof FETCH_GEOCODE_DATA;
  input: string;
}

interface FetchGeocodeDataSuccessAction {
  type: typeof FETCH_GEOCODE_DATA_SUCCESS;
  payload: GeocodeData;
  cityInput: string;
}

interface FetchGeocodeDataFailureAction {
  type: typeof FETCH_GEOCODE_DATA_FAILURE;
  error: string;
}

interface FetchIpinfoDataRequestAction {
  type: typeof FETCH_IPINFO_DATA;
}

interface FetchIpinfoDataSuccessAction {
  type: typeof FETCH_IPINFO_DATA_SUCCESS;
  payload: IPinfoData;
}

interface FetchIpinfoDataFailureAction {
  type: typeof FETCH_IPINFO_DATA_FAILURE;
  error: string;
}

interface FetchWeatherDataRequestAction {
  type: typeof FETCH_WEATHER_DATA;
  input: string;
}

interface FetchWeatherDataSuccessAction {
  type: typeof FETCH_WEATHER_DATA_SUCCESS;
  payload: [WeatherData, WeatherData];
}

interface FetchWeatherDataFailureAction {
  type: typeof FETCH_WEATHER_DATA_FAILURE;
  error: string;
}

interface FetchFavoritesDataRequestAction {
  type: typeof FETCH_FAVORITES_DATA;
}

interface FetchFavoritesDataSuccessAction {
  type: typeof FETCH_FAVORITES_DATA_SUCCESS;
  payload: FavoriteCity[];
}

interface FetchFavoritesDataFailureAction {
  type: typeof FETCH_FAVORITES_DATA_FAILURE;
  error: string;
}

interface DeleteFavoritesDataRequestAction {
  type: typeof DELETE_FAVORITES_DATA;
}

interface DeleteFavoritesDataSuccessAction {
  type: typeof DELETE_FAVORITES_DATA_SUCCESS;
  payload: FavoriteCity[];
}

interface DeleteFavoritesDataFailureAction {
  type: typeof DELETE_FAVORITES_DATA_FAILURE;
  error: string;
}

interface AddFavoritesDataRequestAction {
  type: typeof ADD_FAVORITES_DATA;
}

interface AddFavoritesDataSuccessAction {
  type: typeof ADD_FAVORITES_DATA_SUCCESS;
  payload: FavoriteCity[];
}

interface AddFavoritesDataFailureAction {
  type: typeof ADD_FAVORITES_DATA_FAILURE;
  error: string;
}

interface NoRecordFoundAction {
  type : typeof NO_RECORDS_FOUND;
}

interface RecordFoundAction {
  type : typeof RECORDS_FOUND;
}

interface UpdateProgress {
  type : typeof PROGRESS_UPDATE;
  payload : number; 
}

interface UpdateLatlng {
  type: typeof FETCH_IPINFO_LATLNG_SUCCESS,
  payload: string,
}

export type DataActionTypes =
  | FetchAutocompleteDataRequestAction
  | FetchAutocompleteDataSuccessAction
  | FetchAutocompleteDataFailureAction
  | FetchGeocodeDataRequestAction
  | FetchGeocodeDataSuccessAction
  | FetchGeocodeDataFailureAction
  | FetchIpinfoDataRequestAction
  | FetchIpinfoDataSuccessAction
  | FetchIpinfoDataFailureAction
  | FetchWeatherDataRequestAction
  | FetchWeatherDataSuccessAction
  | FetchWeatherDataFailureAction
  | FetchFavoritesDataRequestAction
  | FetchFavoritesDataSuccessAction
  | FetchFavoritesDataFailureAction
  | toggleDetailsResultsTabAction
  | returnResultsTabAction
  | toggleResultsFavTabAction
  | DeleteFavoritesDataRequestAction
  | DeleteFavoritesDataSuccessAction
  | DeleteFavoritesDataFailureAction
  | AddFavoritesDataRequestAction
  | AddFavoritesDataSuccessAction
  | AddFavoritesDataFailureAction
  | NoRecordFoundAction
  | RecordFoundAction
  | UpdateProgress
  | UpdateLatlng;

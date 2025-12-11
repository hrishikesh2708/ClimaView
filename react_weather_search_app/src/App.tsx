import "./App.css";
import WeatherSearch from "./components/weatherSearch/WeatherSearch";
import ButtonGroup from "./components/buttonGroup/ButtonGroup";
// import { RootState } from "./store";
// import { useSelector } from "react-redux";
// import ProgressBar from "./components/progressBar/ProgressBar";
import 'bootstrap-icons/font/bootstrap-icons.css';

const App: React.FC = () => {
  // const store = useSelector((state: RootState) => state);

  return (
    <div className="root-container">
      <WeatherSearch />
      <ButtonGroup />
    </div>
  );
};

export default App;

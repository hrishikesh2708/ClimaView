import React from "react";
import { Container, Button } from "react-bootstrap";
import Results from "../results/Results";
import Favorites from "../favorites/Favorites";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  fetchFavoritesData,
  returnResultsSection,
  toggleResultsFavTab,
} from "../../redux/action";
import ProgressBar from "../../components/progressBar/ProgressBar";


const ButtonGroup: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  return (
    <Container className="text-center mt-4 mb-4 px-0">
      <Button
        type="button"
        variant="primary"
        className={`mx-1 border-0 ${
          state?.toggleResultsFav === "results" ||
          state?.toggleResultsFav === ""
            ? "bg-primary text-light"
            : "bg-white text-primary"
        }`}
        onClick={() => {
            dispatch(toggleResultsFavTab("results"));
        }}
      >
        Results
      </Button>
      <Button
        type="button"
        variant="primary"
        className={`mx-1 border-0 ${
          state?.toggleResultsFav === "favorites"
            ? "bg-primary text-light"
            : "bg-white text-primary"
        }`}
        onClick={() => {
          dispatch(toggleResultsFavTab("favorites"));
          dispatch(returnResultsSection(state?.detailsId));
          dispatch(fetchFavoritesData());
        }}
      >
        Favorites
      </Button>
      {state?.loading && <ProgressBar />}
      {state?.toggleResultsFav === "results" && state?.progress >89 && <Results />}
      {state?.toggleResultsFav === "favorites" && state?.progress >89 && <Favorites />}
    </Container>
  );
};

export default ButtonGroup;

import * as React from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import angleRightIcon from "../../assets/angleRight.svg";
import Tabs from "../tabs/Tabs";
import Details from "../details/Details";
import { Row, Col } from "react-bootstrap";
import {
  addFavorite,
  deleteFavorite,
  toggleDetailsAndResultsSection,
} from "../../redux/action";
import { FavoriteCity } from "../../redux/types";

const Results: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const handleDetailsClick = () => {
    dispatch(toggleDetailsAndResultsSection(state?.detailsId));
  };

  const handlefavClick = () => {
    const favoriteCity: FavoriteCity = {
      _id: "",
      city: state?.cityName,
      state: state?.stateName,
    };

    if (
      state?.favoritesData.some(
        (fav) => fav.city?.toLowerCase() === state?.cityName.toLowerCase()
      )
    ) {
      dispatch(
        deleteFavorite(
          state?.favoritesData.find(
            (fav) => fav.city?.toLowerCase() === state?.cityName.toLowerCase()
          )?._id!
        )
      );
    } else {
      dispatch(addFavorite(favoriteCity));
    }
  };
  return (
    <div className="mt-5">
      {state?.noRecodeFound ? (
        <div className="alert alert-danger text-start" role="alert">
          An error occured please try again later
        </div>
      ) : (
        <>
          {!state?.detailsResultsSection && state?.stateName?.length > 0 && (
            <div className="slide-right">
              <Row className="text-center mb-3">
                <h5>Forecast at {`${state?.cityName.length > 0 ? state?.cityName : state.formCityname}, ${state?.stateName}`}</h5>
              </Row>

              <Row className="justify-content-end mb-3">
                <Col xs="auto">
                  <button
              className="px-2 pb-1 pt-1"
              style={{
                borderRadius: "5px",
                border: "1px solid black",
                cursor: "pointer",
              }}

                    onClick={() => handlefavClick()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill={
                        state?.favoritesData.some(
                          (fav) =>
                            fav.city?.toLowerCase() ===
                            state?.cityName.toLowerCase()
                        )
                          ? "yellow"
                          : "white"
                      }
                      stroke="black"
                      strokeWidth="1.5"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73z" />
                    </svg>
                  </button>
                </Col>
                <Col xs="auto" className="px-0">
                  <button
                    style={{
                      backgroundColor: "transparent",
                      color: "grey",
                      display: "flex",
                      alignItems: "center",
                      padding: "0.2rem 0.5rem",
                      fontSize: "1rem",
                      cursor: "pointer",
                      border: "none",
                      textDecoration: "underline",
                      textDecorationColor: "blue",
                    }}
                    // className="align-middle"
                    onClick={handleDetailsClick}
                  >
                    Details
                    <img
                      src={angleRightIcon}
                      alt="Right arrow"
                      width={20}
                      height={20}
                      className="ms-1"
                    />
                  </button>
                </Col>
              </Row>

              <Tabs />
            </div>
          )}

          {state?.detailsResultsSection && <Details index={state?.detailsId} />}
        </>
      )}
    </div>
  );
};

export default Results;

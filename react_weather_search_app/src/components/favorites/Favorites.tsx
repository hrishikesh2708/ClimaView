import React from "react";
import { Container } from "react-bootstrap";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import Delete from "../../assets/delete.svg";
import { FavoriteCity } from "../../redux/types";
import {
  deleteFavorite,
  fetchFavoritesData,
  fetchGeocodeData,
  toggleResultsFavTab,
} from "../../redux/action";

const ButtonGroup: React.FC = () => {
  const dispatch = useAppDispatch();
  const store = useSelector((state: RootState) => state);
  const handleClick = async (data: FavoriteCity) => {
    // await dispatch(fetchGeocodeData(`${data.city}+${data.state}`));
    await dispatch(
      fetchGeocodeData({
        input: `${data.city}+${data.state}`,
        cityInput: "",
      })
    );
    await dispatch(fetchFavoritesData());
    dispatch(toggleResultsFavTab("results"));
  };
  const handleDelete = (index: string) => {
    dispatch(deleteFavorite(index));
  };
  return (
    <Container className="mt-4 mb-4 px-0">
      {store?.isFavoritesEmpty ? (
        <>
          <div className="alert alert-warning text-start" role="alert">
            Sorry! No records found.
          </div>
        </>
      ) : (
        <>
          <table className="table text-start">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {store?.favoritesData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="date-style" onClick={() => handleClick(data)}>
                    {data?.city}
                  </td>
                  <td className="date-style" onClick={() => handleClick(data)}>
                    {data?.state}
                  </td>
                  <td>
                    <img
                      src={Delete}
                      alt="delete icon"
                      width={20}
                      height={20}
                      onClick={() => handleDelete(data?._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Container>
  );
};

export default ButtonGroup;

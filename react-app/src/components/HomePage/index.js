import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as SpotActions from "../../store/spots";
import SearchBar from "../SearchBar";

function Home() {
  const spots = useSelector((state) => Object.values(state.spots));
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(SpotActions.getAllSpotsThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  const handleSpotClick = (spotId) => {
    history.push(`/spots/${spotId}`);
  };

  return (
    <div>
      <SearchBar item="Spots" />
      <div className="home__spot__cont">
        {isLoaded &&
          spots.map((spot) => {
            if (Number.isInteger(spot.id)) {
              let spot_type_value = spot.spot_type.split("_").map((word) => {
                return " " + word[0].toUpperCase() + word.slice(1);
              });
              return (
                <div
                  className="spot__card"
                  key={spot.id}
                  onClick={() => handleSpotClick(spot.id)}
                >
                  <img
                    className="spot__card__img"
                    src={spot.preview_img}
                    alt="Spot preview"
                  />
                  <h2>{spot.name}</h2>
                  <ul className="spot__card__details">
                    <li>{spot_type_value}</li>
                  </ul>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default Home;

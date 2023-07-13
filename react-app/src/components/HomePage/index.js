import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SpotActions from "../../store/spots";

function Home() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(SpotActions.getAllSpotsThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <div>
      <div className="home__search__cont">
        <input className="home__search" type="search" placeholder="Search" />
      </div>
      <div className="home__spot__cont">
        {isLoaded &&
          spots.map((spot) => {
            return (
              <div className="spot__card" key={spot.id}>
                <img className="spot__card__img" src={spot.preview_img}/>
                <h2>{spot.name}</h2>
                <h4>{spot.spot_type}</h4>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;

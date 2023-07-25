import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as FavoriteActions from "../../store/favorites";

function FavoriteDetail() {
  const { favoriteId } = useParams();
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorites.favoriteDetail);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(FavoriteActions.getFavoriteDetailsThunk(favoriteId)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, favoriteId]);

  return (
    isLoaded && (
      <div>
        <div className="cont">
          <div className="fav__cont">
            <div className="fav__detail__cont">
              <h2>{favorite.name}</h2>
              <ul>
                <li>{favorite.owner.callsign}</li>
                <li>{favorite.visibility ? "Public" : "Private"}</li>
              </ul>
              <p>{favorite.desc}</p>
            </div>
            <div className="fav__spots">
              {favorite.spots.map((spot) => {
                if (Number.isInteger(spot.id)) {
                  let spot_type_value = spot.spot_type
                    .split("_")
                    .map((word) => {
                      return " " + word[0].toUpperCase() + word.slice(1);
                    });
                  return (
                    <div className="fav__spots__card cards" key={spot.id}>
                      <img
                        className="card__img"
                        src={spot.preview_img}
                        alt="Spot preview"
                      />
                      <div>
                        <h3>{spot.name}</h3>
                        <h4>{spot_type_value}</h4>
                        <p className="test">{spot.desc}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default FavoriteDetail;

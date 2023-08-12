import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as FavoriteActions from "../../store/favorites";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteModal";
import UpdateFavoriteModal from "../UpdateFavoriteModal";

function FavoriteDetail() {
  const { favoriteId } = useParams();
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorites.favoriteDetail);
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(FavoriteActions.getFavoriteDetailsThunk(favoriteId)).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch, favoriteId, isLoaded]);

  const handleSpotClick = (spotId) => {
    history.push(`/spots/${spotId}`);
  };

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
              {user && user.id === favorite.owner.id && (
                <div className="spot__actions">
                  <OpenModalButton
                    buttonText="Update Favorite"
                    modalComponent={
                      <UpdateFavoriteModal
                        favorite={favorite}
                        onSetIsLoaded={setIsLoaded}
                      />
                    }
                  />
                  <OpenModalButton
                    buttonText="Delete Favorite"
                    modalComponent={
                      <DeleteModal type="favorite" item={favorite} />
                    }
                  />
                </div>
              )}
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
                    <div
                      className="fav__spots__card cards"
                      key={spot.id}
                      onClick={() => handleSpotClick(spot.id)}
                    >
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

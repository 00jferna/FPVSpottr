import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as FavoriteActions from "../../store/favorites";
import SearchBar from "../SearchBar";

function Favorite() {
  const favorites = useSelector((state) => Object.values(state.favorites));
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    dispatch(FavoriteActions.getAllFavoritesThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  const handleSpotClick = (favoriteId) => {
    history.push(`/favorites/${favoriteId}`);
  };

  return (
    <div>
      <SearchBar item="Favorites" />
      <div className="home__favs__cont">
        {isLoaded &&
          favorites.map((favorite) => {
            return (
              <div
                className="fav__card cards"
                key={favorite.id}
                onClick={() => handleSpotClick(favorite.id)}
              >
                <div>
                  <h2>{favorite.name}</h2>
                  <ul className="fav__card__details">
                    <li>{favorite.owner.callsign}</li>
                    <li>{favorite.visibility ? "Public" : "Private"}</li>
                  </ul>
                </div>
                <div>
                  <p>{favorite.desc}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Favorite;

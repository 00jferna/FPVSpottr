const GET_ALL_FAVORITES = "favorites/GET_ALL_FAVORITES";
const GET_FAVORITE_DETAIL = "favorites/GET_FAVORITE_DETAIL";

const getAllFavorites = (favorites) => ({
  type: GET_ALL_FAVORITES,
  favorites,
});

const getFavoriteDetails = (favorite) => ({
  type: GET_FAVORITE_DETAIL,
  favorite,
});

export const getAllFavoritesThunk = () => async (dispatch) => {
  const res = await fetch("/api/favorites/", {
    method: "GET",
  });

  const data = await res.json();
  let allFavorites = {};
  data.Favorites.forEach((favorite) => {
    allFavorites[favorite.id] = favorite;
  });

  dispatch(getAllFavorites(allFavorites));
  return data;
};

export const getFavoriteDetailsThunk = (favoriteId) => async (dispatch) => {
  const res = await fetch(`/api/favorites/${favoriteId}`, {
    method: "GET",
  });

  const data = await res.json();
  dispatch(getFavoriteDetails(data));
  return data;
};

export const createFavoritesThunk = (favorite) => async (dispatch) => {
  const res = await fetch("/api/favorites/create", {
    method: "POST",
    body: JSON.stringify(favorite),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const deleteFavoritesThunk = (favorite) => async (dispatch) => {
  const res = await fetch(`/api/favorites/${favorite.id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
};

const initialState = {
  favorites: {},
  favoriteDetail: {},
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FAVORITES:
      return action.favorites;
    case GET_FAVORITE_DETAIL:
      return { ...state, favoriteDetail: action.favorite };
    default:
      return state;
  }
};

export default favoritesReducer;

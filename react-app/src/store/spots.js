import { csrfFetch } from "./csrf";

// Constants
const GET_ALL_SPOTS = "spots/GET_ALL_SPOTS";
const GET__USER_SPOTS = "spots/GET__USER_SPOTS";
const GET_SPOT_DETAIL = "spots/GET_SPOT_DETAIL";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT";
const DELETE_SPOT = "spots/DELETE_SPOT";

const getAllSpots = (spots) => ({
  type: GET_ALL_SPOTS,
  spots,
});

const getUserSpots = (spots) => ({
  type: GET__USER_SPOTS,
  spots,
});

const getSpotDetails = (spot) => ({
  type: GET_SPOT_DETAIL,
  spot,
});

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

const deleteSpot = (spot) => ({
  type: DELETE_SPOT,
  spot,
});

export const getAllSpotsThunk = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/", {
    method: "GET",
  });

  const data = await res.json();
  let spots = {};
  data.Spots.forEach((spot) => {
    spots[spot.id] = spot;
  });

  dispatch(getAllSpots(spots));
  return data;
};

export const getUserSpotsThunk = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/user/${userId}`, {
    method: "GET",
  });

  const data = await res.json();
  let spots = {};
  data.Spots.forEach((spot) => {
    spots[spot.id] = spot;
  });

  dispatch(getUserSpots(spots));
  return data;
};

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "GET",
  });

  const data = await res.json();
  dispatch(getSpotDetails(data));
  return data;
};

export const createSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots/create", {
    method: "POST",
    body: JSON.stringify(spot),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(createSpot(data));
  return data;
};

export const updateSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "POST",
    body: JSON.stringify(spot),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(updateSpot(data));
  return data;
};

export const deleteSpotThunk = (spot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spot.id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  dispatch(deleteSpot(data));
  return data;
};

const initialState = { spotDetail: {} };

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_SPOTS:
      newState = action.spots;
      return newState;
    case GET__USER_SPOTS:
      newState.userSpots = action.spots;
      return newState;
    case GET_SPOT_DETAIL:
      newState.spotDetail = action.spot;
      return newState;
    case CREATE_SPOT:
      newState.spotDetail = action.spot;
      return newState;
    case UPDATE_SPOT:
      newState.spotDetail = action.spot;
      return newState;
    case DELETE_SPOT:
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;

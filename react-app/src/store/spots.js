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
  const res = await fetch("/api/spots/", {
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
  const res = await fetch(`/api/spots/user/${userId}`, {
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
  const res = await fetch(`/api/spots/${spotId}`, {
    method: "GET",
  });

  const data = await res.json();
  dispatch(getSpotDetails(data));
  return data;
};

export const createSpotThunk = (spot) => async (dispatch) => {
  const res = await fetch("/api/spots/create", {
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
  const res = await fetch(`/api/spots/${spot.id}`, {
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
  const res = await fetch(`/api/spots/${spot.id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  dispatch(deleteSpot(data));
  return data;
};

const initialState = {
  spots: {},
  spotDetail: {},
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return action.spots;
    case GET__USER_SPOTS:
      return { ...state, userSpots: action.spots };
    case GET_SPOT_DETAIL:
      return { ...state, spotDetail: action.spot };
    case CREATE_SPOT:
      return state
    case UPDATE_SPOT:
      return { ...state, spotDetail: action.spot };
    case DELETE_SPOT:
      return state;
    default:
      return state;
  }
};

export default spotsReducer;

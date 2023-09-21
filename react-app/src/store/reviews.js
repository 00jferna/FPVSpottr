const GET_SPOT_REVIEWS = "reviews/GET_SPOT_REVIEWS";
const CREATE_SPOT_REVIEW = "reviews/CREATE_SPOT_REVIEW";
const DELETE_SPOT_REVIEW = "reviews/DELETE_SPOT_REVIEW";

const getSpotReviews = (reviews) => ({
  type: GET_SPOT_REVIEWS,
  reviews,
});

const createSpotReviews = (reviews) => ({
  type: CREATE_SPOT_REVIEW,
  reviews,
});

export const getSpotReviewsThunk = (spot) => async (dispatch) => {
  const res = await fetch(`/api/reviews/spot/${spot.id}`, {
    method: "GET",
  });

  const data = await res.json();
  dispatch(getSpotReviews(data));
  return data;
};

export const createSpotReviewsThunk = (review) => async (dispatch) => {
  const res = await fetch("/api/reviews/create", {
    method: "POST",
    body: JSON.stringify(review),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const updateSpotReviewThunk = (review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    body: JSON.stringify(review),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const deleteSpotReviewsThunk = (review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
};

const initialState = {
  reviews: {},
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPOT_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
};

export default reviewsReducer;

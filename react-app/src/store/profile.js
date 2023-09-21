const GET_USER = "profile/GET_USER";
const UPDATE_USER = 'profile/UPDATE_USER'

const getUser = (user) => ({
  type: GET_USER,
  user,
});

const updateUser = (user)=>({
  type:UPDATE_USER,
  user
})

export const getUserThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/users/${userId}`, {
    method: "GET",
  });
  const data = await res.json();
  dispatch(getUser(data));
  return data;
};

export const updateUserThunk = (user) => async (dispatch) => {
  const res = await fetch(`/api/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(getUser(data));
  return data;
};

const userReducer = (state = { }, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
};

export default userReducer;

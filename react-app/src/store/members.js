const GET_MEMBER = "members/GET_MEMBER";

const getMember = (members) => ({
  type: GET_MEMBER,
  members,
});

export const getMembersThunk = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}/member`);

  const data = await res.json();
  dispatch(getMember(data));
  return data;
};

export const addMemberThunk = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}/member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

export const toggleMemberThunk = (groupId, userId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}/member/${userId}`, {
    method: "PUT",
  });

  const data = await res.json();
  return data;
};

export const removeMemberThunk = (groupId, userId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}/member/${userId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  return data;
};

const memberReducer = (state = [], action) => {
  switch (action.type) {
    case GET_MEMBER:
      return action.members;
    default:
      return state;
  }
};

export default memberReducer;

const GET_ALL_GROUPS = "groups/GET_ALL_GROUPS";
const GET_USER_GROUPS = "spots/GET_USER_GROUPS";
const GET_GROUP_DETAIL = "spots/GET_GROUP_DETAIL";
const CREATE_GROUP = "spots/CREATE_GROUP";
const UPDATE_GROUP = "spots/UPDATE_GROUP";
const DELETE_GROUP = "spots/DELETE_GROUP";

const getAllGroups = (groups) => ({
  type: GET_ALL_GROUPS,
  groups,
});

const getUserGroups = (groups) => ({
  type: GET_USER_GROUPS,
  groups,
});

const getGroupDetails = (group) => ({
  type: GET_GROUP_DETAIL,
  group,
});

const createGroup = (group) => ({
  type: CREATE_GROUP,
  group,
});

const updateGroup = (group) => ({
  type: UPDATE_GROUP,
  group,
});

const deleteGroup = (group) => ({
  type: DELETE_GROUP,
  group,
});

export const getAllGroupsThunk = () => async (dispatch) => {
  const res = await fetch("/api/groups/", {
    method: "GET",
  });

  const data = await res.json();
  let groups = {};
  data.Groups.forEach((group) => {
    groups[group.id] = group;
  });

  dispatch(getAllGroups(groups));
  return data;
};

export const getUserGroupsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/groups/user/${userId}`, {
    method: "GET",
  });

  const data = await res.json();
  // let groups = {};
  // data.UserGroups.forEach((group) => {
  //   groups[group.id] = group;
  // });

  dispatch(getUserGroups(data.UserGroups));
  return data;
};

export const getGroupDetailsThunk = (groupId) => async (dispatch) => {
  const res = await fetch(`/api/groups/${groupId}`, {
    method: "GET",
  });

  const data = await res.json();
  dispatch(getGroupDetails(data));
  return data;
};

export const createGroupThunk = (group) => async (dispatch) => {
  const res = await fetch("/api/groups/create", {
    method: "POST",
    body: JSON.stringify(group),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(createGroup(data));
  return data;
};

export const updateGroupThunk = (group) => async (dispatch) => {
  const res = await fetch(`/api/groups/${group.id}`, {
    method: "PUT",
    body: JSON.stringify(group),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(updateGroup(data));
  return data;
};

export const deleteGroupThunk = (group) => async (dispatch) => {
  const res = await fetch(`/api/groups/${group.id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  dispatch(deleteGroup(data));
  return data;
};

const initialState = {
  groups: {},
  groupDetail: {},
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GROUPS:
      return action.groups;
    case GET_USER_GROUPS:
      return { ...state, userGroups: action.groups };
    case GET_GROUP_DETAIL:
      return { ...state, groupDetail: action.group };
    case CREATE_GROUP:
      return state
    case UPDATE_GROUP:
      return { ...state, groupDetail: action.group };
    case DELETE_GROUP:
    default:
      return state;
  }
};

export default groupReducer;

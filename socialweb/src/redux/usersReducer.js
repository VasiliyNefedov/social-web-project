const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS;";

let initialState = {
  userList: []
};

const usersReducer = (stateReducer = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...stateReducer,
        userList: stateReducer.userList.map(el => {
          if (el.id === action.userId) {
            return { ...el, followed: true };
          }
          return el;
        })
      };

    case UNFOLLOW:
      return {
        ...stateReducer,
        userList: stateReducer.userList.map(el => {
          if (el.id === action.userId) {
            return { ...el, followed: false };
          }
          return el;
        })
      };
    case SET_USERS:
      return {
        ...stateReducer,
        userList: [...stateReducer.userList, ...action.users]
      };
    default:
      return stateReducer;
  }
};

export const followAC = userId => ({
  type: FOLLOW,
  userId: userId
});

export const unfollowAC = userId => ({
  type: UNFOLLOW,
  userId: userId
});

export const setUsersAC = users => ({
  type: SET_USERS,
  users: users
});

export default usersReducer;

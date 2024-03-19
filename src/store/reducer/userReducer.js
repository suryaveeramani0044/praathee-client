const initialState = {
  loading: false,
  users: [],
};
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADING_ON":
      return { ...state, loading: true };
    case "USER_LOADING_OFF":
      return { ...state, loading: false };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "ADD_USER":
      return { ...state, users: [action.payload, ...state.users] };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case "DEL_USER":
      return {
        ...state,
        users: state.users.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};

const initialState = {
  users: [],
  profile: [],
  balance: 0,
  histories: [] 
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "user/setterUser":
      return {
        ...state,
        products: action.payload,
      };
    case "success/fetchProfile":
      return {
        ...state,
        profile: action.payload,
      };
    case "UPDATE_BALANCE":
      return {
        ...state,
        balance: action.balance,
      };
      case "success/fetchHistory":
        return {
          ...state,
          profile: action.payload,
        };
        case "success/editProfileImage":
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;

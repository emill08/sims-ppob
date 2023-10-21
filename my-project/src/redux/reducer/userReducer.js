const initialState = {
    users: [],
  };
  
  function userReducer(state = initialState, action) {
    switch (action.type) {
      case "user/setterUser":
        return {
          ...state,
          products: action.payload,
        };
      default:
        return state;
      }
  }
  
  export default userReducer;
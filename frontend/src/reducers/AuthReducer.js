const authReducer = (state = { authData: null, loading: false, error: false, updateLoading: false, errorMessage: "" }, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false, errorMessage: "" };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false, errorMessage: "" };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true, errorMessage: action.error };
    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false, errorMessage: "" };
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, updateLoading: false, error: false, errorMessage: "" };
    case "UPDATING_FAIL":
      return { ...state, updateLoading: true, error: true, errorMessage: action.error };
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false, updateLoading: false, errorMessage: "" };
    case "FOLLOW_USER":
      return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following, action.data] } }, errorMessage: "" };
    case "UNFOLLOW_USER":
      return { ...state, authData: { ...state.authData, user: { ...state.authData.user, following: [...state.authData.user.following.filter((personId) => personId !== action.data)] } }, errorMessage: "" };
    default:
      return state;
  }
};

export default authReducer;

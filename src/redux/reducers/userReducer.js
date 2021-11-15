export const initialLoginState = {
  isLoading: true,
  userDetails: null,
  userToken: null,
  loader: false,
};

export const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_INFO':
      return {
        ...prevState,
        userToken: action.token,
        userDetails: action.details,
        isLoading: false,
        loader: true,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userToken: null,
        userDetails: null,
        isLoading: false,
        loader: true,
      };
  }
  return prevState;
};

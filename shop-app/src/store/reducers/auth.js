import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initalState = {
  isAuth: false,
  token: null,
  userId: null,
};

export const authReducer = (state = initalState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      const { userId, token } = action.payload;
      return { isAuth: true, userId, token };
    }
    case LOGOUT:
      return initalState;
    default:
      return state;
  }
};

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => async (dispatch) => {
  dispatch(setLogoutTimer(expiryTime));
  dispatch({
    type: AUTHENTICATE,
    payload: { userId, token },
  });
};

export const signup = (email, password) => async (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  };

  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdOYeS8P6BDhzDrOxnnL4TlZsfA52DmYw",
    options
  );

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = "Something went wrong";

    if (errorId === "EMAIL_EXISTS") message = "Email already existis.";
    else if (errorId === "INVALID_PASSWORD")
      message = "This password is not valid.";

    throw new Error(message);
  }

  const resData = await response.json();

  dispatch(
    authenticate(
      resData.idToken,
      resData.localId,
      parseInt(resData.expiresIn) * 1000
    )
  );
  const expirationData = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000
  );
  saveDataStorage(resData.idToken, resData.localId, expirationData);
};

export const login = (email, password) => async (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  };

  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdOYeS8P6BDhzDrOxnnL4TlZsfA52DmYw",
    options
  );

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = "Something went wrong";

    if (errorId === "EMAIL_NOT_FOUND") message = "Email could not be found.";
    else if (errorId === "INVALID_PASSWORD")
      message = "This password is not valid.";

    throw new Error(message);
  }

  const resData = await response.json();

  dispatch(
    authenticate(
      resData.idToken,
      resData.localId,
      parseInt(resData.expiresIn) * 1000
    )
  );
  const expirationData = new Date(
    new Date().getTime() + parseInt(resData.expiresIn) * 1000
  );
  saveDataStorage(resData.idToken, resData.localId, expirationData);
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("user");

  return {
    type: LOGOUT,
  };
};

const clearLogoutTimer = () => {
  if (timer) clearTimeout(timer);
};

export const setLogoutTimer = (expirationTime) => async (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

const saveDataStorage = async (token, userId, expiryDate) => {
  await AsyncStorage.setItem(
    "user",
    JSON.stringify({ token, userId, expiryDate: expiryDate.toISOString() })
  );
};

import { resetCart } from "./cart";
import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;

    const response = await fetch(
      `https://rn-complete-guide-202fc-default-rtdb.firebaseio.com/orders/${userId}.json`
    );

    if (!response.ok) throw new Error("Something went wrong");

    const resData = await response.json();

    const loadedOrders = Object.keys(resData || {}).map(
      (key) =>
        new Order(
          resData[key].cartItems,
          resData[key].totalAmount,
          key,
          new Date(resData[key].date)
        )
    );

    dispatch({ type: SET_ORDERS, payload: { orders: loadedOrders } });
  } catch (err) {
    //send to custom analytics server
    throw err;
  }
};

export const addOrder = (cartItems, totalAmount) => async (
  dispatch,
  getState
) => {
  const order = {
    cartItems,
    totalAmount,
    date: new Date(),
  };

  const { token, userId } = getState().auth;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...order, date: order.date.toISOString() }),
  };

  const response = await fetch(
    `https://rn-complete-guide-202fc-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
    options
  );

  const responseData = await response.json();

  order.id = responseData.name;

  dispatch({
    type: ADD_ORDER,
    payload: order,
  });
  dispatch(resetCart());
};

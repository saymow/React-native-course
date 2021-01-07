import Order from "../../models/order";
import { ADD_ORDER, SET_ORDERS } from "../actions/order";

const InitalState = {
  orders: [],
};

export const orderReducer = (state = InitalState, action) => {
  switch (action.type) {
    case SET_ORDERS: {
      const { orders } = action.payload;

      return { ...state, orders };
    }
    case ADD_ORDER: {
      const { cartItems, totalAmount, id, date } = action.payload;
      const newOrder = new Order(cartItems, totalAmount, id, date);

      return { ...state, orders: [...state.orders, newOrder] };
    }
    default:
      return state;
  }
};

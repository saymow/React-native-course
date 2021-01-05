import Order from "../../models/order";
import { ADD_ORDER } from "../actions/order";

const InitalState = {
  orders: [],
};

export const orderReducer = (state = InitalState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const { cartItems, totalAmount } = action.payload;
      const newOrder = new Order(cartItems, totalAmount);

      return { ...state, orders: [...state.orders, newOrder] };
    }
    default:
      return state;
  }
};

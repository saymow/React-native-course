import { createStore, combineReducers } from "redux";
import { cartReducer } from "./reducers/cart";
import { orderReducer } from "./reducers/order";
import { productListReducer } from "./reducers/products";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default createStore(rootReducer, composeWithDevTools());

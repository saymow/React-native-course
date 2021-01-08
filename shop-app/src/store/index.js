import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { cartReducer } from "./reducers/cart";
import { orderReducer } from "./reducers/order";
import { productListReducer } from "./reducers/products";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/auth";

const rootReducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

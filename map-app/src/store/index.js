import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import placeListReducer from "./places-reducer";

const rootReducer = combineReducers({
  placeList: placeListReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;

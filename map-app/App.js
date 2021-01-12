import React from "react";
import Navigator from "./src/navigation";
import { Provider } from "react-redux";
import store from "./src/store";
import { init } from "./src/helpers/db";
init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed");
    console.log(err);
  });

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}

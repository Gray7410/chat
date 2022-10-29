import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "./app/store/createStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

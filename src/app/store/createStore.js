import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat";

const rootReducer = combineReducers({
  chat: chatReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

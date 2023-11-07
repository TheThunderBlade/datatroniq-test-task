import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/User.slice";
import fileListReducer from "./reducers/FileList.slice";
import fileReducer from "./reducers/File.slice";

const rootReducer = combineReducers({
  userReducer,
  fileListReducer,
  fileReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

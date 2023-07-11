import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import registerSlice from "../redux/userSlice/registerSlice";
import authSlice from "../redux/userSlice/authSlice";
import postSlice from "./userSlice/postSlice";
import listPosts from "./userSlice/listPosts";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatBoxSlice from "./userSlice/chatBoxSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const reducer = combineReducers({
  chatBox: chatBoxSlice,
  listPosts: listPosts,
  registers: registerSlice,
  auth: authSlice,
  post: postSlice,
});

// const store = configureStore({
//   reducer: {
//     registers: registerSlice,
//     auth: authSlice,
//   },
// });
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default store;

import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/authSlice";
import DlxReducer from "./slices/dlxSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    datadlx: DlxReducer,
  },
});

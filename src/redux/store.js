import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/authSlice";
import DlxReducer from "./slices/dlxSlice";
import HvReducer from "./slices/hvSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    datadlx: DlxReducer,
    hv: HvReducer,
  },
});

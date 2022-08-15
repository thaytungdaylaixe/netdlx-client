import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

moment.locale("vi");

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <LocalizationProvider
      dateLibInstance={moment}
      dateAdapter={AdapterMoment}
      adapterLocale="vi"
    >
      <Provider store={store}>
        <App />
      </Provider>
    </LocalizationProvider>
  </StrictMode>
);
reportWebVitals();

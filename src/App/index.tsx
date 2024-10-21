import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Router from "../Pages";
import i18next from "../i18n/i18n";
import store from "../redux/store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <Router />
        </I18nextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { auth } from "./firebase";
import { browserLocalPersistence, setPersistence } from "@firebase/auth";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

Promise.all([setPersistence(auth, browserLocalPersistence)]).then(() =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  )
);

serviceWorkerRegistration.register();

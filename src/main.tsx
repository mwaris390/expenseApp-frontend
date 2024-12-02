import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import "./utils/axios.interceptor.ts";
import { Provider } from "react-redux";
import { Store } from "./hooks/store.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <>
    <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={{ duration: 5000 }}
    />
    <Provider store={Store}>
      <App />
    </Provider>
  </>
  /* </React.StrictMode> */
);

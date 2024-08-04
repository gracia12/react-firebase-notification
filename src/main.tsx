import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import FirestoreProvider from "./Contexts/FirestoreContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirestoreProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </FirestoreProvider>
  </React.StrictMode>
);

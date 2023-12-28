import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./assets/css/styles.min.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthLayout } from "./components/layout/authLayout";
import { Register } from "./components/auth/register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />} path="/">
      <Route element={<Register />} path="register" />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

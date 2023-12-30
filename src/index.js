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
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />} path="/">
      <Route element={<Register />} path="register" />
      <Route element={<Login />} path="login" />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

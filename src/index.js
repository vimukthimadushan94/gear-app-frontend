import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./assets/css/styles.min.css";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthLayout } from "./components/layout/authLayout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { store } from "./store/store";
import MyProfile from "./components/profile/MyProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />} path="/">
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/" />
      </Route>
      <Route>
        <Route element={<MyProfile />} path="/profile" />
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

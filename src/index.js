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
  // Routes,
} from "react-router-dom";
import { AuthLayout } from "./components/layout/authLayout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { store } from "./store/store";
import MyProfile from "./components/profile/MyProfile";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import CreatePost from "./components/post/CreatePost";
import AddPostMedia from "./components/post/AddPostMedia";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthLayout />} path="/">
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/" />
      </Route>
      <Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<MyProfile />} path="/profile" />
          <Route element={<CreatePost />} path="/post/create" />
          <Route element={<AddPostMedia />} path="/add-media/:postId" />
        </Route>
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

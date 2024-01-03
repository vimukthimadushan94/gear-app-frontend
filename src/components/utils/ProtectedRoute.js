import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../site/Header";
import SideBar from "../site/SideBar";

const ProtectedRoute = ({ children }) => {
  const { userToken } = useSelector((state) => state.auth);

  return userToken ? (
    <>
      <div
        class="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <SideBar />
        <div class="body-wrapper">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;

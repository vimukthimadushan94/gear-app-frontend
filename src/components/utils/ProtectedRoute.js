import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Header } from "../site/Header";
import SideBar from "../site/SideBar";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { userToken, userInfo, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch, userInfo]);

  let isAuthrized = false;
  if (userToken && userInfo) {
    isAuthrized = true;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthrized ? (
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

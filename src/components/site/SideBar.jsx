import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo.png";

export default function SideBar() {
  return (
    <aside class="left-sidebar">
      <div>
        <div class="brand-logo d-flex align-items-center justify-content-between">
          <Link href="./index.html" class="text-nowrap logo-img">
            <img src={logo} width="180" alt="" style={{ width: "45%" }} />
          </Link>
          <div
            class="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"
          >
            <i class="ti ti-x fs-8"></i>
          </div>
        </div>
        <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">Home</span>
            </li>
            <li class="sidebar-item">
              <Link class="sidebar-link" aria-expanded="false">
                <span>
                  <i class="ti ti-layout-dashboard"></i>
                </span>
                <span class="hide-menu">Dashboard</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

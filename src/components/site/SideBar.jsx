import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/logo.png";

export default function SideBar() {
  return (
    <aside className="left-sidebar">
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <Link href="./index.html" className="text-nowrap logo-img">
            <img src={logo} width="180" alt="" style={{ width: "45%" }} />
          </Link>
          <div
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"
          >
            <i className="ti ti-x fs-8"></i>
          </div>
        </div>
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span className="hide-menu">Home</span>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" aria-expanded="false">
                <span>
                  <i className="ti ti-layout-dashboard"></i>
                </span>
                <span className="hide-menu">
                  <Link to={"/post/create"}>Create Post</Link>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

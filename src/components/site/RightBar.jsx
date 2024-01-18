import { Link } from "react-router-dom";

export default function RightBar() {
  return (
    <aside className="right-sidebar col-md-4">
      <div>
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span className="hide-menu">Chat Section</span>
            </li>
            <li className="sidebar-item">
              <Link
                to={"/profile"}
                className="sidebar-link"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-layout-dashboard"></i>
                </span>
                <span className="hide-menu">Profile</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                to={"/post/create"}
                className="sidebar-link"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-layout-dashboard"></i>
                </span>
                <span className="hide-menu">Create Post</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to={"/feed"} className="sidebar-link" aria-expanded="false">
                <span>
                  <i className="ti ti-layout-dashboard"></i>
                </span>
                <span className="hide-menu">Feed</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function Header() {
  const { avatarUrl } = useSelector((state) => state.auth);

  return (
    <header className="app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item d-block d-xl-none">
            <Link className="nav-link sidebartoggler nav-icon-hover">
              <i className="ti ti-menu-2"></i>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link nav-icon-hover" to="{javascript:void(0)}">
              <i className="ti ti-bell-ringing"></i>
              <div className="notification bg-primary rounded-circle"></div>
            </Link>
          </li>
        </ul>
        <div
          className="navbar-collapse justify-content-end px-0"
          id="navbarNav"
        >
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
            <li className="nav-item dropdown">
              <Link
                className="nav-link nav-icon-hover"
                to="{javascript:void(0)}"
                id="drop2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={avatarUrl}
                  alt=""
                  width="35"
                  height="35"
                  className="rounded-circle"
                />
              </Link>
              <div
                className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                aria-labelledby="drop2"
              >
                <div className="message-body">
                  <Link className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-user fs-6"></i>
                    <p className="mb-0 fs-3">My Profile</p>
                  </Link>
                  <Link
                    to="{javascript:void(0)}"
                    className="d-flex align-items-center gap-2 dropdown-item"
                  >
                    <i className="ti ti-mail fs-6"></i>
                    <p className="mb-0 fs-3">My Account</p>
                  </Link>
                  <Link
                    to="{javascript:void(0)}"
                    className="d-flex align-items-center gap-2 dropdown-item"
                  >
                    <i className="ti ti-list-check fs-6"></i>
                    <p className="mb-0 fs-3">My Task</p>
                  </Link>
                  <Link
                    href="./authentication-login.html"
                    className="btn btn-outline-primary mx-3 mt-2 d-block"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

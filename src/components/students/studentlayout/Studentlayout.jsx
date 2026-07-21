import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Studentlayout(){
    const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);
    return(<><div className="admin-shell">
  <div className="sidebar-backdrop" data-sidebar-close="" />
  <aside
    className="admin-sidebar"
    id="adminSidebar"
    aria-label="Main navigation"
  >
    <div className="sidebar-header">
     <Link
        className="brand-mark"
       to="index.html"
        aria-label="adminHMD dashboard"
      >
        <span className="brand-icon">
          <i className="bi bi-grid-1x2-fill" aria-hidden="true" />
        </span>
        <span className="brand-copy">
          <span className="brand-title">HostelDesk</span>
          <span className="brand-subtitle">Student Portal</span>
        </span>
    </Link>
    </div>
    <nav className="sidebar-nav">

    <Link className="nav-link active" to="/student">

        <span className="nav-icon">
            <i className="bi bi-speedometer2"></i>
        </span>

        <span className="nav-text">
            Dashboard
        </span>

    </Link>

    <Link className="nav-link" to="profile">

        <span className="nav-icon">
            <i className="bi bi-person-circle"></i>
        </span>

        <span className="nav-text">
            My Profile
        </span>

    </Link>

    <Link className="nav-link" to="room">

        <span className="nav-icon">
            <i className="bi bi-house-door"></i>
        </span>

        <span className="nav-text">
            My Room
        </span>

    </Link>

    <Link className="nav-link" to="studentcomplaints">

        <span className="nav-icon">
            <i className="bi bi-exclamation-circle"></i>
        </span>

        <span className="nav-text">
            Complaints
        </span>

    </Link>

    <Link className="nav-link" to="fees">

        <span className="nav-icon">
            <i className="bi bi-cash-stack"></i>
        </span>

        <span className="nav-text">
            Fees
        </span>

    </Link>

    <Link className="nav-link" to="leave">

        <span className="nav-icon">
            <i className="bi bi-calendar-check"></i>
        </span>

        <span className="nav-text">
            Leave Requests
        </span>

    </Link>

</nav>
    <div className="sidebar-user">
      <img
        className="avatar-img avatar-md sidebar-user-avatar"
        src="../assets/images/avatar/avatar.jpg"
        alt="Admin Hasan"
      />
     <strong>{currentUser?.name}</strong>
     <small>Student</small>
    </div>
    <div className="sidebar-footer">
      <span className="status-dot" />
      <span className="sidebar-footer-text">System running smoothly</span>
    </div>
  </aside>
  <div className="admin-main">
    <nav className="navbar admin-navbar navbar-expand bg-white">
      <div className="container-fluid px-3 px-lg-4">
        <button
          className="sidebar-toggle"
          type="button"
          data-sidebar-toggle=""
          aria-controls="adminSidebar"
          aria-expanded="true"
          aria-label="Toggle sidebar"
        >
          <span />
          <span />
          <span />
        </button>
        <form className="d-none d-md-flex ms-3 flex-grow-1" role="search">
          <input
            className="form-control search-input"
            type="search"
            placeholder="Search users, orders, reports"
            aria-label="Search"
          />
        </form>
        <div className="navbar-actions ms-auto">
          <button
            className="icon-button theme-toggle"
            type="button"
            data-theme-toggle=""
            aria-label="Switch color theme"
            title="Switch color theme"
          >
            <i
              className="bi bi-moon-stars"
              data-theme-icon=""
              aria-hidden="true"
            />
          </button>
          <div className="dropdown">
            <button
              className="icon-button"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Notifications"
            >
              <span className="notification-dot" />
              <i className="bi bi-bell" aria-hidden="true" />
            </button>
            <div className="dropdown-menu dropdown-menu-end notification-menu">
              <div className="dropdown-header fw-bold text-body">
                Notifications
              </div>
            <Link className="dropdown-item"to="users.html">
                <span className="notification-title">New user registered</span>
                <span className="notification-time">4 minutes ago</span>
            </Link>
            <Link className="dropdown-item"to="charts.html">
                <span className="notification-title">
                  Revenue target reached
                </span>
                <span className="notification-time">32 minutes ago</span>
            </Link>
            <Link className="dropdown-item"to="settings.html">
                <span className="notification-title">
                  Security review completed
                </span>
                <span className="notification-time">1 hour ago</span>
            </Link>
            </div>
          </div>
          <div className="dropdown">
            <button
              className="profile-button dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                className="avatar-img avatar-sm"
                src="../assets/images/avatar/avatar.jpg"
                alt="Admin Hasan"
              />
             <strong>{currentUser?.name}</strong>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
              <Link className="dropdown-item"to="profile.html">
                  Profile
              </Link>
              </li>
              <li>
              <Link className="dropdown-item"to="settings.html">
                  Account settings
              </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
              <Link
    className="dropdown-item"
    to="/"
    onClick={() => {

        localStorage.clear();

    }}
>
    Logout
</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

<Outlet></Outlet>


    
    <footer className="admin-footer">
      <div className="container-fluid px-3 px-lg-4">
        <span>
          Copyright 2026 adminHMD. <br /> Developed by{" "}
          <Link    target="_blank"
            className="fw-bold text-success"
           to="https://github.com/HasanMahmudDev"
          >
            Md. Hasan Mahmud
        </Link>{" "}
          • Distributed by{" "}
          <Link
            target="_blank"
            className="fw-bold text-success"
           to="https://themewagon.com"
          >
            ThemeWagon
        </Link>{" "}
        </span>
        <span>Professional dashboard template.</span>
      </div>
    </footer>
  </div>
</div>
</>)
}
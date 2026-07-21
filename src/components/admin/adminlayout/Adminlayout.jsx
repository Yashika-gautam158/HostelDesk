import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import AuthService from "../../../services/AuthService";

export default function Adminlayout() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const nav = useNavigate();

    useEffect(() => {
        console.log("AdminLayout useEffect running");

        if (!currentUser) {

            toast.error("Please login.");

            nav("/");

            return;

        }

        if (currentUser.userType !== 1) {

            toast.error("Unauthorized");

            nav("/student");

        }

    }, [currentUser, nav]);
    return (

        <>

            <div className="admin-shell">

                <div
                    className="sidebar-backdrop"
                    data-sidebar-close=""
                />

                <aside
                    className="admin-sidebar"
                    id="adminSidebar"
                    aria-label="Main navigation"
                >

                    <div className="sidebar-header">

                        <Link
                            className="brand-mark"
                            to="/admin"
                        >

                            <span className="brand-icon">

                                <i className="bi bi-grid-1x2-fill"></i>

                            </span>

                            <span className="brand-copy">

                                <span className="brand-title">

                                    HostelDesk

                                </span>

                                <span className="brand-subtitle">

                                    Admin Panel

                                </span>

                            </span>

                        </Link>

                    </div>

                    <nav className="sidebar-nav">

                        <Link
                            className="nav-link"
                            to="/admin"
                        >

                            <span className="nav-icon">

                                <i className="bi bi-speedometer2"></i>

                            </span>

                            <span className="nav-text">

                                Dashboard

                            </span>

                        </Link>

                        <Link
                            className="nav-link"
                            to="students"
                        >

                            <span className="nav-icon">

                                <i className="bi bi-people"></i>

                            </span>

                            <span className="nav-text">

                                Students

                            </span>

                        </Link>

                        <Link
                            className="nav-link"
                            to="rooms"
                        >

                            <span className="nav-icon">

                                <i className="bi bi-house-door"></i>

                            </span>

                            <span className="nav-text">

                                Rooms

                            </span>

                        </Link>

                        <Link className="nav-link" to="leaverequests">

    <span className="nav-icon">

        <i className="bi bi-calendar-check"></i>

    </span>

    <span className="nav-text">

        Leave Requests

    </span>

</Link>

                        <Link
                            className="nav-link"
                            to="complaintdisplay"
                        >

                            <span className="nav-icon">

                                <i className="bi bi-exclamation-triangle"></i>

                            </span>

                            <span className="nav-text">

                                Complaints

                            </span>

                        </Link>

                        <Link
                            className="nav-link"
                            to="adminfees"
                        >

                            <span className="nav-icon">

                                <i className="bi bi-cash-stack"></i>

                            </span>

                            <span className="nav-text">

                                Fees

                            </span>

                        </Link>

                        <Link
                            className="nav-link"
                            to="wardenadd"
                        >

                            <span className="nav-icon">

                                <i className="bi bi-person-badge"></i>

                            </span>

                            <span className="nav-text">

                                Wardens

                            </span>

                        </Link>

                    </nav>

                    <div className="sidebar-user">

                        <img
                            className="avatar-img avatar-md sidebar-user-avatar"
                            src="../assets/images/avatar/avatar.jpg"
                            alt="Admin"
                        />

                        <strong>

                            {currentUser?.name || "Admin"}

                        </strong>

                        <small>

                            Administrator

                        </small>

                    </div>

                    <div className="sidebar-footer">

                        <span className="status-dot"></span>

                        <span className="sidebar-footer-text">

                            System running smoothly

                        </span>

                    </div>

                </aside>

                <div className="admin-main">c<nav className="navbar admin-navbar navbar-expand bg-white">

    <div className="container-fluid px-3 px-lg-4">

        <button
            className="sidebar-toggle"
            type="button"
        >

            <span></span>
            <span></span>
            <span></span>

        </button>

        <form
            className="d-none d-md-flex ms-3 flex-grow-1"
        >

            <input
                className="form-control search-input"
                type="search"
                placeholder="Search..."
            />

        </form>

        <div className="navbar-actions ms-auto">

            <button
                className="icon-button"
                type="button"
            >

                <i className="bi bi-bell"></i>

            </button>

            <div className="dropdown">

                <button
                    className="profile-button dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                >

                    <img
                        className="avatar-img avatar-sm"
                        src="../assets/images/avatar/avatar.jpg"
                        alt="Admin"
                    />

                    <span className="profile-name d-none d-sm-inline">

                        {currentUser?.name || "Admin"}

                    </span>

                </button>

                <ul className="dropdown-menu dropdown-menu-end">

                    <li>

                        <Link
                            className="dropdown-item"
                            to="/admin"
                        >

                            Dashboard

                        </Link>

                    </li>

                    <li>

                        <Link
                            className="dropdown-item"
                            to="/admin/studentdisplay"
                        >

                            Students

                        </Link>

                    </li>

                    <li>

                        <hr className="dropdown-divider"/>

                    </li>

                    <li>

                        <Link
                            className="dropdown-item text-danger"
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

<main className="admin-content">

    <Outlet />

</main>
<footer className="admin-footer">

    <div className="container-fluid px-3 px-lg-4 d-flex justify-content-between">

        <span>

            © 2026 HostelDesk

        </span>

        <span>

            Hostel Management System

        </span>

    </div>

</footer>

        </div>

    </div>

    </>

    );

}
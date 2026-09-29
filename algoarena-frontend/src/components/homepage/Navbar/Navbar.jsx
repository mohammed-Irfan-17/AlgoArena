import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navbar.css";

function Navbar() {

    const location = useLocation();

    return (
        <nav className="navbar">

            <div className="navbar-inner">

                {/* Logo */}

                <Link
                    to="/"
                    className="navbar-logo"
                >
                    AlgoArena
                </Link>


                {/* Navigation */}

                <div className="navbar-links">

                    <Link
                        to="/"
                        className={
                            location.pathname === "/"
                                ? "navbar-link active"
                                : "navbar-link"
                        }
                    >
                        Home
                    </Link>

                    <Link
                        to="/problems"
                        className={
                            location.pathname.startsWith("/problems")
                                ? "navbar-link active"
                                : "navbar-link"
                        }
                    >
                        Problems
                    </Link>

                    <Link
                        to="/dashboard"
                        className={
                            location.pathname === "/dashboard"
                                ? "navbar-link active"
                                : "navbar-link"
                        }
                    >
                        Dashboard
                    </Link>

                </div>


                {/* User */}

                <div className="navbar-user">

                    <div className="navbar-avatar">
                        U
                    </div>

                    <span>
                        User
                    </span>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
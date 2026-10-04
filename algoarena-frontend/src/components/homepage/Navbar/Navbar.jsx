import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";


import AuthModal
    from "../../auth/AuthModal/AuthModal";

import "./Navbar.css";


function Navbar() {
    const navigate = useNavigate();

    const location = useLocation();

    const [isAuthOpen, setIsAuthOpen] =
        useState(false);

    const [authUser, setAuthUser] =
        useState(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] =
        useState(false);


    /*
     * ===============================
     * LOAD LOGGED-IN USER
     * ===============================
     */
useEffect(() => {

    const loadAuthUser = () => {

        const savedUser =
            localStorage.getItem("algoarenaUser");

        if (!savedUser) {
            setAuthUser(null);
            return;
        }

        try {

            const user =
                JSON.parse(savedUser);

            if (user && user.userId) {

                setAuthUser(user);

            } else {

                setAuthUser(null);

            }

        } catch (error) {

            console.error(
                "Failed to load saved user:",
                error
            );

            localStorage.removeItem(
                "algoarenaUser"
            );

            setAuthUser(null);
        }
    };


    // Load when Navbar starts
    loadAuthUser();


    // Update Navbar whenever authentication changes
    window.addEventListener(
        "authChanged",
        loadAuthUser
    );


    return () => {

        window.removeEventListener(
            "authChanged",
            loadAuthUser
        );

    };

}, []);


    /*
     * ===============================
     * CLOSE MOBILE MENU
     * ===============================
     */

    useEffect(() => {

        setIsMobileMenuOpen(false);

    }, [location.pathname]);


    /*
     * ===============================
     * LOGIN SUCCESS
     * ===============================
     */

    const handleLoginSuccess = (user) => {

    localStorage.setItem(
        "algoarenaUser",
        JSON.stringify(user)
    );

    setAuthUser(user);

    window.dispatchEvent(
        new Event("authChanged")
    );

    setIsAuthOpen(false);

    setIsMobileMenuOpen(false);
};


    /*
     * ===============================
     * LOGOUT
     * ===============================
     */

    const handleLogout = () => {

        localStorage.removeItem(
            "algoarenaUser"
        );

        setAuthUser(null);

        setIsMobileMenuOpen(false);

        /*
         * Tell other components that
         * authentication changed.
         */
        window.dispatchEvent(
            new Event("authChanged")
        );
    };


    /*
     * ===============================
     * OPEN AUTH
     * ===============================
     */

    const openAuthModal = () => {

        setIsAuthOpen(true);

        setIsMobileMenuOpen(false);
    };


    /*
     * ===============================
     * MOBILE MENU
     * ===============================
     */

    const toggleMobileMenu = () => {

        setIsMobileMenuOpen(
            previous => !previous
        );
    };


    return (
        <>

            {/* =================================
                NAVBAR
            ================================= */}

            <nav className="navbar">

                <div className="navbar-inner">


                    {/* LOGO */}

                    <Link
                        to="/"
                        className="navbar-logo"
                    >
                        AlgoArena
                    </Link>


                    {/* =================================
                        DESKTOP NAVIGATION
                    ================================= */}

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
                                location.pathname.startsWith(
                                    "/problems"
                                )
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
            ? "navbar-link active navbar-dashboard-button"
            : "navbar-link navbar-dashboard-button"
    }
    onClick={(event) => {

        const savedUser =
            localStorage.getItem("algoarenaUser");

        if (savedUser) {

            try {

                const user =
                    JSON.parse(savedUser);

                if (user && user.userId) {
                    return;
                }

            } catch (error) {

                console.error(
                    "Invalid saved user:",
                    error
                );

                localStorage.removeItem(
                    "algoarenaUser"
                );
            }
        }

        // Not logged in → prevent navigation
        event.preventDefault();

        // Open existing AuthModal
        setIsAuthOpen(true);
    }}
>
    Dashboard
</Link>

                    </div>


                    {/* =================================
                        DESKTOP USER AREA
                    ================================= */}

                    <div className="navbar-user">

                        {authUser ? (

                            <>

                                <div className="navbar-avatar">
                                    {authUser.name
                                        ?.charAt(0)
                                        .toUpperCase()}
                                </div>

                                <span>
                                    {authUser.name}
                                </span>

                                <button
                                    className="navbar-logout"
                                    onClick={
                                        handleLogout
                                    }
                                >
                                    Logout
                                </button>

                            </>

                        ) : (

                            <>

                                <button
                                    className="navbar-login"
                                    onClick={
                                        openAuthModal
                                    }
                                >
                                    Login
                                </button>

                                <button
                                    className="navbar-get-started"
                                    onClick={
                                        openAuthModal
                                    }
                                >
                                    Get Started
                                </button>

                            </>

                        )}

                    </div>


                    {/* =================================
                        MOBILE MENU BUTTON
                    ================================= */}

                    <button
                        className={
                            isMobileMenuOpen
                                ? "mobile-menu-button open"
                                : "mobile-menu-button"
                        }
                        onClick={
                            toggleMobileMenu
                        }
                        aria-label="Toggle navigation menu"
                        aria-expanded={
                            isMobileMenuOpen
                        }
                    >

                        <span></span>
                        <span></span>
                        <span></span>

                    </button>

                </div>

            </nav>


            {/* =================================
                MOBILE BACKDROP
            ================================= */}

            {isMobileMenuOpen && (

                <div
                    className="mobile-menu-backdrop"
                    onClick={() =>
                        setIsMobileMenuOpen(false)
                    }
                ></div>

            )}


            {/* =================================
                MOBILE DROPDOWN
            ================================= */}

            <div
                className={
                    isMobileMenuOpen
                        ? "mobile-navigation open"
                        : "mobile-navigation"
                }
            >

                <div className="mobile-navigation-header">

                    <span>
                        Navigation
                    </span>

                    <button
                        onClick={() =>
                            setIsMobileMenuOpen(false)
                        }
                    >
                        ×
                    </button>

                </div>


                <div className="mobile-navigation-links">

                    <Link
                        to="/"
                        className={
                            location.pathname === "/"
                                ? "mobile-nav-link active"
                                : "mobile-nav-link"
                        }
                    >
                        Home
                    </Link>


                    <Link
                        to="/problems"
                        className={
                            location.pathname.startsWith(
                                "/problems"
                            )
                                ? "mobile-nav-link active"
                                : "mobile-nav-link"
                        }
                    >
                        Problems
                    </Link>


                    <Link
                        to="/dashboard"
                        className={
                            location.pathname === "/dashboard"
                                ? "mobile-nav-link active"
                                : "mobile-nav-link"
                        }
                    >
                        Dashboard
                    </Link>

                </div>


                <div className="mobile-navigation-divider"></div>


                {authUser ? (

                    <div className="mobile-user-section">

                        <div className="mobile-user-info">

                            <div className="navbar-avatar">
                                {authUser.name
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>

                                <strong>
                                    {authUser.name}
                                </strong>

                                <small>
                                    {authUser.email}
                                </small>

                            </div>

                        </div>


                        <button
                            className="mobile-logout"
                            onClick={
                                handleLogout
                            }
                        >
                            Logout
                        </button>

                    </div>

                ) : (

                    <div className="mobile-auth-section">

                        <button
                            className="mobile-login"
                            onClick={
                                openAuthModal
                            }
                        >
                            Login
                        </button>


                        <button
                            className="mobile-get-started"
                            onClick={
                                openAuthModal
                            }
                        >
                            Get Started
                        </button>

                    </div>

                )}

            </div>


            {/* =================================
                AUTH MODAL
            ================================= */}

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() =>
                    setIsAuthOpen(false)
                }
                onLoginSuccess={
                    handleLoginSuccess
                }
            />

        </>
    );
}


export default Navbar;
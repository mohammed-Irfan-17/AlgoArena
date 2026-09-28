import { useState } from "react";
import "./Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(null);

    const openTab = (tab) => {
        setActiveTab(tab);
        setMenuOpen(false);
    };

    const closeTab = () => {
        setActiveTab(null);
    };

    return (
        <>
            <header className="navbar">
                <div className="navbar-container">

                    {/* Logo / Brand */}
                    <div className="navbar-brand">
                        <div className="navbar-logo-placeholder">
                            AA
                        </div>

                        <span className="navbar-title">
                            AlgoArena
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="navbar-links">

                        <button
                            className="navbar-link active"
                            onClick={() => openTab("home")}
                        >
                            Home
                        </button>

                        <button
                            className="navbar-link"
                            onClick={() => openTab("problems")}
                        >
                            Problems
                        </button>

                        <button
                            className="navbar-link"
                            onClick={() => openTab("dashboard")}
                        >
                            Dashboard
                        </button>

                    </nav>

                    {/* Desktop Actions */}
                    <div className="navbar-actions">

                        <button
                            className="navbar-login"
                            onClick={() => openTab("login")}
                        >
                            Login
                        </button>

                        <button
                            className="navbar-signup"
                            onClick={() => openTab("signup")}
                        >
                            Get Started
                        </button>

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`mobile-menu-button ${
                            menuOpen ? "open" : ""
                        }`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="mobile-menu">

                        <button
                            className="mobile-menu-link active"
                            onClick={() => openTab("home")}
                        >
                            Home
                        </button>

                        <button
                            className="mobile-menu-link"
                            onClick={() => openTab("problems")}
                        >
                            Problems
                        </button>

                        <button
                            className="mobile-menu-link"
                            onClick={() => openTab("dashboard")}
                        >
                            Dashboard
                        </button>

                        <button
                            className="mobile-login-button"
                            onClick={() => openTab("login")}
                        >
                            Login
                        </button>

                        <button
                            className="mobile-signup-button"
                            onClick={() => openTab("signup")}
                        >
                            Get Started
                        </button>

                    </div>
                )}
            </header>

            {/* Overlay */}
            {activeTab && activeTab !== "home" && (
                <div className="tab-overlay">

                    <div
                        className="tab-backdrop"
                        onClick={closeTab}
                    ></div>

                    <div className="tab-panel">

                        <div className="tab-panel-header">
                            <h2>
                                {activeTab === "problems" && "Problems"}

                                {activeTab === "dashboard" && "Dashboard"}

                                {activeTab === "login" && "Login"}

                                {activeTab === "signup" && "Get Started"}
                            </h2>

                            <button
                                className="tab-close-button"
                                onClick={closeTab}
                            >
                                ×
                            </button>
                        </div>

                        <div className="tab-panel-content">

                            {activeTab === "problems" && (
                                <>
                                    <p className="tab-label">
                                        ALGOARENA
                                    </p>

                                    <h3>
                                        Problems
                                    </h3>

                                    <p>
                                        Your coding problems will appear
                                        here.
                                    </p>
                                </>
                            )}

                            {activeTab === "dashboard" && (
                                <>
                                    <p className="tab-label">
                                        YOUR PROGRESS
                                    </p>

                                    <h3>
                                        Dashboard
                                    </h3>

                                    <p>
                                        Your learning progress and
                                        recommendations will appear here.
                                    </p>
                                </>
                            )}

                            {activeTab === "login" && (
                                <>
                                    <p className="tab-label">
                                        WELCOME BACK
                                    </p>

                                    <h3>
                                        Login
                                    </h3>

                                    <p>
                                        Login interface will be built here.
                                    </p>
                                </>
                            )}

                            {activeTab === "signup" && (
                                <>
                                    <p className="tab-label">
                                        JOIN ALGOARENA
                                    </p>

                                    <h3>
                                        Get Started
                                    </h3>

                                    <p>
                                        Registration interface will be
                                        built here.
                                    </p>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
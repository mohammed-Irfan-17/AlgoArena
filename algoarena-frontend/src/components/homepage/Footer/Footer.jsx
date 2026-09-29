import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-main">

                    <div className="footer-brand">

                        <div className="footer-logo-placeholder">
                            AA
                        </div>

                        <div>
                            <h3>
                                AlgoArena
                            </h3>

                            <p>
                                Practice. Understand. Improve.
                            </p>
                        </div>

                    </div>

                    <p className="footer-description">
                        A learning-focused coding platform that helps
                        students go beyond accepted solutions and
                        understand the concepts behind their code.
                    </p>

                </div>

                <div className="footer-links">

                    <div className="footer-column">
                        <h4>
                            Platform
                        </h4>

                         <Link to="/problems">
                         <button >problems</button>
                         </Link>

                        <button>
                            Dashboard
                        </button>

                        <button>
                            Progress
                        </button>
                    </div>

                    <div className="footer-column">
                        <h4>
                            Learn
                        </h4>

                        <button>
                            Concepts
                        </button>

                        <button>
                            Recommendations
                        </button>

                        <button>
                            Practice
                        </button>
                    </div>

                    <div className="footer-column">
                        <h4>
                            Account
                        </h4>

                        <button>
                            Login
                        </button>

                        <button>
                            Get Started
                        </button>
                    </div>

                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © 2026 AlgoArena. Built for better learning.
                </p>

                <span>
                    Code • Understand • Improve
                </span>

            </div>

        </footer>
    );
}

export default Footer;
import "./CallToAction.css";
import { Link } from "react-router-dom";

function CallToAction() {
    return (
        <section className="call-to-action">
            <div className="cta-container">

                <div className="cta-content">

                    <span className="section-label">
                        START YOUR JOURNEY
                    </span>

                    <h2>
                        Ready to become a
                        <span> better problem solver?</span>
                    </h2>

                    <p>
                        Solve coding problems, understand the concepts
                        behind them, and keep improving with AlgoArena.
                    </p>

                    <div className="cta-actions">

                        
                         <Link
        to="/problems"
        className="cta-primary"
    >
        Explore Problems
        <span>→</span>
    </Link>

                        <button className="cta-secondary">
                            View Dashboard
                        </button>

                    </div>

                </div>

                <div className="cta-decoration">
                    <div className="cta-circle circle-one"></div>
                    <div className="cta-circle circle-two"></div>
                    <div className="cta-glow"></div>
                </div>

            </div>
        </section>
    );
}

export default CallToAction;
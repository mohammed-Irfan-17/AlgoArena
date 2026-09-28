import "./HeroSection.css";

function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-container">

                <div className="hero-content">

                    <span className="hero-label">
                        LEARN · SOLVE · UNDERSTAND
                    </span>

                    <h1 className="hero-title">
                        Master problem solving,
                        <span> not just problem solving.</span>
                    </h1>

                    <p className="hero-description">
                        AlgoArena helps you solve coding problems, understand
                        the concepts behind your solutions, and improve where
                        you need it most.
                    </p>

                    <div className="hero-actions">
                        <button className="hero-primary-button">
                            Explore Problems
                            <span>→</span>
                        </button>

                        <button className="hero-secondary-button">
                            View Dashboard
                        </button>
                    </div>

                    <div className="hero-stats">

                        <div className="hero-stat">
                            <strong>Practice</strong>
                            <span>Real coding problems</span>
                        </div>

                        <div className="hero-stat-divider"></div>

                        <div className="hero-stat">
                            <strong>Understand</strong>
                            <span>Concept-based learning</span>
                        </div>

                        <div className="hero-stat-divider"></div>

                        <div className="hero-stat">
                            <strong>Improve</strong>
                            <span>Personal recommendations</span>
                        </div>

                    </div>

                </div>

                <div className="hero-visual">

                    <div className="hero-card">

                        <div className="hero-card-header">
                            <span>Your Learning</span>
                            <span className="hero-card-status">
                                ● Active
                            </span>
                        </div>

                        <div className="hero-card-title">
                            Concept Progress
                        </div>

                        <div className="progress-item">
                            <div className="progress-info">
                                <span>Arrays</span>
                                <span>82%</span>
                            </div>

                            <div className="progress-track">
                                <div
                                    className="progress-fill"
                                    style={{ width: "82%" }}
                                ></div>
                            </div>
                        </div>

                        <div className="progress-item">
                            <div className="progress-info">
                                <span>Binary Search</span>
                                <span>61%</span>
                            </div>

                            <div className="progress-track">
                                <div
                                    className="progress-fill"
                                    style={{ width: "61%" }}
                                ></div>
                            </div>
                        </div>

                        <div className="progress-item">
                            <div className="progress-info">
                                <span>Hash Map</span>
                                <span>43%</span>
                            </div>

                            <div className="progress-track">
                                <div
                                    className="progress-fill weak"
                                    style={{ width: "43%" }}
                                ></div>
                            </div>
                        </div>

                        <div className="hero-recommendation">
                            <span className="recommendation-label">
                                RECOMMENDED
                            </span>

                            <strong>
                                Strengthen Hash Map concepts
                            </strong>

                            <span>
                                3 problems selected for you →
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default HeroSection;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLoggedInUserId } from "../../../services/authUtils";
import "./HeroSection.css";

const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080";

function HeroSection() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const loadLearningProgress = async () => {
            const userId = getLoggedInUserId();

            if (!userId) {
                setDashboard(null);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `${API_URL}/api/dashboard/user/${userId}`
                );

                if (!response.ok) {
                    throw new Error("Failed to load learning progress.");
                }

                const data = await response.json();

                if (!cancelled) {
                    setDashboard(data);
                    setLoadError(false);
                }
            } catch (error) {
                console.error("Home learning progress error:", error);

                if (!cancelled) {
                    setDashboard(null);
                    setLoadError(true);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadLearningProgress();

        const handleDashboardUpdate = () => {
            loadLearningProgress();
        };

        window.addEventListener(
            "dashboardUpdated",
            handleDashboardUpdate
        );

        return () => {
            cancelled = true;
            window.removeEventListener(
                "dashboardUpdated",
                handleDashboardUpdate
            );
        };
    }, []);

    const progress = Array.isArray(dashboard?.progress)
        ? dashboard.progress
        : [];

    const recommendations = Array.isArray(dashboard?.recommendations)
        ? dashboard.recommendations
        : [];

    // Display the three concepts with the lowest completion percentages.
    const weakestConcepts = [...progress]
        .sort(
            (a, b) =>
                (Number(a.percentage) || 0) -
                (Number(b.percentage) || 0)
        )
        .slice(0, 3);

    // Select the concept with the lowest progress that has recommendations.
    const recommendedGroup = [...recommendations]
        .filter(
            (group) =>
                Array.isArray(group.problems) &&
                group.problems.length > 0
        )
        .sort((a, b) => {
            const percentageA =
                progress.find(
                    (item) => item.concept === a.concept
                )?.percentage ?? 100;

            const percentageB =
                progress.find(
                    (item) => item.concept === b.concept
                )?.percentage ?? 100;

            return percentageA - percentageB;
        })[0];

    const hasProgress = weakestConcepts.length > 0;

    return (
        <section className="hero-section">
            <div className="hero-container">
                <div className="hero-content">
                    <span className="hero-label">
                        LEARN · SOLVE · UNDERSTAND
                    </span>

                    <h1 className="hero-title">
                        Don't just code it,
                        <span> explain it.</span>
                    </h1>

                    <p className="hero-description">
                        AlgoArena helps you solve coding problems,
                        understand the concepts behind your solutions,
                        and improve where you need it most.
                    </p>

                    <div className="hero-actions">
                        <Link
                            to="/problems"
                            className="hero-primary-button"
                        >
                            Explore Problems <span>→</span>
                        </Link>

                        {/* <Link
                            to="/dashboard"
                            className="hero-secondary-button"
                        >
                            View Dashboard
                        </Link> */}
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <strong>Practice</strong>
                            <span>Real coding problems</span>
                        </div>

                        <div className="hero-stat-divider" />

                        <div className="hero-stat">
                            <strong>Understand</strong>
                            <span>Concept-based learning</span>
                        </div>

                        <div className="hero-stat-divider" />

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
                                ● {loading ? "Loading" : hasProgress
                                    ? "Personalized"
                                    : "Ready to learn"}
                            </span>
                        </div>

                        <div className="hero-card-title">
                            Concept Progress
                        </div>

                        {loading ? (
                            <p className="hero-progress-message">
                                Loading your learning progress...
                            </p>
                        ) : loadError ? (
                            <p className="hero-progress-message">
                                Your progress is temporarily unavailable.
                                Visit your dashboard to try again.
                            </p>
                        ) : hasProgress ? (
                            weakestConcepts.map((item, index) => {
                                const percentage = Math.max(
                                    0,
                                    Math.min(
                                        100,
                                        Number(item.percentage) || 0
                                    )
                                );

                                return (
                                    <div
                                        className="progress-item"
                                        key={`${item.concept}-${index}`}
                                    >
                                        <div className="progress-info">
                                            <span>{item.concept}</span>
                                            <span>
                                                {Math.round(percentage)}%
                                            </span>
                                        </div>

                                        <div className="progress-track">
                                            <div
                                                className={`progress-fill ${
                                                    percentage < 50
                                                        ? "weak"
                                                        : ""
                                                }`}
                                                style={{
                                                    width: `${percentage}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="hero-progress-message">
                                <p>
                                    Your learning journey starts here.
                                </p>
                                <p>
                                    Solve your first problem to see
                                    personalized concept progress.
                                </p>
                            </div>
                        )}

                        <div className="hero-recommendation">
                            <span className="recommendation-label">
                                RECOMMENDED
                            </span>

                            {recommendedGroup ? (
                                <>
                                    <strong>
                                        Strengthen{" "}
                                        {recommendedGroup.concept} concepts
                                    </strong>

                                    <span>
                                        {recommendedGroup.problems.length}{" "}
                                        {recommendedGroup.problems.length === 1
                                            ? "problem"
                                            : "problems"}{" "}
                                        selected for you →
                                    </span>
                                </>
                            ) : (
                                <>
                                    <strong>
                                        {loading
                                            ? "Finding your next step..."
                                            : hasProgress
                                            ? "Keep building your skills"
                                            : "Start your first challenge"}
                                    </strong>

                                    <span>
                                        {hasProgress
                                            ? "Explore problems to keep improving →"
                                            : "Discover problems tailored to your journey →"}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;

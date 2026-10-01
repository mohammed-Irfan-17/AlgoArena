
import React, { useEffect, useState } from "react";

import Navbar from "../../components/homepage/Navbar/Navbar";
import Footer from "../../components/homepage/Footer/Footer";

import "./Dashboard.css";

const API_URL = "http://localhost:8080";

function Dashboard() {

    const userId = 1;

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/dashboard/user/${userId}`
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to load dashboard."
                );
            }

            const data = await response.json();

            setDashboard(data);

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load your dashboard."
            );

        } finally {

            setLoading(false);

        }
    }


    if (loading) {

        return (
            <div className="dashboard-state-page">

                <div className="dashboard-state-card">

                    <div className="dashboard-spinner"></div>

                    <h2>
                        Preparing your dashboard
                    </h2>

                    <p>
                        Loading your learning progress...
                    </p>

                </div>

            </div>
        );
    }


    if (error) {

        return (
            <>
                <Navbar />

                <div className="dashboard-state-page">

                    <div className="dashboard-state-card dashboard-error-card">

                        <div className="dashboard-error-icon">
                            !
                        </div>

                        <h2>
                            Unable to load dashboard
                        </h2>

                        <p>
                            {error}
                        </p>

                        <button
                            onClick={loadDashboard}
                            className="dashboard-retry-button"
                        >
                            Try Again
                        </button>

                    </div>

                </div>

                <Footer />
            </>
        );
    }


    const progress =
        dashboard?.progress || [];

    const conceptStatuses =
        dashboard?.conceptStatuses || [];

    const recommendations =
        dashboard?.recommendations || [];


    const goodCount =
        conceptStatuses.filter(
            item =>
                item.status?.toUpperCase() === "GOOD"
        ).length;

    const partialCount =
        conceptStatuses.filter(
            item =>
                item.status?.toUpperCase() === "PARTIAL"
        ).length;

    const weakCount =
        conceptStatuses.filter(
            item =>
                ["WEAK", "POOR", "NEEDS WORK"]
                    .includes(
                        item.status?.toUpperCase()
                    )
        ).length;


    const totalConcepts =
        conceptStatuses.length;


    return (
        <div className="dashboard-page">

            <Navbar />


            <main className="dashboard-container">

                {/* ================= HEADER ================= */}

                <header className="dashboard-header">

                    <div>

                        <span className="dashboard-label">
                            LEARNING DASHBOARD
                        </span>

                        <h1>
                            Your Learning Progress
                        </h1>

                        <p>
                            Track your understanding
                            across the concepts you have practiced.
                        </p>

                    </div>

                    <div className="dashboard-header-badge">
                        <span></span>
                        LIVE PROGRESS
                    </div>

                </header>


                {/* ================= OVERVIEW ================= */}

                <section className="dashboard-overview">

                    <div className="overview-card">

                        <div className="overview-icon">
                            ✓
                        </div>

                        <div>

                            <span>
                                GOOD
                            </span>

                            <strong>
                                {goodCount}
                            </strong>

                            <small>
                                Strong understanding
                            </small>

                        </div>

                    </div>


                    <div className="overview-card">

                        <div className="overview-icon partial-icon">
                            ~
                        </div>

                        <div>

                            <span>
                                PARTIAL
                            </span>

                            <strong>
                                {partialCount}
                            </strong>

                            <small>
                                Could be improved
                            </small>

                        </div>

                    </div>


                    <div className="overview-card">

                        <div className="overview-icon weak-icon">
                            !
                        </div>

                        <div>

                            <span>
                                NEEDS WORK
                            </span>

                            <strong>
                                {weakCount}
                            </strong>

                            <small>
                                Needs more practice
                            </small>

                        </div>

                    </div>


                    <div className="overview-card">

                        <div className="overview-icon evaluated-icon">
                            #
                        </div>

                        <div>

                            <span>
                                CONCEPTS
                            </span>

                            <strong>
                                {totalConcepts}
                            </strong>

                            <small>
                                Concepts evaluated
                            </small>

                        </div>

                    </div>

                </section>


                {/* ================= CONCEPT STATUS ================= */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <span>
                                UNDERSTANDING
                            </span>

                            <h2>
                                Concept Status
                            </h2>

                            <p>
                                Your current understanding
                                of the concepts you have practiced.
                            </p>

                        </div>

                        <div className="section-heading-icon">
                            ◈
                        </div>

                    </div>


                    {conceptStatuses.length === 0 ? (

                        <div className="dashboard-empty">
                            No concept evaluations available yet.
                        </div>

                    ) : (

                        <div className="concept-status-grid">

                            {conceptStatuses.map(
                                (item, index) => {

                                    const status =
                                        item.status
                                            ?.toUpperCase();

                                    let statusClass =
                                        "status-partial";

                                    if (
                                        status === "GOOD"
                                    ) {
                                        statusClass =
                                            "status-good";
                                    }

                                    if (
                                        status === "WEAK" ||
                                        status === "POOR" ||
                                        status === "NEEDS WORK"
                                    ) {
                                        statusClass =
                                            "status-weak";
                                    }

                                    return (
                                        <div
                                            className="concept-status-card"
                                            key={
                                                `${item.concept}-${index}`
                                            }
                                        >

                                            <div className="concept-status-top">

                                                <div className="concept-status-number">
                                                    {String(
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </div>

                                                <span
                                                    className={
                                                        `concept-status-badge ${statusClass}`
                                                    }
                                                >
                                                    {item.status}
                                                </span>

                                            </div>


                                            <h3>
                                                {item.concept}
                                            </h3>


                                            <div className="concept-status-line">

                                                <span>
                                                    Current understanding
                                                </span>

                                                <strong>
                                                    {item.status}
                                                </strong>

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    )}

                </section>


                {/* ================= PROGRESS ================= */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <span>
                                LEARNING TRAJECTORY
                            </span>

                            <h2>
                                Your Progress
                            </h2>

                            <p>
                                How your understanding is developing
                                across different concepts.
                            </p>

                        </div>

                        <div className="section-heading-icon">
                            ↗
                        </div>

                    </div>


                    {progress.length === 0 ? (

                        <div className="dashboard-empty">
                            No progress data available yet.
                        </div>

                    ) : (

                        <div className="progress-list">

                            {progress.map(
                                (item, index) => (

                                    <div
                                        className="progress-item"
                                        key={
                                            `${item.concept}-${index}`
                                        }
                                    >

                                        <div className="progress-item-info">

                                            <div>

                                                <strong>
                                                    {item.concept}
                                                </strong>

                                                <span>
                                                    {item.status}
                                                </span>

                                            </div>

                                            <b>
                                                {item.status}
                                            </b>

                                        </div>


                                        <div className="progress-track">

                                            <div
                                                className={
                                                    `progress-fill ${
                                                        item.status
                                                            ?.toUpperCase() === "GOOD"
                                                            ? "progress-good"
                                                            : item.status
                                                                ?.toUpperCase() === "WEAK"
                                                                ? "progress-weak"
                                                                : "progress-partial"
                                                    }`
                                                }
                                                style={{
                                                    width:
                                                        item.status
                                                            ?.toUpperCase() === "GOOD"
                                                            ? "100%"
                                                            : item.status
                                                                ?.toUpperCase() === "PARTIAL"
                                                                ? "65%"
                                                                : "35%"
                                                }}
                                            />

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* ================= RECOMMENDATIONS ================= */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <div>

                            <span>
                                PRACTICE
                            </span>

                            <h2>
                                Recommended Problems
                            </h2>

                            <p>
                                Problems grouped around concepts
                                that need more practice.
                            </p>

                        </div>

                        <div className="section-heading-icon">
                            →
                        </div>

                    </div>


                    {recommendations.length === 0 ? (

                        <div className="dashboard-empty">

                            <div className="empty-icon">
                                ✓
                            </div>

                            <h3>
                                You're doing well
                            </h3>

                            <p>
                                No additional practice recommendations
                                are available right now.
                            </p>

                        </div>

                    ) : (

                        <div className="recommendation-groups">

                            {recommendations.map(
                                (group, index) => (

                                    <div
                                        className="recommendation-group"
                                        key={
                                            `${group.concept}-${index}`
                                        }
                                    >

                                        <div className="recommendation-group-header">

                                            <div>

                                                <span>
                                                    CONCEPT
                                                </span>

                                                <h3>
                                                    {group.concept}
                                                </h3>

                                            </div>

                                            <span className="recommendation-count">
                                                {group.problems?.length || 0}
                                                {" "}
                                                problems
                                            </span>

                                        </div>


                                        <div className="recommendation-problems">

                                            {(group.problems || [])
                                                .map(
                                                    (
                                                        problem,
                                                        problemIndex
                                                    ) => (

                                                        <div
                                                            className="recommendation-problem"
                                                            key={
                                                                problem.id ||
                                                                problemIndex
                                                            }
                                                            onClick={() =>
                                                                window.location.href =
                                                                    `/problems/${problem.id}`
                                                            }
                                                        >

                                                            <div className="recommendation-problem-number">
                                                                {String(
                                                                    problemIndex + 1
                                                                ).padStart(
                                                                    2,
                                                                    "0"
                                                                )}
                                                            </div>


                                                            <div className="recommendation-problem-content">

                                                                <strong>
                                                                    {problem.title}
                                                                </strong>

                                                                <p>
                                                                    {problem.description}
                                                                </p>

                                                            </div>


                                                            <div className="recommendation-arrow">
                                                                →
                                                            </div>

                                                        </div>

                                                    )
                                                )}

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>


                {/* ================= NEXT STEP ================= */}

                <section className="dashboard-next-step">

                    <div>

                        <span>
                            NEXT STEP
                        </span>

                        <h2>
                            Keep building your understanding.
                        </h2>

                        <p>
                            Solve problems, complete understanding
                            checks, and use your feedback to
                            strengthen weaker concepts.
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            window.location.href =
                                "/problems"
                        }
                    >
                        Explore Problems
                        <span>→</span>
                    </button>

                </section>

            </main>


            <Footer />

        </div>
    );
}

export default Dashboard;


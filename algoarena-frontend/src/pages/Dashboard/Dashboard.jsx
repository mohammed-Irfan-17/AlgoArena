import React from "react";

import "./Dashboard.css";
import Navbar from "../../components/homepage/Navbar/Navbar";
import Footer from "../../components/homepage/Footer/Footer";

function Dashboard() {

    const stats = [
        {
            title: "Problems Solved",
            value: "12",
            subtitle: "Keep building momentum"
        },
        {
            title: "Quizzes Completed",
            value: "8",
            subtitle: "Understanding checks"
        },
        {
            title: "Concepts Learned",
            value: "6",
            subtitle: "Across different topics"
        },
        {
            title: "Current Streak",
            value: "4",
            subtitle: "Days of learning"
        }
    ];


    const concepts = [
        {
            name: "Arrays",
            status: "Strong",
            progress: 85
        },
        {
            name: "HashMap",
            status: "Good",
            progress: 72
        },
        {
            name: "Stack",
            status: "Improving",
            progress: 64
        },
        {
            name: "Linked List",
            status: "Needs Practice",
            progress: 42
        }
    ];


    const recentActivity = [
        {
            title: "Valid Parentheses",
            type: "Problem Solved",
            time: "Today"
        },
        {
            title: "Stack Understanding Quiz",
            type: "Quiz Completed",
            time: "Today"
        },
        {
            title: "Two Sum",
            type: "Problem Solved",
            time: "Yesterday"
        },
        {
            title: "HashMap Understanding Quiz",
            type: "Quiz Completed",
            time: "Yesterday"
        }
    ];


    return (
        <div className="dashboard-page">
            <Navbar/>

            <div className="dashboard-container">

                {/* Header */}

                <header className="dashboard-header">

                    <div>

                        <span className="dashboard-label">
                            LEARNING DASHBOARD
                        </span>

                        <h1>
                            Welcome back 👋
                        </h1>

                        <p>
                            Track your problem-solving progress
                            and understanding.
                        </p>

                    </div>

                    <div className="dashboard-date">
                        Keep learning. Keep improving.
                    </div>

                </header>


                {/* Stats */}

                <section className="dashboard-stats">

                    {stats.map((stat) => (

                        <div
                            className="dashboard-stat-card"
                            key={stat.title}
                        >

                            <span className="stat-title">
                                {stat.title}
                            </span>

                            <strong className="stat-value">
                                {stat.value}
                            </strong>

                            <span className="stat-subtitle">
                                {stat.subtitle}
                            </span>

                        </div>

                    ))}

                </section>


                {/* Main Grid */}

                <div className="dashboard-grid">

                    {/* Concept Progress */}

                    <section className="dashboard-card">

                        <div className="dashboard-card-header">

                            <div>

                                <h2>
                                    Concept Progress
                                </h2>

                                <p>
                                    Your current understanding
                                </p>

                            </div>

                            <span className="dashboard-card-icon">
                                ◈
                            </span>

                        </div>


                        <div className="concept-list">

                            {concepts.map((concept) => (

                                <div
                                    className="concept-item"
                                    key={concept.name}
                                >

                                    <div className="concept-info">

                                        <div>

                                            <strong>
                                                {concept.name}
                                            </strong>

                                            <span>
                                                {concept.status}
                                            </span>

                                        </div>

                                        <b>
                                            {concept.progress}%
                                        </b>

                                    </div>


                                    <div className="progress-track">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width:
                                                    `${concept.progress}%`
                                            }}
                                        />

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>


                    {/* Recent Activity */}

                    <section className="dashboard-card">

                        <div className="dashboard-card-header">

                            <div>

                                <h2>
                                    Recent Activity
                                </h2>

                                <p>
                                    Your latest learning activity
                                </p>

                            </div>

                            <span className="dashboard-card-icon">
                                ↗
                            </span>

                        </div>


                        <div className="activity-list">

                            {recentActivity.map(
                                (activity, index) => (

                                    <div
                                        className="activity-item"
                                        key={index}
                                    >

                                        <div className="activity-icon">
                                            ✓
                                        </div>

                                        <div className="activity-content">

                                            <strong>
                                                {activity.title}
                                            </strong>

                                            <span>
                                                {activity.type}
                                            </span>

                                        </div>

                                        <time>
                                            {activity.time}
                                        </time>

                                    </div>

                                )
                            )}

                        </div>

                    </section>

                </div>


                {/* Bottom Section */}

                <section className="dashboard-bottom">

                    <div className="dashboard-learning-card">

                        <div>

                            <span className="dashboard-label">
                                NEXT STEP
                            </span>

                            <h2>
                                Continue practicing
                            </h2>

                            <p>
                                Strengthen your weaker concepts
                                by solving more problems and
                                completing understanding checks.
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

                    </div>

                </section>

            </div>
            <Footer/>

        </div>
        
    );
}

export default Dashboard;
import React from "react";

import "./DashboardHeader.css";

function DashboardHeader() {
    return (
        <header className="dashboard-header">

            <div className="dashboard-header-content">

                <span className="dashboard-header-label">
                    LEARN · SOLVE · UNDERSTAND
                </span>

                <h1>
                    Your Learning Progress
                </h1>

                <p>
                    Track the problems you solve, understand
                    your progress across concepts, and discover
                    where you can improve next.
                </p>

            </div>

            <div className="dashboard-live-badge">
                <span className="dashboard-live-dot"></span>
                LIVE PROGRESS
            </div>

        </header>
    );
}

export default DashboardHeader;
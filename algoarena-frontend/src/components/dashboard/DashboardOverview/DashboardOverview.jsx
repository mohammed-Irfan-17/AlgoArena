
import React from "react";

import "./DashboardOverview.css";

function DashboardOverview({
    solvedQuestions = 0,
    totalQuestions = 0,
    overallPercentage = 0
}) {

    return (
        <section className="dashboard-overview-section">

            <div className="dashboard-section-heading">

                <div>

                    <span>
                        OVERVIEW
                    </span>

                    <h2>
                        Your Progress
                    </h2>

                    <p>
                        A quick look at the coding problems
                        you have completed so far.
                    </p>

                </div>

                <div className="dashboard-section-symbol">
                    ↗
                </div>

            </div>


            <div className="dashboard-overview-card">

                <div className="overview-main">

                    <div className="overview-number">

                        <strong>
                            {solvedQuestions}
                        </strong>

                        <span>
                            / {totalQuestions}
                        </span>

                    </div>


                    <span className="overview-label">
                        QUESTIONS SOLVED
                    </span>


                    <p>
                        Keep solving problems to build your
                        understanding across more concepts.
                    </p>

                </div>


                <div className="overview-progress-area">

                    <div className="overview-percentage">
                        {Math.round(overallPercentage)}%
                    </div>


                    <div className="overview-progress-track">

                        <div
                            className="overview-progress-fill"
                            style={{
                                width:
                                    `${Math.min(
                                        overallPercentage,
                                        100
                                    )}%`
                            }}
                        />

                    </div>


                    <span>
                        Overall problem completion
                    </span>

                </div>

            </div>

        </section>
    );
}

export default DashboardOverview;


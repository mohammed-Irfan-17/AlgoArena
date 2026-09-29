import React from "react";

function ProgressSection({ progress }) {

    if (!progress || progress.length === 0) {

        return null;
    }


    function getStatusClass(status) {

        if (
            status === "GOOD" ||
            status === "IMPROVING"
        ) {
            return "status-good";
        }

        if (
            status === "PARTIAL" ||
            status === "STABLE"
        ) {
            return "status-partial";
        }

        if (
            status === "WEAK" ||
            status === "DECLINING"
        ) {
            return "status-poor";
        }

        return "status-neutral";
    }


    return (
        <section className="feedback-section">

            <div className="feedback-section-header">

                <div className="feedback-section-icon">
                    ↗
                </div>

                <div>

                    <span>
                        LEARNING TRAJECTORY
                    </span>

                    <h2>
                        Your Progress
                    </h2>

                </div>

            </div>


            <div className="progress-list">

                {progress.map((item, index) => (

                    <div
                        className="progress-item"
                        key={index}
                    >

                        <div className="progress-item-main">

                            <div>

                                <h3>
                                    {item.concept}
                                </h3>

                                <span>
                                    {item.evaluationCount}
                                    {" "}
                                    evaluation
                                    {item.evaluationCount !== 1
                                        ? "s"
                                        : ""}
                                </span>

                            </div>


                            <div className="progress-statuses">

                                <span
                                    className={
                                        `progress-status ${getStatusClass(
                                            item.currentStatus
                                        )}`
                                    }
                                >
                                    {item.currentStatus}
                                </span>

                                <span
                                    className={
                                        `progress-status ${getStatusClass(
                                            item.trend
                                        )}`
                                    }
                                >
                                    {item.trend}
                                </span>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default ProgressSection;
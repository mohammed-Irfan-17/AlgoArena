import React from "react";

function FeedbackLevelCard({
    level,
    title,
    description
}) {

    const normalizedLevel =
        level?.toUpperCase() || "UNKNOWN";

    return (
        <section className="feedback-level-card">

            <div className="feedback-level-header">

                <span className="feedback-section-label">
                    OVERALL UNDERSTANDING
                </span>

            </div>

            <div className="feedback-level-body">

                <div
                    className={`feedback-level-badge feedback-level-${normalizedLevel.toLowerCase()}`}
                >
                    {normalizedLevel}
                </div>

                <div className="feedback-level-content">

                    <h2>
                        {title}
                    </h2>

                    <p>
                        {description}
                    </p>

                </div>

            </div>

        </section>
    );
}

export default FeedbackLevelCard;
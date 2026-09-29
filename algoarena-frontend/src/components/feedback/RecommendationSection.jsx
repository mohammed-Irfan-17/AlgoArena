import React from "react";

function RecommendationSection({
    recommendations
}) {

    if (
        !recommendations ||
        recommendations.length === 0
    ) {

        return (
            <section className="feedback-section">

                <div className="feedback-section-header">

                    <div className="feedback-section-icon">
                        →
                    </div>

                    <div>

                        <span>
                            PRACTICE
                        </span>

                        <h2>
                            Recommended Problems
                        </h2>

                    </div>

                </div>

                <p className="feedback-empty">
                    No additional recommendations right now.
                </p>

            </section>
        );
    }


    return (
        <section className="feedback-section">

            <div className="feedback-section-header">

                <div className="feedback-section-icon">
                    →
                </div>

                <div>

                    <span>
                        PRACTICE
                    </span>

                    <h2>
                        Recommended Problems
                    </h2>

                </div>

            </div>


            <div className="recommendation-list">

                {recommendations.map(
                    (problem, index) => (

                        <div
                            className="recommendation-card"
                            key={index}
                        >

                            <div className="recommendation-top">

                                <span className="recommendation-number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="recommendation-concept">
                                    {problem.concept}
                                </span>

                            </div>


                            <h3>
                                {problem.title}
                            </h3>


                            <p>
                                {problem.description}
                            </p>


                            <button
                                className="recommendation-button"
                                onClick={() => {
                                    window.location.href =
                                        `/problems/${problem.id}`;
                                }}
                            >
                                Practice Problem
                                <span>
                                    →
                                </span>
                            </button>

                        </div>

                    )
                )}

            </div>

        </section>
    );
}

export default RecommendationSection;

import React from "react";

import "./ConceptProgress.css";

function ConceptProgress({
    progress = []
}) {

    return (
        <section className="concept-progress-section">

            <div className="dashboard-section-heading">

                <div>

                    <span>
                        CONCEPT COVERAGE
                    </span>

                    <h2>
                        Questions by Concept
                    </h2>

                    <p>
                        See how many problems you have solved
                        in each concept and your completion rate.
                    </p>

                </div>

                <div className="dashboard-section-symbol">
                    %
                </div>

            </div>


            {progress.length === 0 ? (

                <div className="concept-progress-empty">

                    <h3>
                        No problems solved yet
                    </h3>

                    <p>
                        Start solving problems and your
                        concept progress will appear here.
                    </p>

                </div>

            ) : (

                <div className="concept-progress-grid">

                    {progress.map(
                        (item, index) => (

                            <div
                                className="concept-progress-card"
                                key={
                                    `${item.concept}-${index}`
                                }
                            >

                                <div className="concept-card-top">

                                    <div className="concept-card-number">
                                        {String(
                                            index + 1
                                        ).padStart(
                                            2,
                                            "0"
                                        )}
                                    </div>

                                    <span>
                                        {Math.round(
                                            item.percentage || 0
                                        )}%
                                    </span>

                                </div>


                                <h3>
                                    {item.concept}
                                </h3>


                                <p>
                                    {item.solvedQuestions}
                                    {" "}
                                    of
                                    {" "}
                                    {item.totalQuestions}
                                    {" "}
                                    questions solved
                                </p>


                                <div className="concept-progress-track">

                                    <div
                                        className="concept-progress-fill"
                                        style={{
                                            width:
                                                `${Math.min(
                                                    item.percentage || 0,
                                                    100
                                                )}%`
                                        }}
                                    />

                                </div>


                                <div className="concept-progress-footer">

                                    <span>
                                        Completion
                                    </span>

                                    <strong>
                                        {item.solvedQuestions}
                                        /
                                        {item.totalQuestions}
                                    </strong>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </section>
    );
}

export default ConceptProgress;


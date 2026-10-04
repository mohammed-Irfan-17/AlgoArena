import React from "react";

import "./ConceptStatus.css";

function ConceptStatus({
    conceptStatuses = [],
    progress = []
}) {

    /*
     * Build a status lookup so that we can combine
     * concept progress with concept understanding.
     */
    const statusMap = {};

    conceptStatuses.forEach((item) => {

        if (item.concept) {

            statusMap[
                item.concept.toLowerCase()
            ] = item.status;

        }

    });


    /*
     * Use progress concepts as the base.
     * If a concept has no evaluation yet,
     * it will be shown as NOT ATTEMPTED YET.
     */
    const concepts = progress.map((item) => {

    return {
        concept: item.concept,
        status: item.status || "NOT ATTEMPTED YET",
        statusClass:
            item.status === "GOOD"
                ? "concept-status-good"
                : item.status === "IMPROVING"
                    ? "concept-status-improving"
                    : "concept-status-not-attempted"
    };

});


    /*
     * Fallback:
     * If progress is empty but conceptStatuses exists,
     * still show the available concepts.
     */
    if (concepts.length === 0) {

        conceptStatuses.forEach((item) => {

            let displayStatus =
                "NOT ATTEMPTED YET";

            let statusClass =
                "concept-status-not-attempted";

            const status =
                item.status?.toUpperCase();

            if (status === "GOOD") {

                displayStatus = "GOOD";
                statusClass = "concept-status-good";

            } else if (
                status === "PARTIAL" ||
                status === "WEAK" ||
                status === "POOR" ||
                status === "NEEDS WORK"
            ) {

                displayStatus = "IMPROVING";
                statusClass = "concept-status-improving";

            }

            concepts.push({
                concept: item.concept,
                status: displayStatus,
                statusClass
            });

        });

    }


    return (
        <section className="concept-status-section">

            <div className="dashboard-section-heading">

                <div>

                    <span>
                        UNDERSTANDING
                    </span>

                    <h2>
                        Concept Status
                    </h2>

                    <p>
                        See how your understanding is developing
                        across the concepts you practice.
                    </p>

                </div>

                <div className="dashboard-section-symbol">
                    ◉
                </div>

            </div>


            {concepts.length === 0 ? (

                <div className="concept-status-empty">

                    <h3>
                        Start solving to see your status
                    </h3>

                    <p>
                        Your concept understanding will appear
                        here as you complete problems and
                        understanding checks.
                    </p>

                </div>

            ) : (

                <div className="concept-status-list">

                    {concepts.map((item, index) => (

                        <div
                            className="concept-status-row"
                            key={`${item.concept}-${index}`}
                        >

                            <div className="concept-status-index">
                                {String(index + 1).padStart(
                                    2,
                                    "0"
                                )}
                            </div>


                            <div className="concept-status-info">

                                <h3>
                                    {item.concept}
                                </h3>

                                <p>
                                    Current understanding
                                </p>

                            </div>


                            <div
                                className={
                                    `concept-status-badge ${item.statusClass}`
                                }
                            >

                                <span className="status-dot"></span>

                                {item.status}

                            </div>

                        </div>

                    ))}

                </div>  

            )}

        </section>
    );
}

export default ConceptStatus;
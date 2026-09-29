import React from "react";

function ConceptBreakdown({ summary }) {

    if (!summary || summary.length === 0) {

        return (
            <section className="feedback-section">

                <div className="feedback-section-header">

                    <div className="feedback-section-icon">
                        ◈
                    </div>

                    <div>

                        <span>
                            ANALYSIS
                        </span>

                        <h2>
                            Concept Breakdown
                        </h2>

                    </div>

                </div>

                <p className="feedback-empty">
                    No concept data available yet.
                </p>

            </section>
        );
    }


    return (
        <section className="feedback-section">

            <div className="feedback-section-header">

                <div className="feedback-section-icon">
                    ◈
                </div>

                <div>

                    <span>
                        ANALYSIS
                    </span>

                    <h2>
                        Concept Breakdown
                    </h2>

                </div>

            </div>


            <div className="concept-list">

                {summary.map((item, index) => {

                    const total =
                        item.good +
                        item.partial +
                        item.poor;

                    const goodPercent =
                        total > 0
                            ? (item.good / total) * 100
                            : 0;

                    const partialPercent =
                        total > 0
                            ? (item.partial / total) * 100
                            : 0;

                    return (

                        <div
                            className="concept-item"
                            key={index}
                        >

                            <div className="concept-item-top">

                                <div>

                                    <h3>
                                        {item.concept}
                                    </h3>

                                    <span>
                                        {total} evaluation
                                        {total !== 1 ? "s" : ""}
                                    </span>

                                </div>

                                <div className="concept-counts">

                                    <span className="count-good">
                                        {item.good} Good
                                    </span>

                                    <span className="count-partial">
                                        {item.partial} Partial
                                    </span>

                                    <span className="count-poor">
                                        {item.poor} Poor
                                    </span>

                                </div>

                            </div>


                            <div className="concept-bar">

                                <div
                                    className="concept-bar-good"
                                    style={{
                                        width:
                                            `${goodPercent}%`
                                    }}
                                />

                                <div
                                    className="concept-bar-partial"
                                    style={{
                                        width:
                                            `${partialPercent}%`
                                    }}
                                />

                            </div>

                        </div>
                    );
                })}

            </div>

        </section>
    );
}

export default ConceptBreakdown;
import React from "react";

function ImprovementSection({ weakConcepts }) {

    return (
        <section className="feedback-section improvement-section">

            <div className="feedback-section-header">

                <div className="feedback-section-icon">
                    !
                </div>

                <div>

                    <span>
                        NEXT FOCUS
                    </span>

                    <h2>
                        Areas to Improve
                    </h2>

                </div>

            </div>


            {(!weakConcepts ||
                weakConcepts.length === 0) ? (

                <div className="improvement-empty">

                    <div className="improvement-success-icon">
                        ✓
                    </div>

                    <div>

                        <h3>
                            No major weak concepts detected
                        </h3>

                        <p>
                            Keep challenging yourself with
                            more advanced problems.
                        </p>

                    </div>

                </div>

            ) : (

                <div className="improvement-list">

                    {weakConcepts.map(
                        (item, index) => (

                            <div
                                className="improvement-item"
                                key={index}
                            >

                                <div className="improvement-number">
                                    {index + 1}
                                </div>

                                <div className="improvement-content">

                                    <h3>
                                        {item.concept}
                                    </h3>

                                    <p>
                                        This concept has
                                        room for improvement
                                        based on your recent
                                        understanding checks.
                                    </p>

                                    <div className="improvement-counts">

                                        <span>
                                            ✓ {item.good}
                                        </span>

                                        <span>
                                            ~ {item.partial}
                                        </span>

                                        <span>
                                            ! {item.poor}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </section>
    );
}

export default ImprovementSection;
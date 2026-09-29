import React from "react";

function FeedbackSummaryCards({ progress }) {

    if (!progress) {
        return null;
    }

    return (
        <section className="feedback-summary-grid">

            <div className="feedback-stat-card good">

                <div className="feedback-stat-icon">
                    ✓
                </div>

                <div>

                    <span>
                        GOOD
                    </span>

                    <strong>
                        {progress.good}
                    </strong>

                    <small>
                        Strong understanding
                    </small>

                </div>

            </div>


            <div className="feedback-stat-card partial">

                <div className="feedback-stat-icon">
                    ~
                </div>

                <div>

                    <span>
                        PARTIAL
                    </span>

                    <strong>
                        {progress.partial}
                    </strong>

                    <small>
                        Could be improved
                    </small>

                </div>

            </div>


            <div className="feedback-stat-card poor">

                <div className="feedback-stat-icon">
                    !
                </div>

                <div>

                    <span>
                        NEEDS WORK
                    </span>

                    <strong>
                        {progress.poor}
                    </strong>

                    <small>
                        Needs more practice
                    </small>

                </div>

            </div>


            <div className="feedback-stat-card total">

                <div className="feedback-stat-icon">
                    #
                </div>

                <div>

                    <span>
                        EVALUATED
                    </span>

                    <strong>
                        {progress.total}
                    </strong>

                    <small>
                        Questions answered
                    </small>

                </div>

            </div>

        </section>
    );
}

export default FeedbackSummaryCards;
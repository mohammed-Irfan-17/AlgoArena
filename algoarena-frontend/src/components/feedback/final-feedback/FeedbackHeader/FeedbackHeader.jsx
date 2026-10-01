import React from "react";
import "./FeedbackHeader.css";

function FeedbackHeader({
    submissionId,
    questionCount = 5
}) {

    return (
        <section className="final-feedback-header">

            {/* Badge */}

            <div className="final-feedback-badge">
                <span className="final-feedback-badge-dot"></span>
                FINAL FEEDBACK
            </div>


            {/* Title */}

            <h1>
                Your Learning Feedback
            </h1>

            <p className="final-feedback-subtitle">
                Here's what your solution and quiz answers
                reveal about your understanding.
            </p>


            {/* Submission information */}

            <div className="final-feedback-meta">

                <div className="feedback-meta-item">

                    <div className="feedback-meta-icon">
                        ▤
                    </div>

                    <div>
                        <span>
                            SUBMISSION
                        </span>

                        <strong>
                            #{submissionId}
                        </strong>
                    </div>

                </div>


                <div className="feedback-meta-divider"></div>


                <div className="feedback-meta-item">

                    <div className="feedback-meta-icon">
                        ☷
                    </div>

                    <div>
                        <span>
                            QUESTIONS
                        </span>

                        <strong>
                            {questionCount}
                        </strong>
                    </div>

                </div>


                <div className="feedback-meta-divider"></div>


                <div className="feedback-meta-item">

                    <div className="feedback-meta-check">
                        ✓
                    </div>

                    <div>
                        <span>
                            STATUS
                        </span>

                        <strong>
                            Quiz Completed
                        </strong>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default FeedbackHeader;
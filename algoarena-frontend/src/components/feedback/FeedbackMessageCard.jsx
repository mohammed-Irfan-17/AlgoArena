import React from "react";

function FeedbackMessageCard({
    feedback
}) {

    return (
        <section className="feedback-message-card">

            <div className="feedback-message-header">

                <div className="feedback-message-icon">
                    ✦
                </div>

                <div>
                    <span className="feedback-section-label">
                        PERSONALIZED FEEDBACK
                    </span>

                    <h2>
                        What your explanation shows
                    </h2>
                </div>

            </div>

            <div className="feedback-message-body">

                <p>
                    {feedback}
                </p>

            </div>

        </section>
    );
}

export default FeedbackMessageCard;
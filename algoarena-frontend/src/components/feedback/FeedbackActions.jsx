import React from "react";

function FeedbackActions({
    onContinue,
    onViewProgress
}) {

    return (
        <div className="feedback-actions">

            <button
                className="feedback-secondary-button"
                onClick={onViewProgress}
            >
                View My Progress
            </button>

            <button
                className="feedback-primary-button"
                onClick={onContinue}
            >
                Continue Learning
                <span>→</span>
            </button>

        </div>
    );
}

export default FeedbackActions;
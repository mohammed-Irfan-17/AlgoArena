
import React from "react";

import "./FeedbackActions.css";


function FeedbackActions({
    onViewProgress,
    onContinue
}) {

    const handleViewProgress = () => {

        /*
         * Tell the Dashboard that the user has
         * completed a learning interaction.
         *
         * Dashboard.jsx is listening for this event.
         */
        window.dispatchEvent(
            new Event("dashboardUpdated")
        );


        /*
         * Now navigate to the Dashboard.
         */
        if (onViewProgress) {
            onViewProgress();
        }
    };


    return (
        <section className="feedback-actions">

            <div className="feedback-actions-content">

                <div className="feedback-actions-text">

                    <span>
                        NEXT STEP
                    </span>

                    <h2>
                        Keep building your understanding.
                    </h2>

                    <p>
                        Review your learning progress or
                        continue practicing more coding problems.
                    </p>

                </div>


                <div className="feedback-actions-buttons">

                    <button
                        className="feedback-dashboard-button"
                        onClick={handleViewProgress}
                    >
                        View Dashboard
                        <span>→</span>
                    </button>


                    <button
                        className="feedback-continue-button"
                        onClick={onContinue}
                    >
                        Continue Practicing
                        <span>→</span>
                    </button>

                </div>

            </div>

        </section>
    );
}


export default FeedbackActions;


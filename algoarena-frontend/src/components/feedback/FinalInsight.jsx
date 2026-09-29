import React from "react";

function FinalInsight({ feedback }) {

    return (
        <section className="feedback-section final-insight">

            <div className="feedback-section-header">

                <div className="feedback-section-icon">
                    ✦
                </div>

                <div>

                    <span>
                        AI ANALYSIS
                    </span>

                    <h2>
                        Overall Understanding
                    </h2>

                </div>

            </div>


            <div className="final-insight-content">

                {feedback || "No final feedback available."}

            </div>

        </section>
    );
}

export default FinalInsight;
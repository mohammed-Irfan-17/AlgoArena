import React from "react";
import "./AILearningFeedback.css";

function AILearningFeedback({
    overallUnderstanding,
    whatYouUnderstand = [],
    whatYouShouldImprove = [],
    keyTakeaway
}) {

    return (
        <section className="ai-learning-feedback">

            {/* Section heading */}

            <div className="ai-feedback-heading">

                <div className="ai-feedback-icon">
                    ✦
                </div>

                <div>

                    <span>
                        AI LEARNING FEEDBACK
                    </span>

                    <h2>
                        What Your Answers Reveal
                    </h2>

                    <p>
                        AI analysis based on your code and
                        understanding check answers.
                    </p>

                </div>

            </div>


            {/* Main analysis */}

            <div className="ai-feedback-analysis">

                {/* Overall */}

                <div className="ai-overall">

                    <div className="ai-overall-icon">
                        ✓
                    </div>

                    <div>

                        <h3>
                            Overall Understanding
                        </h3>

                        <p>
                            {overallUnderstanding ||
                                "Your answers show your current understanding of the problem and the approach you used."}
                        </p>

                    </div>

                </div>


                {/* Three columns */}

                <div className="ai-feedback-columns">

                    {/* What you understand */}

                    <div className="ai-feedback-column">

                        <div className="ai-column-title">

                            <span className="ai-positive-icon">
                                ✓
                            </span>

                            <h3>
                                What You Understand
                            </h3>

                        </div>

                        <ul>

                            {whatYouUnderstand.length > 0
                                ? whatYouUnderstand.map(
                                    (item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                )
                                : (
                                    <li>
                                        Your answers demonstrate
                                        understanding of the core
                                        problem.
                                    </li>
                                )
                            }

                        </ul>

                    </div>


                    {/* What to improve */}

                    <div className="ai-feedback-column">

                        <div className="ai-column-title">

                            <span className="ai-improve-icon">
                                ↗
                            </span>

                            <h3>
                                What You Should Improve
                            </h3>

                        </div>

                        <ul>

                            {whatYouShouldImprove.length > 0
                                ? whatYouShouldImprove.map(
                                    (item, index) => (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                )
                                : (
                                    <li>
                                        Continue improving
                                        algorithm efficiency and
                                        problem-solving techniques.
                                    </li>
                                )
                            }

                        </ul>

                    </div>


                    {/* Key takeaway */}

                    <div className="ai-feedback-column">

                        <div className="ai-column-title">

                            <span className="ai-takeaway-icon">
                                ♧
                            </span>

                            <h3>
                                Key Takeaway
                            </h3>

                        </div>

                        <p className="ai-takeaway-text">
                            {keyTakeaway ||
                                "Focus on understanding why the solution works and how it can be improved for larger inputs."}
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AILearningFeedback;
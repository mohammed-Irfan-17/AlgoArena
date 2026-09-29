import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import FeedbackSummaryCard from "./FeedbackSummaryCard";
import FeedbackLevelCard from "./FeedbackLevelCard";
import FeedbackMessageCard from "./FeedbackMessageCard";
import FeedbackActions from "./FeedbackActions";

import "./Feedback.css";


function FinalFeedbackPage() {

    const [searchParams] =
        useSearchParams();

    const navigate =
        useNavigate();


    const submissionId =
        searchParams.get("submissionId");

    const userId =
        searchParams.get("userId");


    const [feedback, setFeedback] =
        useState("");

    const [evaluations, setEvaluations] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        if (!submissionId) {

            setError(
                "Submission could not be identified."
            );

            setLoading(false);

            return;
        }

        loadFeedback();

    }, [submissionId]);


    async function loadFeedback() {

        try {

            setLoading(true);
            setError("");


            /*
             * 1. Get final Gemini feedback
             */

            const feedbackResponse =
                await fetch(
                    `http://localhost:8080/api/evaluations/submission/${submissionId}/final-feedback`
                );


            if (!feedbackResponse.ok) {

                throw new Error(
                    "Failed to load final feedback"
                );
            }


            const feedbackData =
                await feedbackResponse.json();


            /*
             * FinalFeedbackResponse:
             *
             * {
             *   submissionId: 1,
             *   feedback: "..."
             * }
             */

            setFeedback(
                feedbackData.feedback || ""
            );


            /*
             * 2. Get individual evaluations
             *
             * We don't display the individual
             * feedback to the user.
             *
             * We only use the understanding
             * levels to build the summary cards.
             */

            const evaluationResponse =
                await fetch(
                    `http://localhost:8080/api/evaluations/submission/${submissionId}`
                );


            if (!evaluationResponse.ok) {

                throw new Error(
                    "Failed to load evaluation summary"
                );
            }


            const evaluationData =
                await evaluationResponse.json();


            setEvaluations(
                evaluationData
            );


        } catch (err) {

            console.error(err);

            setError(
                "Unable to load your final feedback."
            );

        } finally {

            setLoading(false);

        }
    }


    /*
     * Calculate summary
     */

    const goodCount =
        evaluations.filter(
            evaluation =>
                evaluation.understandingLevel
                    ?.toUpperCase() === "GOOD"
        ).length;


    const partialCount =
        evaluations.filter(
            evaluation =>
                evaluation.understandingLevel
                    ?.toUpperCase() === "PARTIAL"
        ).length;


    const poorCount =
        evaluations.filter(
            evaluation =>
                evaluation.understandingLevel
                    ?.toUpperCase() === "POOR"
        ).length;


    /*
     * Determine overall level
     */

    let overallLevel =
        "NOT ENOUGH DATA";


    if (evaluations.length > 0) {

        if (
            goodCount >= partialCount &&
            goodCount >= poorCount
        ) {

            overallLevel = "GOOD";

        } else if (
            partialCount >= goodCount &&
            partialCount >= poorCount
        ) {

            overallLevel = "PARTIAL";

        } else {

            overallLevel = "WEAK";

        }
    }


    let levelTitle =
        "Understanding assessment";


    let levelDescription =
        "Your answers have been evaluated based on your explanations.";


    if (overallLevel === "GOOD") {

        levelTitle =
            "Strong conceptual understanding";

        levelDescription =
            "Your explanations show a solid understanding of the concepts behind your solution.";

    } else if (overallLevel === "PARTIAL") {

        levelTitle =
            "Developing conceptual understanding";

        levelDescription =
            "You understand important parts of the approach, but some concepts could be explained more clearly.";

    } else if (overallLevel === "WEAK") {

        levelTitle =
            "More practice will help";

        levelDescription =
            "Your answers indicate that some of the underlying concepts need more practice and reinforcement.";
    }


    /*
     * Loading screen
     */

    if (loading) {

        return (
            <div className="feedback-page">

                <div className="feedback-container">

                    <div className="feedback-loading-card">

                        <div className="feedback-spinner"></div>

                        <h2>
                            Analyzing your understanding
                        </h2>

                        <p>
                            We're preparing your personalized feedback...
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    /*
     * Error screen
     */

    if (error) {

        return (
            <div className="feedback-page">

                <div className="feedback-container">

                    <div className="feedback-error-card">

                        <div className="feedback-error-icon">
                            !
                        </div>

                        <h2>
                            Feedback unavailable
                        </h2>

                        <p>
                            {error}
                        </p>

                        <button
                            className="feedback-primary-button"
                            onClick={() =>
                                navigate(
                                    `/quiz?submissionId=${submissionId}&userId=${userId}`
                                )
                            }
                        >
                            Return to Quiz
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    return (
        <div className="feedback-page">

            <div className="feedback-container">


                {/* =================================================
                    HEADER
                ================================================= */}

                <header className="feedback-header">

                    <div className="feedback-header-badge">

                        <span className="feedback-badge-dot"></span>

                        UNDERSTANDING COMPLETE

                    </div>


                    <h1>
                        Your Learning Feedback
                    </h1>


                    <p>
                        Your solution was accepted.
                        Here's what your explanations reveal
                        about your understanding.
                    </p>

                </header>


                {/* =================================================
                    OVERALL LEVEL
                ================================================= */}

                <FeedbackLevelCard
                    level={
                        overallLevel === "WEAK"
                            ? "WEAK"
                            : overallLevel
                    }

                    title={levelTitle}

                    description={levelDescription}
                />


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div className="feedback-summary-grid">

                    <FeedbackSummaryCard
                        title="Strong"
                        value={goodCount}
                        description="Answers showing clear understanding."
                        type="good"
                    />


                    <FeedbackSummaryCard
                        title="Developing"
                        value={partialCount}
                        description="Answers with partial understanding."
                        type="partial"
                    />


                    <FeedbackSummaryCard
                        title="Needs Practice"
                        value={poorCount}
                        description="Concepts that need more reinforcement."
                        type="weak"
                    />

                </div>


                {/* =================================================
                    GEMINI FINAL FEEDBACK
                ================================================= */}

                <FeedbackMessageCard
                    feedback={
                        feedback ||
                        "Your personalized feedback is not available."
                    }
                />


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <FeedbackActions

                    onViewProgress={() => {

                        if (userId) {

                            navigate(
                                `/progress?userId=${userId}`
                            );

                        } else {

                            navigate("/");

                        }

                    }}


                    onContinue={() => {

                        navigate("/problems");

                    }}

                />


                {/* =================================================
                    FOOTER
                ================================================= */}

                <div className="feedback-footer">

                    Submission #{submissionId}

                </div>

            </div>

        </div>
    );
}

export default FinalFeedbackPage;
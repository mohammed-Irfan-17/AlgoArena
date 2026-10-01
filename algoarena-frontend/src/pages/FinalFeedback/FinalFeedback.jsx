import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FeedbackHeader from "../../components/feedback/final-feedback/FeedbackHeader/FeedbackHeader";
import AILearningFeedback from "../../components/feedback/final-feedback/AILearningFeedback/AILearningFeedback";
import YourApproach from "../../components/feedback/final-feedback/YourApproach/YourApproach";
import ImproveSolution from "../../components/feedback/final-feedback/ImproveSolution/ImproveSolution";
import NextFocus from "../../components/feedback/final-feedback/NextFocus/NextFocus";
import PracticeQuestions from "../../components/feedback/final-feedback/PracticeQuestions/PracticeQuestions";

import Navbar from "../../components/homepage/Navbar/Navbar";

import "./FinalFeedback.css";

function FinalFeedback() {

    const [searchParams] = useSearchParams();

    const submissionId =
        searchParams.get("submissionId");

    const userId =
        searchParams.get("userId");


    const [feedback, setFeedback] =
        useState("");

    const [recommendations, setRecommendations] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        if (!submissionId || !userId) {

            setError(
                "Feedback session information is missing."
            );

            setLoading(false);

            return;
        }

        loadFeedback();

    }, [submissionId, userId]);


    async function loadFeedback() {

        try {

            setLoading(true);
            setError("");


            const [
                feedbackResponse,
                recommendationsResponse
            ] = await Promise.all([

                fetch(
                    `http://localhost:8080/api/evaluations/submission/${submissionId}/final-feedback`
                ),

                fetch(
                    `http://localhost:8080/api/evaluations/user/${userId}/recommendations`
                )

            ]);


            if (!feedbackResponse.ok) {

                throw new Error(
                    "Failed to load final feedback."
                );

            }


            const feedbackData =
                await feedbackResponse.json();


            let recommendationsData = [];


            if (recommendationsResponse.ok) {

                recommendationsData =
                    await recommendationsResponse.json();

            }


            setFeedback(
                feedbackData.feedback || ""
            );

            setRecommendations(
                recommendationsData
            );


        } catch (err) {

            console.error(err);

            setError(
                "Unable to load your feedback report."
            );

        } finally {

            setLoading(false);

        }

    }


    if (loading) {

        return (

            <div className="final-feedback-loading">

                <div className="final-feedback-loading-card">

                    <div className="final-feedback-spinner"></div>

                    <h2>
                        Preparing your learning report
                    </h2>

                    <p>
                        Analyzing your answers and
                        preparing your personalized feedback...
                    </p>

                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="final-feedback-error">

                <div className="final-feedback-error-card">

                    <div className="final-feedback-error-icon">
                        !
                    </div>

                    <h2>
                        Unable to load feedback
                    </h2>

                    <p>
                        {error}
                    </p>

                </div>

            </div>

        );

    }


    return (

        <main className="final-feedback-page">
            <Navbar/>

            <div className="final-feedback-container">


                {/* =================================
                    HEADER
                ================================= */}

                <FeedbackHeader
                    submissionId={submissionId}
                />


                {/* =================================
                    SUBMISSION STATUS
                ================================= */}

                <div className="final-feedback-submission">

                    <div>

                        <span className="final-feedback-submission-label">
                            Submission
                        </span>

                        <span className="final-feedback-submission-id">
                            #{submissionId}
                        </span>

                    </div>


                    <div className="final-feedback-complete">

                        <span>
                            ✓
                        </span>

                        Quiz Completed

                    </div>

                </div>


                {/* =================================
                    AI LEARNING FEEDBACK
                ================================= */}

                <section className="final-feedback-section">

                    <AILearningFeedback
                        feedback={feedback}
                    />

                </section>


                {/* =================================
                    YOUR APPROACH
                ================================= */}

                <section className="final-feedback-section">

                    <YourApproach
                        feedback={feedback}
                    />

                </section>


                {/* =================================
                    IMPROVE YOUR SOLUTION
                ================================= */}

                <section className="final-feedback-section">

                    <ImproveSolution
                        feedback={feedback}
                    />

                </section>


                {/* =================================
                    NEXT FOCUS
                ================================= */}

                <section className="final-feedback-section">

                    <NextFocus
                        feedback={feedback}
                    />

                </section>


                {/* =================================
                    PRACTICE QUESTIONS
                ================================= */}

                <section className="final-feedback-section">

                    <PracticeQuestions
                        recommendations={
                            recommendations
                        }
                    />

                </section>


                {/* =================================
                    FOOTER
                ================================= */}

                <footer className="final-feedback-footer">

                    <span>
                        AlgoArena Learning Report
                    </span>

                    <span>
                        Submission #{submissionId}
                    </span>

                </footer>

            </div>

        </main>

    );

}

export default FinalFeedback;


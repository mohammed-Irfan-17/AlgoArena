import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FeedbackSummaryCards from "./FeedbackSummaryCard";
import ConceptBreakdown from "./ConceptBreakdown";
import ProgressSection from "./ProgressSection";
import ImprovementSection from "./ImprovementSection";
import RecommendationSection from "./RecommendationSection";
import FinalInsight from "./FinalInsight";

import "./FeedbackPage.css";

function FeedbackPage() {

    const [searchParams] = useSearchParams();

    const submissionId =
        searchParams.get("submissionId");

    const userId =
        searchParams.get("userId");

    const [feedback, setFeedback] =
        useState("");

    const [progress, setProgress] =
        useState(null);

    const [summary, setSummary] =
        useState([]);

    const [weakConcepts, setWeakConcepts] =
        useState([]);

    const [conceptProgress, setConceptProgress] =
        useState([]);

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
                finalFeedbackResponse,
                progressResponse,
                summaryResponse,
                weakResponse,
                conceptProgressResponse,
                recommendationsResponse
            ] = await Promise.all([

                fetch(
                    `http://localhost:8080/api/evaluations/submission/${submissionId}/final-feedback`
                ),

                fetch(
                    `http://localhost:8080/api/evaluations/user/${userId}/progress`
                ),

                fetch(
                    `http://localhost:8080/api/evaluations/user/${userId}/summary`
                ),

                fetch(
                    `http://localhost:8080/api/evaluations/user/${userId}/weak-concepts`
                ),

                fetch(
                    `http://localhost:8080/api/evaluations/user/${userId}/concept-progress`
                ),

                fetch(
                    `http://localhost:8080/api/evaluations/user/${userId}/recommendations`
                )

            ]);


            if (!finalFeedbackResponse.ok) {
                throw new Error(
                    "Failed to load final feedback."
                );
            }

            if (!progressResponse.ok) {
                throw new Error(
                    "Failed to load progress."
                );
            }

            if (!summaryResponse.ok) {
                throw new Error(
                    "Failed to load concept summary."
                );
            }

            if (!weakResponse.ok) {
                throw new Error(
                    "Failed to load weak concepts."
                );
            }

            if (!conceptProgressResponse.ok) {
                throw new Error(
                    "Failed to load concept progress."
                );
            }

            if (!recommendationsResponse.ok) {
                throw new Error(
                    "Failed to load recommendations."
                );
            }


            const finalFeedbackData =
                await finalFeedbackResponse.json();

            const progressData =
                await progressResponse.json();

            const summaryData =
                await summaryResponse.json();

            const weakData =
                await weakResponse.json();

            const conceptProgressData =
                await conceptProgressResponse.json();

            const recommendationsData =
                await recommendationsResponse.json();


            setFeedback(
                finalFeedbackData.feedback || ""
            );

            setProgress(progressData);

            setSummary(summaryData);

            setWeakConcepts(weakData);

            setConceptProgress(
                conceptProgressData
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
            <div className="feedback-loading">

                <div className="feedback-loading-card">

                    <div className="feedback-spinner"></div>

                    <h2>
                        Preparing your report
                    </h2>

                    <p>
                        Analyzing your understanding and
                        preparing your learning insights...
                    </p>

                </div>

            </div>
        );
    }


    if (error) {

        return (
            <div className="feedback-error">

                <div className="feedback-error-card">

                    <div className="feedback-error-icon">
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
        <div className="feedback-page">

            <div className="feedback-container">

                {/* HEADER */}

                <header className="feedback-header">

                    <div className="feedback-badge">

                        <span className="feedback-badge-dot"></span>

                        FINAL FEEDBACK

                    </div>

                    <h1>
                        Your Understanding Report
                    </h1>

                    <p className="feedback-subtitle">
                        Here's what your answers reveal
                        about your understanding of this problem.
                    </p>

                </header>


                {/* SUBMISSION */}

                <div className="feedback-submission">

                    <div>

                        <span className="feedback-submission-label">
                            Submission
                        </span>

                        <strong>
                            #{submissionId}
                        </strong>

                    </div>

                    <div className="feedback-complete">
                        ✓ Quiz Completed
                    </div>

                </div>


                {/* SUMMARY */}

                <FeedbackSummaryCards
                    progress={progress}
                />


                {/* OVERALL */}

                <FinalInsight
                    feedback={feedback}
                />


                {/* CONCEPT BREAKDOWN */}

                <ConceptBreakdown
                    summary={summary}
                />


                {/* PROGRESS */}

                <ProgressSection
                    progress={conceptProgress}
                />


                {/* IMPROVEMENT */}

                <ImprovementSection
                    weakConcepts={weakConcepts}
                />


                {/* RECOMMENDATIONS */}

                <RecommendationSection
                    recommendations={
                        recommendations
                    }
                />


                <div className="feedback-footer">

                    <span>
                        AlgoArena Learning Report
                    </span>

                    <span>
                        Submission #{submissionId}
                    </span>

                </div>

            </div>

        </div>
    );
}

export default FeedbackPage;
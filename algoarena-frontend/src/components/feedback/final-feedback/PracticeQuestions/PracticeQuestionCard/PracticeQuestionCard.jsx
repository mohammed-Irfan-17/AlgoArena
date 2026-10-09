import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import "./PracticeQuestionCard.css";

function PracticeQuestionCard({ problem, index = 0 }) {
    const navigate = useNavigate();

    const problemId = problem?.id ?? problem?.problemId;

    function handleNavigate() {
        if (problemId == null || problemId === "") {
            console.error(
                "Cannot open recommended problem: problem ID is missing.",
                problem
            );
            return;
        }

        navigate(`/problems/${problemId}`);
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleNavigate();
        }
    }

    return (
        <article
            className="practice-question-card"
            onClick={handleNavigate}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`Solve ${problem?.title || "practice problem"}`}
        >
            <div className="practice-number">
                {String(index + 1).padStart(2, "0")}
            </div>

            <div className="practice-question-content">
                <div className="practice-question-top">
                    <h3>
                        {problem?.title || "Practice Problem"}
                    </h3>

                    {problem?.concept && (
                        <span className="practice-concept">
                            {problem.concept}
                        </span>
                    )}
                </div>

                {problem?.description && (
                    <p>{problem.description}</p>
                )}
            </div>

            <div className="practice-solve">
                <span>Solve</span>
                <ArrowRight size={20} />
            </div>
        </article>
    );
}

export default PracticeQuestionCard;
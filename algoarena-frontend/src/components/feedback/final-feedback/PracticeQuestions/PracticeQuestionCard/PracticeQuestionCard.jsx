import React from "react";
import { useNavigate } from "react-router-dom";
import "./PracticeQuestionCard.css";

function PracticeQuestionCard({
    problem,
    index
}) {
    const navigate = useNavigate();

    function handleNavigate() {
        if (!problem?.id) {
            return;
        }

        navigate(`/problems/${problem.id}`);
    }

    return (
        <article
            className="practice-question-card"
            onClick={handleNavigate}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    handleNavigate();
                }

            }}
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
                        <span>
                            {problem.concept}
                        </span>
                    )}

                </div>

                {problem?.description && (
                    <p>
                        {problem.description}
                    </p>
                )}

            </div>

            <div className="practice-solve">
                <span>
                    Solve
                </span>

                <strong>
                    →
                </strong>
            </div>

        </article>
    );
}

export default PracticeQuestionCard;
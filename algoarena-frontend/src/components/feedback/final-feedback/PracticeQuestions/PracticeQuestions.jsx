import React from "react";
import { useNavigate } from "react-router-dom";
import {
    BookOpen,
    ArrowRight
} from "lucide-react";

import "./PracticeQuestions.css";

function PracticeQuestions({ recommendations = [] }) {

    const navigate = useNavigate();


    if (!recommendations.length) {

        return (
            <section className="practice-section">

                <div className="practice-header">

                    <div className="practice-header-icon">
                        <BookOpen size={23} />
                    </div>

                    <div>

                        <span className="practice-label">
                            KEEP PRACTICING
                        </span>

                        <h2>
                            Practice These Questions
                        </h2>

                        <p>
                            Strengthen your understanding by
                            solving related problems.
                        </p>

                    </div>

                </div>


                <div className="practice-empty">
                    You're doing well. No additional practice
                    problems are recommended right now.
                </div>

            </section>
        );
    }


    return (
        <section className="practice-section">

            {/* HEADER */}

            <div className="practice-header">

                <div className="practice-header-icon">
                    <BookOpen size={23} />
                </div>

                <div>

                    <span className="practice-label">
                        KEEP PRACTICING
                    </span>

                    <h2>
                        Practice These Questions
                    </h2>

                    <p>
                        Strengthen your understanding by
                        solving related problems.
                    </p>

                </div>

            </div>


            {/* QUESTION CARDS */}

            <div className="practice-question-grid">

                {recommendations.map(
                    (problem, index) => (

                        <article
                            key={problem.id || index}
                            className="practice-question-card"
                            onClick={() =>
                                navigate(
                                    `/problems/${problem.id}`
                                )
                            }
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {

                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {

                                    navigate(
                                        `/problems/${problem.id}`
                                    );

                                }

                            }}
                        >

                            {/* NUMBER */}

                            <div className="practice-number">
                                {String(index + 1).padStart(2, "0")}
                            </div>


                            {/* MAIN CONTENT */}

                            <div className="practice-card-content">

                                <div className="practice-card-title-row">

                                    <h3>
                                        {problem.title}
                                    </h3>

                                    {problem.concept && (

                                        <span className="practice-concept">
                                            {problem.concept}
                                        </span>

                                    )}

                                </div>


                                <p>
                                    {problem.description}
                                </p>

                            </div>


                            {/* ARROW */}

                            <div className="practice-arrow">

                                <ArrowRight
                                    size={7}
                                />

                            </div>

                        </article>

                    )
                )}

            </div>

        </section>
    );
}

export default PracticeQuestions;
import React from "react";
import { useNavigate } from "react-router-dom";

import "./RecommendedProblems.css";

function RecommendedProblems({
recommendations = []
}) {


const navigate = useNavigate();


/*
 * Get the actual problem ID returned
 * by the backend recommendation API.
 */
const getProblemId = (problem) => {

    return (
        problem?.id ??
        problem?.problemId ??
        problem?.problemID ??
        null
    );
};


/*
 * Open the recommended problem.
 */
const openProblem = (problem) => {

    const problemId =
        getProblemId(problem);

    console.log(
        "Opening recommended problem:",
        problem
    );

    console.log(
        "Resolved problem ID:",
        problemId
    );


    if (!problemId) {

        console.error(
            "Recommended problem has no ID:",
            problem
        );

        return;
    }


    navigate(
        `/problems/${problemId}`
    );
};


return (
    <section className="recommended-problems-section">

        {/* =========================
            SECTION HEADER
        ========================= */}

        <div className="dashboard-section-heading">

            <div>

                <span>
                    PRACTICE
                </span>

                <h2>
                    Recommended Problems
                </h2>

                <p>
                    Practice these problems to strengthen
                    concepts that you're still developing.
                </p>

            </div>

            <div className="dashboard-section-symbol">
                →
            </div>

        </div>


        {/* =========================
            EMPTY STATE
        ========================= */}

        {recommendations.length === 0 ? (

            <div className="recommended-empty">

                <div className="recommended-empty-icon">
                    ✓
                </div>

                <h3>
                    You're doing well
                </h3>

                <p>
                    No additional practice recommendations
                    are available right now.
                </p>

            </div>

        ) : (

            <div className="recommendation-groups">

                {recommendations.map(
                    (group, groupIndex) => (

                        <div
                            className="recommendation-group"
                            key={
                                `${group.concept}-${groupIndex}`
                            }
                        >

                            {/* =========================
                                GROUP HEADER
                            ========================= */}

                            <div className="recommendation-group-header">

                                <div>

                                    <span>
                                        CONCEPT
                                    </span>

                                    <h3>
                                        {group.concept}
                                    </h3>

                                </div>

                                <div className="recommendation-count">

                                    {group.problems?.length || 0}

                                    {" "}

                                    {(group.problems?.length || 0) === 1
                                        ? "problem"
                                        : "problems"}

                                </div>

                            </div>


                            {/* =========================
                                PROBLEMS
                            ========================= */}

                            <div className="recommendation-problems">

                                {(group.problems || []).map(
                                    (
                                        problem,
                                        problemIndex
                                    ) => {

                                        const problemId =
                                            getProblemId(problem);


                                        return (

                                            <button
                                                type="button"
                                                className="recommendation-problem-card"
                                                key={
                                                    problemId ||
                                                    problemIndex
                                                }
                                                onClick={() =>
                                                    openProblem(
                                                        problem
                                                    )
                                                }
                                            >

                                                {/* TOP */}

                                                <div className="recommendation-card-top">

                                                    <span className="recommendation-problem-type">
                                                        {group.concept}
                                                    </span>

                                                </div>


                                                {/* TITLE */}

                                                <h4>
                                                    {problem.title}
                                                </h4>


                                                {/* DESCRIPTION */}

                                                {problem.description && (

                                                    <p>
                                                        {problem.description}
                                                    </p>

                                                )}


                                                {/* BOTTOM */}

                                                <div className="recommendation-card-bottom">

                                                    <span>
                                                        Problem #{problemId || "—"}
                                                    </span>

                                                    <span className="recommendation-solve-button">
                                                        Solve →
                                                    </span>

                                                </div>

                                            </button>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    )
                )}

            </div>

        )}

    </section>
);


}

export default RecommendedProblems;

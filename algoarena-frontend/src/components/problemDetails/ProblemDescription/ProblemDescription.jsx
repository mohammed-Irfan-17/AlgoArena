import "./ProblemDescription.css";

function ProblemDescription({ problem }) {
    return (
        <section className="problem-description">

            <div className="problem-description-header">

                <div>

                    <span className="problem-details-label">
                        PROBLEM
                    </span>

                    <h1>
                        {problem.title}
                    </h1>

                </div>

                <span
                    className={`problem-details-difficulty ${problem.difficulty.toLowerCase()}`}
                >
                    {problem.difficulty}
                </span>

            </div>


            <div className="problem-description-content">

                <div className="problem-description-text">

                    {problem.description
                        .split("\n")
                        .map((line, index) => (

                            <p key={index}>
                                {line || "\u00A0"}
                            </p>

                        ))}

                </div>


                <div className="problem-concept-tag">

                    Concept:
                    <strong>
                        {problem.concept}
                    </strong>

                </div>

            </div>

        </section>
    );
}

export default ProblemDescription;
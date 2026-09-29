import "./LearningApproach.css";

function LearningApproach() {
    const steps = [
        {
            number: "01",
            title: "Code",
            description:
                "Choose a problem and submit your solution through the coding environment."
        },
        {
            number: "02",
            title: "Get Accepted",
            description:
                "Your solution is checked by the judge against the problem's test cases."
        },
        {
            number: "03",
            title: "Explain",
            description:
                "Answer conceptual questions about the solution you just submitted."
        },
        {
            number: "04",
            title: "Improve",
            description:
                "Understand your strengths, identify weak concepts, and practice recommended problems."
        }
    ];

    return (
        <section className="learning-approach">
            <div className="learning-container">

                <div className="learning-heading">
                    <span className="section-label">
                        THE ALGOARENA APPROACH
                    </span>

                    <h2>
                        Every accepted solution
                        <span> teaches you something.</span>
                    </h2>

                    <p>
                        AlgoArena turns traditional coding practice into
                        a learning loop that connects solving, understanding,
                        and improvement.
                    </p>
                </div>

                <div className="learning-steps">

                    {steps.map((step, index) => (
                        <div
                            className="learning-step"
                            key={step.number}
                        >
                            <div className="step-top">
                                <span className="step-number">
                                    {step.number}
                                </span>

                                {index < steps.length - 1 && (
                                    <span className="step-line"></span>
                                )}
                            </div>

                            <h3>
                                {step.title}
                            </h3>

                            <p>
                                {step.description}
                            </p>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default LearningApproach;
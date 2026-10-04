import "./HowAlgoArenaWorks.css";

function HowAlgoArenaWorks() {
    const steps = [
        {
            number: "01",
            title: "Choose a Problem",
            description:
                "Pick a coding challenge based on your difficulty level and target concept.",
            icon: "◇"
        },
        {
            number: "02",
            title: "Write & Run Code",
            description:
                "Build your solution, run it against test cases, and improve your approach.",
            icon: "</>"
        },
        {
            number: "03",
            title: "Prove Your Understanding",
            description:
                "Answer AI-generated questions about your solution and approach.",
            icon: "?"
        },
        {
            number: "04",
            title: "See Your Growth",
            description:
                "Get personalized feedback and track concept-level progress.",
            icon: "↗"
        }
    ];

    return (
        <section className="how-it-works">
            <div className="how-container">

                {/* Header */}

                <div className="how-header">

                    <span className="how-label">
                        HOW IT WORKS
                    </span>

                    <h2>
                        Learn. Solve.{" "}
                        <span>Understand. Improve.</span>
                    </h2>

                    <p>
                        AlgoArena combines coding practice with guided
                        understanding so you don't just solve problems —
                        you learn why your solution works.
                    </p>

                </div>


                {/* Steps */}

                <div className="steps-wrapper">

                    <div className="steps-line"></div>

                    {steps.map((step) => (
                        <article
                            className="how-step"
                            key={step.number}
                        >

                            <div className="step-number">
                                {step.number}
                            </div>

                            <div className="step-icon">
                                {step.icon}
                            </div>

                            <h3>
                                {step.title}
                            </h3>

                            <p>
                                {step.description}
                            </p>

                        </article>
                    ))}

                </div>


                {/* Bottom message */}

                <div className="how-bottom">

                    <span>
                        Solve problems. Understand your thinking.
                    </span>

                    <span className="bottom-arrow">
                        →
                    </span>

                </div>

            </div>
        </section>
    );
}

export default HowAlgoArenaWorks;
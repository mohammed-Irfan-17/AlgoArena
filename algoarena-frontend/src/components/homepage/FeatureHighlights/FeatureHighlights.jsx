import "./FeatureHighlights.css";

function FeatureHighlights() {
    const features = [
        {
            number: "01",
            title: "Solve Problems",
            description:
                "Practice coding problems designed to strengthen your problem-solving skills."
        },
        {
            number: "02",
            title: "Explain Your Thinking",
            description:
                "Answer conceptual questions after solving problems and explain your approach."
        },
        {
            number: "03",
            title: "Understand Concepts",
            description:
                "Get insight into how well you understand the concepts behind your solutions."
        },
        {
            number: "04",
            title: "Improve Continuously",
            description:
                "Track your progress and receive recommendations based on your learning."
        }
    ];

    return (
        <section className="feature-highlights">
            <div className="feature-container">

                <div className="feature-heading">
                    <span className="section-label">
                        HOW ALGOARENA WORKS
                    </span>

                    <h2>
                        Solve. Understand.{" "}
                        <span>Improve.</span>
                    </h2>

                    <p>
                        AlgoArena goes beyond judging your code. It helps
                        you understand the concepts behind your solutions.
                    </p>
                </div>

                <div className="feature-grid">
                    {features.map((feature) => (
                        <div
                            className="feature-card"
                            key={feature.number}
                        >
                            <span className="feature-number">
                                {feature.number}
                            </span>

                            <h3>
                                {feature.title}
                            </h3>

                            <p>
                                {feature.description}
                            </p>

                            <span className="feature-arrow">
                                →
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default FeatureHighlights;
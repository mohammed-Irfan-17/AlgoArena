import "./PlatformStats.css";

function PlatformStats() {
    const stats = [
        {
            value: "100+",
            label: "Coding Problems",
        },
        {
            value: "20+",
            label: "Concepts",
        },
        {
            value: "5",
            label: "Questions Per Submission",
        },
        {
            value: "1",
            label: "Goal — Understand Better",
        },
    ];

    return (
        <section className="platform-stats">
            <div className="stats-container">

                <div className="stats-intro">
                    <span className="section-label">
                        BUILT FOR LEARNING
                    </span>

                    <h2>
                        More than just a
                        <span> code judge.</span>
                    </h2>

                    <p>
                        AlgoArena connects coding practice with
                        conceptual understanding so every accepted
                        solution becomes an opportunity to learn.
                    </p>
                </div>

                <div className="stats-grid">
                    {stats.map((stat) => (
                        <div
                            className="stat-item"
                            key={stat.label}
                        >
                            <h3>{stat.value}</h3>

                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default PlatformStats;
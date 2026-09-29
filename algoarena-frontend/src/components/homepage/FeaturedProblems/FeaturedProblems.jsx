import "./FeaturedProblems.css";
import { Link } from "react-router-dom";

function FeaturedProblems() {
    const problems = [
        {
            difficulty: "EASY",
            title: "Two Sum",
            description:
                "Find two numbers in an array that add up to a given target.",
            concept: "Hash Map"
        },
        {
            difficulty: "MEDIUM",
            title: "Binary Search",
            description:
                "Search for a target value efficiently inside a sorted array.",
            concept: "Binary Search"
        },
        {
            difficulty: "MEDIUM",
            title: "Longest Substring",
            description:
                "Find the longest substring without repeating characters.",
            concept: "Sliding Window"
        }
    ];

    return (
        <section className="featured-problems">
            <div className="problems-container">

                <div className="problems-heading">

                    <div>
                        <span className="section-label">
                            PRACTICE
                        </span>

                        <h2>
                            Featured <span>Problems</span>
                        </h2>

                        <p>
                            Build your problem-solving skills with
                            carefully selected coding challenges.
                        </p>
                    </div>

                      <Link
        to="/problems"
        className="view-problems-button"
    >
        Explore Problems
        <span>→</span>
    </Link>
                   

                </div>

                <div className="problems-grid">

                    {problems.map((problem) => (
                        <article
                            className="problem-card"
                            key={problem.title}
                        >

                            <div className="problem-card-top">

                                <span
                                    className={`difficulty ${problem.difficulty.toLowerCase()}`}
                                >
                                    {problem.difficulty}
                                </span>

                                <span className="problem-arrow">
                                    ↗
                                </span>

                            </div>

                            <h3>
                                {problem.title}
                            </h3>

                            <p>
                                {problem.description}
                            </p>

                            <div className="problem-card-bottom">

                                <span className="concept-tag">
                                    {problem.concept}
                                </span>

                                <span className="solve-text">
                                    Solve
                                </span>

                            </div>

                        </article>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default FeaturedProblems;
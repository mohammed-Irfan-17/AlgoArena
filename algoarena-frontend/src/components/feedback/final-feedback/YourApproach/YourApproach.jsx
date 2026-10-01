import React from "react";
import "./YourApproach.css";

function YourApproach({
    approach = "Brute Force",
    explanation = "",
    timeComplexity = "O(n²)",
    spaceComplexity = "O(1)"
}) {

    return (
        <section className="your-approach">

            <div className="your-approach-main">

                {/* Section icon */}

                <div className="your-approach-icon">
                    {"</>"}
                </div>


                {/* Section heading */}

                <div className="your-approach-heading">

                    <span>
                        YOUR SOLUTION
                    </span>

                    <h2>
                        Your Approach
                    </h2>

                    <div className="your-approach-badge">
                        {approach}
                    </div>

                    <p>
                        {explanation ||
                            "Your solution uses the approach implemented in your submitted code to solve the problem."}
                    </p>

                </div>

            </div>


            {/* Complexity cards */}

            <div className="your-approach-complexity">

                <div className="complexity-card">

                    <div className="complexity-icon">
                        ◷
                    </div>

                    <div>

                        <span>
                            TIME COMPLEXITY
                        </span>

                        <strong>
                            {timeComplexity}
                        </strong>

                        <p>
                            Based on the number of operations
                            performed by your approach.
                        </p>

                    </div>

                </div>


                <div className="complexity-card">

                    <div className="complexity-icon">
                        ◉
                    </div>

                    <div>

                        <span>
                            SPACE COMPLEXITY
                        </span>

                        <strong>
                            {spaceComplexity}
                        </strong>

                        <p>
                            Based on the additional memory
                            used by your solution.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default YourApproach;
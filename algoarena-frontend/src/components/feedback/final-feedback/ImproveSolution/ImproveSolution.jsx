import React from "react";
import "./ImproveSolution.css";

function ImproveSolution({

    currentApproach = "Brute Force",

    currentTime = "O(n²)",

    currentSpace = "O(1)",

    optimizedApproach = "Hash Map",

    optimizedTime = "O(n)",

    optimizedSpace = "O(n)"

}) {

    return (
        <section className="improve-solution">

            {/* Section heading */}

            <div className="improve-solution-header">

                <div className="improve-solution-icon">
                    ↗
                </div>

                <div>

                    <span>
                        SOLUTION IMPROVEMENT
                    </span>

                    <h2>
                        Improve Your Solution
                    </h2>

                </div>

            </div>


            {/* Comparison */}

            <div className="solution-comparison">


                {/* Current approach */}

                <div className="solution-option current">

                    <span className="solution-option-label">
                        Your Current Approach
                    </span>

                    <h3>
                        {currentApproach}
                    </h3>

                    <div className="solution-complexity">

                        <span>
                            Time & Space Complexity
                        </span>

                        <strong>
                            {currentTime} / {currentSpace}
                        </strong>

                    </div>

                </div>


                {/* Arrow */}

                <div className="solution-arrow">
                    →
                </div>


                {/* Optimized approach */}

                <div className="solution-option optimized">

                    <span className="solution-option-label">
                        Optimized Approach
                    </span>

                    <h3>
                        {optimizedApproach}
                    </h3>

                    <div className="solution-complexity">

                        <span>
                            Time & Space Complexity
                        </span>

                        <strong>
                            {optimizedTime} / {optimizedSpace}
                        </strong>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default ImproveSolution;
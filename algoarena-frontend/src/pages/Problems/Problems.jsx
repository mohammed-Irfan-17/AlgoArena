import { useEffect, useState } from "react";

import ProblemCard from "../../components/problems/ProblemCard/ProblemCard";
import ProblemFilters from "../../components/problems/ProblemFilters/ProblemFilters";

import { getAllProblems } from "../../services/problemService";

import "./Problems.css";

function Problems({ onRequireLogin }) {

    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("ALL");
    const [concept, setConcept] = useState("ALL");

    const [problems, setProblems] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchProblems = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getAllProblems();

                setProblems(data);

            } catch (err) {

                console.error(
                    "Error fetching problems:",
                    err
                );

                setError(
                    "Unable to load problems."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProblems();

    }, []);


    const filteredProblems =
        problems.filter((problem) => {

            const matchesSearch =
                problem.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesDifficulty =
                difficulty === "ALL" ||
                problem.difficulty === difficulty;

            const matchesConcept =
                concept === "ALL" ||
                problem.concept === concept;

            return (
                matchesSearch &&
                matchesDifficulty &&
                matchesConcept
            );

        });


    return (

        <div className="problems-page">

            <main className="problems-main">

                <section className="problems-header">

                    <span className="section-label">
                        PRACTICE
                    </span>

                    <h1>
                        Coding Problems
                    </h1>

                    <p>
                        Solve problems, strengthen your concepts,
                        and build a deeper understanding of your code.
                    </p>

                </section>


                <section className="problems-section">

                    <ProblemFilters
                        search={search}
                        setSearch={setSearch}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        concept={concept}
                        setConcept={setConcept}
                    />


                    {loading ? (

                        <div className="no-problems">

                            <h3>
                                Loading problems...
                            </h3>

                        </div>

                    ) : error ? (

                        <div className="no-problems">

                            <h3>
                                {error}
                            </h3>

                            <p>
                                Please make sure the backend is running.
                            </p>

                        </div>

                    ) : (

                        <>

                            <div className="problems-result-header">

                                <span>
                                    {filteredProblems.length} Problems
                                </span>

                            </div>


                            {filteredProblems.length > 0 ? (

                                <div className="problems-grid">

                                    {filteredProblems.map(
                                        (problem) => (

                                            <ProblemCard
                                                key={problem.id}
                                                problem={problem}
                                                onRequireLogin={
                                                    onRequireLogin
                                                }
                                            />

                                        )
                                    )}

                                </div>

                            ) : (

                                <div className="no-problems">

                                    <h3>
                                        No problems found
                                    </h3>

                                    <p>
                                        Try changing your search or filters.
                                    </p>

                                </div>

                            )}

                        </>

                    )}

                </section>

            </main>

        </div>
    );
}

export default Problems;
import { useState } from "react";
import "./ProblemFilters.css";

function ProblemFilters({
    search,
    setSearch,
    difficulty,
    setDifficulty,
    concept,
    setConcept
}) {

    const [difficultyOpen, setDifficultyOpen] = useState(false);
    const [conceptOpen, setConceptOpen] = useState(false);

    const difficultyOptions = [
        { value: "ALL", label: "All Difficulties" },
        { value: "EASY", label: "Easy" },
        { value: "MEDIUM", label: "Medium" },
        { value: "HARD", label: "Hard" }
    ];

    const conceptOptions = [
        { value: "ALL", label: "All Concepts" },
        { value: "HASH MAP", label: "Hash Map" },
        { value: "BINARY SEARCH", label: "Binary Search" },
        { value: "ARRAYS", label: "Arrays" },
        { value: "SLIDING WINDOW", label: "Sliding Window" },
        { value: "STACK", label: "Stack" },
        { value: "LINKED LIST", label: "Linked List" }
    ];

    const getDifficultyLabel = () => {
        return difficultyOptions.find(
            option => option.value === difficulty
        )?.label || "All Difficulties";
    };

    const getConceptLabel = () => {
        return conceptOptions.find(
            option => option.value === concept
        )?.label || "All Concepts";
    };

    const selectDifficulty = (value) => {
        setDifficulty(value);
        setDifficultyOpen(false);
    };

    const selectConcept = (value) => {
        setConcept(value);
        setConceptOpen(false);
    };

    return (
        <div className="problem-filters">

            {/* Search */}

            <div className="search-wrapper">

                <span className="search-icon">
                    ⌕
                </span>

                <input
                    type="text"
                    placeholder="Search problems..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            {/* Filters */}

            <div className="filter-group">

                {/* Difficulty */}

                <div className="custom-filter">

                    <button
                        type="button"
                        className={`custom-filter-button ${
                            difficultyOpen ? "open" : ""
                        }`}
                        onClick={() => {
                            setDifficultyOpen(!difficultyOpen);
                            setConceptOpen(false);
                        }}
                    >
                        <span>
                            {getDifficultyLabel()}
                        </span>

                        <span className="filter-arrow">
                            {difficultyOpen ? "⌃" : "⌄"}
                        </span>
                    </button>


                    {difficultyOpen && (
                        <div className="custom-filter-menu">

                            {difficultyOptions.map((option) => (

                                <button
                                    key={option.value}
                                    type="button"
                                    className={`custom-filter-option ${
                                        difficulty === option.value
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        selectDifficulty(option.value)
                                    }
                                >
                                    {option.label}
                                </button>

                            ))}

                        </div>
                    )}

                </div>


                {/* Concept */}

                <div className="custom-filter">

                    <button
                        type="button"
                        className={`custom-filter-button ${
                            conceptOpen ? "open" : ""
                        }`}
                        onClick={() => {
                            setConceptOpen(!conceptOpen);
                            setDifficultyOpen(false);
                        }}
                    >
                        <span>
                            {getConceptLabel()}
                        </span>

                        <span className="filter-arrow">
                            {conceptOpen ? "⌃" : "⌄"}
                        </span>
                    </button>


                    {conceptOpen && (
                        <div className="custom-filter-menu">

                            {conceptOptions.map((option) => (

                                <button
                                    key={option.value}
                                    type="button"
                                    className={`custom-filter-option ${
                                        concept === option.value
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        selectConcept(option.value)
                                    }
                                >
                                    {option.label}
                                </button>

                            ))}

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default ProblemFilters;
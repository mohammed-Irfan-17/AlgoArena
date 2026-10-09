import React from "react";
import { BookOpen } from "lucide-react";

import PracticeQuestionCard from "./PracticeQuestionCard/PracticeQuestionCard";
import "./PracticeQuestions.css";

function PracticeQuestions({ recommendations = [] }) {
    const validRecommendations = Array.isArray(recommendations)
        ? recommendations.filter(
              (problem) => problem && (problem.id != null || problem.problemId != null)
          )
        : [];

    return (
        <section className="practice-section">
            <div className="practice-header">
                <div className="practice-header-icon">
                    <BookOpen size={25} />
                </div>

                <div className="practice-header-content">
                    <span className="practice-label">
                        KEEP PRACTICING
                    </span>

                    <h2>Practice These Questions</h2>

                    <p>
                        Strengthen your understanding by solving related
                        problems. Select any question to start solving it.
                    </p>
                </div>
            </div>

            {validRecommendations.length > 0 ? (
                <div className="practice-question-grid">
                    {validRecommendations.map((problem, index) => (
                        <PracticeQuestionCard
                            key={problem.id ?? problem.problemId}
                            problem={problem}
                            index={index}
                        />
                    ))}
                </div>
            ) : (
                <div className="practice-empty">
                    <BookOpen size={24} />

                    <p>
                        No additional practice problems are available right
                        now. Keep solving problems to continue improving.
                    </p>
                </div>
            )}
        </section>
    );
}

export default PracticeQuestions;
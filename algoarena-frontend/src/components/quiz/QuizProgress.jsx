import React from "react";

function QuizProgress({
    currentQuestion,
    totalQuestions
}) {

    const progress =
        totalQuestions > 0
            ? (currentQuestion / totalQuestions) * 100
            : 0;

    return (
        <div className="quiz-progress-wrapper">

            <div className="quiz-progress-top">

                <span className="quiz-progress-label">
                    Question {currentQuestion} of {totalQuestions}
                </span>

                <span className="quiz-progress-percentage">
                    {Math.round(progress)}%
                </span>

            </div>

            <div className="quiz-progress-track">

                <div
                    className="quiz-progress-fill"
                    style={{
                        width: `${progress}%`
                    }}
                />

            </div>

            <div className="quiz-progress-steps">

                {Array.from({
                    length: totalQuestions
                }).map((_, index) => {

                    const questionNumber =
                        index + 1;

                    const completed =
                        questionNumber < currentQuestion;

                    const active =
                        questionNumber === currentQuestion;

                    return (
                        <div
                            key={questionNumber}
                            className={`
                                quiz-progress-step
                                ${completed ? "completed" : ""}
                                ${active ? "active" : ""}
                            `}
                        >
                            {completed
                                ? "✓"
                                : questionNumber}
                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default QuizProgress;
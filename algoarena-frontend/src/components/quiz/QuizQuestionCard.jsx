import React from "react";

function QuizQuestionCard({
    question,
    answer,
    setAnswer,
    onSubmit,
    submitting,
    isLastQuestion
}) {

    return (
        <section className="quiz-question-card">

            <div className="quiz-question-top">

                <div className="quiz-question-number">
                    <span>
                        {question.questionNumber}
                    </span>

                    <div>
                        <small>
                            QUESTION
                        </small>

                        <strong>
                            Conceptual Understanding
                        </strong>
                    </div>
                </div>

                <div className="quiz-question-type">
                    THINK
                </div>

            </div>


            <div className="quiz-question-body">

                <h2>
                    {question.question}
                </h2>

            </div>


            <div className="quiz-answer-section">

                <label htmlFor="quiz-answer">
                    Your explanation
                </label>

                <textarea
                    id="quiz-answer"

                    value={answer}

                    onChange={(event) =>
                        setAnswer(
                            event.target.value
                        )
                    }

                    placeholder={
                        "Explain your reasoning clearly. " +
                        "Focus on why the approach works..."
                    }

                    disabled={submitting}

                    rows={7}
                />

                <div className="quiz-answer-footer">

                    <span>
                        Explain in your own words.
                    </span>

                    <span>
                        {answer.length} characters
                    </span>

                </div>

            </div>


            <div className="quiz-submit-row">

                <button
                    className="quiz-submit-button"
                    onClick={onSubmit}
                    disabled={
                        submitting ||
                        !answer.trim()
                    }
                >

                    {submitting ? (

                        <>
                            <span className="quiz-button-spinner"></span>

                            Evaluating...
                        </>

                    ) : (

                        <>
                            {isLastQuestion
                                ? "Finish Quiz"
                                : "Submit Answer"}

                            <span className="quiz-submit-arrow">
                                →
                            </span>
                        </>

                    )}

                </button>

            </div>

        </section>
    );
}

export default QuizQuestionCard;

import React from "react";

function QuizAnswerInput({
    value,
    onChange,
    disabled
}) {
    return (
        <div className="quiz-answer-input">

            <label htmlFor="quiz-answer">
                Your answer
            </label>

            <textarea
                id="quiz-answer"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
                placeholder="Explain your reasoning..."
                rows={8}
                disabled={disabled}
            />

        </div>
    );
}

export default QuizAnswerInput;


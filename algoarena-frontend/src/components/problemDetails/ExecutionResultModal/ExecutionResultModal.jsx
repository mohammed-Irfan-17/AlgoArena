import "./ExecutionResultModal.css";

function ExecutionResultModal({
    result,
    loading,
    onClose,
    onStartQuiz
}) {

    if (loading) {
        return (
            <div className="execution-modal-overlay">

                <div className="execution-modal execution-loading-modal">

                    <div className="execution-loader">
                        <div className="execution-spinner"></div>
                    </div>

                    <span className="execution-modal-label">
                        CODE EXECUTION
                    </span>

                    <h2 className="execution-checking">
                        Checking your solution...
                    </h2>

                    <p className="execution-modal-message">
                        Running your code against the test cases.
                        Please wait.
                    </p>

                    <div className="execution-loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                </div>

            </div>
        );
    }

    if (!result) {
        return null;
    }

    const isAccepted =
        result.status === "ACCEPTED";

    const getTitle = () => {

        switch (result.status) {

            case "ACCEPTED":
                return "Accepted";

            case "WRONG_ANSWER":
                return "Wrong Answer";

            case "COMPILE_ERROR":
                return "Compilation Error";

            case "TIME_LIMIT":
                return "Time Limit Exceeded";

            default:
                return "Execution Error";
        }
    };

    return (
        <div className="execution-modal-overlay">

            <div className="execution-modal">

                <button
                    className="execution-modal-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <div
                    className={`execution-modal-icon ${
                        isAccepted
                            ? "success"
                            : "error"
                    }`}
                >
                    {isAccepted ? "✓" : "!"}
                </div>

                <span className="execution-modal-label">
                    EXECUTION RESULT
                </span>

                <h2
                    className={
                        isAccepted
                            ? "execution-success"
                            : "execution-error"
                    }
                >
                    {getTitle()}
                </h2>

                <div className="execution-score">

                    <strong>
                        {result.passedTestCases}
                    </strong>

                    <span>/</span>

                    <span>
                        {result.totalTestCases}
                    </span>

                    <small>
                        TEST CASES PASSED
                    </small>

                </div>

                <p className="execution-modal-message">
                    {result.message}
                </p>

                <div className="execution-modal-actions">

                    <button
                        className="execution-secondary-button"
                        onClick={onClose}
                    >
                        Back to Code
                    </button>

                    {isAccepted && (
                        <button
                            className="execution-primary-button"
                            onClick={onStartQuiz}
                        >
                            Start Quiz →
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}

export default ExecutionResultModal;


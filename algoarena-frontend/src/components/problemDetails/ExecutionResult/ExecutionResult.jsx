import "./ExecutionResult.css";

function ExecutionResult({ result }) {

    if (!result) {
        return null;
    }

    const isAccepted = result.status === "ACCEPTED";

    return (
        <section className={`execution-result ${isAccepted ? "accepted" : "failed"}`}>

            <div className="execution-result-header">

                <div>
                    <span className="execution-result-label">
                        EXECUTION RESULT
                    </span>

                    <h3>
                        {result.status.replace("_", " ")}
                    </h3>
                </div>

                <span className="execution-result-count">
                    {result.passedTestCases} / {result.totalTestCases}
                </span>

            </div>

            <p className="execution-result-message">
                {result.message}
            </p>

        </section>
    );
}

export default ExecutionResult;
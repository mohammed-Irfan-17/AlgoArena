import "./CodeEditor.css";

function CodeEditor({
    code,
    setCode,
    language,
    onSubmit
}) {

    return (
        <section className="code-editor">

            <div className="code-editor-header">

                <div>
                    <span className="code-editor-label">
                        CODE EDITOR
                    </span>

                    <span className="code-editor-language">
                        {language}
                    </span>
                </div>

                <span className="code-editor-status">
                    READY
                </span>

            </div>

            <div className="code-editor-body">

                <div className="line-numbers">
                    {code
                        .split("\n")
                        .map((_, index) => (
                            <span key={index}>
                                {index + 1}
                            </span>
                        ))}
                </div>

                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck="false"
                    placeholder="// Write your solution here..."
                    className="code-input"
                />

            </div>

            <div className="code-editor-footer">

                <span>
                    Write your solution and submit it for evaluation.
                </span>

                <button
                    className="submit-code-button"
                    onClick={onSubmit}
                >
                    Submit Code
                    <span>→</span>
                </button>

            </div>

        </section>
    );
}

export default CodeEditor;
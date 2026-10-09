import "./FeedbackHeader.css";

function FeedbackHeader() {
    return (
        <header className="feedback-header">
            <div className="feedback-header-content">
                <div className="feedback-header-badge">
                    <span className="feedback-header-badge-icon">✦</span>
                    AI-POWERED ANALYSIS
                </div>

                <h1 className="feedback-header-title">
                    Your Learning Feedback
                </h1>

                <p className="feedback-header-subtitle">
                    Understand your approach, discover areas for improvement,
                    and take the next step toward becoming a better problem solver.
                </p>
            </div>
        </header>
    );
}

export default FeedbackHeader;
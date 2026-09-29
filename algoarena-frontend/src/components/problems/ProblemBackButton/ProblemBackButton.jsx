import { useNavigate } from "react-router-dom";
import "./ProblemBackButton.css";

function ProblemBackButton() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/problems");
    };

    return (
        <button
            className="problem-back-button"
            onClick={goBack}
        >
            <span>←</span>
            Back to Problems
        </button>
    );
}

export default ProblemBackButton;
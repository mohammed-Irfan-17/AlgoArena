import { useNavigate } from "react-router-dom";
import "./ProblemCard.css";

function ProblemCard({ problem }) {

    const navigate = useNavigate();

    const openProblem = () => {
        navigate(`/problems/${problem.id}`);
    };

    return (
        <article
            className="problem-card"
            onClick={openProblem}
        >

            <div className="problem-card-top">

                <span
                    className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}
                >
                    {problem.difficulty}
                </span>

            </div>


            <h3>
                {problem.title}
            </h3>


            <div className="problem-card-bottom">

                <span>
                    Problem #{problem.id}
                </span>

                <button
                    onClick={(event) => {
                        event.stopPropagation();
                        openProblem();
                    }}
                >
                    Solve →
                </button>

            </div>

        </article>
    );
}

export default ProblemCard;
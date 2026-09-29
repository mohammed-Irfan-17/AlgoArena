
import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import ProblemDescription
    from "../../components/problemDetails/ProblemDescription/ProblemDescription";

import LanguageSelector
    from "../../components/problemDetails/LanguageSelector/LanguageSelector";

import CodeEditor
    from "../../components/problemDetails/CodeEditor/CodeEditor";

import ExecutionResult
    from "../../components/problemDetails/ExecutionResult/ExecutionResult";

import ProblemBackButton
    from "../../components/problems/ProblemBackButton/ProblemBackButton";

import ExecutionResultModal
    from "../../components/problemDetails/ExecutionResultModal/ExecutionResultModal";

import {
    getProblemById,
    runCode,
    createAcceptedSubmission,
    generateQuizQuestions
} from "../../services/problemService";

import "./ProblemDetails.css";


function ProblemDetails() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [problem, setProblem] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [language, setLanguage] =
        useState("Java");

    const [code, setCode] =
        useState("");

    const [executionResult, setExecutionResult] =
        useState(null);

    const [running, setRunning] =
        useState(false);

    const [startingQuiz, setStartingQuiz] =
        useState(false);


    /*
     * Load problem
     */
    useEffect(() => {

        const fetchProblem = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getProblemById(id);

                setProblem(data);

                setCode(
                    data.starterCode || ""
                );

                setExecutionResult(null);

            } catch (err) {

                console.error(
                    "Error fetching problem:",
                    err
                );

                setError(
                    "Unable to load this problem."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchProblem();

    }, [id]);


    /*
     * Execute Java code
     *
     * This existing execution flow
     * remains unchanged.
     */
    const handleSubmit = async () => {

        try {

            setRunning(true);
            setExecutionResult(null);

            const result =
                await runCode(
                    id,
                    code
                );

            console.log(
                "Execution result:",
                result
            );

            setExecutionResult(result);

        } catch (err) {

            console.error(
                "========== CODE EXECUTION ERROR =========="
            );

            console.error(err);

            setExecutionResult({
                status: "ERROR",
                totalTestCases: 0,
                passedTestCases: 0,
                message:
                    "Unable to execute the code."
            });

        } finally {

            setRunning(false);

        }
    };


    /*
     * ACCEPTED → Submission → Quiz
     */
    const handleStartQuiz = async () => {

        if (!executionResult ||
            executionResult.status !== "ACCEPTED") {
            return;
        }

        try {

            setStartingQuiz(true);

            /*
             * Prototype user.
             *
             * Authentication will replace this
             * later when the user system is connected.
             */
            const userId = 1;

            /*
             * Step 1:
             * Save the accepted submission.
             */
            const submission =
                await createAcceptedSubmission({
                    userId: userId,
                    problemId: Number(id),
                    code: code,
                    language: language
                });

            console.log(
                "Accepted submission:",
                submission
            );

            /*
             * Step 2:
             * Generate and save the 5 quiz questions.
             */
            const questions =
                await generateQuizQuestions(
                    submission.id,
                    Number(id)
                );

            console.log(
                "Generated quiz questions:",
                questions
            );

            if (!questions ||
                questions.length === 0) {

                throw new Error(
                    "No quiz questions were generated."
                );
            }

            /*
             * Step 3:
             * Open QuizPage.
             */
            navigate(
                `/quiz?submissionId=${submission.id}&userId=${userId}`
            );

        } catch (err) {

            console.error(
                "Unable to start quiz:",
                err
            );

            alert(
                "Unable to start the quiz. Please try again."
            );

        } finally {

            setStartingQuiz(false);

        }
    };


    if (loading) {

        return (
            <div className="problem-details-page">

                <div className="problem-details-container">

                    <div className="problem-details-loading">
                        Loading problem...
                    </div>

                </div>

            </div>
        );
    }


    if (error || !problem) {

        return (
            <div className="problem-details-page">

                <div className="problem-details-container">

                    <div className="problem-details-error">
                        {error || "Problem not found."}
                    </div>

                </div>

            </div>
        );
    }


    return (
        <div className="problem-details-page">

            <ProblemBackButton />

            <div className="problem-details-container">

                <div className="problem-details-top">

                    <div>

                        <span className="problem-details-page-label">
                            ALGOARENA / PROBLEMS
                        </span>

                        <h1>
                            Solve Problem
                        </h1>

                    </div>

                    <span className="problem-details-id">
                        Problem #{problem.id}
                    </span>

                </div>


                <div className="problem-details-workspace">

                    <div className="problem-details-left">

                        <ProblemDescription
                            problem={problem}
                        />

                    </div>


                    <div className="problem-details-right">

                        <div className="code-workspace">

                            <LanguageSelector
                                language={language}
                                setLanguage={setLanguage}
                            />

                            <CodeEditor
                                code={code}
                                setCode={setCode}
                                language={language}
                                onSubmit={handleSubmit}
                                running={running}
                            />

                            <ExecutionResult
                                result={executionResult}
                            />

                        </div>

                    </div>

                </div>

            </div>


            {(running || executionResult) && (

                <ExecutionResultModal
                    result={executionResult}
                    loading={
                        running || startingQuiz
                    }
                    onClose={() => {

                        if (!startingQuiz) {

                            setRunning(false);
                            setExecutionResult(null);

                        }

                    }}
                    onStartQuiz={
                        handleStartQuiz
                    }
                />

            )}

        </div>
    );
}


export default ProblemDetails;


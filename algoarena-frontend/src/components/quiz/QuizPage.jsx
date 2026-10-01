import React, {
    useEffect,
    useState
} from "react";

import {
    useSearchParams,
    useNavigate
} from "react-router-dom";

import QuizProgress from "./QuizProgress";
import QuizQuestionCard from "./QuizQuestionCard";

import "./QuizPage.css";

function QuizPage() {

    const [searchParams] =
        useSearchParams();

    const navigate =
        useNavigate();

    const submissionId =
        searchParams.get("submissionId");

    const userId =
        searchParams.get("userId");

    const [questions, setQuestions] =
        useState([]);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [answer, setAnswer] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState("");


    /*
     * ===============================
     * LOAD QUIZ QUESTIONS
     * ===============================
     */

    useEffect(() => {

        if (!submissionId) {

            setError(
                "Quiz submission could not be identified."
            );

            setLoading(false);

            return;
        }

        loadQuestions();

    }, [submissionId]);


    async function loadQuestions() {

        try {

            setLoading(true);
            setError("");

            const response =
                await fetch(
                    `http://localhost:8080/api/quiz-questions/submission/${submissionId}`
                );

            if (!response.ok) {

                throw new Error(
                    "Failed to load quiz questions"
                );
            }

            const data =
                await response.json();

            const sortedQuestions =
                [...data].sort(
                    (a, b) =>
                        a.questionNumber -
                        b.questionNumber
                );

            setQuestions(
                sortedQuestions
            );

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load quiz questions."
            );

        } finally {

            setLoading(false);
        }
    }


    /*
     * ===============================
     * SUBMIT ANSWER
     * ===============================
     */

    async function submitAnswer() {

        if (!answer.trim()) {
            return;
        }

        if (!questions[currentIndex]) {
            return;
        }

        if (!submissionId || !userId) {

            setError(
                "Quiz session information is missing."
            );

            return;
        }

        try {

            setSubmitting(true);
            setError("");

            const currentQuestion =
                questions[currentIndex];


            const response =
                await fetch(
                    "http://localhost:8080/api/quiz-answers",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            questionId:
                                currentQuestion.id,

                            submissionId:
                                Number(submissionId),

                            userId:
                                Number(userId),

                            answer:
                                answer.trim()
                        })
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to submit answer"
                );
            }


            /*
             * Backend saves the answer
             * and evaluates it privately.
             */

            await response.json();


            const isLastQuestion =
                currentIndex ===
                questions.length - 1;


            /*
             * ===============================
             * QUIZ COMPLETED
             * ===============================
             */

            if (isLastQuestion) {

                navigate(
                    `/final-feedback?submissionId=${submissionId}&userId=${userId}`
                );

                return;
            }


            /*
             * ===============================
             * NEXT QUESTION
             * ===============================
             */

            setCurrentIndex(
                currentIndex + 1
            );

            setAnswer("");


        } catch (err) {

            console.error(err);

            setError(
                "Unable to submit your answer. Please try again."
            );

        } finally {

            setSubmitting(false);
        }
    }


    /*
     * ===============================
     * LOADING
     * ===============================
     */

    if (loading) {

        return (
            <div className="quiz-page">

                <div className="quiz-loading-card">

                    <div className="quiz-spinner"></div>

                    <h2>
                        Preparing your quiz
                    </h2>

                    <p>
                        Loading your understanding
                        questions...
                    </p>

                </div>

            </div>
        );
    }


    /*
     * ===============================
     * ERROR
     * ===============================
     */

    if (
        error &&
        questions.length === 0
    ) {

        return (
            <div className="quiz-page">

                <div className="quiz-error-card">

                    <div className="quiz-error-icon">
                        !
                    </div>

                    <h2>
                        Unable to load quiz
                    </h2>

                    <p>
                        {error}
                    </p>

                </div>

            </div>
        );
    }


    /*
     * ===============================
     * NO QUESTIONS
     * ===============================
     */

    if (questions.length === 0) {

        return (
            <div className="quiz-page">

                <div className="quiz-error-card">

                    <h2>
                        No quiz questions found
                    </h2>

                    <p>
                        Please return to the problem
                        and try again.
                    </p>

                </div>

            </div>
        );
    }


    const currentQuestion =
        questions[currentIndex];

    const isLastQuestion =
        currentIndex ===
        questions.length - 1;


    /*
     * ===============================
     * QUIZ UI
     * ===============================
     */

    return (
        <div className="quiz-page">
    
            <div className="quiz-container">
                

                <header className="quiz-header">

                    <div className="quiz-header-badge">

                        <span className="quiz-badge-dot"></span>

                        UNDERSTANDING CHECK

                    </div>

                    <h1>
                        Test Your Understanding
                    </h1>

                    <p>
                        Your code was accepted.
                        Now explain the ideas behind
                        your solution.
                    </p>

                </header>


                <QuizProgress
                    currentQuestion={
                        currentIndex + 1
                    }
                    totalQuestions={
                        questions.length
                    }
                />


                {error && (

                    <div className="quiz-inline-error">

                        <span>!</span>

                        {error}

                    </div>

                )}


                <QuizQuestionCard

                    question={
                        currentQuestion
                    }

                    answer={
                        answer
                    }

                    setAnswer={
                        setAnswer
                    }

                    onSubmit={
                        submitAnswer
                    }

                    submitting={
                        submitting
                    }

                    isLastQuestion={
                        isLastQuestion
                    }

                />


                <div className="quiz-footer">

                    <span>
                        Your answers are evaluated
                        privately to understand
                        your learning progress.
                    </span>

                </div>

            </div>

        </div>
    );
}

export default QuizPage;
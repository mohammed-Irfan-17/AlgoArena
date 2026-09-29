import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Problems from "./pages/Problems/Problems";
import ProblemDetails from "./pages/ProblemDetails/ProblemDetails";

import Dashboard from "./pages/Dashboard/Dashboard";

import QuizPage from "./components/quiz/QuizPage";
import FeedbackPage from "./components/feedback/FeedbackPage";

import Navbar from "./components/homepage/Navbar/Navbar";


function App() {

    return (
        <BrowserRouter>

            {/* <Navbar /> */}

            <Routes>

                {/* Home */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* Problems */}

                <Route
                    path="/problems"
                    element={<Problems />}
                />


                {/* Problem Details */}

                <Route
                    path="/problems/:id"
                    element={<ProblemDetails />}
                />


                {/* Dashboard */}

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />


                {/* Quiz */}

                <Route
                    path="/quiz"
                    element={
                        <QuizPage
                            onQuizComplete={() => {

                                const params =
                                    new URLSearchParams(
                                        window.location.search
                                    );

                                const submissionId =
                                    params.get(
                                        "submissionId"
                                    );

                                const userId =
                                    params.get(
                                        "userId"
                                    );

                                window.location.href =
                                    `/feedback?submissionId=${submissionId}&userId=${userId}`;
                            }}
                        />
                    }
                />


                {/* Final Feedback */}

                <Route
                    path="/feedback"
                    element={
                        <FeedbackPage />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;
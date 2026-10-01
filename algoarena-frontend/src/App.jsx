import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Problems from "./pages/Problems/Problems";
import ProblemDetails from "./pages/ProblemDetails/ProblemDetails";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import QuizPage from "./components/quiz/QuizPage";
import FinalFeedbackPage from "./pages/FinalFeedback/FinalFeedback";

function App() {

    return (
        <BrowserRouter>

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

                {/* Understanding Quiz */}
                <Route
                    path="/quiz"
                    element={<QuizPage />}
                />

                {/* Final Feedback */}
                <Route
                    path="/feedback"
                    element={<FinalFeedbackPage />}
                />
                <Route
    path="/login"
    element={<Login />}
/>
<Route
    path="/register"
    element={<Register />}
/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/homepage/Footer/Footer";

import DashboardHeader
    from "../../components/dashboard/DashboardHeader/DashboardHeader";

import DashboardOverview
    from "../../components/dashboard/DashboardOverview/DashboardOverview";

import ConceptProgress
    from "../../components/dashboard/ConceptProgress/ConceptProgress";

import {
    getLoggedInUserId
} from "../../services/authUtils";

import ConceptStatus
    from "../../components/dashboard/ConceptStatus/ConceptStatus";

import RecommendedProblems
    from "../../components/dashboard/RecommendedProblems/RecommendedProblems";

    import DashboardQuote
    from "../../components/dashboard/DashboardQuote/DashboardQuote";

import "./Dashboard.css";

const API_URL = "http://localhost:8080";

function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    /*
     * ===============================
     * LOAD DASHBOARD
     * ===============================
     */

    const loadDashboard = async (userId) => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/dashboard/user/${userId}`
            );

            if (!response.ok) {

                throw new Error(
                    "Failed to load dashboard."
                );

            }

            const data = await response.json();

            setDashboard(data);

        } catch (err) {

            console.error(
                "Dashboard loading error:",
                err
            );

            setError(
                "Unable to load your dashboard."
            );

        } finally {

            setLoading(false);

        }
    };


    /*
     * ===============================
     * CHECK LOGIN + LOAD
     * ===============================
     */
useEffect(() => {

    const loggedInUserId =
        getLoggedInUserId();

    if (!loggedInUserId) {

        navigate("/login", {
            replace: true
        });

        return;
    }


    loadDashboard(loggedInUserId);


    /*
     * Refresh when the user returns to
     * the browser tab.
     */
    const handleVisibilityChange = () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            loadDashboard(loggedInUserId);
        }
    };


    document.addEventListener(
        "visibilitychange",
        handleVisibilityChange
    );


    /*
     * Allow other parts of AlgoArena
     * to explicitly request a refresh.
     */
    const handleDashboardRefresh = () => {

        loadDashboard(loggedInUserId);
    };


    window.addEventListener(
        "dashboardUpdated",
        handleDashboardRefresh
    );


    return () => {

        document.removeEventListener(
            "visibilitychange",
            handleVisibilityChange
        );

        window.removeEventListener(
            "dashboardUpdated",
            handleDashboardRefresh
        );
    };

}, [navigate]);


    /*
     * ===============================
     * LOADING
     * ===============================
     */

    if (loading) {

        return (
            <div className="dashboard-state-page">

                <div className="dashboard-state-card">

                    <div className="dashboard-spinner"></div>

                    <h2>
                        Preparing your dashboard
                    </h2>

                    <p>
                        Loading your learning progress...
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

    if (error) {

        return (
            <>

                <div className="dashboard-state-page">

                    <div className="dashboard-state-card dashboard-error-card">

                        <div className="dashboard-error-icon">
                            !
                        </div>

                        <h2>
                            Unable to load dashboard
                        </h2>

                        <p>
                            {error}
                        </p>

                        <button
                            onClick={() => {

                                const userId =
                                    getLoggedInUserId();

                                if (userId) {
                                    loadDashboard(userId);
                                }

                            }}
                            className="dashboard-retry-button"
                        >
                            Try Again
                        </button>

                    </div>

                </div>

                <Footer />

            </>
        );
    }


    /*
     * ===============================
     * DASHBOARD DATA
     * ===============================
     */

    const progress =
        dashboard?.progress || [];


    const recommendations =
        dashboard?.recommendations || [];


    /*
     * ===============================
     * PAGE
     * ===============================
     */

    return (

        <div className="dashboard-page">

            <main className="dashboard-container">

                <DashboardHeader />


                <DashboardOverview
    solvedQuestions={
        dashboard?.solvedQuestions || 0
    }
    totalQuestions={
        dashboard?.totalQuestions || 0
    }
    overallPercentage={
        dashboard?.overallPercentage || 0
    }
/>


                <ConceptProgress
                    progress={progress}
                />


                <ConceptStatus
    conceptStatuses={dashboard?.conceptStatuses || []}
    progress={progress}
/>

<RecommendedProblems
    recommendations={recommendations}
/>

         <DashboardQuote />

            </main>

            <Footer />

        </div>
    );
}

export default Dashboard;
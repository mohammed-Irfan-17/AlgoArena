import React from "react";
import {
    Navigate,
    useLocation
} from "react-router-dom";

import {
    isUserLoggedIn
} from "../../../services/authUtils";


function ProtectedRoute({ children }) {

    const location =
        useLocation();

    if (!isUserLoggedIn()) {

        return (
            <Navigate
                to={`/login?redirect=${encodeURIComponent(
                    location.pathname + location.search
                )}`}
                replace
            />
        );
    }

    return children;
}


export default ProtectedRoute;
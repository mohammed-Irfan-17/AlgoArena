import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/userService";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(event) {

        event.preventDefault();

        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Please enter your email and password.");
            return;
        }

        try {

            setLoading(true);

            const user = await loginUser(
                email.trim(),
                password
            );

            localStorage.setItem(
                "algoarenaUser",
                JSON.stringify(user)
            );

            localStorage.setItem(
                "userId",
                String(user.userId)
            );

            navigate("/");

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to login. Please check your credentials."
            );

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="auth-overlay">

            {/* Blurred background */}

            <div className="auth-background">

                <div className="auth-background-content">

                    <div className="auth-bg-logo">
                        A
                    </div>

                    <h1>
                        AlgoArena
                    </h1>

                    <p>
                        Learn. Solve. Understand.
                    </p>

                </div>

            </div>


            {/* Modal */}

            <div className="auth-modal">

                <button
                    className="auth-close"
                    onClick={() => navigate("/")}
                    aria-label="Close login"
                >
                    ×
                </button>


                {/* Brand */}

                <div className="auth-brand">

                    <div className="auth-brand-icon">
                        A
                    </div>

                    <span>
                        AlgoArena
                    </span>

                </div>


                {/* Header */}

                <div className="auth-header">

                    <span className="auth-label">
                        WELCOME BACK
                    </span>

                    <h1>
                        Continue Learning
                    </h1>

                    <p>
                        Sign in to continue your coding
                        journey.
                    </p>

                </div>


                {/* Error */}

                {error && (

                    <div className="auth-error">

                        <span>!</span>

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                {/* Form */}

                <form
                    className="auth-form"
                    onSubmit={handleLogin}
                >

                    <div className="auth-field">

                        <label htmlFor="login-email">
                            Email
                        </label>

                        <input
                            id="login-email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />

                    </div>


                    <div className="auth-field">

                        <div className="auth-label-row">

                            <label htmlFor="login-password">
                                Password
                            </label>

                            <span>
                                Secure login
                            </span>

                        </div>

                        <input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In"
                        }

                        {!loading && (
                            <span>→</span>
                        )}

                    </button>

                </form>


                {/* Switch */}

                <div className="auth-switch">

                    <span>
                        Don't have an account?
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Create account
                    </button>

                </div>


                <div className="auth-footer">
                    Learn. Solve. Understand.
                </div>

            </div>

        </div>
    );
}

export default Login;
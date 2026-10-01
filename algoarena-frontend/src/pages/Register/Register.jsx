import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../services/userService";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleRegister(event) {

        event.preventDefault();

        setError("");

        if (
            !name.trim() ||
            !email.trim() ||
            !password.trim()
        ) {
            setError(
                "Please complete all fields."
            );

            return;
        }

        if (password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }

        try {

            setLoading(true);

            await registerUser(
                name.trim(),
                email.trim(),
                password
            );

            /*
             * Registration successful.
             * Send student to login.
             */
            navigate("/login");

        } catch (error) {

            console.error(error);

            setError(
                error.message ||
                "Unable to create your account."
            );

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="register-overlay">

            <div className="register-background">

                <div className="register-bg-content">

                    <div className="register-bg-logo">
                        A
                    </div>

                    <h1>
                        AlgoArena
                    </h1>

                    <p>
                        Start your learning journey.
                    </p>

                </div>

            </div>


            <div className="register-modal">

                <button
                    className="register-close"
                    onClick={() => navigate("/")}
                    aria-label="Close registration"
                >
                    ×
                </button>


                <div className="register-brand">

                    <div className="register-brand-icon">
                        A
                    </div>

                    <span>
                        AlgoArena
                    </span>

                </div>


                <div className="register-header">

                    <span className="register-label">
                        GET STARTED
                    </span>

                    <h1>
                        Create Your Account
                    </h1>

                    <p>
                        Join AlgoArena and start building
                        your problem-solving skills.
                    </p>

                </div>


                {error && (

                    <div className="register-error">

                        <span>!</span>

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                <form
                    className="register-form"
                    onSubmit={handleRegister}
                >

                    <div className="register-field">

                        <label htmlFor="register-name">
                            Full Name
                        </label>

                        <input
                            id="register-name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                        />

                    </div>


                    <div className="register-field">

                        <label htmlFor="register-email">
                            Email
                        </label>

                        <input
                            id="register-email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />

                    </div>


                    <div className="register-field">

                        <label htmlFor="register-password">
                            Password
                        </label>

                        <input
                            id="register-password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="register-submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating account..."
                            : "Create Account"
                        }

                        {!loading && (
                            <span>→</span>
                        )}

                    </button>

                </form>


                <div className="register-switch">

                    <span>
                        Already have an account?
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Sign in
                    </button>

                </div>


                <div className="register-footer">
                    Learn. Solve. Understand.
                </div>

            </div>

        </div>
    );
}

export default Register;
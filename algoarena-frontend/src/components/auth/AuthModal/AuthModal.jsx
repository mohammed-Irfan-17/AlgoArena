import { useState } from "react";
import "./AuthModal.css";
import { loginUser, registerUser } from "../../../services/authService";

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [activeTab, setActiveTab] = useState("login");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    if (!isOpen) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        setError("");
        setSuccess("");

        setFormData({
            name: "",
            email: "",
            password: "",
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            if (activeTab === "register") {
                const response = await registerUser({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });

                setSuccess(
                    `Account created successfully, ${response.name}!`
                );

                setTimeout(() => {
                    setActiveTab("login");

                    setFormData({
                        name: "",
                        email: formData.email,
                        password: "",
                    });

                    setSuccess("");
                }, 1200);

            } else {
                const response = await loginUser({
    email: formData.email,
    password: formData.password,
});

console.log("LOGIN RESPONSE:", response);

// Save logged-in user
localStorage.setItem(
    "algoarenaUser",
    JSON.stringify(response)
);

console.log(
    "SAVED USER:",
    localStorage.getItem("algoarenaUser")
);
            }

        } catch (error) {
            console.error("Authentication error:", error);

            if (
                error.response &&
                error.response.data
            ) {
                if (typeof error.response.data === "string") {
                    setError(error.response.data);
                } else if (error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError("Authentication failed.");
                }
            } else {
                setError(
                    "Unable to connect to the server."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="auth-overlay"
            onClick={onClose}
        >
            <div
                className="auth-modal"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <button
                    className="auth-close"
                    onClick={onClose}
                    type="button"
                >
                    ×
                </button>

                <div className="auth-header">
                    <div className="auth-logo">
                        A
                    </div>

                    <h2>
                        {activeTab === "login"
                            ? "Welcome Back"
                            : "Create Your Account"}
                    </h2>

                    <p>
                        {activeTab === "login"
                            ? "Login to continue your AlgoArena journey."
                            : "Join AlgoArena and start improving your coding skills."}
                    </p>
                </div>

                <div className="auth-tabs">
                    <button
                        type="button"
                        className={
                            activeTab === "login"
                                ? "auth-tab active"
                                : "auth-tab"
                        }
                        onClick={() =>
                            switchTab("login")
                        }
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        className={
                            activeTab === "register"
                                ? "auth-tab active"
                                : "auth-tab"
                        }
                        onClick={() =>
                            switchTab("register")
                        }
                    >
                        Register
                    </button>
                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    {activeTab === "register" && (
                        <div className="auth-field">
                            <label>Name</label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="auth-field">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>

                    {error && (
                        <div className="auth-message error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="auth-message success">
                            {success}
                        </div>
                    )}

                    <button
                        className="auth-submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : activeTab === "login"
                                ? "Login"
                                : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;
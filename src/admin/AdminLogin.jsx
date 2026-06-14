import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(
            email === "admin@alshorouq.com" && 
            password ==="123456"
        ) {
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
        } else {
            alert("Invalid email or password.");
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="container-fluid min-vh-100">
            <div className="row min-vh-100">

                {/* Left Side */}
                <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-center align-items-center bg-success text-white p-5">
                    <h1 className="display-4 fw-bold mb-3">
                        🥬 Al-Shorouq Store
                    </h1>

                    <p className="fs-4 text-center">
                        Fresh • Healthy • Delivered
                    </p>

                    <p className="text-center mt-4 opacity-75">
                        Manage your store efficiently and keep everything under control.
                    </p>
                </div>

                {/* Left Side */}
                <div className="col-lg-7 d-flex justify-content-center align-items-center">
                    <div 
                        className="card shadow border-0 p-4"
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            borderRadius: "20px",
                        }}
                        >
                            <div className="card-body">
                                <h2 className="fw-bold mb-2">
                                    Welcome Back 👋
                                </h2>

                                <p className="text-muted mb-4">
                                    Sign in to access the admin dashboard.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Email 
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="admin mail"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Password 
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                className="form-control"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />

                                            <button 
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? "🙈" : "👁️"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="form-check mb-4">
                                        <input 
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />

                                        <label className="form-check-label">
                                            Remember Me
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-success w-100 py-2">
                                            Login
                                        </button>

                                        <Link
                                            to="/"
                                            className="btn btn-outline-secondary w-100 mt-3">
                                                ← Back to Store
                                            </Link>
                                </form>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin;
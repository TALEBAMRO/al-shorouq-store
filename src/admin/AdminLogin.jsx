import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            email === "admin@alshorouq.com" &&
            password === "123456"
        ) {
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className="container-fluid min-vh-100">
            <div className="row min-vh-100">

                {/* Branding Side */}
                <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-center align-items-center bg-success text-white p-5">

                    <h1 className="display-3 fw-bold text-center mb-4">
                        Al-Shorouq Store🥬
                    </h1>

                    <p className="fs-3 text-center mb-4">
                        Fresh • Healthy • Delivered
                    </p>

                    <p className="text-center opacity-75 fs-5">
                        Manage your store efficiently and keep everything under control.
                    </p>

                </div>

                {/* Login Side */}
                <div className="col-lg-7 d-flex justify-content-center align-items-center bg-light">

                    <div
                        className="card border-0 p-4"
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            borderRadius: "24px",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                        }}
                    >
                        <div className="card-body">

                            <div className="text-center mb-4">
                                <h2 className="fw-bold">
                                    Welcome Back 👋
                                </h2>

                                <p className="text-muted">
                                    Sign in to access the admin dashboard.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control py-2"
                                        placeholder="Enter admin email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Password
                                    </label>

                                    <div className="position-relative">

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control py-2 pe-5"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? "🙈" : "👁️"}
                                        </button>

                                    </div>
                                </div>

                                {/* Remember Me */}
                                <div className="form-check mb-4">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />

                                    <label
                                        htmlFor="remember"
                                        className="form-check-label ms-2"
                                    >
                                        Remember Me
                                    </label>
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="btn btn-success w-100 py-3 fw-semibold"
                                >
                                    Login
                                </button>

                                {/* Back Button */}
                                <Link
                                    to="/"
                                    className="btn btn-outline-secondary w-100 mt-3 py-3"
                                >
                                    ← Back to Store
                                </Link>

                            </form>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default AdminLogin;

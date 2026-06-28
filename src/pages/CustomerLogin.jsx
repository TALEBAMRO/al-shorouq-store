import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginCustomer } from "../services/customerService";

function CustomerLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] =  useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const data = await loginCustomer(
                email.trim(),
                password
            );

            localStorage.setItem(
                "customerToken",
                data.token 
            );

            localStorage.setItem(
                "currentCustomer",
                JSON.stringify(data.customer)
            );

            alert(`مرحباً بعودتك ${data.customer.full_name}`);
            navigate("/");
        } catch (error) {
            alert(
                error.response?.data?.error || "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="container py-5" dir="rtl">
            <div className="row justify-content-center">
                <div className="col-lg-6">

                    <div 
                        className="card shadow border-0"
                        style={{ borderRadius: "20px" }}
                    >
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">
                                    مرحباً بك 
                                </h2>

                                <p className="text-muted">
                                    قم بتسجيل الدخول الى حسابك
                                </p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">
                                        البريد الإلكتروني 
                                    </label>

                                    <input 
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        كلمة المرور 
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100 py-2"
                                    disabled={loading}
                                >
                                    {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                                </button>
                                    <div className="text-center mt-4">
                                        <span>
                                            لا تملك حساب؟
                                        </span>
                                        <br />
                                        <Link
                                            to="/register"
                                            className="text-success fw-bold text-decoration-none ms-2">
                                                أنشئ حساب 
                                            </Link>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerLogin;
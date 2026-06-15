import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CustomerRegister() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage("");

        if (
            !fullName ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {
            setMessage("يرجى تعبئة جميع الحقول.");
            setMessageType("danger");
            return;
        }

        if (password.length < 6) {
            setMessage("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.");
            setMessageType("danger");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("كلمتا المرور غير متطابقتين.");
            setMessageType("danger");
            return;
        }

        const customers =
            JSON.parse(localStorage.getItem("customers")) || [];

        const existingCustomer = customers.find(
            (customer) => customer.email === email
        );

        if (existingCustomer) {
            setMessage("هذا البريد الإلكتروني مستخدم مسبقاً.");
            setMessageType("danger");
            return;
        }

        const newCustomer = {
            id: Date.now(),
            name: fullName,
            email,
            phone,
            password,
        };

        customers.push(newCustomer);

        localStorage.setItem(
            "customers",
            JSON.stringify(customers)
        );

        setMessage("تم إنشاء الحساب بنجاح.");
        setMessageType("success");

        setTimeout(() => {
            navigate("/products");
        }, 1500);
    };

    return (
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
                                    إنشاء حساب جديد
                                </h2>

                                <p className="text-muted">
                                    انضم إلى متجر الشروق وابدأ التسوق
                                </p>
                            </div>

                            {message && (
                                <div
                                    className={`alert alert-${messageType}`}
                                >
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        الاسم الكامل
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="أدخل اسمك الكامل"
                                        value={fullName}
                                        onChange={(e) =>
                                            setFullName(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        البريد الإلكتروني
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="أدخل بريدك الإلكتروني"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        رقم الهاتف
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="059xxxxxxxx"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        كلمة المرور
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="أدخل كلمة المرور"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        تأكيد كلمة المرور
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="أعد إدخال كلمة المرور"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100 py-2"
                                >
                                    إنشاء الحساب
                                </button>

                                <div className="text-center mt-4">
                                    <span>
                                        لديك حساب بالفعل؟
                                    </span>

                                    <br />

                                    <Link
                                        to="/products"
                                        className="text-success fw-bold text-decoration-none"
                                    >
                                        تسجيل الدخول
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

export default CustomerRegister;
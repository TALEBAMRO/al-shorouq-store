import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/cart-context";

function Navbar() {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const customerToken = localStorage.getItem("customerToken");
    const customerData = localStorage.getItem("currentCustomer");

    let currentCustomer = null;

    if (customerToken && customerData) {
        try {
            currentCustomer = JSON.parse(customerData);
        } catch (error) {
            console.error("Invalid currentCustomer:", error);

            localStorage.removeItem("customerToken");
            localStorage.removeItem("currentCustomer");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("customerToken");
        localStorage.removeItem("currentCustomer");

        navigate("/", {
            replace: true,
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
            <div className="container-fluid">

                <Link
                    className="navbar-brand fw-bold fs-4"
                    to="/"
                >
                    🌿 الشروق للخضار والفواكه
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >
                    <ul className="navbar-nav me-auto fw-bold fs-4">

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/"
                            >
                                الرئيسية
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/products"
                            >
                                المنتجات
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link d-flex align-items-center gap-2"
                                to="/cart"
                            >
                                <span>السلة</span>

                                {cartCount > 0 && (
                                    <span className="badge bg-danger rounded-pill">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to="/orders"
                            >
                                طلباتي
                            </Link>
                        </li>

                        {currentCustomer ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-warning fw-bold"
                                        to="/profile"
                                    >
                                        مرحباً {currentCustomer.full_name}
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <button
                                        className="btn btn-success rounded-pill px-3 py-2 fs-5 fw-bold text-light"
                                        style={{ marginTop: "6px" }}
                                        onClick={handleLogout}
                                    >
                                        تسجيل الخروج
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/login"
                                >
                                    تسجيل الدخول
                                </Link>
                            </li>
                        )}

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const currentCustomer = JSON.parse(localStorage.getItem("currentCustomer"));

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const myOrders = allOrders.filter(
        order => order.customerId === currentCustomer.email 
    );

    const handleLogout = () => {
        localStorage.removeItem("currentCustomer");
        navigate("/");
    };

    const totalSpent = myOrders.reduce(
        (total, order) => total + order.totalPrice, 0
    );

    const latestOrder = myOrders.length > 0
                        ? myOrders[myOrders.length - 1]
                        : null;

    return (
    <div className="container py-5">

        <h1 className="text-center fw-bold mb-5">
            حسابي الشخصي
        </h1>

        <div className="row g-4">

            {/* Sidebar */}
            <div className="col-lg-3">

                <div className="card shadow border-0 h-100">

                    <div className="card-body text-center">

                        <div 
                            className="rounded-circle text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                            style={{
                                width: "120px",
                                height: "120px",
                                fontSize: "48px",
                                background: "linear-gradient(135deg, #198754, #20c997)"
                            }}
                        >
                            {currentCustomer.name.charAt(0).toUpperCase()}
                        </div>

                        <h4 className="fw-bold">
                            {currentCustomer.name}
                        </h4>

                        <p className="text-muted">
                            {currentCustomer.email}
                        </p>

                        <p className="badge bg-primary">
                            عضو منذ 2026
                        </p>

                        <hr />

                        <div className="d-grid gap-2">

                            <Link
                                to="/orders"
                                className="btn btn-success"
                            >
                                📦 طلباتي
                            </Link>

                            <Link
                                to="/products"
                                className="btn btn-outline-success"
                            >
                                🛒 متابعة التسوق
                            </Link>

                            <button
                                className="btn btn-danger"
                                onClick={handleLogout}
                            >
                                🚪 تسجيل الخروج
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* Statistics */}
            <div className="col-lg-3">

                <div className="card shadow border-0 mb-3">
                    <div className="card-body text-center">
                        <h2 className="fw-bold text-success">
                            {myOrders.length}
                        </h2>
                        <p className="mb-0">
                            عدد الطلبات
                        </p>
                    </div>
                </div>

                <div className="card shadow border-0">
                    <div className="card-body text-center">
                        <h2 className="fw-bold text-success">
                            {totalSpent} ₪
                        </h2>
                        <p className="mb-0">
                            إجمالي المشتريات
                        </p>
                    </div>
                </div>

            </div>

            {/* Latest Order */}
            <div className="col-lg-3">

                <div className="card shadow border-0 h-100">

                    <div className="card-body">

                        <h5 className="fw-bold mb-3">
                            آخر طلب
                        </h5>

                        {latestOrder ? (
                            <>
                                <p>
                                    رقم الطلب:
                                    {" "}
                                    #{latestOrder.id}
                                </p>

                                <p>
                                    <span className="badge bg-warning text-dark">
                                        الحالة:
                                        {" "}
                                        {latestOrder.status}
                                    </span>
                                </p>

                                <p>
                                    المجموع:
                                    {" "}
                                    {latestOrder.totalPrice} ₪
                                </p>
                            </>
                        ) : (
                            <p className="text-muted">
                                لا توجد طلبات
                            </p>
                        )}

                    </div>

                </div>

            </div>

            {/* Recent Orders */}
            <div className="col-lg-3">

                <div className="card shadow border-0 h-100">

                    <div className="card-body">

                        <h5 className="fw-bold mb-3">
                            آخر الطلبات
                        </h5>

                        {myOrders.slice(-3).reverse().map(order => (
                            <div
                                key={order.id}
                                className="border rounded p-2 mb-2"
                            >
                                <div>
                                    #{order.id}
                                </div>

                                <small className="d-block text-success">
                                    {order.totalPrice} ₪
                                </small>

                                <span className="badge bg-warning text-dark mt-1">
                                    {order.status}
                                </span>
                            </div>
                        ))}

                    </div>

                </div>

            </div>

        </div>

    </div>
);
}

export default Profile;
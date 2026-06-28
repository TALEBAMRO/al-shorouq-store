import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getOrderByCustomer } from "../services/orderService";

function Profile() {
    const navigate = useNavigate();

    const currentCustomer = JSON.parse(
        localStorage.getItem("currentCustomer")
    ) || null;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentCustomer) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                const data = await getOrderByCustomer(
                    currentCustomer.email 
                );
                setOrders(data);
            } catch (error) {
                console.error(error);
                alert("Failed to load profile :(");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentCustomer, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("customerToken");
        localStorage.removeItem("currentCustomer");

        navigate("/");
    };

    const totalSpent = orders.reduce(
        (total, order) => total + Number(order.total_price),
        0
    );

    const latestOrder = orders.at(-1) || null;
    
    const recentOrders = [...orders]
        .reverse()
        .slice(0, 3);

        if (loading) {
            return(
                <div className="container py-5">
                    Loading...
                </div>
            );
        }

        return (
            <div className="container py-5">
                <h1 className="text-center fw-bold mb-5">
                    حسابي الشخصي
                </h1> 
                <div className="row g-4">
                    {/*Left Side*/}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-lg rounded-4 h-100">
                            <div className="card-body text-center p-5">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 text-white fw-bold"
                                    style={{
                                        width: "110px",
                                        height: "110px",
                                        fontSize: "48px",
                                        background: "linear-gradient(135deg, #198754, #20c997)",
                                        boxShadow: "0 8px 20px rgba(25,135,48,.25)"
                                    }}
                                >
                                    {currentCustomer.full_name
                                        .charAt(0)
                                        .toUpperCase()
                                    }
                                </div>

                                <h3 className="fw-bold mb-2">
                                    {currentCustomer.full_name}
                                </h3>

                                <p className="text-muted mb-1">
                                    {currentCustomer.email}
                                </p>

                                <p className="text-muted mb-4">
                                    {currentCustomer.phone}
                                </p>

                                <span className="badge bg-success px-3 py-2 mb-4">
                                    عضو في متجر الشروق
                                </span>

                                <div className="d-grid gap-3">
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
                                        🚪تسجيل الخروج
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Right Side*/}
                    <div className="col-lg-8">
                        <div className="row g-3 mb-4">
                            {/*Total Orders*/}
                            <div className="col-md-4">
                                <div className="card border-0 shadow-lg rounded-4 bg-success-subtle h-100 profile-card">
                                    <div className="card-body text-center">
                                        <div 
                                            className="fs-1 mb-2"
                                        >
                                            📦
                                        </div>

                                        <h2 className="fw-bold">
                                            {orders.length}
                                        </h2>

                                        <p className="mb-0 text-muted">
                                            عدد الطلبات
                                        </p>

                                    </div>
                                </div>
                            </div>

                            {/*Total Spent*/}
                            <div className="col-md-4">
                                <div className="card border-0 shadow-lg rounded-4 bg-warning-subtle h-100 profile-card">
                                    <div className="card-body text-center">
                                        <div className="fs-1 mb-2">
                                        💰
                                        </div>

                                        <h2 className="fw-bold">
                                            ₪ {totalSpent.toFixed(2)}
                                        </h2>

                                        <p className="mb-0 text-muted">
                                            إجمالي الإنفاق
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/*Latest Order*/}
                            <div className="col-md-4">
                                <div className="card border-0 shadow-lg rounded-4 bg-info-subtle h-100 profile-card">
                                    <div className="card-body text-center">
                                    <div className="fs-1 mb-2">
                                        🚚
                                    </div>

                                    {latestOrder ? (
                                    <>
                                        <h3 className="fw-bold">
                                            #{latestOrder.id}
                                        </h3>

                                        <p className="mb-0 text-muted">
                                            آخر طلب
                                        </p>
                                    </>
                                    ) : (
                                        <>
                                        <h4 className="fw-bold">
                                            لا يوجد طلب
                                        </h4>

                                        <p className="mb-0 text-muted">
                                            حتى الآن
                                        </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                            {/*Recent Orders*/}
                            <div className="card border-0 shadow-lg rounded-4">
                                <div className="card-body">

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="fw-bold mb-0">
                                            آخر الطلبات
                                        </h4>

                                        <Link
                                            to="/orders"
                                            className="btn btn-outline-success btn-sm"
                                        >
                                            عرض الكل
                                        </Link>
                                    </div>
                                    {recentOrders.length === 0 ? (
                                        <div className="text-center py-5">
                                            <h5 className="text-muted">
                                                لا توجد طلبات حتى الآن
                                            </h5>
                                        </div>
                                    ) : (
                                        <div className="row g-3">
                                            {recentOrders.map((order) => (
                                                <div 
                                                    key={order.id}
                                                    className="col-md-4"
                                                >
                                                    <div className="card border-0 bg-light h-100">
                                                        <div className="card-body">
                                                            <h5 className="fw-bold">
                                                                #{order.id}
                                                            </h5>

                                                            <p className="text-muted mb-2">
                                                                {new Date(order.created_at).toLocaleDateString()}
                                                            </p>

                                                            <span
                                                                className={`badge ${
                                                                    order.status === "Delivered"
                                                                        ? "bg-success"
                                                                        : order.status === "Processing"
                                                                        ? "bg-primary"
                                                                        : order.status === "Cancelled"
                                                                        ? "bg-danger"
                                                                        : "bg-warning text-dark"
                                                                    }`}
                                                            >
                                                                {order.status}
                                                            </span>

                                                            <hr />

                                                            <h5 className="text-success fw-bold">
                                                                {Number(order.total_price).toFixed(2)} ₪
                                                            </h5>

                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Profile;
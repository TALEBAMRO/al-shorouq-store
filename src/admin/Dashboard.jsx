import { Link } from "react-router-dom";

function AdminDashboard() {
    const products = 
            JSON.parse(localStorage.getItem("products")) || [];

    const orders = 
            JSON.parse(localStorage.getItem("orders")) || [];
    
    const totalSales = orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
    );

    const pendingOrders = orders.filter(
        (order) => order.status === "قيد المعالجة"
    ).length;

    const latestOrders = [...orders]
        .reverse()
        .slice(0,5);

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-5">
                Admin Dashboard 
            </h1>

            <div className="row g-4">

                <div className="col-md-3">
                    <Link
                        to="/admin/products"
                        className="text-decoration-none">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <h5>Total Products</h5>

                                <h2 className="fw-bold text-success">
                                    {products.length}
                                </h2>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3">
                    <Link
                        to="/admin/orders"
                        className="text-decoration-none">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <h5>Total Orders</h5>

                                <h2 className="fw-bold text-primary">
                                    {orders.length}
                                </h2>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3">
                    <Link 
                    to="/admin/orders"
                    className="text-decoration-none">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <h5>Total Sales</h5>

                                <h2 className="fw-bold text-warning">
                                    ₪ {totalSales}
                                </h2>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-3">
                    <Link
                        to="/admin/orders"
                        className="text-decoration-none">
                        <div className="card shadow-sm border-0">
                            <div className="card-body text-center">
                                <h5>Pending Orders</h5>

                                <h2 className="fw-bold text-danger">
                                    {pendingOrders}
                                </h2>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="card shadow-sm border-0 mt-5">
                    <div className="card-body">
                        <h4 className="fw-bold mb-4">
                            Latest Orders 
                        </h4>

                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {latestOrders.map((order) => (
                                        <tr key={order.id}>
                                            <td>
                                                <Link
                                                    to={`/admin/orders/${order.id}`}
                                                    className="text-decoration-none fw-bold">
                                                #{String(order.id).slice(-5)}
                                                </Link>
                                            </td>
                                            <td>{order.customer.fullName}</td>
                                            <td>₪{order.totalPrice}</td>
                                            <td>
                                                <span
                                                    className={`badge bg-${
                                                        order.status === "تم التسليم"
                                                            ? "success"
                                                            : order.status === "تم الشحن"
                                                            ? "primary"
                                                            : "warning"
                                                            }`}
                                                            >
                                                                {order.status}
                                                            </span>
                                            </td>
                                        </tr>
                                    ))}

                                    {latestOrders.length === 0 && (
                                        <tr>
                                            <td colSpan="4"
                                                className="text-center py-4">
                                                    No Orders Found
                                                </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
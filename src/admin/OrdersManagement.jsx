import { useState } from "react";
import { Link } from "react-router-dom";

function OrdersManagement() {
    const [orders, setOrders] = useState(
        JSON.parse(localStorage.getItem("orders")) || []
    );

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmDelete) return;

        const updatedOrders = orders.filter(
            (order) => order.id !== id
        );

        setOrders(updatedOrders);

        localStorage.setItem(
            "orders",
            JSON.stringify(updatedOrders)
        );
    };

    const statusColor = {
        "قيد المعالجة" : "warning",
        "تم الشحن" : "primary",
        "تم التسليم" : "success",
    };

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-5">
                Orders Management
            </h1>

            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>

                                    <td>
                                        {order.customer.fullName}
                                    </td>

                                    <td>
                                        {order.customer.phone}
                                    </td>

                                    <td>
                                        ₪ {order.totalPrice}
                                    </td>

                                    <td>
                                        <span
                                            className={`badge bg-${statusColor[order.status]} fs-6`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td>{order.date}</td>

                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link
                                                to={`/admin/orders/${order.id}`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                View
                                            </Link>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(order.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {orders.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center py-4"
                                    >
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default OrdersManagement;
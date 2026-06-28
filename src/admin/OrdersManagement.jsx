import { useState, useEffect } from "react";
import { getOrders, deleteOrder } from "../services/orderService";
import { Link } from "react-router-dom";

function OrdersManagement() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error(error);
                alert("Failed to load orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmDelete) return;

        try{
            await deleteOrder(id);

            setOrders((prevOrders) =>
                prevOrders.filter((order) => order.id !== id)
            );
        } catch (error) {
            console.error(error);
            alert("Failed to delete order");
        }
    };

    const statusColor = {
        Pending: "warning",
        Processing: "primary",
        Delivered: "success",
        Cancelled: "danger",
    };
    const statusText = {
    Pending: "قيد المعالجة",
    Processing: "تم الشحن",
    Delivered: "تم التسليم",
    Cancelled: "تم الإلغاء",
};

if (loading) {
    return (
        <div className="container py-5">
            Loading...
        </div>
    );
}

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
                                        {order.customer_name}
                                    </td>

                                    <td>
                                        {order.phone}
                                    </td>

                                    <td>
                                        ₪ {order.total_price}
                                    </td>

                                    <td>
                                        <span
                                            className={`badge bg-${statusColor[order.status] || "secondary"} fs-6`}
                                        >
                                            {statusText[order.status] || order.status}
                                        </span>
                                    </td>

                                    <td>{new Date(order.created_at).toLocaleString()}</td>

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
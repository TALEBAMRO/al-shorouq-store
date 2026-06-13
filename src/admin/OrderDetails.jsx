import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const order = orders.find(
        (order) => order.id === Number(id)
    );

    const [status, setStatus] = useState(order?.status || "");

    if (!order) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    Order not found.
                </div>
            </div>
        );
    }

    const handleSaveStatus = () => {
        const updatedOrders = orders.map((o) =>
            o.id === order.id
                ? { ...o, status }
                : o
        );

        localStorage.setItem(
            "orders",
            JSON.stringify(updatedOrders)
        );

        alert("Order status updated successfully!");
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (!confirmDelete) return;

        const updatedOrders = orders.filter(
            (o) => o.id !== order.id
        );

        localStorage.setItem(
            "orders",
            JSON.stringify(updatedOrders)
        );

        alert("Order deleted successfully!");

        navigate("/admin/orders");
    };

    return (
        <div className="container py-5">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/orders")}
                >
                    ← العودة للطلبات
                </button>

                <div className="text-end">
                    <h1 className="fw-bold mb-1">
                        Order Details
                    </h1>

                    <p className="text-muted mb-0">
                        Order #{order.id}
                    </p>
                </div>
            </div>

            {/* Customer Information */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">
                        معلومات المشتري
                    </h5>

                    <p>
                        <strong>الإسم:</strong>{" "}
                        {order.customer.fullName}
                    </p>

                    <p>
                        <strong>رقم الهاتف:</strong>{" "}
                        {order.customer.phone}
                    </p>

                    <p className="mb-0">
                        <strong>العنوان:</strong>{" "}
                        {order.customer.address}
                    </p>
                </div>
            </div>

            {/* Order Items */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">
                        <strong>الطلب</strong>
                    </h5>

                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="d-flex justify-content-between align-items-center border rounded p-3 mb-2"
                        >
                            <div>
                                {item.image} {item.name}
                            </div>

                            <span className="badge bg-success">
                                Qty: {item.quantity}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Information */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">
                        معلومات الدفع:
                    </h5>

                    <p>
                        <strong>طريقة الدفع:</strong>{" "}
                        {order.paymentMethod}
                    </p>

                    <p className="mb-0">
                        <strong>المجموع:</strong>{" "}
                        {order.totalPrice}₪
                    </p>
                </div>
            </div>

            {/* Order Status */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h5 className="fw-bold mb-4">
                        حالة الطلب:
                    </h5>

                    <select
                        className="form-select mb-4"
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="قيد المعالجة">
                            قيد المعالجة
                        </option>

                        <option value="تم الشحن">
                            تم الشحن
                        </option>

                        <option value="تم التسليم">
                            تم التسليم
                        </option>
                    </select>

                    <div className="d-flex gap-2 flex-wrap">
                        <button
                            className="btn btn-success"
                            onClick={handleSaveStatus}
                        >
                            Save Status
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                        >
                            Delete Order
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default OrderDetails;
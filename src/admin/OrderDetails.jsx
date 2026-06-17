import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { downloadInvoice } from "../utils/invoiceGenerator";

function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const order = orders.find(
        (order) => order.id === Number(id)
    );

    const [status, setStatus] = useState(order?.status || "");

    const invoiceRef = useRef();
    const [selectedOrder, setSelectedOrder] = useState(null);

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

    const statusColor = {
        "قيد المعالجة" : "warning",
        "تم الشحن" : "primary",
        "تم التسليم" : "success",
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
            Products
        </h5>

        <div className="table-responsive">
            <table className="table align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {order.items.map((item) => {
                        return ( 
                        <tr key={item.id}>
                            <td>
                                <span style={{fontSize: "2rem"}}>
                                    {item.image}
                                </span>
                            </td>

                            <td>{item.name}</td>

                            <td>
                                {item.price}₪
                            </td>

                            <td>
                                <span className="badge bg-success">
                                    {item.quantity}
                                </span>
                            </td>

                            <td>
                                {item.price * item.quantity}₪
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
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

                    <p>
                        <strong>عدد المنتجات:</strong>
                        {order.items.length}
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

                    <div className="mb-3">
                        <span className={`badge bg-${statusColor[status]} fs-6`}>
                            {status}
                        </span>
                    </div>

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
                            className="btn btn-primary"
                            onClick={() => downloadInvoice(
                                                order,
                                            invoiceRef,
                                        setSelectedOrder
                                    )}
                        >
                            Download Invoice
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
                {selectedOrder && (
                    <div 
                        ref={invoiceRef}
                        style={{
                            direction: "rtl",
                            textAlign: "right",
                            position: "absolute",
                            left: "-9999px",
                            width: "800px",
                            background: "white",
                            padding: "30px"
                        }}
                    >
                        <h1 className="text-center mb-4">
                            AL-Shorouq Store
                        </h1>

                        <hr />

                    <h3 className="mb-4">فاتورة رقم# {selectedOrder.id}</h3>

                    <p>
                        <strong>التاريخ:</strong>
                        {" "}
                        {selectedOrder.date}
                    </p>

                    <p>
                        <strong>العميل:</strong>
                        {" "}
                        {selectedOrder.customer.fullName}
                    </p>

                    <p>
                        <strong>الهاتف:</strong>
                        {" "}
                        {selectedOrder.customer.phone}
                    </p>

                    <p>
                        <strong>العنوان:</strong>
                        {" "}
                        {selectedOrder.customer.address}
                    </p>

                    <p>
                        <strong>طريقة الدفع:</strong>
                        {" "}
                        {selectedOrder.paymentMethod}
                    </p>

                    <hr />

                    <h4>المنتجات</h4>

                    <table className="table table-bordered table-striped mt-3">
                        <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>الكمية</th>
                            </tr>
                        </thead>

                        <tbody>
                            {selectedOrder.items.map((item) => (
                                <tr 
                                    key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>

                    <hr />
                    <h3>
                        الإجمالي:
                        {" "}
                        {selectedOrder.totalPrice} ₪
                    </h3>
                </div>
            )}
        </div>
    );
}

export default OrderDetails;
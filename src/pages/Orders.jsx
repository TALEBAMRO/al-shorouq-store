import { useState, useRef, useEffect } from "react";
import { downloadInvoice } from "../utils/invoiceGenerator";
import { getOrderByCustomer } from "../services/orderService";

function Orders() {
    const currentCustomer = JSON.parse(localStorage.getItem("currentCustomer")) || null;

    const invoiceRef = useRef(null);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrderByCustomer(
                    currentCustomer.email 
                );

                setOrders(data);
            } catch (error) {
                console.error(error);
                alert("Failed to load orders :(")
            } finally {
                setLoading(false);
            }
        };

        if (currentCustomer?.email) {
            fetchOrders();
        }
    }, [currentCustomer?.email]);

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
        Cancelled: "تم الالغاء",
    };

    if (loading) {
        return (
            <div className="container py-5">
                Loading...
            </div>
        )
    }

    return (
        <div className="container py-5">
            <h1 className="text-center fw-bold mb-5">
                طلباتي
            </h1>

            {orders.length === 0 ? (
                <div className="text-center">
                    <h4 className="text-muted">
                        لا توجد طلبات حتى الآن
                    </h4>
                </div>
            ) : (
                <div className="row g-4">
                    {orders.map((order) => (
                        <div key={order.id}
                        className="col-12 col-md-6 col-xl-4"
                    >
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                    <div>
                                        <h5 className="fw-bold mb-1">
                                            طلب #{order.id}
                                        </h5>
                                        <p className="text-muted mb-0">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <h5 className="text-success fw-bold mb-0">
                                        {Number(order.total_price).toFixed(2)} ₪
                                    </h5>
                                </div>
                                <hr />
                                <p>
                                    <strong>العميل:</strong>{" "}
                                    {order.customer_name}
                                </p>

                                <p>
                                    <strong>الهاتف:</strong>{" "}
                                    {order.phone}
                                </p>

                                <p>
                                    <strong>العنوان:</strong>{" "}
                                    {order.address}
                                </p>

                                <p>
                                    <strong>طريقة الدفع:</strong>{" "}
                                    {order.payment_method}
                                </p>

                                <p>
                                    <strong>حالة الطلب:</strong>{" "}
                                    <span className={`badge bg-${statusColor[order.status] || "secondary"}`}>
                                        {statusText[order.status] || order.status}
                                    </span>
                                </p>

                                <hr />

                                <h6 className="fw-bold mb-3">
                                    المنتجات:
                                </h6>

                                <div className="d-flex flex-column gap-2">
                                {order.items?.map((item) => (
                                    <div 
                                        key={item.id}
                                        className="bg-light rounded p-2 d-flex justify-content-between align-items-center"
                                    >
                                        <span>{item.product_name}</span>
                                        <span className="badge bg-success">× {item.quantity}</span>
                                    </div>
                                ))}
                                </div>
                                <button 
                                    className="btn btn-success w-100 mt-3"
                                    onClick={() => downloadInvoice(
                                                        order,
                                                    invoiceRef,
                                                setSelectedOrder
                                            )}
                                >
                                    تحميل الفاتورة
                                </button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            )}
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
                    <h1 className="text-center mb-4">AL-Shorouq Store</h1>
                    <hr />

                    <h3 className="mb-4">فاتورة رقم# {selectedOrder.id}</h3>

                    <p>
                        <strong>التاريخ:</strong>
                        {" "}
                        {new Date(selectedOrder.created_at).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>العميل:</strong>
                        {" "}
                        {selectedOrder.customer_name}
                    </p>

                    <p>
                        <strong>الهاتف:</strong>
                        {" "}
                        {selectedOrder.phone}
                    </p>

                    <p>
                        <strong>العنوان:</strong>
                        {" "}
                        {selectedOrder.address}
                    </p>

                    <p>
                        <strong>طريقة الدفع:</strong>
                        {" "}
                        {selectedOrder.payment_method}
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
                            {selectedOrder.items?.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <hr />
                    <h3>
                        الإجمالي:
                        {" "}
                        {selectedOrder.total_price} ₪
                    </h3>
                </div>
            )}
        </div>
    );
}

export default Orders;
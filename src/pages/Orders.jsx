function Orders() {
    const currentCustomer = JSON.parse(localStorage.getItem("currentCustomer")) || [];

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const orders = allOrders.filter(
        order => order.customerId === currentCustomer.email 
    );

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
                                            {order.date}
                                        </p>
                                    </div>

                                    <h5 className="text-success fw-bold mb-0">
                                        {order.totalPrice} ₪
                                    </h5>
                                </div>
                                <hr />
                                <p>
                                    <strong>العميل:</strong>{" "}
                                    {order.customer.fullName}
                                </p>

                                <p>
                                    <strong>الهاتف:</strong>{" "}
                                    {order.customer.phone}
                                </p>

                                <p>
                                    <strong>العنوان:</strong>{" "}
                                    {order.customer.address}
                                </p>

                                <p>
                                    <strong>طريقة الدفع:</strong>{" "}
                                    {order.paymentMethod}
                                </p>

                                <p>
                                    <strong>حالة الطلب:</strong>{" "}
                                    <span className="badge bg-warning text-dark">
                                        {order.status}
                                    </span>
                                </p>

                                <hr />

                                <h6 className="fw-bold mb-3">
                                    المنتجات:
                                </h6>
                                <div className="d-flex flex-column gap-2">
                                {order.items.map((item) => (
                                    <div 
                                        key={item.id}
                                        className="bg-light rounded p-2 d-flex justify-content-between align-items-center"
                                    >
                                        <span>{item.image} {item.name}</span>
                                        <span className="badge bg-success">× {item.quantity}</span>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Orders;
function AdminDashboard() {
    const products = 
            JSON.parse(localStorage.getItem("products")) || [];

    const orders = 
            JSON.parse(localStorage.getItem("orders")) || [];
    
    const totalSales = orders.reduce(
        (sum, order) => sum + order.totalPrice,
        0
    );

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-5">
                Admin Dashboard 
            </h1>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5>Total Products</h5>

                            <h2 className="fw-bold text-success">
                                {products.length}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5>Total Orders</h5>

                            <h2 className="fw-bold text-primary">
                                {orders.length}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5>Total Sales</h5>

                            <h2 className="fw-bold text-warning">
                                ₪ {totalSales}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
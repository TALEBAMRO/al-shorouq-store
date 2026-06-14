import { Outlet, Link, useNavigate } from "react-router-dom";

function AdminLayout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        navigate("/admin/login");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link 
                        to="/admin"
                        className="navbar-brand"
                    >
                        Admin Panel 
                    </Link>

                    <div className="d-flex gap-2">
                        <Link 
                            to="/admin/products"
                            className="btn btn-outline-light"
                        >
                            Products
                        </Link>

                        <Link 
                            to="/admin/orders"
                            className="btn btn-outline-light"
                        >
                            Orders 
                        </Link>

                        <button 
                            className="btn btn-danger"
                            onClick={handleLogout}
                        >
                            Logout 
                        </button>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    );
}

export default AdminLayout;
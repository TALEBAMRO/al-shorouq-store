import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
            <div className="container-fluid px-4">

                <Link className="navbar-brand fw-bold fs-4" to="/">
                    🌿 الشروق للخضار والفواكه
                </Link>

                <button 
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto fw-bold fs-4">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                الرئيسية
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                المنتجات
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                السلة
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">
                                طلباتي
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">
                                الإدارة
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
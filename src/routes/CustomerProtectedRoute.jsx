import { Navigate } from "react-router-dom";

function CustomerProtectedRoute({ children }) {
    const token = localStorage.getItem("customerToken");
    const customer = localStorage.getItem("currentCustomer");

    if (!token || !customer) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default CustomerProtectedRoute;
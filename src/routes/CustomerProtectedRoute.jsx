import { Navigate } from "react-router-dom";

function CustomerProtectedRoute({ children }) {
    const currentCustomer = JSON.parse(localStorage.getItem("currentCustomer"));

    if (!currentCustomer) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default CustomerProtectedRoute;
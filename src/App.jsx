import { Routes, Route } from "react-router-dom";

/* Layouts */
import MainLayout from "./layouts/MainLayouts";
import AdminLayout from "./layouts/AdminLayout";

/* Protected Routes */
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomerProtectedRoute from "./routes/CustomerProtectedRoute";

/* Customer Pages */
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerLogin from "./pages/CustomerLogin";
import NotFound from "./pages/NotFound";

/* Admin Pages */
import Dashboard from "./admin/Dashboard";
import ProductsManagement from "./admin/ProductsManagement";
import OrdersManagement from "./admin/OrdersManagement";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import OrderDetails from "./admin/OrderDetails";
import AdminLogin from "./admin/AdminLogin";

function App() {
    return (
        <Routes>

            {/* Customer Routes */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />

                <Route
                    path="register"
                    element={<CustomerRegister />}
                />

                <Route
                    path="login"
                    element={<CustomerLogin />}
                />

                <Route
                    path="products"
                    element={<Products />}
                />

                <Route
                    path="cart"
                    element={<Cart />}
                />

                <Route
                    path="checkout"
                    element={
                        <CustomerProtectedRoute>
                            <Checkout />
                        </CustomerProtectedRoute>
                    }
                />

                <Route
                    path="orders"
                    element={
                        <CustomerProtectedRoute>
                            <Orders />
                        </CustomerProtectedRoute>
                    }
                />

                <Route
                    path="profile"
                    element={
                        <CustomerProtectedRoute>
                            <Profile />
                        </CustomerProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Route>

            {/* Admin Login */}
            <Route
                path="/admin/login"
                element={<AdminLogin />}
            />

            {/* Admin Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/admin"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin/products"
                    element={<ProductsManagement />}
                />

                <Route
                    path="/admin/products/add"
                    element={<AddProduct />}
                />

                <Route
                    path="/admin/products/edit/:id"
                    element={<EditProduct />}
                />

                <Route
                    path="/admin/orders"
                    element={<OrdersManagement />}
                />

                <Route
                    path="/admin/orders/:id"
                    element={<OrderDetails />}
                />
            </Route>

        </Routes>
    );
}

export default App;
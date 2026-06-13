import {  Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayouts";
import { useEffect } from "react";
/*data*/ 
import products from "./data/products";
/*pages*/
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
/*admin*/
import Dashboard from "./admin/Dashboard";
import ProductsManagement from "./admin/ProductsManagement";
import OrdersManagement from "./admin/OrdersManagement";
import EditProduct from "./admin/EditProduct";
import AddProduct from "./admin/AddProduct";
import OrderDetails from "./admin/OrderDetails";

function App() {

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (!storedProducts) {
      localStorage.setItem(
        "products", JSON.stringify(products)
      );
    }
  }, []);
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductsManagement />} />
          <Route path="/admin/orders" element={<OrdersManagement />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/orders/:id" element={<OrderDetails />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
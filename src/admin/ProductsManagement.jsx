import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {getProducts, 
        deleteProduct as deleteProductApi } from "../services/productService";

function ProductsManagement() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if(!confirmDelete) return;

        try {
            await deleteProductApi(id);

            setProducts((prevProducts) =>
                prevProducts.filter(
                    (product) => product.id !== id
                )
            );
        } catch (error) {
            console.error(error);
            alert("Failed to delete product");
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="fw-bold">
                    Products Management 
                </h1>

                <Link
                    to="/admin/products/add"
                    className="btn btn-success"
                >
                    Add Product
                </Link>
            </div>

            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0 text-start"
                            dir="ltr"
                    >
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No products found.
                                    </td>
                                </tr>
                            ) : ( 
                            products.map((product)=> (
                                <tr key={product.id}>
                                    <td>{product.id}</td>

                                    <td>
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    objectFit: "cover",
                                                    borderRadius: "8px"
                                                }}
                                            />
                                            ) : ( 
                                                "No Image"
                                        )}
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td className="text-center">₪ {Number(product.price).toFixed(2)}</td>
                                    <td>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <Link 
                                                to={`/admin/products/edit/${product.id}`}
                                                className="btn btn-warning btn-sm">
                                                    Edit
                                            </Link>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(product.id)}>
                                                    Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductsManagement;
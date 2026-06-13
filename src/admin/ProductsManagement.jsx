import { useState } from "react";
import { Link } from "react-router-dom";

function ProductsManagement() {
    const [products, setProducts] = useState(
        JSON.parse(localStorage.getItem("products")) || []
    );

    const handleDelete = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if(!confirmDelete) return;
        const updatedProducts = products.filter(
            (product) => product.id !== id 
        );

        setProducts(updatedProducts);

        localStorage.setItem(
            "products", JSON.stringify(updatedProducts)
        );
    };

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
                    <table className="table table-hover align-middle mb-0 text-start">
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
                            {products.map((product)=> (
                                <tr key={product.id}>
                                    <td>{product.id}</td>

                                    <td style={{fontSize: "1.5rem"}}>
                                        {product.image}
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>₪ {product.price}</td>
                                    <td className=" d-flex gap-2 align-items-end">
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="btn btn-warning btn-sm"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductsManagement;
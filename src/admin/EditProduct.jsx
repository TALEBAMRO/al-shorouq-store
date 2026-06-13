import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function EditProduct() {
    const { id } = useParams();

    const navigate = useNavigate();
    const handleSave = () => {
        const updatedProducts = products.map((product) => {
            if (product.id === Number(id)) {
                return {
                    ...product,
                    name,
                    price: Number(price),
                    category,
                    image,
                };
            }

            return product;
        });

        localStorage.setItem(
            "products", JSON.stringify(updatedProducts)
        );

        alert("Product updated successfully!");
        navigate("/admin/products");
    };

    const products = JSON.parse(localStorage.getItem("products")) || [];

    const product = products.find(
        (product) => product.id === Number(id)
    );

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [image, setImage] = useState(product.image); 

    if(!product) {
        return (
            <div className="container py-5">
                <h2>Product not found.</h2>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-5">
                Edit Product
            </h1>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">
                            Product Name
                        </label>

                        <input 
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Price
                        </label>

                        <input 
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Category
                        </label>

                        <select 
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="الخضار">الخضار</option>
                            <option value="الفواكه">الفواكه</option>
                            <option value="العروض">العروض</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Image 
                        </label>
                        <input 
                            type="text"
                            className="form-control"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>

                    <button 
                        className="btn btn-warning"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
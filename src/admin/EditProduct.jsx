import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getProductById,
    updateProduct
} from "../services/productService";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSave = async () => {

        if (!name || !price || !category) {
            alert("Please fill all fields");
            return;
        }

        try {
            await updateProduct(id, {
                name,
                price: Number(price),
                category,
                image_url: image,
                stock: 0,
                description: ""
            });

            alert("Product updated successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error(error);
            alert("Failed to update product");
        }
    };
        

        const [loading, setLoading] = useState(true);

        const [name, setName] = useState("");
        const [price, setPrice] = useState("");
        const [category, setCategory] = useState("");
        const [image, setImage] = useState("");

        useEffect(() => {
            const fetchProduct = async () => {
                try {
                    const product = await getProductById(id);

                    setName(product.name);
                    setPrice(product.price);
                    setCategory(product.category);
                    setImage(product.image_url || "");
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }, [id]);

    if(loading) {
        return (
            <div className="container py-5">
                <h3>Loading...</h3>
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
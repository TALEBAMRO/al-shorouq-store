import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/productService";

function AddProduct() {

    const navigate = useNavigate();

const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [category, setCategory] = useState("");
const [imageFile, setImageFile] = useState(null);
const [preview, setPreview] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();

    try { 
    const newProduct = {
                    name,
                    price: Number(price),
                    category,
                    image_url: imageFile,
                    stock: 0,
                    description: ""
    };

    await createProduct(newProduct);

    alert("Product added successfully!");
    navigate("/admin/products");

    } catch (error) {
        console.error(error);
        console.log(error.response?.data);
        alert("Failed to add product");
    }
};
    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-5">
                Add Product
            </h1>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Product Name 
                            </label>

                            <input 
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
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
                                required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Category 
                            </label>

                            <select 
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required >
                                <option value="الخضار">
                                    الخضار
                                </option>

                                <option value="الفواكه">
                                    الفواكه
                                </option>

                                <option value="العروض">
                                    العروض
                                </option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">
                                Image 
                            </label>

                            <input 
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setImageFile(file);

                                    if (file) {
                                        setPreview(URL.createObjectURL(file));
                                    }
                                }}
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="img-thumbnail mt-3"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        objectFit: "cover"
                                    }}
                                />
                            )}
                        </div>

                        <button 
                            type="submit"
                            className="btn btn-success"
                        >
                            Save Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
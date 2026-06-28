import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/productService";
import { uploadImage } from "../services/uploadService";

function AddProduct() {

    const navigate = useNavigate();

const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [category, setCategory] = useState("");
const [imageFile, setImageFile] = useState(null);
const [preview, setPreview] = useState("");
const [loading, setLoading] = useState(false);

useEffect(() => {
    return() => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
    };
}, [preview]);
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        if (Number(price) <= 0) {
        alert("Price must be greater than zero.");
        return;
    }

        let imageUrl = "";

        if (imageFile){
            imageUrl = await uploadImage(imageFile);
        }
    const newProduct = {
                    name: name.trim(),
                    price: Number(price),
                    category: category.trim(),
                    image_url: imageUrl,
                    stock: 0,
                    description: "",
    };
    
    await createProduct(newProduct);

    alert("Product added successfully!");
    navigate("/admin/products", {
        replace: true,
    });

    } catch (error) {
        console.error(error);
        console.log(error.response?.data);
        alert("Failed to add product");
    } finally {
        setLoading(false);
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
                                min="0"
                                step="0.01"
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
                                <option value="">
                                    اختر التصنيف
                                </option>

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
                                accept=".jpg,.jpeg,.png,.webp,.avif"
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
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
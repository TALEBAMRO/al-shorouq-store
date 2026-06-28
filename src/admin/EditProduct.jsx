import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getProductById,
    updateProduct
} from "../services/productService";
import { uploadImage } from "../services/uploadService";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    //States
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("");

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState("");

    const [saving, setSaving] = useState(false);

    useEffect(() => {
            const fetchProduct = async () => {
                try {
                    const product = await getProductById(id);

                    setName(product.name);
                    setPrice(product.price);
                    setCategory(product.category);
                    setImageFile(null);
                    setPreview(product.image_url || "");
                    setStock(product.stock);
                    setDescription(product.description);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }, [id]);
    
    const handleSave = async () => {
        if (!name.trim() || !category) {
            alert("Please fill all fields");
            return;
        }

        if (Number(price) <= 0) {
            alert("Price must be greater than zero");
            return;
        }

        setSaving(true);

        try {
            let imageUrl = preview;

            if (imageFile instanceof File) {
                imageUrl = await uploadImage(imageFile);
            }

            await updateProduct(id, {
                name,
                price: Number(price),
                category,
                image_url: imageUrl,
                stock,
                description
            });

            alert("Product updated successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error(error);
            alert("Failed to update product");
        } finally {
            setSaving(false);
        }
    };
    //Early Return
    if (loading) {
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
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];

                                if (!file) return;

                                setImageFile(file);
                                setPreview(URL.createObjectURL(file));
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
                        className="btn btn-warning"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
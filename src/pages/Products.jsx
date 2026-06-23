import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Products() {

        const [searchTerm, setSearchTerm] = useState("");
        const [selectedCategory, setSelectedCategory] = useState("الكل");
        const [products, setProducts] = useState([]);

        useEffect(() => {
            const fetchProducts = async () => {
                try {
                    const data = await getProducts();
                    setProducts(data);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };

            fetchProducts();
        }, []);

        const filteredProducts = products.filter((product) => {
            const matchesSearch = product.name
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === "الكل" ||
            product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        })


    return (
        <div className="container py-5">

            <div className="row mb-4">
                <div className="col-12 col-md-6 mb-3">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="ابحث عن منتج..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="col-12 mb-3">
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                        <button
                            className={`btn ${
                                selectedCategory === "الكل"
                                    ?"btn-success"
                                    : "btn-outline-success"
                                }`}
                                onClick={() => setSelectedCategory("الكل")}
                        >
                            الكل
                        </button>
                        <button
                            className={`btn ${
                                selectedCategory === "الخضار"
                                ? "btn-success"
                                : "btn-outline-success"
                                }`}
                                onClick={() => setSelectedCategory("الخضار")}
                        >
                            الخضار
                        </button>
                        <button
                            className={`btn ${
                                selectedCategory === "الفواكه"
                                ? "btn-success"
                                : "btn-outline-success"
                                }`}
                                onClick={() => setSelectedCategory("الفواكه")}
                        >
                            الفواكه
                        </button>
                        <button
                            className={`btn ${
                                selectedCategory === "العروض"
                                ? "btn-success"
                                : "btn-outline-success"
                                }`}
                                onClick={() => setSelectedCategory("العروض")}
                        >
                            العروض
                        </button>
                    </div>
                </div>
            </div>

            <h1 className="text-center mb-5 fw-bold">
                منتجاتنا
            </h1>

            <div className="row g-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} 
                        className="col-12 col-md-4 col-xl-3">
                            <ProductCard product={product} />
                        </div>
                ))}

                {filteredProducts.length === 0 && (
                    <div className="text-center py-5">
                        <h5 className="text-muted">
                            لا توجد منتجات مطابقة🔍 
                        </h5>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Products;
import {useState} from "react";
import ProductCard from "../components/ProductCard";

function Products() {
        const products = JSON.parse(localStorage.getItem("products")) || [];

        const [searchTerm, setSearchTerm] = useState("");
        const [selectedCategory, setSelectedCategory] = useState("الكل");

        const filteredProducts = products.filter((product) => {
            const matchesSearch = product.name.includes(searchTerm);

            const matchesCategory = selectedCategory == "الكل" ||
            product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        })

    return (
        <div className="container py-5">

            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="ابحث عن منتج..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <select 
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)
                        }
                    >
                        <option>الكل</option>
                        <option>الخضار</option>
                        <option>الفواكه</option>
                        <option>العروض</option>
                    </select>
                </div>
            </div>

            <h1 className="text-center mb-5 fw-bold">
                منتجاتنا
            </h1>

            <div className="row g-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} 
                        className="col-12 col-sm-6 col-md-4 col-xl-3">
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
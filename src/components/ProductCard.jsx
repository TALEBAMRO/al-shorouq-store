import {useContext} from "react";
import {CartContext} from "../context/cart-context";

function ProductCard({product}) {
    const {addToCart} = useContext(CartContext);
    return (
        <div className="card border-0 shadow-sm h-100">
            <div className="text-center py-4 fs-1">
                {product.image}
            </div>

            <div className="card-body text-center d-flex flex-column">

                <h5 className="card-title fw-bold">
                    {product.name}
                </h5>
                <p className="text-muted">
                    {product.category}
                </p>
                <h6 className="text-success fw-bold mb-3">
                    {product.price} ₪
                </h6>
                <button className="btn btn-success w-100 mt-auto"
                        onClick={() => addToCart(product)}
                >
                    أضف الى السلة
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
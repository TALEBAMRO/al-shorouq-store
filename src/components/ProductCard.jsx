import {useContext} from "react";
import {CartContext} from "../context/cart-context";

function ProductCard({product}) {
    const {addToCart} = useContext(CartContext);
    return (
        <div className="card border-0 shadow-sm h-100">
            <div className="text-center">
                {product.image_url ? (
                    <img 
                        src={product.image_url}
                        alt={product.name}
                        className="card-img-top"
                        style={{
                            height: "220px",
                            objectFit: "cover"
                        }}
                    />
                    ) : ( 
                        <div className="d-flex align-items-center bg-light"
                        style={{
                            height: "220px"
                        }}
                        >
                            No Image
                        </div>
                )}
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
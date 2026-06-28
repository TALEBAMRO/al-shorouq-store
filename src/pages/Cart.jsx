import {useContext} from "react";
import {CartContext} from "../context/cart-context";
import { Link } from "react-router-dom";

function Cart() {
    const {
        cartItems, 
        removeFromCart, 
        increaseQuantity, 
        decreaseQuantity
    } = useContext(CartContext);

    const totalPrice = cartItems.reduce(
        (total, item) => 
            total + (item.price || 0) * item.quantity,
        0    
    );
    return (
        <div className="container py-5">
            <h1 className="text-center fw-bold mb-5">
                سلة التسوق🛒
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center">
                    <h4 className="text-muted">
                        السلة فارغة
                    </h4>
                </div>
            ) : (
                <>
                <div className="row g-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="col-12">
                            <div className="card shadow-sm border-0">
                                <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                                    <div className="d-flex flex-column flex-md-row align-items-center gap-3 text-center text-md-start">
                                        <div className="fs-1 mb-2 mb-md-0">
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="rounded"
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <h5 className="mb-1 fw-bold">
                                                {item.name}
                                            </h5>

                                            <p className="mb-0 text-muted">
                                                {item.category}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-center text-md-end w-100 w-md-auto">
                                        <p className="mb-1">
                                            السعر:{item.price} ₪
                                        </p>
                                        
                                        <div className="d-flex align-items-center justify-content-center justify-content-md-end gap-2 mb-2 flex-wrap">
                                            <button 
                                                className="btn btn-outline-success btn-sm"
                                                onClick={() => increaseQuantity(item.id)}>
                                                    +
                                            </button>

                                            <span className="fw-bold">
                                                الكمية: {item.quantity}
                                            </span>

                                            <button 
                                                className="btn btn-outline-warning btn-sm"
                                                onClick={() => decreaseQuantity(item.id)}>
                                                    - 
                                                </button>
                                        </div>

                                        <button 
                                            className="btn btn-outline-danger btn-sm mt-2"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            حذف من السلة
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card shadow-sm border-0 mt-4">
                    <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center">
                        <h4 className="mb-0">
                            المجموع الكلي:
                        </h4>
                        <h4 className="mb-0 text-success fw-bold">
                            {totalPrice.toFixed(2)} ₪
                        </h4>
                    </div>
                    <Link 
                        to="/checkout"
                        className="btn btn-success w-100">
                            إتمام الطلب
                        </Link>
                </div>
                </>
            )}
        </div>
    );
}

export default Cart;
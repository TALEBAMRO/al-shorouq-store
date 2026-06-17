import { useContext, useState } from "react";
/*import { Link } from "react-router-dom";*/
import { CartContext } from "../context/cart-context";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const {cartItems, clearCart} = useContext(CartContext);

    const navigate = useNavigate();

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    const [customerData, setCustomerData] = useState({
        fullName: "",
        phone: "",
        address: "",
    });

    const handleConfirmOrder = () => {
        if(
            !customerData.fullName ||
            !customerData.phone ||
            !customerData.address
        ) {
            alert("يرجى تعبئة جميع الحقول");
            return;
        }

        const currentCustomer = 
            JSON.parse(localStorage.getItem("currentCustomer"));

        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

        const newOrder = {
            id: Date.now(),
            customerId: currentCustomer.email,
            customer: customerData,
            items: cartItems,
            totalPrice,
            paymentMethod: "الدفع عند الاستلام",
            status: "قيد المعالجة",
            date: new Date().toLocaleString("ar"),
        };

        localStorage.setItem(
            "orders",
            JSON.stringify([...existingOrders, newOrder])
        );

        clearCart();

        navigate("/orders");
    };

    return (
        <div className="container py-5">
            <h1 className="text-center fw-bold mb-5">
                إتمام الطلب
            </h1>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <div className="mb-3">
                                <label className="form-label">
                                    الاسم الكامل
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={customerData.fullName}
                                    onChange={(e) => setCustomerData({
                                            ...customerData, fullName: e.target.value,
                                    })
                                }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    رقم الهاتف
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={customerData.phone}
                                    onChange={(e) => setCustomerData({
                                            ...customerData, phone: e.target.value,
                                    })
                                }
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    العنوان
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={customerData.address}
                                    onChange={(e) => setCustomerData({
                                            ...customerData, address: e.target.value,
                                    })
                                }
                                />
                            </div>
                            
                            <div className="card bg-light border-0 mb-4">
                                <div className="card-body">

                                    <h5 className="fw-bold">
                                        ملخص الطلب
                                    </h5>

                                    <p className="mb-2">
                                        عدد المنتجات:
                                        {" "}
                                        {cartItems.length}
                                    </p>
                                    <p className="mb-0 fw-bold text-success">
                                        المجموع الكلي:
                                        {" "}
                                        {totalPrice} ₪
                                    </p>
                                </div>
                            </div>

                            <div className="alert alert-info">
                                طريقة الدفع:
                                {" "}
                                <strong>
                                    الدفع عند الاستلام
                                </strong>
                            </div>

                            <button
                                className="btn btn-success w-100"
                                onClick={handleConfirmOrder}
                                >
                                تأكيد الطلب
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
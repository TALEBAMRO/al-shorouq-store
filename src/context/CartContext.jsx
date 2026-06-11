import {useState } from "react";
import {CartContext} from "./cart-context";


function CartProvider({children}) {
    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    const addToCart = (product) => {
        const updatedCart = [...cartItems, product];
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)
    );
    };

    return (
        <CartContext.Provider 
                value={{
                    cartItems,
                    addToCart
                }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
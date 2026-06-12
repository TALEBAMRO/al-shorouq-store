import {useState } from "react";
import {CartContext} from "./cart-context";


function CartProvider({children}) {
    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });

    const addToCart = (product) => {
        const existingItem = cartItems.find(
            (item) => item.id === product.id 
        );

        let updatedCart;
        if(existingItem) {
            updatedCart = cartItems.map((item) =>
            item.id === product.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
        } else {
            updatedCart = [...cartItems, {...product, quantity: 1},
            ];
            }

            setCartItems(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(
            (item) => item.id !== productId  
        );

        setCartItems(updatedCart);
        localStorage.setItem("cart",JSON.stringify(updatedCart));
    };

    const increaseQuantity = (productId) => {
        const updatedCart = cartItems.map((item) =>
            item.id === productId
                ?{...item, quantity: item.quantity + 1}
                : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (productId) => {
        const updatedCart = cartItems
            .map((item) =>
                    item.id === productId
                        ? {...item, quantity: item.quantity - 1}
                        : item
            )
            .filter((item) => item.quantity > 0);

            setCartItems(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider 
                value={{
                    cartItems,
                    addToCart,
                    removeFromCart,
                    increaseQuantity,
                    decreaseQuantity,
                    clearCart,
                }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
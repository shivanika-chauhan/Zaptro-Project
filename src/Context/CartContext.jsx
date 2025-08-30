import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    const itemInCart = cartItem.find((item) => item.id === product.id);

    if (itemInCart) {
      const updatedCart = cartItem.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
        
      );
      setCartItem(updatedCart);
      toast.success("Product quantity increased "); //  spelling fix
    } else {
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product added to cart ");
    }
  };

  // Update quantity
  const updateQuantity = (productId, action) => {
    setCartItem(
      cartItem
        .map((item) => {
          if (item.id === productId) {
            let newUnit = item.quantity;
            if (action === "increase") {
              newUnit += 1;
              toast.success("Quantity is increased")
            } else if (action === "decrease") {
              newUnit -= 1;
              toast.success("Quantity is decreased")
            }
            return newUnit > 0 ? { ...item, quantity: newUnit } : null;
          }
          return item;
        })
        .filter((item) => item !== null)
    );
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
    toast.info("Product removed from cart "); 
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

import { useState, useEffect, useMemo } from "react";

function useCart() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error.message);
      return [];
    }
  });

  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error.message);
    }
  }, [cartItems]);

  const addItemToCart = (item) => {
    const newItem = { ...item, quantity: item.quantity || 1 };
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === newItem.id);
      return existingItem
        ? prevItems.map((i) =>
            i.id === newItem.id
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          )
        : [...prevItems, newItem];
    });
  };

  const clearCart = () => setCartItems([]);

  const removeItemFromCart = (itemId) =>
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));

  const updateItemQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      quantity <= 0
        ? prevItems.filter((item) => item.id !== itemId)
        : prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
    );
  };

  return {
    cartItems,
    setCartItems,
    totalAmount,
    addItemToCart,
    clearCart,
    removeItemFromCart,
    updateItemQuantity,
  };
}

export default useCart;

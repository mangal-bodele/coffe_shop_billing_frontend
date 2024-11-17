import { useState, useEffect, useMemo } from "react";

function useCart() {
  // Initialize cart items from localStorage or default to an empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error.message);
      return [];
    }
  });

  // Calculate the total amount in the cart
  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  // Sync cart items to localStorage whenever they change
  useEffect(() => {
    try {
      if (cartItems.length > 0) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } else {
        localStorage.removeItem("cartItems"); // Clear cart from localStorage if it's empty
      }
    } catch (error) {
      console.error("Error saving cart to localStorage:", error.message);
    }
  }, [cartItems]);

  // Add an item to the cart or update its quantity if it already exists
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

  // Clear all items from the cart
  const clearCart = () => setCartItems([]);

  // Remove a specific item from the cart
  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Update the quantity of a specific item in the cart
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
    cartItems, // Array of items in the cart
    totalAmount, // Total price of items in the cart
    addItemToCart, // Function to add or update items in the cart
    clearCart, // Function to clear the cart
    removeItemFromCart, // Function to remove a specific item
    updateItemQuantity, // Function to adjust item quantity
  };
}

export default useCart;

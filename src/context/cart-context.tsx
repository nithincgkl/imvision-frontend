import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  id: number;
  img: string;
  title: string;
  des: string;
  amount: number;
  type: string;
  count: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateCartItemCount: (id: number, count: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') { // Check if we are in a browser environment
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      return storedCartItems.length > 0 ? storedCartItems : [];
    }
    return []; // Return an empty array if not in a browser environment
  });

  useEffect(() => {
    if (typeof window !== 'undefined') { // Check if we are in a browser environment
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i => i.id === item.id ? { ...i, count: i.count + 1 } : i);
      }
      return [...prevItems, { ...item, count: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateCartItemCount = (id: number, count: number) => {
    setCartItems(prevItems => {
      return prevItems.map(item => item.id === id ? { ...item, count } : item).filter(item => item.count > 0);
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
import { createContext, useState, useMemo, useCallback, useEffect, useContext } from 'react'
import PropTypes from 'prop-types';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, count: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => {
      return prevCart.map(item =>
        item.id === productId ? { ...item, count: item.count - 1 } : item
      ).filter(item => item.count > 0);
    });
  }, []);

  const calculateTotalPrice = useCallback(() => {
    return cart.reduce((total, product) => total + (product.price * product.count), 0);
  }, [cart]);

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    calculateTotalPrice,
  }), [cart, addToCart, removeFromCart, calculateTotalPrice]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);

export default CartContext;

import { useContext, useState } from 'react'
import { UserContext } from "../../context/UserContext";
import useCart from "../../context/useCart";
import './styles/Cart.css'
import CartContext from '../../context/CartContext';
const Cart = () => {
  const { cart, addToCart, removeFromCart, calculateTotalPrice, clearCart } = useCart(CartContext);
  const { token } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  const incrementQuantity = (id) => {
    const product = cart.find(item => item.id === id);
    if (product) {
      addToCart(product);
    }
  };
  const decrementQuantity = (id) => {
    const product = cart.find(item => item.id === id);
    if (product && product.count < 1) {
      removeFromCart(id);
      addToCart({ ...product, count: product.count - 1 });
    } else {
      removeFromCart(id);
    }
  };

  const totalPrice = calculateTotalPrice();

  const handleCheckout = async () => {
    if (!token) {
      alert("Debes iniciar sesión para realizar el checkout.");
      return;
    }
    if (cart.length === 0) {
      setErrorMessage('El carrito está vacío. Agrega productos para continuar.');
      return;
    }


    try {
      const response = await fetch('http://localhost:5000/api/checkouts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          },
        body: JSON.stringify({
          cart: cart,
        }),
      });

      if (response.ok) {
        setSuccessMessage("¡Compra realizada con éxito!");
        clearCart(); // Limpia el carrito después de la compra
      } else {
        throw new Error("Error al realizar la compra.");
      }
    } catch (error) {
      setErrorMessage("Hubo un error al realizar la compra. Inténtalo nuevamente.");
      console.error("Error al realizar la compra:", error);
    }
  };


  return (
    <div className="shopping">
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map((item) => (
          <li className='li-cart' key={item.id}>
            <img src={item.img} alt={item.name} />
            {item.name} - ${item.price.toLocaleString()}
            <button onClick={() => decrementQuantity(item.id)}>-</button>
            {item.count}
            <button onClick={() => incrementQuantity(item.id)}>+</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${totalPrice.toLocaleString()}</h2>
      <button className="pay" onClick={handleCheckout} disabled={!token}>
        Pagar
      </button>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Cart;

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useCart from "../../context/useCart";
import './styles/Cart.css'
const Cart = () => {
  const { cart, addToCart, removeFromCart, calculateTotalPrice } = useCart();
  const { token } = useContext(UserContext);

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

    try {
      const response = await fetch("/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cart),
      });

      if (response.ok) {
        alert("¡Compra realizada con éxito!");
      } else {
        alert("Error al procesar el checkout.");
      }
    } catch (error) {
      console.error("Error al realizar el checkout:", error);
      alert("Ocurrió un problema.");
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
    </div>
  );
};

export default Cart;

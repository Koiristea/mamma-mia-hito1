import { useState } from 'react';
import { pizzaCart } from './pizzas.js';

const Cart = () => {
  const [cart, setCart] = useState(pizzaCart);

  const incrementQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1 } : item
      ).filter(item => item.count > 0)
    );
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.count, 0);

  return (
    <div className='shopping'>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
          <li className='li-cart' key={item.id}>
            <img src={item.img} alt={item.name} />
            {item.name} - ${item.price.toLocaleString()}
            <button onClick={() => decrementQuantity(item.id)}><p>-</p></button>
            {item.count}
            <button onClick={() => incrementQuantity(item.id)}><p>+</p></button>
          </li>
        ))}
      </ul>
      <h2>Total: ${totalPrice.toLocaleString()}</h2>
      <button className='pay'>Pagar</button>
    </div>
  );
};

export default Cart;

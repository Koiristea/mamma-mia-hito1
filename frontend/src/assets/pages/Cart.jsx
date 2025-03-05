import useCart from '../../context/useCart';

const Cart = () => {
  const { cart, addToCart, removeFromCart, calculateTotalPrice } = useCart();

  const incrementQuantity = (id) => {
    const product = cart.find(item => item.id === id);
    if (product) {
      addToCart(product);
    }
  };

  const decrementQuantity = (id) => {
    const product = cart.find(item => item.id === id);
    if (product && product.count > 1) {
      removeFromCart(id);
      addToCart({ ...product, count: product.count - 1 });
    } else {
      removeFromCart(id);
    }
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className='shopping'>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map(item => (
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
      <button className='pay'>Pagar</button>
    </div>
  );
};

export default Cart;

import  { useEffect, useState } from 'react';

const Pizza = () => {
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas/p001')
      .then(response => response.json())
      .then(data => setPizza(data))
      .catch(error => console.error('Error:', error));
  }, []);

  if (!pizza) return <div>Cargando...</div>;

  return (
    <div className="pizza-container">
        <img src={pizza.img} alt={pizza.name} className="pizza-image" />
        <div className='info'>
            <h1>{pizza.name}</h1>
            <p className="pizza-description">{pizza.desc}</p>
            <ul className="pizza-ingredients">
                {pizza.ingredients.map((ingredient) => (
                <li key={ingredient.id}>🍕{ingredient}</li>
                ))}
            </ul>
            <div className='buy'>
                <p className="pizza-price">Precio: ${pizza.price}</p>
                <button className="add-to-cart-button">Añadir 🛒</button>
            </div>
        </div>
    </div>
  );
};

export default Pizza;

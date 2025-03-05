import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/home.css';
import useCart from '../../context/useCart';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <div className="container">
      <h1 className="title text-center">Nuestras Pizzas</h1>
      <div className="row">
        {pizzas.map(pizza => (
          <div className="col-md-6 mb-4" key={pizza.id}>
            <div className="card h-100 d-flex flex-row align-items-center">
              <div className="largo w-45 p-3">
                <h5 className="card-title">{pizza.name}</h5>
                <p className="card-text">{pizza.desc}</p>
                <p className="card-text"><strong>Ingredientes:</strong> {pizza.ingredients}</p>
              </div>
              <div className="right d-flex flex-column align-items-start p-3">
                <img src={pizza.img} className="img-fluid" alt={pizza.name} />
                <p className="pizza-price">Precio: ${pizza.price.toLocaleString()}</p>
                <button
                  className="button-home add-to-cart"
                  onClick={() => addToCart(pizza)}
                >
                  Añadir 🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

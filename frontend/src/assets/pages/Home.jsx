import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/home.css';
import useCart from '../../context/useCart';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/pizzas')
      .then((response) => response.json())
      .then((data) => setPizzas(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleViewMore = (id) => {
    navigate(`/pizza/${id}`);
  }

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
                <div className="card-text"><strong>Ingredientes:</strong>
                <ul className="pizza-ingredients">
                {pizza.ingredients.map(ingredient => (
                  <li key={uuidv4()}>{ingredient}</li>
                ))}
                </ul>
              </div>
              </div>
              <div className="right d-flex flex-column align-items-start p-3">
                <img src={pizza.img} className="img-fluid" alt={pizza.name} />
                <p className="pizza-price">Precio: ${pizza.price.toLocaleString()}</p>
                <button
                  className="button-home"
                  onClick={() => handleViewMore(pizza.id)}
                  >
                   Ver más 👀
                </button>
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
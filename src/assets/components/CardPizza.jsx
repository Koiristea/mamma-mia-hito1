import  {useState} from 'react';
import PropTypes from 'prop-types';

const CardPizza = ({ name, price, ingredients, img, desc }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  }
    return (
     <div className="cards-width pizza-card">
        <div className="pizza">
            <div className="card">
              <img className="border rounded" src={img} alt={name} />
              <h2 className="">{name}</h2>
              <div className={`description-container ${expanded ? 'expanded' : ''}`}>
                <p className="description-pizza">
                {desc}
                </p>
                <button className="see-more" onClick={toggleDescription}>
                {expanded ? '↑' : '↓'}
                </button>
              </div>
              <button className="see-more" onClick={toggleDescription}>
                {expanded ? '↑' : '↓'}
                </button>
              <hr/>
              <p>Ingredientes: <br />🍕{ingredients}</p>
              <hr />
              <p className="price fw-bold">Precio: ${price.toLocaleString()}</p>
              <div>
              <div className='btn-section'>
                <button className="bg-light border rounded border-dark">Ver más 👀</button>
                <button className="bg-dark text-white border rounded">Añadir 🛒</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

CardPizza.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default CardPizza;
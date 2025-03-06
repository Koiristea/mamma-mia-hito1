import PropTypes from 'prop-types';

const CardPizza = ({ name, price, ingredients, img /*desc*/ }) => {
  return (
    <div className="pizza">
      <div className="card">
        <img className="border rounded" src={img} alt={name} />
        <h2 className="fs-3 m-2">{name}</h2>
        {/*<p>{desc}</p>*/}
        <hr />
        <p className='ingredients'>Ingredientes: 🍕
          {ingredients.map((ingredient) => (
            <li
          key={ingredient}
            >{ingredient}
            </li>
          ))}
        </p>
        <hr />
        <p className="price fs-4 fw-bold">Precio: ${price.toLocaleString()}</p>
        <div>
          <button className="bg-light border rounded border-dark">Ver más 👀</button>
          <button className="bg-dark text-white border rounded">Añadir 🛒</button>
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
  //desc: PropTypes.string.isRequired,
};

export default CardPizza;
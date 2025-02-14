import { pizzas } from './pizzas.js';
import Header from "./Header";
import CardPizza from "./CardPizza";

const Home = () => {
  return (
    <>
      <Header />
      <main>
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients.join(', ')}
              img={pizza.img}
              desc={pizza.desc}
            />
          ))}
      </main>
    </>
  );
};

export default Home;

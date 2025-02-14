import Cart from './assets/components/Cart';
import Footer from './assets/components/Footer';
import Home from './assets/components/Home';
import Navbar from './assets/components/Navbar';
//import Home from './assets/components/Home';
//import LoginPage from './assets/components/Login';
//import Register from './assets/components/Register';


const App = () => {
  return (
    <>
      <Navbar />
      {<Home/>}
      {/*<Register/>*/}
      {/*<LoginPage/>*/}
      {/*<Cart />*/}
      <Footer/>
    </>
  );
};

export default App;
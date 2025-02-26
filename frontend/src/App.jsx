import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './assets/components/Navbar'
import Footer from './assets/components/Footer'
import Home from './assets/components/pages/Home'
import Cart from './assets/components/pages/Cart'
import Pizza from './assets/components/pages/Pizza'
import LoginPage from './assets/components/pages/Login'
import Register from './assets/components/pages/Register'
import NotFound from './assets/components/NotFound'
import Profile from './assets/components/Profile'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/p001" element={<Pizza />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

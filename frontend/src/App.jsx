import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './assets/components/Navbar'
import Footer from './assets/components/Footer'
import Home from './assets/pages/Home'
import Cart from './assets/pages/Cart'
import Pizza from './assets/pages/Pizza'
import LoginPage from './assets/pages/Login'
import Register from './assets/pages/Register'
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

import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './assets/pages/Home'
import Cart from './assets/pages/Cart'
import Pizza from './assets/pages/Pizza'
import LoginPage from './assets/pages/Login'
import Register from './assets/pages/Register'
import NotFound from './components/NotFound'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
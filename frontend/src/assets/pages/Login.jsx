import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const LoginPage = () => {
  const { login, isLoading, error } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage('El correo electrónico no es válido.');
            return;
        }
        if (!email || !password) {
            setMessage('Todos los campos son obligatorios.');
            return;
        }
        if (password.length < 6) {
            setMessage('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        setMessage('¡Login exitoso!');
    await login(email, password);
  };

  return (
    <div className="login container mt-5">
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mx-auto"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mx-auto"
          />
        </div>
        <button type="submit" className="btn btn-primary mx-auto w-50" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Ingresar"}
        </button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default LoginPage;

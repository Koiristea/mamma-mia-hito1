import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    try {
      return token ? jwtDecode(token) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(jwtDecode(data.token));
      navigate("/");
    } catch (err) {
      console.error("Error during login:", err);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Función para registrar un nuevo usuario
  const register = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.post("/api/auth/register", { email, password });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(jwtDecode(data.token));
      navigate("/");
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Error al registrarse. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Función para cerrar sesión
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Error al obtener el perfil del usuario.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const value = useMemo(() => ({
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    fetchProfile,
  }), [user, token, isLoading, error, login, register, logout, fetchProfile]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;